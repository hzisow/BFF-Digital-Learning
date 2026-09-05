// AI Open-Response Grading for BFF Classroom.
// A lesson poses a short free-text question about personal finance; the student
// writes a sentence or two; this function returns warm, specific, structured
// feedback (score + summary + strengths + improvements) in the student's
// language. The AI key stays server-side (see _shared/ai.ts).

import { corsHeaders, json } from '../_shared/cors.ts'
import { callAI, languageName } from '../_shared/ai.ts'
import { requireUser, enforceDailyLimit, cappedString, RateLimited, Unauthorized } from '../_shared/auth.ts'

// Caps on the caller-supplied strings, and the daily per-user AI budget.
const MAX_PROMPT_CHARS = 4000
const MAX_ANSWER_CHARS = 4000
const MAX_RUBRIC_CHARS = 4000
const DAILY_LIMIT = 150

interface GradeRequest {
  prompt: string
  answer: string
  rubric?: string
  lang: string
}

// Forced JSON shape the model must return. Keeping additionalProperties:false
// and every field required means the client can trust the grade's structure.
const outputSchema = {
  type: 'object',
  properties: {
    score: { type: 'integer' },
    summary: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' } },
    improve: { type: 'array', items: { type: 'string' } },
  },
  required: ['score', 'summary', 'strengths', 'improve'],
  additionalProperties: false,
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const caller = await requireUser(req)
    await enforceDailyLimit(caller, DAILY_LIMIT)

    const body = (await req.json()) as GradeRequest
    const lang = body.lang
    const prompt = cappedString(body.prompt ?? '', MAX_PROMPT_CHARS)
    const answer = cappedString(body.answer ?? '', MAX_ANSWER_CHARS)
    const rubric = body.rubric ? cappedString(body.rubric, MAX_RUBRIC_CHARS) : undefined
    const feedbackLang = languageName(lang)

    // Empty answer: don't spend a model call — nudge them to write something,
    // in their own language, in the same friendly voice.
    if (!answer || !answer.trim()) {
      return json({
        score: null,
        summary:
          lang === 'zh'
            ? '先写下你的想法吧——哪怕一两句话，我就能给你反馈。'
            : lang === 'es'
              ? 'Escribe tu idea primero: aunque sean una o dos frases, y te daré comentarios.'
              : 'Write your thinking first, even a sentence or two, and I can give you feedback.',
        strengths: [],
        improve: [],
      })
    }

    const system = [
      "You are a supportive teacher grading a US middle- or high-school student's short",
      'written answer about personal finance. Always encourage first, then be specific and',
      'actionable about what would make the answer stronger. Never be harsh, sarcastic, or',
      'discouraging. Judge the understanding and reasoning behind the answer, not spelling,',
      'grammar, or handwriting. Reward partial understanding. Keep every point short and',
      'concrete so a young student can act on it.',
      rubric
        ? 'Consider the provided rubric when deciding the score and what to praise or improve.'
        : '',
      `Write all feedback (summary, strengths, and improvements) in ${feedbackLang}.`,
      'The score is an integer from 0 to 100 reflecting how well the answer shows',
      'understanding of the money concept.',
    ]
      .filter(Boolean)
      .join(' ')

    const userContent = [
      `Question posed to the student:\n${prompt}`,
      rubric ? `\nRubric / what a strong answer includes:\n${rubric}` : '',
      `\nThe student's answer:\n${answer}`,
    ]
      .filter(Boolean)
      .join('\n')

    // A schema-forced answer cannot be continued, since half an object will not
    // parse, so the budget has to cover a summary plus two lists on the first
    // try. 700 left no room for Chinese, where the same feedback runs longer.
    const raw = await callAI({
      system,
      messages: [{ role: 'user', content: userContent }],
      maxTokens: 2000,
      outputSchema,
    })

    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      // Truncated JSON. A student who wrote a thoughtful answer should see a
      // gradeless card asking for a retry, not a parse error.
      return json({
        score: null,
        summary:
          lang === 'zh'
            ? '这次没能给出反馈，请再试一次。'
            : lang === 'es'
              ? 'No pude dar comentarios esta vez. Inténtalo de nuevo.'
              : 'I could not finish the feedback that time. Give it another try.',
        strengths: [],
        improve: [],
      })
    }
    return json(parsed)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (err instanceof Unauthorized) return json({ error: 'UNAUTHORIZED' }, 401)
    if (err instanceof RateLimited) {
      return json({ error: 'RATE_LIMITED', score: null, summary: 'You have graded a lot today. Try again tomorrow.', strengths: [], improve: [] })
    }
    if (msg === 'AI_NOT_CONFIGURED') {
      return json({ error: 'AI_NOT_CONFIGURED' }, 503)
    }
    if (msg === 'AI_REFUSED' || msg === 'BAD_INPUT') {
      // Model declined, or the input was malformed — hand back a graceful,
      // gradeless card instead of an error.
      return json({
        score: null,
        summary: 'I could not grade that one. Try rephrasing your answer about the money topic.',
        strengths: [],
        improve: [],
      })
    }
    // Detail is logged in _shared/ai.ts; the student sees only the gradeless
    // card, never the upstream error text.
    console.error(`grade-response failed: ${msg}`)
    return json({ error: 'AI_FAILED', score: null, summary: 'Something went wrong. Please try again.', strengths: [], improve: [] })
  }
})

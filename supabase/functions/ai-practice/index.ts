// AI-Generated Practice — personalized multiple-choice practice questions
// targeting the topics a student is weak in. The client computes the weak
// topics from local progress and sends them here; this function asks the model
// to write fresh, age-appropriate MCQs on those topics, in the student's language.
//
// Output is FORCED to a strict JSON Schema so the client always receives a
// predictable { questions: [...] } shape. The AI key stays server-side;
// see ../_shared/ai.ts for how it's read from Supabase secrets.

import { corsHeaders, json } from '../_shared/cors.ts'
import { callAI, languageName } from '../_shared/ai.ts'
import { requireUser, enforceDailyLimit, RateLimited, Unauthorized } from '../_shared/auth.ts'

// Keep sets short so a practice round stays quick and the request stays cheap.
const DEFAULT_COUNT = 4
const MIN_COUNT = 1
const MAX_COUNT = 6
// Bounds on the caller-supplied topic list, and the daily per-user AI budget.
const MAX_TOPICS = 12
const MAX_TOPIC_CHARS = 80
const DAILY_LIMIT = 150

// JSON Schema forcing a well-formed quiz: an array of questions, each with
// exactly the fields the client renders. additionalProperties:false everywhere
// keeps the model from inventing extra keys.
const outputSchema = {
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          answerIndex: { type: 'integer' },
          explanation: { type: 'string' },
        },
        required: ['question', 'options', 'answerIndex', 'explanation'],
        additionalProperties: false,
      },
    },
  },
  required: ['questions'],
  additionalProperties: false,
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const caller = await requireUser(req)
    await enforceDailyLimit(caller, DAILY_LIMIT)

    const { topics, count, lang } = (await req.json()) as {
      topics: string[]
      count?: number
      lang: string
    }

    const topicList = Array.isArray(topics)
      ? topics
          .slice(0, MAX_TOPICS)
          .map((t) => String(t).trim().slice(0, MAX_TOPIC_CHARS))
          .filter(Boolean)
      : []
    // Clamp the requested count into a sane, cheap range. Number.isFinite
    // guards against a non-numeric count (which used to yield "Write NaN ...").
    const requested = Number(count)
    const n = Math.max(
      MIN_COUNT,
      Math.min(MAX_COUNT, Math.round(Number.isFinite(requested) ? requested : DEFAULT_COUNT)),
    )

    const system = `You are an expert financial-literacy item writer for United States middle-school and high-school students. Write clear multiple-choice practice questions on the given topics. Each question must have exactly 4 options, exactly one of which is correct, plus a one-sentence explanation of why the correct answer is right. Keep everything age-appropriate and unambiguous, with a single defensible correct answer. Write every question, option, and explanation in ${languageName(lang)}.`

    const topicsText =
      topicList.length > 0
        ? topicList.join(', ')
        : 'general personal finance (budgeting, saving and investing, credit and debt)'

    const prompt = `Write ${n} multiple-choice practice question${
      n === 1 ? '' : 's'
    } that help a student review these topics they are struggling with: ${topicsText}. Spread the questions across the topics when there is more than one. Each question needs exactly 4 options and a single correct answer. Set answerIndex to the 0-based index of the correct option.`

    // Six questions with four options and an explanation each, in Spanish or
    // Chinese, do not reliably fit in 1500. A schema-forced answer cannot be
    // continued the way prose can, since half an object will not parse, so the
    // budget has to be big enough the first time.
    const text = await callAI({
      system,
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 4000,
      outputSchema,
    })

    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      // Truncated JSON. An empty set sends the student to the friendly "no
      // practice available" state instead of a raw parse error.
      return json({ questions: [] })
    }
    return json(parsed)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (err instanceof Unauthorized) return json({ error: 'UNAUTHORIZED' }, 401)
    if (err instanceof RateLimited) return json({ error: 'RATE_LIMITED', questions: [] })
    if (message === 'AI_NOT_CONFIGURED') {
      return json({ error: 'AI_NOT_CONFIGURED' }, 503)
    }
    if (message === 'AI_REFUSED') {
      return json({ questions: [] })
    }
    // Detail is logged in _shared/ai.ts; the client gets an empty set and its
    // friendly "no practice available" state, never the upstream error text.
    console.error(`ai-practice failed: ${message}`)
    return json({ error: 'AI_FAILED', questions: [] })
  }
})

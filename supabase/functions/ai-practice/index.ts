// AI-Generated Practice — personalized multiple-choice practice questions
// targeting the topics a student is weak in. The client computes the weak
// topics from local progress and sends them here; this function asks Claude to
// write fresh, age-appropriate MCQs on those topics, in the student's language.
//
// Output is FORCED to a strict JSON Schema so the client always receives a
// predictable { questions: [...] } shape. The Anthropic key stays server-side;
// see ../_shared/anthropic.ts for how it's read from Supabase secrets.

import { corsHeaders, json } from '../_shared/cors.ts'
import { callClaude, languageName } from '../_shared/anthropic.ts'

// Keep sets short so a practice round stays quick and the request stays cheap.
const DEFAULT_COUNT = 4
const MIN_COUNT = 1
const MAX_COUNT = 6

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
    const { topics, count, lang } = (await req.json()) as {
      topics: string[]
      count?: number
      lang: string
    }

    const topicList = Array.isArray(topics)
      ? topics.map((t) => String(t).trim()).filter(Boolean)
      : []
    // Clamp the requested count into a sane, cheap range.
    const n = Math.max(MIN_COUNT, Math.min(MAX_COUNT, Math.round(count ?? DEFAULT_COUNT)))

    const system = `You are an expert financial-literacy item writer for United States middle-school and high-school students. Write clear multiple-choice practice questions on the given topics. Each question must have exactly 4 options, exactly one of which is correct, plus a one-sentence explanation of why the correct answer is right. Keep everything age-appropriate and unambiguous, with a single defensible correct answer. Write every question, option, and explanation in ${languageName(lang)}.`

    const topicsText =
      topicList.length > 0
        ? topicList.join(', ')
        : 'general personal finance (budgeting, saving and investing, credit and debt)'

    const prompt = `Write ${n} multiple-choice practice question${
      n === 1 ? '' : 's'
    } that help a student review these topics they are struggling with: ${topicsText}. Spread the questions across the topics when there is more than one. Each question needs exactly 4 options and a single correct answer. Set answerIndex to the 0-based index of the correct option.`

    const text = await callClaude({
      system,
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 1500,
      outputSchema,
    })

    const parsed = JSON.parse(text)
    return json(parsed)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message === 'AI_NOT_CONFIGURED') {
      return json({ error: 'AI_NOT_CONFIGURED' }, 503)
    }
    if (message === 'AI_REFUSED') {
      return json({ questions: [] })
    }
    return json({ error: String(err) }, 500)
  }
})

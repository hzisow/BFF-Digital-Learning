// AI Money Coach — a chat tutor students ask personal-finance questions.
// Scoped strictly to the BFF personal-finance curriculum, replies in the
// student's language, and gives general education only (never individualized
// investment/tax/legal advice). The AI key stays server-side; see
// ../_shared/ai.ts for how it's read from Supabase secrets.

import { corsHeaders, json } from '../_shared/cors.ts'
import { callAI, languageName, type AIMessage } from '../_shared/ai.ts'

// Keep the request small and cheap: only the tail of the conversation matters
// for a short tutoring reply, and it bounds prompt cost.
const MAX_HISTORY = 12

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, lang } = (await req.json()) as {
      messages: AIMessage[]
      lang: string
    }

    const history = Array.isArray(messages) ? messages.slice(-MAX_HISTORY) : []

    const system = `You are the BFF Money Coach, a warm, encouraging financial-literacy tutor for United States middle-school and high-school students.

Stay STRICTLY within personal finance and the BFF curriculum: earning income, budgeting, saving and investing, credit and debt, insurance, financial decision-making, financial planning, consumer protection and scams, taxes, paying for college, and entrepreneurship.

Teach simply, with concrete everyday examples a young student can picture. Give GENERAL financial education only, never individualized investment, tax, or legal advice, and never specific product or stock recommendations. For any big personal money decision, gently suggest talking it through with a trusted adult such as a parent, guardian, teacher, or BFF mentor.

If a question is off-topic, unsafe, or inappropriate, kindly decline and steer the conversation back to money topics. Never share anything harmful.

Answer in ${languageName(lang)}. Keep every reply short and friendly, just a few sentences.`

    // Headroom: 600 was tight enough that any future model quietly reserving
    // tokens for itself would truncate the reply again.
    const reply = await callAI({ system, messages: history, maxTokens: 1000 })
    return json({ reply })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message === 'AI_NOT_CONFIGURED') {
      return json({ error: 'AI_NOT_CONFIGURED' }, 503)
    }
    if (message === 'AI_REFUSED') {
      return json({
        reply:
          "Let's keep it to money topics. Ask me anything about budgeting, saving, credit, and so on!",
      })
    }
    // 200 on purpose: supabase-js discards the body on non-2xx, which hides
    // the reason from the UI. Report the failure in the payload, and also put
    // it in `reply` so it is visible even to a cached older client build.
    return json({ error: 'AI_FAILED', reason: message, reply: `AI error - ${message}` })
  }
})

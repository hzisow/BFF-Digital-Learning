// AI Money Coach — a chat tutor students ask personal-finance questions.
// Scoped strictly to the BFF personal-finance curriculum, replies in the
// student's language, and gives general education only (never individualized
// investment/tax/legal advice). The Anthropic key stays server-side; see
// ../_shared/anthropic.ts for how it's read from Supabase secrets.

import { corsHeaders, json } from '../_shared/cors.ts'
import { callClaude, languageName, type ClaudeMessage } from '../_shared/anthropic.ts'

// Keep the request small and cheap: only the tail of the conversation matters
// for a short tutoring reply, and it bounds prompt cost.
const MAX_HISTORY = 12

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, lang } = (await req.json()) as {
      messages: ClaudeMessage[]
      lang: string
    }

    const history = Array.isArray(messages) ? messages.slice(-MAX_HISTORY) : []

    const system = `You are the BFF Money Coach, a warm, encouraging financial-literacy tutor for United States middle-school and high-school students.

Stay STRICTLY within personal finance and the BFF curriculum: earning income, budgeting, saving and investing, credit and debt, insurance, financial decision-making, financial planning, consumer protection and scams, taxes, paying for college, and entrepreneurship.

Teach simply, with concrete everyday examples a young student can picture. Give GENERAL financial education only — never individualized investment, tax, or legal advice, and never specific product or stock recommendations. For any big personal money decision, gently suggest talking it through with a trusted adult such as a parent, guardian, teacher, or BFF mentor.

If a question is off-topic, unsafe, or inappropriate, kindly decline and steer the conversation back to money topics. Never share anything harmful.

Answer in ${languageName(lang)}. Keep every reply short and friendly — just a few sentences.`

    const reply = await callClaude({ system, messages: history, maxTokens: 600 })
    return json({ reply })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message === 'AI_NOT_CONFIGURED') {
      return json({ error: 'AI_NOT_CONFIGURED' }, 503)
    }
    if (message === 'AI_REFUSED') {
      return json({
        reply:
          "Let's keep it to money topics — ask me anything about budgeting, saving, credit, and so on!",
      })
    }
    return json({ error: String(err) }, 500)
  }
})

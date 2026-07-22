// Shared Anthropic (Claude) API client for BFF Classroom edge functions.
// The API key lives ONLY here, server-side — set it in Supabase:
//   Project Settings → Edge Functions → Secrets → ANTHROPIC_API_KEY
// The public repo never contains the key.

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'

// One place to change the model (e.g. to 'claude-haiku-4-5' for lower cost).
export const MODEL = 'claude-opus-4-8'

export interface ClaudeMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface CallClaudeOptions {
  system: string
  messages: ClaudeMessage[]
  maxTokens?: number
  /** When set, forces JSON output validated against this JSON Schema. */
  outputSchema?: Record<string, unknown>
}

/**
 * Call Claude and return the assistant's text. Throws 'AI_NOT_CONFIGURED' if the
 * key is missing, 'AI_REFUSED' if the model declined, or a descriptive error.
 */
export async function callClaude(opts: CallClaudeOptions): Promise<string> {
  const key = Deno.env.get('ANTHROPIC_API_KEY')
  if (!key) throw new Error('AI_NOT_CONFIGURED')

  const body: Record<string, unknown> = {
    model: MODEL,
    max_tokens: opts.maxTokens ?? 1024,
    system: opts.system,
    messages: opts.messages,
  }
  if (opts.outputSchema) {
    body.output_config = { format: { type: 'json_schema', schema: opts.outputSchema } }
  }

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Claude API error ${res.status}: ${detail.slice(0, 500)}`)
  }

  const data = await res.json()
  if (data.stop_reason === 'refusal') throw new Error('AI_REFUSED')

  const blocks: Array<{ type: string; text?: string }> = data.content ?? []
  return blocks
    .filter((b) => b.type === 'text' && typeof b.text === 'string')
    .map((b) => b.text)
    .join('')
    .trim()
}

/** Map a caller language code to an instruction the model can follow. */
export function languageName(lang: string): string {
  if (lang === 'es') return 'Spanish'
  if (lang === 'zh') return 'Simplified Chinese'
  return 'English'
}

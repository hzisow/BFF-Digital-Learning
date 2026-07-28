// Shared AI client for BFF Classroom edge functions — Google Gemini (free tier).
// The API key lives ONLY here, server-side. Get a free key at
//   https://aistudio.google.com/apikey
// then set it in Supabase:
//   Project Settings → Edge Functions → Secrets → GEMINI_API_KEY
// The public repo never contains the key.
//
// Gemini's free tier covers a classroom nonprofit's usage at no cost. This file
// keeps the same call shape the functions already used, so swapping providers
// later (or back to another API) only touches this one module.

// One place to change the model. gemini-2.0-flash is fast, capable, and free.
// For even more free headroom, 'gemini-2.0-flash-lite' trades a little quality.
export const MODEL = 'gemini-2.0-flash'

const ENDPOINT = (model: string, key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`

export interface AIMessage {
  role: 'user' | 'assistant' | 'model'
  content: string
}

export interface CallAIOptions {
  system: string
  messages: AIMessage[]
  maxTokens?: number
  /** When set, forces JSON output shaped like this JSON Schema. */
  outputSchema?: Record<string, unknown>
}

// Gemini's responseSchema is OpenAPI-style: uppercase type names and no
// `additionalProperties`. Convert our JSON-Schema objects into that shape.
function toGeminiSchema(node: unknown): unknown {
  if (!node || typeof node !== 'object') return node
  const s = node as Record<string, unknown>
  const out: Record<string, unknown> = {}
  if (typeof s.type === 'string') out.type = s.type.toUpperCase()
  if (typeof s.description === 'string') out.description = s.description
  if (Array.isArray(s.enum)) out.enum = s.enum
  if (s.properties && typeof s.properties === 'object') {
    const props: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(s.properties as Record<string, unknown>)) {
      props[k] = toGeminiSchema(v)
    }
    out.properties = props
  }
  if (Array.isArray(s.required)) out.required = s.required
  if (s.items) out.items = toGeminiSchema(s.items)
  return out
}

/**
 * Call Gemini and return the model's text. Throws 'AI_NOT_CONFIGURED' if the
 * key is missing, 'AI_REFUSED' if the model declined / was safety-blocked, or a
 * descriptive error otherwise.
 */
export async function callAI(opts: CallAIOptions): Promise<string> {
  const key = Deno.env.get('GEMINI_API_KEY')
  if (!key) throw new Error('AI_NOT_CONFIGURED')

  const contents = opts.messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : m.role,
    parts: [{ text: m.content }],
  }))

  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: opts.maxTokens ?? 1024,
    temperature: opts.outputSchema ? 0.2 : 0.7,
  }
  if (opts.outputSchema) {
    generationConfig.responseMimeType = 'application/json'
    generationConfig.responseSchema = toGeminiSchema(opts.outputSchema)
  }

  const body = {
    systemInstruction: { parts: [{ text: opts.system }] },
    contents,
    generationConfig,
  }

  const res = await fetch(ENDPOINT(MODEL, key), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    // A bad key reads as 400/403 — surface the status, kept generic.
    throw new Error(`Gemini API error ${res.status}: ${detail.slice(0, 500)}`)
  }

  const data = await res.json()

  // Prompt-level safety block (no candidates returned).
  if (data.promptFeedback?.blockReason) throw new Error('AI_REFUSED')

  const candidate = data.candidates?.[0]
  if (!candidate) throw new Error('AI_REFUSED')
  if (candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION') {
    throw new Error('AI_REFUSED')
  }

  const parts: Array<{ text?: string }> = candidate.content?.parts ?? []
  return parts
    .map((p) => p.text ?? '')
    .join('')
    .trim()
}

/** Map a caller language code to an instruction the model can follow. */
export function languageName(lang: string): string {
  if (lang === 'es') return 'Spanish'
  if (lang === 'zh') return 'Simplified Chinese'
  return 'English'
}

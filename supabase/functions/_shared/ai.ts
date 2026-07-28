// Shared AI client for BFF Classroom edge functions — Google Gemini (free tier).
// The API key lives ONLY here, server-side. Get a free key at
//   https://aistudio.google.com/apikey
// then set it in Supabase:
//   Project Settings, then Edge Functions, then Secrets: GEMINI_API_KEY
// The public repo never contains the key.

// Candidate models, tried in order. A key/project that doesn't recognise the
// first one (404 NOT_FOUND) falls through to the next, so a model rename on
// Google's side degrades instead of taking the whole feature down. Set a
// GEMINI_MODEL secret to pin one explicitly.
const MODEL_OVERRIDE = (Deno.env.get('GEMINI_MODEL') ?? '').trim()
const MODELS = MODEL_OVERRIDE
  ? [MODEL_OVERRIDE]
  : [
      // Lite tiers first: they carry the most generous free-tier quota, and
      // they are more than good enough for short tutoring replies.
      'gemini-2.0-flash-lite',
      'gemini-2.5-flash-lite',
      'gemini-2.0-flash',
      'gemini-2.5-flash',
      'gemini-flash-latest',
    ]

export const MODEL = MODELS[0]

const endpoint = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

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
 * key is missing, 'AI_REFUSED' if the model declined / was safety-blocked, or an
 * error whose message carries the upstream detail so the UI can show it.
 */
export async function callAI(opts: CallAIOptions): Promise<string> {
  // Trim: a key pasted into the dashboard often carries a trailing newline or
  // stray space, which Google rejects with a fast 400 API_KEY_INVALID.
  const key = (Deno.env.get('GEMINI_API_KEY') ?? '').trim()
  if (!key) {
    console.error('GEMINI_API_KEY secret is not set on this project.')
    throw new Error('AI_NOT_CONFIGURED')
  }

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

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: opts.system }] },
    contents,
    generationConfig,
  })

  let lastStatus = 0
  let lastDetail = ''
  const tried: string[] = []

  for (const model of MODELS) {
    tried.push(model)
    let res: Response
    try {
      res = await fetch(endpoint(model), {
        method: 'POST',
        // Header auth rather than ?key= so the secret never lands in a URL,
        // which is what proxies and error messages tend to echo back.
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body,
      })
    } catch (e) {
      lastStatus = 0
      lastDetail = `network error: ${e instanceof Error ? e.message : String(e)}`
      console.error(`Gemini fetch failed for ${model}: ${lastDetail}`)
      continue
    }

    if (res.ok) {
      const data = await res.json()
      if (data.promptFeedback?.blockReason) throw new Error('AI_REFUSED')
      const candidate = data.candidates?.[0]
      if (!candidate) throw new Error('AI_REFUSED')
      if (candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION') {
        throw new Error('AI_REFUSED')
      }
      const parts: Array<{ text?: string }> = candidate.content?.parts ?? []
      const text = parts.map((p) => p.text ?? '').join('').trim()
      if (text) return text
      throw new Error('AI_REFUSED')
    }

    lastStatus = res.status
    lastDetail = await res.text().catch(() => '')
    console.error(
      `Gemini API error: status=${res.status} model=${model} body=${lastDetail.slice(0, 800)}`,
    )

    // Free-tier quota is allocated PER MODEL, so a 429 on one model says
    // nothing about the next — keep going. 404 likewise means only that this
    // model name is unknown. Anything else (bad key, disabled API) fails the
    // same way everywhere, so stop and report it.
    if (res.status === 404 || res.status === 429) continue
    break
  }

  // Compact, human-readable reason pulled out of Google's error envelope.
  let reason = lastDetail
  try {
    const parsed = JSON.parse(lastDetail)
    reason = parsed?.error?.message ?? lastDetail
  } catch {
    // not JSON — keep the raw text
  }
  throw new Error(
    `Gemini ${lastStatus || 'request failed'}: ${String(reason).slice(0, 220)} ` +
      `[tried ${tried.join(', ')}]`,
  )
}

/** Map a caller language code to an instruction the model can follow. */
export function languageName(lang: string): string {
  if (lang === 'es') return 'Spanish'
  if (lang === 'zh') return 'Simplified Chinese'
  return 'English'
}

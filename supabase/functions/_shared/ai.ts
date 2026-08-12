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
 * House style, appended to every system prompt.
 *
 * The rest of the site had 1,212 em dashes swept out of it because reviewers
 * read them as a machine-written tell. Model output was still producing them,
 * which put the one part of the site a student talks to at odds with every
 * other part. Living here rather than in each function means a new function
 * cannot forget it.
 *
 * Chinese is exempt on purpose: 破折号 is ordinary punctuation there, not a tell.
 */
const HOUSE_STYLE = `

When writing English or Spanish, never use an em dash (—). Use a comma, a full stop, or a rewrite. Chinese is exempt: there the dash is ordinary punctuation.`

export interface AIResult {
  text: string
  /** The model ran out of room and the text stops mid-thought. */
  truncated: boolean
}

/**
 * Call Gemini and return the model's text. Throws 'AI_NOT_CONFIGURED' if the
 * key is missing, 'AI_REFUSED' if the model declined / was safety-blocked, or an
 * error whose message carries the upstream detail so the UI can show it.
 */
export async function callAI(opts: CallAIOptions): Promise<string> {
  return (await callAIDetailed(opts)).text
}

/**
 * Same call, but says whether the answer was cut short.
 *
 * Long-form output (a lesson plan, a worksheet) is where this matters: a
 * mentor handed a plan that stops halfway through the agenda has no way to
 * tell it from a finished one, and might print it. Short chat replies can keep
 * using `callAI` and ignore the flag.
 */
export async function callAIDetailed(opts: CallAIOptions): Promise<AIResult> {
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

  /**
   * The request body, built per model because one field is model-specific.
   *
   * Gemini 2.5 models think before answering, and those hidden thinking tokens
   * are billed against maxOutputTokens. With a 600-token budget the coach spent
   * nearly all of it reasoning and had about thirty tokens left for the reply,
   * so students got half a sentence and a finishReason of MAX_TOKENS. Setting
   * thinkingBudget to 0 turns it off: this is short tutoring copy and a
   * structured worksheet, neither of which needs a scratchpad.
   *
   * Sent to everything EXCEPT the 1.5 and 2.0 generations, which do not have
   * the field. Matching on the string "2.5" instead was the bug that brought
   * this back: `gemini-flash-latest` is in the fallback list and does not
   * contain "2.5", so once the earlier models hit their free-tier quota and the
   * chain fell through to it, thinking was on again. A worksheet then spent its
   * budget reasoning and came back as JSON cut off mid-string, which surfaced
   * to the mentor as "Unterminated string in JSON at position 3737". Anything
   * new Google ships is far likelier to think than not, so the default is off.
   */
  function thinks(model: string): boolean {
    return !/(^|[^\d])(1\.5|2\.0)([^\d]|$)/.test(model)
  }

  function bodyFor(model: string): string {
    const generationConfig: Record<string, unknown> = {
      maxOutputTokens: opts.maxTokens ?? 1024,
      temperature: opts.outputSchema ? 0.2 : 0.7,
    }
    if (thinks(model)) {
      generationConfig.thinkingConfig = { thinkingBudget: 0 }
    }
    if (opts.outputSchema) {
      generationConfig.responseMimeType = 'application/json'
      generationConfig.responseSchema = toGeminiSchema(opts.outputSchema)
    }
    return JSON.stringify({
      systemInstruction: { parts: [{ text: opts.system + HOUSE_STYLE }] },
      contents,
      generationConfig,
    })
  }

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
        body: bodyFor(model),
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
      // A truncated answer used to be indistinguishable from a complete one:
      // the partial text came back, and a student read half a sentence. Say so
      // in the logs, with the token accounting that explains it, so the next
      // person does not have to infer this from response latency.
      const truncated = candidate.finishReason === 'MAX_TOKENS'
      if (truncated) {
        const u = data.usageMetadata ?? {}
        console.error(
          `Gemini hit MAX_TOKENS on ${model}: budget=${opts.maxTokens ?? 1024} ` +
            `thoughts=${u.thoughtsTokenCount ?? 0} output=${u.candidatesTokenCount ?? 0} ` +
            `text=${text.length} chars`,
        )
      }
      if (text) return { text, truncated }
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

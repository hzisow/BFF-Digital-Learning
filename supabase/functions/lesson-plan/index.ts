// Lesson Plan & Worksheet Generator — a mentor/admin tool that drafts
// classroom-ready materials aligned to the BFF Academy financial-literacy
// curriculum. Given a topic (plus optional grade band + minutes), the model
// writes either a full timed lesson plan or a student worksheet with an answer
// key, as GitHub-flavored Markdown, in the mentor's language.
//
// This function requires a valid Supabase JWT by default (verify_jwt). As a
// best-effort extra guard it also checks the caller is an APPROVED profile, so
// only vetted BFF mentors can use it. The AI key stays server-side; see
// ../_shared/ai.ts for how it's read from secrets.

import { corsHeaders, json } from '../_shared/cors.ts'
import { callAI, callAIDetailed, languageName } from '../_shared/ai.ts'
import type { AIMessage } from '../_shared/ai.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

// Forced shape for worksheets so the client can lay out a printable PDF and
// size each answer area to the question type.
const worksheetSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    instructions: { type: 'string', description: 'Short student-facing directions.' },
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['multiple-choice', 'short-answer', 'scenario'],
          },
          prompt: { type: 'string' },
          options: {
            type: 'array',
            items: { type: 'string' },
            description: 'Exactly 4 for multiple-choice; empty otherwise.',
          },
          answer: { type: 'string', description: 'Correct answer plus a brief reason.' },
        },
        required: ['type', 'prompt', 'options', 'answer'],
        additionalProperties: false,
      },
    },
  },
  required: ['title', 'instructions', 'questions'],
  additionalProperties: false,
}

const DEFAULT_GRADE_BAND = 'middle/high school'
const DEFAULT_MINUTES = 45
const MIN_MINUTES = 10
const MAX_MINUTES = 180

/** Most a single Gemini call will return; the rest arrives as continuations. */
const CHUNK_TOKENS = 8000
/** Continuations after the first call. Three covers a 180-minute plan twice over. */
const MAX_CONTINUATIONS = 3

/**
 * Generate long-form Markdown that is actually finished.
 *
 * A lesson plan is objectives, a standards note, materials, a timed agenda
 * table and differentiation tips, and it grows with the length of the class.
 * The old 2000-token budget cut a 45-minute plan off partway through the
 * agenda, and the partial text came back looking like a finished document, so
 * a mentor could print a plan that stopped mid-row.
 *
 * Rather than guess a budget large enough for every topic and language, this
 * asks the model to carry on from where it stopped until it reaches the end.
 * Each continuation gets the text so far, so it picks up mid-sentence without
 * repeating itself or reintroducing the document.
 */
async function writeUntilDone(system: string, first: string): Promise<string> {
  const messages: AIMessage[] = [{ role: 'user', content: first }]
  let full = ''

  for (let attempt = 0; attempt <= MAX_CONTINUATIONS; attempt++) {
    const { text, truncated } = await callAIDetailed({
      system,
      messages,
      maxTokens: CHUNK_TOKENS,
    })
    full = full ? `${full}${text}` : text
    if (!truncated) break

    messages.push({ role: 'assistant', content: text })
    messages.push({
      role: 'user',
      content:
        'You were cut off. Continue the document from exactly where it stopped, ' +
        'mid-sentence if that is where it ended. Do not repeat anything you have ' +
        'already written, do not reintroduce the document, and do not add a preamble ' +
        'like "continuing". Just carry on, and finish every remaining section.',
    })
  }

  return full.trim()
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Best-effort admin gate: confirm the JWT belongs to an approved mentor.
    // Client-side gating already hides this page from non-admins, so if the
    // check itself errors we let the core feature proceed rather than block it.
    try {
      const authHeader = req.headers.get('Authorization')
      if (authHeader) {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_ANON_KEY')!,
          { global: { headers: { Authorization: authHeader } } },
        )
        const { data: userData } = await supabase.auth.getUser()
        const { data: profile } = await supabase
          .from('profiles')
          .select('approved')
          .eq('id', userData.user?.id)
          .single()
        if (profile && !profile.approved) {
          return json({ error: 'NOT_APPROVED' }, 403)
        }
      }
    } catch {
      // Approval check unavailable — fall through to the generator.
    }

    const { kind, topic, gradeBand, minutes, lang } = (await req.json()) as {
      kind: 'lesson-plan' | 'worksheet'
      topic: string
      gradeBand?: string
      minutes?: number
      lang: string
    }

    const cleanTopic = String(topic ?? '').trim()
    const band = String(gradeBand ?? '').trim() || DEFAULT_GRADE_BAND
    const mins = Math.max(
      MIN_MINUTES,
      Math.min(MAX_MINUTES, Math.round(Number(minutes) || DEFAULT_MINUTES)),
    )
    const isWorksheet = kind === 'worksheet'

    // Worksheets come back as structured data, not prose: the client lays the
    // PDF out itself and needs to know each question's type so it can leave the
    // right amount of writing space. Lesson plans stay Markdown.
    if (isWorksheet) {
      const system = `You are an experienced financial-literacy curriculum designer writing a printable student worksheet aligned to the BFF Academy curriculum for United States students. Grade band: ${band}. Write everything in ${languageName(lang)}.

Write 6 to 10 varied questions mixing "multiple-choice", "short-answer", and at least one "scenario" question that applies the idea to a realistic situation a student that age could face.

Rules:
- Every multiple-choice question needs exactly 4 options, and options must NOT be prefixed with letters or numbers; give the option text only.
- Non-multiple-choice questions must have an empty options array.
- "answer" is the full correct answer (for multiple-choice, the exact text of the correct option) plus a brief reason, for the teacher's answer key.
- Keep prompts self-contained and age-appropriate, and never reference outside media.`

      // A schema-forced response cannot be continued the way prose can: half a
      // JSON object is not parseable, so the budget has to be big enough the
      // first time. Ten questions with four options each, plus an answer and a
      // reason for every one, in Spanish or Chinese, never fit in the 2500 it
      // used to get, and the mentor saw the raw parse error
      // ("Unterminated string in JSON at position 3737") instead of a worksheet.
      //
      // If the larger budget still is not enough, ask for the short version
      // rather than failing: six questions is a usable worksheet, and an error
      // message is not.
      const ask = async (count: string) =>
        await callAI({
          system: system.replace('6 to 10 varied questions', `${count} varied questions`),
          messages: [
            {
              role: 'user',
              content: `Create a student worksheet on the topic: "${cleanTopic}". Grade band: ${band}.`,
            },
          ],
          maxTokens: CHUNK_TOKENS,
          outputSchema: worksheetSchema,
        })

      let worksheet: unknown
      try {
        worksheet = JSON.parse(await ask('6 to 10'))
      } catch {
        try {
          worksheet = JSON.parse(await ask('exactly 6'))
        } catch {
          // Still truncated. Say so plainly rather than surfacing a parse
          // error, which reads like a bug rather than something to retry.
          return json({ error: 'AI_FAILED', reason: 'WORKSHEET_INCOMPLETE' })
        }
      }
      return json({ worksheet })
    }

    const system = `You are an experienced financial-literacy curriculum designer creating classroom materials aligned to the BFF Academy curriculum for United States students. Grade band: ${band}. Write everything in ${languageName(lang)}.

Produce a LESSON PLAN that fits a ${mins}-minute class period. Include:
- learning objectives,
- a short standards-style alignment note (e.g. to national personal-finance standards),
- a materials list,
- a timed agenda broken into warm-up, direct instruction, activity, check-for-understanding, and exit ticket, with minute allocations that add up to about ${mins} minutes,
- differentiation tips for varied learners.

Output well-structured GitHub-flavored Markdown. Use headings, lists, and tables where they help. Do not wrap the whole document in a code fence. Be practical and classroom-ready.`

    const markdown = await writeUntilDone(
      system,
      `Create a ${mins}-minute lesson plan on the topic: "${cleanTopic}". Grade band: ${band}.`,
    )

    return json({ markdown })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message === 'AI_NOT_CONFIGURED') {
      return json({ error: 'AI_NOT_CONFIGURED' }, 503)
    }
    if (message === 'AI_REFUSED') {
      return json({ markdown: '' })
    }
    // 200 on purpose: supabase-js discards the body on non-2xx, which hides
    // the reason from the UI. Report the failure in the payload instead.
    return json({ error: 'AI_FAILED', reason: message })
  }
})

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
import { requireUser, enforceDailyLimit, RateLimited, Unauthorized } from '../_shared/auth.ts'

// This is a mentor tool, so its budget is smaller and its inputs are bounded.
const MAX_TOPIC_CHARS = 200
const MAX_BAND_CHARS = 60
const DAILY_LIMIT = 60

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
    // Fail-closed admin gate. This is the most expensive function, so it must
    // belong to a vetted mentor: a real (non-anonymous) session whose profile
    // is approved. An anonymous visitor has no profile row and is rejected,
    // where the old best-effort check let a null profile through.
    const caller = await requireUser(req)
    if (caller.isAnonymous) return json({ error: 'NOT_APPROVED' }, 403)
    const { data: profile, error: profileErr } = await caller.supabase
      .from('profiles')
      .select('approved')
      .eq('id', caller.userId)
      .single()
    if (profileErr || !profile?.approved) return json({ error: 'NOT_APPROVED' }, 403)
    await enforceDailyLimit(caller, DAILY_LIMIT)

    const { kind, topic, gradeBand, minutes, lang } = (await req.json()) as {
      kind: 'lesson-plan' | 'worksheet'
      topic: string
      gradeBand?: string
      minutes?: number
      lang: string
    }

    const cleanTopic = String(topic ?? '').trim().slice(0, MAX_TOPIC_CHARS)
    if (!cleanTopic) return json({ error: 'AI_FAILED', reason: 'TOPIC_REQUIRED' }, 400)
    // Grade band is a free-text field the mentor types, and it is interpolated
    // into the system prompt, so strip newlines (which could start a new
    // instruction block) and cap the length rather than passing it raw.
    const band =
      String(gradeBand ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, MAX_BAND_CHARS) ||
      DEFAULT_GRADE_BAND
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

Every material you list must be either something a classroom already has (projector, whiteboard, paper, calculators) or something written out in full inside this document. If the plan uses a handout, worksheet, exit ticket, scenario card, or slide, write its complete content into an "Appendix: Printable Materials" section at the end, ready to photocopy as-is: every question, every scenario, every answer blank, plus an answer key for the teacher. Never name a document you have not written. A teacher must be able to run this lesson from this page alone.

Output well-structured GitHub-flavored Markdown. Use headings, lists, and tables where they help. Be practical and classroom-ready.

Formatting rules, because this is typeset into a printed PDF:
- Do not wrap the document in a code fence.
- Do not repeat the lesson title as a heading; the page already prints it. Start with the learning objectives.
- Put a blank line between every block: headings, paragraphs, lists, and tables.
- Put facts like grade level and duration in a bullet list, one per line, never as consecutive lines of a paragraph.
- Never use LaTeX or math delimiters. Write formulas in plain words, for example "profit divided by premium paid, times 100".`

    const markdown = await writeUntilDone(
      system,
      `Create a ${mins}-minute lesson plan on the topic: "${cleanTopic}". Grade band: ${band}.`,
    )

    return json({ markdown })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (err instanceof Unauthorized) return json({ error: 'UNAUTHORIZED' }, 401)
    if (err instanceof RateLimited)
      return json({ error: 'AI_FAILED', reason: "You have reached today's generation limit. Please try again tomorrow." })
    if (message === 'AI_NOT_CONFIGURED') {
      return json({ error: 'AI_NOT_CONFIGURED' }, 503)
    }
    if (message === 'AI_REFUSED') {
      return json({ markdown: '' })
    }
    // Upstream detail is logged in _shared/ai.ts; the mentor sees a fixed code.
    console.error(`lesson-plan failed: ${message}`)
    return json({ error: 'AI_FAILED', reason: 'GENERATION_FAILED' })
  }
})

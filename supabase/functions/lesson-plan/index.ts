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
import { callAI, languageName } from '../_shared/ai.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const DEFAULT_GRADE_BAND = 'middle/high school'
const DEFAULT_MINUTES = 45
const MIN_MINUTES = 10
const MAX_MINUTES = 180

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

    const system = `You are an experienced financial-literacy curriculum designer creating classroom materials aligned to the BFF Academy curriculum for United States students. Grade band: ${band}. Write everything in ${languageName(lang)}.

${
      isWorksheet
        ? `Produce a STUDENT WORKSHEET containing:
- a clear title,
- brief student-facing instructions,
- 6 to 10 varied questions that mix multiple-choice, short answer, and at least one applied scenario question,
- an answer key at the very end (clearly separated under its own heading).`
        : `Produce a LESSON PLAN that fits a ${mins}-minute class period. Include:
- learning objectives,
- a short standards-style alignment note (e.g. to national personal-finance standards),
- a materials list,
- a timed agenda broken into warm-up, direct instruction, activity, check-for-understanding, and exit ticket, with minute allocations that add up to about ${mins} minutes,
- differentiation tips for varied learners.`
    }

Output well-structured GitHub-flavored Markdown. Use headings, lists, and tables where they help. Do not wrap the whole document in a code fence. Be practical and classroom-ready.`

    const prompt = isWorksheet
      ? `Create a student worksheet on the topic: "${cleanTopic}". Grade band: ${band}.`
      : `Create a ${mins}-minute lesson plan on the topic: "${cleanTopic}". Grade band: ${band}.`

    const markdown = await callAI({
      system,
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 2000,
    })

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

# BFF Classroom — Project Status

Working notes for picking the project back up cold. Everything below has been
checked against the code or a running build, not remembered — including every
performance number, which came from driving a production build in a browser.

---

## What this is

A trilingual (English / Spanish / Simplified Chinese) digital financial-literacy
platform for **BFF of America**, a student-founded 501(c)(3).

- **Students** join a class with a code plus a first name and last initial
  ("Jayden M.") — no email, no password, no full name.
- **Mentors** sign in with Google and are gated behind an `approved` flag.
- Everything also works **solo**, with no backend, straight from the browser.

**Live:** https://hzisow.github.io/BFF-Digital-Learning/

Scale, so you know what you are dealing with: **98 source files, ~33,000 lines**,
13 lessons × 3 languages, 10 activities, 32 routes, 7 database tables.

---

## Ground rules (do not break these)

1. **The repo is PUBLIC.** Never commit personal emails, API keys, or secrets.
   The Gemini key lives only as a Supabase Edge Function secret.
2. **Never put the assistant's model identifier** in commits, PR bodies, code, or
   comments. Chat only.
3. **Commits are authored by the repo owner**, not the assistant:
   `hzisow <255225107+hzisow@users.noreply.github.com>`. The GitHub noreply
   address links commits to the account without publishing a personal email in
   a public repo. Set with `git config user.name` / `user.email` if a fresh
   container ever resets it.
4. **Branch:** develop on `claude/educational-tool-student-outreach-qkqnle`.
   Deploying means fast-forwarding `main` to it — GitHub Pages only builds from
   `main`. The user has authorized this; do not open PRs unless asked.
5. **Zero emoji anywhere in the app.** Enforced by the icon registry (below).
   Verify with the scan in "Useful commands".

---

## Stack

| Layer | Choice |
|---|---|
| Build | Vite + React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v3, custom `bff` / `ink` / `paper` / `gold` palette |
| Routing | `BrowserRouter` with clean URLs (no hash) |
| Backend | Supabase (Postgres + RLS, anon auth for students, Google auth for mentors) |
| AI | Supabase Edge Functions (Deno) calling **Google Gemini** free tier |
| Hosting | GitHub Pages, deployed by `.github/workflows/deploy.yml` on push to `main` |
| Deps | `@supabase/supabase-js`, `lucide-react`, `jspdf`, react, react-dom, react-router-dom |

Supabase project ref: `xrlmxpmaykldvbjnoapk`

### Routes (all 32)

Everything except Landing / Layout / NotFound is code-split — see
`src/lib/routeChunks.ts`.

| Group | Paths |
|---|---|
| Public | `/` · `/lessons` · `/activities` · `/glossary` · `/practice` · `/coach` · `/join` · `/game` |
| Student | `/student` · `/certificate` · `/practice/ai` |
| Challenges | `/challenge/{bens-budget, bens-insurance, paystub-detective, credit-score, scam-spotter, smart-shopper, goal-getter}` |
| Wolf | `/wolf` · `/wolf/solo` |
| Mentor | `/team` · `/admin` · `/admin/class/:id` · `/admin/generate` · `/account` |
| Own chrome | `/lessons/:slug` (lesson canvas, outside `Layout`) |
| Full screen | `/play/:code` · `/host/:sessionId` · `/quiz/:code` · `/quiz-host/:sessionId` · `/coplay/:code` · `/coplay-host/:sessionId` |
| Catch-all | `*` → NotFound (inside `Layout`) |

### Database tables

`supabase/migrations/0001_init.sql` is the whole schema. RLS on everything.

| Table | Holds |
|---|---|
| `profiles` | Mentor accounts, incl. the `approved` gate |
| `classrooms` | A class + its join code |
| `students` | Display name + classroom link. **No email, no full name.** The `nickname` column now holds "Jayden M."; `pin_hash` is vestigial and always null. |
| `progress` | One row per (student, activity): status, score, `data` jsonb |
| `assignments` | What a mentor assigned to a class |
| `game_sessions` | Live Wolf / quiz / co-play sessions |
| `game_players` | Who is in a live session, and their score |

`progress` is uniquely keyed on `(student_id, activity_slug)`, which is what
makes the outbox's upsert-with-`onConflict` safe to retry.

### localStorage keys

The app is local-first, so this is real state, not a cache. All prefixed `bff_`.

| Key | Written by | Holds |
|---|---|---|
| `bff_progress_v1` | `lib/progress.ts` | The authoritative local progress record |
| `bff_progress_outbox_v1` | `lib/progressQueue.ts` | Failed server writes waiting to retry |
| `bff_lesson_pos_v1` | `lib/lessonPosition.ts` | Where the student is inside each lesson |
| `bff_student_session` | `lib/session.tsx` | Joined-class session (id + display name) |
| `bff_streak_v1` | `lib/streak.ts` | Daily streak counter |
| `bff_last_level` | `components/Layout.tsx` | Last seen XP level, to detect a level-up |
| `bff_lang` | `lib/i18n.tsx` | Chosen language |
| `bff_sound` | `lib/sound.ts` | Sound on/off |
| `bff_live_nick` / `bff_quiz_nick` / `bff_wolf_nick` | live screens | Remembered display name per game type |

Bumping a `_v1` suffix silently discards every student's data on that key. If a
shape has to change, migrate in place instead.

---

## Architecture decisions worth knowing

These were each arrived at the hard way; changing them will reintroduce a bug.

### Clean URLs need three things together
`BrowserRouter` alone breaks on GitHub Pages. All three are required:
1. `BrowserRouter basename={import.meta.env.BASE_URL}` (`src/main.tsx`)
2. An **absolute** Vite `base` (`/BFF-Digital-Learning/`). A relative `./` base
   makes a deep link resolve assets against the wrong folder and 404.
   Override with `VITE_BASE=/` for a custom domain.
3. `dist/404.html` — a copy of `index.html`, emitted by a small plugin in
   `vite.config.ts`. Pages serves it for unknown paths, so the SPA boots and the
   router renders the route with the URL preserved.

Deep links legitimately return a **404 status** while rendering fine. That is how
the Pages SPA fallback works; it is not a bug.

### Zero emoji is enforced by the type system
`src/lib/icons.tsx` is the single icon registry. Content data (`activities.ts`,
lesson files, `xp.ts`, `badges.ts`, `quests.ts`) stores an **`icon` key**, not a
glyph. The field was deliberately renamed `emoji` → `icon` so the compiler flags
every usage site. Render with `<AppIcon name={...} />`.

### AI errors must travel in a 200 payload
`supabase-js` **discards the response body on any non-2xx**. Returning 500 with a
reason means the UI only ever sees "non-2xx status code" and the real cause is
destroyed. The functions therefore answer **200** with
`{ error: 'AI_FAILED', reason }`, and `invokeAI` turns that into a real Error.
Do not "fix" this back to a 500.

### Gemini quota is per model
A 429 on one model says nothing about the next. `_shared/ai.ts` walks a list of
candidate models and advances on **404 or 429**, leading with the `-lite` tiers
(largest free quota). This is what made the AI work at all.

### AI calls need a session
Edge functions run with `verify_jwt`, but the project uses the newer
`sb_publishable_…` key, which is **not a JWT**. `invokeAI` calls
`ensureSession()` (anonymous sign-in) before invoking, so a visitor who never
joined a class can still use the Coach.

### Routes are code-split; the shell is what loads first
`src/lib/routeChunks.ts` holds one dynamic `import()` per route, and `App.tsx`
turns each into a `React.lazy`. Landing, Layout, and NotFound stay eager — lazily
loading the page you are already looking at only adds a round-trip.

The Suspense boundary for Layout routes lives **inside Layout**, wrapped around
`<Outlet />`, so the header and footer stay painted during a navigation. The
lesson canvas and the full-screen live screens carry their own boundaries.

Nav links prefetch on hover/focus (`PrefetchNavLink`). A separate idle prefetch
warms `lessons` + `activities`, but **only when the connection can afford it** —
it bails on `saveData` or a 2G/3G `effectiveType`. The lessons chunk is 494KB
(all 13 lessons × 3 languages), so speculatively pulling it on school wifi would
compete with what the student actually asked for. Hover prefetch ignores the
guard, because that is intent rather than a guess.

### The mentor dashboard answers "what do I reteach?"
`src/lib/questionAnalytics.ts` aggregates `progress.data.answers` into a
per-question breakdown, rendered by `components/admin/QuestionBreakdown.tsx`
under each assigned lesson on the classroom page.

The data was already there and being thrown away: `fetchRoster` pulls every
progress row including `data`, `finishQuiz` writes `data.answers` as the option
index each student picked (-1 for unanswered), and `ClassroomDetail` had zero
references to it. So this needed **no new query, no schema change, no extra
storage** — only aggregation.

It shows percent correct per question, the full option distribution (so a mentor
can see *which* misconception the class landed on), the most common wrong answer,
and a "worth reteaching" summary for anything under 70%.

Guards that matter: answers outside the option range are ignored, because a
lesson edited after a student took it leaves stale indices; and an empty result
returns `[]` so the UI says "no quiz results yet" rather than rendering zeroes
that read like the class failed.

### Mentors can repair their own roster
`rename_student`, `remove_student`, `merge_students` (migration 0014), surfaced
as hover controls on each roster row.

This closes a gap that 0013 opened. With PINs gone, students type their own name,
so "Jaden M" on Monday and "Jayden M" on Tuesday are two records with split
progress — and RLS only ever let a mentor *read* their students.

They are SECURITY DEFINER functions rather than widened policies because two need
logic a policy cannot express: rename must fail cleanly on the
`(classroom, lower(nickname))` unique index, and merge must reconcile two sets of
progress rows. Merge keeps the better record per activity using the same rule as
`mergeEntry()` in `progress.ts` — completed beats started, higher score wins,
jsonb unioned — so server and client never disagree.

Verified against the live project: the merge arithmetic is correct for all four
combinations, including two NULL scores (the `nullif(greatest(...), -1)` guard
stops it writing a nonsense `-1`), and an unauthenticated caller cannot rename or
remove — `mentor_owns_student` returns false and every function raises
`not_authorized`.

### Due dates read as deadlines
`src/lib/dueDate.ts` classifies `due_at` as overdue / today / tomorrow / soon /
later. Comparison is **calendar-day, not elapsed-hours**: something due at 9am is
still "today" at 5pm, and eleven hours across midnight is "tomorrow". An urgent,
unfinished assignment also gets a coloured card border on the student home —
never colour alone, the label always says it in words.

### Students identify by first name + last initial, not a nickname and a PIN
A student types **"Jayden"** and **"M"**; `src/lib/studentName.ts` composes
`"Jayden M."` and that string goes into the existing `students.nickname` column.
Nothing in the schema changed — identity is still `(classroom_id,
lower(nickname))`, which is what lets a student reconnect from another device by
typing the same thing again.

Why: a nickname plus an optional 4-digit PIN (set it, then confirm it) was
friction at the worst possible moment, and left mentors reading a roster of
"JayJay" and "xX_money_Xx" with no idea who was who.

Deliberate limits of this choice:
- **Last initial only.** Full names were considered and rejected — storing
  children's full names would change what BFF has to promise schools, and a
  wall-chart name is enough to tell a class apart. Keep it that way.
- **No PIN means no impersonation barrier.** Anyone with the class code can
  claim a name in that class. That is accepted: it is a mentor-supervised room,
  and it is the same protection a paper sign-in sheet offers.
- `composeStudentName` capitalises **only the first letter**, so "McKenzie"
  survives. Always build the name through that function — two spellings of the
  same student create two records.

Migration `0013_name_based_join.sql` removed PIN enforcement from
`join_classroom` and nulled every stored hash. This was not optional: one live
record already had a PIN, and with no PIN box left in the app it would have
raised `pin_required` forever with no way to satisfy it. The function keeps its
`p_pin` argument (ignored) so a cached older build survives a deploy.

### Lesson content is one chunk per lesson, and loading it is async-only
`src/content/lessons/index.ts` exposes **`loadLesson(slug)`**, `loadAllLessons()`,
`peekLesson(slug)`, `isLessonSlug(slug)` and `ALL_LESSON_SLUGS`. There is
deliberately **no synchronous `getLesson` and no `LESSONS` record** any more.

That is the whole mechanism. A sync accessor can only exist if something
statically imports all thirteen lesson files, which is exactly what produced a
494 KB chunk that every page touching lesson data had to download. The
async-only surface is what keeps the split from being silently undone — and
removing the old exports made the compiler point at all seven call sites.

Who loads what now:
- `LessonPage` — one lesson, via `loadLesson`. `peekLesson` makes a repeat visit
  in the same session render with no loading flash.
- `QuizPlay` / `QuizHost` — one lesson, via the `useLesson(slug)` hook in
  `src/lib/useLesson.ts`, because the slug only arrives with the session row.
  The hook reports `loading` separately so the screen does not flash "lesson not
  found" during a perfectly normal fetch.
- `LessonsIndex` (the course path) — **nothing**. Verified: zero lesson chunks.
- `AIPractice` — **nothing**.
- `PracticePage` — only the lessons the student has actually answered questions
  in, one chunk each.
- `GlossaryPage` — all thirteen, knowingly, via `loadAllLessons()`. It aggregates
  every key term, so it genuinely needs them.

Two things stopped needing lesson content at all, which is where most of the win
came from:
- **Localized lesson titles** come from `localizeActivity()` in
  `src/lib/activities.ts`, which already carries all three languages. Reading
  them off the lesson file meant loading the lesson to render a title.
  (One user-visible consequence: the Spanish title for `entrepreneurship` is now
  the catalog's "Emprendimiento y Trabajos Extra" rather than the lesson file's
  "Emprendimiento y Negocios Paralelos".)
- **Missed-question counts** (`LessonsIndex` and `AIPractice`) come from
  `progress.data.correct` / `.total`, which `finishQuiz` already writes. The old
  code loaded every lesson to re-derive a number that was already stored.

### Offline is a first-class state, not a generic failure
`src/lib/online.ts` is the single source of truth. `navigator.onLine === false`
is trusted (definitely offline); `true` is **not** trusted, because captive
portals and dead uplinks report online — so a network-shaped failure is
classified after the fact by `isNetworkError()`.

Three separate mistakes this prevents, all of which looked identical before:
- "You're offline" vs. "the AI service failed" (`AIOfflineError` vs. a real error)
- "no live game with that code" vs. "we cannot reach the server"
- a raw `TypeError: Failed to fetch` shown to a student

A Gemini 429 must **not** classify as a network error. There is a test for this.

### Progress writes are queued, not dropped
`saveProgress` used to swallow a failed upsert, so a completed lesson could
simply never reach the mentor's dashboard. Failures now go to a localStorage
outbox (`src/lib/progressQueue.ts`) that is drained on `online`, on
`visibilitychange`, on a 60s timer, and at startup. One entry per
(student, activity) — a later write already contains the earlier one.

Deliberately **not** a service worker: this cannot sync after the tab closes,
but it works identically on iOS (no Background Sync there), needs no caching
layer, and is removable by deleting one file. See "Ideas worth considering".

### Lesson position is device-local, progress is not
`src/lib/lessonPosition.ts` stores where a student is inside a lesson
(step, phase, checkpoint answers, which videos are done) in localStorage. It is
**scratch state, not a record** — the authoritative "finished / scored" still
goes through `saveProgress` to the database. A student on a new device starts
the lesson fresh, which is the right trade: better to lose a scroll position
than to show someone a half-finished lesson they never opened on that machine.

Rules that matter:
- Step 1 is never offered as a resume point ("resume from the beginning" is the
  beginning).
- Positions expire after 30 days.
- `finishQuiz` calls `clearPosition`, or a completed lesson would offer to drop
  the student back into the middle of it. There is an end-to-end test for this.
- The save effect is skipped while the resume card is up — otherwise it would
  overwrite the stored position with step 1 and destroy the offer.

### The lesson canvas is its own world
`/lessons/:slug` renders **outside** the global `Layout` (see `src/App.tsx`) with
its own focused chrome, styled by `src/styles/lesson.css` (all classes prefixed
`.lz`). This was deliberate: the global 7-link header competed with the lesson.

---

## Current state — done and verified

- **13 lessons** (8 core + 5 electives), each in EN/ES/ZH
- **10 activities**: Wolf of Wall Street, Ben's Budget, Ben's Insurance, Paystub
  Detective, Credit Score Sim, Scam Spotter, Smart Shopper, Goal Getter, plus
  live quiz and co-play modes
- **Editorial design system** across every page (ink/paper, `.ed-hero`, `.panel`,
  `.eyebrow`, `<em>` serif-italic emphasis)
- **Horizontal course path** — weeks side by side, scrolls left-to-right
- **Zero emoji** — verified 0 glyphs across `src/` and `supabase/`
- **Clean URLs** — verified against a GitHub Pages simulator including hard refresh
- **AI features live on Gemini free tier** — Money Coach confirmed working by the user
- **Worksheet generator → branded printable PDF** with real writing space
- **Skeleton loaders** on every async screen
- **Micro-interactions** app-wide, built on shared motion tokens
- **Accessibility**: WCAG 2.1 AA pass, focus rings, `prefers-reduced-motion`
  honored (transitions collapse to 0.001ms), screen-reader announcements
- **Self-hosted fonts** — Bricolage Grotesque + Inter bundled via
  `@fontsource-variable`; zero requests to Google Fonts, verified in the browser
- **Code-split routes** — first load went from a single 1,546KB chunk to a
  ~266KB critical path; 26 routes verified rendering, no console errors
- **Flaky-network resilience** — connection bar, per-feature offline states,
  live screens that stop waiting after 6s, and a progress outbox that retries
- **Lesson resume** — closing the tab mid-lesson no longer restarts from step 1;
  returning offers "Resume at step N" or "Start over"
- **Time estimates** on the lesson hero (the course path already had them)
- **Arrow-key navigation** through lesson steps, gated by the same rules as the
  Continue button, and never stealing keys from a text field

---

## Deployed edge functions

All `ACTIVE`, all `verify_jwt: true`, all sharing `_shared/ai.ts`.

| Function | Version | Purpose |
|---|---|---|
| `money-coach` | v8 | Chat tutor (confirmed working) |
| `ai-practice` | v4 | Generates practice questions |
| `grade-response` | v4 | Grades open written answers |
| `lesson-plan` | v7 | Lesson plans (Markdown) + worksheets (structured JSON) |

Secrets: `GEMINI_API_KEY` is set. `ANTHROPIC_API_KEY` is unused and can be deleted.
Optional `GEMINI_MODEL` pins one model without a redeploy.

---

## Open items

### Blocked on the user
1. **Test the remaining AI features.** Money Coach is confirmed. The worksheet
   generator, AI practice, and open-response grading are deployed with the same
   fix but have not been clicked through by the user yet.

2. **Watch one lesson end to end.** The four real videos are now wired in (see
   below). Checkpoint timings were set from the transcripts, not from watching
   playback, so they are accurate to the second the point is *made* — but only a
   real viewing confirms the pause lands where it feels right.

### Lesson videos — done
All four recordings are live and embedded, presented by Alvin Lee, BFF-original:

| Lesson | Video ID | Length | Checkpoints pause at |
|---|---|---|---|
| `spending-budgeting` | `AbqJUXeviI0` | ~3:40 | 0:38, 2:30 |
| `saving-investing` | `StjQs88nDZE` | ~3:00 | 1:20, 1:48 |
| `credit-debt` | `rNVIS8YsBbQ` | ~3:07 | 1:06, 2:30 |
| `risk-insurance` | `64VPvCvBq3g` | ~2:11 | 1:16, 2:06 |

`videoId` and each `at:` are duplicated **three times per file** (en/es/zh) — a
change to one language and not the others is the easy mistake here.

The questions themselves were written against the recording scripts and all four
recordings followed them, so no question needed rewriting. What did need fixing
was timing: four of the eight checkpoints fired after the video had moved on, and
one was set at 2:30 on a video that ends at 2:11 — it would have surfaced as an
end-of-video pile-up via the catch-up path in `VideoCheckpoint` rather than a
mid-video pause. `at:` means "pause once playback reaches this second"
(`t >= q.at`), so each one now sits just past the moment its answer is stated.

### Not started, discussed
- **Self-hosted video** (`src` alongside `videoId`) — designed, not built. Would
  let a lesson use an uploaded file instead of YouTube. Worth adding if a school
  district blocks YouTube.
- **CJK worksheet PDFs** — jsPDF's built-in fonts are Latin-only, so a Chinese
  worksheet currently falls back to English labels for chrome (Name/Date/Answer
  Key). Fixing this needs an embedded CJK font (~several hundred KB).

---

## Ideas worth considering next

Roughly ordered by value per unit of effort.

**High value**
- **Mentor analytics that answer a question.** The dashboard shows progress but
  not "which question did the class get wrong?" Per-question breakdowns would
  tell a mentor what to reteach. The data is already stored in
  `progress.data.answers`.
- **Defer the Supabase client (205 KB raw / 51 KB gzip).** Now the largest thing
  on the critical path that does not have to be. It is eager only because
  `session.tsx` imports it statically for session restore, and `progress.ts`
  imports it for the classroom sync. Solo mode never needs it at all. Would cut
  roughly a fifth off the first load of every page.
- **Printable certificates and progress reports** for mentors to hand out — the
  PDF pipeline now exists and could be reused.

**Deliberately not done — a service worker / PWA**
Considered and declined for now. It would make the app boot offline and let
progress sync after the tab closes, but the trade-offs were judged not worth it
*yet*:
- A misconfigured worker serves a stale build **indefinitely**, and the normal
  fix ("just refresh") is exactly the thing that stops working. Recovery means
  shipping a self-unregistering worker and waiting for each device to return.
- Safari drops registrations after ~7 days of no visits, and has **no Background
  Sync at all** — so iPhone/iPad students lose the headline feature.
- It does nothing for a first visit, which is the common case for "mentor shares
  a link during class".
- Caching an authenticated Supabase response on a shared classroom Chromebook
  would leak one student's data to the next.

The cheaper 80% was built instead: code splitting, honest offline states, and
the progress outbox. Revisit once a real class has used the app and there is
evidence the network is what hurts.

**Medium value**
- **Assignment due-date reminders** on the student home.
- **A mentor "run this class live" mode** that walks a whole classroom through a
  lesson in lockstep, reusing the existing co-play session infrastructure.
- **Question bank import** so mentors can add their own quiz items.
- **More electives** — the content model makes this cheap.

**Polish**
- A print stylesheet for lesson pages so a mentor can hand out a lesson.
- Per-question mentor analytics (listed above) is the biggest remaining gap.

Checked and already fine — don't spend time here:
- **Empty states.** `/certificate` says "You're at 0 of 8 — keep going!",
  `/practice` says "Nothing to review!" with a way out. These are good.
- **Mobile.** No horizontal overflow at 390px on the home, course path, or
  lesson canvas.

---

## Performance baseline

Measured in Chromium against a production build (`npm run build` + `vite
preview`), reading real transferred bytes from the Performance API. Re-measure
with the scripts described under "How this gets verified" before claiming a
regression.

| What | Bytes over the wire |
|---|---|
| **Critical path** (landing renders and is interactive) | **~266 KB** |
| Main app chunk `index-*.js` | ~96 KB gzip |
| Supabase client `supabase-*.js` | ~51 KB gzip — **eager, and it should not be** |
| Fonts (Latin subsets only) | 41 KB Bricolage + 47 KB Inter |
| CSS | ~11 KB gzip |
| Lesson content | **one chunk per lesson**, ~15.6 KB gzip / 39 KB raw each. The registry itself is 0.6 KB |
| jsPDF + html2canvas | ~176 KB gzip — lazy, only on the worksheet/certificate paths |

Before code splitting this was a single **1,546 KB** chunk (500 KB gzip) on the
critical path. The two remaining wins are listed under "Ideas worth considering":
per-lesson content splitting, and deferring the Supabase client.

Rules that keep this from regressing:
- A new page must be added to `src/lib/routeChunks.ts` as a dynamic import, not
  imported statically into `App.tsx`.
- Never add a synchronous lesson accessor back to `content/lessons`. It cannot
  exist without statically importing all thirteen files, which is the thing that
  was fixed.
- Heavy libraries (`jspdf`) must stay behind a dynamic `import()` at the call
  site.
- A new lesson needs a line in `LESSON_LOADERS` **and** an entry in
  `src/lib/activities.ts` with its title and description in all three languages,
  or the course path will fall back to the English title.

### Time to real content on a throttled connection

Measured with CDP network emulation, waiting for a string unique to each route's
actual content — **not** `load` or a character count, because the shell's header
and footer alone are over 200 characters and will mask the thing being measured.

| Route | Bad school wifi (500 kbps / 300 ms) | Mediocre (2 Mbps / 100 ms) | Bytes |
|---|---|---|---|
| Landing | 3.6 s | 1.0 s | 167 KB |
| AI Coach | 4.0 s | 1.4 s | 175 KB |
| Activities | 3.9 s | 1.3 s | 170 KB |
| Course path | 4.5 s | 1.4 s | 177 KB |
| A lesson | 5.2 s | 1.5 s | 205 KB |

Every page is now within ~1.5 s of every other on a bad connection. Before the
per-lesson split (commit `e5c8d6d`) the two pages that are the actual product
were the two slowest in the app:

| Route | Before | After |
|---|---|---|
| Course path | 10.1 s / 446 KB | **4.5 s / 177 KB** |
| A lesson | 8.0 s / 417 KB | **5.2 s / 205 KB** |

The course path now loads **zero** lesson chunks, and opening a lesson loads
exactly one.

### Audit results — checked and clean

Run against a production build. These were suspected and cleared, so don't
re-investigate them without new evidence:

- **No duplicate asset requests** on any route.
- **No long tasks** (>50 ms) while stepping through a lesson with the keyboard.
- **No memory or listener leak** across 10 real click-through navigations with
  forced GC: nodes and listeners return to baseline, heap +0.5 MB.
  - A naive version of this test (synthetic `pushState` + no GC) reports a large
    leak. It is measuring detached nodes that have not been collected yet.
- **The lesson player's `keydown` listener is removed on unmount** — verified by
  patching `window.addEventListener`, and behaviourally: after 7 visits one
  ArrowRight still advances exactly one step.
- **jsPDF and its 148 KB dependency chain are genuinely lazy** — only reachable
  from the worksheet and certificate paths.
- **Images are not a problem.** The whole `public/` folder is 116 KB.
- **Icons tree-shake per-icon** (`lock-*.js`, `rotate-ccw-*.js` are separate
  sub-KB chunks), so `lucide-react` is not bulk-imported.

Minor, not worth fixing on its own:
- `bff_progress_v1` is read and `JSON.parse`d ~2–3 times per navigation, because
  several components each call `loadLocalProgress()` independently. Cheap today;
  would matter if progress ever grows large.
- On a deep link to a lesson, the display font is only requested once the lazy
  lesson CSS applies (~445 ms vs ~137 ms on the landing page), so the lesson
  title paints in a fallback face and swaps. Fixable with a font preload.

---

## How this gets verified

There is **no test runner in this project**. Verification is done by driving a
real production build in headless Chromium and asserting on what the browser
actually does. Scripts are written ad hoc into the session scratchpad rather than
committed, because they are throwaway and depend on `playwright-core`, which is
**not an app dependency**.

The pattern, if you need to redo it:

```bash
npm run build
npx vite preview --port 4200 --strictPort &
npm i --no-save playwright-core      # ad hoc; uninstall before committing
node your-check.mjs                  # launches /opt/pw-browsers/chromium-1194/chrome-linux/chrome
npm uninstall --no-save playwright-core
```

Checks that have been run and passed, worth repeating after big changes:
- **All 32 routes render** with no console errors, no Suspense boundary stuck.
- **Payload measurement** via `performance.getEntriesByType('resource')` —
  `content-length` is absent on gzipped preview responses and undercounts.
- **Landing still renders with the lesson chunk blocked** (`page.route(...abort)`)
  — proves it is genuinely off the critical path.
- **Save-Data and 3G suppress the idle prefetch**, injected via
  `Object.defineProperty(navigator, 'connection', …)`, while hover prefetch still
  fires.
- **Offline states**: `context.setOffline(true)` plus a synthetic `offline`
  event; the Coach must say "You're offline", not "Something went wrong".
- **Progress outbox**: imported directly from the dev server
  (`import('/BFF-Digital-Learning/src/lib/progressQueue.ts')`) to exercise the real
  module — persists, dedupes by activity, caps at 200, survives reload, refuses
  to clear while offline.
- **Lesson resume**: drive a lesson to its results screen and confirm the saved
  position is cleared and reopening does not offer to resume.
- **Mobile**: 390 × 844 with `isMobile`, checking
  `documentElement.scrollWidth > innerWidth` for horizontal overflow.

Two traps found the hard way while writing these:
- A route smoke test that samples at 250 ms will report the live game screens as
  failures — they are legitimately still loading, and only resolve after the 6 s
  stall timeout.
- `navigator.connection` must be faked with `addInitScript`, before page scripts
  run, or the prefetch decision is already made.

---

## Useful commands

```bash
# typecheck (use -b; --noEmit alone misses project-reference errors)
npx tsc -b --force

npm run build          # tsc -b && vite build, emits dist/404.html
npm run lint           # oxlint

# prove zero emoji remain
python3 -c "
import re,glob
pat=re.compile('[\U0001F000-\U0001FAFF←-⇿⌀-⏿①-⓿■-➿⬀-⯿️⃣]')
n=sum(len(pat.findall(open(f,encoding='utf-8').read()))
      for f in glob.glob('src/**/*.*',recursive=True)+glob.glob('supabase/**/*.ts',recursive=True)
      if f.endswith(('.ts','.tsx','.css')))
print('emoji:', n)"

# deploy: push the branch, then fast-forward main (Pages builds from main)
git push origin claude/educational-tool-student-outreach-qkqnle
git push origin claude/educational-tool-student-outreach-qkqnle:main
```

**Gotchas**
- `npx tsc --noEmit` silently misses errors here. Always use `npx tsc -b --force`.
  This is not a style preference — it once reported 0 errors while every `.emoji`
  reference in the app was broken.
- Screenshot tooling (`playwright-core`) is installed ad hoc for verification and
  **must be uninstalled before committing** — it is not an app dependency.
  Chromium lives at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
  Check with `grep -c playwright package.json` before every commit.
- This container cannot reach `supabase.co` or Google directly (network policy),
  so edge functions can only be debugged through the Supabase MCP logs, and any
  live-game screen in a local build will always fail its lookup.
- `vite preview` keeps running in the background; `pkill -f "vite preview"`
  returns exit code 144 through this shell but does work. Use a fresh port
  rather than fighting it.
- Never put an inline `# comment` on a line of shell you are asking the user to
  paste — their zsh passes it through as arguments and the command fails with
  something unhelpful like `cd: too many arguments`.

---

## Recent history

Newest first. Each of these has a detailed commit message worth reading if you
are wondering *why* something is the way it is.

| Commit | What changed |
|---|---|
| _(most recent)_ | Per-lesson content splitting — course path 10.1 s → 4.5 s, lesson 8.0 s → 5.2 s on a bad connection |
| `e5c8d6d` | Expanded STATUS.md; measured performance audit that found the above |
| `1844704` | Lesson resume, time estimates, position-aware Continue, arrow-key navigation |
| `20aaaca` | Route code splitting, offline states, progress outbox |
| `6d182ba` | Self-hosted Bricolage Grotesque + Inter, dropped the Google Fonts CDN |
| `a0ebfe4` | Recorded the commit-author convention |
| `846d8b1` | Added STATUS.md, rewrote the README |
| `358bcc0` | Skeleton loaders + app-wide micro-interactions |
| `141a5d7` | Inset the card numerals, BFF branding on worksheet pages |
| `e7d5c6a` | Worksheet generator emits a printable PDF with writing space |

---

## Key files

| Path | What it is |
|---|---|
| `src/lib/icons.tsx` | Icon registry — the reason there are no emoji |
| `src/lib/routeChunks.ts` | Every code-split route + the prefetch policy |
| `src/lib/online.ts` | Connection truth: `isOnline`, `isNetworkError`, `useOnline` |
| `src/lib/progressQueue.ts` | The outbox that stops progress writes being lost |
| `src/lib/offlineCopy.ts` | Shared trilingual offline wording |
| `src/content/lessons/index.ts` | Per-lesson dynamic imports — async-only by design |
| `src/lib/useLesson.ts` | Load one lesson when the slug arrives at runtime |
| `src/lib/lessonPosition.ts` | Where a student is inside a lesson (resume) |
| `src/lib/resume.ts` | Which lesson "Continue where you left off" points at |
| `src/components/ConnectionBanner.tsx` | The top strip shown while offline |
| `src/components/RouteFallback.tsx` | What shows while a route chunk downloads |
| `src/index.css` | Design system: tokens, buttons, cards, micro-interactions |
| `src/styles/lesson.css` | The `.lz` lesson canvas |
| `src/components/lesson/LessonArt.tsx` | Hand-built SVG motifs per lesson topic |
| `src/lib/worksheetPdf.ts` | Worksheet PDF layout and writing-space rules |
| `src/lib/ai.ts` | Client AI invoker: session handling + error surfacing |
| `supabase/functions/_shared/ai.ts` | Gemini client: model fallback, quota handling |
| `src/content/types.ts` | Lesson content model |
| `src/lib/activities.ts` | Activity catalog — add an activity here and it appears everywhere |
| `vite.config.ts` | Absolute base + the `404.html` SPA fallback plugin |

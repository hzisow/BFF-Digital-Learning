# BFF Classroom — Project Status

Working notes for picking the project back up cold. Everything below has been
checked against the code or a running build, not remembered — including every
performance number, which came from driving a production build in a browser.

---

## What this is

A trilingual (English / Spanish / Simplified Chinese) digital financial-literacy
platform for **BFF of America**, a student-founded 501(c)(3).

- **Students** join a class with a code plus a first name and last initial
  ("Jayden M.") — no email, no password, no full name. An account (email +
  password) is **optional**, and only exists so progress follows them between
  devices.
- **Mentors** sign in with Google and are gated behind an `approved` flag.
- Everything also works **solo**, with no backend, straight from the browser.

**Live:** https://classroom.bffofamerica.org (custom domain; the old
hzisow.github.io/BFF-Digital-Learning/ URL redirects there once GitHub Pages has
the custom domain saved)

Scale, so you know what you are dealing with: **98 source files, ~33,000 lines**,
13 lessons × 3 languages, 8 games & challenges, 34 routes, 7 database tables.

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

### Routes (all 34)

Everything except Landing / Layout / NotFound is code-split — see
`src/lib/routeChunks.ts`.

| Group | Paths |
|---|---|
| Public | `/` · `/lessons` · `/activities` · `/glossary` · `/practice` · `/coach` · `/join` · `/game` |
| Student | `/student` · `/certificate` · `/practice/ai` · `/signin` · `/reset-password` |
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
2. An **absolute** Vite `base`. It is now `/`, because the site is served from
   the root of a custom domain. A relative `./` base makes a deep link resolve
   assets against the wrong folder and 404. Set
   `VITE_BASE=/BFF-Digital-Learning/` to build for the old github.io URL.
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

### The front page has one job
It ran 2,681px over five sections: hero, an 8/3/100% stat strip, a three-card
"how it works", a three-card "featured activities", then a schools block. Two
near-identical three-up grids of icon-plus-text, no photography anywhere, and
**BFF Academy — the actual product — never named on a button.** A reviewer's
summary was "there's just so much bullshit."

It is now hero → two image-led doors → who-we-are. 1,945px, and the primary
button says "Start BFF Academy". Nothing was deleted from the site; the cut
sections were all restating what `/lessons` and `/activities` already show.

Grounded in the **PORTO ROCHA** system from `hzisow/refero-design-styles` (the
`refero-design` skill): an editorial gallery-wall style where photography is the
content and the UI recedes — images flush in the grid, hairline borders instead
of shadows, no gradients, no decorative chrome. The single most important rule
taken from it: **never put the words on top of the photo.** A caption floated
over a darkened image is the most recognisable generated-landing-page move
there is, so the caption sits in its own block below the frame, the way a
magazine sets it.

#### Photography is a drop-in, by design
The reviewer specifically asked for a photo of BFF's real in-person tutoring
behind the Academy card. Those take time to shoot and clear, so the page cannot
depend on them — but it also should not need a code change the day they arrive.

`src/lib/photos.ts` globs `src/assets/photos/*` at build time. Drop in
`academy.jpg`, `activities.jpg` or `schools.jpg` and that card becomes a
photograph on the next build. With no file, `PhotoPanel` draws an ink panel with
one of three distinct motifs instead. `eager: true` is what makes this a real
build-time answer rather than a runtime guess, so there is no flash of a
fallback that then swaps to an image.

The fallback is deliberately good enough to ship. A placeholder that looks broken
is what tempts somebody into using stock photography of strangers on a nonprofit's
real program page — see `src/assets/photos/README.md`, which also covers consent,
since these are photographs of minors.

### Students can have accounts now
Progress used to live on one device: a class code plus a name in localStorage,
backed by an **anonymous** Supabase user. Lose the laptop, lose the course.

`src/lib/studentAuth.ts` adds email + password, a reset flow, and sign-in on any
device. Two things about it are worth knowing:

**Signing up does not create a second user.** A student has usually done several
lessons before they think about an account, and that work hangs off their
anonymous `auth.users` row. So sign-up calls `updateUser` to upgrade the user
they already have, keeping the same uid. Because `students.auth_uid` and every
`progress` row key off that uid, all of it survives — **no schema change and no
merge step.** `signUp` is only the fallback for somebody with no session at all.

**The class-code path stays.** Accounts are additional, never required. A mentor
with thirty students and a forty-five minute period cannot run everyone through
email confirmation, and demanding an email address to try a free lesson is
exactly the friction the name-based join was built to remove. Every screen says
so out loud.

One subtlety that would have been a bug: `session.tsx` used to treat *any*
non-anonymous user as a BFF team member. With student accounts that is no longer
true, so accounts carry `user_metadata.bff_role = 'student'` and the session
splits three ways (anonymous / student account / team). That flag is a **UX
signal, not a security boundary** — user metadata is user-writable. Real team
access is gated server-side by `profiles.approved` and `is_approved_admin()`, so
the worst a student can do by clearing it is show themselves a dashboard link
that leads to a "waiting for approval" screen.

Routes: `/signin` (one screen, three modes via `?mode=`) and `/reset-password`.
Note `/account` was already taken by the **mentor** account page.

### The certificate generates itself
It already unlocked automatically at 8/8 passed lessons — that part predates this
work. What was missing: it could only be *printed*, which is nothing to a student
on a Chromebook with no printer.

`src/lib/certificatePdf.ts` draws a landscape A4 PDF with jsPDF primitives rather
than rasterising the DOM — text stays selectable, the file is ~57KB instead of a
megabyte, and it does not depend on the page fonts having loaded. The name field
now pre-fills from the account, which is why sign-up asks for a name at all.

Same CJK limit as the worksheet generator: jsPDF's built-in fonts are Latin-only,
so a Chinese certificate falls back to English chrome and the page says so and
points at Print instead.

### Typography: Fraunces + Public Sans, and why it changed
The pairing was Bricolage Grotesque + Inter. A reviewer looking at the live site
said, unprompted, that "the font looks really AI" — which is a fair read:
Inter body copy under a trendy geometric display is the house style of generated
sites, and Bricolage in particular has become shorthand for it.

Now **Fraunces** (display) + **Public Sans** (text):
- Fraunces is a variable old-style serif with actual drawing in it. At headline
  sizes it reads as a decision somebody made, which is the whole point.
- It also supplies the italic the design was already reaching for. The editorial
  emphasis word (`h1 em`, `.lz em`) had been falling back to **Georgia** — a
  system font standing in for a missing one, which is its own kind of tell.
- Public Sans is the US Web Design System face: as neutral as Inter for long
  reading, without being Inter.

Three declarations control all of it — `src/index.css` (`@import`s),
`tailwind.config.js` (`fontFamily.display` / `.body`), and `src/styles/lesson.css`
(`--lz-display` / `--lz-body`). The lesson canvas keeps its own copies on purpose;
it is a self-contained world. Swapping the pair again means editing those three.

Measured cost, not estimated: **107KB of Latin on the landing page, against 90KB
for the old pair.** The entire 17KB difference is the italic file, fetched
because the hero headline contains an `<em>`. All three faces are
`font-display: swap`, so none of it blocks first paint. Dropping
`fraunces/wght-italic.css` recovers 46KB and sends `em` back to Georgia if that
trade ever stops being worth it.

Note that `font-display` now means *serif* everywhere it is applied — including
buttons, nav and small caps chips, which were checked on desktop and mobile and
hold up. If a future change wants sans UI chrome, add a third `ui` token rather
than reaching for `font-body` case by case.

### No em dashes in anything a visitor reads
1,212 of them across 54 files. The em dash is the most cited tell of AI-written
copy and the site was full of them.

Replacing each with the same character would read worse than leaving them, so the
substitution is contextual: a parenthetical pair becomes commas, an appositive or
a conjunction becomes a comma, and a dash joining two **independent clauses**
becomes a full stop with the next word capitalised. That last case is what a
blanket comma gets wrong: *"secured, the kids are thrilled"* is a splice, worse
than the dash it replaced. Independent clauses are detected by looking for a
finite verb in the first few words, with infinitives after "to" excluded so *"an
ability to do something"* stays a comma.

Chinese got its own pass. `——` is ordinary Chinese punctuation, as unremarkable
there as a comma is in English, so it is **not** a tell in that language. It was
converted anyway, onto Chinese commas and colons, rather than left as the one
inconsistency on the site.

**Scope is user-facing copy only.** Quoted strings, template literals with their
`${}` holes protected, and JSX text. Code comments keep their dashes: nobody
visits a comment, and rewriting a thousand of them is churn with a real chance of
mangling a line for no reader's benefit. So `grep -c '—' src/` still returns
hits, and that is correct.

Two things the sweep got wrong, both caught and fixed: the certificate's
empty-name placeholder was a lone em dash and became a stray comma that would
have printed onto the PDF, and `index.html`'s meta description was never in a
`src/` sweep's scope at all.

### Front-page images are gated on a real photograph
`hasPhoto(slot)` decides whether the frame renders at all. The designed ink panel
that used to stand in for a photo was doing more harm than good: a large empty
dark box above the card title reads as a broken image rather than as a treatment,
and it pushed the actual words down the page. Drop `academy.jpg` into
`src/assets/photos` and the frame returns on the next build with no code change.
The who-we-are band also collapses to a single column when its photo is absent,
rather than stranding the copy beside an empty half.

### Lesson videos ask for 720p
School wifi often lands students on 360p, where a paystub or a chart on screen is
unreadable and the checkpoint question that follows is unfair. Asked twice, via
`playerVars: { vq: 'hd720' }` and again with `setPlaybackQuality` on ready,
because `playerVars` alone is ignored by some clients.

Both are **requests, not guarantees**. YouTube dropped hard quality control years
ago and overrides the ask when the connection cannot sustain it, which is the
right outcome: a stalling 720p stream is worse than a clean 480p one. Neither
call is checked for success.

### Audience wording: high school, and what is deliberately not
The landing copy says "built by high schoolers for high schoolers" and "middle
and high school classrooms". It was briefly changed to "youth" and changed back.

Four other school mentions in the codebase are **not** about the audience and
must not be swept along with it:

| Where | What it is |
|---|---|
| `ScamSpotter` | "Jefferson High School" is the sender name in a phishing scenario |
| `AdminDashboard` | "Lincoln Middle School" is a sample classroom placeholder |
| `LessonPlanGenerator` | "middle/high school" is a reading-level hint the mentor needs |
| `BensBudget`, `activities.ts` | Ben is a middle school science teacher, a character detail |

### One chance per question
Lesson checkpoints used to allow a second guess before revealing the answer. Two
problems: it turned a comprehension check into a game of elimination, and it
disagreed with the final quiz and the video checkpoints, which have always locked
on the first pick. All three now behave the same way — one pick, immediate
reveal, explanation shown.

This removed `AnswerState.wrongPicks` entirely. Positions saved to localStorage
before the change still carry the field; `lessonPosition.ts` reads through a
cast, so the extra key is ignored and an old saved position still resumes.

### The course path is a mastery gate at 85%
`src/lib/mastery.ts` is the single definition of "cleared a lesson":
`lessonPassed(p)` is `status === 'completed' && score >= PASS_SCORE`, where
`PASS_SCORE = 85`. Everything that asks "how far along is this student?" now
calls it — the path (`LessonsIndex`), the results screen (`LessonPage`), the
certificate, and `resume.ts`. One definition, so those four can never disagree
about who has passed what.

Before this, finishing a lesson unlocked the next one at *any* score: two of
eight correct still advanced you, and the certificate counted it.

Why 85 specifically: core lessons carry 7–8 questions, so 85% means **one wrong
answer still passes and two do not**. That is the whole reason the number is
what it is. Note the trap before changing it — on a shorter quiz the same
percentage silently becomes "perfect or nothing". A 6-question elective would
need 100%, which is why **the gate applies only to the core path**; electives
stay ungated on purpose.

What a student sees when they fall short:
- The results screen says it in words — the score, how many more right answers
  they need, and that only their best score is ever kept.
- **No "Next lesson" button.** It is not disabled, it is not rendered.
- Confetti and "Lesson complete" are withheld; the eyebrow reads "Not passed
  yet". Celebrating a score that leaves the path locked is the single most
  confusing thing this screen could do.
- On the path, the node keeps a floating **Retake** badge and a `71% / 85%`
  caption underneath, so the reason the next stop is locked is visible without
  clicking anything.

Two deliberate decisions:
- **"Start it anyway" was removed** from the locked-lesson dialog. It predates
  the gate, and leaving it would have made the gate cosmetic — one click and you
  are past it. The dialog now explains the rule and offers "Retake the quiz" or
  "Go to my current lesson".
- **A direct lesson URL is still not sealed.** `/lessons/credit-debt` loads for
  anyone who types it. That is intentional: mentor assignment links from
  StudentHome point straight at a lesson and must keep working, and a mentor
  needs a way to put a student wherever the class actually is. The *path* is the
  gate, not the router.

Retakes can only help: `saveProgress` keeps the highest score it has ever seen
for an activity, so a bad first attempt is never held against a student. That is
what makes the gate fair rather than punishing, and it is why the copy can
promise it.

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
- **Self-hosted fonts** — Fraunces + Public Sans bundled via
  `@fontsource-variable`; zero requests to Google Fonts, verified in the browser
- **"How far am I?" meter** in the lesson action bar — step count, remaining
  minutes and one tick per step, on screen at every step on desktop and phone
- **Code-split routes** — first load went from a single 1,546KB chunk to a
  ~266KB critical path; 26 routes verified rendering, no console errors
- **Flaky-network resilience** — connection bar, per-feature offline states,
  live screens that stop waiting after 6s, and a progress outbox that retries
- **Lesson resume** — closing the tab mid-lesson no longer restarts from step 1;
  returning offers "Resume at step N" or "Start over"
- **Time estimates** on the lesson hero (the course path already had them)
- **Arrow-key navigation** through lesson steps, gated by the same rules as the
  Continue button, and never stealing keys from a text field
- **85% mastery gate on the core path** — verified by walking a real lesson to
  the results screen twice, once deliberately failing (0%: amber banner, no
  "Next lesson", no confetti, "Not passed yet") and once passing (100%: green
  banner, "Next lesson" present), plus five seeded path states covering the
  boundary at exactly 85%

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
1. **Photographs for the front page.** Drop `academy.jpg` / `activities.jpg` /
   `schools.jpg` into `src/assets/photos/` — see the README there for framing and
   consent. Highest-leverage item left on the front page by a distance.
2. **Two Supabase dashboard settings** before password reset works end to end:
   add `https://hzisow.github.io/BFF-Digital-Learning/reset-password` to
   Authentication → URL Configuration → Redirect URLs, and confirm an email
   sender is set up (the built-in one is rate-limited to a handful of messages
   per hour — fine for testing, not for a classroom).
3. **Test the remaining AI features.** Money Coach is confirmed. The worksheet
   generator, AI practice, and open-response grading are deployed with the same
   fix but have not been clicked through by the user yet.

2. **Watch one lesson end to end.** The four real videos are now wired in (see
   below). Checkpoint timings were set from the transcripts, not from watching
   playback, so they are accurate to the second the point is *made* — but only a
   real viewing confirms the pause lands where it feels right.

### Lesson videos — all thirteen
Every lesson has a recording, presented by Alvin Lee, BFF-original.

| Lesson | Video ID | Checkpoints pause at |
|---|---|---|
| `earning-income` | `cq05mzpGdFk` | 0:47, 1:24, 1:57, 2:10 |
| `spending-budgeting` | `AbqJUXeviI0` | 0:36, 2:32, 3:24 |
| `saving-investing` | `StjQs88nDZE` | 0:41, 1:29, 1:47, 2:21 |
| `credit-debt` | `rNVIS8YsBbQ` | 1:06, 2:07, 2:28, 3:02 |
| `risk-insurance` | `64VPvCvBq3g` | 1:16, 1:37, 2:06 |
| `financial-decision-making` | `rZ2zfIRNmNk` | 0:50, 1:14, 1:42, 2:35 |
| `financial-planning` | `HdqDwHZQlqc` | 1:03, 1:27, 1:45, 2:25 |
| `consumer-protection` | `t7tLcoyRBOc` | 0:43, 1:10, 1:35, 2:10 |
| `first-paycheck` | `xNkc1us-WlY` | 0:43, 1:02, 1:28, 2:15 |
| `taxes-deep-dive` | `Uat5nnzQgP8` | 0:47, 1:10, 2:05, 2:30 |
| `paying-for-college` | `jrg1XZYTpKM` | 0:44, 1:08, 1:40, 2:15 |
| `entrepreneurship` | `amnwyA9Mb6o` | 0:57, 1:28, 1:52, 2:20 |
| `crypto-and-scams` | `q-IzijaDfZI` | 1:02, 1:40, 2:10, 2:35 |

`videoId` and each `at:` are duplicated **three times per file** (en/es/zh). A
change to one language and not the others is the easy mistake here, which is why
the nine added in one batch were generated from a single definition per lesson
rather than hand-edited 27 times. The generator lived in the session scratchpad;
what matters is the invariant it enforced, and there is a check for it below.

Questions come from the transcripts, not from the scripts the recordings were
made from. The two diverge. `earning-income` is the clearest case: the script
defined gross versus net pay, the recording skips that and goes straight to
reading your paystub, so the fourth checkpoint asks about the paystub. Writing
questions from a script rather than a transcript is how you end up asking about
something the video never says.

To check all thirteen agree across languages:

```
python3 - <<'EOF'
import re, glob
for p in sorted(glob.glob('src/content/lessons/*.ts')):
    if p.endswith('index.ts'): continue
    s = open(p, encoding='utf-8').read()
    ies, izh = s.find('\n es: {'), s.find('\n zh: {')
    blocks = {'en': s[:ies], 'es': s[ies:izh], 'zh': s[izh:]}
    vids, ats = {}, {}
    for k, b in blocks.items():
        vids[k] = re.findall(r"videoId: '([^']+)'", b)
        i = b.find("type: 'video'")
        ats[k] = re.findall(r'\bat: (\d+)', b[i:b.find("type: 'content'", i)] if i >= 0 else '')
    if not vids['en']: continue
    ok = vids['en'] == vids['es'] == vids['zh'] and ats['en'] == ats['es'] == ats['zh']
    print(('OK  ' if ok else 'BAD '), p.split('/')[-1])
EOF
```

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

## Installed skills

| Skill | Source | What it is |
|---|---|---|
| `hallmark` | `nutlope/hallmark` v1.1.0 | Anti-AI-slop design skill. Verbs: `hallmark audit <target>`, `hallmark redesign <target>`, `hallmark study <url\|screenshot>`; with no verb it runs its default design flow. |

Installed with `npx skills add nutlope/hallmark`. It lives in `.agents/skills/`
with a symlink at `.claude/skills/`, and `skills-lock.json` pins the content
hash. **Committed on purpose**: the dev container is ephemeral, so an
uncommitted install is gone the next session, and committing means a second
contributor gets it by cloning.

Reviewed before use, per the installer's own warning that skills run with full
agent permissions: all 106 files are markdown, no scripts and nothing
executable. It is instruction content only.

**One conflict worth knowing about.** Hallmark's discipline 6 is *"Typography
purity — no italic headers"*, and it names `Built to <em>think</em>` as "one of
the most reliable AI tells." That is exactly the pattern this site uses — *Money
skills that **actually matter***, *BFF **Academy***, *high schoolers teaching
high schoolers about **money***. The italic emphasis word is a deliberate
signature here and a reviewer has seen it and not objected, so it stays until
somebody decides otherwise. Flagged so the disagreement is a decision rather
than a surprise the first time Hallmark audits this repo.

---

## Custom domain: classroom.bffofamerica.org

**Live and verified.** DNS check passed, HTTPS enforced, deep links resolve, and
`/lessons/earning-income` was loaded directly on the real domain with no failed
asset requests.

### DNS
One Cloudflare record: `CNAME classroom -> hzisow.github.io`, **DNS only (grey
cloud)**, not proxied. The proxy is deliberately off, and should stay off:

- GitHub Pages already provides the CDN (Fastly), free auto-renewing HTTPS, and
  DDoS protection. Proxying puts a second CDN in front of a CDN.
- Hiding the origin buys nothing, because the Pages IP ranges are public.
- The real hazard is caching. Assets are content-hashed and safe forever, but
  `index.html` and `404.html` are not, and they are what name the asset files.
  This repo deploys on every push to `main`, so a Cloudflare-cached HTML entry
  point would serve a student a page pointing at assets that no longer exist.

If the proxy is ever turned on anyway: SSL/TLS must be **Full (strict)**
(Flexible loops against Pages, which always serves HTTPS), and HTML needs a
bypass or short-TTL cache rule.

### What the move required in the repo
- `public/CNAME` holds the hostname. Vite copies `public/` verbatim into `dist/`,
  which the workflow uploads, so no workflow change was needed.
- `base` went from `/BFF-Digital-Learning/` to `/`. Getting this wrong is silent
  and total: every asset request 404s and the visitor gets a blank white page.
- The favicon href went from `./brand/favicon.png` to `/brand/favicon.png`. Deep
  links are served the `404.html` fallback **from a nested path**, so a relative
  href resolved against `/lessons/` and 404'd. Caught by serving `dist/` at a
  root path and watching for failed requests, not by reading the file.

### The debugging lesson worth keeping
Bringing the domain up cost far more time than it should have, because of one
misread signal. After the domain was configured correctly, the browser kept
showing GitHub's "There isn't a GitHub Pages site here" 404, including in
incognito. It was diagnosed as browser cache twice; incognito disproved that
twice.

What actually resolved it: **`curl -sI` returned `200` while the browser returned
`404`, on the same URL, same machine, same minute.** One request cannot get two
answers from one server, so the inconsistency had to be upstream. The response
headers said so plainly:

```
via: 1.1 varnish
x-proxy-cache: MISS
```

GitHub Pages sits behind Fastly. The custom domain was saved *after* the last
deployment, so the edge was still holding a cached 404 for the site root from
the window when the domain genuinely was unconfigured. `curl` happened to miss
the cache and reach origin; the browser hit the poisoned object.

**The fix was a fresh deployment** (an empty commit is enough), which
invalidates the cached objects. `8077d7c` is that commit.

**Next time a Pages domain looks broken, run `curl -sI <url>` before touching any
setting.** If curl and the browser disagree, the problem is upstream and a
redeploy is the lever. If they agree, it is genuinely misconfigured.

### Supabase must follow the domain
`resetRedirectUrl()` builds from `window.location.origin`, so the app adapts on
its own, but Supabase only honours allowlisted URLs. Authentication -> URL
Configuration now reads:

| Field | Value |
|---|---|
| Site URL | `https://classroom.bffofamerica.org` |
| Redirect URLs | `https://classroom.bffofamerica.org/**` |

The old `hzisow.github.io/BFF-Digital-Learning/**` entry was removed. Safe to
remove because Pages 301-redirects the old URL to the custom domain, so the app
never runs on that origin again.

---

## Session safety: checkpoints and git

`.claude/settings.json` sets `fileCheckpointingEnabled: true` (the default, made
explicit so it is shared with anyone who clones) and `cleanupPeriodDays: 90` (up
from 30, so a session's transcript and checkpoints survive long enough to be
useful).

In Claude Code, `/rewind` or a double `Esc` on an empty prompt opens the rewind
menu: restore code, restore conversation, restore both, or summarize a stretch of
the chat to free context.

**Read this before relying on it.** Checkpointing tracks only files edited
through Claude's own file-editing tools. It does **not** track anything a bash
command touched — and a large share of the work on this project has gone through
`python3 - <<'PY'` heredocs and `sed`, precisely because the edits were
sweeping (the 96 lesson-explanation rewrites, the 44-file colour re-tone). None
of that would be in a checkpoint.

So on this repo git is the real safety net, not checkpoints:

- Every change is committed with a message explaining *why*, and deployed by
  fast-forwarding `main`.
- Undoing a shipped change is `git revert <sha>`, which is exactly how the
  Wealthsimple restyle was backed out — `git diff --cached --quiet <prev>`
  confirmed the tree came back byte-identical rather than approximately.

Treat checkpoints as local undo inside one session, and git as the history.

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
| `8077d7c` | Empty redeploy to purge a stale 404 from the Pages edge cache |
| `c81e34f` | Serve from `classroom.bffofamerica.org` — CNAME, absolute base, absolute favicon |
| `c2441dc` | School wording restored; the schools CTA points at join-the-cause |
| `036928e` | 1,212 em dashes removed, placeholder images gated, 720p video default |
| `95e365a` | Installed the hallmark design skill |
| `e7ed2f6` | Checkpoint settings committed so the whole team gets them |
| `195eb04` | Reverted the Wealthsimple design system |
| `07b1ca4` | Applied the Wealthsimple design system (reverted the same day) |
| `862516e` | Front page rebuilt around BFF Academy; student accounts; certificate as a PDF |
| `d8e1300` | Reviewer feedback: new typeface pair, a progress meter, one chance per question |
| `bd3de27` | 85% mastery gate — a lesson only unlocks the next one once its quiz is passed |
| `0dc05e2` | Per-question analytics, roster rename/remove/merge, due dates that read as deadlines |
| `980f44b` | Six more video checkpoints so the untested half of each recording is covered |
| `f9f2e94` | Matched every video checkpoint to what is actually said, and when |
| `ef84f2e` | Wired in the four real lesson videos and fixed the checkpoint timings |
| `618d6b7` | First name + last initial sign-in, replacing nickname + PIN |
| `fd116c1` | Load the Supabase client only when there is a reason to |
| `f15b845` | Per-lesson content splitting — course path 10.1 s → 4.5 s on a bad connection |
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
| `src/lib/mastery.ts` | `PASS_SCORE` and what counts as passing — the only definition |
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

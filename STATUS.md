# BFF Classroom — Project Status

Working notes for picking the project back up cold. Last verified at commit
`1844704`. Everything below has been checked against the code or a running
build, not remembered.

---

## What this is

A trilingual (English / Spanish / Simplified Chinese) digital financial-literacy
platform for **BFF of America**, a student-founded 501(c)(3).

- **Students** join a class with a code — no email, no PII collected.
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
| `students` | Nickname + classroom link. **No email, no real name.** |
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
| `bff_student_session` | `lib/session.tsx` | Joined-class session (id + nickname) |
| `bff_streak_v1` | `lib/streak.ts` | Daily streak counter |
| `bff_last_level` | `components/Layout.tsx` | Last seen XP level, to detect a level-up |
| `bff_lang` | `lib/i18n.tsx` | Chosen language |
| `bff_sound` | `lib/sound.ts` | Sound on/off |
| `bff_live_nick` / `bff_quiz_nick` / `bff_wolf_nick` | live screens | Remembered nickname per game type |

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
1. **Lesson video IDs.** Four lessons still point at placeholder YouTube IDs:
   - `spending-budgeting` → `sVKQn2I4HDM`
   - `saving-investing` → `Rm6UdfRs3gw`
   - `credit-debt` → `ozbGWLtZdoY`
   - `risk-insurance` → `WTtjmdyTCRM`

   Recording scripts were written and delivered as a PDF; the in-app checkpoint
   questions are already rewritten to match them (BFF-original, no references to
   any outside video). The user was guided through uploading to YouTube as
   **Unlisted** (not Private — Private cannot be embedded). When the four real
   IDs arrive, swap them in **all three language copies** of each lesson file and
   confirm the checkpoint `at:` timestamps match the recordings.

2. **Test the remaining AI features.** Money Coach is confirmed. The worksheet
   generator, AI practice, and open-response grading are deployed with the same
   fix but have not been clicked through by the user yet.

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
- **Per-lesson content splitting — now the measured #1 load-time problem.**
  `content/lessons/index.ts` statically imports all 13 lessons × 3 languages, so
  `lessons-*.js` is 494 KB raw / 181 KB gzip and *any* page touching lesson data
  pulls all of it. Measured cost on a bad school connection: **course path 10.1 s
  and a lesson 8.0 s, against 3.5–4.0 s for every page that does not need it.**

  Each lesson file is ~40 KB of source, so one lesson is roughly 1/13th of what
  is currently shipped.

  What each consumer actually needs:
  - `LessonPage` — one lesson. Wants `getLessonAsync(slug)` with a per-slug
    dynamic import.
  - `LessonsIndex` — only localized titles (line ~276) and quiz answer keys for
    `missedCount` (line ~249). Both are tiny.
  - `QuizPlay` / `QuizHost` / `AIPractice` — one lesson each.
  - `GlossaryPage` / `PracticePage` — genuinely need every lesson. These would
    still pull the full set, which is fine; they are secondary pages.

  The design problem is where the titles and answer keys live without drifting
  from the lesson files. Three options, roughly best-first:
  1. Store enough in `progress.data` at save time (`finishQuiz` already writes
     `answers`; adding the answer key or a `wrong: number[]` would let
     `missedCount` need no lesson content at all), and put localized titles in
     `src/lib/activities.ts`, which is already the documented "register a lesson
     here" catalog. Needs a fallback for progress saved before the change.
  2. Generate a `summary.ts` at build time — accurate, but someone will forget
     to regenerate it.
  3. Hand-maintain a summary table — will drift. Avoid.
- **Defer the Supabase client (205KB).** It is on the critical path only because
  `session.tsx` imports it statically for session restore. Solo mode never needs
  it at all. Would cut the first load by roughly a fifth.
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
| Lesson content `lessons-*.js` | **181 KB gzip / 494 KB raw** — lazy, prefetched on idle only when the connection allows |
| jsPDF + html2canvas | ~176 KB gzip — lazy, only on the worksheet/certificate paths |

Before code splitting this was a single **1,546 KB** chunk (500 KB gzip) on the
critical path. The two remaining wins are listed under "Ideas worth considering":
per-lesson content splitting, and deferring the Supabase client.

Rules that keep this from regressing:
- A new page must be added to `src/lib/routeChunks.ts` as a dynamic import, not
  imported statically into `App.tsx`.
- Never statically import `content/lessons` from anything eager — that alone
  would drag 494 KB back onto first paint.
- Heavy libraries (`jspdf`) must stay behind a dynamic `import()` at the call
  site.

### Time to real content on a throttled connection

Measured with CDP network emulation, waiting for a string unique to each route's
actual content — **not** `load` or a character count, because the shell's header
and footer alone are over 200 characters and will mask the thing being measured.

| Route | Bad school wifi (500 kbps / 300 ms) | Mediocre (2 Mbps / 100 ms) | Bytes |
|---|---|---|---|
| Landing | 3.5 s | 1.0 s | 167 KB |
| AI Coach | 4.0 s | 1.4 s | 175 KB |
| Activities | 3.9 s | 1.4 s | 170 KB |
| **Course path** | **10.1 s** | 2.8 s | 446 KB |
| **A lesson** | **8.0 s** | 2.2 s | 417 KB |

**The two pages that are the product are 2–3× slower than everything else**, and
the entire difference is the 181 KB lesson-content chunk. This is the single
biggest remaining load-time problem and it has a known fix (see "Ideas worth
considering" → per-lesson content splitting).

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

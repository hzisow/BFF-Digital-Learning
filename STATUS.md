# BFF Classroom — Project Status

Working notes for picking the project back up. Last verified at commit `358bcc0`.

---

## What this is

A trilingual (English / Spanish / Simplified Chinese) digital financial-literacy
platform for **BFF of America**, a student-founded 501(c)(3).

- **Students** join a class with a code — no email, no PII collected.
- **Mentors** sign in with Google and are gated behind an `approved` flag.
- Everything also works **solo**, with no backend, straight from the browser.

**Live:** https://hzisow.github.io/BFF-Digital-Learning/

---

## Ground rules (do not break these)

1. **The repo is PUBLIC.** Never commit personal emails, API keys, or secrets.
   The Gemini key lives only as a Supabase Edge Function secret.
2. **Never put the assistant's model identifier** in commits, PR bodies, code, or
   comments. Chat only.
3. **Branch:** develop on `claude/educational-tool-student-outreach-qkqnle`.
   Deploying means fast-forwarding `main` to it — GitHub Pages only builds from
   `main`. The user has authorized this; do not open PRs unless asked.
4. **Zero emoji anywhere in the app.** Enforced by the icon registry (below).
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
- **Offline / flaky-wifi resilience.** School wifi is unreliable and progress is
  already local-first. A service worker would make the whole app work offline and
  sync when it reconnects.
- **Printable certificates and progress reports** for mentors to hand out — the
  PDF pipeline now exists and could be reused.

**Medium value**
- **Assignment due-date reminders** on the student home.
- **A mentor "run this class live" mode** that walks a whole classroom through a
  lesson in lockstep, reusing the existing co-play session infrastructure.
- **Question bank import** so mentors can add their own quiz items.
- **More electives** — the content model makes this cheap.

**Polish**
- Empty states with real guidance rather than a line of text.
- Keyboard shortcuts for the lesson player (arrow keys to advance).
- A print stylesheet for lesson pages so a mentor can hand out a lesson.

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
- Screenshot tooling (`playwright-core`) is installed ad hoc for verification and
  **must be uninstalled before committing** — it is not an app dependency.
  Chromium lives at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- This container cannot reach `supabase.co` or Google directly (network policy),
  so edge functions can only be debugged through the Supabase MCP logs.

---

## Key files

| Path | What it is |
|---|---|
| `src/lib/icons.tsx` | Icon registry — the reason there are no emoji |
| `src/index.css` | Design system: tokens, buttons, cards, micro-interactions |
| `src/styles/lesson.css` | The `.lz` lesson canvas |
| `src/components/lesson/LessonArt.tsx` | Hand-built SVG motifs per lesson topic |
| `src/lib/worksheetPdf.ts` | Worksheet PDF layout and writing-space rules |
| `src/lib/ai.ts` | Client AI invoker: session handling + error surfacing |
| `supabase/functions/_shared/ai.ts` | Gemini client: model fallback, quota handling |
| `src/content/types.ts` | Lesson content model |
| `src/lib/activities.ts` | Activity catalog — add an activity here and it appears everywhere |
| `vite.config.ts` | Absolute base + the `404.html` SPA fallback plugin |

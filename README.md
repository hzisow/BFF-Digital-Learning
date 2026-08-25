# BFF Classroom

BFF Classroom is the digital learning platform for **BFF of America** (Building
Financial Futures of America), a student-founded 501(c)(3). It brings the BFF
Academy curriculum to life with interactive lessons, games, and live classroom
activities.

Students join with a class code and their **first name and last initial**
("Jayden M.") — no emails, no accounts, no passwords, and never a full name.
That is enough for a mentor to read a roster at a glance without the platform
storing anything that identifies a child outside their own classroom. Mentors
sign in with Google to assign work, track progress, host live games, and
generate classroom materials.

**Live site:** classroom.bffofamerica.org

## What's inside

### Curriculum

- **13 lessons**, each fully translated into **English, Spanish, and Simplified
  Chinese**:
  - *Core path (4 weeks):* Earning Income, Spending & Budgeting, Saving &
    Investing, Credit & Debt, Risk Management & Insurance, Financial
    Decision-Making, Financial Planning, Consumer Protection
  - *Electives:* Your First Paycheck, Taxes Deep-Dive, Paying for College,
    Entrepreneurship & Side Hustles, Crypto & Modern Money Traps
- **A course path that reads left to right**, like a line of text. Weeks sit side
  by side along one horizontal track, with stars for quiz scores and a trophy at
  the end. Finishing a lesson unlocks the next stop, though jumping ahead is
  allowed — mentors assign out of order all the time.
- **Video checkpoints**: lessons can embed a short video that pauses at set
  moments and quizzes the student before continuing, with no skipping ahead. If
  YouTube is blocked on the school network, the questions appear as regular
  cards so nobody gets stuck.
- **Lessons remember where you were.** A class period ends before a lesson does,
  so closing the tab saves your place. Coming back offers *"Resume at step 12"*
  or a clean restart, with your answers so far intact.
- **Read-aloud** on every lesson step, plus a searchable glossary of every key
  term in the curriculum.
- **Arrow keys move through a lesson**, so a 21-step lesson isn't 21 trips to
  the same button.

### Activities

Eight interactive activities, plus two ways to run them live with a whole class:

| Activity | What students do |
|---|---|
| Wolf of Wall Street | Invest $1,000 across 12 companies and survive the market |
| Ben's Situation | Help Ben survive the month on a tight family budget |
| Ben's Insurance Situation | Spend Ben's $500 insurance budget, then face the month |
| Paystub Detective | Decode a real paystub and catch the errors |
| Credit Score Simulator | Make monthly choices and watch a credit score move |
| Scam Spotter | Work an inbox and flag the scams |
| Smart Shopper | Compare offers and find the genuinely better deal |
| Goal Getter | Allocate a paycheck across competing savings goals |
| Live Quiz | Kahoot-style quiz hosted for the whole class |
| Co-play | Any solo challenge, played together with a shared leaderboard |

### Motivation

XP and levels, daily quests, streaks, badges, a class leaderboard, and printable
completion certificates.

### AI features (optional)

Powered by Google Gemini's free tier through Supabase Edge Functions. The API key
stays server-side and never reaches the browser.

- **AI Money Coach** — a chat tutor scoped strictly to the BFF curriculum
- **AI-generated practice** — fresh questions targeting a student's weak topics
- **Open-response grading** — warm, specific feedback on short written answers
- **Lesson plan & worksheet generator** (mentors only) — produces a timed lesson
  plan as Markdown, or a **printable, BFF-branded PDF worksheet** with real
  writing space and a teacher answer key on its own page

### Two modes

- **Solo mode** (no setup): lessons, games, and challenges work entirely in the
  browser. Progress saves to the student's device.
- **Connected mode** (free Supabase project): class codes, assignments, the
  mentor dashboard, live multiplayer, and the AI features switch on, and student
  progress syncs to the class.

### Built for a school network

Classroom wifi is unreliable, so the app is written to degrade honestly rather
than break:

- **Routes load on demand.** The first page pulls a small shell instead of the
  whole app; each page's code arrives when it is opened, and hovering a nav link
  fetches it a moment early so it still feels instant. The speculative
  prefetching stands down on Save-Data and slow connections.
- **Fonts are bundled**, not fetched from Google — nothing third-party sits on
  the critical path.
- **Losing the connection says so.** A bar across the top explains what still
  works, and each feature that genuinely needs the network says so in its own
  words instead of failing with a generic error.
- **Progress is never dropped.** It saves to the device first. If the sync to the
  classroom fails, the write is queued and retried when the connection returns,
  surviving a refresh or a closed tab.

### Accessibility

Built to WCAG 2.1 AA: keyboard navigation throughout, visible focus rings,
screen-reader announcements for live regions, and `prefers-reduced-motion`
support that neutralizes every animation. The app uses **no emoji** — all
symbols are real icons, so screen readers never read a decorative glyph aloud.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). The app runs in solo
mode with zero configuration.

Other commands:

```bash
npm run build    # type-check and build for production
npm run lint     # oxlint
```

## Deploy (free) — GitHub Pages

The site is a static build, so GitHub hosts it for free. One-time setup:

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

Every push to `main` then runs `.github/workflows/deploy.yml`, which builds and
publishes the site. You can also deploy by hand from the **Actions** tab.

To bake the backend into the deployed site:

1. Go to **Settings → Secrets and variables → Actions**.
2. Open the **Variables** tab (not Secrets).
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Push a commit so the site rebuilds with them.

The publishable key is designed to be public — it is safe in a repository
variable and in the built site. Security lives in the database's row-level
security rules, not in the key.

### How clean URLs work here

The app uses real paths (`/lessons/earning-income`), not hash routing. GitHub
Pages has no server-side rewrites, so three pieces work together:

1. `BrowserRouter` with `basename` from Vite's `base` (`src/main.tsx`)
2. An **absolute** `base` in `vite.config.ts` — a relative base would make deep
   links resolve their assets against the wrong folder
3. `dist/404.html`, a copy of `index.html` emitted at build time. Pages serves it
   for unknown paths, so the app boots and the router renders the right page with
   the URL preserved

A deep link therefore returns a 404 *status* while rendering correctly. That is
how the Pages SPA fallback works, and it is invisible to users.

## Connect the backend (free Supabase project)

Connecting Supabase unlocks class codes, assignments, the mentor dashboard, live
multiplayer, and the AI features. Lessons, challenges, and solo games never need
it.

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste the contents of
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql), and
   run it. This creates every table, security rule, and the live-game plumbing.
3. Go to **Authentication → Sign In / Providers** and enable **Anonymous
   sign-ins**. This is what lets students join with just a code and a name,
   and it is also required for the AI features to authenticate.
4. (Recommended) Turn off **Confirm email** so BFF mentors can sign up instantly,
   or configure SMTP if you would rather keep confirmation on.
5. Go to **Project Settings → API** and copy the **Project URL** and the
   **publishable key**.
6. Provide them to the build — either as the repository variables above, or in a
   local `.env`:

   ```bash
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-publishable-key
   ```

7. Rebuild. The app detects the backend automatically via `src/lib/config.ts`.

## Enable the AI features

The AI features need a Gemini API key, stored server-side.

1. Create a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. In Supabase, go to **Edge Functions → Secrets** and add `GEMINI_API_KEY`.
   Paste carefully — a trailing newline is a common cause of failures (the code
   trims it defensively).
3. Deploy the functions from a clone of this repo:

   ```bash
   npx supabase login
   npx supabase functions deploy money-coach ai-practice grade-response lesson-plan \
     --project-ref <your-project-ref>
   ```

The functions try several Gemini models in order and fall through on quota
errors, because free-tier quota is granted **per model**. To pin one model
without redeploying, add a `GEMINI_MODEL` secret.

Until a key is set, every AI screen shows a friendly "not set up yet" message
rather than an error.

## Custom domain

To serve the site from an address like `classroom.bffofamerica.org`:

1. In your DNS provider, add a **CNAME** record pointing `classroom` at
   `<your-github-username>.github.io`.
2. On GitHub, go to **Settings → Pages**, enter the domain under **Custom
   domain**, and save.
3. Once the DNS check passes, tick **Enforce HTTPS**.
4. **Build with `VITE_BASE=/`** so assets resolve from the domain root instead of
   the `/BFF-Digital-Learning/` project path. Set it as a repository variable or
   in the workflow.

## Adding content

### Add a lesson

1. Create a file in `src/content/lessons/` (copy an existing one as a starting
   point). The lesson shape — sections, quiz questions, translations — is defined
   in `src/content/types.ts`.
2. Register it in `src/content/lessons/index.ts`.
3. Add its metadata to `src/lib/activities.ts`: slug, title, **icon key**,
   description, and ordering. Everything else — the library page, the mentor
   assignment picker, progress tracking — picks it up from that catalog.

The `icon` field is a **key from `src/lib/icons.tsx`**, not an emoji. The app
contains zero emoji by design; pick an existing key or add one to the registry.

### Edit activity data

- Wolf of Wall Street companies and news: `src/activities/wolf/data.ts`
- Each challenge keeps its data alongside its component in
  `src/activities/<name>/`

## Project structure

```
├── .github/workflows/deploy.yml   # Builds + deploys to GitHub Pages
├── supabase/
│   ├── migrations/0001_init.sql   # Complete database schema
│   └── functions/                 # Edge functions (Deno)
│       ├── _shared/ai.ts          # Gemini client: model fallback, error reporting
│       ├── money-coach/           # AI chat tutor
│       ├── ai-practice/           # Generated practice questions
│       ├── grade-response/        # Open-response grading
│       └── lesson-plan/           # Lesson plans + worksheet data
├── public/brand/                  # Logo and favicon
└── src/
    ├── main.tsx / App.tsx         # Entry + routes (BrowserRouter, code-split)
    ├── index.css                  # Design system: fonts, tokens, buttons, motion
    ├── styles/lesson.css          # The focused lesson canvas (.lz)
    ├── components/                # Shared UI (Layout, Skeleton, VideoCheckpoint…)
    │   └── lesson/LessonArt.tsx   # Hand-built SVG art per lesson topic
    ├── content/
    │   ├── types.ts               # Lesson/quiz type definitions
    │   └── lessons/               # One file per lesson + index.ts registry
    ├── activities/                # One folder per game or challenge
    ├── lib/
    │   ├── icons.tsx              # Icon registry — the reason there are no emoji
    │   ├── routeChunks.ts         # Code-split routes + prefetch policy
    │   ├── online.ts              # Connection detection and error classification
    │   ├── progressQueue.ts       # Retry outbox for classroom progress
    │   ├── config.ts              # Supabase wiring (env or fallback)
    │   ├── supabase.ts            # Client (null in solo mode)
    │   ├── session.tsx            # Student + mentor sessions
    │   ├── progress.ts            # Local and synced progress
    │   ├── activities.ts          # The activity catalog
    │   ├── i18n.tsx               # EN/ES/ZH strings and lesson localization
    │   ├── ai.ts                  # Client AI invoker
    │   └── worksheetPdf.ts        # Printable worksheet PDF layout
    └── pages/
        ├── student/               # Student-facing pages
        └── admin/                 # Mentor dashboard pages
```

See [`STATUS.md`](STATUS.md) for current project state, architecture decisions,
and open work.

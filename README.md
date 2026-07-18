# BFF Classroom

BFF Classroom is the digital activity hub for **BFF of America** (Building Financial Futures of America). It brings the BFF Academy curriculum to life with interactive lessons and quizzes, the live **Wolf of Wall Street** investing game, and Ben's real-life money challenges. Students join with a simple class code and a nickname — no emails, no accounts, no personal info — while BFF mentors assign activities, track progress, and host live games from a built-in dashboard.

## What's inside

- **8 BFF Academy lessons** with interactive quizzes: Earning Income, Spending & Budgeting, Saving & Investing, Credit & Debt, Risk Management & Insurance, Financial Decision-Making, Financial Planning, and Consumer Protection.
- **A Duolingo-style course path**: the Academy page is a winding trail of the 8 lesson nodes with week banners, stars for quiz scores, and a trophy at the end. Finish a lesson to light up the next stop (jumping ahead is allowed — mentors assign out of order all the time). Games and challenges stay separate on the Activities page.
- **Edpuzzle-style video checks**: several lessons embed a short video (Two Cents, Khan Academy) that pauses at key moments and quizzes the student before it continues — no skipping ahead. If YouTube is blocked on the school network, the questions appear as regular cards so nobody gets stuck.
- **3 activities**:
  - **Wolf of Wall Street** — invest $1,000 across 12 companies, react to breaking news, and survive the market (solo or live with a whole class).
  - **Ben's Situation** — help Ben, a middle school teacher with 3 kids, survive the month on a tight budget.
  - **Ben's Insurance Situation** — spend Ben's $500 insurance budget wisely, then see what the month throws at his family.
- **Two modes**:
  - **Solo mode** (no setup): everything above works entirely in the browser. Progress saves on the student's device.
  - **Connected mode** (free Supabase backend): class codes, assignments, the mentor dashboard, and live multiplayer games light up, and student progress syncs to the class.

## Run it locally

You need [Node.js](https://nodejs.org) (version 20 or newer). Then, in a terminal:

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) in your browser. That's it — the app runs in solo mode with zero configuration.

## Deploy (free) — GitHub Pages

The site is a static build, so GitHub hosts it for free. One-time setup:

1. Push this repository to GitHub.
2. On GitHub, open the repo and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

Done. From now on, every push to the `main` branch runs `.github/workflows/deploy.yml`, which builds the app and publishes it. You can also trigger a deploy by hand from the **Actions** tab (**Deploy to GitHub Pages → Run workflow**).

To bake the backend into the deployed site (see the next section for where these values come from):

1. Go to **Settings → Secrets and variables → Actions**.
2. Click the **Variables** tab (not Secrets).
3. Add two repository variables:
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon/publishable key
4. Push a commit (or re-run the workflow) so the site rebuilds with them.

The anon key is designed to be public — it is safe to put in a repo variable and in the built site. Security lives in the database's row-level security rules, not in the key.

## Connect the backend (free Supabase project)

Without a backend the site works great in solo mode. Connecting Supabase (free tier is plenty) unlocks: **class codes**, **assignments**, the **mentor dashboard**, and **live multiplayer Wolf of Wall Street**. Lessons, challenges, and the solo game never need it.

1. Create a free account and a new project at [supabase.com](https://supabase.com). Pick any name and a strong database password (you won't need the password again for this app).
2. In the Supabase dashboard, open **SQL Editor**, paste the entire contents of [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql), and click **Run**. This creates all tables, security rules, and the live-game plumbing in one shot.
3. Go to **Authentication → Sign In / Up** and enable **Anonymous sign-ins**. This is what lets students join with just a class code and nickname — the app never asks them for an email.
4. (Recommended) In the same Authentication settings, turn off **Confirm email** so BFF team members can sign up for mentor accounts instantly — or configure SMTP if you'd rather keep email confirmation on.
5. Go to **Project Settings → API** and copy two values:
   - **Project URL**
   - **anon / publishable key**
6. Put those two values where the build can see them — either:
   - the repository variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see the deploy section above), or
   - for local development, a `.env` file in the project root:

     ```bash
     VITE_SUPABASE_URL=https://your-project-ref.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

7. Rebuild (push a commit, or restart `npm run dev`). The join-class and mentor features switch on automatically — the app detects the backend via `src/lib/config.ts`.

## Custom domain

You can serve the site from a BFF address like `classroom.bffofamerica.org`:

1. In your DNS provider, add a **CNAME** record pointing `classroom` to `<your-github-username>.github.io`.
2. On GitHub, go to **Settings → Pages**, enter `classroom.bffofamerica.org` under **Custom domain**, and save.
3. Wait for the DNS check to pass, then tick **Enforce HTTPS**.

The app uses relative paths and hash-based routing, so no code changes are needed for a custom domain.

## Adding content

### Add a lesson

1. Create a new file in `src/content/lessons/` (copy an existing one, e.g. `earning-income.ts`, as a starting point). The shape of a lesson — sections, quiz questions, and so on — is defined in `src/content/types.ts`.
2. Register the lesson in `src/content/lessons/index.ts` so the app can load it.
3. Add its metadata (slug, title, emoji, description, ordering) to `src/lib/activities.ts`. Everything else — the library page, the mentor assignment picker, progress tracking — picks it up automatically from that catalog.

### Edit activity data

- Wolf of Wall Street companies, news events, and starting cash: `src/activities/wolf/data.ts`
- Ben's budget challenge: `src/activities/bens-budget/`
- Ben's insurance challenge: `src/activities/bens-insurance/`

## Project structure

```
├── .github/workflows/deploy.yml   # Builds + deploys to GitHub Pages
├── supabase/migrations/
│   └── 0001_init.sql              # Complete database schema (paste into Supabase)
├── public/                        # Favicon, brand assets, icons
└── src/
    ├── main.tsx / App.tsx         # App entry + routes (HashRouter)
    ├── components/                # Shared UI (Layout, Logo)
    ├── content/
    │   ├── types.ts               # Lesson/quiz type definitions
    │   └── lessons/               # One file per lesson + index.ts registry
    ├── activities/
    │   ├── wolf/                  # Wolf of Wall Street (solo + live)
    │   ├── bens-budget/           # Ben's Situation challenge
    │   └── bens-insurance/        # Ben's Insurance Situation challenge
    ├── lib/
    │   ├── config.ts              # Supabase URL/key wiring (env or fallback)
    │   ├── supabase.ts            # Supabase client (null in solo mode)
    │   ├── session.tsx            # Student (class code) + mentor sessions
    │   ├── progress.ts            # Local + synced progress saving
    │   └── activities.ts          # The activity catalog (slugs, titles, paths)
    └── pages/
        ├── student/               # Student-facing pages
        └── admin/                 # Mentor dashboard pages
```

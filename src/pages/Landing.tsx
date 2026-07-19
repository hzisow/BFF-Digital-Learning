import { Link } from 'react-router-dom'
import { ACTIVITIES, getActivity, KIND_LABEL } from '../lib/activities'
import type { ActivityMeta } from '../lib/activities'

const FEATURED_SLUGS = ['wolf-of-wall-street', 'bens-budget', 'earning-income']

const featured: ActivityMeta[] = FEATURED_SLUGS.map(getActivity).filter(
  (a): a is ActivityMeta => a !== undefined,
)

const STATS = [
  { value: '8', label: 'interactive lessons' },
  { value: '3', label: 'games & challenges' },
  { value: '100%', label: 'free, forever' },
]

const STEPS = [
  {
    num: '01',
    title: 'Get a class code',
    body: 'Your BFF mentor gives your class a code. No email, no account — just pick a nickname and you are in.',
  },
  {
    num: '02',
    title: 'Do your lessons & games',
    body: 'Work through the lessons your mentor assigns, play Wolf of Wall Street, and help Ben survive his budget.',
  },
  {
    num: '03',
    title: 'Track your progress',
    body: 'Watch your quiz scores climb as you go. No class code? Explore everything solo — it all works anywhere.',
  },
]

// A short editorial "syllabus" for the hero panel.
const syllabus = ACTIVITIES.filter((a) => a.kind === 'lesson')
  .sort((a, b) => a.sortKey - b.sortKey)
  .slice(0, 4)

export default function Landing() {
  return (
    <div>
      {/* Hero — editorial, asymmetric, on paper */}
      <section className="border-b border-paper-200">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
              <span className="h-px w-8 bg-ink/30" />
              BFF Academy · Financial literacy
            </p>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] text-ink sm:text-6xl md:text-7xl">
              Money skills that actually{' '}
              <span className="text-bff-700">matter.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              BFF Academy has gone digital. Learn personal finance in class with your BFF
              mentor — or at your own pace, from anywhere. Built by students, for students.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/join" className="btn-primary px-7 py-3 text-base">
                Join your class
              </Link>
              <Link
                to="/lessons"
                className="inline-flex items-center justify-center gap-1 px-2 py-3 font-display font-semibold text-ink underline decoration-bff-500 decoration-2 underline-offset-4 transition hover:text-bff-700"
              >
                Explore the curriculum →
              </Link>
            </div>
          </div>

          {/* Syllabus panel */}
          <div className="rounded-2xl border border-paper-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:p-8">
            <div className="flex items-baseline justify-between border-b border-paper-200 pb-4">
              <p className="font-display text-lg font-bold text-ink">The 4-week course</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                ~20 min each
              </p>
            </div>
            <ol className="mt-2 divide-y divide-paper-200">
              {syllabus.map((lesson, i) => (
                <li key={lesson.slug} className="flex items-center gap-4 py-3.5">
                  <span className="font-display text-sm font-bold text-ink-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display font-semibold text-ink">
                    {lesson.title}
                  </span>
                  <span aria-hidden="true" className="text-lg opacity-70">
                    {lesson.emoji}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-ink-faint">…plus 4 bonus units, a glossary, and games.</p>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-paper-200 bg-paper-100">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-paper-200 px-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-2 py-8 text-center">
              <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-faint sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">How it works</h2>
          <p className="mt-3 text-lg text-ink-soft">
            Three steps between you and being the friend who actually understands money.
          </p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-paper-200 bg-paper-200 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white p-7">
              <p className="font-display text-3xl font-extrabold text-bff-600">{step.num}</p>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured activities */}
      <section className="border-y border-paper-200 bg-paper-100 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                Jump into a favorite
              </h2>
              <p className="mt-2 text-lg text-ink-soft">
                The same activities BFF mentors run in classrooms — ready whenever you are.
              </p>
            </div>
            <Link to="/activities" className="btn-ghost shrink-0">
              See all activities →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {featured.map((a) => (
              <Link
                key={a.slug}
                to={a.path}
                className="group flex flex-col rounded-xl border border-paper-200 bg-white p-6 transition hover:border-ink/25"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl" aria-hidden="true">
                    {a.emoji}
                  </span>
                  <span className="chip bg-paper-100 text-ink-faint">{KIND_LABEL[a.kind]}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink group-hover:text-bff-700">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{a.description}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  ~{a.durationMin} min
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schools & partners */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="rounded-2xl bg-ink px-6 py-14 sm:px-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
              For schools & partners
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-paper sm:text-4xl">
              Bringing BFF Academy to your school?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/70">
              BFF of America is a student-founded 501(c)(3) nonprofit. Our mentors — high
              schoolers themselves — visit middle and high schools to teach financial literacy
              for free, and BFF Classroom brings the whole program online. Teachers, counselors,
              parents: we would love to hear from you.
            </p>
            <a
              href="https://www.bffofamerica.org"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-paper px-6 py-3 font-display font-semibold text-ink transition hover:bg-paper-100"
            >
              Get in touch at bffofamerica.org
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

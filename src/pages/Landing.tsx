import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { getActivity, KIND_LABEL } from '../lib/activities'
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
    num: '1',
    emoji: '🎟️',
    title: 'Get a class code',
    body: 'Your BFF mentor gives your class a code. No email, no account — just pick a nickname and you are in.',
  },
  {
    num: '2',
    emoji: '🎮',
    title: 'Do your lessons & games',
    body: 'Work through the lessons your mentor assigns, play Wolf of Wall Street, and help Ben survive his budget.',
  },
  {
    num: '3',
    emoji: '📊',
    title: 'Track your progress',
    body: 'Watch your quiz scores climb as you go. No class code? Explore everything solo — it all works anywhere.',
  },
]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bff-700 via-bff-800 to-bff-900">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-bff-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-bff-400/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <Logo reversed className="mx-auto h-16 animate-pop-in sm:h-20" />
          <h1 className="mx-auto mt-8 max-w-3xl animate-slide-up font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Money skills that actually matter.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-lg text-bff-100">
            BFF Academy has gone digital. Learn personal finance in class with your BFF
            mentor — or at your own pace, from anywhere. Built by students, for students.
          </p>
          <div className="mt-10 flex animate-slide-up flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/join"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-display font-bold text-bff-700 shadow-lg transition hover:bg-bff-50 sm:w-auto"
            >
              Join your class 🚀
            </Link>
            <Link
              to="/lessons"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/60 px-7 py-3 font-display font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
            >
              Explore lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-4 py-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-bff-700 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="text-center font-display text-3xl font-bold text-slate-900">
          How it works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          Three steps between you and being the friend who actually understands money.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="card relative pt-8">
              <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-bff-600 font-display text-lg font-bold text-white shadow-md">
                {step.num}
              </span>
              <div className="text-3xl">{step.emoji}</div>
              <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured activities */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900">
                Jump into a favorite
              </h2>
              <p className="mt-2 text-slate-600">
                The same activities BFF mentors run in classrooms — ready whenever you are.
              </p>
            </div>
            <Link to="/activities" className="btn-ghost shrink-0">
              See all activities →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {featured.map((a) => (
              <Link
                key={a.slug}
                to={a.path}
                className="card group flex flex-col transition hover:-translate-y-1 hover:border-bff-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{a.emoji}</span>
                  <span className="chip bg-bff-50 text-bff-700">{KIND_LABEL[a.kind]}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900 group-hover:text-bff-700">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {a.description}
                </p>
                <p className="mt-4 text-xs font-semibold text-slate-400">
                  ⏱️ ~{a.durationMin} min
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schools & partners */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="rounded-3xl bg-gradient-to-br from-bff-50 to-bff-100 px-6 py-12 text-center sm:px-12">
          <p className="text-3xl">🏫</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-bff-900 sm:text-3xl">
            Bringing BFF Academy to your school?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-bff-800">
            BFF of America is a student-founded 501(c)(3) nonprofit. Our mentors — high
            schoolers themselves — visit middle and high schools to teach financial
            literacy for free, and BFF Classroom brings the whole program online. Teachers,
            counselors, parents: we would love to hear from you.
          </p>
          <a
            href="https://www.bffofamerica.org"
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8"
          >
            Get in touch at bffofamerica.org
          </a>
        </div>
      </section>
    </div>
  )
}

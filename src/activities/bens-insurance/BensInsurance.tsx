import { useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'

// ---------- The official numbers (from the BFF of America paper activity) ----------

const BUDGET = 500

type PolicyId = 'health' | 'travel' | 'pet' | 'home' | 'identity' | 'phone' | 'life'

interface Policy {
  id: PolicyId
  emoji: string
  label: string
  cost: number
  note: string
}

const POLICIES: Policy[] = [
  { id: 'health', emoji: '🏥', label: 'Health insurance', cost: 240, note: 'Covers the whole family' },
  { id: 'travel', emoji: '🧳', label: 'Travel insurance', cost: 60, note: 'The beach trip is THIS month!' },
  { id: 'pet', emoji: '🦎', label: 'Pet insurance', cost: 70, note: 'For the iguana. Yes, really.' },
  { id: 'home', emoji: '🏠', label: 'Home insurance', cost: 210, note: 'Protects the house and everything in it' },
  { id: 'identity', emoji: '🕵️', label: 'Identity theft insurance', cost: 60, note: 'In case someone pretends to be Ben' },
  { id: 'phone', emoji: '📱', label: 'Phone protection plan', cost: 30, note: 'Three kids. Many drops.' },
  { id: 'life', emoji: '🌳', label: 'Life insurance', cost: 90, note: "Protects the family's future" },
]

type CarChoice = 'none' | 'one' | 'both'
type WhichCar = 'ben' | 'wife'

const CAR_COST: Record<CarChoice, number> = { none: 0, one: 80, both: 120 }

// ---------- Results ----------

type Tone = 'good' | 'bad' | 'neutral'

interface StoryEvent {
  emoji: string
  title: string
  outcome: string
  tone: Tone
  cost: number
}

interface Picks {
  policies: ReadonlySet<PolicyId>
  car: CarChoice
  whichCar: WhichCar
}

interface Results {
  events: StoryEvent[]
  premiums: number
  surpriseCosts: number
  score: number
  grade: string
  gradeEmoji: string
}

function premiumsTotal(picks: Picks): number {
  return (
    POLICIES.reduce((sum, p) => sum + (picks.policies.has(p.id) ? p.cost : 0), 0) +
    CAR_COST[picks.car]
  )
}

function computeResults(picks: Picks): Results {
  const has = (id: PolicyId) => picks.policies.has(id)
  const wifeCarCovered = picks.car === 'both' || (picks.car === 'one' && picks.whichCar === 'wife')

  const events: StoryEvent[] = [
    {
      emoji: '🚗',
      title: "The family takes his WIFE'S car to the beach… and it breaks down!",
      outcome: wifeCarCovered
        ? 'Covered! Towing and repairs paid. 😅'
        : '−$500 surprise repair bill.',
      tone: wifeCarCovered ? 'good' : 'bad',
      cost: wifeCarCovered ? 0 : 500,
    },
    {
      emoji: '🏖️',
      title:
        "They make it to the beach. No luggage lost, no delays — travel insurance wasn't needed this month.",
      outcome: has('travel')
        ? '−$60 you could have kept, but peace of mind is real.'
        : 'Skipping it worked out this time.',
      tone: 'neutral',
      cost: 0,
    },
    {
      emoji: '🤧',
      title: "Springtime allergies hit Ben's daughter HARD at the beach.",
      outcome: has('health') ? 'Covered — doctor visit and meds handled.' : '−$200 in bills.',
      tone: has('health') ? 'good' : 'bad',
      cost: has('health') ? 0 : 200,
    },
    {
      emoji: '🏠',
      title: "Ben's house? Totally fine. Home insurance wasn't needed this month.",
      outcome: has('home') ? 'A quiet month for the house.' : 'Nothing to report on the home front.',
      tone: 'neutral',
      cost: 0,
    },
    {
      emoji: '🦎',
      title: 'The family brought the iguana. It got lost in the ocean!! 🦎🌊',
      outcome: has('pet') ? 'Covered — rescue + vet check paid.' : '−$40.',
      tone: has('pet') ? 'good' : 'bad',
      cost: has('pet') ? 0 : 40,
    },
    {
      emoji: '😌',
      title: 'No phone drops, no identity theft, nobody needed life insurance. Quiet month otherwise.',
      outcome: 'Sometimes the best insurance news is no news.',
      tone: 'neutral',
      cost: 0,
    },
  ]

  const premiums = premiumsTotal(picks)
  const surpriseCosts = events.reduce((sum, e) => sum + e.cost, 0)

  // 100 = wife's car + health + pet insured, minimal unneeded extras.
  let score = 100
  if (!wifeCarCovered) score -= 35
  if (!has('health')) score -= 25
  if (!has('pet')) score -= 10

  // Light deduction for premiums that turned out unneeded this month.
  let unneeded = 0
  if (has('travel')) unneeded += 60
  if (has('home')) unneeded += 210
  if (has('identity')) unneeded += 60
  if (has('phone')) unneeded += 30
  if (has('life')) unneeded += 90
  if (picks.car === 'both') unneeded += 40 // Ben's-car portion never came into play
  if (picks.car === 'one' && picks.whichCar === 'ben') unneeded += 80
  score -= Math.min(15, Math.round(unneeded / 25))

  score = Math.max(0, Math.min(100, score))
  const [grade, gradeEmoji] =
    score >= 85
      ? ['Fully Covered', '🛡️']
      : score >= 65
        ? ['Mostly Protected', '👍']
        : score >= 40
          ? ['Ouch', '🤕']
          : ['Uninsured & Unlucky', '🎲']

  return { events, premiums, surpriseCosts, score, grade, gradeEmoji }
}

// ---------- Small helpers ----------

function usd(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

function outcomeClasses(tone: Tone): string {
  switch (tone) {
    case 'good':
      return 'text-green-700'
    case 'bad':
      return 'text-red-600'
    default:
      return 'text-slate-500'
  }
}

const EVENT_DELAY = 0.55 // seconds between story cards

// ---------- Component ----------

export default function BensInsurance() {
  const { student } = useStudent()
  const [policies, setPolicies] = useState<ReadonlySet<PolicyId>>(new Set())
  const [car, setCar] = useState<CarChoice>('none')
  const [whichCar, setWhichCar] = useState<WhichCar>('ben')
  const [results, setResults] = useState<Results | null>(null)

  const picks: Picks = { policies, car, whichCar }
  const premiums = premiumsTotal(picks)
  const remaining = BUDGET - premiums
  const overBudget = premiums > BUDGET

  function toggle(id: PolicyId) {
    setPolicies((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function lockIn() {
    if (overBudget) return
    const r = computeResults(picks)
    setResults(r)
    window.scrollTo({ top: 0 })
    void saveProgress(student, 'bens-insurance', {
      status: 'completed',
      score: r.score,
      data: {
        picks: {
          policies: [...policies],
          car,
          whichCar: car === 'one' ? whichCar : null,
        },
        surpriseCosts: r.surpriseCosts,
      },
    })
  }

  function reset() {
    setPolicies(new Set())
    setCar('none')
    setWhichCar('ben')
    setResults(null)
    window.scrollTo({ top: 0 })
  }

  // ---------- Results view: the month unfolds ----------
  if (results) {
    const tallyDelay = results.events.length * EVENT_DELAY + 0.3
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">🛡️</span> Ben's Insurance Challenge
      </h1>
        <p className="mt-1 text-sm text-slate-500">Coverage locked. Let's see how the month goes…</p>

        <div className="mt-4 space-y-3">
          {results.events.map((e, i) => (
            <div
              key={e.title}
              className="card animate-slide-up flex items-start gap-3 p-4"
              style={{ animationDelay: `${i * EVENT_DELAY}s` }}
            >
              <span className="text-2xl" aria-hidden="true">{e.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{e.title}</p>
                <p className={`mt-1 text-sm font-bold ${outcomeClasses(e.tone)}`}>{e.outcome}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="card animate-slide-up mt-4 space-y-4 text-center"
          style={{ animationDelay: `${tallyDelay}s` }}
          role="status"
        >
          <p className="text-5xl" aria-hidden="true">{results.gradeEmoji}</p>
          <h2 className="font-display text-3xl font-bold text-slate-900">{results.grade}</h2>
          <p className="font-display text-lg font-bold text-bff-700">{results.score} / 100</p>
          <div className="mx-auto max-w-sm rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <div className="flex justify-between">
              <span>Premiums paid</span>
              <span className="font-semibold">{usd(results.premiums)}</span>
            </div>
            <div className="flex justify-between">
              <span>Surprise costs</span>
              <span className={`font-semibold ${results.surpriseCosts > 0 ? 'text-red-600' : 'text-green-700'}`}>
                {usd(results.surpriseCosts)}
              </span>
            </div>
            <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 font-display font-bold text-slate-900">
              <span>Total this month</span>
              <span>{usd(results.premiums + results.surpriseCosts)}</span>
            </div>
          </div>
        </div>

        <div
          className="card animate-slide-up mt-4 border-amber-200 bg-amber-50 text-sm text-slate-700"
          style={{ animationDelay: `${tallyDelay + EVENT_DELAY}s` }}
        >
          <p className="font-display font-bold text-slate-900">
            <span aria-hidden="true">⚠️</span> One important note
          </p>
          <p className="mt-1">
            Don't take these fictional results as advice to skip life or home insurance — in real
            life those are essential, especially for a family like Ben's. This month just happened
            to be kind.
          </p>
        </div>

        <div
          className="animate-slide-up mt-6 flex flex-wrap justify-center gap-3"
          style={{ animationDelay: `${tallyDelay + EVENT_DELAY}s` }}
        >
          <button className="btn-secondary" onClick={reset}>
            Try again
          </button>
          <Link to="/activities" className="btn-primary">
            More activities
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Picker view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">🛡️</span> Ben's Insurance Challenge
      </h1>
      <p className="mt-1 text-sm text-slate-500">Part 2 of Ben's money adventure</p>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        <p>
          Ben's budget survived Part 1 — the beach trip is <strong>this month</strong>, and yes, the
          iguana is officially part of the family. Now Ben has <strong>{usd(BUDGET)}/month</strong>{' '}
          for insurance premiums. Insurance means paying a little every month so a disaster doesn't
          cost you a LOT all at once. But {usd(BUDGET)} won't cover everything… so what does Ben
          protect?
        </p>
      </div>

      {/* Running total */}
      <section className="card mt-6 p-4">
        <div className="flex items-center justify-between text-sm" aria-live="polite">
          <p className="font-display font-bold text-slate-900">
            {usd(premiums)} <span className="font-normal text-slate-500">of {usd(BUDGET)}</span>
          </p>
          <p className={`font-display font-bold ${overBudget ? 'text-red-600' : 'text-green-600'}`}>
            {overBudget ? `${usd(-remaining)} over budget!` : `${usd(remaining)} left`}
          </p>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={BUDGET}
          aria-valuenow={Math.min(premiums, BUDGET)}
          aria-label={`Premiums used: ${usd(premiums)} of ${usd(BUDGET)}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-300 ${overBudget ? 'bg-red-500' : 'bg-bff-600'}`}
            style={{ width: `${Math.min(100, (premiums / BUDGET) * 100)}%` }}
          />
        </div>
      </section>

      {/* Car insurance (radio) */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">
          <span aria-hidden="true">🚗</span> Car insurance
        </h2>
        <p className="text-xs text-slate-500">The family has two cars — Ben's and his wife's.</p>
        <div className="mt-2 space-y-2" role="radiogroup" aria-label="Car insurance">
          {(
            [
              { value: 'none', label: 'No car insurance', note: 'Living dangerously', cost: 0 },
              { value: 'one', label: 'Insure just one car', note: 'Pick which one below', cost: 80 },
              { value: 'both', label: 'Insure both cars', note: 'Full fleet coverage', cost: 120 },
            ] as { value: CarChoice; label: string; note: string; cost: number }[]
          ).map((opt) => {
            const on = car === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setCar(opt.value)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                  on ? 'border-bff-500 bg-bff-50 shadow-sm' : 'border-slate-200 bg-white hover:border-bff-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                      on ? 'border-bff-600 bg-bff-600' : 'border-slate-300 bg-white'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{opt.label}</p>
                    <p className="text-xs text-slate-500">{opt.note}</p>
                  </div>
                </div>
                <p className={`font-display text-sm font-bold ${on ? 'text-bff-700' : 'text-slate-500'}`}>
                  {usd(opt.cost)}
                </p>
              </button>
            )
          })}
        </div>
        {car === 'one' && (
          <div
            className="animate-pop-in mt-2 flex gap-2 rounded-xl border border-bff-200 bg-bff-50 p-3"
            role="radiogroup"
            aria-label="Which car to insure"
          >
            {(
              [
                { value: 'ben', label: "Ben's car" },
                { value: 'wife', label: "His wife's car" },
              ] as { value: WhichCar; label: string }[]
            ).map((opt) => {
              const on = whichCar === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setWhichCar(opt.value)}
                  className={`flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition ${
                    on
                      ? 'border-bff-600 bg-bff-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-bff-300'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}
      </section>

      {/* Other policies (toggles) */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">
          Other coverage <span className="text-sm font-normal text-slate-500">(tap to add or drop)</span>
        </h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {POLICIES.map((p) => {
            const on = policies.has(p.id)
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(p.id)}
                className={`flex items-start justify-between gap-2 rounded-xl border-2 px-4 py-3 text-left transition ${
                  on ? 'border-bff-500 bg-bff-50 shadow-sm' : 'border-slate-200 bg-white hover:border-bff-300'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    <span className="mr-1" aria-hidden="true">{p.emoji}</span>
                    {p.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{p.note}</p>
                </div>
                <div className="text-right">
                  <p className={`font-display text-sm font-bold ${on ? 'text-bff-700' : 'text-slate-500'}`}>
                    {usd(p.cost)}
                  </p>
                  <p className={`text-xs font-semibold ${on ? 'text-bff-700' : 'text-slate-500'}`}>
                    {on ? (
                      <>
                        Insured <span aria-hidden="true">✓</span>
                      </>
                    ) : (
                      'Not covered'
                    )}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Lock in */}
      <div className="mt-8 text-center">
        <button className="btn-primary w-full sm:w-auto" onClick={lockIn} disabled={overBudget}>
          Lock in coverage
        </button>
        {overBudget && (
          <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
            Ben is {usd(-remaining)} over his {usd(BUDGET)} insurance budget — drop something first.
          </p>
        )}
      </div>
    </div>
  )
}

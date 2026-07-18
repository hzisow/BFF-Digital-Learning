import { useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'

// ---------- The official numbers (from the BFF of America paper activity) ----------

const INCOME = 3200

interface NeedItem {
  label: string
  cost: number
  note?: string
}

const NEEDS: NeedItem[] = [
  { label: 'Rent', cost: 1200 },
  { label: 'Groceries', cost: 600 },
  { label: 'Water & electricity', cost: 275, note: 'Winter bill — higher than usual' },
  { label: 'Car payment', cost: 400 },
  { label: 'Gas', cost: 175 },
]

const NEEDS_TOTAL = NEEDS.reduce((sum, n) => sum + n.cost, 0)

interface ChoiceItem {
  id: string
  emoji: string
  label: string
  cost: number
  note: string
}

const CHOICES: ChoiceItem[] = [
  {
    id: 'credit-card',
    emoji: '💳',
    label: 'Credit card minimum payment',
    cost: 30,
    note: 'He owes $300 total',
  },
  {
    id: 'allergy-meds',
    emoji: '🤧',
    label: "Daughter's allergy medicine",
    cost: 45,
    note: 'Symptoms are mild… for now',
  },
  {
    id: 'guitar',
    emoji: '🎸',
    label: "Son's optional guitar lesson",
    cost: 50,
    note: 'Concert in two months',
  },
  {
    id: 'heater',
    emoji: '🔧',
    label: 'Car heater repair',
    cost: 150,
    note: 'Car runs, but the mornings are freezing',
  },
  {
    id: 'iguana',
    emoji: '🦎',
    label: 'Pet iguana',
    cost: 90,
    note: 'All the kids want it, mom is fine with it',
  },
  {
    id: 'soccer',
    emoji: '⚽',
    label: 'Soccer registration (13-year-old)',
    cost: 100,
    note: 'The fee went up this year',
  },
  {
    id: 'sneakers',
    emoji: '👟',
    label: 'New sneakers (9-year-old)',
    cost: 75,
    note: 'Current pair is falling apart',
  },
  {
    id: 'supplies',
    emoji: '✏️',
    label: "Classroom supplies for Ben's school",
    cost: 25,
    note: 'Teachers often cover these themselves',
  },
  {
    id: 'dinner',
    emoji: '🍝',
    label: 'Family dinner out',
    cost: 65,
    note: 'A night off from cooking',
  },
  {
    id: 'chipotle',
    emoji: '🌯',
    label: 'Chipotle on the way home',
    cost: 35,
    note: 'Just Ben. Just a burrito.',
  },
]

type SavingsAmount = 300 | 200 | 0

const SAVINGS_OPTIONS: { value: SavingsAmount; label: string; note: string }[] = [
  {
    value: 200,
    label: 'Save $200 for the beach trip',
    note: "This month's goal — keeps the trip on track",
  },
  {
    value: 300,
    label: 'Save $300',
    note: 'Adds the theme park trip!',
  },
  {
    value: 0,
    label: 'Save nothing',
    note: 'The beach can wait… right?',
  },
]

// ---------- Scoring ----------

type Tone = 'good' | 'warn' | 'neutral'

interface FeedbackLine {
  points: number
  text: string
  tone: Tone
}

interface Results {
  score: number
  grade: string
  gradeEmoji: string
  lines: FeedbackLine[]
  spent: number
  saved: SavingsAmount
}

function computeResults(picked: ReadonlySet<string>, saved: SavingsAmount): Results {
  const has = (id: string) => picked.has(id)
  const lines: FeedbackLine[] = []

  // Savings
  if (saved === 300) {
    lines.push({ points: 25, text: 'Beach trip AND theme park secured — the kids are thrilled.', tone: 'good' })
  } else if (saved === 200) {
    lines.push({ points: 18, text: 'Beach trip on track (no theme park, but the ocean is free).', tone: 'good' })
  } else {
    lines.push({ points: 0, text: 'The beach trip slips away this month…', tone: 'warn' })
  }

  // Credit card minimum
  if (has('credit-card')) {
    lines.push({ points: 15, text: "You avoided late fees and protected Ben's credit score.", tone: 'good' })
  } else {
    lines.push({
      points: 0,
      text: "Missed minimum payment → late fee + credit score damage. This one's expensive later.",
      tone: 'warn',
    })
  }

  // Heater
  if (has('heater')) {
    lines.push({ points: 10, text: 'Heater fixed before it becomes a $400 problem — smart.', tone: 'good' })
  } else {
    lines.push({ points: 5, text: 'Skipping the heater is risky, but survivable — cold mornings build character?', tone: 'neutral' })
  }

  // Sneakers
  if (has('sneakers')) {
    lines.push({ points: 8, text: 'Falling-apart shoes were becoming a need, not a want.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: "The 9-year-old's sneakers flap on for another month. Duct tape is a fashion statement, right?", tone: 'neutral' })
  }

  // Soccer
  if (has('soccer')) {
    lines.push({ points: 8, text: 'The 13-year-old stays on the team — commitment honored.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: "Skipping soccer stings — that's a hard dinner-table conversation for Ben.", tone: 'neutral' })
  }

  // Allergy meds — judgment call either way
  if (has('allergy-meds')) {
    lines.push({ points: 6, text: 'Symptoms are mild, but staying ahead of spring allergies is a fair call.', tone: 'good' })
  } else {
    lines.push({ points: 6, text: 'With mild symptoms, waiting on the meds is a real judgment call — just keep an eye on her.', tone: 'neutral' })
  }

  // Guitar
  if (has('guitar')) {
    lines.push({ points: 5, text: 'Guitar lesson booked — concert prep stays on track.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: 'No lesson this month — he can practice at home till the concert.', tone: 'neutral' })
  }

  // Classroom supplies
  if (has('supplies')) {
    lines.push({ points: 5, text: "Classroom supplies covered — Ben's students (and Ben) say thanks.", tone: 'good' })
  } else {
    lines.push({ points: 0, text: 'The classroom makes do this month.', tone: 'neutral' })
  }

  // Dinner out
  if (has('dinner')) {
    lines.push({ points: 3, text: 'Family dinner out — family time matters.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: 'Home-cooked it is — the beach fund thanks you.', tone: 'neutral' })
  }

  // Chipotle
  if (has('chipotle')) {
    lines.push({ points: 2, text: 'Chipotle acquired. Small joys!', tone: 'good' })
  } else {
    lines.push({ points: 0, text: 'The burrito that got away.', tone: 'neutral' })
  }

  // Iguana
  if (has('iguana')) {
    lines.push({ points: 0, text: 'The iguana joins the family. Foreshadowing: iguanas complicate insurance.', tone: 'neutral' })
  } else {
    lines.push({ points: 5, text: 'A $90/month pet on a tight month — wise pass.', tone: 'good' })
  }

  // Under budget (submit is blocked while over, so this always lands)
  const choicesTotal = CHOICES.reduce((sum, c) => sum + (has(c.id) ? c.cost : 0), 0)
  const spent = NEEDS_TOTAL + choicesTotal + saved
  if (spent <= INCOME) {
    lines.push({ points: 10, text: "Stayed under $3,200 — Ben's budget actually balances.", tone: 'good' })
  }

  const score = Math.min(100, lines.reduce((sum, l) => sum + l.points, 0))
  const [grade, gradeEmoji] =
    score >= 85
      ? ['Budget Boss', '👑']
      : score >= 65
        ? ['Money Manager', '💪']
        : score >= 40
          ? ['Learning the Ropes', '🧗']
          : ['Back to the Drawing Board', '📝']

  return { score, grade, gradeEmoji, lines, spent, saved }
}

// ---------- Small helpers ----------

function usd(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

function toneClasses(tone: Tone): string {
  switch (tone) {
    case 'good':
      return 'bg-green-100 text-green-700'
    case 'warn':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}

// ---------- Component ----------

export default function BensBudget() {
  const { student } = useStudent()
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set())
  const [saved, setSaved] = useState<SavingsAmount | null>(null)
  const [results, setResults] = useState<Results | null>(null)

  const choicesTotal = CHOICES.reduce((sum, c) => sum + (picked.has(c.id) ? c.cost : 0), 0)
  const spent = NEEDS_TOTAL + choicesTotal + (saved ?? 0)
  const remaining = INCOME - spent
  const overBudget = spent > INCOME

  function toggle(id: string) {
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function lockIn() {
    if (saved === null || overBudget) return
    const r = computeResults(picked, saved)
    setResults(r)
    window.scrollTo({ top: 0 })
    void saveProgress(student, 'bens-budget', {
      status: 'completed',
      score: r.score,
      data: { choices: [...picked], saved },
    })
  }

  function reset() {
    setPicked(new Set())
    setSaved(null)
    setResults(null)
    window.scrollTo({ top: 0 })
  }

  // ---------- Results view ----------
  if (results) {
    const leftover = INCOME - results.spent
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="card animate-pop-in space-y-4 text-center">
          <p className="text-5xl">{results.gradeEmoji}</p>
          <h1 className="font-display text-3xl font-bold text-slate-900">{results.grade}</h1>
          <p className="font-display text-lg font-bold text-bff-700">{results.score} / 100</p>
          <div className="mx-auto flex max-w-md flex-wrap justify-center gap-2 text-sm">
            <span className="chip bg-slate-100 text-slate-700">
              Spent {usd(results.spent - results.saved)} of {usd(INCOME)}
            </span>
            <span className="chip bg-bff-50 text-bff-700">Saved {usd(results.saved)}</span>
            <span className="chip bg-slate-100 text-slate-700">Left over {usd(leftover)}</span>
          </div>
        </div>

        <div className="card mt-4 space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900">How Ben's month played out</h2>
          <ul className="space-y-2">
            {results.lines.map((line) => (
              <li key={line.text} className="flex items-start gap-3">
                <span className={`chip mt-0.5 w-12 shrink-0 justify-center ${toneClasses(line.tone)}`}>
                  {line.points > 0 ? `+${line.points}` : '0'}
                </span>
                <span className="text-sm text-slate-700">{line.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card mt-4 border-bff-200 bg-bff-50">
          <h2 className="font-display text-lg font-bold text-slate-900">🗣️ Reflection</h2>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Be ready to explain what you kept, what you cut, and why.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Which cut was the hardest to make, and what made it hard?</li>
            <li>
              The sneakers started as a "want" and drifted toward a "need." What else on Ben's list
              could switch categories over time?
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            Try again
          </button>
          <Link to="/challenge/bens-insurance" className="btn-primary">
            Part 2: Ben needs insurance →
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Builder view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">💸 Ben's Budget Challenge</h1>
      <p className="mt-1 text-sm text-slate-500">Part 1 of Ben's money adventure</p>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        <p>
          Meet <strong>Ben</strong>: 36, middle school science teacher, married, three kids (ages 5,
          9, and 13). After taxes, <strong>{usd(INCOME)}</strong> lands in his account each month.
          The family dream: a <strong>beach trip in 3 months</strong>, which means saving{' '}
          <strong>$900 total — $300 this month</strong>. Your job: decide where every dollar goes.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          ℹ️ Health insurance ($300/month) is already deducted from Ben's paycheck — it's handled
          and doesn't count against the {usd(INCOME)}.
        </p>
      </div>

      {/* Needs */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">
          The needs <span className="text-sm font-normal text-slate-500">(locked in — Ben can't skip these)</span>
        </h2>
        <div className="mt-2 space-y-2">
          {NEEDS.map((n) => (
            <div
              key={n.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-100/70 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-slate-300 text-xs text-white"
                >
                  ✓
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-600">{n.label}</p>
                  {n.note && <p className="text-xs text-slate-400">{n.note}</p>}
                </div>
              </div>
              <p className="font-display text-sm font-bold text-slate-500">{usd(n.cost)}</p>
            </div>
          ))}
          <p className="text-right text-xs font-semibold text-slate-500">
            Needs total: {usd(NEEDS_TOTAL)}
          </p>
        </div>
      </section>

      {/* Running budget bar */}
      <section className="card mt-6 p-4">
        <div className="flex items-center justify-between text-sm">
          <p className="font-display font-bold text-slate-900">
            {usd(spent)} <span className="font-normal text-slate-400">of {usd(INCOME)}</span>
          </p>
          <p className={`font-display font-bold ${overBudget ? 'text-red-600' : 'text-green-600'}`}>
            {overBudget ? `${usd(-remaining)} over budget!` : `${usd(remaining)} left`}
          </p>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-300 ${overBudget ? 'bg-red-500' : 'bg-bff-600'}`}
            style={{ width: `${Math.min(100, (spent / INCOME) * 100)}%` }}
          />
        </div>
      </section>

      {/* Choices */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">
          The choices <span className="text-sm font-normal text-slate-500">(tap to keep or cut)</span>
        </h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {CHOICES.map((c) => {
            const on = picked.has(c.id)
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(c.id)}
                className={`flex items-start justify-between gap-2 rounded-xl border-2 px-4 py-3 text-left transition ${
                  on
                    ? 'border-bff-500 bg-bff-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-bff-300'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    <span className="mr-1">{c.emoji}</span>
                    {c.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.note}</p>
                </div>
                <div className="text-right">
                  <p className={`font-display text-sm font-bold ${on ? 'text-bff-700' : 'text-slate-500'}`}>
                    {usd(c.cost)}
                  </p>
                  <p className={`text-xs font-semibold ${on ? 'text-bff-600' : 'text-slate-400'}`}>
                    {on ? 'Buying ✓' : 'Skipped'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Savings */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">🏖️ The beach fund</h2>
        <div className="mt-2 space-y-2" role="radiogroup" aria-label="Savings choice">
          {SAVINGS_OPTIONS.map((opt) => {
            const on = saved === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSaved(opt.value)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                  on
                    ? 'border-bff-500 bg-bff-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-bff-300'
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
                  {usd(opt.value)}
                </p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Lock in */}
      <div className="mt-8 text-center">
        <button className="btn-primary w-full sm:w-auto" onClick={lockIn} disabled={overBudget || saved === null}>
          Lock in Ben's budget
        </button>
        {overBudget && (
          <p className="mt-2 text-sm font-semibold text-red-600">
            Ben is {usd(-remaining)} over budget — cut something before locking in.
          </p>
        )}
        {!overBudget && saved === null && (
          <p className="mt-2 text-sm text-slate-500">Pick a beach fund option to finish.</p>
        )}
      </div>
    </div>
  )
}

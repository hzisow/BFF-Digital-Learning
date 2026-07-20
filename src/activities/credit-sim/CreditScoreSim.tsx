import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import type { LiveGameProps } from '../live/types'

// ---------- Score bands (standard FICO ranges) ----------

const SCORE_MIN = 300
const SCORE_MAX = 850
const START_SCORE = 630

interface Band {
  name: string
  min: number
  max: number
  barClass: string
  chipClass: string
}

const BANDS: Band[] = [
  { name: 'Poor', min: 300, max: 579, barClass: 'bg-red-400', chipClass: 'bg-red-100 text-red-700' },
  { name: 'Fair', min: 580, max: 669, barClass: 'bg-amber-400', chipClass: 'bg-amber-100 text-amber-700' },
  { name: 'Good', min: 670, max: 739, barClass: 'bg-lime-400', chipClass: 'bg-lime-100 text-lime-800' },
  { name: 'Very Good', min: 740, max: 799, barClass: 'bg-green-400', chipClass: 'bg-green-100 text-green-700' },
  { name: 'Exceptional', min: 800, max: 850, barClass: 'bg-green-600', chipClass: 'bg-green-100 text-green-800' },
]

function bandFor(score: number): Band {
  return BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1]
}

// ---------- FICO factors (the real weights) ----------

type Factor = 'payment' | 'utilization' | 'length' | 'new' | 'mix'

const FACTORS: Record<Factor, string> = {
  payment: 'Payment history · 35%',
  utilization: 'Credit utilization · 30%',
  length: 'Length of history · 15%',
  new: 'New credit · 10%',
  mix: 'Credit mix · 10%',
}

// ---------- The 10 months ----------

interface Choice {
  id: string
  label: string
  delta: number
  explanation: string
  factors: Factor[]
}

interface MonthCard {
  emoji: string
  title: string
  scenario: string
  choices: Choice[]
}

const MONTHS: MonthCard[] = [
  {
    emoji: '💌',
    title: 'The first bill',
    scenario:
      'Your first credit card statement lands: $85 balance, minimum due $25. Meanwhile, concert tickets for Friday just dropped and they are NOT cheap.',
    choices: [
      {
        id: 'pay-full',
        label: 'Pay the $85 in full',
        delta: 15,
        explanation:
          'On time and in full. Payment history is the single biggest slice of your score, and a $0 carried balance keeps your utilization low too.',
        factors: ['payment', 'utilization'],
      },
      {
        id: 'pay-min',
        label: 'Pay the $25 minimum',
        delta: 5,
        explanation:
          "Still on time — that's what payment history records — but the leftover $60 rolls over and starts collecting interest at around 24% APR.",
        factors: ['payment'],
      },
      {
        id: 'skip',
        label: 'Skip it — tickets first',
        delta: -85,
        explanation:
          'The payment goes 30+ days late and hits your credit report. One late mark is the biggest single hit your score can take, and it can stick around for up to 7 years.',
        factors: ['payment'],
      },
    ],
  },
  {
    emoji: '🛍️',
    title: 'The checkout counter',
    scenario:
      'A clothing store offers 20% off your whole purchase today if you open their store credit card. The cashier is waiting.',
    choices: [
      {
        id: 'decline',
        label: 'No thanks — just the hoodie',
        delta: 5,
        explanation:
          'No hard inquiry, no brand-new account. Your existing accounts quietly get older, which slowly helps your score.',
        factors: ['new', 'length'],
      },
      {
        id: 'open',
        label: 'Open the card for the discount',
        delta: -10,
        explanation:
          'A hard inquiry plus a brand-new account lowers your average account age. That 20% off cost more than it saved.',
        factors: ['new', 'length'],
      },
      {
        id: 'open-max',
        label: 'Open it AND buy the whole cart',
        delta: -30,
        explanation:
          'An inquiry, a new account, and a nearly maxed-out card all at once. High utilization on any card is a classic red flag.',
        factors: ['new', 'utilization'],
      },
    ],
  },
  {
    emoji: '📈',
    title: 'Limit raised',
    scenario:
      'Good news from your card company: your credit limit just doubled from $500 to $1,000. What changes?',
    choices: [
      {
        id: 'same-spend',
        label: 'Keep spending like before',
        delta: 20,
        explanation:
          'Same spending on double the limit cuts your utilization roughly in half. Under 30% is the healthy zone; under 10% is elite.',
        factors: ['utilization'],
      },
      {
        id: 'max-it',
        label: 'New limit, new lifestyle',
        delta: -30,
        explanation:
          "Spending up to the new limit pushes utilization near 100% — the classic 'maxed out' signal lenders hate.",
        factors: ['utilization'],
      },
    ],
  },
  {
    emoji: '🗃️',
    title: 'The forgotten card',
    scenario:
      "Your very first card has been sitting unused in a drawer for months. It feels useless. Close it?",
    choices: [
      {
        id: 'keep-open',
        label: 'Keep it open with one small autopaid subscription',
        delta: 10,
        explanation:
          'Your oldest account keeps aging, and its limit keeps your overall utilization low. Old cards are quiet MVPs.',
        factors: ['length', 'utilization'],
      },
      {
        id: 'close-it',
        label: 'Close it — feels tidy',
        delta: -20,
        explanation:
          'Closing your oldest card shrinks your available credit (utilization jumps) and will eventually shorten your credit history.',
        factors: ['length', 'utilization'],
      },
    ],
  },
  {
    emoji: '🤝',
    title: 'The co-sign ask',
    scenario:
      "Your friend can't get approved for a phone financing plan and asks you to co-sign. \"You won't have to pay anything, promise!\"",
    choices: [
      {
        id: 'decline-cosign',
        label: 'Offer moral support instead',
        delta: 5,
        explanation:
          "Co-signing makes their debt legally YOUR debt. Saying no protects your payment history from someone else's forgetfulness.",
        factors: ['payment'],
      },
      {
        id: 'cosign',
        label: 'Co-sign — what could go wrong?',
        delta: -25,
        explanation:
          "A hard inquiry, plus the whole loan lands on YOUR report. When your friend pays late next month, that late mark is yours too.",
        factors: ['payment', 'new'],
      },
    ],
  },
  {
    emoji: '⏰',
    title: 'Autopilot',
    scenario: "School, practice, work — life is getting busy. Set up autopay on your card?",
    choices: [
      {
        id: 'auto-full',
        label: 'Autopay the full balance',
        delta: 15,
        explanation:
          "You can't be late if the robot pays. A perfect payment history builds itself while you sleep.",
        factors: ['payment'],
      },
      {
        id: 'auto-min',
        label: 'Autopay the minimum, pay extra manually',
        delta: 8,
        explanation:
          'A late payment is now impossible — solid. Just remember that carrying a balance still costs interest.',
        factors: ['payment'],
      },
      {
        id: 'no-auto',
        label: "Nah, I'll just remember",
        delta: 0,
        explanation:
          'You remembered… 3 days late. Under 30 days late never reaches your credit report, so your score survives — but you paid a $30 late fee. Living dangerously.',
        factors: ['payment'],
      },
    ],
  },
  {
    emoji: '🔎',
    title: 'The free checkup',
    scenario:
      'You can pull your full credit report for free at AnnualCreditReport.com. Worth the 10 minutes?',
    choices: [
      {
        id: 'check-report',
        label: 'Check it',
        delta: 10,
        explanation:
          "Checking your OWN report is a soft inquiry — zero harm, ever. Good thing too: you find a card you never opened, dispute it, and it's removed.",
        factors: ['payment', 'new'],
      },
      {
        id: 'skip-report',
        label: 'Sounds boring',
        delta: 0,
        explanation:
          'Nothing changes today — but about 1 in 4 credit reports contains an error, and errors you never see can quietly drag your score for years.',
        factors: [],
      },
    ],
  },
  {
    emoji: '💻',
    title: 'The laptop',
    scenario: 'Your dream gaming laptop is $900. Your card limit is $1,000. It is ON SALE.',
    choices: [
      {
        id: 'save-up',
        label: 'Save cash for 3 more months',
        delta: 10,
        explanation:
          'Utilization stays low, zero interest paid, on-time streak continues. The laptop will still exist in October.',
        factors: ['utilization'],
      },
      {
        id: 'charge-it',
        label: "Charge it, pay it off 'eventually'",
        delta: -25,
        explanation:
          'A $900 balance on a $1,000 limit means 90% utilization gets reported this month. Lenders read that as maxed out.',
        factors: ['utilization'],
      },
      {
        id: 'bnpl',
        label: "Split it into 4 'easy' payments",
        delta: -5,
        explanation:
          'Buy-now-pay-later plans increasingly show up on credit reports — and a missed installment hurts just like a missed card payment.',
        factors: ['new', 'payment'],
      },
    ],
  },
  {
    emoji: '🧱',
    title: 'Builder move',
    scenario:
      'Your credit union offers a $300 credit-builder loan: pay $25/month for a year, get the money back at the end, payments reported to the bureaus.',
    choices: [
      {
        id: 'builder-loan',
        label: 'Take the builder loan',
        delta: 10,
        explanation:
          'An installment loan next to your revolving card improves your credit mix, and every on-time payment feeds the biggest factor of all.',
        factors: ['mix', 'payment'],
      },
      {
        id: 'pass-loan',
        label: 'Pass for now',
        delta: 5,
        explanation:
          'Totally reasonable. Your existing accounts keep aging, and account age is free points.',
        factors: ['length'],
      },
    ],
  },
  {
    emoji: '📱',
    title: 'The cracked screen finale',
    scenario:
      "Month 10: your phone screen finally gives out completely. You need a replacement — how do you pay?",
    choices: [
      {
        id: 'refurb-cash',
        label: 'Buy a refurbished one with savings',
        delta: 10,
        explanation:
          'No new debt, utilization untouched, and your on-time streak rolls on. Boring is beautiful.',
        factors: ['utilization', 'payment'],
      },
      {
        id: 'carrier-plan',
        label: '0% carrier financing with autopay',
        delta: 5,
        explanation:
          "A small installment loan paid on time is fine — it even adds to your mix. Just don't stack five of these.",
        factors: ['mix', 'payment'],
      },
      {
        id: 'max-card',
        label: 'New flagship on the credit card, pay minimums',
        delta: -30,
        explanation:
          'A big balance near your limit plus minimum payments means high utilization now and months of interest later.',
        factors: ['utilization'],
      },
    ],
  },
]

// ---------- Final titles ----------

function titleFor(score: number): [title: string, emoji: string, blurb: string] {
  if (score >= 800)
    return ['Credit Legend', '🏆', 'An exceptional score. Lenders will roll out the red carpet — best rates on everything.']
  if (score >= 740)
    return ['Score Sensei', '🥋', 'Very good. You built habits most adults never figure out.']
  if (score >= 670)
    return ['Solid Builder', '🧱', 'A good score — steady habits, steady growth. Keep stacking on-time payments.']
  if (score >= 580)
    return ['Work in Progress', '🚧', "Fair. Some choices cost you, but nothing that consistent on-time payments can't repair."]
  return ['Rebuild Mode', '🔧', 'The score took real damage — the good news: payment history heals with time, starting today.']
}

function clampScore(n: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, n))
}

/** Map 300-850 linearly onto 0-100 for saved progress. */
function progressScore(score: number): number {
  return Math.round(((clampScore(score) - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100)
}

function deltaChip(delta: number): { text: string; classes: string } {
  if (delta > 0) return { text: `+${delta} points`, classes: 'bg-green-100 text-green-700' }
  if (delta < 0) return { text: `${delta} points`, classes: 'bg-red-100 text-red-700' }
  return { text: '±0 points', classes: 'bg-slate-100 text-slate-600' }
}

// ---------- Score meter ----------

function ScoreMeter({ score }: { score: number }) {
  const pct = ((score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100
  const band = bandFor(score)
  return (
    <div>
      <div
        className="relative"
        role="progressbar"
        aria-valuemin={SCORE_MIN}
        aria-valuemax={SCORE_MAX}
        aria-valuenow={score}
        aria-valuetext={`${score} — ${band.name}`}
        aria-label="Credit score meter"
      >
        <div className="flex h-4 w-full overflow-hidden rounded-full">
          {BANDS.map((b) => (
            <div
              key={b.name}
              className={`h-full ${b.barClass}`}
              style={{ width: `${((b.max - b.min + 1) / (SCORE_MAX - SCORE_MIN + 1)) * 100}%` }}
            />
          ))}
        </div>
        {/* Marker */}
        <div
          aria-hidden="true"
          className="absolute -top-1 h-6 w-1.5 rounded-full bg-slate-900 shadow transition-all duration-500 ease-out"
          style={{ left: `calc(${pct}% - 3px)` }}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5" aria-hidden="true">
        {BANDS.map((b) => (
          <span
            key={b.name}
            className={`chip ${b.name === band.name ? b.chipClass : 'bg-slate-100 text-slate-600'}`}
          >
            {b.name} {b.min}–{b.max}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------- Component ----------

interface HistoryEntry {
  month: number
  title: string
  choiceId: string
  choiceLabel: string
  delta: number
  explanation: string
}

export default function CreditScoreSim({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const [monthIndex, setMonthIndex] = useState(0)
  const [score, setScore] = useState(START_SCORE)
  const [feedback, setFeedback] = useState<Choice | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [done, setDone] = useState(false)

  const studentRef = useRef(student)
  studentRef.current = student

  // Mark the activity as started once.
  useEffect(() => {
    void saveProgress(studentRef.current, 'credit-score-sim', { status: 'started' })
  }, [])

  const month = MONTHS[monthIndex]
  const band = bandFor(score)

  function choose(choice: Choice) {
    if (feedback) return
    setScore((s) => clampScore(s + choice.delta))
    setFeedback(choice)
    setHistory((h) => [
      ...h,
      {
        month: monthIndex + 1,
        title: month.title,
        choiceId: choice.id,
        choiceLabel: choice.label,
        delta: choice.delta,
        explanation: choice.explanation,
      },
    ])
  }

  function nextMonth() {
    if (monthIndex + 1 >= MONTHS.length) {
      setDone(true)
      window.scrollTo({ top: 0 })
      void saveProgress(studentRef.current, 'credit-score-sim', {
        status: 'completed',
        score: progressScore(score),
        data: { finalScore: score, choices: history.map((h) => h.choiceId) },
      })
      onComplete?.(progressScore(score))
    } else {
      setMonthIndex((i) => i + 1)
      setFeedback(null)
      window.scrollTo({ top: 0 })
    }
  }

  function playAgain() {
    setMonthIndex(0)
    setScore(START_SCORE)
    setFeedback(null)
    setHistory([])
    setDone(false)
    window.scrollTo({ top: 0 })
  }

  // ---------- Final screen ----------
  if (done) {
    const [title, emoji, blurb] = titleFor(score)
    const best = history.reduce((a, b) => (b.delta > a.delta ? b : a), history[0])
    const worst = history.reduce((a, b) => (b.delta < a.delta ? b : a), history[0])
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="card animate-pop-in space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{emoji}</p>
          <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
          <p className="font-display text-lg font-bold text-bff-700">
            Final score: {score} — {band.name}
          </p>
          <p className="mx-auto max-w-md text-sm text-slate-700">{blurb}</p>
          <div className="px-2 pt-2 text-left">
            <ScoreMeter score={score} />
          </div>
          <p className="text-xs text-slate-500">
            Started at {START_SCORE} · finished at {score} (
            {score - START_SCORE >= 0 ? '+' : ''}
            {score - START_SCORE} over 10 months)
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="card animate-slide-up border-green-200 bg-green-50">
            <h2 className="font-display text-base font-bold text-slate-900">
              <span aria-hidden="true">🌟</span> Best move
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              Month {best.month}: {best.choiceLabel}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {best.delta >= 0 ? `+${best.delta}` : best.delta} points — {best.explanation}
            </p>
          </div>
          <div className="card animate-slide-up border-red-200 bg-red-50">
            <h2 className="font-display text-base font-bold text-slate-900">
              <span aria-hidden="true">🕳️</span> Costliest move
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              Month {worst.month}: {worst.choiceLabel}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {worst.delta >= 0 ? `+${worst.delta}` : worst.delta} points — {worst.explanation}
            </p>
          </div>
        </div>

        <div className="card mt-4 border-bff-200 bg-bff-50">
          <h2 className="font-display text-lg font-bold text-slate-900">
            <span aria-hidden="true">💡</span> The recipe never changes
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            Pay every bill on time, keep balances low, let accounts age, and open new credit
            rarely. That's the whole cheat code — the five factors below are how FICO weighs it.
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {(Object.keys(FACTORS) as Factor[]).map((f) => (
              <li key={f} className="chip bg-white text-bff-700">
                {FACTORS[f]}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={playAgain}>
            Play 10 more months
          </button>
          <Link to="/activities" className="btn-primary">
            Back to activities <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Playing view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">💳📈</span> Credit Score Builder
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        10 months, 10 decisions. Build the three-digit number that follows you for life.
      </p>

      {/* Score meter */}
      <section className="card mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-lg font-bold text-slate-900" aria-live="polite">
            Score: {score} <span className="font-semibold text-bff-700">— {band.name}</span>
          </p>
          <p className="text-sm text-slate-500">
            Month {monthIndex + 1} of {MONTHS.length}
          </p>
        </div>
        <div className="mt-3">
          <ScoreMeter score={score} />
        </div>
      </section>

      {/* Decision card */}
      <section className="card mt-4">
        <h2 className="font-display text-lg font-bold text-slate-900">
          <span className="mr-1" aria-hidden="true">{month.emoji}</span>
          Month {monthIndex + 1}: {month.title}
        </h2>
        <p className="mt-2 text-sm text-slate-700">{month.scenario}</p>

        {feedback === null ? (
          <div className="mt-4 space-y-2">
            {month.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => choose(choice)}
                className="block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:border-bff-400 hover:bg-bff-50"
              >
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 animate-pop-in rounded-xl border-2 border-bff-200 bg-bff-50 p-4" role="status">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`chip ${deltaChip(feedback.delta).classes}`}>
                {deltaChip(feedback.delta).text}
              </span>
              <span className="text-sm font-semibold text-slate-800">{feedback.label}</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{feedback.explanation}</p>
            {feedback.factors.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Credit score factors involved">
                {feedback.factors.map((f) => (
                  <li key={f} className="chip bg-white text-bff-700">
                    {FACTORS[f]}
                  </li>
                ))}
              </ul>
            )}
            <button className="btn-primary mt-4" onClick={nextMonth}>
              {monthIndex + 1 >= MONTHS.length ? 'See your final score' : `On to month ${monthIndex + 2}`}{' '}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>

      {/* Factor legend */}
      <section className="card mt-4 bg-slate-100/70 p-4">
        <h2 className="font-display text-sm font-bold text-slate-900">
          What actually moves a credit score?
        </h2>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {(Object.keys(FACTORS) as Factor[]).map((f) => (
            <li key={f} className="chip bg-white text-slate-600">
              {FACTORS[f]}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

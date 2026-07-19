import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'

const SLUG = 'goal-getter'
const TOTAL_MONTHS = 6
const BASE_INCOME = 200
const STEP = 20
const REPAIR_COST = 150
const PLAN_FEE = 10 // charged when the repair can't be paid from the emergency fund
const WINDFALL = 60
const TRIP_COST = 40

// ---------- Goals ----------

type GoalId = 'emergency' | 'bike' | 'concert'
type Bucket = GoalId | 'fun'

interface Goal {
  id: GoalId
  emoji: string
  label: string
  target: number
  deadline: number // must be reached by the END of this month
  weight: number
}

const GOALS: Goal[] = [
  { id: 'emergency', emoji: '🚨', label: 'Emergency fund', target: 300, deadline: 6, weight: 40 },
  { id: 'bike', emoji: '🚲', label: 'New bike', target: 240, deadline: 4, weight: 35 },
  { id: 'concert', emoji: '🎤', label: 'Concert tickets', target: 120, deadline: 3, weight: 25 },
]

const BUCKETS: { id: Bucket; emoji: string; label: string }[] = [
  ...GOALS.map((g) => ({ id: g.id as Bucket, emoji: g.emoji, label: g.label })),
  { id: 'fun', emoji: '🍿', label: 'Spend on fun' },
]

type Balances = Record<Bucket, number>
type Alloc = Record<Bucket, number>

const ZERO_ALLOC: Alloc = { emergency: 0, bike: 0, concert: 0, fun: 0 }

// ---------- Life events ----------

interface EventCard {
  emoji: string
  title: string
  lines: string[]
  kind: 'info' | 'trip'
}

interface MonthInfo {
  income: number
  minFun: number
  note: string | null
}

const PLAIN_MONTH: MonthInfo = { income: BASE_INCOME, minFun: 0, note: null }

// ---------- Scoring ----------

function tierFor(score: number): { title: string; emoji: string } {
  if (score >= 90) return { title: 'Goal Getter Supreme', emoji: '🎯' }
  if (score >= 70) return { title: 'On Track', emoji: '🚀' }
  if (score >= 45) return { title: 'Halfway Hero', emoji: '🌗' }
  return { title: 'Fun-First Spender', emoji: '🎢' }
}

function usd(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

// ---------- Component ----------

export default function GoalGetter() {
  const { student } = useStudent()
  const [month, setMonth] = useState(1)
  const [phase, setPhase] = useState<'allocate' | 'event' | 'results'>('allocate')
  const [balances, setBalances] = useState<Balances>({ ...ZERO_ALLOC })
  const [alloc, setAlloc] = useState<Alloc>({ ...ZERO_ALLOC })
  const [monthInfo, setMonthInfo] = useState<MonthInfo>(PLAIN_MONTH)
  const [eventCard, setEventCard] = useState<EventCard | null>(null)
  const [repairCoveredByFund, setRepairCoveredByFund] = useState<boolean | null>(null)
  const [tripTaken, setTripTaken] = useState<boolean | null>(null)
  const [snapshots, setSnapshots] = useState<Partial<Record<GoalId, number>>>({})

  const studentRef = useRef(student)
  studentRef.current = student
  useEffect(() => {
    void saveProgress(studentRef.current, SLUG, { status: 'started' })
  }, [])

  const allocated = BUCKETS.reduce((sum, b) => sum + alloc[b.id], 0)
  const remaining = monthInfo.income - allocated
  const overAllocated = remaining < 0

  function bump(bucket: Bucket, delta: number) {
    setAlloc((prev) => {
      const min = bucket === 'fun' ? monthInfo.minFun : 0
      const next = Math.max(min, prev[bucket] + delta)
      return { ...prev, [bucket]: next }
    })
  }

  /** Advance from the just-confirmed month `m` (with updated balances) to month m+1. */
  function enterMonth(nextMonth: number, currentBalances: Balances) {
    if (nextMonth === 2) {
      // Cracked phone screen: $150 repair.
      if (currentBalances.emergency >= REPAIR_COST) {
        setBalances({ ...currentBalances, emergency: currentBalances.emergency - REPAIR_COST })
        setRepairCoveredByFund(true)
        setMonthInfo({
          income: BASE_INCOME,
          minFun: 0,
          note: `Your emergency fund paid the ${usd(REPAIR_COST)} repair — this month's paycheck is untouched.`,
        })
        setEventCard({
          emoji: '📱',
          title: 'CRACK. Your phone screen shatters.',
          lines: [
            `The repair costs ${usd(REPAIR_COST)}.`,
            `Good news: your emergency fund has ${usd(currentBalances.emergency)}, so it absorbs the hit. That is exactly what it is for.`,
            `Emergency fund: ${usd(currentBalances.emergency)} → ${usd(currentBalances.emergency - REPAIR_COST)}.`,
          ],
          kind: 'info',
        })
      } else {
        const fromFund = currentBalances.emergency
        const fromIncome = REPAIR_COST - fromFund + PLAN_FEE
        setBalances({ ...currentBalances, emergency: 0 })
        setRepairCoveredByFund(false)
        setMonthInfo({
          income: BASE_INCOME - fromIncome,
          minFun: 0,
          note: `The repair took ${usd(fromIncome)} straight out of this month's paycheck (including a ${usd(PLAN_FEE)} payment-plan fee).`,
        })
        setEventCard({
          emoji: '📱',
          title: 'CRACK. Your phone screen shatters.',
          lines: [
            `The repair costs ${usd(REPAIR_COST)} — but your emergency fund only has ${usd(fromFund)}.`,
            fromFund > 0
              ? `The fund is drained to $0, and the remaining ${usd(REPAIR_COST - fromFund)} plus a ${usd(PLAN_FEE)} payment-plan fee comes straight out of this month's income.`
              : `With no buffer, the whole ${usd(REPAIR_COST)} plus a ${usd(PLAN_FEE)} payment-plan fee comes straight out of this month's income.`,
            `This month you only have ${usd(BASE_INCOME - fromIncome)} to allocate. This is why "pay yourself first" matters — a buffer in month 1 would have protected month 2.`,
          ],
          kind: 'info',
        })
      }
      setPhase('event')
    } else if (nextMonth === 4) {
      setBalances(currentBalances)
      setMonthInfo({
        income: BASE_INCOME + WINDFALL,
        minFun: 0,
        note: `Babysitting bonus: ${usd(WINDFALL)} extra to allocate this month.`,
      })
      setEventCard({
        emoji: '🍼',
        title: `Windfall! A weekend of babysitting pays a ${usd(WINDFALL)} bonus.`,
        lines: [
          `This month you have ${usd(BASE_INCOME + WINDFALL)} instead of ${usd(BASE_INCOME)}.`,
          'A windfall is a chance to catch up on a goal — or to blow it all on fun. Your call.',
        ],
        kind: 'info',
      })
      setPhase('event')
    } else if (nextMonth === 5) {
      setBalances(currentBalances)
      setMonthInfo(PLAIN_MONTH) // finalized by the trip choice
      setEventCard({
        emoji: '🚌',
        title: `Your friends invite you on a ${usd(TRIP_COST)} day trip.`,
        lines: [
          'It sounds genuinely fun, and fun matters — budgets that allow zero fun tend to collapse.',
          `Go, and ${usd(TRIP_COST)} of this month's money is committed to fun before you allocate the rest. Skip it, and you keep the full ${usd(BASE_INCOME)} for your goals.`,
          'There is no single right answer — only a trade-off. What do you do?',
        ],
        kind: 'trip',
      })
      setPhase('event')
    } else {
      setBalances(currentBalances)
      setMonthInfo(PLAIN_MONTH)
      setEventCard(null)
      setPhase('allocate')
    }
    setMonth(nextMonth)
    setAlloc({ ...ZERO_ALLOC })
    window.scrollTo({ top: 0 })
  }

  function dismissEvent() {
    setEventCard(null)
    setPhase('allocate')
  }

  function chooseTrip(go: boolean) {
    setTripTaken(go)
    if (go) {
      setMonthInfo({
        income: BASE_INCOME,
        minFun: TRIP_COST,
        note: `Trip booked: ${usd(TRIP_COST)} of this month's paycheck is already committed to fun.`,
      })
      setAlloc({ ...ZERO_ALLOC, fun: TRIP_COST })
    } else {
      setMonthInfo(PLAIN_MONTH)
    }
    setEventCard(null)
    setPhase('allocate')
  }

  function confirmMonth() {
    if (remaining !== 0) return
    const nextBalances: Balances = {
      emergency: balances.emergency + alloc.emergency,
      bike: balances.bike + alloc.bike,
      concert: balances.concert + alloc.concert,
      fun: balances.fun + alloc.fun,
    }
    // Snapshot each goal at the end of its deadline month.
    const nextSnapshots = { ...snapshots }
    for (const g of GOALS) {
      if (g.deadline === month) nextSnapshots[g.id] = nextBalances[g.id]
    }
    setSnapshots(nextSnapshots)

    if (month === TOTAL_MONTHS) {
      setBalances(nextBalances)
      setPhase('results')
      window.scrollTo({ top: 0 })
      const score = computeScore(nextSnapshots)
      void saveProgress(studentRef.current, SLUG, {
        status: 'completed',
        score,
        data: {
          snapshots: nextSnapshots,
          repairCoveredByFund,
          tripTaken,
          funTotal: nextBalances.fun,
        },
      })
    } else {
      enterMonth(month + 1, nextBalances)
    }
  }

  function computeScore(snaps: Partial<Record<GoalId, number>>): number {
    let total = 0
    for (const g of GOALS) {
      const saved = snaps[g.id] ?? 0
      total += g.weight * Math.min(1, saved / g.target)
    }
    return Math.round(total)
  }

  function reset() {
    setMonth(1)
    setPhase('allocate')
    setBalances({ ...ZERO_ALLOC })
    setAlloc({ ...ZERO_ALLOC })
    setMonthInfo(PLAIN_MONTH)
    setEventCard(null)
    setRepairCoveredByFund(null)
    setTripTaken(null)
    setSnapshots({})
    window.scrollTo({ top: 0 })
  }

  // ---------- Shared: goal progress cards ----------

  function goalCards() {
    return (
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {GOALS.map((g) => {
          const saved = balances[g.id]
          const pct = Math.min(100, Math.round((saved / g.target) * 100))
          const reached = saved >= g.target
          const missed = !reached && month > g.deadline
          return (
            <div key={g.id} className="card p-4">
              <p className="text-sm font-semibold text-slate-800">
                <span className="mr-1" aria-hidden="true">{g.emoji}</span>
                {g.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {usd(g.target)} by month {g.deadline}
              </p>
              <div
                className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={g.target}
                aria-valuenow={Math.min(saved, g.target)}
                aria-label={`${g.label}: ${usd(saved)} of ${usd(g.target)} saved`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    reached ? 'bg-green-500' : missed ? 'bg-red-400' : 'bg-bff-600'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-display text-sm font-bold text-bff-700">{usd(saved)}</p>
                <span
                  className={`chip ${
                    reached
                      ? 'bg-green-100 text-green-800'
                      : missed
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {reached ? (
                    <>
                      Reached <span aria-hidden="true">✅</span>
                    </>
                  ) : missed ? (
                    <>
                      Deadline passed <span aria-hidden="true">⏰</span>
                    </>
                  ) : (
                    'Saving'
                  )}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // ---------- Results view ----------
  if (phase === 'results') {
    const score = computeScore(snapshots)
    const tier = tierFor(score)
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          <span aria-hidden="true">🎯</span> Goal Getter{' '}
          <span aria-hidden="true">💰</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Six months are up. Did your plan hold?</p>

        <div className="mt-4 space-y-3">
          {GOALS.map((g, i) => {
            const saved = snapshots[g.id] ?? 0
            const hit = saved >= g.target
            return (
              <div
                key={g.id}
                className="card animate-slide-up flex items-start justify-between gap-3 p-4"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    <span className="mr-1" aria-hidden="true">{g.emoji}</span>
                    {g.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Needed {usd(g.target)} by month {g.deadline} · you had {usd(saved)}
                  </p>
                </div>
                <span
                  className={`chip shrink-0 ${hit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}
                >
                  {hit ? (
                    <>
                      Goal hit <span aria-hidden="true">🎉</span>
                    </>
                  ) : (
                    <>
                      {Math.round((saved / g.target) * 100)}% there
                    </>
                  )}
                </span>
              </div>
            )
          })}
        </div>

        <div
          className="card animate-pop-in mt-4 space-y-2 text-center"
          style={{ animationDelay: '0.8s' }}
          role="status"
        >
          <p className="text-5xl" aria-hidden="true">{tier.emoji}</p>
          <h2 className="font-display text-3xl font-bold text-slate-900">{tier.title}</h2>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="text-sm text-slate-600">
            Fun money spent along the way: {usd(balances.fun)}
            {tripTaken ? ' (day trip included!)' : ''} — fun is part of a healthy budget, not the
            enemy.
          </p>
        </div>

        <div
          className="card animate-slide-up mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700"
          style={{ animationDelay: '1s' }}
        >
          <p className="font-display font-bold text-slate-900">
            <span aria-hidden="true">💡</span> The takeaway
          </p>
          <p className="mt-1">
            <strong>Pay yourself first:</strong> move money to your goals the moment you're paid,
            before fun gets a vote.{' '}
            {repairCoveredByFund
              ? `And it worked — when the phone cracked, your emergency fund quietly ate the ${usd(REPAIR_COST)} repair, so your bike and concert savings never felt a thing.`
              : `When the phone cracked, your emergency fund couldn't cover the ${usd(REPAIR_COST)} repair, so it raided your paycheck — with a ${usd(PLAN_FEE)} fee on top. A buffer built in month 1 would have taken that hit for you. That's what emergency funds are for.`}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            Plan again
          </button>
          <Link to="/activities" className="btn-primary">
            More activities
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Event view ----------
  if (phase === 'event' && eventCard) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          <span aria-hidden="true">🎯</span> Goal Getter{' '}
          <span aria-hidden="true">💰</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Month {month} of {TOTAL_MONTHS} — life happens…
        </p>

        <div className="card animate-pop-in mt-4" role="status">
          <p className="text-5xl" aria-hidden="true">{eventCard.emoji}</p>
          <h2 className="mt-2 font-display text-xl font-bold text-slate-900">{eventCard.title}</h2>
          <div className="mt-2 space-y-2 text-sm text-slate-700">
            {eventCard.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          {eventCard.kind === 'trip' ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="btn-primary flex-1" onClick={() => chooseTrip(true)}>
                Go on the trip ({usd(TRIP_COST)} fun)
              </button>
              <button className="btn-secondary flex-1" onClick={() => chooseTrip(false)}>
                Skip it this time
              </button>
            </div>
          ) : (
            <div className="mt-5 text-center">
              <button className="btn-primary w-full sm:w-auto" onClick={dismissEvent}>
                Got it — plan month {month}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ---------- Allocation view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">🎯</span> Goal Getter{' '}
        <span aria-hidden="true">💰</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Month {month} of {TOTAL_MONTHS}
      </p>

      {month === 1 && (
        <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          <p>
            You earn <strong>{usd(BASE_INCOME)} a month</strong> for 6 months, and you've set three
            SMART goals with real deadlines. Each month, split your paycheck between the goals and
            fun in {usd(STEP)} steps. Heads up: life won't sit still for 6 months.
          </p>
        </div>
      )}

      {goalCards()}

      <section className="card mt-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-slate-900">
            <span aria-hidden="true">💵</span> Month {month} paycheck: {usd(monthInfo.income)}
          </h2>
        </div>
        {monthInfo.note && <p className="mt-1 text-xs text-slate-600">{monthInfo.note}</p>}

        <div className="mt-3 space-y-2">
          {BUCKETS.map((b) => {
            const value = alloc[b.id]
            const min = b.id === 'fun' ? monthInfo.minFun : 0
            return (
              <div
                key={b.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5"
              >
                <p className="text-sm font-semibold text-slate-800">
                  <span className="mr-1" aria-hidden="true">{b.emoji}</span>
                  {b.label}
                  {b.id === 'fun' && min > 0 && (
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      (includes the {usd(min)} trip)
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => bump(b.id, -STEP)}
                    disabled={value <= min}
                    aria-label={`Take $20 away from ${b.label}`}
                    className="h-9 w-9 rounded-lg border-2 border-slate-200 bg-white font-display text-lg font-bold text-slate-700 transition hover:border-bff-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span aria-hidden="true">−</span>
                  </button>
                  <p className="w-14 text-center font-display text-sm font-bold text-bff-700">
                    {usd(value)}
                  </p>
                  <button
                    type="button"
                    onClick={() => bump(b.id, STEP)}
                    aria-label={`Put $20 more toward ${b.label}`}
                    className="h-9 w-9 rounded-lg border-2 border-slate-200 bg-white font-display text-lg font-bold text-slate-700 transition hover:border-bff-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <p
          className={`mt-3 text-sm font-semibold ${remaining === 0 ? 'text-green-700' : 'text-slate-600'}`}
          role="status"
          aria-live="polite"
        >
          {remaining === 0
            ? `All ${usd(monthInfo.income)} allocated — lock in month ${month}!`
            : remaining > 0
              ? `${usd(remaining)} left to allocate`
              : ''}
        </p>
        {overAllocated && (
          <p className="mt-1 text-sm font-semibold text-red-600" role="alert">
            You've allocated {usd(-remaining)} more than your {usd(monthInfo.income)} paycheck —
            take some back.
          </p>
        )}

        <div className="mt-4 text-center">
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={confirmMonth}
            disabled={remaining !== 0}
          >
            Confirm month {month}
          </button>
        </div>
      </section>
    </div>
  )
}

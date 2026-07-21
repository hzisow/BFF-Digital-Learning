import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

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
  labelEs: string
  target: number
  deadline: number // must be reached by the END of this month
  weight: number
}

const GOALS: Goal[] = [
  { id: 'emergency', emoji: '🚨', label: 'Emergency fund', labelEs: 'Fondo de emergencia', target: 300, deadline: 6, weight: 40 },
  { id: 'bike', emoji: '🚲', label: 'New bike', labelEs: 'Bicicleta nueva', target: 240, deadline: 4, weight: 35 },
  { id: 'concert', emoji: '🎤', label: 'Concert tickets', labelEs: 'Entradas para el concierto', target: 120, deadline: 3, weight: 25 },
]

const BUCKETS: { id: Bucket; emoji: string; label: string; labelEs: string }[] = [
  ...GOALS.map((g) => ({ id: g.id as Bucket, emoji: g.emoji, label: g.label, labelEs: g.labelEs })),
  { id: 'fun', emoji: '🍿', label: 'Spend on fun', labelEs: 'Gastar en diversión' },
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

function tierFor(score: number, es: boolean): { title: string; emoji: string } {
  if (score >= 90) return { title: es ? 'Cazametas Supremo' : 'Goal Getter Supreme', emoji: '🎯' }
  if (score >= 70) return { title: es ? 'En Buen Camino' : 'On Track', emoji: '🚀' }
  if (score >= 45) return { title: es ? 'Héroe a Medio Camino' : 'Halfway Hero', emoji: '🌗' }
  return { title: es ? 'Primero la Diversión' : 'Fun-First Spender', emoji: '🎢' }
}

function usd(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

// ---------- Component ----------

export default function GoalGetter({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
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
          note: es
            ? `Tu fondo de emergencia pagó la reparación de ${usd(REPAIR_COST)}: el sueldo de este mes queda intacto.`
            : `Your emergency fund paid the ${usd(REPAIR_COST)} repair — this month's paycheck is untouched.`,
        })
        setEventCard({
          emoji: '📱',
          title: es ? 'CRAC. La pantalla de tu teléfono se rompe.' : 'CRACK. Your phone screen shatters.',
          lines: es
            ? [
                `La reparación cuesta ${usd(REPAIR_COST)}.`,
                `Buenas noticias: tu fondo de emergencia tiene ${usd(currentBalances.emergency)}, así que absorbe el golpe. Para eso es exactamente.`,
                `Fondo de emergencia: ${usd(currentBalances.emergency)} → ${usd(currentBalances.emergency - REPAIR_COST)}.`,
              ]
            : [
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
          note: es
            ? `La reparación se llevó ${usd(fromIncome)} directo del sueldo de este mes (incluida una comisión de plan de pagos de ${usd(PLAN_FEE)}).`
            : `The repair took ${usd(fromIncome)} straight out of this month's paycheck (including a ${usd(PLAN_FEE)} payment-plan fee).`,
        })
        setEventCard({
          emoji: '📱',
          title: es ? 'CRAC. La pantalla de tu teléfono se rompe.' : 'CRACK. Your phone screen shatters.',
          lines: es
            ? [
                `La reparación cuesta ${usd(REPAIR_COST)}, pero tu fondo de emergencia solo tiene ${usd(fromFund)}.`,
                fromFund > 0
                  ? `El fondo queda vaciado en $0, y los ${usd(REPAIR_COST - fromFund)} restantes más una comisión de plan de pagos de ${usd(PLAN_FEE)} salen directo del ingreso de este mes.`
                  : `Sin ningún colchón, los ${usd(REPAIR_COST)} completos más una comisión de plan de pagos de ${usd(PLAN_FEE)} salen directo del ingreso de este mes.`,
                `Este mes solo tienes ${usd(BASE_INCOME - fromIncome)} para repartir. Por eso importa "págate a ti primero": un colchón en el mes 1 habría protegido el mes 2.`,
              ]
            : [
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
        note: es
          ? `Bono por cuidar niños: ${usd(WINDFALL)} extra para repartir este mes.`
          : `Babysitting bonus: ${usd(WINDFALL)} extra to allocate this month.`,
      })
      setEventCard({
        emoji: '🍼',
        title: es
          ? `¡Dinero extra! Un fin de semana cuidando niños te deja un bono de ${usd(WINDFALL)}.`
          : `Windfall! A weekend of babysitting pays a ${usd(WINDFALL)} bonus.`,
        lines: es
          ? [
              `Este mes tienes ${usd(BASE_INCOME + WINDFALL)} en lugar de ${usd(BASE_INCOME)}.`,
              'Un dinero extra es una oportunidad para ponerte al día con una meta, o para gastártelo todo en diversión. Tú decides.',
            ]
          : [
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
        title: es
          ? `Tus amigos te invitan a una excursión de un día de ${usd(TRIP_COST)}.`
          : `Your friends invite you on a ${usd(TRIP_COST)} day trip.`,
        lines: es
          ? [
              'Suena genuinamente divertido, y la diversión importa: los presupuestos que no permiten nada de diversión tienden a fracasar.',
              `Ve, y ${usd(TRIP_COST)} del dinero de este mes queda comprometido a diversión antes de repartir el resto. Sáltatela, y conservas los ${usd(BASE_INCOME)} completos para tus metas.`,
              'No hay una única respuesta correcta, solo una decisión con compensaciones. ¿Qué haces?',
            ]
          : [
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
        note: es
          ? `Excursión reservada: ${usd(TRIP_COST)} del sueldo de este mes ya está comprometido a diversión.`
          : `Trip booked: ${usd(TRIP_COST)} of this month's paycheck is already committed to fun.`,
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
      onComplete?.(score)
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
                {es ? g.labelEs : g.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {es ? `${usd(g.target)} para el mes ${g.deadline}` : `${usd(g.target)} by month ${g.deadline}`}
              </p>
              <div
                className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={g.target}
                aria-valuenow={Math.min(saved, g.target)}
                aria-label={
                  es
                    ? `${g.labelEs}: ${usd(saved)} de ${usd(g.target)} ahorrados`
                    : `${g.label}: ${usd(saved)} of ${usd(g.target)} saved`
                }
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
                      {es ? 'Lograda' : 'Reached'} <span aria-hidden="true">✅</span>
                    </>
                  ) : missed ? (
                    <>
                      {es ? 'Plazo vencido' : 'Deadline passed'} <span aria-hidden="true">⏰</span>
                    </>
                  ) : es ? (
                    'Ahorrando'
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
    const tier = tierFor(score, es)
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          <span aria-hidden="true">🎯</span> {es ? 'Cazametas' : 'Goal Getter'}{' '}
          <span aria-hidden="true">💰</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {es ? 'Se acabaron los seis meses. ¿Aguantó tu plan?' : 'Six months are up. Did your plan hold?'}
        </p>

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
                    {es ? g.labelEs : g.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {es
                      ? `Necesitabas ${usd(g.target)} para el mes ${g.deadline} · tenías ${usd(saved)}`
                      : `Needed ${usd(g.target)} by month ${g.deadline} · you had ${usd(saved)}`}
                  </p>
                </div>
                <span
                  className={`chip shrink-0 ${hit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}
                >
                  {hit ? (
                    <>
                      {es ? 'Meta lograda' : 'Goal hit'} <span aria-hidden="true">🎉</span>
                    </>
                  ) : (
                    <>
                      {Math.round((saved / g.target) * 100)}% {es ? 'del camino' : 'there'}
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
            {es ? 'Dinero en diversión a lo largo del camino' : 'Fun money spent along the way'}:{' '}
            {usd(balances.fun)}
            {tripTaken ? (es ? ' (¡excursión incluida!)' : ' (day trip included!)') : ''} —{' '}
            {es
              ? 'la diversión es parte de un presupuesto sano, no el enemigo.'
              : 'fun is part of a healthy budget, not the enemy.'}
          </p>
        </div>

        <div
          className="card animate-slide-up mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700"
          style={{ animationDelay: '1s' }}
        >
          <p className="font-display font-bold text-slate-900">
            <span aria-hidden="true">💡</span> {es ? 'La lección' : 'The takeaway'}
          </p>
          <p className="mt-1">
            <strong>{es ? 'Págate a ti primero:' : 'Pay yourself first:'}</strong>{' '}
            {es
              ? 'mueve dinero a tus metas en cuanto te pagan, antes de que la diversión tenga voto.'
              : "move money to your goals the moment you're paid, before fun gets a vote."}{' '}
            {repairCoveredByFund
              ? es
                ? `Y funcionó: cuando el teléfono se rompió, tu fondo de emergencia se comió sin problema la reparación de ${usd(REPAIR_COST)}, así que tus ahorros para la bici y el concierto ni lo sintieron.`
                : `And it worked — when the phone cracked, your emergency fund quietly ate the ${usd(REPAIR_COST)} repair, so your bike and concert savings never felt a thing.`
              : es
                ? `Cuando el teléfono se rompió, tu fondo de emergencia no pudo cubrir la reparación de ${usd(REPAIR_COST)}, así que asaltó tu sueldo, con una comisión de ${usd(PLAN_FEE)} encima. Un colchón construido en el mes 1 habría absorbido ese golpe por ti. Para eso sirven los fondos de emergencia.`
                : `When the phone cracked, your emergency fund couldn't cover the ${usd(REPAIR_COST)} repair, so it raided your paycheck — with a ${usd(PLAN_FEE)} fee on top. A buffer built in month 1 would have taken that hit for you. That's what emergency funds are for.`}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            {es ? 'Planear de nuevo' : 'Plan again'}
          </button>
          <Link to="/activities" className="btn-primary">
            {es ? 'Más actividades' : 'More activities'}
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
          <span aria-hidden="true">🎯</span> {es ? 'Cazametas' : 'Goal Getter'}{' '}
          <span aria-hidden="true">💰</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {es ? 'Mes' : 'Month'} {month} {es ? 'de' : 'of'} {TOTAL_MONTHS} —{' '}
          {es ? 'la vida pasa…' : 'life happens…'}
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
                {es ? `Ir a la excursión (${usd(TRIP_COST)} en diversión)` : `Go on the trip (${usd(TRIP_COST)} fun)`}
              </button>
              <button className="btn-secondary flex-1" onClick={() => chooseTrip(false)}>
                {es ? 'Saltarla esta vez' : 'Skip it this time'}
              </button>
            </div>
          ) : (
            <div className="mt-5 text-center">
              <button className="btn-primary w-full sm:w-auto" onClick={dismissEvent}>
                {es ? `Entendido — planear el mes ${month}` : `Got it — plan month ${month}`}
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
        <span aria-hidden="true">🎯</span> {es ? 'Cazametas' : 'Goal Getter'}{' '}
        <span aria-hidden="true">💰</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {es ? 'Mes' : 'Month'} {month} {es ? 'de' : 'of'} {TOTAL_MONTHS}
      </p>

      {month === 1 && (
        <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          {es ? (
            <p>
              Ganas <strong>{usd(BASE_INCOME)} al mes</strong> durante 6 meses, y fijaste tres metas
              SMART con plazos reales. Cada mes, reparte tu sueldo entre las metas y la diversión en
              pasos de {usd(STEP)}. Aviso: la vida no se quedará quieta durante 6 meses.
            </p>
          ) : (
            <p>
              You earn <strong>{usd(BASE_INCOME)} a month</strong> for 6 months, and you've set three
              SMART goals with real deadlines. Each month, split your paycheck between the goals and
              fun in {usd(STEP)} steps. Heads up: life won't sit still for 6 months.
            </p>
          )}
        </div>
      )}

      {goalCards()}

      <section className="card mt-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-slate-900">
            <span aria-hidden="true">💵</span>{' '}
            {es
              ? `Sueldo del mes ${month}: ${usd(monthInfo.income)}`
              : `Month ${month} paycheck: ${usd(monthInfo.income)}`}
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
                  {es ? b.labelEs : b.label}
                  {b.id === 'fun' && min > 0 && (
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      {es ? `(incluye la excursión de ${usd(min)})` : `(includes the ${usd(min)} trip)`}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => bump(b.id, -STEP)}
                    disabled={value <= min}
                    aria-label={es ? `Quitar $20 de ${b.labelEs}` : `Take $20 away from ${b.label}`}
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
                    aria-label={es ? `Poner $20 más en ${b.labelEs}` : `Put $20 more toward ${b.label}`}
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
            ? es
              ? `¡Repartiste los ${usd(monthInfo.income)} — confirma el mes ${month}!`
              : `All ${usd(monthInfo.income)} allocated — lock in month ${month}!`
            : remaining > 0
              ? es
                ? `Quedan ${usd(remaining)} por repartir`
                : `${usd(remaining)} left to allocate`
              : ''}
        </p>
        {overAllocated && (
          <p className="mt-1 text-sm font-semibold text-red-600" role="alert">
            {es
              ? `Repartiste ${usd(-remaining)} más que tu sueldo de ${usd(monthInfo.income)} — quita un poco.`
              : `You've allocated ${usd(-remaining)} more than your ${usd(monthInfo.income)} paycheck — take some back.`}
          </p>
        )}

        <div className="mt-4 text-center">
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={confirmMonth}
            disabled={remaining !== 0}
          >
            {es ? `Confirmar el mes ${month}` : `Confirm month ${month}`}
          </button>
        </div>
      </section>
    </div>
  )
}

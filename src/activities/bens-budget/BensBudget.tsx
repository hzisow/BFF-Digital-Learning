import { useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

// ---------- The official numbers (from the BFF of America paper activity) ----------

const INCOME = 3200

interface NeedItem {
  label: string
  labelEs: string
  cost: number
  note?: string
  noteEs?: string
}

const NEEDS: NeedItem[] = [
  { label: 'Rent', labelEs: 'Renta', cost: 1200 },
  { label: 'Groceries', labelEs: 'Comida', cost: 600 },
  { label: 'Water & electricity', labelEs: 'Agua y electricidad', cost: 275, note: 'Winter bill — higher than usual', noteEs: 'Cuenta de invierno — más alta de lo normal' },
  { label: 'Car payment', labelEs: 'Pago del carro', cost: 400 },
  { label: 'Gas', labelEs: 'Gasolina', cost: 175 },
]

const NEEDS_TOTAL = NEEDS.reduce((sum, n) => sum + n.cost, 0)

interface ChoiceItem {
  id: string
  emoji: string
  label: string
  labelEs: string
  cost: number
  note: string
  noteEs: string
}

const CHOICES: ChoiceItem[] = [
  {
    id: 'credit-card',
    emoji: '💳',
    label: 'Credit card minimum payment',
    labelEs: 'Pago mínimo de la tarjeta de crédito',
    cost: 30,
    note: 'He owes $300 total',
    noteEs: 'Debe $300 en total',
  },
  {
    id: 'allergy-meds',
    emoji: '🤧',
    label: "Daughter's allergy medicine",
    labelEs: 'Medicina para la alergia de su hija',
    cost: 45,
    note: 'Symptoms are mild… for now',
    noteEs: 'Los síntomas son leves… por ahora',
  },
  {
    id: 'guitar',
    emoji: '🎸',
    label: "Son's optional guitar lesson",
    labelEs: 'Clase opcional de guitarra de su hijo',
    cost: 50,
    note: 'Concert in two months',
    noteEs: 'Concierto en dos meses',
  },
  {
    id: 'heater',
    emoji: '🔧',
    label: 'Car heater repair',
    labelEs: 'Reparación de la calefacción del carro',
    cost: 150,
    note: 'Car runs, but the mornings are freezing',
    noteEs: 'El carro funciona, pero las mañanas son heladas',
  },
  {
    id: 'iguana',
    emoji: '🦎',
    label: 'Pet iguana',
    labelEs: 'Iguana de mascota',
    cost: 90,
    note: 'All the kids want it, mom is fine with it',
    noteEs: 'Todos los niños la quieren y a mamá le parece bien',
  },
  {
    id: 'soccer',
    emoji: '⚽',
    label: 'Soccer registration (13-year-old)',
    labelEs: 'Inscripción de fútbol (el de 13 años)',
    cost: 100,
    note: 'The fee went up this year',
    noteEs: 'La cuota subió este año',
  },
  {
    id: 'sneakers',
    emoji: '👟',
    label: 'New sneakers (9-year-old)',
    labelEs: 'Tenis nuevos (el de 9 años)',
    cost: 75,
    note: 'Current pair is falling apart',
    noteEs: 'El par actual se está cayendo a pedazos',
  },
  {
    id: 'supplies',
    emoji: '✏️',
    label: "Classroom supplies for Ben's school",
    labelEs: 'Útiles para el salón de la escuela de Ben',
    cost: 25,
    note: 'Teachers often cover these themselves',
    noteEs: 'Muchas veces los maestros los pagan de su bolsillo',
  },
  {
    id: 'dinner',
    emoji: '🍝',
    label: 'Family dinner out',
    labelEs: 'Cena en familia fuera de casa',
    cost: 65,
    note: 'A night off from cooking',
    noteEs: 'Una noche sin cocinar',
  },
  {
    id: 'chipotle',
    emoji: '🌯',
    label: 'Chipotle on the way home',
    labelEs: 'Chipotle camino a casa',
    cost: 35,
    note: 'Just Ben. Just a burrito.',
    noteEs: 'Solo Ben. Solo un burrito.',
  },
]

type SavingsAmount = 300 | 200 | 0

const SAVINGS_OPTIONS: { value: SavingsAmount; label: string; labelEs: string; note: string; noteEs: string }[] = [
  {
    value: 200,
    label: 'Save $200 for the beach trip',
    labelEs: 'Ahorrar $200 para el viaje a la playa',
    note: "This month's goal — keeps the trip on track",
    noteEs: 'La meta de este mes — mantiene el viaje en marcha',
  },
  {
    value: 300,
    label: 'Save $300',
    labelEs: 'Ahorrar $300',
    note: 'Adds the theme park trip!',
    noteEs: '¡Agrega el viaje al parque de diversiones!',
  },
  {
    value: 0,
    label: 'Save nothing',
    labelEs: 'No ahorrar nada',
    note: 'The beach can wait… right?',
    noteEs: 'La playa puede esperar… ¿verdad?',
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

function computeResults(picked: ReadonlySet<string>, saved: SavingsAmount, es: boolean): Results {
  const has = (id: string) => picked.has(id)
  const lines: FeedbackLine[] = []

  // Savings
  if (saved === 300) {
    lines.push({ points: 25, text: es ? 'Viaje a la playa Y parque de diversiones asegurados — los niños están felices.' : 'Beach trip AND theme park secured — the kids are thrilled.', tone: 'good' })
  } else if (saved === 200) {
    lines.push({ points: 18, text: es ? 'Viaje a la playa en marcha (sin parque de diversiones, pero el mar es gratis).' : 'Beach trip on track (no theme park, but the ocean is free).', tone: 'good' })
  } else {
    lines.push({ points: 0, text: es ? 'El viaje a la playa se escapa este mes…' : 'The beach trip slips away this month…', tone: 'warn' })
  }

  // Credit card minimum
  if (has('credit-card')) {
    lines.push({ points: 15, text: es ? 'Evitaste recargos por mora y protegiste el puntaje de crédito de Ben.' : "You avoided late fees and protected Ben's credit score.", tone: 'good' })
  } else {
    lines.push({
      points: 0,
      text: es
        ? 'Pago mínimo no realizado → recargo por mora + daño al puntaje de crédito. Este sale caro después.'
        : "Missed minimum payment → late fee + credit score damage. This one's expensive later.",
      tone: 'warn',
    })
  }

  // Heater
  if (has('heater')) {
    lines.push({ points: 10, text: es ? 'Calefacción arreglada antes de que se convierta en un problema de $400 — inteligente.' : 'Heater fixed before it becomes a $400 problem — smart.', tone: 'good' })
  } else {
    lines.push({ points: 5, text: es ? 'Saltarse la calefacción es arriesgado, pero se puede sobrevivir — ¿las mañanas frías forjan el carácter?' : 'Skipping the heater is risky, but survivable — cold mornings build character?', tone: 'neutral' })
  }

  // Sneakers
  if (has('sneakers')) {
    lines.push({ points: 8, text: es ? 'Los zapatos rotos se estaban convirtiendo en una necesidad, no en un deseo.' : 'Falling-apart shoes were becoming a need, not a want.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: es ? 'Los tenis del de 9 años aguantan otro mes más. La cinta adhesiva es un estilo de moda, ¿no?' : "The 9-year-old's sneakers flap on for another month. Duct tape is a fashion statement, right?", tone: 'neutral' })
  }

  // Soccer
  if (has('soccer')) {
    lines.push({ points: 8, text: es ? 'El de 13 años se queda en el equipo — compromiso cumplido.' : 'The 13-year-old stays on the team — commitment honored.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: es ? 'Saltarse el fútbol duele — es una conversación difícil en la mesa para Ben.' : "Skipping soccer stings — that's a hard dinner-table conversation for Ben.", tone: 'neutral' })
  }

  // Allergy meds — judgment call either way
  if (has('allergy-meds')) {
    lines.push({ points: 6, text: es ? 'Los síntomas son leves, pero adelantarse a las alergias de primavera es una decisión razonable.' : 'Symptoms are mild, but staying ahead of spring allergies is a fair call.', tone: 'good' })
  } else {
    lines.push({ points: 6, text: es ? 'Con síntomas leves, esperar con la medicina es una decisión válida — solo mantenla vigilada.' : 'With mild symptoms, waiting on the meds is a real judgment call — just keep an eye on her.', tone: 'neutral' })
  }

  // Guitar
  if (has('guitar')) {
    lines.push({ points: 5, text: es ? 'Clase de guitarra reservada — la preparación para el concierto sigue en marcha.' : 'Guitar lesson booked — concert prep stays on track.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: es ? 'Sin clase este mes — puede practicar en casa hasta el concierto.' : 'No lesson this month — he can practice at home till the concert.', tone: 'neutral' })
  }

  // Classroom supplies
  if (has('supplies')) {
    lines.push({ points: 5, text: es ? 'Útiles del salón cubiertos — los estudiantes de Ben (y Ben) lo agradecen.' : "Classroom supplies covered — Ben's students (and Ben) say thanks.", tone: 'good' })
  } else {
    lines.push({ points: 0, text: es ? 'El salón se las arregla este mes.' : 'The classroom makes do this month.', tone: 'neutral' })
  }

  // Dinner out
  if (has('dinner')) {
    lines.push({ points: 3, text: es ? 'Cena en familia fuera — el tiempo en familia importa.' : 'Family dinner out — family time matters.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: es ? 'Comida casera será — el fondo de la playa lo agradece.' : 'Home-cooked it is — the beach fund thanks you.', tone: 'neutral' })
  }

  // Chipotle
  if (has('chipotle')) {
    lines.push({ points: 2, text: es ? 'Chipotle adquirido. ¡Pequeñas alegrías!' : 'Chipotle acquired. Small joys!', tone: 'good' })
  } else {
    lines.push({ points: 0, text: es ? 'El burrito que se escapó.' : 'The burrito that got away.', tone: 'neutral' })
  }

  // Iguana
  if (has('iguana')) {
    lines.push({ points: 0, text: es ? 'La iguana se une a la familia. Presagio: las iguanas complican los seguros.' : 'The iguana joins the family. Foreshadowing: iguanas complicate insurance.', tone: 'neutral' })
  } else {
    lines.push({ points: 5, text: es ? 'Una mascota de $90/mes en un mes ajustado — sabio dejarla pasar.' : 'A $90/month pet on a tight month — wise pass.', tone: 'good' })
  }

  // Under budget (submit is blocked while over, so this always lands)
  const choicesTotal = CHOICES.reduce((sum, c) => sum + (has(c.id) ? c.cost : 0), 0)
  const spent = NEEDS_TOTAL + choicesTotal + saved
  if (spent <= INCOME) {
    lines.push({ points: 10, text: es ? 'Te mantuviste bajo los $3,200 — el presupuesto de Ben realmente cuadra.' : "Stayed under $3,200 — Ben's budget actually balances.", tone: 'good' })
  }

  const score = Math.min(100, lines.reduce((sum, l) => sum + l.points, 0))
  const [grade, gradeEmoji] =
    score >= 85
      ? [es ? 'Jefe del Presupuesto' : 'Budget Boss', '👑']
      : score >= 65
        ? [es ? 'Administrador de Dinero' : 'Money Manager', '💪']
        : score >= 40
          ? [es ? 'Aprendiendo el Oficio' : 'Learning the Ropes', '🧗']
          : [es ? 'De Vuelta a la Mesa de Dibujo' : 'Back to the Drawing Board', '📝']

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

export default function BensBudget({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
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
    const r = computeResults(picked, saved, es)
    setResults(r)
    window.scrollTo({ top: 0 })
    void saveProgress(student, 'bens-budget', {
      status: 'completed',
      score: r.score,
      data: { choices: [...picked], saved },
    })
    onComplete?.(r.score)
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
        <div className="card animate-pop-in space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{results.gradeEmoji}</p>
          <h1 className="font-display text-3xl font-bold text-slate-900">{results.grade}</h1>
          <p className="font-display text-lg font-bold text-bff-700">{results.score} / 100</p>
          <div className="mx-auto flex max-w-md flex-wrap justify-center gap-2 text-sm">
            <span className="chip bg-slate-100 text-slate-700">
              {es ? 'Gastado' : 'Spent'} {usd(results.spent - results.saved)} {es ? 'de' : 'of'} {usd(INCOME)}
            </span>
            <span className="chip bg-bff-50 text-bff-700">{es ? 'Ahorrado' : 'Saved'} {usd(results.saved)}</span>
            <span className="chip bg-slate-100 text-slate-700">{es ? 'Sobrante' : 'Left over'} {usd(leftover)}</span>
          </div>
        </div>

        <div className="card mt-4 space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900">{es ? 'Cómo le fue a Ben este mes' : "How Ben's month played out"}</h2>
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
          <h2 className="font-display text-lg font-bold text-slate-900">
            <span aria-hidden="true">🗣️</span> {es ? 'Reflexión' : 'Reflection'}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {es ? 'Prepárate para explicar qué conservaste, qué recortaste y por qué.' : 'Be ready to explain what you kept, what you cut, and why.'}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>{es ? '¿Cuál recorte fue el más difícil de hacer, y qué lo hizo difícil?' : 'Which cut was the hardest to make, and what made it hard?'}</li>
            <li>
              {es
                ? 'Los tenis empezaron como un "deseo" y se fueron acercando a una "necesidad". ¿Qué más en la lista de Ben podría cambiar de categoría con el tiempo?'
                : 'The sneakers started as a "want" and drifted toward a "need." What else on Ben\'s list could switch categories over time?'}
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            {es ? 'Intentar de nuevo' : 'Try again'}
          </button>
          <Link to="/challenge/bens-insurance" className="btn-primary">
            {es ? 'Parte 2: Ben necesita un seguro →' : 'Part 2: Ben needs insurance →'}
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Builder view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">💸</span> {es ? 'El Reto del Presupuesto de Ben' : "Ben's Budget Challenge"}
      </h1>
      <p className="mt-1 text-sm text-slate-500">{es ? 'Parte 1 de la aventura financiera de Ben' : "Part 1 of Ben's money adventure"}</p>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        {es ? (
          <p>
            Te presentamos a <strong>Ben</strong>: 36 años, maestro de ciencias de secundaria, casado, tres
            hijos (de 5, 9 y 13 años). Después de impuestos, le llegan <strong>{usd(INCOME)}</strong> a su
            cuenta cada mes. El sueño de la familia: un <strong>viaje a la playa en 3 meses</strong>, lo que
            significa ahorrar <strong>$900 en total — $300 este mes</strong>. Tu trabajo: decidir a dónde va
            cada dólar.
          </p>
        ) : (
          <p>
            Meet <strong>Ben</strong>: 36, middle school science teacher, married, three kids (ages 5,
            9, and 13). After taxes, <strong>{usd(INCOME)}</strong> lands in his account each month.
            The family dream: a <strong>beach trip in 3 months</strong>, which means saving{' '}
            <strong>$900 total — $300 this month</strong>. Your job: decide where every dollar goes.
          </p>
        )}
        <p className="mt-2 text-xs text-slate-600">
          <span aria-hidden="true">ℹ️</span>{' '}
          {es
            ? `El seguro médico ($300/mes) ya se descuenta del cheque de Ben — está resuelto y no cuenta contra los ${usd(INCOME)}.`
            : `Health insurance ($300/month) is already deducted from Ben's paycheck — it's handled and doesn't count against the ${usd(INCOME)}.`}
        </p>
      </div>

      {/* Needs */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">
          {es ? 'Las necesidades' : 'The needs'} <span className="text-sm font-normal text-slate-500">{es ? '(fijas — Ben no puede saltárselas)' : "(locked in — Ben can't skip these)"}</span>
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
                  <p className="text-sm font-semibold text-slate-600">{es ? n.labelEs : n.label}</p>
                  {n.note && <p className="text-xs text-slate-600">{es ? n.noteEs : n.note}</p>}
                </div>
              </div>
              <p className="font-display text-sm font-bold text-slate-600">{usd(n.cost)}</p>
            </div>
          ))}
          <p className="text-right text-xs font-semibold text-slate-500">
            {es ? 'Total de necesidades:' : 'Needs total:'} {usd(NEEDS_TOTAL)}
          </p>
        </div>
      </section>

      {/* Running budget bar */}
      <section className="card mt-6 p-4">
        <div className="flex items-center justify-between text-sm" aria-live="polite">
          <p className="font-display font-bold text-slate-900">
            {usd(spent)} <span className="font-normal text-slate-500">{es ? 'de' : 'of'} {usd(INCOME)}</span>
          </p>
          <p className={`font-display font-bold ${overBudget ? 'text-red-600' : 'text-green-700'}`}>
            {overBudget ? (es ? `¡${usd(-remaining)} sobre el presupuesto!` : `${usd(-remaining)} over budget!`) : (es ? `${usd(remaining)} restantes` : `${usd(remaining)} left`)}
          </p>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={INCOME}
          aria-valuenow={Math.min(spent, INCOME)}
          aria-label={es ? `Presupuesto usado: ${usd(spent)} de ${usd(INCOME)}` : `Budget used: ${usd(spent)} of ${usd(INCOME)}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-300 ${overBudget ? 'bg-red-500' : 'bg-bff-600'}`}
            style={{ width: `${Math.min(100, (spent / INCOME) * 100)}%` }}
          />
        </div>
      </section>

      {/* Choices */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">
          {es ? 'Las opciones' : 'The choices'} <span className="text-sm font-normal text-slate-500">{es ? '(toca para conservar o recortar)' : '(tap to keep or cut)'}</span>
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
                    <span className="mr-1" aria-hidden="true">{c.emoji}</span>
                    {es ? c.labelEs : c.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">{es ? c.noteEs : c.note}</p>
                </div>
                <div className="text-right">
                  <p className={`font-display text-sm font-bold ${on ? 'text-bff-700' : 'text-slate-500'}`}>
                    {usd(c.cost)}
                  </p>
                  <p className={`text-xs font-semibold ${on ? 'text-bff-700' : 'text-slate-500'}`}>
                    {on ? (
                      <>
                        {es ? 'Comprando' : 'Buying'} <span aria-hidden="true">✓</span>
                      </>
                    ) : (
                      es ? 'Omitido' : 'Skipped'
                    )}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Savings */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">
          <span aria-hidden="true">🏖️</span> {es ? 'El fondo para la playa' : 'The beach fund'}
        </h2>
        <div className="mt-2 space-y-2" role="radiogroup" aria-label={es ? 'Elección de ahorro' : 'Savings choice'}>
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
                    <p className="text-sm font-semibold text-slate-800">{es ? opt.labelEs : opt.label}</p>
                    <p className="text-xs text-slate-600">{es ? opt.noteEs : opt.note}</p>
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
          {es ? 'Confirmar el presupuesto de Ben' : "Lock in Ben's budget"}
        </button>
        {overBudget && (
          <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
            {es
              ? `Ben está ${usd(-remaining)} sobre el presupuesto — recorta algo antes de confirmar.`
              : `Ben is ${usd(-remaining)} over budget — cut something before locking in.`}
          </p>
        )}
        {!overBudget && saved === null && (
          <p className="mt-2 text-sm text-slate-500">{es ? 'Elige una opción del fondo para la playa para terminar.' : 'Pick a beach fund option to finish.'}</p>
        )}
      </div>
    </div>
  )
}

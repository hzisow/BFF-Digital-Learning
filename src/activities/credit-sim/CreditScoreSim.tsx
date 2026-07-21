import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

// ---------- Score bands (standard FICO ranges) ----------

const SCORE_MIN = 300
const SCORE_MAX = 850
const START_SCORE = 630

interface Band {
  name: string
  nameEs: string
  min: number
  max: number
  barClass: string
  chipClass: string
}

const BANDS: Band[] = [
  { name: 'Poor', nameEs: 'Malo', min: 300, max: 579, barClass: 'bg-red-400', chipClass: 'bg-red-100 text-red-700' },
  { name: 'Fair', nameEs: 'Regular', min: 580, max: 669, barClass: 'bg-amber-400', chipClass: 'bg-amber-100 text-amber-700' },
  { name: 'Good', nameEs: 'Bueno', min: 670, max: 739, barClass: 'bg-lime-400', chipClass: 'bg-lime-100 text-lime-800' },
  { name: 'Very Good', nameEs: 'Muy bueno', min: 740, max: 799, barClass: 'bg-green-400', chipClass: 'bg-green-100 text-green-700' },
  { name: 'Exceptional', nameEs: 'Excepcional', min: 800, max: 850, barClass: 'bg-green-600', chipClass: 'bg-green-100 text-green-800' },
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

const FACTORS_ES: Record<Factor, string> = {
  payment: 'Historial de pagos · 35%',
  utilization: 'Uso del crédito · 30%',
  length: 'Antigüedad del historial · 15%',
  new: 'Crédito nuevo · 10%',
  mix: 'Variedad de crédito · 10%',
}

// ---------- The 10 months ----------

interface Choice {
  id: string
  label: string
  labelEs: string
  delta: number
  explanation: string
  explanationEs: string
  factors: Factor[]
}

interface MonthCard {
  emoji: string
  title: string
  titleEs: string
  scenario: string
  scenarioEs: string
  choices: Choice[]
}

const MONTHS: MonthCard[] = [
  {
    emoji: '💌',
    title: 'The first bill',
    titleEs: 'La primera factura',
    scenario:
      'Your first credit card statement lands: $85 balance, minimum due $25. Meanwhile, concert tickets for Friday just dropped and they are NOT cheap.',
    scenarioEs:
      'Llega el primer estado de cuenta de tu tarjeta de crédito: saldo de $85, pago mínimo $25. Mientras tanto, salieron las entradas para el concierto del viernes y NO son baratas.',
    choices: [
      {
        id: 'pay-full',
        label: 'Pay the $85 in full',
        labelEs: 'Pagar los $85 completos',
        delta: 15,
        explanation:
          'On time and in full. Payment history is the single biggest slice of your score, and a $0 carried balance keeps your utilization low too.',
        explanationEs:
          'A tiempo y completo. El historial de pagos es la parte más importante de tu puntaje, y no arrastrar saldo mantiene bajo tu uso del crédito.',
        factors: ['payment', 'utilization'],
      },
      {
        id: 'pay-min',
        label: 'Pay the $25 minimum',
        labelEs: 'Pagar el mínimo de $25',
        delta: 5,
        explanation:
          "Still on time — that's what payment history records — but the leftover $60 rolls over and starts collecting interest at around 24% APR.",
        explanationEs:
          'Sigue siendo a tiempo —eso es lo que registra el historial de pagos—, pero los $60 restantes se arrastran y empiezan a generar intereses de alrededor del 24% anual.',
        factors: ['payment'],
      },
      {
        id: 'skip',
        label: 'Skip it — tickets first',
        labelEs: 'Saltártelo: primero las entradas',
        delta: -85,
        explanation:
          'The payment goes 30+ days late and hits your credit report. One late mark is the biggest single hit your score can take, and it can stick around for up to 7 years.',
        explanationEs:
          'El pago se atrasa más de 30 días y queda en tu reporte de crédito. Una sola marca de atraso es el mayor golpe que puede recibir tu puntaje, y puede quedarse hasta 7 años.',
        factors: ['payment'],
      },
    ],
  },
  {
    emoji: '🛍️',
    title: 'The checkout counter',
    titleEs: 'La caja registradora',
    scenario:
      'A clothing store offers 20% off your whole purchase today if you open their store credit card. The cashier is waiting.',
    scenarioEs:
      'Una tienda de ropa te ofrece hoy un 20% de descuento en toda tu compra si abres su tarjeta de crédito de la tienda. El cajero está esperando.',
    choices: [
      {
        id: 'decline',
        label: 'No thanks — just the hoodie',
        labelEs: 'No gracias, solo la sudadera',
        delta: 5,
        explanation:
          'No hard inquiry, no brand-new account. Your existing accounts quietly get older, which slowly helps your score.',
        explanationEs:
          'Sin consulta dura ni cuenta nueva. Tus cuentas actuales van ganando antigüedad, lo que poco a poco ayuda a tu puntaje.',
        factors: ['new', 'length'],
      },
      {
        id: 'open',
        label: 'Open the card for the discount',
        labelEs: 'Abrir la tarjeta por el descuento',
        delta: -10,
        explanation:
          'A hard inquiry plus a brand-new account lowers your average account age. That 20% off cost more than it saved.',
        explanationEs:
          'Una consulta dura más una cuenta nueva baja la antigüedad promedio de tus cuentas. Ese 20% de descuento costó más de lo que ahorró.',
        factors: ['new', 'length'],
      },
      {
        id: 'open-max',
        label: 'Open it AND buy the whole cart',
        labelEs: 'Abrirla Y comprar todo el carrito',
        delta: -30,
        explanation:
          'An inquiry, a new account, and a nearly maxed-out card all at once. High utilization on any card is a classic red flag.',
        explanationEs:
          'Una consulta, una cuenta nueva y una tarjeta casi al tope, todo de una vez. El uso alto en cualquier tarjeta es una señal de alerta clásica.',
        factors: ['new', 'utilization'],
      },
    ],
  },
  {
    emoji: '📈',
    title: 'Limit raised',
    titleEs: 'Subió el límite',
    scenario:
      'Good news from your card company: your credit limit just doubled from $500 to $1,000. What changes?',
    scenarioEs:
      'Buenas noticias de tu compañía de tarjeta: tu límite de crédito acaba de duplicarse de $500 a $1,000. ¿Qué cambia?',
    choices: [
      {
        id: 'same-spend',
        label: 'Keep spending like before',
        labelEs: 'Seguir gastando como antes',
        delta: 20,
        explanation:
          'Same spending on double the limit cuts your utilization roughly in half. Under 30% is the healthy zone; under 10% is elite.',
        explanationEs:
          'El mismo gasto con el doble de límite reduce tu uso del crédito casi a la mitad. Menos del 30% es la zona sana; menos del 10% es de élite.',
        factors: ['utilization'],
      },
      {
        id: 'max-it',
        label: 'New limit, new lifestyle',
        labelEs: 'Nuevo límite, nuevo estilo de vida',
        delta: -30,
        explanation:
          "Spending up to the new limit pushes utilization near 100% — the classic 'maxed out' signal lenders hate.",
        explanationEs:
          'Gastar hasta el nuevo límite lleva tu uso del crédito cerca del 100%: la clásica señal de "tarjeta al tope" que los prestamistas odian.',
        factors: ['utilization'],
      },
    ],
  },
  {
    emoji: '🗃️',
    title: 'The forgotten card',
    titleEs: 'La tarjeta olvidada',
    scenario:
      "Your very first card has been sitting unused in a drawer for months. It feels useless. Close it?",
    scenarioEs:
      'Tu primera tarjeta lleva meses sin usar, guardada en un cajón. Parece inútil. ¿La cierras?',
    choices: [
      {
        id: 'keep-open',
        label: 'Keep it open with one small autopaid subscription',
        labelEs: 'Mantenerla abierta con una suscripción pequeña de pago automático',
        delta: 10,
        explanation:
          'Your oldest account keeps aging, and its limit keeps your overall utilization low. Old cards are quiet MVPs.',
        explanationEs:
          'Tu cuenta más antigua sigue ganando antigüedad, y su límite mantiene bajo tu uso total del crédito. Las tarjetas viejas son héroes silenciosos.',
        factors: ['length', 'utilization'],
      },
      {
        id: 'close-it',
        label: 'Close it — feels tidy',
        labelEs: 'Cerrarla: se siente ordenado',
        delta: -20,
        explanation:
          'Closing your oldest card shrinks your available credit (utilization jumps) and will eventually shorten your credit history.',
        explanationEs:
          'Cerrar tu tarjeta más antigua reduce tu crédito disponible (el uso sube) y con el tiempo acorta tu historial de crédito.',
        factors: ['length', 'utilization'],
      },
    ],
  },
  {
    emoji: '🤝',
    title: 'The co-sign ask',
    titleEs: 'La petición de ser aval',
    scenario:
      "Your friend can't get approved for a phone financing plan and asks you to co-sign. \"You won't have to pay anything, promise!\"",
    scenarioEs:
      'A tu amigo no le aprueban un plan de financiamiento para un teléfono y te pide que seas su aval. "¡No tendrás que pagar nada, te lo prometo!"',
    choices: [
      {
        id: 'decline-cosign',
        label: 'Offer moral support instead',
        labelEs: 'Ofrecer apoyo moral en su lugar',
        delta: 5,
        explanation:
          "Co-signing makes their debt legally YOUR debt. Saying no protects your payment history from someone else's forgetfulness.",
        explanationEs:
          'Ser aval convierte su deuda legalmente en TU deuda. Decir que no protege tu historial de pagos de los olvidos de otra persona.',
        factors: ['payment'],
      },
      {
        id: 'cosign',
        label: 'Co-sign — what could go wrong?',
        labelEs: 'Ser aval: ¿qué podría salir mal?',
        delta: -25,
        explanation:
          "A hard inquiry, plus the whole loan lands on YOUR report. When your friend pays late next month, that late mark is yours too.",
        explanationEs:
          'Una consulta dura, y además todo el préstamo queda en TU reporte. Cuando tu amigo pague tarde el próximo mes, esa marca de atraso también es tuya.',
        factors: ['payment', 'new'],
      },
    ],
  },
  {
    emoji: '⏰',
    title: 'Autopilot',
    titleEs: 'Piloto automático',
    scenario: "School, practice, work — life is getting busy. Set up autopay on your card?",
    scenarioEs:
      'Escuela, entrenamiento, trabajo: la vida se está poniendo ocupada. ¿Configuras el pago automático en tu tarjeta?',
    choices: [
      {
        id: 'auto-full',
        label: 'Autopay the full balance',
        labelEs: 'Pago automático del saldo completo',
        delta: 15,
        explanation:
          "You can't be late if the robot pays. A perfect payment history builds itself while you sleep.",
        explanationEs:
          'No puedes atrasarte si el robot paga. Un historial de pagos perfecto se construye solo mientras duermes.',
        factors: ['payment'],
      },
      {
        id: 'auto-min',
        label: 'Autopay the minimum, pay extra manually',
        labelEs: 'Pago automático del mínimo, y pagar extra a mano',
        delta: 8,
        explanation:
          'A late payment is now impossible — solid. Just remember that carrying a balance still costs interest.',
        explanationEs:
          'Ahora es imposible atrasarte: muy bien. Solo recuerda que arrastrar un saldo igual cuesta intereses.',
        factors: ['payment'],
      },
      {
        id: 'no-auto',
        label: "Nah, I'll just remember",
        labelEs: 'Nah, me acordaré solo',
        delta: 0,
        explanation:
          'You remembered… 3 days late. Under 30 days late never reaches your credit report, so your score survives — but you paid a $30 late fee. Living dangerously.',
        explanationEs:
          'Te acordaste… 3 días tarde. Un atraso de menos de 30 días nunca llega a tu reporte de crédito, así que tu puntaje sobrevive, pero pagaste una multa de $30 por atraso. Viviendo al límite.',
        factors: ['payment'],
      },
    ],
  },
  {
    emoji: '🔎',
    title: 'The free checkup',
    titleEs: 'La revisión gratis',
    scenario:
      'You can pull your full credit report for free at AnnualCreditReport.com. Worth the 10 minutes?',
    scenarioEs:
      'Puedes obtener tu reporte de crédito completo gratis en AnnualCreditReport.com. ¿Vale los 10 minutos?',
    choices: [
      {
        id: 'check-report',
        label: 'Check it',
        labelEs: 'Revisarlo',
        delta: 10,
        explanation:
          "Checking your OWN report is a soft inquiry — zero harm, ever. Good thing too: you find a card you never opened, dispute it, and it's removed.",
        explanationEs:
          'Revisar TU PROPIO reporte es una consulta blanda: nunca hace daño. Y menos mal: encuentras una tarjeta que nunca abriste, la disputas y la eliminan.',
        factors: ['payment', 'new'],
      },
      {
        id: 'skip-report',
        label: 'Sounds boring',
        labelEs: 'Suena aburrido',
        delta: 0,
        explanation:
          'Nothing changes today — but about 1 in 4 credit reports contains an error, and errors you never see can quietly drag your score for years.',
        explanationEs:
          'Hoy no cambia nada, pero cerca de 1 de cada 4 reportes de crédito tiene un error, y los errores que nunca ves pueden arrastrar tu puntaje durante años sin que te des cuenta.',
        factors: [],
      },
    ],
  },
  {
    emoji: '💻',
    title: 'The laptop',
    titleEs: 'La laptop',
    scenario: 'Your dream gaming laptop is $900. Your card limit is $1,000. It is ON SALE.',
    scenarioEs:
      'La laptop gamer de tus sueños cuesta $900. El límite de tu tarjeta es $1,000. Está EN OFERTA.',
    choices: [
      {
        id: 'save-up',
        label: 'Save cash for 3 more months',
        labelEs: 'Ahorrar en efectivo 3 meses más',
        delta: 10,
        explanation:
          'Utilization stays low, zero interest paid, on-time streak continues. The laptop will still exist in October.',
        explanationEs:
          'El uso del crédito se mantiene bajo, cero intereses pagados y tu racha de pagos a tiempo continúa. La laptop seguirá existiendo en octubre.',
        factors: ['utilization'],
      },
      {
        id: 'charge-it',
        label: "Charge it, pay it off 'eventually'",
        labelEs: 'Cargarla a la tarjeta y pagarla "algún día"',
        delta: -25,
        explanation:
          'A $900 balance on a $1,000 limit means 90% utilization gets reported this month. Lenders read that as maxed out.',
        explanationEs:
          'Un saldo de $900 con un límite de $1,000 significa que este mes se reporta un 90% de uso. Los prestamistas lo leen como tarjeta al tope.',
        factors: ['utilization'],
      },
      {
        id: 'bnpl',
        label: "Split it into 4 'easy' payments",
        labelEs: 'Dividirla en 4 pagos "fáciles"',
        delta: -5,
        explanation:
          'Buy-now-pay-later plans increasingly show up on credit reports — and a missed installment hurts just like a missed card payment.',
        explanationEs:
          'Los planes de "compra ahora, paga después" aparecen cada vez más en los reportes de crédito, y una cuota no pagada duele igual que un pago de tarjeta no hecho.',
        factors: ['new', 'payment'],
      },
    ],
  },
  {
    emoji: '🧱',
    title: 'Builder move',
    titleEs: 'Jugada para construir crédito',
    scenario:
      'Your credit union offers a $300 credit-builder loan: pay $25/month for a year, get the money back at the end, payments reported to the bureaus.',
    scenarioEs:
      'Tu cooperativa de crédito ofrece un préstamo para construir crédito de $300: pagas $25 al mes durante un año, recibes el dinero de vuelta al final y los pagos se reportan a los burós de crédito.',
    choices: [
      {
        id: 'builder-loan',
        label: 'Take the builder loan',
        labelEs: 'Tomar el préstamo para construir crédito',
        delta: 10,
        explanation:
          'An installment loan next to your revolving card improves your credit mix, and every on-time payment feeds the biggest factor of all.',
        explanationEs:
          'Un préstamo a plazos junto a tu tarjeta rotativa mejora la variedad de tu crédito, y cada pago a tiempo alimenta el factor más importante de todos.',
        factors: ['mix', 'payment'],
      },
      {
        id: 'pass-loan',
        label: 'Pass for now',
        labelEs: 'Pasar por ahora',
        delta: 5,
        explanation:
          'Totally reasonable. Your existing accounts keep aging, and account age is free points.',
        explanationEs:
          'Totalmente razonable. Tus cuentas actuales siguen ganando antigüedad, y la antigüedad de las cuentas son puntos gratis.',
        factors: ['length'],
      },
    ],
  },
  {
    emoji: '📱',
    title: 'The cracked screen finale',
    titleEs: 'El gran final de la pantalla rota',
    scenario:
      "Month 10: your phone screen finally gives out completely. You need a replacement — how do you pay?",
    scenarioEs:
      'Mes 10: la pantalla de tu teléfono finalmente muere por completo. Necesitas un reemplazo. ¿Cómo pagas?',
    choices: [
      {
        id: 'refurb-cash',
        label: 'Buy a refurbished one with savings',
        labelEs: 'Comprar uno reacondicionado con tus ahorros',
        delta: 10,
        explanation:
          'No new debt, utilization untouched, and your on-time streak rolls on. Boring is beautiful.',
        explanationEs:
          'Sin deuda nueva, sin tocar tu uso del crédito y tu racha de pagos a tiempo continúa. Lo aburrido es hermoso.',
        factors: ['utilization', 'payment'],
      },
      {
        id: 'carrier-plan',
        label: '0% carrier financing with autopay',
        labelEs: 'Financiamiento de la operadora al 0% con pago automático',
        delta: 5,
        explanation:
          "A small installment loan paid on time is fine — it even adds to your mix. Just don't stack five of these.",
        explanationEs:
          'Un pequeño préstamo a plazos pagado a tiempo está bien; hasta suma a la variedad de tu crédito. Solo no acumules cinco de estos.',
        factors: ['mix', 'payment'],
      },
      {
        id: 'max-card',
        label: 'New flagship on the credit card, pay minimums',
        labelEs: 'Un nuevo teléfono tope de gama a la tarjeta, pagando mínimos',
        delta: -30,
        explanation:
          'A big balance near your limit plus minimum payments means high utilization now and months of interest later.',
        explanationEs:
          'Un saldo grande cerca de tu límite más pagos mínimos significa uso alto ahora y meses de intereses después.',
        factors: ['utilization'],
      },
    ],
  },
]

// ---------- Final titles ----------

function titleFor(score: number, es: boolean): [title: string, emoji: string, blurb: string] {
  if (score >= 800)
    return es
      ? ['Leyenda del crédito', '🏆', 'Un puntaje excepcional. Los prestamistas te alfombrarán el camino: las mejores tasas en todo.']
      : ['Credit Legend', '🏆', 'An exceptional score. Lenders will roll out the red carpet — best rates on everything.']
  if (score >= 740)
    return es
      ? ['Maestro del puntaje', '🥋', 'Muy bueno. Formaste hábitos que la mayoría de los adultos nunca logra entender.']
      : ['Score Sensei', '🥋', 'Very good. You built habits most adults never figure out.']
  if (score >= 670)
    return es
      ? ['Constructor sólido', '🧱', 'Un buen puntaje: hábitos constantes, crecimiento constante. Sigue acumulando pagos a tiempo.']
      : ['Solid Builder', '🧱', 'A good score — steady habits, steady growth. Keep stacking on-time payments.']
  if (score >= 580)
    return es
      ? ['Trabajo en progreso', '🚧', 'Regular. Algunas decisiones te costaron, pero nada que los pagos constantes a tiempo no puedan reparar.']
      : ['Work in Progress', '🚧', "Fair. Some choices cost you, but nothing that consistent on-time payments can't repair."]
  return es
    ? ['Modo reconstrucción', '🔧', 'El puntaje sufrió un daño real. La buena noticia: el historial de pagos sana con el tiempo, empezando hoy.']
    : ['Rebuild Mode', '🔧', 'The score took real damage — the good news: payment history heals with time, starting today.']
}

function clampScore(n: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, n))
}

/** Map 300-850 linearly onto 0-100 for saved progress. */
function progressScore(score: number): number {
  return Math.round(((clampScore(score) - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100)
}

function deltaChip(delta: number, es: boolean): { text: string; classes: string } {
  const pts = es ? 'puntos' : 'points'
  if (delta > 0) return { text: `+${delta} ${pts}`, classes: 'bg-green-100 text-green-700' }
  if (delta < 0) return { text: `${delta} ${pts}`, classes: 'bg-red-100 text-red-700' }
  return { text: `±0 ${pts}`, classes: 'bg-slate-100 text-slate-600' }
}

// ---------- Score meter ----------

function ScoreMeter({ score, es }: { score: number; es: boolean }) {
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
        aria-valuetext={`${score} — ${es ? band.nameEs : band.name}`}
        aria-label={es ? 'Medidor de puntaje de crédito' : 'Credit score meter'}
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
            {es ? b.nameEs : b.name} {b.min}–{b.max}
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
  choiceLabelEs: string
  delta: number
  explanation: string
  explanationEs: string
}

export default function CreditScoreSim({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
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
        choiceLabelEs: choice.labelEs,
        delta: choice.delta,
        explanation: choice.explanation,
        explanationEs: choice.explanationEs,
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
    const [title, emoji, blurb] = titleFor(score, es)
    const best = history.reduce((a, b) => (b.delta > a.delta ? b : a), history[0])
    const worst = history.reduce((a, b) => (b.delta < a.delta ? b : a), history[0])
    const pts = es ? 'puntos' : 'points'
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="card animate-pop-in space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{emoji}</p>
          <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
          <p className="font-display text-lg font-bold text-bff-700">
            {es ? 'Puntaje final' : 'Final score'}: {score} — {es ? band.nameEs : band.name}
          </p>
          <p className="mx-auto max-w-md text-sm text-slate-700">{blurb}</p>
          <div className="px-2 pt-2 text-left">
            <ScoreMeter score={score} es={es} />
          </div>
          <p className="text-xs text-slate-500">
            {es ? 'Empezaste en' : 'Started at'} {START_SCORE} ·{' '}
            {es ? 'terminaste en' : 'finished at'} {score} (
            {score - START_SCORE >= 0 ? '+' : ''}
            {score - START_SCORE} {es ? 'en 10 meses' : 'over 10 months'})
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="card animate-slide-up border-green-200 bg-green-50">
            <h2 className="font-display text-base font-bold text-slate-900">
              <span aria-hidden="true">🌟</span> {es ? 'Mejor jugada' : 'Best move'}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {es ? 'Mes' : 'Month'} {best.month}: {es ? best.choiceLabelEs : best.choiceLabel}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {best.delta >= 0 ? `+${best.delta}` : best.delta} {pts} —{' '}
              {es ? best.explanationEs : best.explanation}
            </p>
          </div>
          <div className="card animate-slide-up border-red-200 bg-red-50">
            <h2 className="font-display text-base font-bold text-slate-900">
              <span aria-hidden="true">🕳️</span> {es ? 'Jugada más costosa' : 'Costliest move'}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {es ? 'Mes' : 'Month'} {worst.month}: {es ? worst.choiceLabelEs : worst.choiceLabel}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {worst.delta >= 0 ? `+${worst.delta}` : worst.delta} {pts} —{' '}
              {es ? worst.explanationEs : worst.explanation}
            </p>
          </div>
        </div>

        <div className="card mt-4 border-bff-200 bg-bff-50">
          <h2 className="font-display text-lg font-bold text-slate-900">
            <span aria-hidden="true">💡</span>{' '}
            {es ? 'La receta nunca cambia' : 'The recipe never changes'}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {es
              ? 'Paga cada factura a tiempo, mantén los saldos bajos, deja que las cuentas ganen antigüedad y abre crédito nuevo pocas veces. Ese es todo el truco: los cinco factores de abajo son cómo FICO lo mide.'
              : "Pay every bill on time, keep balances low, let accounts age, and open new credit rarely. That's the whole cheat code — the five factors below are how FICO weighs it."}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {(Object.keys(FACTORS) as Factor[]).map((f) => (
              <li key={f} className="chip bg-white text-bff-700">
                {es ? FACTORS_ES[f] : FACTORS[f]}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={playAgain}>
            {es ? 'Jugar 10 meses más' : 'Play 10 more months'}
          </button>
          <Link to="/activities" className="btn-primary">
            {es ? 'Volver a las actividades' : 'Back to activities'}{' '}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Playing view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">💳📈</span>{' '}
        {es ? 'Constructor de Puntaje de Crédito' : 'Credit Score Builder'}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {es
          ? '10 meses, 10 decisiones. Construye el número de tres dígitos que te acompaña toda la vida.'
          : '10 months, 10 decisions. Build the three-digit number that follows you for life.'}
      </p>

      {/* Score meter */}
      <section className="card mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-lg font-bold text-slate-900" aria-live="polite">
            {es ? 'Puntaje' : 'Score'}: {score}{' '}
            <span className="font-semibold text-bff-700">— {es ? band.nameEs : band.name}</span>
          </p>
          <p className="text-sm text-slate-500">
            {es ? 'Mes' : 'Month'} {monthIndex + 1} {es ? 'de' : 'of'} {MONTHS.length}
          </p>
        </div>
        <div className="mt-3">
          <ScoreMeter score={score} es={es} />
        </div>
      </section>

      {/* Decision card */}
      <section className="card mt-4">
        <h2 className="font-display text-lg font-bold text-slate-900">
          <span className="mr-1" aria-hidden="true">{month.emoji}</span>
          {es ? 'Mes' : 'Month'} {monthIndex + 1}: {es ? month.titleEs : month.title}
        </h2>
        <p className="mt-2 text-sm text-slate-700">{es ? month.scenarioEs : month.scenario}</p>

        {feedback === null ? (
          <div className="mt-4 space-y-2">
            {month.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => choose(choice)}
                className="block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:border-bff-400 hover:bg-bff-50"
              >
                {es ? choice.labelEs : choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 animate-pop-in rounded-xl border-2 border-bff-200 bg-bff-50 p-4" role="status">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`chip ${deltaChip(feedback.delta, es).classes}`}>
                {deltaChip(feedback.delta, es).text}
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {es ? feedback.labelEs : feedback.label}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              {es ? feedback.explanationEs : feedback.explanation}
            </p>
            {feedback.factors.length > 0 && (
              <ul
                className="mt-3 flex flex-wrap gap-1.5"
                aria-label={es ? 'Factores del puntaje de crédito involucrados' : 'Credit score factors involved'}
              >
                {feedback.factors.map((f) => (
                  <li key={f} className="chip bg-white text-bff-700">
                    {es ? FACTORS_ES[f] : FACTORS[f]}
                  </li>
                ))}
              </ul>
            )}
            <button className="btn-primary mt-4" onClick={nextMonth}>
              {monthIndex + 1 >= MONTHS.length
                ? es
                  ? 'Ver tu puntaje final'
                  : 'See your final score'
                : es
                  ? `Al mes ${monthIndex + 2}`
                  : `On to month ${monthIndex + 2}`}{' '}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>

      {/* Factor legend */}
      <section className="card mt-4 bg-slate-100/70 p-4">
        <h2 className="font-display text-sm font-bold text-slate-900">
          {es ? '¿Qué mueve realmente un puntaje de crédito?' : 'What actually moves a credit score?'}
        </h2>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {(Object.keys(FACTORS) as Factor[]).map((f) => (
            <li key={f} className="chip bg-white text-slate-600">
              {es ? FACTORS_ES[f] : FACTORS[f]}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

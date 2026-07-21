import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

const SLUG = 'smart-shopper'

// ---------- Rounds ----------

interface MathLine {
  label: string
  labelEs: string
  value: string
  valueEs: string
}

interface Offer {
  emoji: string
  name: string
  nameEs: string
  shelfTag: string // the flashy marketing line on the shelf
  shelfTagEs: string
  price: string
  priceEs: string
  mathLines: MathLine[]
  bottomLine: string
  bottomLineEs: string
}

interface Round {
  id: string
  title: string
  titleEs: string
  scenario: string
  scenarioEs: string
  offers: [Offer, Offer]
  betterIndex: 0 | 1
  explanation: string
  explanationEs: string
}

const ROUNDS: Round[] = [
  {
    id: 'unit-price',
    title: 'The soda aisle showdown',
    titleEs: 'El duelo del pasillo de refrescos',
    scenario: 'You want soda for movie night. Which is actually cheaper per ounce?',
    scenarioEs: 'Quieres refresco para la noche de película. ¿Cuál es en realidad más barato por onza?',
    offers: [
      {
        emoji: '🥤',
        name: '2-liter bottle',
        nameEs: 'Botella de 2 litros',
        shelfTag: 'Everyday price',
        shelfTagEs: 'Precio de siempre',
        price: '$2.49',
        priceEs: '$2.49',
        mathLines: [
          { label: 'Total soda', labelEs: 'Refresco total', value: '2 L = 67.6 oz', valueEs: '2 L = 67.6 oz' },
          { label: '$2.49 ÷ 67.6 oz', labelEs: '$2.49 ÷ 67.6 oz', value: '3.7¢ per oz', valueEs: '3.7¢ por oz' },
        ],
        bottomLine: '3.7¢ per oz',
        bottomLineEs: '3.7¢ por oz',
      },
      {
        emoji: '🥫',
        name: 'Six 12-oz cans',
        nameEs: 'Seis latas de 12 oz',
        shelfTag: 'MEGA VALUE 6-PACK!',
        shelfTagEs: '¡PAQUETE DE 6 MEGA OFERTA!',
        price: '$3.99',
        priceEs: '$3.99',
        mathLines: [
          { label: 'Total soda', labelEs: 'Refresco total', value: '6 × 12 oz = 72 oz', valueEs: '6 × 12 oz = 72 oz' },
          { label: '$3.99 ÷ 72 oz', labelEs: '$3.99 ÷ 72 oz', value: '5.5¢ per oz', valueEs: '5.5¢ por oz' },
        ],
        bottomLine: '5.5¢ per oz',
        bottomLineEs: '5.5¢ por oz',
      },
    ],
    betterIndex: 0,
    explanation:
      'The "MEGA VALUE" 6-pack costs about 50% more per ounce (5.5¢ vs 3.7¢). The shelf tag shouts, but the unit price whispers the truth — always divide price by amount.',
    explanationEs:
      'El paquete de 6 de "MEGA OFERTA" cuesta como 50% más por onza (5.5¢ vs 3.7¢). La etiqueta grita, pero el precio por unidad susurra la verdad — siempre divide el precio entre la cantidad.',
  },
  {
    id: 'bulk',
    title: 'The bulk trap',
    titleEs: 'La trampa de comprar al por mayor',
    scenario:
      'You eat about 1 lb of salad a week, and spring mix goes bad in about a week. Which do you buy?',
    scenarioEs:
      'Comes como 1 libra de ensalada a la semana, y la mezcla de hojas se echa a perder en más o menos una semana. ¿Cuál compras?',
    offers: [
      {
        emoji: '🛢️',
        name: '5-lb warehouse tub of spring mix',
        nameEs: 'Recipiente de mayoreo de 5 lb de mezcla de hojas',
        shelfTag: 'WAREHOUSE DEAL — only $1.80/lb!',
        shelfTagEs: 'OFERTA DE MAYOREO — ¡solo $1.80/lb!',
        price: '$8.99',
        priceEs: '$8.99',
        mathLines: [
          { label: 'Price per lb on the tag', labelEs: 'Precio por lb en la etiqueta', value: '$1.80', valueEs: '$1.80' },
          { label: 'You eat before it spoils', labelEs: 'Lo que comes antes de que se eche a perder', value: '~1 lb', valueEs: '~1 lb' },
          { label: 'Wasted', labelEs: 'Desperdiciado', value: '~4 lbs in the trash', valueEs: '~4 lbs a la basura' },
          { label: 'Real cost of the 1 lb you ate', labelEs: 'Costo real de la 1 lb que comiste', value: '$8.99', valueEs: '$8.99' },
        ],
        bottomLine: '$8.99 for what you actually used',
        bottomLineEs: '$8.99 por lo que realmente usaste',
      },
      {
        emoji: '🥗',
        name: '1-lb box of spring mix',
        nameEs: 'Caja de 1 lb de mezcla de hojas',
        shelfTag: 'Regular size',
        shelfTagEs: 'Tamaño normal',
        price: '$3.49',
        priceEs: '$3.49',
        mathLines: [
          { label: 'Price per lb', labelEs: 'Precio por lb', value: '$3.49', valueEs: '$3.49' },
          { label: 'You eat before it spoils', labelEs: 'Lo que comes antes de que se eche a perder', value: 'all of it', valueEs: 'toda' },
          { label: 'Wasted', labelEs: 'Desperdiciado', value: '$0', valueEs: '$0' },
        ],
        bottomLine: '$3.49 for what you actually used',
        bottomLineEs: '$3.49 por lo que realmente usaste',
      },
    ],
    betterIndex: 1,
    explanation:
      'Bulk only wins if you USE it all. Salad you throw away is money you threw away: the "cheap" tub really cost $8.99 for one usable pound — more than double the small box. Bulk is great for rice; terrible for lettuce.',
    explanationEs:
      'Comprar al por mayor solo conviene si lo USAS todo. La ensalada que tiras es dinero que tiraste: el recipiente "barato" en realidad costó $8.99 por una libra aprovechable — más del doble que la caja pequeña. El mayoreo es genial para el arroz; terrible para la lechuga.',
  },
  {
    id: 'fake-sale',
    title: 'The "sale" that isn\'t',
    titleEs: 'La "oferta" que no lo es',
    scenario: 'Same exact headphones at two stores. Which price is actually lower?',
    scenarioEs: 'Los mismos audífonos idénticos en dos tiendas. ¿Cuál precio es en realidad más bajo?',
    offers: [
      {
        emoji: '🎧',
        name: 'Store A headphones',
        nameEs: 'Audífonos de la Tienda A',
        shelfTag: 'Was $80 — NOW $60! SAVE $20!',
        shelfTagEs: '¡Antes $80 — AHORA $60! ¡AHORRA $20!',
        price: '$60.00',
        priceEs: '$60.00',
        mathLines: [
          { label: '"Was" price', labelEs: 'Precio "antes"', value: 'just an anchor number', valueEs: 'solo un número de referencia' },
          { label: 'What leaves your wallet', labelEs: 'Lo que sale de tu cartera', value: '$60.00', valueEs: '$60.00' },
        ],
        bottomLine: 'You pay $60',
        bottomLineEs: 'Pagas $60',
      },
      {
        emoji: '🎧',
        name: 'Store B headphones',
        nameEs: 'Audífonos de la Tienda B',
        shelfTag: 'Everyday price',
        shelfTagEs: 'Precio de siempre',
        price: '$55.00',
        priceEs: '$55.00',
        mathLines: [
          { label: 'No sale, no drama', labelEs: 'Sin oferta, sin drama', value: '—', valueEs: '—' },
          { label: 'What leaves your wallet', labelEs: 'Lo que sale de tu cartera', value: '$55.00', valueEs: '$55.00' },
        ],
        bottomLine: 'You pay $55',
        bottomLineEs: 'Pagas $55',
      },
    ],
    betterIndex: 1,
    explanation:
      'A "was" price is an anchor designed to make $60 feel like a win. Your wallet only feels the FINAL price: $55 beats $60, no matter how big the SAVE sticker is.',
    explanationEs:
      'Un precio "antes" es una referencia diseñada para hacer que $60 se sienta como un triunfo. Tu cartera solo siente el precio FINAL: $55 le gana a $60, sin importar qué tan grande sea la etiqueta de AHORRA.',
  },
  {
    id: 'store-brand',
    title: 'Name brand vs. store brand',
    titleEs: 'Marca reconocida vs. marca de la tienda',
    scenario:
      'Ibuprofen, 200 mg, 100 tablets. Check the "active ingredient" line — it is identical on both boxes.',
    scenarioEs:
      'Ibuprofeno, 200 mg, 100 tabletas. Revisa la línea de "ingrediente activo" — es idéntica en ambas cajas.',
    offers: [
      {
        emoji: '💊',
        name: 'BrandName ibuprofen',
        nameEs: 'Ibuprofeno de MarcaFamosa',
        shelfTag: 'The brand you trust™',
        shelfTagEs: 'La marca en la que confías™',
        price: '$9.49',
        priceEs: '$9.49',
        mathLines: [
          { label: 'Active ingredient', labelEs: 'Ingrediente activo', value: 'ibuprofen 200 mg', valueEs: 'ibuprofeno 200 mg' },
          { label: 'Per tablet', labelEs: 'Por tableta', value: '9.5¢', valueEs: '9.5¢' },
          { label: 'What the extra $5 buys', labelEs: 'Lo que compran los $5 de más', value: 'ad budget + fancy box', valueEs: 'presupuesto de anuncios + caja elegante' },
        ],
        bottomLine: '9.5¢ per tablet',
        bottomLineEs: '9.5¢ por tableta',
      },
      {
        emoji: '💊',
        name: 'Store-brand ibuprofen',
        nameEs: 'Ibuprofeno de marca de la tienda',
        shelfTag: 'Compare to BrandName',
        shelfTagEs: 'Compara con MarcaFamosa',
        price: '$4.29',
        priceEs: '$4.29',
        mathLines: [
          { label: 'Active ingredient', labelEs: 'Ingrediente activo', value: 'ibuprofen 200 mg', valueEs: 'ibuprofeno 200 mg' },
          { label: 'Per tablet', labelEs: 'Por tableta', value: '4.3¢', valueEs: '4.3¢' },
          { label: 'Same FDA rules apply', labelEs: 'Aplican las mismas reglas de la FDA', value: 'same dose, same effect', valueEs: 'misma dosis, mismo efecto' },
        ],
        bottomLine: '4.3¢ per tablet',
        bottomLineEs: '4.3¢ por tableta',
      },
    ],
    betterIndex: 1,
    explanation:
      'Same active ingredient, same dose, same federal standards — less than half the price. For medicine and pantry staples, the store brand is usually the same product wearing a cheaper outfit.',
    explanationEs:
      'Mismo ingrediente activo, misma dosis, mismos estándares federales — menos de la mitad del precio. Para las medicinas y los productos básicos de la despensa, la marca de la tienda suele ser el mismo producto con un empaque más barato.',
  },
  {
    id: 'bogo',
    title: 'BOGO brain teaser',
    titleEs: 'Acertijo del 2x1',
    scenario: 'You want two $20 T-shirts. Two stores, two "deals" — which discount is bigger?',
    scenarioEs: 'Quieres dos camisetas de $20. Dos tiendas, dos "ofertas" — ¿cuál descuento es mayor?',
    offers: [
      {
        emoji: '👕',
        name: 'Store A: BOGO 50% off',
        nameEs: 'Tienda A: la segunda al 50%',
        shelfTag: 'BUY ONE GET ONE 50% OFF!!!',
        shelfTagEs: '¡¡¡COMPRA UNA Y LLEVA LA SEGUNDA AL 50%!!!',
        price: '2 shirts',
        priceEs: '2 camisetas',
        mathLines: [
          { label: 'Shirt 1', labelEs: 'Camiseta 1', value: '$20.00', valueEs: '$20.00' },
          { label: 'Shirt 2 (50% off)', labelEs: 'Camiseta 2 (50% de descuento)', value: '$10.00', valueEs: '$10.00' },
          { label: 'Total', labelEs: 'Total', value: '$30.00', valueEs: '$30.00' },
          { label: 'Real discount on the pair', labelEs: 'Descuento real sobre el par', value: '25% off', valueEs: '25% de descuento' },
        ],
        bottomLine: '$30 total = only 25% off',
        bottomLineEs: '$30 en total = solo 25% de descuento',
      },
      {
        emoji: '👕',
        name: 'Store B: 30% off everything',
        nameEs: 'Tienda B: 30% de descuento en todo',
        shelfTag: '30% off storewide',
        shelfTagEs: '30% de descuento en toda la tienda',
        price: '2 shirts',
        priceEs: '2 camisetas',
        mathLines: [
          { label: 'Shirt 1 (30% off)', labelEs: 'Camiseta 1 (30% de descuento)', value: '$14.00', valueEs: '$14.00' },
          { label: 'Shirt 2 (30% off)', labelEs: 'Camiseta 2 (30% de descuento)', value: '$14.00', valueEs: '$14.00' },
          { label: 'Total', labelEs: 'Total', value: '$28.00', valueEs: '$28.00' },
          { label: 'Real discount on the pair', labelEs: 'Descuento real sobre el par', value: '30% off', valueEs: '30% de descuento' },
        ],
        bottomLine: '$28 total = a true 30% off',
        bottomLineEs: '$28 en total = un verdadero 30% de descuento',
      },
    ],
    betterIndex: 1,
    explanation:
      '"BOGO 50%" sounds like half off, but the discount only touches the second shirt — so the pair is just 25% off. A plain 30% beats it AND doesn\'t force you to buy two. Convert every deal to the total you\'ll pay.',
    explanationEs:
      '"La segunda al 50%" suena como mitad de precio, pero el descuento solo toca la segunda camiseta — así que el par tiene solo 25% de descuento. Un simple 30% le gana Y no te obliga a comprar dos. Convierte cada oferta al total que vas a pagar.',
  },
  {
    id: 'subscription',
    title: 'Subscribe or buy?',
    titleEs: '¿Suscribirte o comprar?',
    scenario:
      'You need photo-editing software for a 3-month class project. After that, you\'re done with it.',
    scenarioEs:
      'Necesitas un programa para editar fotos para un proyecto de clase de 3 meses. Después de eso, ya no lo usarás.',
    offers: [
      {
        emoji: '💿',
        name: 'Lifetime license',
        nameEs: 'Licencia de por vida',
        shelfTag: 'BEST VALUE — pay once, own it FOREVER!',
        shelfTagEs: 'LA MEJOR OFERTA — ¡paga una vez y es tuyo PARA SIEMPRE!',
        price: '$60 one-time',
        priceEs: '$60 pago único',
        mathLines: [
          { label: 'Cost for your 3-month project', labelEs: 'Costo para tu proyecto de 3 meses', value: '$60.00', valueEs: '$60.00' },
          { label: 'Months 4+', labelEs: 'Del mes 4 en adelante', value: 'you own software you no longer use', valueEs: 'tienes un programa que ya no usas' },
        ],
        bottomLine: '$60 for 3 months of actual use',
        bottomLineEs: '$60 por 3 meses de uso real',
      },
      {
        emoji: '🔁',
        name: 'Monthly subscription',
        nameEs: 'Suscripción mensual',
        shelfTag: 'Just $9.99/month — cancel anytime',
        shelfTagEs: 'Solo $9.99/mes — cancela cuando quieras',
        price: '$9.99/mo',
        priceEs: '$9.99/mes',
        mathLines: [
          { label: '3 months × $9.99', labelEs: '3 meses × $9.99', value: '$29.97', valueEs: '$29.97' },
          { label: 'Then CANCEL (set a reminder!)', labelEs: 'Luego CANCELA (¡pon un recordatorio!)', value: '$0 after', valueEs: '$0 después' },
          { label: 'If you forget for a year', labelEs: 'Si se te olvida por un año', value: '$119.88 — worse than lifetime', valueEs: '$119.88 — peor que la de por vida' },
        ],
        bottomLine: '$29.97 — if you actually cancel',
        bottomLineEs: '$29.97 — si de verdad cancelas',
      },
    ],
    betterIndex: 1,
    explanation:
      '"Forever" is only valuable if you\'ll use it forever. For 3 months of real use, $29.97 beats $60 — but subscriptions bank on you forgetting: by month 7 the sub passes $60 and never stops. Match the deal to YOUR timeline, and set the cancel reminder the day you subscribe.',
    explanationEs:
      '"Para siempre" solo vale la pena si lo vas a usar para siempre. Para 3 meses de uso real, $29.97 le gana a $60 — pero las suscripciones apuestan a que se te olvide: para el mes 7 la suscripción supera los $60 y nunca para. Ajusta la oferta a TU plazo, y pon el recordatorio para cancelar el mismo día que te suscribas.',
  },
]

// ---------- Scoring ----------

function tierFor(score: number, es: boolean): { title: string; emoji: string } {
  if (score >= 100) return { title: es ? 'Ninja del Precio por Unidad' : 'Unit-Price Ninja', emoji: '🥷' }
  if (score >= 67) return { title: es ? 'Comprador Astuto' : 'Savvy Shopper', emoji: '🛒' }
  if (score >= 50) return { title: es ? 'Lector de Etiquetas' : 'Label Reader', emoji: '🏷️' }
  return { title: es ? 'El Mejor Amigo del Marketing' : "Marketing's Best Friend", emoji: '🎈' }
}

// ---------- Component ----------

export default function SmartShopper({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
  const [roundIndex, setRoundIndex] = useState(0)
  const [picked, setPicked] = useState<0 | 1 | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const studentRef = useRef(student)
  studentRef.current = student
  useEffect(() => {
    void saveProgress(studentRef.current, SLUG, { status: 'started' })
  }, [])

  const round = ROUNDS[roundIndex]
  const score = Math.round((correctCount / ROUNDS.length) * 100)
  const tier = tierFor(score, es)

  function pick(i: 0 | 1) {
    if (picked !== null) return
    setPicked(i)
    if (i === round.betterIndex) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (roundIndex + 1 < ROUNDS.length) {
      setRoundIndex((r) => r + 1)
      setPicked(null)
      window.scrollTo({ top: 0 })
    } else {
      const finalCorrect = correctCount
      setFinished(true)
      window.scrollTo({ top: 0 })
      void saveProgress(studentRef.current, SLUG, {
        status: 'completed',
        score: Math.round((finalCorrect / ROUNDS.length) * 100),
        data: { correct: finalCorrect, total: ROUNDS.length },
      })
      onComplete?.(Math.round((finalCorrect / ROUNDS.length) * 100))
    }
  }

  function reset() {
    setRoundIndex(0)
    setPicked(null)
    setCorrectCount(0)
    setFinished(false)
    window.scrollTo({ top: 0 })
  }

  // ---------- Results view ----------
  if (finished) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          <span aria-hidden="true">🛒</span> {es ? 'Comprador Inteligente' : 'Smart Shopper'}{' '}
          <span aria-hidden="true">⚖️</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">{es ? 'Compra terminada. Sumemos tu radar de ofertas.' : "Checkout complete. Let's total up your deal radar."}</p>

        <div className="card animate-pop-in mt-4 space-y-2 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{tier.emoji}</p>
          <h2 className="font-display text-3xl font-bold text-slate-900">{tier.title}</h2>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="text-sm text-slate-600">
            {es
              ? `Detectaste la mejor oferta en ${correctCount} de ${ROUNDS.length} rondas.`
              : `You spotted the better deal in ${correctCount} of ${ROUNDS.length} rounds.`}
          </p>
        </div>

        <div className="card animate-slide-up mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          <p className="font-display font-bold text-slate-900">
            <span aria-hidden="true">🧮</span> {es ? 'La lección' : 'The takeaway'}
          </p>
          <p className="mt-1">
            {es
              ? 'Haz la matemática por unidad — la etiqueta hace marketing, no matemáticas. Divide el precio entre la cantidad, compara los totales finales (no los precios "antes"), compra al por mayor solo lo que de verdad usarás, y ajusta las suscripciones al tiempo que realmente las necesitarás.'
              : 'Do the per-unit math — the shelf tag is doing marketing, not math. Divide price by amount, compare final totals (not "was" prices), only buy bulk you\'ll actually use, and match subscriptions to how long you\'ll really need them.'}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            {es ? 'Comprar de nuevo' : 'Shop again'}
          </button>
          <Link to="/activities" className="btn-primary">
            {es ? 'Más actividades' : 'More activities'}
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Round view ----------
  const revealed = picked !== null
  const pickedRight = picked === round.betterIndex

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">🛒</span> {es ? 'Comprador Inteligente' : 'Smart Shopper'}{' '}
        <span aria-hidden="true">⚖️</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {es
          ? `Ronda ${roundIndex + 1} de ${ROUNDS.length} · Puntaje hasta ahora: ${correctCount} correcta${correctCount === 1 ? '' : 's'}`
          : `Round ${roundIndex + 1} of ${ROUNDS.length} · Score so far: ${correctCount} right`}
      </p>

      {roundIndex === 0 && !revealed && (
        <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          <p>
            {es
              ? 'Dos productos, una mejor oferta — y las etiquetas están tratando de engañarte. Elige la compra más inteligente, y luego haremos la matemática real juntos.'
              : "Two products, one better deal — and the shelf tags are trying to fool you. Pick the smarter buy, then we'll do the real math together."}
          </p>
        </div>
      )}

      <section className="mt-4">
        <h2 className="font-display text-lg font-bold text-slate-900">{es ? round.titleEs : round.title}</h2>
        <p className="mt-1 text-sm text-slate-600">{es ? round.scenarioEs : round.scenario}</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {round.offers.map((offer, i) => {
            const isPicked = picked === i
            const isBetter = i === round.betterIndex
            return (
              <button
                key={offer.name}
                type="button"
                aria-pressed={isPicked}
                disabled={revealed}
                onClick={() => pick(i as 0 | 1)}
                className={`rounded-xl border-2 p-4 text-left transition disabled:cursor-default ${
                  revealed
                    ? isBetter
                      ? 'border-green-600 bg-green-50'
                      : isPicked
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-white opacity-80'
                    : isPicked
                      ? 'border-bff-500 bg-bff-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-bff-300'
                }`}
              >
                <p className="text-3xl" aria-hidden="true">{offer.emoji}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{es ? offer.nameEs : offer.name}</p>
                <p className="mt-1 inline-block rounded bg-gold-400/30 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-800">
                  {es ? offer.shelfTagEs : offer.shelfTag}
                </p>
                <p className="mt-2 font-display text-xl font-bold text-bff-700">{es ? offer.priceEs : offer.price}</p>
                {revealed && (
                  <div className="animate-pop-in mt-3 rounded-lg bg-white/70 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {es ? 'La matemática real' : 'The real math'}
                    </p>
                    <dl className="mt-1 space-y-1 text-xs text-slate-700">
                      {offer.mathLines.map((line) => (
                        <div key={line.label} className="flex justify-between gap-2">
                          <dt>{es ? line.labelEs : line.label}</dt>
                          <dd className="text-right font-semibold">{es ? line.valueEs : line.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p
                      className={`mt-2 border-t border-slate-200 pt-2 text-sm font-bold ${
                        isBetter ? 'text-green-700' : 'text-red-600'
                      }`}
                    >
                      {isBetter ? (
                        <>
                          <span aria-hidden="true">✓</span> {es ? offer.bottomLineEs : offer.bottomLine}
                        </>
                      ) : (
                        es ? offer.bottomLineEs : offer.bottomLine
                      )}
                    </p>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <div role="status" aria-live="polite">
        {revealed && (
          <div className="card animate-slide-up mt-4 p-4">
            <p
              className={`font-display text-lg font-bold ${pickedRight ? 'text-green-700' : 'text-red-600'}`}
            >
              {pickedRight ? (
                <>
                  <span aria-hidden="true">🎉</span> {es ? '¡Lo lograste!' : 'Nailed it!'}
                </>
              ) : (
                <>
                  <span aria-hidden="true">💸</span> {es ? 'La etiqueta te ganó esta vez.' : 'The tag got you this time.'}
                </>
              )}
            </p>
            <p className="mt-1 text-sm text-slate-700">{es ? round.explanationEs : round.explanation}</p>
            <div className="mt-4 text-center">
              <button className="btn-primary w-full sm:w-auto" onClick={next}>
                {roundIndex + 1 < ROUNDS.length ? (es ? 'Siguiente ronda' : 'Next round') : (es ? 'Ver mis resultados' : 'See my results')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

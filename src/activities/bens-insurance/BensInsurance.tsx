import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle, Check, Hospital, Luggage, Turtle, Home, Fingerprint, Smartphone,
  TreeDeciduous, Car, TreePalm, Thermometer, Smile, ShieldCheck, ThumbsUp, Bandage, Dices,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

/** Icon components referenced by name from the local data below. */
const ITEM_ICONS: Record<string, LucideIcon> = {
  Hospital, Luggage, Turtle, Home, Fingerprint, Smartphone, TreeDeciduous,
  Car, TreePalm, Thermometer, Smile, ShieldCheck, ThumbsUp, Bandage, Dices,
}

// ---------- The official numbers (from the BFF of America paper activity) ----------

const BUDGET = 500

type PolicyId = 'health' | 'travel' | 'pet' | 'home' | 'identity' | 'phone' | 'life'

interface Policy {
  id: PolicyId
  icon: string
  label: string
  labelEs: string
  labelZh: string
  cost: number
  note: string
  noteEs: string
  noteZh: string
}

const POLICIES: Policy[] = [
  { id: 'health', icon: 'Hospital', label: 'Health insurance', labelEs: 'Seguro médico', labelZh: '医疗保险', cost: 240, note: 'Covers the whole family', noteEs: 'Cubre a toda la familia', noteZh: '保障全家人' },
  { id: 'travel', icon: 'Luggage', label: 'Travel insurance', labelEs: 'Seguro de viaje', labelZh: '旅行保险', cost: 60, note: 'The beach trip is THIS month!', noteEs: '¡El viaje a la playa es ESTE mes!', noteZh: '海滩之旅就在这个月！' },
  { id: 'pet', icon: 'Turtle', label: 'Pet insurance', labelEs: 'Seguro para mascotas', labelZh: '宠物保险', cost: 70, note: 'For the iguana. Yes, really.', noteEs: 'Para la iguana. Sí, en serio.', noteZh: '给那只鬣蜥买的。是的，真的。' },
  { id: 'home', icon: 'Home', label: 'Home insurance', labelEs: 'Seguro de vivienda', labelZh: '房屋保险', cost: 210, note: 'Protects the house and everything in it', noteEs: 'Protege la casa y todo lo que hay adentro', noteZh: '保障房子和里面的一切' },
  { id: 'identity', icon: 'Fingerprint', label: 'Identity theft insurance', labelEs: 'Seguro contra robo de identidad', labelZh: '身份盗窃保险', cost: 60, note: 'In case someone pretends to be Ben', noteEs: 'Por si alguien se hace pasar por Ben', noteZh: '以防有人冒充 Ben' },
  { id: 'phone', icon: 'Smartphone', label: 'Phone protection plan', labelEs: 'Plan de protección del teléfono', labelZh: '手机保障计划', cost: 30, note: 'Three kids. Many drops.', noteEs: 'Tres niños. Muchas caídas.', noteZh: '三个孩子。摔了无数次。' },
  { id: 'life', icon: 'TreeDeciduous', label: 'Life insurance', labelEs: 'Seguro de vida', labelZh: '人寿保险', cost: 90, note: "Protects the family's future", noteEs: 'Protege el futuro de la familia', noteZh: '保障这个家的未来' },
]

type CarChoice = 'none' | 'one' | 'both'
type WhichCar = 'ben' | 'wife'

const CAR_COST: Record<CarChoice, number> = { none: 0, one: 80, both: 120 }

// ---------- Results ----------

type Tone = 'good' | 'bad' | 'neutral'

interface StoryEvent {
  icon: string
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
  gradeIcon: string
}

function premiumsTotal(picks: Picks): number {
  return (
    POLICIES.reduce((sum, p) => sum + (picks.policies.has(p.id) ? p.cost : 0), 0) +
    CAR_COST[picks.car]
  )
}

function computeResults(picks: Picks, es: boolean, zh: boolean): Results {
  const has = (id: PolicyId) => picks.policies.has(id)
  const wifeCarCovered = picks.car === 'both' || (picks.car === 'one' && picks.whichCar === 'wife')

  const events: StoryEvent[] = [
    {
      icon: 'Car',
      title: zh
        ? '全家开着他妻子的车去海滩……结果车抛锚了！'
        : es
        ? '¡La familia se lleva el carro de su ESPOSA a la playa… y se descompone!'
        : "The family takes his WIFE'S car to the beach… and it breaks down!",
      outcome: wifeCarCovered
        ? (zh ? '有保障！拖车和维修都报销了。' : es ? '¡Cubierto! Grúa y reparaciones pagadas.' : 'Covered! Towing and repairs paid.')
        : (zh ? '−$500 的意外维修账单。' : es ? '−$500 de factura sorpresa por la reparación.' : '−$500 surprise repair bill.'),
      tone: wifeCarCovered ? 'good' : 'bad',
      cost: wifeCarCovered ? 0 : 500,
    },
    {
      icon: 'TreePalm',
      title: zh
        ? '他们顺利到了海滩。没丢行李，没有延误——这个月旅行保险没派上用场。'
        : es
        ? 'Llegan a la playa. No se perdió equipaje, no hubo retrasos — el seguro de viaje no hizo falta este mes.'
        : "They make it to the beach. No luggage lost, no delays — travel insurance wasn't needed this month.",
      outcome: has('travel')
        ? (zh ? '−$60 本来可以省下，但买个安心也是真的值。' : es ? '−$60 que pudiste conservar, pero la tranquilidad es real.' : '−$60 you could have kept, but peace of mind is real.')
        : (zh ? '这次没买也没出事。' : es ? 'Saltártelo salió bien esta vez.' : 'Skipping it worked out this time.'),
      tone: 'neutral',
      cost: 0,
    },
    {
      icon: 'Thermometer',
      title: zh
        ? '春季过敏在海滩上把 Ben 的女儿折腾得很惨。'
        : es
        ? 'Las alergias de primavera golpean FUERTE a la hija de Ben en la playa.'
        : "Springtime allergies hit Ben's daughter HARD at the beach.",
      outcome: has('health') ? (zh ? '有保障——看医生和吃药都搞定了。' : es ? 'Cubierto — visita al doctor y medicinas resueltas.' : 'Covered — doctor visit and meds handled.') : (zh ? '−$200 的账单。' : es ? '−$200 en facturas.' : '−$200 in bills.'),
      tone: has('health') ? 'good' : 'bad',
      cost: has('health') ? 0 : 200,
    },
    {
      icon: 'Home',
      title: zh
        ? 'Ben 的房子？完全没事。这个月房屋保险没派上用场。'
        : es
        ? '¿La casa de Ben? Todo bien. El seguro de vivienda no hizo falta este mes.'
        : "Ben's house? Totally fine. Home insurance wasn't needed this month.",
      outcome: has('home') ? (zh ? '房子平安无事的一个月。' : es ? 'Un mes tranquilo para la casa.' : 'A quiet month for the house.') : (zh ? '家里那边没什么要报告的。' : es ? 'Nada que reportar en el frente del hogar.' : 'Nothing to report on the home front.'),
      tone: 'neutral',
      cost: 0,
    },
    {
      icon: 'Turtle',
      title: zh
        ? '全家把鬣蜥也带上了。它在海里走丢了！！'
        : es
        ? '¡La familia llevó a la iguana. Se perdió en el océano!!'
        : 'The family brought the iguana. It got lost in the ocean!!',
      outcome: has('pet') ? (zh ? '有保障——搜救 + 兽医检查都报销了。' : es ? 'Cubierto — rescate + revisión veterinaria pagados.' : 'Covered — rescue + vet check paid.') : '−$40.',
      tone: has('pet') ? 'good' : 'bad',
      cost: has('pet') ? 0 : 40,
    },
    {
      icon: 'Smile',
      title: zh
        ? '没有手机摔坏，没有身份盗窃，没人用上人寿保险。其余方面，平静的一个月。'
        : es
        ? 'Ningún teléfono se cayó, ningún robo de identidad, nadie necesitó seguro de vida. Por lo demás, un mes tranquilo.'
        : 'No phone drops, no identity theft, nobody needed life insurance. Quiet month otherwise.',
      outcome: zh ? '有时候，保险最好的消息就是没有消息。' : es ? 'A veces la mejor noticia del seguro es que no hay noticias.' : 'Sometimes the best insurance news is no news.',
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
  const [grade, gradeIcon] =
    score >= 85
      ? [zh ? '全面保障' : es ? 'Totalmente Cubierto' : 'Fully Covered', 'ShieldCheck']
      : score >= 65
        ? [zh ? '基本有保障' : es ? 'Bastante Protegido' : 'Mostly Protected', 'ThumbsUp']
        : score >= 40
          ? [zh ? '哎哟' : es ? 'Ay' : 'Ouch', 'Bandage']
          : [zh ? '没保险又倒霉' : es ? 'Sin Seguro y Sin Suerte' : 'Uninsured & Unlucky', 'Dices']

  return { events, premiums, surpriseCosts, score, grade, gradeIcon }
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
      return 'text-pebble'
  }
}

const EVENT_DELAY = 0.55 // seconds between story cards

// ---------- Component ----------

export default function BensInsurance({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
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
    const r = computeResults(picks, es, zh)
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
    onComplete?.(r.score)
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
    const GradeIcon = ITEM_ICONS[results.gradeIcon]
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-2">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh ? '保障已确定。来看看这个月过得怎么样……' : es ? 'Cobertura confirmada. Veamos cómo va el mes…' : "Coverage locked. Let's see how the month goes…"}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            <ShieldCheck className="mr-1 inline-block h-7 w-7 align-[-0.15em] text-ink" aria-hidden="true" />{' '}
            {zh ? (
              <>Ben 的保险<em>挑战</em></>
            ) : es ? (
              <>El Reto del <em>Seguro</em> de Ben</>
            ) : (
              <>Ben's Insurance <em>Challenge</em></>
            )}
          </h1>
        </header>

        <div className="mt-4 space-y-3">
          {results.events.map((e, i) => {
            const EventIcon = ITEM_ICONS[e.icon]
            return (
            <div
              key={e.title}
              className="card animate-slide-up flex items-start gap-3 p-4"
              style={{ animationDelay: `${i * EVENT_DELAY}s` }}
            >
              <EventIcon className="mt-0.5 h-6 w-6 shrink-0 text-ink" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">{e.title}</p>
                <p className={`mt-1 text-sm font-bold ${outcomeClasses(e.tone)}`}>{e.outcome}</p>
              </div>
            </div>
            )
          })}
        </div>

        <div
          className="card animate-slide-up mt-4 space-y-4 text-center"
          style={{ animationDelay: `${tallyDelay}s` }}
          role="status"
        >
          <p className="flex justify-center" aria-hidden="true">
            <GradeIcon className="h-14 w-14 text-ink" />
          </p>
          <h2 className="font-display text-3xl font-bold text-ink">{results.grade}</h2>
          <p className="font-display text-lg font-bold text-ink">{results.score} / 100</p>
          <div className="mx-auto max-w-sm rounded-xl bg-paper-soft p-4 text-sm text-ink">
            <div className="flex justify-between">
              <span>{zh ? '已付保费' : es ? 'Primas pagadas' : 'Premiums paid'}</span>
              <span className="font-semibold">{usd(results.premiums)}</span>
            </div>
            <div className="flex justify-between">
              <span>{zh ? '意外支出' : es ? 'Costos sorpresa' : 'Surprise costs'}</span>
              <span className={`font-semibold ${results.surpriseCosts > 0 ? 'text-red-600' : 'text-green-700'}`}>
                {usd(results.surpriseCosts)}
              </span>
            </div>
            <div className="mt-2 flex justify-between border-t border-stone pt-2 font-display font-bold text-ink">
              <span>{zh ? '本月合计' : es ? 'Total de este mes' : 'Total this month'}</span>
              <span>{usd(results.premiums + results.surpriseCosts)}</span>
            </div>
          </div>
        </div>

        <div
          className="card animate-slide-up mt-4 border-amber-200 bg-amber-50 text-sm text-ink"
          style={{ animationDelay: `${tallyDelay + EVENT_DELAY}s` }}
        >
          <p className="font-display font-bold text-ink">
            <AlertTriangle className="mr-1 inline-block h-4 w-4 align-[-0.15em] text-amber-500" aria-hidden="true" /> {zh ? '一条重要提示' : es ? 'Una nota importante' : 'One important note'}
          </p>
          <p className="mt-1">
            {zh
              ? '别把这些虚构的结果当成"可以不买人寿保险或房屋保险"的建议——在现实生活里，这些都是必不可少的，尤其是对 Ben 这样的家庭。只是这个月碰巧运气好。'
              : es
              ? 'No tomes estos resultados ficticios como un consejo para saltarte el seguro de vida o de vivienda — en la vida real esos son esenciales, sobre todo para una familia como la de Ben. Este mes simplemente resultó ser amable.'
              : "Don't take these fictional results as advice to skip life or home insurance — in real life those are essential, especially for a family like Ben's. This month just happened to be kind."}
          </p>
        </div>

        <div
          className="animate-slide-up mt-6 flex flex-wrap justify-center gap-3"
          style={{ animationDelay: `${tallyDelay + EVENT_DELAY}s` }}
        >
          <button className="btn-secondary" onClick={reset}>
            {zh ? '再试一次' : es ? 'Intentar de nuevo' : 'Try again'}
          </button>
          <Link to="/activities" className="btn-primary">
            {zh ? '更多活动' : es ? 'Más actividades' : 'More activities'}
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Picker view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? 'Ben 理财冒险的第 2 部分' : es ? 'Parte 2 de la aventura financiera de Ben' : "Part 2 of Ben's money adventure"}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          <ShieldCheck className="mr-1 inline-block h-7 w-7 align-[-0.15em] text-ink" aria-hidden="true" />{' '}
          {zh ? (
            <>Ben 的保险<em>挑战</em></>
          ) : es ? (
            <>El Reto del <em>Seguro</em> de Ben</>
          ) : (
            <>Ben's Insurance <em>Challenge</em></>
          )}
        </h1>
      </header>

      <div className="card mt-4 border-bff-200 bg-paper-soft text-sm text-ink">
        {zh ? (
          <p>
            Ben 的预算撑过了第 1 部分——海滩之旅就在<strong>这个月</strong>，而且没错，那只鬣蜥正式成了家里的一员。现在
            Ben 每个月有 <strong>{usd(BUDGET)}/月</strong> 用来买保险。保险的意思就是每个月付一点钱，好让一场灾难不至于一下子花掉你一大笔。但
            {usd(BUDGET)} 不够买下所有的保险……那么，Ben 要保障哪些呢？
          </p>
        ) : es ? (
          <p>
            El presupuesto de Ben sobrevivió a la Parte 1 — el viaje a la playa es <strong>este mes</strong>, y
            sí, la iguana es oficialmente parte de la familia. Ahora Ben tiene{' '}
            <strong>{usd(BUDGET)}/mes</strong> para primas de seguro. El seguro significa pagar un poco cada
            mes para que un desastre no te cueste MUCHÍSIMO de golpe. Pero {usd(BUDGET)} no alcanza para
            todo… entonces, ¿qué protege Ben?
          </p>
        ) : (
          <p>
            Ben's budget survived Part 1 — the beach trip is <strong>this month</strong>, and yes, the
            iguana is officially part of the family. Now Ben has <strong>{usd(BUDGET)}/month</strong>{' '}
            for insurance premiums. Insurance means paying a little every month so a disaster doesn't
            cost you a LOT all at once. But {usd(BUDGET)} won't cover everything… so what does Ben
            protect?
          </p>
        )}
      </div>

      {/* Running total */}
      <section className="card mt-6 p-4">
        <div className="flex items-center justify-between text-sm" aria-live="polite">
          <p className="font-display font-bold text-ink">
            {usd(premiums)} <span className="font-normal text-pebble">{zh ? '/' : es ? 'de' : 'of'} {usd(BUDGET)}</span>
          </p>
          <p className={`font-display font-bold ${overBudget ? 'text-red-600' : 'text-green-700'}`}>
            {overBudget ? (zh ? `超支 ${usd(-remaining)}！` : es ? `¡${usd(-remaining)} sobre el presupuesto!` : `${usd(-remaining)} over budget!`) : (zh ? `还剩 ${usd(remaining)}` : es ? `${usd(remaining)} restantes` : `${usd(remaining)} left`)}
          </p>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-stone"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={BUDGET}
          aria-valuenow={Math.min(premiums, BUDGET)}
          aria-label={zh ? `已用保费：${usd(premiums)} / ${usd(BUDGET)}` : es ? `Primas usadas: ${usd(premiums)} de ${usd(BUDGET)}` : `Premiums used: ${usd(premiums)} of ${usd(BUDGET)}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-300 ${overBudget ? 'bg-red-500' : 'bg-ink-deep'}`}
            style={{ width: `${Math.min(100, (premiums / BUDGET) * 100)}%` }}
          />
        </div>
      </section>

      {/* Car insurance (radio) */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-ink">
          <Car className="mr-1 inline-block h-5 w-5 align-[-0.2em] text-ink" aria-hidden="true" />{' '}
          {zh ? '汽车保险' : es ? 'Seguro del carro' : 'Car insurance'}
        </h2>
        <p className="text-xs text-pebble">{zh ? '这家人有两辆车——Ben 的车和他妻子的车。' : es ? 'La familia tiene dos carros — el de Ben y el de su esposa.' : "The family has two cars — Ben's and his wife's."}</p>
        <div className="mt-2 space-y-2" role="radiogroup" aria-label={zh ? '汽车保险' : es ? 'Seguro del carro' : 'Car insurance'}>
          {(
            [
              { value: 'none', label: zh ? '不买汽车保险' : es ? 'Sin seguro de carro' : 'No car insurance', note: zh ? '在刀尖上过日子' : es ? 'Viviendo peligrosamente' : 'Living dangerously', cost: 0 },
              { value: 'one', label: zh ? '只保一辆车' : es ? 'Asegurar solo un carro' : 'Insure just one car', note: zh ? '在下面选哪一辆' : es ? 'Elige cuál abajo' : 'Pick which one below', cost: 80 },
              { value: 'both', label: zh ? '两辆车都保' : es ? 'Asegurar ambos carros' : 'Insure both cars', note: zh ? '全车队保障' : es ? 'Cobertura para toda la flota' : 'Full fleet coverage', cost: 120 },
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
                className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition active:scale-[0.98] ${
                  on ? 'border-ink bg-paper-soft shadow-sm' : 'border-stone bg-white hover:border-bff-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                      on ? 'border-ink bg-ink-deep' : 'border-stone bg-white'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">{opt.label}</p>
                    <p className="text-xs text-pebble">{opt.note}</p>
                  </div>
                </div>
                <p className={`font-display text-sm font-bold ${on ? 'text-ink' : 'text-pebble'}`}>
                  {usd(opt.cost)}
                </p>
              </button>
            )
          })}
        </div>
        {car === 'one' && (
          <div
            className="animate-pop-in mt-2 flex gap-2 rounded-xl border border-bff-200 bg-paper-soft p-3"
            role="radiogroup"
            aria-label={zh ? '保哪一辆车' : es ? 'Qué carro asegurar' : 'Which car to insure'}
          >
            {(
              [
                { value: 'ben', label: zh ? 'Ben 的车' : es ? 'El carro de Ben' : "Ben's car" },
                { value: 'wife', label: zh ? '他妻子的车' : es ? 'El carro de su esposa' : "His wife's car" },
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
                      ? 'border-ink bg-ink-deep text-white'
                      : 'border-stone bg-white text-ink hover:border-bff-300'
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
        <h2 className="font-display text-lg font-bold text-ink">
          {zh ? '其他保障' : es ? 'Otras coberturas' : 'Other coverage'} <span className="text-sm font-normal text-pebble">{zh ? '（点一下来添加或去掉）' : es ? '(toca para agregar o quitar)' : '(tap to add or drop)'}</span>
        </h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {POLICIES.map((p) => {
            const on = policies.has(p.id)
            const PolicyIcon = ITEM_ICONS[p.icon]
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(p.id)}
                className={`flex items-start justify-between gap-2 rounded-xl border-2 px-4 py-3 text-left transition active:scale-[0.98] ${
                  on ? 'border-ink bg-paper-soft shadow-sm' : 'border-stone bg-white hover:border-bff-300'
                }`}
              >
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <PolicyIcon className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                    {zh ? p.labelZh : es ? p.labelEs : p.label}
                  </p>
                  <p className="mt-0.5 text-xs text-pebble">{zh ? p.noteZh : es ? p.noteEs : p.note}</p>
                </div>
                <div className="text-right">
                  <p className={`font-display text-sm font-bold ${on ? 'text-ink' : 'text-pebble'}`}>
                    {usd(p.cost)}
                  </p>
                  <p className={`text-xs font-semibold ${on ? 'text-ink' : 'text-pebble'}`}>
                    {on ? (
                      <>
                        {zh ? '已投保' : es ? 'Asegurado' : 'Insured'} <Check className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" />
                      </>
                    ) : (
                      zh ? '未保障' : es ? 'Sin cobertura' : 'Not covered'
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
          {zh ? '确定保障方案' : es ? 'Confirmar cobertura' : 'Lock in coverage'}
        </button>
        {overBudget && (
          <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
            {zh
              ? `Ben 超出了他 ${usd(BUDGET)} 的保险预算 ${usd(-remaining)}——先去掉一些吧。`
              : es
              ? `Ben está ${usd(-remaining)} sobre su presupuesto de seguro de ${usd(BUDGET)} — quita algo primero.`
              : `Ben is ${usd(-remaining)} over his ${usd(BUDGET)} insurance budget — drop something first.`}
          </p>
        )}
      </div>
    </div>
  )
}

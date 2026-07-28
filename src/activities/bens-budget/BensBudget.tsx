import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wallet, Info, Check } from 'lucide-react'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

// ---------- The official numbers (from the BFF of America paper activity) ----------

const INCOME = 3200

interface NeedItem {
  label: string
  labelEs: string
  labelZh: string
  cost: number
  note?: string
  noteEs?: string
  noteZh?: string
}

const NEEDS: NeedItem[] = [
  { label: 'Rent', labelEs: 'Renta', labelZh: '房租', cost: 1200 },
  { label: 'Groceries', labelEs: 'Comida', labelZh: '食品杂货', cost: 600 },
  { label: 'Water & electricity', labelEs: 'Agua y electricidad', labelZh: '水电费', cost: 275, note: 'Winter bill — higher than usual', noteEs: 'Cuenta de invierno — más alta de lo normal', noteZh: '冬季账单——比平时高' },
  { label: 'Car payment', labelEs: 'Pago del carro', labelZh: '汽车贷款', cost: 400 },
  { label: 'Gas', labelEs: 'Gasolina', labelZh: '汽油', cost: 175 },
]

const NEEDS_TOTAL = NEEDS.reduce((sum, n) => sum + n.cost, 0)

interface ChoiceItem {
  id: string
  emoji: string
  label: string
  labelEs: string
  labelZh: string
  cost: number
  note: string
  noteEs: string
  noteZh: string
}

const CHOICES: ChoiceItem[] = [
  {
    id: 'credit-card',
    emoji: '💳',
    label: 'Credit card minimum payment',
    labelEs: 'Pago mínimo de la tarjeta de crédito',
    labelZh: '信用卡最低还款',
    cost: 30,
    note: 'He owes $300 total',
    noteEs: 'Debe $300 en total',
    noteZh: '他一共欠 $300',
  },
  {
    id: 'allergy-meds',
    emoji: '🤧',
    label: "Daughter's allergy medicine",
    labelEs: 'Medicina para la alergia de su hija',
    labelZh: '女儿的过敏药',
    cost: 45,
    note: 'Symptoms are mild… for now',
    noteEs: 'Los síntomas son leves… por ahora',
    noteZh: '症状很轻……目前来说',
  },
  {
    id: 'guitar',
    emoji: '🎸',
    label: "Son's optional guitar lesson",
    labelEs: 'Clase opcional de guitarra de su hijo',
    labelZh: '儿子的选修吉他课',
    cost: 50,
    note: 'Concert in two months',
    noteEs: 'Concierto en dos meses',
    noteZh: '两个月后有演出',
  },
  {
    id: 'heater',
    emoji: '🔧',
    label: 'Car heater repair',
    labelEs: 'Reparación de la calefacción del carro',
    labelZh: '汽车暖气维修',
    cost: 150,
    note: 'Car runs, but the mornings are freezing',
    noteEs: 'El carro funciona, pero las mañanas son heladas',
    noteZh: '车能开，但早上冷得要命',
  },
  {
    id: 'iguana',
    emoji: '🦎',
    label: 'Pet iguana',
    labelEs: 'Iguana de mascota',
    labelZh: '宠物鬣蜥',
    cost: 90,
    note: 'All the kids want it, mom is fine with it',
    noteEs: 'Todos los niños la quieren y a mamá le parece bien',
    noteZh: '孩子们都想要，妈妈也不反对',
  },
  {
    id: 'soccer',
    emoji: '⚽',
    label: 'Soccer registration (13-year-old)',
    labelEs: 'Inscripción de fútbol (el de 13 años)',
    labelZh: '足球报名费（13 岁的孩子）',
    cost: 100,
    note: 'The fee went up this year',
    noteEs: 'La cuota subió este año',
    noteZh: '今年费用涨了',
  },
  {
    id: 'sneakers',
    emoji: '👟',
    label: 'New sneakers (9-year-old)',
    labelEs: 'Tenis nuevos (el de 9 años)',
    labelZh: '新运动鞋（9 岁的孩子）',
    cost: 75,
    note: 'Current pair is falling apart',
    noteEs: 'El par actual se está cayendo a pedazos',
    noteZh: '现在这双快穿烂了',
  },
  {
    id: 'supplies',
    emoji: '✏️',
    label: "Classroom supplies for Ben's school",
    labelEs: 'Útiles para el salón de la escuela de Ben',
    labelZh: 'Ben 学校教室的用品',
    cost: 25,
    note: 'Teachers often cover these themselves',
    noteEs: 'Muchas veces los maestros los pagan de su bolsillo',
    noteZh: '老师常常得自掏腰包',
  },
  {
    id: 'dinner',
    emoji: '🍝',
    label: 'Family dinner out',
    labelEs: 'Cena en familia fuera de casa',
    labelZh: '全家下馆子',
    cost: 65,
    note: 'A night off from cooking',
    noteEs: 'Una noche sin cocinar',
    noteZh: '一晚不用做饭',
  },
  {
    id: 'chipotle',
    emoji: '🌯',
    label: 'Chipotle on the way home',
    labelEs: 'Chipotle camino a casa',
    labelZh: '回家路上买 Chipotle',
    cost: 35,
    note: 'Just Ben. Just a burrito.',
    noteEs: 'Solo Ben. Solo un burrito.',
    noteZh: '就 Ben 一个人。就一个卷饼。',
  },
]

type SavingsAmount = 300 | 200 | 0

const SAVINGS_OPTIONS: { value: SavingsAmount; label: string; labelEs: string; labelZh: string; note: string; noteEs: string; noteZh: string }[] = [
  {
    value: 200,
    label: 'Save $200 for the beach trip',
    labelEs: 'Ahorrar $200 para el viaje a la playa',
    labelZh: '为海滩之旅存 $200',
    note: "This month's goal — keeps the trip on track",
    noteEs: 'La meta de este mes — mantiene el viaje en marcha',
    noteZh: '这个月的目标——让旅行顺利进行',
  },
  {
    value: 300,
    label: 'Save $300',
    labelEs: 'Ahorrar $300',
    labelZh: '存 $300',
    note: 'Adds the theme park trip!',
    noteEs: '¡Agrega el viaje al parque de diversiones!',
    noteZh: '还能加上主题公园之旅！',
  },
  {
    value: 0,
    label: 'Save nothing',
    labelEs: 'No ahorrar nada',
    labelZh: '一分不存',
    note: 'The beach can wait… right?',
    noteEs: 'La playa puede esperar… ¿verdad?',
    noteZh: '海滩可以再等等……对吧？',
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

function computeResults(picked: ReadonlySet<string>, saved: SavingsAmount, es: boolean, zh: boolean): Results {
  const has = (id: string) => picked.has(id)
  const lines: FeedbackLine[] = []

  // Savings
  if (saved === 300) {
    lines.push({ points: 25, text: zh ? '海滩之旅和主题公园都稳了——孩子们乐坏了。' : es ? 'Viaje a la playa Y parque de diversiones asegurados — los niños están felices.' : 'Beach trip AND theme park secured — the kids are thrilled.', tone: 'good' })
  } else if (saved === 200) {
    lines.push({ points: 18, text: zh ? '海滩之旅顺利进行（没有主题公园，但大海是免费的）。' : es ? 'Viaje a la playa en marcha (sin parque de diversiones, pero el mar es gratis).' : 'Beach trip on track (no theme park, but the ocean is free).', tone: 'good' })
  } else {
    lines.push({ points: 0, text: zh ? '海滩之旅这个月泡汤了……' : es ? 'El viaje a la playa se escapa este mes…' : 'The beach trip slips away this month…', tone: 'warn' })
  }

  // Credit card minimum
  if (has('credit-card')) {
    lines.push({ points: 15, text: zh ? '你避开了滞纳金，也保住了 Ben 的信用分。' : es ? 'Evitaste recargos por mora y protegiste el puntaje de crédito de Ben.' : "You avoided late fees and protected Ben's credit score.", tone: 'good' })
  } else {
    lines.push({
      points: 0,
      text: zh
        ? '没交最低还款 → 滞纳金 + 信用分受损。这一项以后会很贵。'
        : es
        ? 'Pago mínimo no realizado → recargo por mora + daño al puntaje de crédito. Este sale caro después.'
        : "Missed minimum payment → late fee + credit score damage. This one's expensive later.",
      tone: 'warn',
    })
  }

  // Heater
  if (has('heater')) {
    lines.push({ points: 10, text: zh ? '趁暖气还没变成 $400 的大问题就修好了——聪明。' : es ? 'Calefacción arreglada antes de que se convierta en un problema de $400 — inteligente.' : 'Heater fixed before it becomes a $400 problem — smart.', tone: 'good' })
  } else {
    lines.push({ points: 5, text: zh ? '跳过暖气有点冒险，但还扛得住——寒冷的早晨磨炼意志？' : es ? 'Saltarse la calefacción es arriesgado, pero se puede sobrevivir — ¿las mañanas frías forjan el carácter?' : 'Skipping the heater is risky, but survivable — cold mornings build character?', tone: 'neutral' })
  }

  // Sneakers
  if (has('sneakers')) {
    lines.push({ points: 8, text: zh ? '快穿烂的鞋已经从"想要"变成了"需要"。' : es ? 'Los zapatos rotos se estaban convirtiendo en una necesidad, no en un deseo.' : 'Falling-apart shoes were becoming a need, not a want.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: zh ? '9 岁孩子的运动鞋再撑一个月。胶带也算一种时尚，对吧？' : es ? 'Los tenis del de 9 años aguantan otro mes más. La cinta adhesiva es un estilo de moda, ¿no?' : "The 9-year-old's sneakers flap on for another month. Duct tape is a fashion statement, right?", tone: 'neutral' })
  }

  // Soccer
  if (has('soccer')) {
    lines.push({ points: 8, text: zh ? '13 岁的孩子留在队里——信守了承诺。' : es ? 'El de 13 años se queda en el equipo — compromiso cumplido.' : 'The 13-year-old stays on the team — commitment honored.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: zh ? '跳过足球很难受——对 Ben 来说这是一次艰难的饭桌谈话。' : es ? 'Saltarse el fútbol duele — es una conversación difícil en la mesa para Ben.' : "Skipping soccer stings — that's a hard dinner-table conversation for Ben.", tone: 'neutral' })
  }

  // Allergy meds — judgment call either way
  if (has('allergy-meds')) {
    lines.push({ points: 6, text: zh ? '症状很轻，但提前应对春季过敏是个合理的决定。' : es ? 'Los síntomas son leves, pero adelantarse a las alergias de primavera es una decisión razonable.' : 'Symptoms are mild, but staying ahead of spring allergies is a fair call.', tone: 'good' })
  } else {
    lines.push({ points: 6, text: zh ? '症状既然很轻，暂缓买药也是个说得过去的判断——只是留意着点她。' : es ? 'Con síntomas leves, esperar con la medicina es una decisión válida — solo mantenla vigilada.' : 'With mild symptoms, waiting on the meds is a real judgment call — just keep an eye on her.', tone: 'neutral' })
  }

  // Guitar
  if (has('guitar')) {
    lines.push({ points: 5, text: zh ? '吉他课订好了——演出的准备继续进行。' : es ? 'Clase de guitarra reservada — la preparación para el concierto sigue en marcha.' : 'Guitar lesson booked — concert prep stays on track.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: zh ? '这个月没课——演出前他可以在家练。' : es ? 'Sin clase este mes — puede practicar en casa hasta el concierto.' : 'No lesson this month — he can practice at home till the concert.', tone: 'neutral' })
  }

  // Classroom supplies
  if (has('supplies')) {
    lines.push({ points: 5, text: zh ? '教室用品搞定了——Ben 的学生（还有 Ben）都很感激。' : es ? 'Útiles del salón cubiertos — los estudiantes de Ben (y Ben) lo agradecen.' : "Classroom supplies covered — Ben's students (and Ben) say thanks.", tone: 'good' })
  } else {
    lines.push({ points: 0, text: zh ? '教室这个月先将就一下。' : es ? 'El salón se las arregla este mes.' : 'The classroom makes do this month.', tone: 'neutral' })
  }

  // Dinner out
  if (has('dinner')) {
    lines.push({ points: 3, text: zh ? '全家下馆子——一家人的时光很重要。' : es ? 'Cena en familia fuera — el tiempo en familia importa.' : 'Family dinner out — family time matters.', tone: 'good' })
  } else {
    lines.push({ points: 0, text: zh ? '那就在家做饭吧——海滩基金谢谢你。' : es ? 'Comida casera será — el fondo de la playa lo agradece.' : 'Home-cooked it is — the beach fund thanks you.', tone: 'neutral' })
  }

  // Chipotle
  if (has('chipotle')) {
    lines.push({ points: 2, text: zh ? '成功买到 Chipotle。小确幸！' : es ? 'Chipotle adquirido. ¡Pequeñas alegrías!' : 'Chipotle acquired. Small joys!', tone: 'good' })
  } else {
    lines.push({ points: 0, text: zh ? '那个溜走的卷饼。' : es ? 'El burrito que se escapó.' : 'The burrito that got away.', tone: 'neutral' })
  }

  // Iguana
  if (has('iguana')) {
    lines.push({ points: 0, text: zh ? '鬣蜥加入了这个家。剧透：鬣蜥会让保险变复杂。' : es ? 'La iguana se une a la familia. Presagio: las iguanas complican los seguros.' : 'The iguana joins the family. Foreshadowing: iguanas complicate insurance.', tone: 'neutral' })
  } else {
    lines.push({ points: 5, text: zh ? '在手头紧的月份养一只 $90/月 的宠物——明智地放弃了。' : es ? 'Una mascota de $90/mes en un mes ajustado — sabio dejarla pasar.' : 'A $90/month pet on a tight month — wise pass.', tone: 'good' })
  }

  // Under budget (submit is blocked while over, so this always lands)
  const choicesTotal = CHOICES.reduce((sum, c) => sum + (has(c.id) ? c.cost : 0), 0)
  const spent = NEEDS_TOTAL + choicesTotal + saved
  if (spent <= INCOME) {
    lines.push({ points: 10, text: zh ? '控制在 $3,200 以内——Ben 的预算真的平衡了。' : es ? 'Te mantuviste bajo los $3,200 — el presupuesto de Ben realmente cuadra.' : "Stayed under $3,200 — Ben's budget actually balances.", tone: 'good' })
  }

  const score = Math.min(100, lines.reduce((sum, l) => sum + l.points, 0))
  const [grade, gradeEmoji] =
    score >= 85
      ? [zh ? '预算大师' : es ? 'Jefe del Presupuesto' : 'Budget Boss', '👑']
      : score >= 65
        ? [zh ? '理财能手' : es ? 'Administrador de Dinero' : 'Money Manager', '💪']
        : score >= 40
          ? [zh ? '正在入门' : es ? 'Aprendiendo el Oficio' : 'Learning the Ropes', '🧗']
          : [zh ? '回到起点重来' : es ? 'De Vuelta a la Mesa de Dibujo' : 'Back to the Drawing Board', '📝']

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
  const zh = lang === 'zh'
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
    const r = computeResults(picked, saved, es, zh)
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
              {zh ? '已花' : es ? 'Gastado' : 'Spent'} {usd(results.spent - results.saved)} {zh ? '/' : es ? 'de' : 'of'} {usd(INCOME)}
            </span>
            <span className="chip bg-bff-50 text-bff-700">{zh ? '已存' : es ? 'Ahorrado' : 'Saved'} {usd(results.saved)}</span>
            <span className="chip bg-slate-100 text-slate-700">{zh ? '剩余' : es ? 'Sobrante' : 'Left over'} {usd(leftover)}</span>
          </div>
        </div>

        <div className="card mt-4 space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900">{zh ? 'Ben 这个月过得如何' : es ? 'Cómo le fue a Ben este mes' : "How Ben's month played out"}</h2>
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
            <span aria-hidden="true">🗣️</span> {zh ? '反思' : es ? 'Reflexión' : 'Reflection'}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {zh ? '准备好解释你保留了什么、砍掉了什么，以及为什么。' : es ? 'Prepárate para explicar qué conservaste, qué recortaste y por qué.' : 'Be ready to explain what you kept, what you cut, and why.'}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>{zh ? '哪一项砍得最艰难，是什么让它这么难？' : es ? '¿Cuál recorte fue el más difícil de hacer, y qué lo hizo difícil?' : 'Which cut was the hardest to make, and what made it hard?'}</li>
            <li>
              {zh
                ? '运动鞋一开始是"想要"，后来慢慢变成了"需要"。Ben 清单上还有什么会随着时间从一个类别变成另一个类别？'
                : es
                ? 'Los tenis empezaron como un "deseo" y se fueron acercando a una "necesidad". ¿Qué más en la lista de Ben podría cambiar de categoría con el tiempo?'
                : 'The sneakers started as a "want" and drifted toward a "need." What else on Ben\'s list could switch categories over time?'}
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            {zh ? '再试一次' : es ? 'Intentar de nuevo' : 'Try again'}
          </button>
          <Link to="/challenge/bens-insurance" className="btn-primary">
            {zh ? '第 2 部分：Ben 需要保险 →' : es ? 'Parte 2: Ben necesita un seguro →' : 'Part 2: Ben needs insurance →'}
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Builder view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? 'Ben 理财冒险的第 1 部分' : es ? 'Parte 1 de la aventura financiera de Ben' : "Part 1 of Ben's money adventure"}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          <Wallet className="mr-2 inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />
          {zh ? (
            <>Ben 的预算<em>挑战</em></>
          ) : es ? (
            <>El Reto del <em>Presupuesto</em> de Ben</>
          ) : (
            <>Ben's Budget <em>Challenge</em></>
          )}
        </h1>
      </header>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        {zh ? (
          <p>
            来认识一下 <strong>Ben</strong>：36 岁，初中科学老师，已婚，有三个孩子（5 岁、9 岁和 13
            岁）。税后，每个月有 <strong>{usd(INCOME)}</strong> 进他的账户。全家的梦想：<strong>3
            个月后的海滩之旅</strong>，也就是要一共存 <strong>$900——这个月存 $300</strong>。你的任务：决定每一块钱花在哪里。
          </p>
        ) : es ? (
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
          <Info className="mr-1 inline-block h-3.5 w-3.5 align-[-0.15em] text-bff-600" aria-hidden="true" />{' '}
          {zh
            ? `医疗保险（$300/月）已经从 Ben 的工资里扣掉了——这一项已经搞定，不算在这 ${usd(INCOME)} 里面。`
            : es
            ? `El seguro médico ($300/mes) ya se descuenta del cheque de Ben — está resuelto y no cuenta contra los ${usd(INCOME)}.`
            : `Health insurance ($300/month) is already deducted from Ben's paycheck — it's handled and doesn't count against the ${usd(INCOME)}.`}
        </p>
      </div>

      {/* Needs */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-slate-900">
          {zh ? '必需开支' : es ? 'Las necesidades' : 'The needs'} <span className="text-sm font-normal text-slate-500">{zh ? '（固定——Ben 跳不过这些）' : es ? '(fijas — Ben no puede saltárselas)' : "(locked in — Ben can't skip these)"}</span>
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
                  className="flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-slate-300 text-white"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-600">{zh ? n.labelZh : es ? n.labelEs : n.label}</p>
                  {n.note && <p className="text-xs text-slate-600">{zh ? n.noteZh : es ? n.noteEs : n.note}</p>}
                </div>
              </div>
              <p className="font-display text-sm font-bold text-slate-600">{usd(n.cost)}</p>
            </div>
          ))}
          <p className="text-right text-xs font-semibold text-slate-500">
            {zh ? '必需开支合计：' : es ? 'Total de necesidades:' : 'Needs total:'} {usd(NEEDS_TOTAL)}
          </p>
        </div>
      </section>

      {/* Running budget bar */}
      <section className="card mt-6 p-4">
        <div className="flex items-center justify-between text-sm" aria-live="polite">
          <p className="font-display font-bold text-slate-900">
            {usd(spent)} <span className="font-normal text-slate-500">{zh ? '/' : es ? 'de' : 'of'} {usd(INCOME)}</span>
          </p>
          <p className={`font-display font-bold ${overBudget ? 'text-red-600' : 'text-green-700'}`}>
            {overBudget ? (zh ? `超支 ${usd(-remaining)}！` : es ? `¡${usd(-remaining)} sobre el presupuesto!` : `${usd(-remaining)} over budget!`) : (zh ? `还剩 ${usd(remaining)}` : es ? `${usd(remaining)} restantes` : `${usd(remaining)} left`)}
          </p>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={INCOME}
          aria-valuenow={Math.min(spent, INCOME)}
          aria-label={zh ? `已用预算：${usd(spent)} / ${usd(INCOME)}` : es ? `Presupuesto usado: ${usd(spent)} de ${usd(INCOME)}` : `Budget used: ${usd(spent)} of ${usd(INCOME)}`}
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
          {zh ? '可选开支' : es ? 'Las opciones' : 'The choices'} <span className="text-sm font-normal text-slate-500">{zh ? '（点一下来保留或砍掉）' : es ? '(toca para conservar o recortar)' : '(tap to keep or cut)'}</span>
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
                className={`flex items-start justify-between gap-2 rounded-xl border-2 px-4 py-3 text-left transition active:scale-[0.98] ${
                  on
                    ? 'border-bff-500 bg-bff-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-bff-300'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    <span className="mr-1" aria-hidden="true">{c.emoji}</span>
                    {zh ? c.labelZh : es ? c.labelEs : c.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">{zh ? c.noteZh : es ? c.noteEs : c.note}</p>
                </div>
                <div className="text-right">
                  <p className={`font-display text-sm font-bold ${on ? 'text-bff-700' : 'text-slate-500'}`}>
                    {usd(c.cost)}
                  </p>
                  <p className={`text-xs font-semibold ${on ? 'text-bff-700' : 'text-slate-500'}`}>
                    {on ? (
                      <>
                        {zh ? '购买' : es ? 'Comprando' : 'Buying'} <Check className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" />
                      </>
                    ) : (
                      zh ? '跳过' : es ? 'Omitido' : 'Skipped'
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
          <span aria-hidden="true">🏖️</span> {zh ? '海滩基金' : es ? 'El fondo para la playa' : 'The beach fund'}
        </h2>
        <div className="mt-2 space-y-2" role="radiogroup" aria-label={zh ? '存钱选择' : es ? 'Elección de ahorro' : 'Savings choice'}>
          {SAVINGS_OPTIONS.map((opt) => {
            const on = saved === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSaved(opt.value)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition active:scale-[0.98] ${
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
                    <p className="text-sm font-semibold text-slate-800">{zh ? opt.labelZh : es ? opt.labelEs : opt.label}</p>
                    <p className="text-xs text-slate-600">{zh ? opt.noteZh : es ? opt.noteEs : opt.note}</p>
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
          {zh ? '确定 Ben 的预算' : es ? 'Confirmar el presupuesto de Ben' : "Lock in Ben's budget"}
        </button>
        {overBudget && (
          <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
            {zh
              ? `Ben 超支了 ${usd(-remaining)}——确定之前先砍掉一些东西。`
              : es
              ? `Ben está ${usd(-remaining)} sobre el presupuesto — recorta algo antes de confirmar.`
              : `Ben is ${usd(-remaining)} over budget — cut something before locking in.`}
          </p>
        )}
        {!overBudget && saved === null && (
          <p className="mt-2 text-sm text-slate-500">{zh ? '选一个海滩基金的选项来完成。' : es ? 'Elige una opción del fondo para la playa para terminar.' : 'Pick a beach fund option to finish.'}</p>
        )}
      </div>
    </div>
  )
}

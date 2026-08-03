// The activity catalog. Assignments and progress reference activities by slug,
// so new activities added here automatically appear everywhere (library,
// admin assignment picker, progress views).

import type { IconName } from './icons'

export type ActivityKind = 'lesson' | 'elective' | 'challenge' | 'game'

export interface ActivityMeta {
  slug: string
  kind: ActivityKind
  title: string
  /** Key into the central icon registry (src/lib/icons.tsx). No emoji. */
  icon: IconName
  description: string
  durationMin: number
  path: string
  /** Week/day ordering for lessons; games/challenges use sortKey 100+. */
  sortKey: number
}

export const LESSON_SLUGS = [
  'earning-income',
  'spending-budgeting',
  'saving-investing',
  'credit-debt',
  'risk-insurance',
  'financial-decision-making',
  'financial-planning',
  'consumer-protection',
] as const

const lessonMeta: Array<[string, string, IconName, string, number, number]> = [
  // slug, title, icon, description, week, day
  ['earning-income', 'Earning Income', 'briefcase', 'Paychecks, careers, taxes, and how money is earned.', 1, 1],
  ['spending-budgeting', 'Spending & Budgeting', 'cart', 'Needs vs. wants and building a budget that works.', 1, 2],
  ['saving-investing', 'Saving & Investing', 'growth', 'Why saving early wins, and how investing grows money.', 2, 1],
  ['credit-debt', 'Credit & Debt', 'card', 'Credit scores, borrowing, and staying out of debt traps.', 2, 2],
  ['risk-insurance', 'Risk Management & Insurance', 'shield', 'Protecting yourself and your money from the unexpected.', 3, 1],
  ['financial-decision-making', 'Financial Decision-Making', 'brain', 'Making smart money choices with real decision tools.', 3, 2],
  ['financial-planning', 'Financial Planning', 'map', 'Setting goals and building a plan for your financial future.', 4, 1],
  ['consumer-protection', 'Consumer Protection', 'detective', 'Spotting scams, fraud, and knowing your rights.', 4, 2],
]

export const ACTIVITIES: ActivityMeta[] = [
  ...lessonMeta.map(([slug, title, icon, description, week, day]) => ({
    slug,
    kind: 'lesson' as const,
    title,
    icon,
    description,
    durationMin: 20,
    path: `/lessons/${slug}`,
    sortKey: week * 10 + day,
  })),
  {
    slug: 'wolf-of-wall-street',
    kind: 'game',
    title: 'Wolf of Wall Street',
    icon: 'market',
    description:
      'Invest $1,000 across 12 companies, react to breaking news, and survive the market. Play solo or live with your class.',
    durationMin: 25,
    path: '/wolf',
    sortKey: 101,
  },
  {
    slug: 'bens-budget',
    kind: 'challenge',
    title: "Ben's Situation",
    icon: 'home',
    description:
      'Help Ben (middle school teacher, 3 kids, tight budget) survive the month and still save for the beach trip.',
    durationMin: 15,
    path: '/challenge/bens-budget',
    sortKey: 102,
  },
  {
    slug: 'bens-insurance',
    kind: 'challenge',
    title: "Ben's Insurance Situation",
    icon: 'umbrella',
    description:
      'Ben has $500 for insurance. Choose his coverage, then find out what the month throws at his family.',
    durationMin: 10,
    path: '/challenge/bens-insurance',
    sortKey: 103,
  },
  {
    slug: 'paystub-detective',
    kind: 'challenge',
    title: 'Paystub Detective',
    icon: 'receipt',
    description:
      'Three paystubs, planted errors. Find every mistake before someone loses money. It pays to check your pay.',
    durationMin: 10,
    path: '/challenge/paystub-detective',
    sortKey: 104,
  },
  {
    slug: 'credit-score-sim',
    kind: 'challenge',
    title: 'Credit Score Builder',
    icon: 'gauge',
    description:
      'Ten months of real-life credit decisions. Watch your score climb, or crater, with every choice.',
    durationMin: 12,
    path: '/challenge/credit-score',
    sortKey: 105,
  },
  {
    slug: 'scam-spotter',
    kind: 'challenge',
    title: 'Scam Spotter',
    icon: 'alert',
    description:
      'Eight messages hit your inbox. Some are real, some are scams. Can you spot every red flag?',
    durationMin: 10,
    path: '/challenge/scam-spotter',
    sortKey: 106,
  },
  {
    slug: 'smart-shopper',
    kind: 'challenge',
    title: 'Smart Shopper',
    icon: 'store',
    description:
      'Six head-to-head deals where the shelf tag lies. Do the math, beat the marketing.',
    durationMin: 8,
    path: '/challenge/smart-shopper',
    sortKey: 107,
  },
  {
    slug: 'goal-getter',
    kind: 'challenge',
    title: 'Goal Getter',
    icon: 'target',
    description:
      'Three savings goals, $200 a month, and life keeps happening. Allocate wisely and hit every deadline.',
    durationMin: 12,
    path: '/challenge/goal-getter',
    sortKey: 108,
  },
  // Bonus elective units — off the core path, self-paced deep dives.
  ...(
    [
      ['first-paycheck', 'Your First Paycheck', 'receipt', 'Decode a real paystub: gross vs. net, taxes, FICA, and catching errors.', 1],
      ['taxes-deep-dive', 'Taxes Deep-Dive', 'landmark', 'Where taxes go, how brackets really work, and why refunds happen.', 2],
      ['paying-for-college', 'Paying for College', 'college', 'FAFSA, grants, scholarships, loans, and how to compare offers like a pro.', 3],
      ['entrepreneurship', 'Entrepreneurship & Side Hustles', 'rocket', 'Turn a skill into income: pricing, profit, and your first business.', 4],
      ['crypto-and-scams', 'Crypto & Modern Money Traps', 'crypto', 'Crypto, hype, betting, and BNPL, spot the traps before they cost you.', 5],
    ] as Array<[string, string, IconName, string, number]>
  ).map(([slug, title, icon, description, day]) => ({
    slug,
    kind: 'elective' as const,
    title,
    icon,
    description,
    durationMin: 15,
    path: `/lessons/${slug}`,
    sortKey: 200 + day,
  })),
]

export function getActivity(slug: string): ActivityMeta | undefined {
  return ACTIVITIES.find((a) => a.slug === slug)
}

export const KIND_LABEL: Record<ActivityKind, string> = {
  lesson: 'Lesson',
  elective: 'Elective',
  challenge: 'Challenge',
  game: 'Game',
}

const KIND_LABEL_ES: Record<ActivityKind, string> = {
  lesson: 'Lección',
  elective: 'Electiva',
  challenge: 'Desafío',
  game: 'Juego',
}

const KIND_LABEL_ZH: Record<ActivityKind, string> = {
  lesson: '课程',
  elective: '选修',
  challenge: '挑战',
  game: '游戏',
}

type ActLang = 'en' | 'es' | 'zh'

/** Localized label for an activity kind. */
export function kindLabel(kind: ActivityKind, lang: ActLang): string {
  const table = lang === 'es' ? KIND_LABEL_ES : lang === 'zh' ? KIND_LABEL_ZH : KIND_LABEL
  return table[kind]
}

// Spanish titles/descriptions for every activity, keyed by slug. Titles that are
// proper nouns (e.g. "Wolf of Wall Street") intentionally stay in English.
const ACTIVITY_ES: Record<string, { title?: string; description: string }> = {
  'earning-income': {
    title: 'Ganar Ingresos',
    description: 'Cheques de pago, carreras, impuestos y cómo se gana el dinero.',
  },
  'spending-budgeting': {
    title: 'Gastos y Presupuesto',
    description: 'Necesidades vs. deseos y cómo crear un presupuesto que funcione.',
  },
  'saving-investing': {
    title: 'Ahorrar e Invertir',
    description: 'Por qué ahorrar temprano gana, y cómo invertir hace crecer el dinero.',
  },
  'credit-debt': {
    title: 'Crédito y Deudas',
    description: 'Puntajes de crédito, préstamos y cómo evitar las trampas de la deuda.',
  },
  'risk-insurance': {
    title: 'Gestión de Riesgos y Seguros',
    description: 'Protegerte a ti y a tu dinero de lo inesperado.',
  },
  'financial-decision-making': {
    title: 'Toma de Decisiones Financieras',
    description: 'Tomar decisiones inteligentes de dinero con herramientas reales.',
  },
  'financial-planning': {
    title: 'Planificación Financiera',
    description: 'Fijar metas y crear un plan para tu futuro financiero.',
  },
  'consumer-protection': {
    title: 'Protección al Consumidor',
    description: 'Detectar estafas, fraudes y conocer tus derechos.',
  },
  'wolf-of-wall-street': {
    description:
      'Invierte $1,000 en 12 empresas, reacciona a las noticias de última hora y sobrevive al mercado. Juega solo o en vivo con tu clase.',
  },
  'bens-budget': {
    title: 'La Situación de Ben',
    description:
      'Ayuda a Ben (maestro de secundaria, 3 hijos, presupuesto ajustado) a sobrevivir el mes y aun así ahorrar para el viaje a la playa.',
  },
  'bens-insurance': {
    title: 'La Situación de Seguros de Ben',
    description:
      'Ben tiene $500 para seguros. Elige su cobertura y descubre lo que el mes le depara a su familia.',
  },
  'paystub-detective': {
    title: 'Detective de Cheques',
    description:
      'Tres cheques de pago, errores escondidos. Encuentra cada error antes de que alguien pierda dinero: revisar tu pago vale la pena.',
  },
  'credit-score-sim': {
    title: 'Constructor de Puntaje de Crédito',
    description:
      'Diez meses de decisiones de crédito de la vida real. Observa cómo tu puntaje sube (o se desploma) con cada decisión.',
  },
  'scam-spotter': {
    title: 'Cazador de Estafas',
    description:
      'Ocho mensajes llegan a tu bandeja. Algunos son reales, otros son estafas. ¿Puedes detectar cada señal de alerta?',
  },
  'smart-shopper': {
    title: 'Comprador Inteligente',
    description: 'Seis ofertas frente a frente donde la etiqueta engaña. Haz las cuentas y vence al marketing.',
  },
  'goal-getter': {
    title: 'Cazador de Metas',
    description:
      'Tres metas de ahorro, $200 al mes, y la vida no para. Distribuye con astucia y cumple cada fecha límite.',
  },
  'first-paycheck': {
    title: 'Tu Primer Cheque de Pago',
    description: 'Descifra un cheque real: bruto vs. neto, impuestos, FICA y cómo detectar errores.',
  },
  'taxes-deep-dive': {
    title: 'Impuestos a Fondo',
    description: 'Adónde van los impuestos, cómo funcionan los tramos y por qué existen los reembolsos.',
  },
  'paying-for-college': {
    title: 'Pagar la Universidad',
    description: 'FAFSA, becas, subvenciones, préstamos y cómo comparar ofertas como un profesional.',
  },
  entrepreneurship: {
    title: 'Emprendimiento y Trabajos Extra',
    description: 'Convierte una habilidad en ingresos: precios, ganancias y tu primer negocio.',
  },
  'crypto-and-scams': {
    title: 'Cripto y Trampas Modernas del Dinero',
    description:
      "Cripto, exageración, apuestas y 'compra ahora, paga después': detecta las trampas antes de que te cuesten.",
  },
}

// Simplified Chinese titles/descriptions, keyed by slug. Proper-noun titles
// (e.g. "Wolf of Wall Street") intentionally stay in English.
const ACTIVITY_ZH: Record<string, { title?: string; description: string }> = {
  'earning-income': {
    title: '赚取收入',
    description: '工资单、职业、税收，以及金钱是如何赚来的。',
  },
  'spending-budgeting': {
    title: '消费与预算',
    description: '需要与想要，以及制定一个真正可行的预算。',
  },
  'saving-investing': {
    title: '储蓄与投资',
    description: '为什么及早储蓄更有利，以及投资如何让钱增值。',
  },
  'credit-debt': {
    title: '信用与债务',
    description: '信用评分、借贷，以及远离债务陷阱。',
  },
  'risk-insurance': {
    title: '风险管理与保险',
    description: '保护你自己和你的钱免受意外冲击。',
  },
  'financial-decision-making': {
    title: '理财决策',
    description: '用实用的决策工具做出明智的金钱选择。',
  },
  'financial-planning': {
    title: '财务规划',
    description: '设定目标，为你的财务未来制定计划。',
  },
  'consumer-protection': {
    title: '消费者保护',
    description: '识别骗局、欺诈，并了解你的权利。',
  },
  'wolf-of-wall-street': {
    description: '用 $1,000 投资 12 家公司，应对突发新闻，在市场中生存。可单人游玩或与全班实时对战。',
  },
  'bens-budget': {
    title: '本的处境',
    description: '帮助本（中学老师，三个孩子，预算紧张）熬过这个月，同时还能为海滩之旅存钱。',
  },
  'bens-insurance': {
    title: '本的保险难题',
    description: '本有 $500 用于保险。为他选择保障，然后看看这个月给他一家带来了什么。',
  },
  'paystub-detective': {
    title: '工资单侦探',
    description: '三张工资单，暗藏错误。在有人损失金钱之前找出每个错误，核对工资很值得。',
  },
  'credit-score-sim': {
    title: '信用评分养成',
    description: '十个月真实的信用决策。看着你的分数随每个选择上升，或暴跌。',
  },
  'scam-spotter': {
    title: '骗局识别器',
    description: '八条消息涌入你的收件箱。有些是真的，有些是骗局。你能识别出每个危险信号吗？',
  },
  'smart-shopper': {
    title: '精明购物者',
    description: '六组正面交锋的优惠，货架标签会骗人。算清账，战胜营销套路。',
  },
  'goal-getter': {
    title: '目标达人',
    description: '三个储蓄目标，每月 $200，而生活总有意外。明智分配，按时达成每个目标。',
  },
  'first-paycheck': {
    title: '你的第一张工资单',
    description: '读懂真实工资单：税前与税后、税收、FICA，以及如何发现错误。',
  },
  'taxes-deep-dive': {
    title: '税收深入解析',
    description: '税收去了哪里，税率档次如何运作，以及为什么会有退税。',
  },
  'paying-for-college': {
    title: '支付大学费用',
    description: 'FAFSA、助学金、奖学金、贷款，以及如何像专家一样比较录取方案。',
  },
  entrepreneurship: {
    title: '创业与副业',
    description: '把技能变成收入：定价、利润，以及你的第一份生意。',
  },
  'crypto-and-scams': {
    title: '加密货币与现代金钱陷阱',
    description: '加密货币、炒作、赌博和“先买后付”，在它们让你破财之前识破陷阱。',
  },
}

/** Activity title + description in the active language (English fallback). */
export function localizeActivity(
  meta: ActivityMeta,
  lang: ActLang,
): { title: string; description: string } {
  const table = lang === 'es' ? ACTIVITY_ES : lang === 'zh' ? ACTIVITY_ZH : null
  if (!table) return { title: meta.title, description: meta.description }
  const v = table[meta.slug]
  return {
    title: v?.title ?? meta.title,
    description: v?.description ?? meta.description,
  }
}

// The activity catalog. Assignments and progress reference activities by slug,
// so new activities added here automatically appear everywhere (library,
// admin assignment picker, progress views).

export type ActivityKind = 'lesson' | 'elective' | 'challenge' | 'game'

export interface ActivityMeta {
  slug: string
  kind: ActivityKind
  title: string
  emoji: string
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

const lessonMeta: Array<[string, string, string, string, number, number]> = [
  // slug, title, emoji, description, week, day
  ['earning-income', 'Earning Income', '💼', 'Paychecks, careers, taxes, and how money is earned.', 1, 1],
  ['spending-budgeting', 'Spending & Budgeting', '🛒', 'Needs vs. wants and building a budget that works.', 1, 2],
  ['saving-investing', 'Saving & Investing', '📈', 'Why saving early wins, and how investing grows money.', 2, 1],
  ['credit-debt', 'Credit & Debt', '💳', 'Credit scores, borrowing, and staying out of debt traps.', 2, 2],
  ['risk-insurance', 'Risk Management & Insurance', '🛡️', 'Protecting yourself and your money from the unexpected.', 3, 1],
  ['financial-decision-making', 'Financial Decision-Making', '🧠', 'Making smart money choices with real decision tools.', 3, 2],
  ['financial-planning', 'Financial Planning', '🗺️', 'Setting goals and building a plan for your financial future.', 4, 1],
  ['consumer-protection', 'Consumer Protection', '🕵️', 'Spotting scams, fraud, and knowing your rights.', 4, 2],
]

export const ACTIVITIES: ActivityMeta[] = [
  ...lessonMeta.map(([slug, title, emoji, description, week, day]) => ({
    slug,
    kind: 'lesson' as const,
    title,
    emoji,
    description,
    durationMin: 20,
    path: `/lessons/${slug}`,
    sortKey: week * 10 + day,
  })),
  {
    slug: 'wolf-of-wall-street',
    kind: 'game',
    title: 'Wolf of Wall Street',
    emoji: '🐺',
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
    emoji: '🏠',
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
    emoji: '☂️',
    description:
      'Ben has $500 for insurance. Choose his coverage — then find out what the month throws at his family.',
    durationMin: 10,
    path: '/challenge/bens-insurance',
    sortKey: 103,
  },
  {
    slug: 'paystub-detective',
    kind: 'challenge',
    title: 'Paystub Detective',
    emoji: '🔍',
    description:
      'Three paystubs, planted errors. Find every mistake before someone loses money — it pays to check your pay.',
    durationMin: 10,
    path: '/challenge/paystub-detective',
    sortKey: 104,
  },
  {
    slug: 'credit-score-sim',
    kind: 'challenge',
    title: 'Credit Score Builder',
    emoji: '📊',
    description:
      'Ten months of real-life credit decisions. Watch your score climb — or crater — with every choice.',
    durationMin: 12,
    path: '/challenge/credit-score',
    sortKey: 105,
  },
  {
    slug: 'scam-spotter',
    kind: 'challenge',
    title: 'Scam Spotter',
    emoji: '🚨',
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
    emoji: '🛒',
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
    emoji: '🎯',
    description:
      'Three savings goals, $200 a month, and life keeps happening. Allocate wisely and hit every deadline.',
    durationMin: 12,
    path: '/challenge/goal-getter',
    sortKey: 108,
  },
  // Bonus elective units — off the core path, self-paced deep dives.
  ...(
    [
      ['first-paycheck', 'Your First Paycheck', '🧾', 'Decode a real paystub: gross vs. net, taxes, FICA, and catching errors.', 1],
      ['taxes-deep-dive', 'Taxes Deep-Dive', '🏛️', 'Where taxes go, how brackets really work, and why refunds happen.', 2],
      ['paying-for-college', 'Paying for College', '🎓', 'FAFSA, grants, scholarships, loans, and how to compare offers like a pro.', 3],
      ['entrepreneurship', 'Entrepreneurship & Side Hustles', '🚀', 'Turn a skill into income: pricing, profit, and your first business.', 4],
      ['crypto-and-scams', 'Crypto & Modern Money Traps', '🪙', 'Crypto, hype, betting, and BNPL — spot the traps before they cost you.', 5],
    ] as Array<[string, string, string, string, number]>
  ).map(([slug, title, emoji, description, day]) => ({
    slug,
    kind: 'elective' as const,
    title,
    emoji,
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

/** Localized label for an activity kind. */
export function kindLabel(kind: ActivityKind, lang: 'en' | 'es'): string {
  return (lang === 'es' ? KIND_LABEL_ES : KIND_LABEL)[kind]
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

/** Activity title + description in the active language (English fallback). */
export function localizeActivity(
  meta: ActivityMeta,
  lang: 'en' | 'es',
): { title: string; description: string } {
  if (lang !== 'es') return { title: meta.title, description: meta.description }
  const es = ACTIVITY_ES[meta.slug]
  return {
    title: es?.title ?? meta.title,
    description: es?.description ?? meta.description,
  }
}

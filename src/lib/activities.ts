// The activity catalog. Assignments and progress reference activities by slug,
// so new activities added here automatically appear everywhere (library,
// admin assignment picker, progress views).

export type ActivityKind = 'lesson' | 'challenge' | 'game'

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
]

export function getActivity(slug: string): ActivityMeta | undefined {
  return ACTIVITIES.find((a) => a.slug === slug)
}

export const KIND_LABEL: Record<ActivityKind, string> = {
  lesson: 'Lesson',
  challenge: 'Challenge',
  game: 'Game',
}

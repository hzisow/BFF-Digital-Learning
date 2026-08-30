// One place that knows how to load each route's code.
//
// Every entry here is a dynamic import(), which is what tells the bundler to
// split that page (and anything only it uses) into a separate file. The app
// shell — React, the router, the header, i18n — stays in the first download;
// a page's code arrives when someone actually navigates to it.
//
// Keeping the loaders in their own module, rather than inline in App.tsx, means
// the navigation can also *pre*-warm a chunk on hover or when the browser is
// idle. Calling a loader twice is free: import() caches the module promise, so
// a prefetch followed by a real navigation resolves instantly from memory.

/** Every code-split route, keyed by a short stable name. */
export const routeChunks = {
  lessons: () => import('../pages/LessonsIndex'),
  lesson: () => import('../pages/LessonPage'),
  activities: () => import('../pages/ActivitiesIndex'),
  glossary: () => import('../pages/GlossaryPage'),
  certificate: () => import('../pages/CertificatePage'),
  verify: () => import('../pages/VerifyCertificate'),
  practice: () => import('../pages/PracticePage'),
  aiPractice: () => import('../pages/AIPractice'),
  coach: () => import('../pages/MoneyCoach'),
  join: () => import('../pages/student/JoinPage'),
  student: () => import('../pages/student/StudentHome'),
  liveJoin: () => import('../pages/LiveJoin'),

  bensBudget: () => import('../activities/bens-budget/BensBudget'),
  bensInsurance: () => import('../activities/bens-insurance/BensInsurance'),
  paystub: () => import('../activities/paystub/PaystubDetective'),
  creditSim: () => import('../activities/credit-sim/CreditScoreSim'),
  scamSpotter: () => import('../activities/scam-spotter/ScamSpotter'),
  smartShopper: () => import('../activities/smart-shopper/SmartShopper'),
  goalGetter: () => import('../activities/goal-getter/GoalGetter'),

  wolfHome: () => import('../activities/wolf/WolfHome'),
  wolfSolo: () => import('../activities/wolf/WolfSolo'),
  wolfPlayer: () => import('../activities/wolf/WolfPlayer'),
  wolfHost: () => import('../activities/wolf/WolfHost'),
  quizPlay: () => import('../activities/quiz/QuizPlay'),
  quizHost: () => import('../activities/quiz/QuizHost'),
  coPlayPlayer: () => import('../activities/live/CoPlayPlayer'),
  coPlayHost: () => import('../activities/live/CoPlayHost'),

  team: () => import('../pages/admin/TeamAuth'),
  admin: () => import('../pages/admin/AdminDashboard'),
  adminClass: () => import('../pages/admin/ClassroomDetail'),
  adminGenerate: () => import('../pages/admin/LessonPlanGenerator'),
  account: () => import('../pages/admin/AccountPage'),
} satisfies Record<string, () => Promise<unknown>>

export type RouteChunk = keyof typeof routeChunks

/**
 * Start downloading a route's code before it is needed. Fire-and-forget: a
 * failed prefetch is not an error, because the real navigation will retry and
 * surface any genuine problem itself.
 */
export function prefetchRoute(name: RouteChunk): void {
  void routeChunks[name]().catch(() => {})
}

interface NetworkInformation {
  saveData?: boolean
  effectiveType?: string
}

/**
 * Is speculative downloading a reasonable thing to do right now?
 *
 * The lessons route carries all thirteen lessons in three languages, so warming
 * it costs real bytes. On a fast connection that is a good trade — the student
 * clicks and the page is already there. On a metered or crawling connection it
 * is actively harmful: the prefetch competes with whatever they actually asked
 * for. Respect Save-Data, and stay out of the way on 2G/3G.
 */
function prefetchIsWelcome(): boolean {
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (!conn) return true // no signal either way — assume a normal connection
  if (conn.saveData) return false
  if (conn.effectiveType && /^(slow-)?2g$|^3g$/.test(conn.effectiveType)) return false
  return true
}

/**
 * Warm the routes a visitor is most likely to open next, once the browser has
 * nothing better to do. Deliberately a short list: prefetching everything would
 * just move the original download problem earlier in the page's life.
 *
 * Hovering a nav link prefetches regardless of connection quality — that is a
 * direct signal of intent, not a guess, and the download would happen a moment
 * later anyway.
 */
export function prefetchLikelyRoutes(): void {
  if (!prefetchIsWelcome()) return
  const warm = () => {
    prefetchRoute('lessons')
    prefetchRoute('activities')
  }
  // Safari has no requestIdleCallback; a short timer is a fine stand-in.
  const w = window as Window & { requestIdleCallback?: (cb: () => void) => void }
  if (typeof w.requestIdleCallback === 'function') w.requestIdleCallback(warm)
  else window.setTimeout(warm, 2000)
}

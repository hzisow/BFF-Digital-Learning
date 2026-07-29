// Central registry of all BFF Academy lessons, keyed by slug.
//
// Every lesson is loaded through a dynamic import(), one chunk per lesson. This
// is not a micro-optimisation — it was the biggest load-time problem in the app.
// When this module imported all thirteen lessons statically, the bundler had to
// put every lesson in all three languages into one 494KB chunk, and *any* page
// that touched lesson data pulled the whole thing. Measured on a 500kbps/300ms
// connection that made the course path take 10.1s and a lesson 8.0s to show
// content, against 3.5-4.0s for every page that did not need it — so the two
// pages that are the actual product were the two slowest in the app.
//
// A student opening one lesson was downloading twelve others, plus two
// translations they were not reading.
//
// `loadLesson(slug)` fetches exactly one. `loadAllLessons()` still exists for
// the two pages that genuinely need the whole curriculum (the glossary
// aggregates every key term; practice builds a bank from every quiz) and pays
// the full cost knowingly.
//
// There is deliberately no synchronous `getLesson` any more. Adding one back
// would require something to statically import all thirteen files again, which
// would silently undo this. The async-only surface is what keeps it split.
//
// Adding a lesson: create the file, add one line to LESSON_LOADERS, and register
// its metadata in src/lib/activities.ts with a title and description in all
// three languages. The course path reads titles from there, not from here, so it
// never has to load lesson content at all.

import type { Lesson } from '../types'

/** One dynamic import per lesson. These keys are the canonical slug list. */
const LESSON_LOADERS: Record<string, () => Promise<{ default: Lesson }>> = {
  'earning-income': () => import('./earning-income'),
  'spending-budgeting': () => import('./spending-budgeting'),
  'saving-investing': () => import('./saving-investing'),
  'credit-debt': () => import('./credit-debt'),
  'risk-insurance': () => import('./risk-insurance'),
  'financial-decision-making': () => import('./financial-decision-making'),
  'financial-planning': () => import('./financial-planning'),
  'consumer-protection': () => import('./consumer-protection'),
  // Bonus electives (week 5 — off the core path)
  'first-paycheck': () => import('./first-paycheck'),
  'taxes-deep-dive': () => import('./taxes-deep-dive'),
  'paying-for-college': () => import('./paying-for-college'),
  entrepreneurship: () => import('./entrepreneurship'),
  'crypto-and-scams': () => import('./crypto-and-scams'),
}

/** Every lesson slug, in curriculum order. Needs no content loaded. */
export const ALL_LESSON_SLUGS = Object.keys(LESSON_LOADERS)

/** Is this a real lesson slug? Cheap — used to 404 before fetching anything. */
export function isLessonSlug(slug: string): boolean {
  return slug in LESSON_LOADERS
}

// import() caches the module promise, so a second request for the same lesson
// costs nothing. This map additionally lets a component read an
// already-fetched lesson without another await.
const cache = new Map<string, Lesson>()

/** A lesson already fetched during this session, if any. */
export function peekLesson(slug: string): Lesson | undefined {
  return cache.get(slug)
}

/** Fetch one lesson. Resolves to undefined for an unknown slug. */
export async function loadLesson(slug: string): Promise<Lesson | undefined> {
  const cached = cache.get(slug)
  if (cached) return cached
  const loader = LESSON_LOADERS[slug]
  if (!loader) return undefined
  const mod = await loader()
  cache.set(slug, mod.default)
  return mod.default
}

/**
 * Fetch the entire curriculum — all thirteen chunks. Only the glossary and the
 * practice bank should call this; everything else wants `loadLesson`.
 */
export async function loadAllLessons(): Promise<Record<string, Lesson>> {
  const entries = await Promise.all(
    ALL_LESSON_SLUGS.map(async (slug) => [slug, await loadLesson(slug)] as const),
  )
  const out: Record<string, Lesson> = {}
  for (const [slug, lesson] of entries) if (lesson) out[slug] = lesson
  return out
}

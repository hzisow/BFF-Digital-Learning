// Remembering where a student was in a lesson.
//
// Lessons run 15–25 minutes across ~21 steps, and a class period ends when it
// ends. Before this, closing the tab reset `sectionIndex` to 0: a student who
// was fifteen steps in came back tomorrow to step one, and had to re-watch the
// video and re-answer checkpoints they had already got right before reaching
// anything new. That is the kind of friction nobody files a bug about — they
// just stop doing the lesson.
//
// This lives in localStorage rather than the database on purpose. It is
// device-local scratch state, not a record of achievement: the authoritative
// "did they finish, what did they score" still goes through saveProgress. A
// student who switches devices simply starts the lesson fresh, which is correct
// — we would rather lose a scroll position than show someone a half-finished
// lesson they never opened on this machine.

/**
 * Mirrors the per-question state the lesson player keeps. Positions saved
 * before questions became one-shot also carry a `wrongPicks` array; it is
 * simply ignored on read, so an old saved position still resumes.
 */
export interface StoredAnswer {
  chosen: number | null
  revealed: boolean
}

export interface LessonPosition {
  /** Which part of the player they were in. `results` is never stored. */
  phase: 'lesson' | 'quiz'
  sectionIndex: number
  quizIndex: number
  checkpointAnswers: Record<number, StoredAnswer>
  quizAnswers: Record<number, StoredAnswer>
  videoDone: Record<number, boolean>
  /** For showing "step 12 of 21" without loading the lesson content. */
  step: number
  totalSteps: number
  savedAt: string
}

const KEY = 'bff_lesson_pos_v1'

/** Positions older than this are not offered — the student has moved on. */
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

type PositionMap = Record<string, LessonPosition>

function readAll(): PositionMap {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? (parsed as PositionMap) : {}
  } catch {
    return {}
  }
}

function writeAll(map: PositionMap): void {
  try {
    if (Object.keys(map).length === 0) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, JSON.stringify(map))
  } catch {
    // Private mode or quota. Resume is a convenience; the lesson still works.
  }
}

function isFresh(pos: LessonPosition): boolean {
  const age = Date.now() - new Date(pos.savedAt).getTime()
  return Number.isFinite(age) && age >= 0 && age < MAX_AGE_MS
}

/** Save (or overwrite) where the student is in one lesson. */
export function savePosition(slug: string, pos: Omit<LessonPosition, 'savedAt'>): void {
  const all = readAll()
  all[slug] = { ...pos, savedAt: new Date().toISOString() }
  writeAll(all)
}

/**
 * The stored position for a lesson, if it is worth offering. Step 1 is not —
 * "resume from the beginning" is just the beginning.
 */
export function loadPosition(slug: string): LessonPosition | null {
  const pos = readAll()[slug]
  if (!pos || !isFresh(pos)) return null
  if (pos.phase === 'lesson' && pos.sectionIndex <= 0) return null
  return pos
}

/** Forget a lesson's position — on completion, or when they choose to restart. */
export function clearPosition(slug: string): void {
  const all = readAll()
  if (!(slug in all)) return
  delete all[slug]
  writeAll(all)
}

/**
 * The single lesson to offer as "continue where you left off": the most
 * recently touched one that is still unfinished.
 */
export function mostRecentPosition(): { slug: string; position: LessonPosition } | null {
  const all = readAll()
  let best: { slug: string; position: LessonPosition } | null = null
  for (const [slug, position] of Object.entries(all)) {
    if (!isFresh(position)) continue
    if (position.phase === 'lesson' && position.sectionIndex <= 0) continue
    if (!best || position.savedAt > best.position.savedAt) best = { slug, position }
  }
  return best
}

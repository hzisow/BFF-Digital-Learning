import { getSupabase } from './supabase'
import type { StudentSession } from './session'
import { recordActivity } from './streak'
import { enqueueProgress, flushProgressQueue } from './progressQueue'
import { isOnline } from './online'

export type ProgressStatus = 'started' | 'completed'

export interface ActivityProgress {
  status: ProgressStatus
  /** 0-100 where applicable (quiz %, challenge score %, game rank score). */
  score: number | null
  /** Activity-specific details (choices made, portfolio value, ...). */
  data: Record<string, unknown>
  updatedAt: string
}

const LOCAL_KEY = 'bff_progress_v1'

/**
 * Slugs that have been renamed, old to new. Progress is keyed by slug, so
 * without this a student who played the trading game before it stopped being
 * named after the film would find their score gone: the record is still on the
 * device, filed under a name nothing looks up any more.
 */
const RENAMED: Record<string, string> = {
  'wolf-of-wall-street': 'market-movers',
}

export function loadLocalProgress(): Record<string, ActivityProgress> {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    const all: Record<string, ActivityProgress> = raw ? JSON.parse(raw) : {}
    let moved = false
    for (const [from, to] of Object.entries(RENAMED)) {
      if (!(from in all)) continue
      // Whatever is already under the new name wins; it is the more recent play.
      if (!(to in all)) all[to] = all[from]
      delete all[from]
      moved = true
    }
    if (moved) saveLocalProgress(all)
    return all
  } catch {
    return {}
  }
}

function saveLocalProgress(all: Record<string, ActivityProgress>): void {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all))
  } catch {
    // private mode / quota — in-memory only
  }
}

/** Merge two progress entries, keeping the better one (completed > started,
 *  higher score, unioned data). */
function mergeEntry(
  a: ActivityProgress | undefined,
  b: ActivityProgress | undefined,
): ActivityProgress | undefined {
  if (!a) return b
  if (!b) return a
  const status: ProgressStatus =
    a.status === 'completed' || b.status === 'completed' ? 'completed' : 'started'
  const score =
    a.score == null ? b.score : b.score == null ? a.score : Math.max(a.score, b.score)
  const newer = a.updatedAt >= b.updatedAt ? a : b
  return { status, score, data: { ...a.data, ...b.data }, updatedAt: newer.updatedAt }
}

/**
 * Reconcile local and server progress when a student (re)joins a class: pull the
 * server's records, merge with whatever is on this device (best-of), write the
 * union back to both. This is what makes an in-class record durable and
 * portable across devices and browser wipes.
 */
export async function reconcileProgress(student: StudentSession | null): Promise<void> {
  if (!student) return
  const supabase = await getSupabase()
  if (!supabase) return
  const local = loadLocalProgress()
  let serverRows: Array<{
    activity_slug: string
    status: ProgressStatus
    score: number | null
    data: Record<string, unknown> | null
    updated_at: string
  }> = []
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('activity_slug, status, score, data, updated_at')
      .eq('student_id', student.studentId)
    if (error) throw error
    serverRows = (data ?? []) as typeof serverRows
  } catch {
    return // offline — keep local as-is
  }

  const merged: Record<string, ActivityProgress> = { ...local }
  for (const row of serverRows) {
    const serverEntry: ActivityProgress = {
      status: row.status,
      score: row.score,
      data: row.data ?? {},
      updatedAt: row.updated_at,
    }
    merged[row.activity_slug] = mergeEntry(local[row.activity_slug], serverEntry)!
  }
  saveLocalProgress(merged)

  // Push the union back so the server holds everything (incl. pre-join solo work).
  const upserts = Object.entries(merged).map(([activity_slug, e]) => ({
    student_id: student.studentId,
    activity_slug,
    status: e.status,
    score: e.score,
    data: e.data,
    updated_at: e.updatedAt,
  }))
  if (upserts.length > 0) {
    try {
      const { error } = await supabase
        .from('progress')
        .upsert(upserts, { onConflict: 'student_id,activity_slug' })
      if (error) upserts.forEach(enqueueProgress)
    } catch {
      // Local already holds the merged truth; queue the push for later so the
      // class record catches up rather than staying permanently behind.
      upserts.forEach(enqueueProgress)
    }
  }
}

/**
 * Records progress locally always, and syncs to the classroom database when
 * the student has joined a class and the backend is connected.
 */
export async function saveProgress(
  student: StudentSession | null,
  activitySlug: string,
  patch: { status: ProgressStatus; score?: number | null; data?: Record<string, unknown> },
): Promise<void> {
  const all = loadLocalProgress()
  const prev = all[activitySlug]
  // Never downgrade completed back to started, and keep the best score.
  const status: ProgressStatus =
    prev?.status === 'completed' ? 'completed' : patch.status
  const score =
    patch.score == null
      ? prev?.score ?? null
      : prev?.score == null
        ? patch.score
        : Math.max(prev.score, patch.score)
  const entry: ActivityProgress = {
    status,
    score,
    data: { ...(prev?.data ?? {}), ...(patch.data ?? {}) },
    updatedAt: new Date().toISOString(),
  }
  all[activitySlug] = entry
  localStorage.setItem(LOCAL_KEY, JSON.stringify(all))
  recordActivity() // any saved progress keeps the daily streak alive

  if (student) {
    const row = {
      student_id: student.studentId,
      activity_slug: activitySlug,
      status: entry.status,
      score: entry.score,
      data: entry.data,
      updated_at: entry.updatedAt,
    }

    // Known-offline: queue and return *before* touching getSupabase(). Loading
    // the client first would mean a student on a dead network downloads 51KB to
    // do something that is purely local.
    if (!isOnline()) {
      enqueueProgress(row)
      return
    }

    const supabase = await getSupabase()
    if (!supabase) return

    try {
      const { error } = await supabase
        .from('progress')
        .upsert(row, { onConflict: 'student_id,activity_slug' })
      // supabase-js reports failures in `error` rather than throwing, so this
      // branch is the one that used to silently drop a student's work.
      if (error) enqueueProgress(row)
      else void flushProgressQueue() // a success proves the network is back
    } catch {
      // Connection died mid-request. The local copy is safe; retry later.
      enqueueProgress(row)
    }
  }
}

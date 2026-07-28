import { supabase } from './supabase'
import type { StudentSession } from './session'
import { recordActivity } from './streak'

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

export function loadLocalProgress(): Record<string, ActivityProgress> {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : {}
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
  if (!supabase || !student) return
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
      await supabase.from('progress').upsert(upserts, { onConflict: 'student_id,activity_slug' })
    } catch {
      // best-effort — local already holds the merged truth
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

  if (supabase && student) {
    try {
      await supabase.from('progress').upsert(
        {
          student_id: student.studentId,
          activity_slug: activitySlug,
          status: entry.status,
          score: entry.score,
          data: entry.data,
          updated_at: entry.updatedAt,
        },
        { onConflict: 'student_id,activity_slug' },
      )
    } catch {
      // Offline or RLS hiccup — local copy is still saved.
    }
  }
}

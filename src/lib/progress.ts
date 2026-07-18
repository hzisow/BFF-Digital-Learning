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
  // Never downgrade completed → started, and keep the best score.
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

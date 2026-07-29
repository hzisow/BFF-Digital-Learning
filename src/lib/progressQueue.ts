// A durable outbox for classroom progress.
//
// Progress is local-first: `saveProgress` writes to localStorage before it ever
// touches the network, so a student's own record is never at risk. What *was*
// at risk is the copy the mentor sees. The upsert to Supabase used to be
// best-effort — one dropped packet at the end of a lesson and that completion
// simply never reached the class, with nothing anywhere to say so.
//
// Every failed upsert now lands here instead. The queue lives in localStorage,
// so it survives a refresh, a closed tab, and a dead battery, and it is drained
// whenever there is a plausible reason to think the network is back:
//
//   - the browser fires `online`
//   - the tab becomes visible again (covers waking a laptop, switching tabs)
//   - a slow timer, for the case `online` never fires because the interface was
//     up the whole time and it was the uplink that was broken
//
// This is deliberately NOT a service worker. Everything here runs in the page,
// which means it cannot sync after the tab closes — but it also means it works
// identically on iOS, needs no new caching layer, and can be removed by
// deleting one file. See STATUS.md for the trade-off that led here.

import { supabase } from './supabase'
import { isOnline, onConnectionChange } from './online'

const QUEUE_KEY = 'bff_progress_outbox_v1'
/** Guards against a runaway queue on a device that is offline for a long time. */
const MAX_ENTRIES = 200
const RETRY_INTERVAL_MS = 60_000

export interface QueuedProgress {
  student_id: string
  activity_slug: string
  status: 'started' | 'completed'
  score: number | null
  data: Record<string, unknown>
  updated_at: string
}

function readQueue(): QueuedProgress[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as QueuedProgress[]) : []
  } catch {
    return []
  }
}

function writeQueue(rows: QueuedProgress[]): void {
  try {
    if (rows.length === 0) localStorage.removeItem(QUEUE_KEY)
    else localStorage.setItem(QUEUE_KEY, JSON.stringify(rows))
  } catch {
    // Private mode or quota. The local progress record is still correct; only
    // the mentor's copy is at stake, and there is nothing useful to do here.
  }
}

/**
 * Add a write to the outbox. One entry per (student, activity): a later write
 * already contains everything the earlier one did, because `saveProgress`
 * merges against the stored record before queueing.
 */
export function enqueueProgress(row: QueuedProgress): void {
  const queue = readQueue().filter(
    (q) => !(q.student_id === row.student_id && q.activity_slug === row.activity_slug),
  )
  queue.push(row)
  // Oldest-first eviction: if something has to go, lose the stalest record.
  writeQueue(queue.slice(-MAX_ENTRIES))
}

/** How many writes are waiting. Useful for showing "N not yet synced". */
export function pendingProgressCount(): number {
  return readQueue().length
}

let draining = false

/**
 * Try to send everything in the outbox. Entries that fail stay queued for the
 * next attempt. Safe to call at any time — concurrent calls collapse into one.
 */
export async function flushProgressQueue(): Promise<void> {
  if (draining || !supabase || !isOnline()) return
  const queue = readQueue()
  if (queue.length === 0) return

  draining = true
  try {
    const { error } = await supabase
      .from('progress')
      .upsert(queue, { onConflict: 'student_id,activity_slug' })
    if (error) return // still offline or rejected — keep the queue intact

    // Only clear the rows we actually sent. Anything queued while the request
    // was in flight has to survive.
    const sent = new Set(queue.map((q) => `${q.student_id}|${q.activity_slug}|${q.updated_at}`))
    writeQueue(
      readQueue().filter(
        (q) => !sent.has(`${q.student_id}|${q.activity_slug}|${q.updated_at}`),
      ),
    )
  } catch {
    // Network died mid-flush. The queue is untouched; try again later.
  } finally {
    draining = false
  }
}

let started = false

/** Wire up the retry triggers. Called once, from main.tsx. */
export function startProgressSyncRetry(): void {
  if (started || typeof window === 'undefined') return
  started = true

  onConnectionChange((online) => {
    if (online) void flushProgressQueue()
  })

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void flushProgressQueue()
  })

  window.setInterval(() => {
    void flushProgressQueue()
  }, RETRY_INTERVAL_MS)

  // And once on startup, for whatever was left over from last session.
  void flushProgressQueue()
}

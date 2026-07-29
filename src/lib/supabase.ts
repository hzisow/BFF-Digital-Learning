// The Supabase client, loaded on demand rather than at boot.
//
// `@supabase/supabase-js` is 205KB raw / 51KB gzip — after the lesson content
// was split per-lesson it became the largest thing left on the critical path of
// every single page, including the ones that never touch a backend. It was
// eager for one reason: this module created the client at import time, and
// `session.tsx` imported it to restore an auth session.
//
// Most visits do not need it at all. A student doing a lesson in solo mode, a
// mentor reading the activities index, anyone who opens the landing page and
// leaves — none of them require a network client. So it is now behind a dynamic
// import, and the app decides when to pay for it:
//
//   - Something explicitly asks (`getSupabase` / `requireSupabase`), or
//   - `hasStoredSession()` says there is a session worth restoring, in which
//     case `SessionProvider` warms it *after* first paint rather than before.
//
// There is deliberately no synchronous `supabase` export any more. Keeping one
// would require creating the client at module scope, which is exactly what put
// it back on the critical path. Removing it made the compiler point at all
// thirteen call sites.

import type { SupabaseClient } from '@supabase/supabase-js'
import { BACKEND_ENABLED, SUPABASE_ANON_KEY, SUPABASE_URL } from './config'

let client: SupabaseClient | null = null
let pending: Promise<SupabaseClient | null> | null = null

/**
 * The client if it has already been created, otherwise null. For code that can
 * meaningfully skip work when the backend is not loaded yet — never as a way to
 * avoid awaiting `getSupabase`.
 */
export function peekSupabase(): SupabaseClient | null {
  return client
}

/** Load (once) and return the client. Null when no backend is configured. */
export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!BACKEND_ENABLED) return null
  if (client) return client
  if (!pending) {
    pending = import('@supabase/supabase-js').then(({ createClient }) => {
      client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
      return client
    })
  }
  return pending
}

/** Throws if the backend is not configured. Use inside connected-only flows. */
export async function requireSupabase(): Promise<SupabaseClient> {
  const c = await getSupabase()
  if (!c) {
    throw new Error(
      'BFF Classroom backend is not connected yet. Solo activities still work!',
    )
  }
  return c
}

/**
 * Is there a session on this device worth restoring?
 *
 * Checked synchronously against localStorage so a first-time or solo visitor
 * never downloads the client at all. Two signals:
 *  - our own student session, written by `session.tsx`
 *  - a Supabase auth token, which supabase-js v2 stores as `sb-<ref>-auth-token`
 *
 * The auth key is matched by pattern rather than by exact name so a changed
 * project ref cannot break it. If supabase-js ever changed the format entirely,
 * the failure is contained: a signed-in mentor's session would simply not be
 * restored until they open a page that touches the backend anyway (every mentor
 * page does), rather than anything breaking outright.
 */
export function hasStoredSession(): boolean {
  if (!BACKEND_ENABLED) return false
  try {
    if (localStorage.getItem('bff_student_session')) return true
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && /^sb-.*-auth-token$/.test(key)) return true
    }
  } catch {
    // Private mode with storage blocked — assume nothing to restore.
  }
  return false
}

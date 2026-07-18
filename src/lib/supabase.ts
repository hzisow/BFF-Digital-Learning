import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { BACKEND_ENABLED, SUPABASE_ANON_KEY, SUPABASE_URL } from './config'

export const supabase: SupabaseClient | null = BACKEND_ENABLED
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

/** Throws if the backend is not configured. Use inside connected-only flows. */
export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'BFF Classroom backend is not connected yet. Solo activities still work!',
    )
  }
  return supabase
}

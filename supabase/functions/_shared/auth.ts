// Shared authentication + rate-limiting guard for the AI edge functions.
//
// Every AI function is a paid call to Gemini on a shared free-tier quota, so
// two things must be true before we spend one: the caller holds a real, valid
// session (not just the public anon key), and they have not already used up
// their daily budget. Both are enforced here rather than trusting the platform
// `verify_jwt` flag alone — that flag is set outside the repo and only proves
// the token is well-formed, not that it maps to a user.

import { createClient, type SupabaseClient } from 'jsr:@supabase/supabase-js@2.45.4'

/** Thrown when the caller is not signed in. Caught as a 401 by each handler. */
export class Unauthorized extends Error {
  constructor() {
    super('UNAUTHORIZED')
  }
}
/** Thrown when the caller is over their daily AI budget. Caught as a 429. */
export class RateLimited extends Error {
  constructor() {
    super('RATE_LIMITED')
  }
}

export interface Caller {
  userId: string
  isAnonymous: boolean
  supabase: SupabaseClient
}

/**
 * Validate the caller's JWT against Supabase Auth and return their identity.
 *
 * `getUser()` verifies the token server-side, so a request carrying only the
 * public anon key (no user) is rejected here even when the platform flag would
 * have let it through. Anonymous sessions are real users and pass; a handler
 * that needs a vetted human (the lesson planner) checks `isAnonymous` itself.
 */
export async function requireUser(req: Request): Promise<Caller> {
  const authHeader = req.headers.get('Authorization') ?? ''
  if (!authHeader.startsWith('Bearer ')) throw new Unauthorized()
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } },
  )
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) throw new Unauthorized()
  return {
    userId: data.user.id,
    isAnonymous: data.user.is_anonymous ?? false,
    supabase,
  }
}

/**
 * Count this call against the caller's daily budget and refuse when it is
 * spent. The counter lives in the database keyed on auth.uid(), so it survives
 * function restarts and cannot be inflated for anyone but yourself.
 *
 * A counter error fails open (the call proceeds): losing the AI feature over a
 * transient bookkeeping blip would be a worse outcome than one uncounted call.
 */
export async function enforceDailyLimit(caller: Caller, limit: number): Promise<void> {
  const { data, error } = await caller.supabase.rpc('bump_ai_usage', { p_limit: limit })
  if (error) {
    console.error(`bump_ai_usage failed for ${caller.userId}: ${error.message}`)
    return
  }
  if (data === false) throw new RateLimited()
}

/** Trim a caller-supplied string to a hard cap; throws BAD_INPUT if not a string. */
export function cappedString(value: unknown, max: number): string {
  if (typeof value !== 'string') throw new Error('BAD_INPUT')
  return value.slice(0, max)
}

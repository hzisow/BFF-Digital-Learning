// Client access to the AI edge functions. Calls go through Supabase Functions,
// which run with verify_jwt on, so the caller must present a real JWT and the
// AI key stays server-side.
//
// Important: the project uses the newer publishable API key (sb_publishable_…),
// which is NOT a JWT. With no session, supabase-js sends that key as the bearer
// token and the function rejects it with a 401. Students who joined a class and
// signed-in mentors already have a session, but a visitor who opens the Coach
// directly does not — so we lazily start an anonymous session first. This keeps
// the endpoints authenticated instead of opening them to the world.

import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabase } from './supabase'
import { BACKEND_ENABLED } from './config'
import { isNetworkError, isOnline } from './online'

/** AI features require the backend (Supabase) to be connected.
 *  Derived from config alone so that screens can gate their UI synchronously
 *  without loading the client just to ask whether it exists. */
export const AI_ENABLED = BACKEND_ENABLED

export class AINotConfiguredError extends Error {}

/** Raised when we cannot obtain a session (e.g. anonymous sign-ins disabled). */
export class AISignInError extends Error {}

/**
 * The request never reached the server. This is a separate error type on
 * purpose: "the wifi dropped" and "the AI service failed" need different words
 * and lead the student to different actions, and collapsing them into one
 * generic failure is what made the earlier AI bugs so hard to diagnose.
 */
export class AIOfflineError extends Error {}

/** Make sure we have a JWT before calling a verify_jwt function. */
async function ensureSession(supabase: SupabaseClient): Promise<void> {
  const { data } = await supabase.auth.getSession()
  if (data.session) return
  const { error } = await supabase.auth.signInAnonymously()
  if (error) {
    throw new AISignInError(
      `Could not start a session for the AI features: ${error.message}`,
    )
  }
}

/**
 * Invoke an AI edge function. Throws AINotConfiguredError when the server has no
 * AI key set yet, so the UI can show a friendly "not set up" message.
 */
export async function invokeAI<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  // Known-offline: fail fast, before loading the client. A dead network is not
  // a reason to download 51KB of Supabase to discover the request cannot go.
  if (!isOnline()) throw new AIOfflineError('No connection.')
  const supabase = await getSupabase()
  if (!supabase) throw new AINotConfiguredError('AI backend not connected.')

  let data: unknown
  let error: unknown
  try {
    await ensureSession(supabase)
    const res = await supabase.functions.invoke(fn, { body })
    data = res.data
    error = res.error
  } catch (err) {
    // A thrown error here is almost always the connection giving out — either
    // during sign-in or mid-request.
    if (isNetworkError(err)) throw new AIOfflineError('Lost connection.')
    throw err
  }

  if (error) {
    // The request itself failed to reach the function.
    if (isNetworkError(error)) throw new AIOfflineError('Lost connection.')
    // Edge function returns 503 + { error: 'AI_NOT_CONFIGURED' } when no key.
    const ctx = (error as { context?: { error?: string } }).context
    if (ctx?.error === 'AI_NOT_CONFIGURED') {
      throw new AINotConfiguredError('The AI features are not set up yet.')
    }
    throw error
  }
  const payload = data as { error?: string; reason?: string } | null
  if (payload?.error === 'AI_NOT_CONFIGURED') {
    throw new AINotConfiguredError('The AI features are not set up yet.')
  }
  // The functions answer 200 with { error: 'AI_FAILED', reason } because
  // supabase-js throws away the body on non-2xx — a status code would hide the
  // very message we need to show.
  if (payload?.error === 'AI_FAILED') {
    throw new Error(payload.reason || 'The AI service returned an error.')
  }
  return data as T
}

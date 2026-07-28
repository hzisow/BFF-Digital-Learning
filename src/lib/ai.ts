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

import { supabase } from './supabase'
import { BACKEND_ENABLED } from './config'

/** AI features require the backend (Supabase) to be connected. */
export const AI_ENABLED = BACKEND_ENABLED && !!supabase

export class AINotConfiguredError extends Error {}

/** Raised when we cannot obtain a session (e.g. anonymous sign-ins disabled). */
export class AISignInError extends Error {}

/** Make sure we have a JWT before calling a verify_jwt function. */
async function ensureSession(): Promise<void> {
  if (!supabase) return
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
  if (!supabase) throw new AINotConfiguredError('AI backend not connected.')
  await ensureSession()
  const { data, error } = await supabase.functions.invoke(fn, { body })
  if (error) {
    // Edge function returns 503 + { error: 'AI_NOT_CONFIGURED' } when no key.
    const ctx = (error as { context?: { error?: string } }).context
    if (ctx?.error === 'AI_NOT_CONFIGURED') {
      throw new AINotConfiguredError('The AI features are not set up yet.')
    }
    throw error
  }
  if (data && (data as { error?: string }).error === 'AI_NOT_CONFIGURED') {
    throw new AINotConfiguredError('The AI features are not set up yet.')
  }
  return data as T
}

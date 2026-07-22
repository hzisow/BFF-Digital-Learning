// Client access to the AI edge functions. Calls go through Supabase Functions,
// which forward the caller's JWT (students are anonymous-auth; mentors are
// Google-auth) — so only signed-in users can reach the API, and the Anthropic
// key stays server-side.

import { supabase } from './supabase'
import { BACKEND_ENABLED } from './config'

/** AI features require the backend (Supabase) to be connected. */
export const AI_ENABLED = BACKEND_ENABLED && !!supabase

export class AINotConfiguredError extends Error {}

/**
 * Invoke an AI edge function. Throws AINotConfiguredError when the server has no
 * Anthropic key set yet, so the UI can show a friendly "not set up" message.
 */
export async function invokeAI<T>(fn: string, body: unknown): Promise<T> {
  if (!supabase) throw new AINotConfiguredError('AI backend not connected.')
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

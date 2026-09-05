// Live multiplayer plumbing for Live Quiz (Supabase Realtime).
// Mirrors src/activities/wolf/live.ts.

import type { RealtimeChannel } from '@supabase/supabase-js'
import { requireSupabase } from '../../lib/supabase'

export type QuizState = 'lobby' | 'question' | 'reveal' | 'done'

/** One locked-in answer, stored in `answers` under String(question_index). */
export interface QuizAnswer {
  /** Option index the player tapped (0-3). */
  choice: number
  /** Points earned for this answer (0 if wrong). */
  points: number
  /** Milliseconds between question start and the tap. */
  ms: number
}

export interface QuizSession {
  id: string
  code: string
  lesson_slug: string
  state: QuizState
  question_index: number
  question_started_at: string | null
  classroom_id: string | null
  created_by: string
}

export interface QuizPlayer {
  id: string
  session_id: string
  auth_uid: string
  nickname: string
  score: number
  answers: Record<string, QuizAnswer>
}

function makeCode(): string {
  // Unambiguous characters only (no 0/O, 1/I).
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export async function createQuizSession(
  lessonSlug: string,
  classroomId: string | null,
): Promise<QuizSession> {
  const sb = await requireSupabase()
  const { data: auth } = await sb.auth.getUser()
  if (!auth.user) throw new Error('Sign in to host a live quiz.')
  const { data, error } = await sb
    .from('quiz_sessions')
    .insert({
      code: makeCode(),
      lesson_slug: lessonSlug,
      classroom_id: classroomId,
      created_by: auth.user.id,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as QuizSession
}

export async function getQuizSession(id: string): Promise<QuizSession> {
  const sb = await requireSupabase()
  const { data, error } = await sb.from('quiz_sessions').select().eq('id', id).single()
  if (error) throw new Error(error.message)
  return data as QuizSession
}

export async function getQuizSessionByCode(code: string): Promise<QuizSession> {
  const sb = await requireSupabase()
  // Anonymous players need a session before the RPC (granted to authenticated),
  // and the by-code lookup is a SECURITY DEFINER function so the session table
  // itself is no longer readable by code — that would let anyone enumerate it.
  const { data: auth } = await sb.auth.getSession()
  if (!auth.session) {
    const { error } = await sb.auth.signInAnonymously()
    if (error) throw new Error(error.message)
  }
  const { data, error } = await sb.rpc('get_quiz_session_by_code', {
    p_code: code.trim().toUpperCase(),
  })
  if (error) throw new Error(error.message)
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new Error('Quiz not found. Double-check the code with your host!')
  return row as QuizSession
}

export async function joinQuizSession(sessionId: string, nickname: string): Promise<QuizPlayer> {
  const sb = await requireSupabase()
  const { data: auth } = await sb.auth.getSession()
  if (!auth.session) {
    const { error } = await sb.auth.signInAnonymously()
    if (error) throw new Error(error.message)
  }
  const { data: userData } = await sb.auth.getUser()
  const uid = userData.user!.id
  // Only the nickname is upserted — a rejoin (page refresh) keeps the
  // player's existing score and answers; a fresh insert gets the defaults.
  const { data, error } = await sb
    .from('quiz_players')
    .upsert(
      {
        session_id: sessionId,
        auth_uid: uid,
        nickname: nickname.trim().slice(0, 24),
      },
      { onConflict: 'session_id,auth_uid' },
    )
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as QuizPlayer
}

export async function listQuizPlayers(sessionId: string): Promise<QuizPlayer[]> {
  const sb = await requireSupabase()
  const { data, error } = await sb
    .from('quiz_players')
    .select()
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as QuizPlayer[]
}

export async function updateQuizSession(
  id: string,
  patch: Partial<Pick<QuizSession, 'state' | 'question_index' | 'question_started_at'>>,
): Promise<void> {
  const sb = await requireSupabase()
  const { error } = await sb.from('quiz_sessions').update(patch).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function updateQuizPlayer(
  id: string,
  patch: { score: number; answers: Record<string, unknown> },
): Promise<void> {
  const sb = await requireSupabase()
  const { error } = await sb.from('quiz_players').update(patch).eq('id', id)
  if (error) throw new Error(error.message)
}

/** Subscribe to session + player changes. Returns an unsubscribe function. */
export function subscribeToQuiz(
  sessionId: string,
  onSession: (s: QuizSession) => void,
  onPlayers: () => void,
): () => void {
  // The client is loaded on demand, but callers assign this function's return
  // value straight to an unsubscribe slot, so it has to stay synchronous. Open
  // the channel once the client arrives and hand back a teardown that works
  // whether or not that has happened yet — a component can unmount while the
  // client is still downloading.
  let teardown: (() => void) | null = null
  let cancelled = false
  void requireSupabase().then((sb) => {
    if (cancelled) return
    const channel: RealtimeChannel = sb
    .channel(`quiz-${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'quiz_sessions', filter: `id=eq.${sessionId}` },
        (payload) => onSession(payload.new as QuizSession),
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quiz_players', filter: `session_id=eq.${sessionId}` },
        () => onPlayers(),
      )
      .subscribe()
    teardown = () => {
      void sb.removeChannel(channel)
    }
    if (cancelled) teardown()
  })
  return () => {
    cancelled = true
    teardown?.()
  }
}

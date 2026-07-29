// Generic "co-play" live sessions: host any solo activity for a class, players
// join with a code and play at their own pace, scores stream to a leaderboard.
// Mirrors the Wolf/Quiz realtime plumbing.

import type { RealtimeChannel } from '@supabase/supabase-js'
import { requireSupabase } from '../../lib/supabase'

export type LiveState = 'lobby' | 'playing' | 'ended'

export interface LiveSession {
  id: string
  code: string
  activity_slug: string
  state: LiveState
  classroom_id: string | null
  created_by: string
}

export interface LivePlayer {
  id: string
  session_id: string
  nickname: string
  score: number | null
  finished: boolean
}

export interface FoundSession {
  kind: 'wolf' | 'quiz' | 'coplay'
  code: string
  activity_slug: string
}

function makeCode(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

/** Look up a code across all live game types, telling the join screen where to go. */
export async function findLiveSession(code: string): Promise<FoundSession | null> {
  const sb = await requireSupabase()
  // Anonymous students need a session before the RPC (it's granted to authenticated).
  const { data: auth } = await sb.auth.getSession()
  if (!auth.session) {
    const { error } = await sb.auth.signInAnonymously()
    if (error) throw new Error(error.message)
  }
  const { data, error } = await sb.rpc('find_live_session', { p_code: code.trim().toUpperCase() })
  if (error) throw new Error(error.message)
  const row = Array.isArray(data) ? data[0] : data
  return (row as FoundSession | undefined) ?? null
}

export async function createLiveSession(
  activitySlug: string,
  classroomId: string | null,
): Promise<LiveSession> {
  const sb = await requireSupabase()
  const { data: auth } = await sb.auth.getUser()
  if (!auth.user) throw new Error('Sign in to host a game.')
  const { data, error } = await sb
    .from('live_sessions')
    .insert({ code: makeCode(), activity_slug: activitySlug, classroom_id: classroomId, created_by: auth.user.id })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as LiveSession
}

export async function getLiveSession(id: string): Promise<LiveSession> {
  const sb = await requireSupabase()
  const { data, error } = await sb.from('live_sessions').select().eq('id', id).single()
  if (error) throw new Error(error.message)
  return data as LiveSession
}

export async function getLiveSessionByCode(code: string): Promise<LiveSession> {
  const sb = await requireSupabase()
  const { data, error } = await sb
    .from('live_sessions')
    .select()
    .eq('code', code.trim().toUpperCase())
    .maybeSingle()
  if (error) throw new Error(error.message)
  if (!data) throw new Error('Game not found. Double-check the code with your host!')
  return data as LiveSession
}

export async function joinLiveSession(sessionId: string, nickname: string): Promise<LivePlayer> {
  const sb = await requireSupabase()
  const { data: auth } = await sb.auth.getSession()
  if (!auth.session) {
    const { error } = await sb.auth.signInAnonymously()
    if (error) throw new Error(error.message)
  }
  const { data: userData } = await sb.auth.getUser()
  const uid = userData.user!.id
  const { data, error } = await sb
    .from('live_players')
    .upsert(
      { session_id: sessionId, auth_uid: uid, nickname: nickname.trim().slice(0, 24) },
      { onConflict: 'session_id,auth_uid' },
    )
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as LivePlayer
}

export async function listLivePlayers(sessionId: string): Promise<LivePlayer[]> {
  const sb = await requireSupabase()
  const { data, error } = await sb
    .from('live_players')
    .select()
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as LivePlayer[]
}

export async function updateLiveSession(id: string, patch: { state: LiveState }): Promise<void> {
  const sb = await requireSupabase()
  const { error } = await sb.from('live_sessions').update(patch).eq('id', id)
  if (error) throw new Error(error.message)
}

/** A player reports their final score (0-100) when they finish the activity. */
export async function reportScore(playerId: string, score: number): Promise<void> {
  const sb = await requireSupabase()
  const { error } = await sb
    .from('live_players')
    .update({ score: Math.round(score), finished: true })
    .eq('id', playerId)
  if (error) throw new Error(error.message)
}

/** Subscribe to session + player changes. Returns an unsubscribe function. */
export function subscribeToLive(
  sessionId: string,
  onSession: (s: LiveSession) => void,
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
    .channel(`live-${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'live_sessions', filter: `id=eq.${sessionId}` },
        (payload) => onSession(payload.new as LiveSession),
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'live_players', filter: `session_id=eq.${sessionId}` },
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

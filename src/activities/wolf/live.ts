// Live multiplayer plumbing for Wolf of Wall Street (Supabase Realtime).

import type { RealtimeChannel } from '@supabase/supabase-js'
import { requireSupabase } from '../../lib/supabase'
import { STARTING_CASH, type Holdings } from './data'

export interface GameSession {
  id: string
  code: string
  stage: number
  reveal_index: number
  created_by: string
  classroom_id: string | null
}

export interface GamePlayer {
  id: string
  session_id: string
  nickname: string
  cash: number
  holdings: Holdings
}

function makeCode(): string {
  // Unambiguous characters only (no 0/O, 1/I).
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export async function createSession(classroomId: string | null): Promise<GameSession> {
  const sb = requireSupabase()
  const { data: auth } = await sb.auth.getUser()
  if (!auth.user) throw new Error('Sign in to host a game.')
  const { data, error } = await sb
    .from('game_sessions')
    .insert({ code: makeCode(), classroom_id: classroomId, created_by: auth.user.id })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as GameSession
}

export async function getSession(id: string): Promise<GameSession> {
  const sb = requireSupabase()
  const { data, error } = await sb.from('game_sessions').select().eq('id', id).single()
  if (error) throw new Error(error.message)
  return data as GameSession
}

export async function getSessionByCode(code: string): Promise<GameSession> {
  const sb = requireSupabase()
  const { data, error } = await sb
    .from('game_sessions')
    .select()
    .eq('code', code.trim().toUpperCase())
    .maybeSingle()
  if (error) throw new Error(error.message)
  if (!data) throw new Error('Game not found. Double-check the code with your host!')
  return data as GameSession
}

export async function joinSession(sessionId: string, nickname: string): Promise<GamePlayer> {
  const sb = requireSupabase()
  const { data: auth } = await sb.auth.getSession()
  if (!auth.session) {
    const { error } = await sb.auth.signInAnonymously()
    if (error) throw new Error(error.message)
  }
  const { data: userData } = await sb.auth.getUser()
  const uid = userData.user!.id
  const { data, error } = await sb
    .from('game_players')
    .upsert(
      {
        session_id: sessionId,
        auth_uid: uid,
        nickname: nickname.trim().slice(0, 24),
        cash: STARTING_CASH,
        holdings: {},
      },
      { onConflict: 'session_id,auth_uid' },
    )
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as GamePlayer
}

export async function listPlayers(sessionId: string): Promise<GamePlayer[]> {
  const sb = requireSupabase()
  const { data, error } = await sb
    .from('game_players')
    .select()
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as GamePlayer[]
}

export async function updateSession(
  id: string,
  patch: Partial<Pick<GameSession, 'stage' | 'reveal_index'>>,
): Promise<void> {
  const sb = requireSupabase()
  const { error } = await sb.from('game_sessions').update(patch).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function updatePlayer(
  id: string,
  patch: { cash: number; holdings: Holdings },
): Promise<void> {
  const sb = requireSupabase()
  const { error } = await sb.from('game_players').update(patch).eq('id', id)
  if (error) throw new Error(error.message)
}

/** Subscribe to session + player changes. Returns an unsubscribe function. */
export function subscribeToGame(
  sessionId: string,
  onSession: (s: GameSession) => void,
  onPlayers: () => void,
): () => void {
  const sb = requireSupabase()
  const channel: RealtimeChannel = sb
    .channel(`game-${sessionId}`)
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'game_sessions', filter: `id=eq.${sessionId}` },
      (payload) => onSession(payload.new as GameSession),
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'game_players', filter: `session_id=eq.${sessionId}` },
      () => onPlayers(),
    )
    .subscribe()
  return () => {
    void sb.removeChannel(channel)
  }
}

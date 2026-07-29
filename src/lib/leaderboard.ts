// Client access to the persistent class leaderboard RPC (see migration 0011).
// XP here is server-authoritative and uses the same formula as src/lib/xp.ts.

import { getSupabase } from './supabase'

export interface LeaderboardRow {
  student_id: string
  nickname: string
  xp: number
  activities_completed: number
}

/** Ranked standings for a classroom, XP from high to low. Empty if backend is off. */
export async function fetchLeaderboard(classroomId: string): Promise<LeaderboardRow[]> {
  const supabase = await getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase.rpc('classroom_leaderboard', {
    p_classroom_id: classroomId,
  })
  if (error) throw error
  return (data ?? []) as LeaderboardRow[]
}

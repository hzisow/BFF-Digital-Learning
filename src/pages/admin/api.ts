// Data helpers + row types for the mentor/admin pages.
//
// Every query here runs through Supabase RLS: mentors only ever see the
// classrooms they created, and the students / assignments / progress that
// belong to those classrooms. There is no service key in the browser.

import { useCallback, useRef, useState } from 'react'
import { requireSupabase } from '../../lib/supabase'

// ---------- Row types (mirror supabase/migrations exactly) ----------

export interface Classroom {
  id: string
  name: string
  school: string | null
  code: string
  created_by: string
  archived: boolean
  created_at: string
}

export interface StudentRow {
  id: string
  classroom_id: string
  nickname: string
  created_at: string
}

export interface AssignmentRow {
  id: string
  classroom_id: string
  activity_slug: string
  note: string | null
  due_at: string | null
  created_by: string
  created_at: string
}

export interface ProgressRow {
  id: string
  student_id: string
  activity_slug: string
  status: 'started' | 'completed'
  score: number | null
  data: unknown
  updated_at: string
}

export interface ProfileRow {
  id: string
  email: string
  full_name: string
  chapter: string
  approved: boolean
  created_at: string
}

// ---------- Small utilities ----------

/** Unambiguous characters only (no 0/O, 1/I) — matches game codes. */
const CODE_CHARSET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function makeClassCode(): string {
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += CODE_CHARSET[Math.floor(Math.random() * CODE_CHARSET.length)]
  }
  return code
}

export function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : String(e)
}

export function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Copy-to-clipboard with a short "Copied!" flash. */
export function useCopy(): { copied: boolean; copy: (text: string) => void } {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const copy = useCallback((text: string) => {
    const write = navigator.clipboard?.writeText(text)
    if (!write) return
    write
      .then(() => {
        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {
        // Clipboard blocked (permissions / insecure context) — nothing to do.
      })
  }, [])
  return { copied, copy }
}

// ---------- Team approval ----------

/** The signed-in team member's own profile (null if not created yet). */
export async function fetchMyProfile(uid: string): Promise<ProfileRow | null> {
  const db = await requireSupabase()
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', uid)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return (data as ProfileRow | null) ?? null
}

/** Pending (un-approved) team members — visible only to approved admins. */
export async function fetchPendingAdmins(): Promise<ProfileRow[]> {
  const db = await requireSupabase()
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('approved', false)
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as ProfileRow[]
}

/** Approve a pending member (approved admins only; enforced server-side). */
export async function approveTeamMember(userId: string): Promise<void> {
  const db = await requireSupabase()
  const { error } = await db.rpc('approve_team_member', { p_user_id: userId })
  if (error) throw new Error(error.message)
}

// ---------- Classrooms ----------

export async function fetchClassrooms(
  uid: string,
): Promise<{ classrooms: Classroom[]; studentCounts: Record<string, number> }> {
  const db = await requireSupabase()
  const { data, error } = await db
    .from('classrooms')
    .select('*')
    .eq('created_by', uid)
    .eq('archived', false)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  const classrooms = (data ?? []) as Classroom[]

  const studentCounts: Record<string, number> = {}
  if (classrooms.length > 0) {
    const { data: rows, error: sErr } = await db
      .from('students')
      .select('classroom_id')
      .in(
        'classroom_id',
        classrooms.map((c) => c.id),
      )
    if (sErr) throw new Error(sErr.message)
    for (const row of (rows ?? []) as Array<{ classroom_id: string }>) {
      studentCounts[row.classroom_id] = (studentCounts[row.classroom_id] ?? 0) + 1
    }
  }
  return { classrooms, studentCounts }
}

export async function createClassroom(
  uid: string,
  name: string,
  school: string,
): Promise<void> {
  const db = await requireSupabase()
  const { error } = await db.from('classrooms').insert({
    name: name.trim(),
    school: school.trim() || null,
    code: makeClassCode(),
    created_by: uid,
  })
  if (error) throw new Error(error.message)
}

/** Returns null when the class doesn't exist — or RLS hid it (not yours). */
export async function fetchClassroom(id: string): Promise<Classroom | null> {
  const db = await requireSupabase()
  const { data, error } = await db
    .from('classrooms')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return (data as Classroom | null) ?? null
}

export async function archiveClassroom(id: string): Promise<void> {
  const db = await requireSupabase()
  const { error } = await db.from('classrooms').update({ archived: true }).eq('id', id)
  if (error) throw new Error(error.message)
}

// ---------- Assignments ----------

export async function fetchAssignments(classroomId: string): Promise<AssignmentRow[]> {
  const db = await requireSupabase()
  const { data, error } = await db
    .from('assignments')
    .select('*')
    .eq('classroom_id', classroomId)
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as AssignmentRow[]
}

export async function addAssignment(input: {
  classroomId: string
  activitySlug: string
  note: string | null
  dueAt: string | null
  uid: string
}): Promise<void> {
  const db = await requireSupabase()
  const { error } = await db.from('assignments').insert({
    classroom_id: input.classroomId,
    activity_slug: input.activitySlug,
    note: input.note,
    due_at: input.dueAt,
    created_by: input.uid,
  })
  if (error) throw new Error(error.message)
}

export async function deleteAssignment(id: string): Promise<void> {
  const db = await requireSupabase()
  const { error } = await db.from('assignments').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ---------- Students & progress ----------

export async function fetchRoster(
  classroomId: string,
): Promise<{ students: StudentRow[]; progress: ProgressRow[] }> {
  const db = await requireSupabase()
  const { data, error } = await db
    .from('students')
    .select('*')
    .eq('classroom_id', classroomId)
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  const students = (data ?? []) as StudentRow[]

  let progress: ProgressRow[] = []
  if (students.length > 0) {
    const { data: rows, error: pErr } = await db
      .from('progress')
      .select('*')
      .in(
        'student_id',
        students.map((s) => s.id),
      )
    if (pErr) throw new Error(pErr.message)
    progress = (rows ?? []) as ProgressRow[]
  }
  return { students, progress }
}

// ---------- Roster management ----------
//
// Students type their own first name and last initial, so a class of thirty
// will produce typos: "Jaden M" on Monday and "Jayden M" on Tuesday are two
// records with split progress. Before these existed a mentor had no way to fix
// either one — RLS lets them read their students but never write.
//
// All three go through SECURITY DEFINER functions (migration 0014) rather than
// widened policies, because rename has to fail cleanly on the
// (classroom, lower(nickname)) unique index and merge has to reconcile two sets
// of progress rows.

/** Turn a Postgres `raise exception 'code'` into something a mentor can read. */
function rosterError(message: string): Error {
  if (message.includes('name_taken')) {
    return new Error('Another student in this class already has that name.')
  }
  if (message.includes('name_required')) return new Error('Enter a name.')
  if (message.includes('not_authorized')) {
    return new Error('That student is not in one of your classes.')
  }
  if (message.includes('different_classrooms')) {
    return new Error('Those two students are in different classes.')
  }
  if (message.includes('same_student')) return new Error('Pick two different students.')
  // The function is missing entirely — migration 0014 has not been run.
  if (/function .*(rename_student|remove_student|merge_students)/i.test(message)) {
    return new Error(
      'Roster editing is not set up on this project yet. Run migration 0014_roster_management.sql.',
    )
  }
  return new Error(message)
}

/** Fix a typo, or tell two students with the same name apart. */
export async function renameStudent(studentId: string, name: string): Promise<void> {
  const db = await requireSupabase()
  const { error } = await db.rpc('rename_student', {
    p_student_id: studentId,
    p_name: name,
  })
  if (error) throw rosterError(error.message)
}

/** Delete a stray record. Its progress goes with it (ON DELETE CASCADE). */
export async function removeStudent(studentId: string): Promise<void> {
  const db = await requireSupabase()
  const { error } = await db.rpc('remove_student', { p_student_id: studentId })
  if (error) throw rosterError(error.message)
}

/**
 * Fold one duplicate into another, keeping the better record for every activity
 * (completed beats started, higher score wins), then delete the duplicate.
 */
export async function mergeStudents(fromId: string, intoId: string): Promise<void> {
  const db = await requireSupabase()
  const { error } = await db.rpc('merge_students', { p_from: fromId, p_into: intoId })
  if (error) throw rosterError(error.message)
}

// ---------- Platform statistics ----------

export interface PlatformStats {
  generated_at: string
  students_total: number
  students_active_7d: number
  students_active_30d: number
  mentors_approved: number
  mentors_pending: number
  classrooms_total: number
  classrooms_active: number
  schools: number
  activities_completed: number
  lessons_completed: number
  lessons_passed: number
  avg_quiz_score: number | null
  graduates: number
  live_sessions: number
  signups_by_week: Array<{ week: string; count: number }>
  top_activities: Array<{ slug: string; count: number }>
}

/**
 * Org-wide counts for the platform dashboard.
 *
 * RLS scopes every other query to one mentor's own classes, which cannot answer
 * "how many students are on the platform". This goes through a security-definer
 * function that returns counts only and is gated to approved team members.
 */
export async function fetchPlatformStats(): Promise<PlatformStats> {
  const db = await requireSupabase()
  const { data, error } = await db.rpc('platform_stats')
  if (error) throw new Error(error.message)
  return data as PlatformStats
}

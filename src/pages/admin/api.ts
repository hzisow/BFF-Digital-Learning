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
  const db = requireSupabase()
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
  const db = requireSupabase()
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
  const db = requireSupabase()
  const { error } = await db.rpc('approve_team_member', { p_user_id: userId })
  if (error) throw new Error(error.message)
}

// ---------- Classrooms ----------

export async function fetchClassrooms(
  uid: string,
): Promise<{ classrooms: Classroom[]; studentCounts: Record<string, number> }> {
  const db = requireSupabase()
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
  const db = requireSupabase()
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
  const db = requireSupabase()
  const { data, error } = await db
    .from('classrooms')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return (data as Classroom | null) ?? null
}

export async function archiveClassroom(id: string): Promise<void> {
  const db = requireSupabase()
  const { error } = await db.from('classrooms').update({ archived: true }).eq('id', id)
  if (error) throw new Error(error.message)
}

// ---------- Assignments ----------

export async function fetchAssignments(classroomId: string): Promise<AssignmentRow[]> {
  const db = requireSupabase()
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
  const db = requireSupabase()
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
  const db = requireSupabase()
  const { error } = await db.from('assignments').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ---------- Students & progress ----------

export async function fetchRoster(
  classroomId: string,
): Promise<{ students: StudentRow[]; progress: ProgressRow[] }> {
  const db = requireSupabase()
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

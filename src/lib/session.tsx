import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { getSupabase, hasStoredSession, requireSupabase } from './supabase'
import { BACKEND_ENABLED } from './config'
import { reconcileProgress } from './progress'

// ---------- Student session (class code + first name & last initial) ----------
//
// `nickname` holds the composed display name ("Jayden M."). The column name is
// historical: identity is (classroom, name), which is what lets a student
// reconnect from another device by typing the same thing again.

export interface StudentSession {
  studentId: string
  nickname: string
  classroomId: string
  classroomName: string
  classCode: string
}

const STUDENT_KEY = 'bff_student_session'

interface StudentCtx {
  student: StudentSession | null
  joinClass: (code: string, displayName: string) => Promise<StudentSession>
  leaveClass: () => void
}

const StudentContext = createContext<StudentCtx | null>(null)

function loadStudent(): StudentSession | null {
  try {
    const raw = localStorage.getItem(STUDENT_KEY)
    return raw ? (JSON.parse(raw) as StudentSession) : null
  } catch {
    return null
  }
}

// ---------- Admin session (email accounts for the BFF team) ----------

export interface AdminProfile {
  id: string
  email: string
  fullName: string
}

interface AdminCtx {
  adminUser: User | null
  adminReady: boolean
}

const AdminContext = createContext<AdminCtx>({ adminUser: null, adminReady: true })

export function SessionProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<StudentSession | null>(loadStudent)
  const [adminUser, setAdminUser] = useState<User | null>(null)
  // With nothing stored to restore there is no session to wait for, so the app
  // is "ready" immediately and never loads the auth client at all.
  const [adminReady, setAdminReady] = useState(!BACKEND_ENABLED || !hasStoredSession())

  useEffect(() => {
    // A first-time or solo visitor has no session on this device. Skipping the
    // load here is the whole point: the Supabase client is 51KB gzip, and it
    // used to be fetched on the critical path of every page whether or not
    // anyone was signed in.
    if (!BACKEND_ENABLED || !hasStoredSession()) return

    let cancelled = false
    let unsubscribe: (() => void) | undefined

    function applySession(session: Session | null) {
      // Anonymous sessions belong to students; email sessions to the team.
      const user = session?.user ?? null
      setAdminUser(user && !user.is_anonymous ? user : null)
    }

    void getSupabase().then(async (client) => {
      if (!client || cancelled) return
      const { data } = await client.auth.getSession()
      if (cancelled) return
      applySession(data.session)
      setAdminReady(true)
      const { data: sub } = client.auth.onAuthStateChange((_evt, session) => {
        applySession(session)
      })
      unsubscribe = () => sub.subscription.unsubscribe()
      // The effect may have been torn down while the client was downloading.
      if (cancelled) unsubscribe()
    })

    return () => {
      cancelled = true
      unsubscribe?.()
    }
  }, [])

  const joinClass = useCallback(async (code: string, displayName: string) => {
    if (!BACKEND_ENABLED) {
      throw new Error(
        'Class codes are not live yet — ask your BFF mentor, or explore the activities in solo mode!',
      )
    }
    // Joining is the moment a solo visitor becomes a connected one, so this is
    // the right place to pay for the client.
    const supabase = await requireSupabase()
    const cleanCode = code.trim().toUpperCase()
    const cleanNick = displayName.trim().slice(0, 24)
    if (!cleanCode || !cleanNick) throw new Error('Enter your class code and your name.')

    // Students sign in anonymously — no email or personal info collected.
    const { data: auth } = await supabase.auth.getSession()
    if (!auth.session) {
      const { error } = await supabase.auth.signInAnonymously()
      if (error) throw new Error(`Could not start a session: ${error.message}`)
    }
    const { data, error } = await supabase.rpc('join_classroom', {
      p_code: cleanCode,
      p_nickname: cleanNick,
      // The PIN argument still exists on the database function and is left null:
      // students identify by name now, so nothing sets a PIN, and the reconnect
      // path only demands one for records that already have a hash stored.
      p_pin: null,
    })
    if (error) {
      const m = error.message
      if (m.includes('classroom_not_found')) {
        throw new Error('That class code was not found. Double-check it with your mentor!')
      }
      // Records created before names replaced PINs may still carry a PIN hash.
      // There is no PIN box any more, so point at the way out rather than
      // asking for something the screen cannot collect.
      if (m.includes('pin_required') || m.includes('pin_incorrect')) {
        throw new Error(
          `"${cleanNick}" is already taken in this class by an older sign-in. Ask your mentor to clear it, or add another letter of your last name.`,
        )
      }
      throw new Error(m)
    }
    const row = Array.isArray(data) ? data[0] : data
    const sess: StudentSession = {
      studentId: row.student_id,
      nickname: cleanNick,
      classroomId: row.classroom_id,
      classroomName: row.classroom_name,
      classCode: cleanCode,
    }
    localStorage.setItem(STUDENT_KEY, JSON.stringify(sess))
    setStudent(sess)
    // Pull any existing progress for this record onto this device (and push
    // this device's progress up) so it's the same everywhere.
    await reconcileProgress(sess)
    return sess
  }, [])

  const leaveClass = useCallback(() => {
    localStorage.removeItem(STUDENT_KEY)
    setStudent(null)
  }, [])

  const studentValue = useMemo(
    () => ({ student, joinClass, leaveClass }),
    [student, joinClass, leaveClass],
  )
  const adminValue = useMemo(() => ({ adminUser, adminReady }), [adminUser, adminReady])

  return (
    <AdminContext.Provider value={adminValue}>
      <StudentContext.Provider value={studentValue}>{children}</StudentContext.Provider>
    </AdminContext.Provider>
  )
}

export function useStudent(): StudentCtx {
  const ctx = useContext(StudentContext)
  if (!ctx) throw new Error('useStudent must be used inside SessionProvider')
  return ctx
}

export function useAdmin(): AdminCtx {
  return useContext(AdminContext)
}

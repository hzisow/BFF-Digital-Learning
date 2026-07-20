import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ACTIVITIES, KIND_LABEL, getActivity } from '../../lib/activities'
import { BACKEND_ENABLED } from '../../lib/config'
import type { ActivityProgress } from '../../lib/progress'
import { loadLocalProgress } from '../../lib/progress'
import { totalXp } from '../../lib/xp'
import { useStudent } from '../../lib/session'
import LevelCard from '../../components/LevelCard'
import ClassLeaderboard from '../../components/ClassLeaderboard'

interface AssignmentRow {
  activity_slug: string
  note: string | null
  due_at: string | null
}

function ProgressChip({ progress }: { progress: ActivityProgress | undefined }) {
  if (progress?.status === 'completed') {
    return (
      <span className="chip bg-green-100 text-green-700">
        <span aria-hidden="true">✓</span> Completed
        {progress.score != null ? ` · ${Math.round(progress.score)}%` : ''}
      </span>
    )
  }
  if (progress?.status === 'started') {
    return <span className="chip bg-amber-100 text-amber-700">In progress</span>
  }
  return <span className="chip bg-slate-100 text-slate-600">Not started</span>
}

function formatDue(dueAt: string): string {
  const due = new Date(dueAt)
  if (Number.isNaN(due.getTime())) return dueAt
  return due.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function StudentHome() {
  const { student, leaveClass } = useStudent()
  const navigate = useNavigate()
  const progress = useMemo(() => loadLocalProgress(), [])

  // null = loading; [] = loaded and empty (or backend disabled).
  const [assignments, setAssignments] = useState<AssignmentRow[] | null>(
    BACKEND_ENABLED ? null : [],
  )
  const [loadError, setLoadError] = useState<string | null>(null)
  // true once we confirm the mentor archived (closed) this class.
  const [classClosed, setClassClosed] = useState(false)

  const classroomId = student?.classroomId
  const studentId = student?.studentId
  useEffect(() => {
    if (!BACKEND_ENABLED || !classroomId || !studentId) return
    let cancelled = false
    async function load() {
      const { supabase } = await import('../../lib/supabase')
      if (!supabase) {
        if (!cancelled) setAssignments([])
        return
      }
      // Is the class still open? An archived class should read as closed.
      const { data: state } = await supabase.rpc('student_classroom_state', {
        p_student_id: studentId,
      })
      const row = Array.isArray(state) ? state[0] : state
      if (!cancelled && row?.archived === true) {
        setClassClosed(true)
        setAssignments([])
        return
      }

      const { data, error } = await supabase
        .from('assignments')
        .select('activity_slug, note, due_at')
        .eq('classroom_id', classroomId)
        .order('due_at', { ascending: true, nullsFirst: false })
      if (cancelled) return
      if (error) {
        setLoadError('Could not load your assignments right now — pull up the lessons below instead!')
        setAssignments([])
      } else {
        setAssignments((data ?? []) as AssignmentRow[])
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [classroomId, studentId])

  const allActivities = useMemo(() => [...ACTIVITIES].sort((a, b) => a.sortKey - b.sortKey), [])
  const completedCount = allActivities.filter(
    (a) => progress[a.slug]?.status === 'completed',
  ).length
  const xp = useMemo(() => totalXp(progress), [progress])

  if (!student) {
    return <Navigate to="/join" replace />
  }

  function handleLeave() {
    const sure = window.confirm(
      'Leave this class? Your progress stays saved on this device, but you will need the class code to rejoin.',
    )
    if (!sure) return
    leaveClass()
    navigate('/')
  }

  // The mentor archived (closed) this class — the student can no longer use it.
  if (classClosed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="card animate-pop-in text-center">
          <p className="text-5xl" aria-hidden="true">🔒</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
            This class is closed
          </h1>
          <p className="mt-3 leading-relaxed text-slate-600">
            Your mentor closed <span className="font-semibold">{student.classroomName}</span>, so
            it's no longer active. Your progress is still saved — and every lesson, game, and
            challenge is still open to explore on your own.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/lessons" className="btn-primary">
              Keep learning <span aria-hidden="true">📚</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                leaveClass()
                navigate('/join')
              }}
              className="btn-secondary"
            >
              Join a different class
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Hey {student.nickname}! <span aria-hidden="true">👋</span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="chip bg-bff-100 text-bff-800">
              <span aria-hidden="true">🏫</span> {student.classroomName}
            </span>
            <span className="chip bg-slate-100 text-slate-600">Code: {student.classCode}</span>
          </div>
        </div>
        <button type="button" onClick={handleLeave} className="btn-ghost text-sm">
          Leave class
        </button>
      </div>

      {/* Level + XP */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <LevelCard xp={xp} />
        <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-6 py-4">
          <p className="font-display font-semibold text-slate-700">
            {completedCount > 0
              ? `You've completed ${completedCount} of ${allActivities.length} activities 🎉`
              : `${allActivities.length} activities are waiting for you — let's get that first one done! 💪`}
          </p>
        </div>
      </div>

      {/* Class leaderboard */}
      {BACKEND_ENABLED && classroomId && (
        <section className="mt-8">
          <ClassLeaderboard classroomId={classroomId} highlightStudentId={studentId} />
        </section>
      )}

      {/* Assigned work */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-slate-900">Your assigned work</h2>
        {loadError && (
          <p
            role="alert"
            className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700"
          >
            {loadError}
          </p>
        )}
        {assignments === null ? (
          <p role="status" className="mt-4 text-sm text-slate-500">
            Loading your assignments…
          </p>
        ) : assignments.length === 0 ? (
          !loadError && (
            <div className="card mt-4 text-center">
              <p className="text-3xl" aria-hidden="true">🏖️</p>
              <p className="mt-2 font-display font-semibold text-slate-700">
                Nothing assigned yet — explore below!
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Your mentor will post lessons and games here as your class works through
                BFF Academy.
              </p>
            </div>
          )
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {assignments.map((asg) => {
              const activity = getActivity(asg.activity_slug)
              if (!activity) return null
              const p = progress[activity.slug]
              return (
                <div key={asg.activity_slug} className="card flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden="true">{activity.emoji}</span>
                      <div>
                        <p className="font-display font-bold text-slate-900">{activity.title}</p>
                        <p className="text-xs font-semibold text-slate-500">
                          {KIND_LABEL[activity.kind]} · ~{activity.durationMin} min
                        </p>
                      </div>
                    </div>
                    <ProgressChip progress={p} />
                  </div>
                  {asg.note && (
                    <p className="mt-3 rounded-xl bg-bff-50 px-4 py-3 text-sm text-bff-900">
                      <span aria-hidden="true">💬</span>{' '}
                      <span className="font-semibold">From your mentor:</span> {asg.note}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      {asg.due_at ? (
                        <>
                          <span aria-hidden="true">📅</span> Due {formatDue(asg.due_at)}
                        </>
                      ) : (
                        'No due date'
                      )}
                    </span>
                    <Link to={activity.path} className="btn-primary px-4 py-2 text-sm">
                      {p?.status === 'completed'
                        ? 'Play again'
                        : p?.status === 'started'
                          ? 'Continue'
                          : 'Start'}{' '}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Keep learning */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-slate-900">Keep learning</h2>
        <p className="mt-1 text-sm text-slate-500">
          Everything in BFF Classroom is open to you — assigned or not.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allActivities.map((a) => {
            const p = progress[a.slug]
            return (
              <Link
                key={a.slug}
                to={a.path}
                className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-bff-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl" aria-hidden="true">{a.emoji}</span>
                  <span className="chip bg-bff-50 text-bff-700">{KIND_LABEL[a.kind]}</span>
                </div>
                <p className="mt-3 font-display font-bold text-slate-900 group-hover:text-bff-700">
                  {a.title}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    <span aria-hidden="true">⏱️</span> ~{a.durationMin} min
                  </span>
                  <ProgressChip progress={p} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

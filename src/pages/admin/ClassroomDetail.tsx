// Single classroom view: code, assignments, live game, students & progress.

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { BACKEND_ENABLED } from '../../lib/config'
import { useAdmin } from '../../lib/session'
import { ACTIVITIES, getActivity } from '../../lib/activities'
import { createSession } from '../../activities/wolf/live'
import { BackendOffCard } from './TeamAuth'
import {
  addAssignment,
  archiveClassroom,
  deleteAssignment,
  errMsg,
  fetchAssignments,
  fetchClassroom,
  fetchRoster,
  formatDate,
  useCopy,
  type AssignmentRow,
  type Classroom,
  type ProgressRow,
  type StudentRow,
} from './api'

function ProgressChip({ row }: { row: ProgressRow | undefined }) {
  if (!row) {
    return (
      <span className="chip bg-slate-100 text-slate-500">
        <span aria-hidden="true">—</span>
        <span className="sr-only">Not started</span>
      </span>
    )
  }
  if (row.status === 'completed') {
    return (
      <span className="chip bg-green-100 text-green-700">
        <span aria-hidden="true">✓{row.score != null ? ` ${row.score}` : ''}</span>
        <span className="sr-only">
          Completed{row.score != null ? `, score ${row.score}` : ''}
        </span>
      </span>
    )
  }
  return (
    <span className="chip bg-amber-100 text-amber-700">
      <span aria-hidden="true">●</span> started
    </span>
  )
}

export default function ClassroomDetail() {
  const { id } = useParams<{ id: string }>()
  const { adminUser, adminReady } = useAdmin()
  const navigate = useNavigate()
  const uid = adminUser?.id ?? null
  const { copied, copy } = useCopy()

  const [classroom, setClassroom] = useState<Classroom | null>(null)
  const [assignments, setAssignments] = useState<AssignmentRow[]>([])
  const [students, setStudents] = useState<StudentRow[]>([])
  const [progress, setProgress] = useState<ProgressRow[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Assign-an-activity form
  const [slug, setSlug] = useState('')
  const [note, setNote] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assigning, setAssigning] = useState(false)
  const [assignError, setAssignError] = useState<string | null>(null)

  const [archiving, setArchiving] = useState(false)
  const [hosting, setHosting] = useState(false)
  const [hostError, setHostError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!id || !uid) return
    setLoading(true)
    setError(null)
    try {
      const c = await fetchClassroom(id)
      if (!c) {
        setNotFound(true)
        return
      }
      setNotFound(false)
      setClassroom(c)
      const [asg, roster] = await Promise.all([fetchAssignments(id), fetchRoster(id)])
      setAssignments(asg)
      setStudents(roster.students)
      setProgress(roster.progress)
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setLoading(false)
    }
  }, [id, uid])

  useEffect(() => {
    void load()
  }, [load])

  if (!BACKEND_ENABLED) return <BackendOffCard />
  if (!adminReady) {
    return (
      <div role="status" className="px-4 py-16 text-center text-slate-500">
        Loading…
      </div>
    )
  }
  if (!adminUser) return <Navigate to="/team" replace />

  if (notFound) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="card text-center">
          <div className="text-4xl" aria-hidden>
            🔍
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold text-slate-900">
            Classroom not found
          </h1>
          <p className="mt-2 text-slate-600">
            This class doesn&apos;t exist, was archived, or belongs to another
            mentor.
          </p>
          <Link to="/admin" className="btn-secondary mt-6">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (loading && !classroom) {
    return (
      <div role="status" className="px-4 py-16 text-center text-slate-500">
        Loading class…
      </div>
    )
  }

  if (!classroom) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          Could not load this class{error ? `: ${error}` : '.'}
        </p>
        <div className="mt-4 flex gap-3">
          <button type="button" className="btn-primary" onClick={() => void load()}>
            Try again
          </button>
          <Link to="/admin" className="btn-ghost">
            ← Dashboard
          </Link>
        </div>
      </div>
    )
  }

  async function handleArchive() {
    if (!classroom) return
    const ok = window.confirm(
      `Archive "${classroom.name}"? It will disappear from your dashboard and students can no longer join with its code.`,
    )
    if (!ok) return
    setArchiving(true)
    try {
      await archiveClassroom(classroom.id)
      navigate('/admin')
    } catch (err) {
      setError(errMsg(err))
      setArchiving(false)
    }
  }

  async function handleAssign(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!id || !uid || !slug) return
    setAssigning(true)
    setAssignError(null)
    try {
      await addAssignment({
        classroomId: id,
        activitySlug: slug,
        note: note.trim() || null,
        // <input type="date"> gives YYYY-MM-DD; make it due end of that day, local time.
        dueAt: dueDate ? new Date(`${dueDate}T23:59:00`).toISOString() : null,
        uid,
      })
      setSlug('')
      setNote('')
      setDueDate('')
      await load()
    } catch (err) {
      setAssignError(errMsg(err))
    } finally {
      setAssigning(false)
    }
  }

  async function handleUnassign(assignment: AssignmentRow) {
    const meta = getActivity(assignment.activity_slug)
    const ok = window.confirm(
      `Remove "${meta?.title ?? assignment.activity_slug}" from this class? Student progress is kept.`,
    )
    if (!ok) return
    try {
      await deleteAssignment(assignment.id)
      await load()
    } catch (err) {
      setError(errMsg(err))
    }
  }

  async function handleHost() {
    if (!classroom) return
    setHosting(true)
    setHostError(null)
    try {
      const session = await createSession(classroom.id)
      navigate(`/host/${session.id}`)
    } catch (err) {
      setHostError(errMsg(err))
      setHosting(false)
    }
  }

  // ---------- Derived data ----------

  const assignedSlugs = new Set(assignments.map((a) => a.activity_slug))
  const unassigned = ACTIVITIES.filter((a) => !assignedSlugs.has(a.slug))
  const unassignedLessons = unassigned.filter((a) => a.kind === 'lesson')
  const unassignedOther = unassigned.filter((a) => a.kind !== 'lesson')

  // student id -> (activity slug -> progress row)
  const progressByStudent = new Map<string, Map<string, ProgressRow>>()
  for (const p of progress) {
    let m = progressByStudent.get(p.student_id)
    if (!m) {
      m = new Map()
      progressByStudent.set(p.student_id, m)
    }
    m.set(p.activity_slug, p)
  }

  const summaries = assignments.map((a) => {
    const meta = getActivity(a.activity_slug)
    const rows = progress.filter(
      (p) => p.activity_slug === a.activity_slug && p.status === 'completed',
    )
    const scores = rows.filter((p) => p.score != null).map((p) => p.score as number)
    const avg =
      scores.length > 0
        ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)
        : null
    return {
      slug: a.activity_slug,
      title: meta ? `${meta.emoji} ${meta.title}` : a.activity_slug,
      completed: rows.length,
      total: students.length,
      avg,
    }
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* ---------- Header ---------- */}
      <Link to="/admin" className="text-sm font-semibold text-bff-700 hover:text-bff-800">
        <span aria-hidden="true">←</span> All classrooms
      </Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            {classroom.name}
          </h1>
          <p className="mt-1 text-slate-600">
            {classroom.school ?? 'No school listed'} · {students.length} student
            {students.length === 1 ? '' : 's'}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span
              className="rounded-xl bg-bff-50 px-5 py-2 font-mono text-3xl font-bold tracking-[0.25em] text-bff-700"
              aria-label={`Class code ${classroom.code}`}
            >
              {classroom.code}
            </span>
            <button
              type="button"
              className="btn-ghost text-sm"
              onClick={() => copy(classroom.code)}
              aria-label={
                copied
                  ? `Class code ${classroom.code} copied`
                  : `Copy class code ${classroom.code}`
              }
            >
              <span aria-hidden="true">{copied ? '✓ Copied' : 'Copy'}</span>
            </button>
            <span role="status" className="sr-only">
              {copied ? `Class code ${classroom.code} copied` : ''}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-ghost text-sm"
            onClick={() => void load()}
            disabled={loading}
          >
            <span aria-hidden="true">↻</span> {loading ? 'Refreshing…' : 'Refresh'}
          </button>
          <button
            type="button"
            className="btn-ghost text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => void handleArchive()}
            disabled={archiving}
          >
            {archiving ? 'Archiving…' : 'Archive class'}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* ---------- Assignments ---------- */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            Assignments
          </h2>

          {assignments.length === 0 ? (
            <p className="card mt-4 text-sm text-slate-500">
              Nothing assigned yet — pick an activity below and it will show up
              on every student&apos;s home page.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {assignments.map((a) => {
                const meta = getActivity(a.activity_slug)
                return (
                  <li key={a.id} className="card flex items-start gap-3 p-4">
                    <span className="text-2xl" aria-hidden>
                      {meta?.emoji ?? '📄'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-semibold text-slate-900">
                        {meta?.title ?? a.activity_slug}
                      </p>
                      {a.note && <p className="text-sm text-slate-600">{a.note}</p>}
                      {a.due_at && (
                        <p className="mt-0.5 text-xs font-semibold text-bff-700">
                          Due {formatDate(a.due_at)}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn-ghost px-2 py-1 text-sm text-slate-500 hover:text-red-600"
                      onClick={() => void handleUnassign(a)}
                      aria-label={`Remove assignment ${meta?.title ?? a.activity_slug}`}
                    >
                      <span aria-hidden="true">✕</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Assign an activity */}
          <form
            onSubmit={handleAssign}
            className="card mt-4 flex flex-col gap-3 border-2 border-dashed border-bff-200 bg-bff-50/40"
          >
            <h3 className="font-display font-bold text-slate-900">
              Assign an activity
            </h3>
            {unassigned.length === 0 ? (
              <p className="text-sm text-slate-500">
                Every activity is already assigned — nice! 🎉
              </p>
            ) : (
              <>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">
                    Activity<span className="text-red-500"> *</span>
                  </span>
                  <select
                    className="input"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Choose an activity…
                    </option>
                  {unassignedLessons.length > 0 && (
                    <optgroup label="Lessons">
                      {unassignedLessons.map((a) => (
                        <option key={a.slug} value={a.slug}>
                          {a.emoji} {a.title}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {unassignedOther.length > 0 && (
                    <optgroup label="Games & Challenges">
                      {unassignedOther.map((a) => (
                        <option key={a.slug} value={a.slug}>
                          {a.emoji} {a.title}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">
                    Note for students{' '}
                    <span className="font-normal text-slate-500">(optional)</span>
                  </span>
                  <input
                    className="input"
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Finish before Friday's class"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">
                    Due date <span className="font-normal text-slate-500">(optional)</span>
                  </span>
                  <input
                    className="input"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </label>
                {assignError && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {assignError}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={assigning || !slug}
                >
                  {assigning ? 'Assigning…' : 'Assign'}
                </button>
              </>
            )}
          </form>
        </section>

        {/* ---------- Live game ---------- */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Live game</h2>
          <div className="card mt-4">
            <div className="flex items-start gap-3">
              <span className="text-3xl" aria-hidden>
                🐺
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Wolf of Wall Street — live
                </h3>
                <p className="text-sm text-slate-600">
                  Host a live market game for this class. Put the host screen on
                  the projector; students join from their devices with the game
                  code.
                </p>
              </div>
            </div>
            {hostError && (
              <p
                role="alert"
                className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {hostError}
              </p>
            )}
            <button
              type="button"
              className="btn-primary mt-4"
              onClick={() => void handleHost()}
              disabled={hosting}
            >
              {hosting ? 'Starting…' : 'Start a live game'}
            </button>
          </div>
        </section>
      </div>

      {/* ---------- Students & progress ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Students &amp; progress
        </h2>

        {students.length === 0 ? (
          <div className="card mt-4 text-center">
            <div className="text-3xl" aria-hidden>
              🎒
            </div>
            <p className="mt-2 font-display font-semibold text-slate-700">
              No students yet
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              Share the class code{' '}
              <span className="font-mono font-bold tracking-widest text-bff-700">
                {classroom.code}
              </span>{' '}
              — students join at this site → Join Class, with just a nickname.
              No email needed.
            </p>
          </div>
        ) : (
          <>
            <div className="card mt-4 overflow-x-auto p-0">
              <table className="w-full min-w-max text-left text-sm">
                <caption className="sr-only">
                  Students in {classroom.name} and their progress on each assigned
                  activity
                </caption>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Student
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Joined
                    </th>
                    {assignments.map((a) => {
                      const meta = getActivity(a.activity_slug)
                      return (
                        <th
                          key={a.id}
                          scope="col"
                          className="whitespace-nowrap px-4 py-3 font-semibold"
                        >
                          <span aria-hidden>{meta?.emoji ?? '📄'}</span>{' '}
                          {meta?.title ?? a.activity_slug}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const byActivity = progressByStudent.get(s.id)
                    return (
                      <tr key={s.id} className="border-b border-slate-100 last:border-0">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-800"
                        >
                          {s.nickname}
                        </th>
                        <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                          {formatDate(s.created_at)}
                        </td>
                        {assignments.map((a) => (
                          <td key={a.id} className="px-4 py-3">
                            <ProgressChip row={byActivity?.get(a.activity_slug)} />
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {assignments.length === 0 && (
              <p className="mt-2 text-sm text-slate-500">
                Assign an activity above to start tracking progress here.
              </p>
            )}

            {/* Per-activity completion summary */}
            {summaries.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {summaries.map((sm) => {
                  const pct = sm.total > 0 ? Math.round((sm.completed / sm.total) * 100) : 0
                  return (
                    <div key={sm.slug} className="card p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-sm font-semibold text-slate-800">
                          {sm.title}
                        </p>
                        <p className="whitespace-nowrap text-xs text-slate-500">
                          {sm.completed}/{sm.total} completed
                          {sm.avg != null && `, avg score ${sm.avg}`}
                        </p>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-bff-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

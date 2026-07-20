// Mentor dashboard: your classrooms, new-classroom form, and quick game host.

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { BACKEND_ENABLED } from '../../lib/config'
import { supabase } from '../../lib/supabase'
import { useAdmin } from '../../lib/session'
import HostLauncher from '../../components/HostLauncher'
import { BackendOffCard } from './TeamAuth'
import {
  approveTeamMember,
  createClassroom,
  errMsg,
  fetchClassrooms,
  fetchMyProfile,
  fetchPendingAdmins,
  formatDate,
  useCopy,
  type Classroom,
  type ProfileRow,
} from './api'

function displayName(user: User): string {
  const name: unknown = user.user_metadata?.full_name
  if (typeof name === 'string' && name.trim()) return name.trim()
  return user.email ?? 'BFF team member'
}

function ClassroomCard({ classroom, count }: { classroom: Classroom; count: number }) {
  const { copied, copy } = useCopy()
  return (
    <div className="card flex flex-col gap-4">
      <div>
        <h3 className="font-display text-lg font-bold text-slate-900">
          {classroom.name}
        </h3>
        <p className="text-sm text-slate-500">
          {classroom.school ?? 'No school listed'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="rounded-xl bg-bff-50 px-4 py-2 font-mono text-2xl font-bold tracking-[0.25em] text-bff-700"
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
      <p className="text-sm text-slate-600">
        {count} student{count === 1 ? '' : 's'} joined
      </p>
      <Link to={`/admin/class/${classroom.id}`} className="btn-secondary mt-auto">
        Open class →
      </Link>
    </div>
  )
}

export default function AdminDashboard() {
  const { adminUser, adminReady } = useAdmin()
  const navigate = useNavigate()
  const uid = adminUser?.id ?? null

  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Approval gating: null = still checking, false = pending, true = approved.
  const [approved, setApproved] = useState<boolean | null>(null)
  const [pending, setPending] = useState<ProfileRow[]>([])
  const [approvingId, setApprovingId] = useState<string | null>(null)

  // New classroom form
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)


  const load = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    setError(null)
    try {
      // Approval status decides what the rest of the dashboard shows.
      const profile = await fetchMyProfile(uid)
      const isApproved = profile?.approved === true
      setApproved(isApproved)
      if (!isApproved) return

      const res = await fetchClassrooms(uid)
      setClassrooms(res.classrooms)
      setCounts(res.studentCounts)
      try {
        setPending(await fetchPendingAdmins())
      } catch {
        setPending([]) // non-fatal — the rest of the dashboard still loads
      }
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setLoading(false)
    }
  }, [uid])

  async function handleApprove(row: ProfileRow) {
    setApprovingId(row.id)
    try {
      await approveTeamMember(row.id)
      setPending((prev) => prev.filter((p) => p.id !== row.id))
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setApprovingId(null)
    }
  }

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

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut()
    navigate('/')
  }

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!uid || !name.trim()) return
    setCreating(true)
    setCreateError(null)
    try {
      await createClassroom(uid, name, school)
      setName('')
      setSchool('')
      await load()
    } catch (err) {
      setCreateError(errMsg(err))
    } finally {
      setCreating(false)
    }
  }

  // Still checking approval status.
  if (approved === null) {
    return (
      <div role="status" className="px-4 py-24 text-center text-slate-500">
        Checking your access…
      </div>
    )
  }

  // Signed in, but not yet approved by a BFF admin.
  if (approved === false) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="card animate-pop-in text-center">
          <div className="text-5xl" aria-hidden="true">
            🔒
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
            Waiting for admin approval
          </h1>
          <p className="mt-3 leading-relaxed text-slate-600">
            You're signed in as <span className="font-semibold">{adminUser.email}</span>. A BFF
            administrator needs to approve your account before you can create classrooms and host
            games. You'll get in as soon as they do — just check back.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" className="btn-primary" onClick={() => void load()}>
              <span aria-hidden="true">↻</span> Check again
            </button>
            <button type="button" className="btn-ghost" onClick={() => void handleSignOut()}>
              Sign out
            </button>
          </div>
          <p className="mt-6 text-xs text-slate-400">
            Are you a student? You don't need an account — just{' '}
            <Link to="/join" className="font-semibold text-bff-700 hover:underline">
              join with your class code
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Hey, {displayName(adminUser)} <span aria-hidden="true">👋</span>
          </h1>
          <p className="mt-1 text-slate-600">
            Your mentor dashboard — classrooms, assignments, and live games.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/account" className="btn-ghost">
            Account
          </Link>
          <button type="button" className="btn-ghost" onClick={() => void handleSignOut()}>
            Sign out
          </button>
        </div>
      </div>

      {/* ---------- Pending team approvals ---------- */}
      {pending.length > 0 && (
        <section className="mt-8">
          <div className="card border-amber-200 bg-amber-50">
            <h2 className="font-display text-lg font-bold text-amber-900">
              <span aria-hidden="true">🔔</span> Pending team approvals ({pending.length})
            </h2>
            <p className="mt-1 text-sm text-amber-800">
              These people signed in and are waiting to be approved as BFF team members.
            </p>
            <ul className="mt-4 space-y-2">
              {pending.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-slate-900">
                      {p.full_name || p.email}
                    </p>
                    <p className="truncate text-sm text-slate-600">
                      {p.email}
                      {p.chapter && <> · {p.chapter}</>} · requested {formatDate(p.created_at)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-primary shrink-0 text-sm"
                    onClick={() => void handleApprove(p)}
                    disabled={approvingId === p.id}
                    aria-busy={approvingId === p.id}
                  >
                    {approvingId === p.id ? 'Approving…' : 'Approve'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Your classrooms ---------- */}
      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Your classrooms
          </h2>
          <button
            type="button"
            className="btn-ghost text-sm"
            onClick={() => void load()}
            disabled={loading}
          >
            <span aria-hidden="true">↻</span> Refresh
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            Could not load classrooms: {error}
          </p>
        )}

        {loading ? (
          <p role="status" className="mt-4 text-slate-500">
            Loading your classrooms…
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classrooms.map((c) => (
              <ClassroomCard key={c.id} classroom={c} count={counts[c.id] ?? 0} />
            ))}

            {classrooms.length === 0 && !error && (
              <div className="card flex flex-col justify-center text-center sm:col-span-2 lg:col-span-1">
                <div className="text-3xl" aria-hidden>
                  🏫
                </div>
                <p className="mt-2 font-display font-semibold text-slate-700">
                  No classrooms yet
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Create your first class → share its 6-letter code → students
                  join in seconds, no email needed.
                </p>
              </div>
            )}

            {/* New classroom */}
            <form
              onSubmit={handleCreate}
              className="card flex flex-col gap-3 border-2 border-dashed border-bff-200 bg-bff-50/40"
            >
              <h3 className="font-display text-lg font-bold text-slate-900">
                <span aria-hidden="true">＋</span> New classroom
              </h3>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">
                  Class name<span className="text-red-500"> *</span>
                </span>
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Period 3 — Financial Literacy"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">
                  School <span className="font-normal text-slate-500">(optional)</span>
                </span>
                <input
                  className="input"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Lincoln Middle School"
                />
              </label>
              {createError && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {createError}
                </p>
              )}
              <button
                type="submit"
                className="btn-primary mt-auto"
                disabled={creating || !name.trim()}
              >
                {creating ? 'Creating…' : 'Create classroom'}
              </button>
            </form>
          </div>
        )}
      </section>

      {/* ---------- Quick host (any game, no classroom needed) ---------- */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-slate-900">Live game</h2>
        <p className="mt-1 text-sm text-slate-600">
          Start a live game right now — no classroom needed. Players join with the code on the
          big screen.
        </p>
        <div className="mt-4">
          <HostLauncher classroomId={null} />
        </div>
      </section>
    </div>
  )
}

// Mentor dashboard: your classrooms, new-classroom form, and quick game host.

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { BACKEND_ENABLED } from '../../lib/config'
import { supabase } from '../../lib/supabase'
import { useAdmin } from '../../lib/session'
import { createSession } from '../../activities/wolf/live'
import { BackendOffCard } from './TeamAuth'
import {
  createClassroom,
  errMsg,
  fetchClassrooms,
  useCopy,
  type Classroom,
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
          title="Copy class code"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
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

  // New classroom form
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  // Quick host
  const [hosting, setHosting] = useState(false)
  const [hostError, setHostError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetchClassrooms(uid)
      setClassrooms(res.classrooms)
      setCounts(res.studentCounts)
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setLoading(false)
    }
  }, [uid])

  useEffect(() => {
    void load()
  }, [load])

  if (!BACKEND_ENABLED) return <BackendOffCard />
  if (!adminReady) {
    return <div className="px-4 py-16 text-center text-slate-500">Loading…</div>
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

  async function handleQuickHost() {
    setHosting(true)
    setHostError(null)
    try {
      const session = await createSession(null)
      navigate(`/host/${session.id}`)
    } catch (err) {
      setHostError(errMsg(err))
      setHosting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Hey, {displayName(adminUser)} 👋
          </h1>
          <p className="mt-1 text-slate-600">
            Your mentor dashboard — classrooms, assignments, and live games.
          </p>
        </div>
        <button type="button" className="btn-ghost" onClick={() => void handleSignOut()}>
          Sign out
        </button>
      </div>

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
            ↻ Refresh
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            Could not load classrooms: {error}
          </p>
        )}

        {loading ? (
          <p className="mt-4 text-slate-500">Loading your classrooms…</p>
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
                ＋ New classroom
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
                  School <span className="font-normal text-slate-400">(optional)</span>
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
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
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

      {/* ---------- Quick host ---------- */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-slate-900">Live game</h2>
        <div className="card mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl" aria-hidden>
              🐺
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Quick host: Wolf of Wall Street
              </h3>
              <p className="text-sm text-slate-600">
                Start a live game right now — no classroom needed. Players join
                with the game code on the big screen.
              </p>
              {hostError && (
                <p className="mt-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                  {hostError}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => void handleQuickHost()}
            disabled={hosting}
          >
            {hosting ? 'Starting…' : 'Start a live game'}
          </button>
        </div>
      </section>
    </div>
  )
}

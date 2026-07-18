// Sign in / create account for BFF team members (mentors & admins).
// Students never see this — they join classes with a code, no email needed.

import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BACKEND_ENABLED } from '../../lib/config'
import { supabase } from '../../lib/supabase'
import { useAdmin } from '../../lib/session'
import { errMsg } from './api'

/**
 * Shown on all /team + /admin pages when no Supabase backend is configured.
 * Shared by AdminDashboard and ClassroomDetail.
 */
export function BackendOffCard() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="card animate-pop-in text-center">
        <div className="text-4xl" aria-hidden>
          🔌
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold text-slate-900">
          Team dashboard not connected yet
        </h1>
        <p className="mt-3 text-slate-600">
          Class codes, assignments, and the mentor dashboard activate once the
          backend is connected — see the README for the quick Supabase setup.
          Lessons and solo activities already work for everyone, no backend
          needed.
        </p>
        <Link to="/" className="btn-secondary mt-6">
          ← Back home
        </Link>
      </div>
    </div>
  )
}

type Mode = 'signin' | 'signup'

export default function TeamAuth() {
  const { adminUser, adminReady } = useAdmin()
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>('signin')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  if (!BACKEND_ENABLED) return <BackendOffCard />
  if (!adminReady) {
    return (
      <div role="status" className="px-4 py-16 text-center text-slate-500">
        Loading…
      </div>
    )
  }
  if (adminUser) return <Navigate to="/admin" replace />

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setNotice(null)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabase) return
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      if (mode === 'signin') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (authError) throw new Error(authError.message)
        navigate('/admin')
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: fullName.trim() } },
        })
        if (authError) throw new Error(authError.message)
        if (data.session) {
          navigate('/admin')
        } else {
          // Email confirmation is turned on for this Supabase project.
          setNotice(
            'Almost there! Check your email for a confirmation link, then come back and sign in.',
          )
          setMode('signin')
        }
      }
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setBusy(false)
    }
  }

  const tabClass = (active: boolean) =>
    `flex-1 rounded-lg px-3 py-2 font-display text-sm font-semibold transition ${
      active
        ? 'bg-white text-bff-700 shadow-sm'
        : 'text-slate-600 hover:text-slate-900'
    }`

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900">
          BFF Team
        </h1>
        <p className="mt-2 text-slate-600">
          Mentor &amp; admin sign-in for classrooms, assignments, and live
          games.
        </p>
      </div>

      <div className="card animate-pop-in">
        <div
          className="mb-5 flex gap-1 rounded-xl bg-slate-100 p-1"
          role="tablist"
          aria-label="Sign in or create account"
        >
          <button
            type="button"
            role="tab"
            id="tab-signin"
            aria-selected={mode === 'signin'}
            aria-controls="team-auth-panel"
            className={tabClass(mode === 'signin')}
            onClick={() => switchMode('signin')}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            id="tab-signup"
            aria-selected={mode === 'signup'}
            aria-controls="team-auth-panel"
            className={tabClass(mode === 'signup')}
            onClick={() => switchMode('signup')}
          >
            Create account
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          id="team-auth-panel"
          role="tabpanel"
          aria-labelledby={mode === 'signin' ? 'tab-signin' : 'tab-signup'}
        >
          {mode === 'signup' && (
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">
                Full name
              </span>
              <input
                className="input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jamie Rivera"
                autoComplete="name"
                required
              />
            </label>
          )}
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">
              Email
            </span>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@bffofamerica.org"
              autoComplete="email"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">
              Password
            </span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              minLength={6}
              required
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}
          {notice && (
            <p
              role="status"
              className="rounded-xl bg-bff-50 px-4 py-3 text-sm font-medium text-bff-800"
            >
              {notice}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={busy} aria-busy={busy}>
            {busy
              ? 'One sec…'
              : mode === 'signin'
                ? 'Sign in'
                : 'Create account'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Students never need an account — they join with a class code and a
        nickname. This login is only for the BFF team.
      </p>
    </div>
  )
}

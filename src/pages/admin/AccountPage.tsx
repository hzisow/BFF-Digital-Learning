// Account settings for signed-in BFF team members: change password.
// This page also catches the Supabase password-recovery redirect — when a
// mentor clicks "reset password" in their email, they land here already in a
// short-lived recovery session and can set a new password.

import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BACKEND_ENABLED } from '../../lib/config'
import { supabase } from '../../lib/supabase'
import { useAdmin } from '../../lib/session'
import { BackendOffCard } from './TeamAuth'
import { errMsg } from './api'

export default function AccountPage() {
  const { adminUser, adminReady } = useAdmin()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  if (!BACKEND_ENABLED) return <BackendOffCard />
  if (!adminReady) {
    return (
      <div role="status" className="px-4 py-16 text-center text-slate-500">
        Loading…
      </div>
    )
  }
  if (!adminUser) return <Navigate to="/team" replace />

  const chapter = (adminUser.user_metadata?.chapter as string | undefined) ?? ''
  const fullName = (adminUser.user_metadata?.full_name as string | undefined) ?? ''

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabase) return
    setError(null)
    if (password.length < 6) {
      setError('Use at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('The two passwords do not match.')
      return
    }
    setBusy(true)
    try {
      const { error: upErr } = await supabase.auth.updateUser({ password })
      if (upErr) throw new Error(upErr.message)
      setDone(true)
      setPassword('')
      setConfirm('')
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-6">
        <Link to="/admin" className="text-sm font-semibold text-bff-700 hover:underline">
          <span aria-hidden="true">←</span> Back to dashboard
        </Link>
        <h1 className="mt-3 font-display text-3xl font-bold text-slate-900">Your account</h1>
        <p className="mt-2 text-slate-600">
          Signed in as <span className="font-semibold">{adminUser.email}</span>
          {fullName && <> · {fullName}</>}
          {chapter && <> · {chapter}</>}
        </p>
      </div>

      <div className="card animate-pop-in">
        <h2 className="font-display text-lg font-bold text-slate-900">Change password</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">New password</span>
            <div className="relative">
              <input
                className="input pr-16"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-pressed={show}
                className="absolute inset-y-0 right-2 my-auto h-7 rounded-md px-2 text-xs font-bold text-bff-700 hover:bg-bff-50"
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">
              Confirm new password
            </span>
            <input
              className="input"
              type={show ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Type it again"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}
          {done && (
            <p role="status" className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              Password updated! <span aria-hidden="true">✅</span> You'll use it next time you sign in.
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={busy} aria-busy={busy}>
            {busy ? 'Saving…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}

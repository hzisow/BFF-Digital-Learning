import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_ENABLED } from '../../lib/config'
import { useStudent } from '../../lib/session'

function SoloModeCard() {
  return (
    <div className="card animate-pop-in mx-auto max-w-md text-center">
      <p className="text-5xl" aria-hidden="true">🎟️</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
        Class codes are coming online soon!
      </h1>
      <p className="mt-3 leading-relaxed text-slate-600">
        Your BFF mentor will hand out class codes once classrooms go live. Until then,
        every lesson, game, and challenge is wide open — and your progress saves right on
        this device.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/lessons" className="btn-primary">
          Explore lessons <span aria-hidden="true">📚</span>
        </Link>
        <Link to="/activities" className="btn-secondary">
          Games & challenges <span aria-hidden="true">🎮</span>
        </Link>
      </div>
    </div>
  )
}

function JoinForm() {
  const { joinClass } = useStudent()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    setError(null)
    setBusy(true)
    try {
      await joinClass(code, nickname)
      navigate('/student')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — try again!')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card animate-pop-in mx-auto max-w-md">
      <div className="text-center">
        <p className="text-5xl" aria-hidden="true">👋</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
          Join your class
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Grab the 6-letter class code from your BFF mentor and pick a nickname. No
          email, no account, no personal info needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="class-code" className="font-display text-sm font-semibold text-slate-700">
            Class code
          </label>
          <input
            id="class-code"
            className="input mt-1.5 text-center font-display text-2xl font-bold uppercase tracking-[0.35em]"
            placeholder="ABC123"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))
            }
            maxLength={6}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
          />
        </div>
        <div>
          <label htmlFor="nickname" className="font-display text-sm font-semibold text-slate-700">
            Your nickname
          </label>
          <input
            id="nickname"
            className="input mt-1.5"
            placeholder="e.g. SavvySam"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={24}
            autoComplete="off"
            aria-describedby="nickname-hint"
          />
          <p id="nickname-hint" className="mt-1.5 text-xs text-slate-500">
            Your mentor sees this nickname — keep it recognizable (and school-appropriate{' '}
            <span aria-hidden="true">😄</span>).
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={busy || code.length !== 6 || nickname.trim().length === 0}
          aria-busy={busy}
        >
          {busy ? 'Joining…' : <>Join class <span aria-hidden="true">🚀</span></>}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        No class code? You can still{' '}
        <Link to="/lessons" className="font-semibold text-bff-700 hover:text-bff-800">
          explore everything solo
        </Link>{' '}
        — progress saves on this device.
      </p>
    </div>
  )
}

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {BACKEND_ENABLED ? <JoinForm /> : <SoloModeCard />}
    </div>
  )
}

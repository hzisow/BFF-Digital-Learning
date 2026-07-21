// Lets an approved mentor host ANY activity live for the class: Wolf of Wall
// Street, a live quiz on any lesson, or a co-play challenge. Creates the right
// kind of session and jumps to that game's host (projector) screen.

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIVITIES } from '../lib/activities'
import { useLang } from '../lib/i18n'
import { createSession } from '../activities/wolf/live'
import { createQuizSession } from '../activities/quiz/live'
import { createLiveSession } from '../activities/live/coplay'
import { errMsg } from '../pages/admin/api'

// Solo challenges that can be hosted as a co-play (shared-leaderboard) game.
const COPLAY_SLUGS = [
  'bens-budget',
  'bens-insurance',
  'paystub-detective',
  'credit-score-sim',
  'scam-spotter',
  'smart-shopper',
  'goal-getter',
]

export default function HostLauncher({ classroomId }: { classroomId: string | null }) {
  const navigate = useNavigate()
  const { lang } = useLang()
  const es = lang === 'es'
  const [choice, setChoice] = useState('wolf')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const lessons = useMemo(
    () => ACTIVITIES.filter((a) => a.kind === 'lesson').sort((a, b) => a.sortKey - b.sortKey),
    [],
  )
  const coplay = useMemo(
    () =>
      COPLAY_SLUGS.map((s) => ACTIVITIES.find((a) => a.slug === s)).filter(
        (a): a is (typeof ACTIVITIES)[number] => Boolean(a),
      ),
    [],
  )

  async function host() {
    setBusy(true)
    setError(null)
    try {
      if (choice === 'wolf') {
        const s = await createSession(classroomId)
        navigate(`/host/${s.id}`)
      } else if (choice.startsWith('quiz:')) {
        const s = await createQuizSession(choice.slice(5), classroomId)
        navigate(`/quiz-host/${s.id}`)
      } else if (choice.startsWith('coplay:')) {
        const s = await createLiveSession(choice.slice(7), classroomId)
        navigate(`/coplay-host/${s.id}`)
      }
    } catch (err) {
      setError(errMsg(err))
      setBusy(false)
    }
  }

  return (
    <div className="card border-bff-200 bg-bff-50/50">
      <h3 className="font-display text-lg font-bold text-slate-900">
        <span aria-hidden="true">📡</span> {es ? 'Organiza un juego en vivo' : 'Host a live game'}
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        {es
          ? 'Muestra la pantalla del anfitrión en el proyector; los estudiantes se unen con el código que aparece desde sus propios dispositivos.'
          : 'Put the host screen on the projector; students join with the code it shows on their own devices.'}
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="host-choice" className="sr-only">
          {es ? 'Elige un juego para organizar' : 'Choose a game to host'}
        </label>
        <select
          id="host-choice"
          className="input sm:flex-1"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          disabled={busy}
        >
          <option value="wolf">🐺 {es ? 'Wolf of Wall Street (mercado en vivo)' : 'Wolf of Wall Street (live market)'}</option>
          <optgroup label={es ? 'Quiz en vivo — elige una lección' : 'Live quiz — pick a lesson'}>
            {lessons.map((l) => (
              <option key={l.slug} value={`quiz:${l.slug}`}>
                📝 {es ? 'Quiz' : 'Quiz'}: {l.title}
              </option>
            ))}
          </optgroup>
          <optgroup label={es ? 'Reto en equipo (tabla de posiciones compartida)' : 'Co-play challenge (shared leaderboard)'}>
            {coplay.map((a) => (
              <option key={a.slug} value={`coplay:${a.slug}`}>
                {a.emoji} {a.title}
              </option>
            ))}
          </optgroup>
        </select>
        <button type="button" className="btn-primary shrink-0" onClick={() => void host()} disabled={busy}>
          {busy ? (es ? 'Iniciando…' : 'Starting…') : es ? 'Organizar →' : 'Host it →'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

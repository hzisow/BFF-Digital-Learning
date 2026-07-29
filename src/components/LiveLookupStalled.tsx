// Shown under "Finding your game…" once the lookup has clearly not arrived.
//
// It says the two things a student in a classroom actually needs: this is the
// network, not you — and here is somewhere useful to go instead of waiting.

import { Link } from 'react-router-dom'
import { CloudOff } from 'lucide-react'
import { useLang } from '../lib/i18n'
import { offlineLiveCopy } from '../lib/offlineCopy'
import { isOnline } from '../lib/online'

export default function LiveLookupStalled({ onRetry }: { onRetry?: () => void }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const es = lang === 'es'
  const copy = offlineLiveCopy(lang)
  const offline = !isOnline()

  // Online but nothing came back: the connection exists and the request still
  // is not landing, which on school wifi usually means a filter or a dead
  // uplink. Different sentence, same honesty.
  const title = offline
    ? copy.title
    : zh
      ? '连接不上'
      : es
        ? 'No podemos conectar'
        : 'Having trouble connecting'
  const body = offline
    ? copy.body
    : zh
      ? '我们联系不上服务器。请检查网络，或向老师确认游戏代码。'
      : es
        ? 'No podemos comunicarnos con el servidor. Revisa tu conexión o confirma el código con tu mentor.'
        : "We can't reach the server. Check your connection, or confirm the code with your mentor."

  return (
    <div
      role="status"
      className="mx-auto mt-6 max-w-md rounded-[8px] border border-ink/15 bg-white p-5 text-center"
    >
      <CloudOff className="mx-auto h-6 w-6 text-ink/40" aria-hidden="true" />
      <p className="mt-3 font-display text-base font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink/70">{body}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {onRetry && (
          <button type="button" onClick={onRetry} className="btn-secondary px-4 py-2 text-sm">
            {copy.retry}
          </button>
        )}
        <Link to="/activities" className="btn-primary px-4 py-2 text-sm">
          {zh ? '去玩单人挑战' : es ? 'Jugar en solitario' : 'Play a solo challenge'}
        </Link>
      </div>
    </div>
  )
}

// A single honest statement about the connection, across the top of the app.
//
// The point is to set expectations before something fails. A student who knows
// the wifi dropped understands why the Money Coach will not answer; a student
// who does not just thinks the app is broken.
//
// It is a normal block element at the very top of the document, not a floating
// overlay. A floating bar looks tidier right up until it settles on top of
// whatever the student was about to tap — on the Coach that is the message box,
// which is exactly the control they would reach for next. Taking up real space
// pushes the page down instead of covering it.
//
// The detail ("what still works") lives in the inline notices on the screens
// that actually need it, so this stays to one line.

import { CloudOff, Check } from 'lucide-react'
import { useOnline } from '../lib/online'
import { useLang } from '../lib/i18n'

export default function ConnectionBanner() {
  const { online, recovered } = useOnline()
  const { lang } = useLang()
  const zh = lang === 'zh'
  const es = lang === 'es'

  if (online && !recovered) return null

  const offlineText = zh
    ? '你已离线，课程和挑战仍可使用，进度会保存在本设备上。'
    : es
      ? 'Estás sin conexión, las lecciones y los desafíos siguen funcionando y tu progreso se guarda en este dispositivo.'
      : "You're offline, lessons and challenges still work, and your progress is saved on this device."
  const backText = zh
    ? '已重新连接，正在同步你的进度。'
    : es
      ? 'Conexión restablecida, sincronizando tu progreso.'
      : 'Back online, syncing your progress.'

  return (
    <div
      // aria-live so a screen reader hears the change without the bar stealing
      // focus in the middle of a task.
      role="status"
      aria-live="polite"
      className={`w-full px-4 py-2 text-center text-[13px] font-semibold ${
        online ? 'bg-green-700 text-white' : 'bg-ink text-white'
      }`}
    >
      <span className="inline-flex items-center gap-2">
        {online ? (
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <CloudOff className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
        {online ? backText : offlineText}
      </span>
    </div>
  )
}

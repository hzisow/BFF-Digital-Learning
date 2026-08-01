// Read-aloud button using the browser's built-in speech synthesis. Renders
// nothing when the browser doesn't support it. Speech stops automatically when
// the text changes (student moved to the next step) or on unmount.

import { useEffect, useRef, useState } from 'react'
import { Volume2, Pause } from 'lucide-react'
import { useLang } from '../lib/i18n'

export default function ReadAloud({ text }: { text: string }) {
  const { lang, t } = useLang()
  const [speaking, setSpeaking] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const textRef = useRef(text)
  textRef.current = text

  // Stop when the step (text) changes or the component unmounts.
  useEffect(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
    return () => window.speechSynthesis.cancel()
  }, [text, supported])

  if (!supported) return null

  function toggle() {
    const synth = window.speechSynthesis
    if (speaking) {
      synth.cancel()
      setSpeaking(false)
      return
    }
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(textRef.current)
    utterance.lang = lang === 'es' ? 'es-ES' : 'en-US'
    utterance.rate = 0.95
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    synth.speak(utterance)
    setSpeaking(true)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={speaking}
      aria-label={speaking ? t('readAloud.stop') : t('readAloud.play')}
      title={speaking ? t('readAloud.stop') : t('readAloud.play')}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] text-base transition ${
        speaking
          ? 'bg-ink-deep text-white'
          : 'text-current hover:bg-ink-deep hover:text-white'
      }`}
    >
      {speaking ? (
        <Pause className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}

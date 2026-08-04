// One language control for the whole app.
//
// There used to be two: a row of three buttons in the global header and a
// second, differently-styled row inside the lesson player's own top bar. Same
// job, two looks, two sets of markup to keep accessible. This is the single
// implementation both now render.
//
// It is a dropdown rather than a row. Three permanent buttons crowded the header
// on desktop and squeezed the nav on phones, for a control almost everybody
// touches once and never again.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useLang } from '../lib/i18n'
import type { Lang } from '../lib/i18n'

// Inline SVG flags, not emoji, so they render identically on every platform.
const flagClass = 'h-3 w-[18px] shrink-0 rounded-[2px] ring-1 ring-black/10'

function FlagUS() {
  return (
    <svg viewBox="0 0 20 14" className={flagClass} aria-hidden="true" focusable="false">
      <rect width="20" height="14" fill="#fff" />
      {[0, 4, 8, 12].map((y) => (
        <rect key={y} y={y} width="20" height="2" fill="#b22234" />
      ))}
      <rect width="9" height="8" fill="#3c3b6e" />
    </svg>
  )
}

function FlagES() {
  return (
    <svg viewBox="0 0 20 14" className={flagClass} aria-hidden="true" focusable="false">
      <rect width="20" height="14" fill="#c60b1e" />
      <rect y="3.5" width="20" height="7" fill="#ffc400" />
    </svg>
  )
}

function FlagCN() {
  return (
    <svg viewBox="0 0 20 14" className={flagClass} aria-hidden="true" focusable="false">
      <rect width="20" height="14" fill="#de2910" />
      <path fill="#ffde00" d="m3.5 2.2 0.65 2 1.7 0-1.37 1.02 0.52 2-1.5-1.24-1.5 1.24 0.52-2-1.37-1.02 1.7 0z" />
      <g fill="#ffde00">
        <circle cx="8" cy="1.6" r="0.5" />
        <circle cx="9.3" cy="2.8" r="0.5" />
        <circle cx="9.3" cy="4.5" r="0.5" />
        <circle cx="8" cy="5.6" r="0.5" />
      </g>
    </svg>
  )
}

/** Each language is labelled in itself, never translated into the page's. */
const LANGS: Array<{ code: Lang; short: string; name: string; flag: ReactNode }> = [
  { code: 'en', short: 'EN', name: 'English', flag: <FlagUS /> },
  { code: 'es', short: 'ES', name: 'Español', flag: <FlagES /> },
  { code: 'zh', short: '中', name: '中文', flag: <FlagCN /> },
]

/**
 * `chrome` is the global header's slate treatment; `lesson` matches the lesson
 * player's warm paper palette. Only the colours differ, so the two contexts can
 * never drift apart in behaviour.
 */
export type LangPickerTone = 'chrome' | 'lesson'

const TRIGGER: Record<LangPickerTone, string> = {
  chrome: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  lesson: 'bg-[var(--lz-paper-deep)] text-[var(--lz-ink)] hover:brightness-95',
}

export function LangPicker({ tone = 'chrome' }: { tone?: LangPickerTone }) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0]

  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      setOpen(false)
      // Escape should leave focus on the control that opened the menu, not
      // adrift at the top of the document.
      wrapRef.current?.querySelector('button')?.focus()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        // Deliberately no lang on the trigger: its accessible name has to name
        // three languages at once, so any single value mispronounces two thirds
        // of it. The options below each carry their own.
        aria-label="Language / Idioma / 语言"
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-display text-xs font-bold transition ${TRIGGER[tone]}`}
      >
        {current.flag}
        <span lang={current.code}>{current.short}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Language / Idioma / 语言"
          className="absolute right-0 top-full z-50 mt-1 w-40 rounded-[8px] border border-ink/10 bg-white p-1.5 shadow-card"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              role="menuitemradio"
              aria-checked={lang === l.code}
              onClick={() => {
                setLang(l.code)
                setOpen(false)
              }}
              // Each language name is written in that language, so it needs its
              // own lang or a screen reader gives "Español" and "中文" English
              // phonetics. WCAG 3.1.2, Language of Parts.
              lang={l.code}
              className={`flex w-full items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-left font-display text-sm font-semibold transition-colors ${
                lang === l.code ? 'bg-bff-50 text-bff-700' : 'text-ink hover:bg-ink/5'
              }`}
            >
              {l.flag}
              <span className="flex-1">{l.name}</span>
              {lang === l.code && <Check className="h-4 w-4" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

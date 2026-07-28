import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from './Logo'
import { AppIcon } from '../lib/icons'
import { useAdmin, useStudent } from '../lib/session'
import { useLang } from '../lib/i18n'
import type { Lang } from '../lib/i18n'
import { loadLocalProgress } from '../lib/progress'
import { totalXp, levelInfo } from '../lib/xp'
import { titleForPath } from '../lib/pageTitle'
import { isSoundOn, setSoundOn, playSound } from '../lib/sound'
import { celebrate } from '../lib/celebrate'
import { useToast } from './ToastProvider'

const LEVEL_KEY = 'bff_last_level'

function SoundToggle() {
  const [on, setOn] = useState(() => isSoundOn())
  return (
    <button
      type="button"
      onClick={() => {
        const next = !on
        setSoundOn(next)
        setOn(next)
        if (next) playSound('click') // confirm it's audible now
      }}
      aria-pressed={on}
      aria-label={on ? 'Mute sound effects' : 'Turn on sound effects'}
      title={on ? 'Sound on' : 'Sound off'}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
    >
      {on ? (
        <Volume2 className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <VolumeX className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  )
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 font-display text-sm font-semibold transition ${
    isActive ? 'bg-bff-50 text-bff-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

// Larger tap targets for the mobile dropdown.
const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3 font-display text-base font-semibold transition ${
    isActive ? 'bg-bff-50 text-bff-700' : 'text-slate-700 hover:bg-slate-100'
  }`

// Simple inline SVG flags (not emoji, so they render identically everywhere).
const flagClass = 'h-3 w-[18px] rounded-[2px] ring-1 ring-black/10'

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

function LangSwitcher() {
  const { lang, setLang } = useLang()
  const ariaFor: Record<Lang, string> = {
    en: 'Switch to English',
    es: 'Cambiar a español',
    zh: '切换到中文',
  }
  const opt = (l: Lang, label: string, flag: ReactNode) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      aria-label={ariaFor[l]}
      className={`flex items-center gap-1.5 rounded-md px-2 py-1 font-display text-xs font-bold transition ${
        lang === l ? 'bg-white text-bff-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'
      }`}
    >
      {flag}
      {label}
    </button>
  )
  return (
    <div
      className="ml-1 flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5"
      role="group"
      aria-label="Language / Idioma / 语言"
    >
      {opt('en', 'EN', <FlagUS />)}
      {opt('es', 'ES', <FlagES />)}
      {opt('zh', '中', <FlagCN />)}
    </div>
  )
}

export default function Layout() {
  const { student } = useStudent()
  const { adminUser } = useAdmin()
  const { t, lang } = useLang()
  const { toast } = useToast()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Keep the browser tab title in sync with the route.
  useEffect(() => {
    document.title = titleForPath(location.pathname)
  }, [location.pathname])

  // Recompute XP/level on each navigation so it reflects just-finished work.
  const level = useMemo(() => levelInfo(totalXp(loadLocalProgress())), [location.pathname])

  // Detect a level-up between navigations and celebrate it once.
  const leveledInit = useRef(false)
  useEffect(() => {
    let prev: number | null = null
    try {
      const raw = localStorage.getItem(LEVEL_KEY)
      prev = raw == null ? null : Number(raw)
    } catch {
      prev = null
    }
    // First run on this device: record the baseline silently, don't celebrate.
    if (!leveledInit.current && prev == null) {
      leveledInit.current = true
      try {
        localStorage.setItem(LEVEL_KEY, String(level.level))
      } catch {
        /* ignore */
      }
      return
    }
    leveledInit.current = true
    if (prev != null && level.level > prev) {
      celebrate('levelup')
      toast(
        lang === 'es'
          ? `¡Subiste de nivel! Ahora eres ${level.tier.name}`
          : `Level up! You're now a ${level.tier.name}`,
        'success',
      )
    }
    if (prev == null || level.level !== prev) {
      try {
        localStorage.setItem(LEVEL_KEY, String(level.level))
      } catch {
        /* ignore */
      }
    }
  }, [level.level, level.tier.name, lang, toast])

  const links = (
    <>
      <NavLink to="/lessons" className={navLinkClass}>
        {t('nav.lessons')}
      </NavLink>
      <NavLink to="/activities" className={navLinkClass}>
        {t('nav.activities')}
      </NavLink>
      <NavLink to="/game" className={navLinkClass}>
        {t('nav.playLive')}
      </NavLink>
      <NavLink to="/coach" className={navLinkClass}>
        {t('nav.coach')}
      </NavLink>
      <NavLink
        to="/glossary"
        className={`${navLinkClass({ isActive: false })} hidden md:inline-flex`}
      >
        {t('nav.glossary')}
      </NavLink>
      {student ? (
        <NavLink to="/student" className={navLinkClass}>
          <span
            className="mr-1 inline-flex items-center gap-1 rounded-md bg-bff-100 px-1.5 py-0.5 text-xs font-bold text-bff-700"
            title={`Level ${level.level} · ${level.tier.name}`}
          >
            <AppIcon name={level.tier.icon} className="h-3.5 w-3.5" /> Lv{level.level}
          </span>
          <span className="hidden sm:inline">{t('nav.myClass')} · </span>
          {student.nickname}
        </NavLink>
      ) : (
        <NavLink to="/join" className={navLinkClass}>
          {t('nav.join')}
        </NavLink>
      )}
      {adminUser ? (
        <NavLink to="/admin" className={navLinkClass}>
          {t('nav.dashboard')}
        </NavLink>
      ) : (
        <NavLink to="/team" className={navLinkClass}>
          {t('nav.team')}
        </NavLink>
      )}
    </>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-bff-700 px-4 py-2 font-display font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        {t('a11y.skip')}
      </a>
      <header className="sticky top-0 z-40 border-b-2 border-bff-600 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
            aria-label={t('a11y.home')}
          >
            <Logo className="h-9" />
            <span className="hidden font-display text-lg font-bold text-bff-800 sm:block">
              BFF Classroom
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label={t('a11y.primaryNav')}>
            {links}
            <SoundToggle />
            <LangSwitcher />
          </nav>

          {/* Mobile: compact language switch + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <SoundToggle />
            <LangSwitcher />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100"
            >
              {menuOpen ? (
                <X className="h-[22px] w-[22px]" aria-hidden="true" />
              ) : (
                <Menu className="h-[22px] w-[22px]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label={t('a11y.primaryNav')}
            className="animate-slide-up border-t border-slate-200 bg-white px-4 py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              <NavLink to="/lessons" className={mobileLinkClass}>
                {t('nav.lessons')}
              </NavLink>
              <NavLink to="/activities" className={mobileLinkClass}>
                {t('nav.activities')}
              </NavLink>
              <NavLink to="/game" className={mobileLinkClass}>
                {t('nav.playLive')}
              </NavLink>
              <NavLink to="/coach" className={mobileLinkClass}>
                {t('nav.coach')}
              </NavLink>
              <NavLink to="/glossary" className={mobileLinkClass}>
                {t('nav.glossary')}
              </NavLink>
              {student ? (
                <NavLink to="/student" className={mobileLinkClass}>
                  {t('nav.myClass')} · {student.nickname}
                </NavLink>
              ) : (
                <NavLink to="/join" className={mobileLinkClass}>
                  {t('nav.join')}
                </NavLink>
              )}
              {adminUser ? (
                <NavLink to="/admin" className={mobileLinkClass}>
                  {t('nav.dashboard')}
                </NavLink>
              ) : (
                <NavLink to="/team" className={mobileLinkClass}>
                  {t('nav.team')}
                </NavLink>
              )}
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <Logo reversed className="h-8" />
            <div>
              <p className="font-display text-sm font-bold text-white">
                Building Financial Futures of America
              </p>
              <p className="text-xs text-white/55">{t('footer.tagline')}</p>
            </div>
          </div>
          <a
            href="https://www.bffofamerica.org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-bff-200 transition-colors hover:text-white"
          >
            bffofamerica.org
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  )
}

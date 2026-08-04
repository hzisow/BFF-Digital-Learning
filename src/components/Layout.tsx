import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import type { NavLinkProps } from 'react-router-dom'
import { Volume2, VolumeX, Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { LangPicker } from './LangPicker'
import { AppIcon } from '../lib/icons'
import { accountDisplayName, useAccount, useAdmin, useStudent } from '../lib/session'
import { useLang } from '../lib/i18n'
import { loadLocalProgress } from '../lib/progress'
import { totalXp, levelInfo } from '../lib/xp'
import { titleForPath } from '../lib/pageTitle'
import { isSoundOn, setSoundOn, playSound } from '../lib/sound'
import { celebrate } from '../lib/celebrate'
import { useToast } from './ToastProvider'
import { PageFallback } from './RouteFallback'
import { prefetchLikelyRoutes, prefetchRoute, type RouteChunk } from '../lib/routeChunks'

const LEVEL_KEY = 'bff_last_level'

/**
 * A NavLink that starts downloading its route's code as soon as the pointer
 * lands on it (or it takes keyboard focus). By the time the click registers the
 * chunk is usually already there, so a split route feels no slower than a
 * bundled one. `import()` dedupes, so hovering repeatedly costs nothing.
 */
function PrefetchNavLink({
  chunk,
  ...props
}: NavLinkProps & { chunk: RouteChunk }) {
  const warm = () => prefetchRoute(chunk)
  return <NavLink {...props} onMouseEnter={warm} onFocus={warm} onTouchStart={warm} />
}

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

/** Overflow menu for the secondary destinations and the sound toggle. */
function MoreMenu({
  adminUser,
  hasAccount,
  t,
}: {
  adminUser: unknown
  hasAccount: boolean
  t: (k: string) => string
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const itemClass =
    'block rounded-[5px] px-3 py-2 font-display text-sm font-semibold text-ink transition-colors hover:bg-ink/5'

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`${navLinkClass({ isActive: false })} inline-flex items-center gap-1`}
      >
        {t('nav.more')}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-[8px] border border-ink/10 bg-white p-1.5 shadow-card">
          <PrefetchNavLink chunk="glossary" to="/glossary" className={itemClass}>
            {t('nav.glossary')}
          </PrefetchNavLink>
          <PrefetchNavLink chunk="practice" to="/practice" className={itemClass}>
            {t('nav.practice')}
          </PrefetchNavLink>
          {/* Accounts are opt-in, so this lives in the overflow menu rather than
              the main bar — nobody needs to be nagged to sign up to take a
              lesson, but somebody coming back on a new phone needs to find it. */}
          {!hasAccount && (
            <PrefetchNavLink chunk="signIn" to="/signin?mode=signin" className={itemClass}>
              {t('nav.signIn')}
            </PrefetchNavLink>
          )}
          {adminUser ? (
            <PrefetchNavLink chunk="admin" to="/admin" className={itemClass}>
              {t('nav.dashboard')}
            </PrefetchNavLink>
          ) : (
            <PrefetchNavLink chunk="team" to="/team" className={itemClass}>
              {t('nav.team')}
            </PrefetchNavLink>
          )}
          <div className="my-1 h-px bg-ink/10" />
          <div className="px-1 py-0.5">
            <SoundToggle />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Layout() {
  const { student } = useStudent()
  const { adminUser } = useAdmin()
  const { account } = useAccount()
  const { t, lang } = useLang()
  const { toast } = useToast()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Hold the page still while the mobile menu is open.
  //
  // The menu is a normal block inside a sticky header, so without this the page
  // behind it scrolled freely: open the menu on a phone, swipe, and every card
  // on the page slid away underneath while the menu sat there pinned. It read
  // as the whole site sliding off screen.
  //
  // Restoring the previous value rather than clearing it outright means this
  // cannot clobber another component that is also locking scroll.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  // Escape closes the menu, matching the two dropdowns in the same header.
  useEffect(() => {
    if (!menuOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Once the first paint is done and the browser is idle, quietly fetch the two
  // routes almost everyone opens next. Hovering a nav link does the same thing
  // on demand; this covers the visitor who scrolls the landing page and then
  // clicks straight through.
  useEffect(() => {
    prefetchLikelyRoutes()
  }, [])

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

  // Only the four learning destinations stay in the bar. Everything else moves
  // into "More" so the header reads as a short, scannable row instead of a wall
  // of links competing with the page.
  const primaryLinks = (
    <>
      <PrefetchNavLink chunk="lessons" to="/lessons" className={navLinkClass}>
        {t('nav.lessons')}
      </PrefetchNavLink>
      <PrefetchNavLink chunk="activities" to="/activities" className={navLinkClass}>
        {t('nav.activities')}
      </PrefetchNavLink>
      <PrefetchNavLink chunk="liveJoin" to="/game" className={navLinkClass}>
        {t('nav.playLive')}
      </PrefetchNavLink>
      <PrefetchNavLink chunk="coach" to="/coach" className={navLinkClass}>
        {t('nav.coach')}
      </PrefetchNavLink>
    </>
  )

  // The student's own space is the one persistent call to action on the right.
  // Order matters: a student in a class sees their class identity, a student
  // with only an account still gets a way back to their own space, and a
  // first-time visitor sees the class-code door rather than a sign-up wall.
  const accountLink = student || account ? (
    <PrefetchNavLink
      chunk="student"
      to="/student"
      className="inline-flex items-center gap-1.5 rounded-[5px] border border-ink/15 px-2.5 py-1.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
    >
      <span
        className="inline-flex items-center gap-1 rounded-[4px] bg-bff-100 px-1.5 py-0.5 text-xs font-bold text-bff-700"
        title={`Level ${level.level} · ${level.tier.name}`}
      >
        <AppIcon name={level.tier.icon} className="h-3.5 w-3.5" /> {level.level}
      </span>
      <span className="max-w-[9ch] truncate">
        {student?.nickname ?? accountDisplayName(account) ?? account?.email?.split('@')[0]}
      </span>
    </PrefetchNavLink>
  ) : (
    <PrefetchNavLink chunk="join" to="/join" className="btn-primary px-3 py-1.5 text-sm">
      {t('nav.join')}
    </PrefetchNavLink>
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
            {primaryLinks}
            <MoreMenu adminUser={adminUser} hasAccount={Boolean(account)} t={t} />
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-ink/10" />
            {accountLink}
            <LangPicker />
          </nav>

          {/* Mobile: compact language switch + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <LangPicker />
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
            // Scrolls within itself when the list is taller than what is left
            // of the viewport under the 4rem header, instead of pushing its own
            // last items out of reach. `overscroll-contain` stops that scroll
            // from chaining to the locked page behind it.
            className="animate-slide-up max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-4 py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              <PrefetchNavLink chunk="lessons" to="/lessons" className={mobileLinkClass}>
                {t('nav.lessons')}
              </PrefetchNavLink>
              <PrefetchNavLink chunk="activities" to="/activities" className={mobileLinkClass}>
                {t('nav.activities')}
              </PrefetchNavLink>
              <PrefetchNavLink chunk="liveJoin" to="/game" className={mobileLinkClass}>
                {t('nav.playLive')}
              </PrefetchNavLink>
              <PrefetchNavLink chunk="coach" to="/coach" className={mobileLinkClass}>
                {t('nav.coach')}
              </PrefetchNavLink>
              <PrefetchNavLink chunk="glossary" to="/glossary" className={mobileLinkClass}>
                {t('nav.glossary')}
              </PrefetchNavLink>
              <PrefetchNavLink chunk="practice" to="/practice" className={mobileLinkClass}>
                {t('nav.practice')}
              </PrefetchNavLink>
              {student ? (
                <PrefetchNavLink chunk="student" to="/student" className={mobileLinkClass}>
                  {t('nav.myClass')} · {student.nickname}
                </PrefetchNavLink>
              ) : (
                <PrefetchNavLink chunk="join" to="/join" className={mobileLinkClass}>
                  {t('nav.join')}
                </PrefetchNavLink>
              )}
              {adminUser ? (
                <PrefetchNavLink chunk="admin" to="/admin" className={mobileLinkClass}>
                  {t('nav.dashboard')}
                </PrefetchNavLink>
              ) : (
                <PrefetchNavLink chunk="team" to="/team" className={mobileLinkClass}>
                  {t('nav.team')}
                </PrefetchNavLink>
              )}
              <div className="mt-1 flex items-center gap-2 border-t border-ink/10 px-4 pt-3">
                <SoundToggle />
                <span className="text-sm font-medium text-ink/60">{t('nav.sound')}</span>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {/* Loading boundary for the code-split routes. Scoped to the content
            area so the header and footer never blink during a navigation. */}
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
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
            <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  )
}

import { Link, NavLink, Outlet } from 'react-router-dom'
import { Logo } from './Logo'
import { useAdmin, useStudent } from '../lib/session'
import { useLang } from '../lib/i18n'
import type { Lang } from '../lib/i18n'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 font-display text-sm font-semibold transition ${
    isActive ? 'bg-bff-50 text-bff-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

function LangSwitcher() {
  const { lang, setLang } = useLang()
  const opt = (l: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      aria-label={l === 'en' ? 'Switch to English' : 'Cambiar a español'}
      className={`rounded-md px-2 py-0.5 font-display text-xs font-bold transition ${
        lang === l ? 'bg-white text-bff-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
      }`}
    >
      {label}
    </button>
  )
  return (
    <div
      className="ml-1 flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5"
      role="group"
      aria-label="Language / Idioma"
    >
      <span aria-hidden="true" className="pl-1 text-sm">
        🌐
      </span>
      {opt('en', 'EN')}
      {opt('es', 'ES')}
    </div>
  )
}

export default function Layout() {
  const { student } = useStudent()
  const { adminUser } = useAdmin()
  const { t } = useLang()

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-bff-700 px-4 py-2 font-display font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-3" aria-label="BFF Classroom home">
            <Logo className="h-9" />
            <span className="hidden font-display text-lg font-bold text-bff-800 sm:block">
              BFF Classroom
            </span>
          </Link>
          <nav className="flex items-center gap-1" aria-label="Primary">
            <NavLink to="/lessons" className={navLinkClass}>
              {t('nav.lessons')}
            </NavLink>
            <NavLink to="/activities" className={navLinkClass}>
              {t('nav.activities')}
            </NavLink>
            <NavLink to="/glossary" className={`${navLinkClass({ isActive: false })} hidden md:inline-flex`}>
              {t('nav.glossary')}
            </NavLink>
            {student ? (
              <NavLink to="/student" className={navLinkClass}>
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
            <LangSwitcher />
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <Logo className="h-8" />
            <div>
              <p className="font-display text-sm font-bold text-bff-800">
                Building Financial Futures of America
              </p>
              <p className="text-xs text-slate-500">
                Free financial literacy for every student. 501(c)(3) nonprofit.
              </p>
            </div>
          </div>
          <a
            href="https://www.bffofamerica.org"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-bff-600 hover:text-bff-700"
          >
            bffofamerica.org →
          </a>
        </div>
      </footer>
    </div>
  )
}

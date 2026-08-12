// Per-route document titles, so browser tabs and history read sensibly.

import { ACTIVITIES } from './activities'

const SUFFIX = 'BFF Classroom'

const STATIC: Record<string, string> = {
  '/': 'Free Financial Literacy',
  '/lessons': 'Lessons',
  '/activities': 'Activities',
  '/glossary': 'Glossary',
  '/certificate': 'Certificate',
  '/practice': 'Practice',
  '/join': 'Join a Class',
  '/game': 'Play Live',
  '/student': 'My Class',
  '/team': 'Team Sign-In',
  '/admin': 'Mentor Dashboard',
  '/account': 'Account',
  '/market-movers': 'Market Movers',
}

/** Best-effort human title for a pathname. */
export function titleForPath(pathname: string): string {
  // Lessons and challenges resolve to their activity title.
  const act = ACTIVITIES.find((a) => a.path === pathname)
  if (act) return `${act.title} · ${SUFFIX}`
  if (STATIC[pathname]) return `${STATIC[pathname]} · ${SUFFIX}`
  if (pathname.startsWith('/admin/class/')) return `Class · ${SUFFIX}`
  return SUFFIX
}

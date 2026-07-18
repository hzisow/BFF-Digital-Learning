// Daily learning streaks, tracked locally (like progress). A day counts when
// the student does anything that saves progress (lesson step, quiz, game).

const KEY = 'bff_streak_v1'

interface StreakData {
  /** ISO dates (yyyy-mm-dd, local time) with activity, most recent last. */
  days: string[]
  best: number
}

function todayISO(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function load(): StreakData {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StreakData
      if (Array.isArray(parsed.days)) return { days: parsed.days, best: parsed.best ?? 0 }
    }
  } catch {
    // fall through
  }
  return { days: [], best: 0 }
}

function save(data: StreakData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // private mode — skip
  }
}

/** Current consecutive-day streak. Counts today, or "yesterday and back" if
 *  the student hasn't done anything yet today (so the streak isn't scary-zero
 *  at breakfast). */
export function getStreak(): { current: number; best: number; activeToday: boolean } {
  const { days, best } = load()
  const set = new Set(days)
  const activeToday = set.has(todayISO())
  let current = 0
  // Start counting from today if active, else from yesterday.
  let offset = activeToday ? 0 : -1
  while (set.has(todayISO(offset))) {
    current++
    offset--
  }
  return { current, best: Math.max(best, current), activeToday }
}

/** Record activity for today. Returns the updated streak. */
export function recordActivity(): { current: number; best: number; activeToday: boolean } {
  const data = load()
  const today = todayISO()
  if (!data.days.includes(today)) {
    data.days.push(today)
    // Keep a year of history, tops.
    if (data.days.length > 400) data.days = data.days.slice(-400)
  }
  save(data)
  const streak = getStreak()
  if (streak.current > data.best) {
    data.best = streak.current
    save(data)
  }
  return streak
}

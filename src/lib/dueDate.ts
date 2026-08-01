// Turning a due date into a deadline.
//
// Assignments already stored `due_at` and the student home already printed it —
// as "Fri, Aug 7". That reads like a fact, not a deadline. A student scanning
// their list has to do date arithmetic in their head to notice that one of them
// is today.
//
// This classifies the date relative to now so the UI can say "Due today" and
// mean it. Comparison is by calendar day, not elapsed hours: something due at
// 9am today is still "today" at 5pm, and a 23-hour gap that crosses midnight is
// "tomorrow", not "today".

export type DueUrgency = 'overdue' | 'today' | 'tomorrow' | 'soon' | 'later'

export interface DueInfo {
  urgency: DueUrgency
  /** Whole calendar days from today. Negative once it is past. */
  days: number
}

/** Midnight-to-midnight difference, so partial days do not skew the label. */
function daysBetween(from: Date, to: Date): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.round((b.getTime() - a.getTime()) / 86_400_000)
}

/** Classify a due date. Returns null for a missing or unparseable value. */
export function dueInfo(dueAt: string | null | undefined, now = new Date()): DueInfo | null {
  if (!dueAt) return null
  const due = new Date(dueAt)
  if (Number.isNaN(due.getTime())) return null
  const days = daysBetween(now, due)
  if (days < 0) return { urgency: 'overdue', days }
  if (days === 0) return { urgency: 'today', days }
  if (days === 1) return { urgency: 'tomorrow', days }
  if (days <= 3) return { urgency: 'soon', days }
  return { urgency: 'later', days }
}

/** Wording for each urgency, in all three languages. */
export function dueLabel(info: DueInfo, lang: 'en' | 'es' | 'zh'): string {
  const { urgency, days } = info
  const late = Math.abs(days)
  if (lang === 'zh') {
    switch (urgency) {
      case 'overdue':
        return late === 1 ? '已逾期 1 天' : `已逾期 ${late} 天`
      case 'today':
        return '今天截止'
      case 'tomorrow':
        return '明天截止'
      case 'soon':
        return `还有 ${days} 天`
      default:
        return `还有 ${days} 天`
    }
  }
  if (lang === 'es') {
    switch (urgency) {
      case 'overdue':
        return late === 1 ? 'Venció ayer' : `Venció hace ${late} días`
      case 'today':
        return 'Vence hoy'
      case 'tomorrow':
        return 'Vence mañana'
      case 'soon':
        return `Vence en ${days} días`
      default:
        return `Vence en ${days} días`
    }
  }
  switch (urgency) {
    case 'overdue':
      return late === 1 ? 'Due yesterday' : `${late} days overdue`
    case 'today':
      return 'Due today'
    case 'tomorrow':
      return 'Due tomorrow'
    case 'soon':
      return `Due in ${days} days`
    default:
      return `Due in ${days} days`
  }
}

/**
 * Chip styling per urgency. Colour is never the only signal — the label always
 * says the same thing in words.
 */
export function dueChipClass(urgency: DueUrgency): string {
  switch (urgency) {
    case 'overdue':
      return 'bg-red-100 text-red-800'
    case 'today':
      return 'bg-orange-100 text-orange-900'
    case 'tomorrow':
      return 'bg-amber-100 text-amber-900'
    case 'soon':
      return 'bg-slate-100 text-slate-700'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}

/** Deadlines a student should be nudged about, worst first. */
export function isUrgent(info: DueInfo): boolean {
  return info.urgency === 'overdue' || info.urgency === 'today' || info.urgency === 'tomorrow'
}

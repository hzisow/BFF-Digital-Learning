// Glossary: every key term from every lesson's "terms" sections, collected at
// runtime — add a lesson and its terms appear here automatically. Searchable,
// and follows the site language (Spanish terms come from lesson translations).

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Search } from 'lucide-react'
import { LESSONS } from '../content/lessons'
import { useLang, localizeLesson } from '../lib/i18n'

interface GlossaryEntry {
  term: string
  definition: string
  lessonSlug: string
  lessonEmoji: string
  lessonTitle: string
}

export default function GlossaryPage() {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')

  const entries = useMemo(() => {
    const list: GlossaryEntry[] = []
    for (const lesson of Object.values(LESSONS)) {
      const localized = localizeLesson(lesson, lang)
      for (const section of localized.sections) {
        if (section.type !== 'terms') continue
        for (const kt of section.terms) {
          list.push({
            term: kt.term,
            definition: kt.definition,
            lessonSlug: lesson.slug,
            lessonEmoji: lesson.emoji,
            lessonTitle: localized.title,
          })
        }
      }
    }
    return list.sort((a, b) => a.term.localeCompare(b.term, lang))
  }, [lang])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(
      (e) => e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q),
    )
  }, [entries, query])

  // Group by first letter for an A–Z browse feel.
  const groups = useMemo(() => {
    const map = new Map<string, GlossaryEntry[]>()
    for (const e of filtered) {
      const letter = e.term[0]?.toUpperCase() ?? '#'
      map.set(letter, [...(map.get(letter) ?? []), e])
    }
    return [...map.entries()]
  }, [filtered])

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <p className="chip mx-auto bg-bff-50 text-bff-700">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> {t('glossary.title')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-slate-900">
          {t('glossary.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">
          {t('glossary.blurb')}
        </p>
      </div>

      <div className="mt-8">
        <label htmlFor="glossary-search" className="sr-only">
          {t('common.search')}
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="glossary-search"
            type="search"
            className="input pl-10"
            placeholder={t('glossary.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p role="status" className="mt-2 text-sm text-slate-500">
          {filtered.length} {filtered.length === 1 ? 'term' : 'terms'}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-600">{t('glossary.empty')}</p>
      ) : (
        <div className="mt-6 space-y-8">
          {groups.map(([letter, list]) => (
            <section key={letter} aria-label={letter}>
              <h2 className="font-display text-xl font-bold text-bff-700">{letter}</h2>
              <dl className="mt-3 space-y-3">
                {list.map((e) => (
                  <div key={`${e.lessonSlug}-${e.term}`} className="card p-5">
                    <dt className="font-display font-bold text-slate-900">{e.term}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {e.definition}
                    </dd>
                    <dd className="mt-3 text-xs font-semibold text-slate-500">
                      {t('glossary.from')}{' '}
                      <Link
                        to={`/lessons/${e.lessonSlug}`}
                        className="text-bff-700 hover:underline"
                      >
                        <span aria-hidden="true">{e.lessonEmoji}</span> {e.lessonTitle}
                      </Link>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

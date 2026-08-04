// Glossary: every key term from every lesson's "terms" sections, collected at
// runtime — add a lesson and its terms appear here automatically. Searchable,
// and follows the site language (Spanish terms come from lesson translations).

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Search } from 'lucide-react'
import { loadAllLessons } from '../content/lessons'
import type { Lesson } from '../content/types'
import { AppIcon } from '../lib/icons'
import type { IconName } from '../lib/icons'
import { useLang, localizeLesson } from '../lib/i18n'
import { Loading, Skeleton, SkeletonText } from '../components/Skeleton'

interface GlossaryEntry {
  term: string
  definition: string
  lessonSlug: string
  lessonIcon: IconName
  lessonTitle: string
}

export default function GlossaryPage() {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')

  // The glossary is one of only two screens that genuinely needs every lesson —
  // it collects key terms from all of them — so it knowingly pulls the whole
  // curriculum. Everywhere else loads a single lesson.
  const [lessons, setLessons] = useState<Record<string, Lesson> | null>(null)
  useEffect(() => {
    let live = true
    void loadAllLessons().then((all) => {
      if (live) setLessons(all)
    })
    return () => {
      live = false
    }
  }, [])

  const entries = useMemo(() => {
    const list: GlossaryEntry[] = []
    for (const lesson of Object.values(lessons ?? {})) {
      const localized = localizeLesson(lesson, lang)
      for (const section of localized.sections) {
        if (section.type !== 'terms') continue
        for (const kt of section.terms) {
          list.push({
            term: kt.term,
            definition: kt.definition,
            lessonSlug: lesson.slug,
            lessonIcon: lesson.icon,
            lessonTitle: localized.title,
          })
        }
      }
    }
    return list.sort((a, b) => a.term.localeCompare(b.term, lang))
  }, [lang, lessons])

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
      <section className="ed-hero chamfer px-6 py-12 text-center sm:px-10 sm:py-14">
        <span
          className="ed-hero-orbit"
          aria-hidden="true"
          style={{ width: 300, height: 300, top: -140, left: '50%', marginLeft: -150 }}
        />
        <span
          className="ed-hero-orbit gold"
          aria-hidden="true"
          style={{ width: 180, height: 180, bottom: -110, left: '50%', marginLeft: -90 }}
        />
        <div className="relative z-[1]">
          <p className="eyebrow justify-center text-bff-300">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> {t('glossary.title')}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
            {t('glossary.title')}
          </h1>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
            {t('glossary.blurb')}
          </p>

          <div className="mx-auto mt-8 max-w-md">
            <label htmlFor="glossary-search" className="sr-only">
              {t('common.search')}
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
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
            <p role="status" className="mt-2 text-left text-sm text-white/60">
              {lang === 'zh'
                ? `${filtered.length} 个术语`
                : lang === 'es'
                  ? `${filtered.length} ${filtered.length === 1 ? 'término' : 'términos'}`
                  : `${filtered.length} ${filtered.length === 1 ? 'term' : 'terms'}`}
            </p>
          </div>
        </div>
      </section>

      {lessons === null ? (
        // Curriculum still downloading — a skeleton, not "no terms found",
        // which is what an empty-state check alone would have shown.
        <Loading label={t('glossary.title')} className="mt-8 space-y-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="card accent-left p-5 pl-6">
              <Skeleton className="h-5 w-40" />
              <SkeletonText lines={2} className="mt-3" />
            </div>
          ))}
        </Loading>
      ) : filtered.length === 0 ? (
        <p className="mt-10 text-center text-ink/60">{t('glossary.empty')}</p>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map(([letter, list]) => (
            <section key={letter} aria-label={letter}>
              <h2 className="font-display text-2xl font-extrabold text-bff-700">{letter}</h2>
              <dl className="mt-3 space-y-3">
                {list.map((e) => (
                  <div key={`${e.lessonSlug}-${e.term}`} className="card accent-left p-5 pl-6">
                    <dt className="font-display font-bold text-ink">{e.term}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink/60">
                      {e.definition}
                    </dd>
                    <dd className="mt-3 text-xs font-semibold text-ink/50">
                      {t('glossary.from')}{' '}
                      <Link
                        to={`/lessons/${e.lessonSlug}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-bff-700 hover:underline"
                      >
                        <AppIcon name={e.lessonIcon} className="h-4 w-4" />
                        {e.lessonTitle}
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

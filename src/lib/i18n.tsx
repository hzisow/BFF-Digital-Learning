// Lightweight i18n: an English/Spanish toggle persisted in localStorage.
// UI chrome strings live in the dictionary below; lesson CONTENT is translated
// per-lesson via the `es` field on Lesson (see content/types.ts) and merged
// with localizeLesson().

/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Lesson, LessonSection, QuizQuestion } from '../content/types'

export type Lang = 'en' | 'es'

const LANG_KEY = 'bff_lang'

const STRINGS: Record<string, { en: string; es: string }> = {
  'nav.lessons': { en: 'Lessons', es: 'Lecciones' },
  'nav.activities': { en: 'Activities', es: 'Actividades' },
  'nav.glossary': { en: 'Glossary', es: 'Glosario' },
  'nav.join': { en: 'Join Class', es: 'Unirse a clase' },
  'nav.myClass': { en: 'My Class', es: 'Mi clase' },
  'nav.team': { en: 'Team', es: 'Equipo' },
  'nav.dashboard': { en: 'Dashboard', es: 'Panel' },
  'footer.tagline': {
    en: 'Free financial literacy for every student. 501(c)(3) nonprofit.',
    es: 'Educación financiera gratuita para cada estudiante. Organización 501(c)(3).',
  },
  'common.continue': { en: 'Continue', es: 'Continuar' },
  'common.back': { en: 'Back', es: 'Atrás' },
  'common.start': { en: 'Start', es: 'Empezar' },
  'common.search': { en: 'Search', es: 'Buscar' },
  'common.englishOnly': {
    en: 'English only for now',
    es: 'Por ahora solo en inglés',
  },
  'glossary.title': { en: 'Glossary', es: 'Glosario' },
  'glossary.blurb': {
    en: 'Every key money term from the BFF Academy lessons, in one place.',
    es: 'Todos los términos clave de dinero de las lecciones de BFF Academy, en un solo lugar.',
  },
  'glossary.searchPlaceholder': {
    en: 'Search terms… (e.g. “interest”)',
    es: 'Buscar términos… (p. ej. “interés”)',
  },
  'glossary.from': { en: 'From', es: 'De' },
  'glossary.empty': {
    en: 'No terms match your search.',
    es: 'Ningún término coincide con tu búsqueda.',
  },
}

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key) => STRINGS[key]?.en ?? key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY)
      return saved === 'es' ? 'es' : 'en'
    } catch {
      return 'en'
    }
  })

  // Keep the document language attribute in sync (screen readers use it).
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function setLang(l: Lang) {
    setLangState(l)
    try {
      localStorage.setItem(LANG_KEY, l)
    } catch {
      // private mode — in-memory only
    }
  }

  const t = (key: string) => STRINGS[key]?.[lang] ?? STRINGS[key]?.en ?? key

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  return useContext(LangContext)
}

// ---------- Lesson content localization ----------

export interface LocalizedLesson {
  title: string
  description: string
  sections: LessonSection[]
  quiz: QuizQuestion[]
  /** True when Spanish was requested but this lesson has no translation. */
  fallback: boolean
}

export function localizeLesson(lesson: Lesson, lang: Lang): LocalizedLesson {
  if (lang === 'es' && lesson.es) {
    return {
      title: lesson.es.title ?? lesson.title,
      description: lesson.es.description ?? lesson.description,
      sections: lesson.es.sections ?? lesson.sections,
      quiz: lesson.es.quiz ?? lesson.quiz,
      fallback: false,
    }
  }
  return {
    title: lesson.title,
    description: lesson.description,
    sections: lesson.sections,
    quiz: lesson.quiz,
    fallback: lang === 'es',
  }
}

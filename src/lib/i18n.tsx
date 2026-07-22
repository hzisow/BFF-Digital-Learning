// Lightweight i18n: an English/Spanish toggle persisted in localStorage.
// UI chrome strings live in the dictionary below; lesson CONTENT is translated
// per-lesson via the `es` field on Lesson (see content/types.ts) and merged
// with localizeLesson().

/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Lesson, LessonSection, QuizQuestion } from '../content/types'

export type Lang = 'en' | 'es' | 'zh'

/** The languages the app offers, in switcher order. */
export const LANGS: Lang[] = ['en', 'es', 'zh']

const LANG_KEY = 'bff_lang'

interface Variants {
  en: string
  es?: string
  zh?: string
}

const STRINGS: Record<string, Variants> = {
  'nav.lessons': { en: 'Lessons', es: 'Lecciones', zh: '课程' },
  'nav.activities': { en: 'Activities', es: 'Actividades', zh: '活动' },
  'nav.glossary': { en: 'Glossary', es: 'Glosario', zh: '词汇表' },
  'nav.join': { en: 'Join Class', es: 'Unirse a clase', zh: '加入班级' },
  'nav.playLive': { en: 'Play Live', es: 'Jugar en vivo', zh: '实时游戏' },
  'nav.myClass': { en: 'My Class', es: 'Mi clase', zh: '我的班级' },
  'nav.team': { en: 'Team', es: 'Equipo', zh: '团队' },
  'nav.dashboard': { en: 'Dashboard', es: 'Panel', zh: '仪表板' },
  'footer.tagline': {
    en: 'Free financial literacy for every student. 501(c)(3) nonprofit.',
    es: 'Educación financiera gratuita para cada estudiante. Organización 501(c)(3).',
    zh: '为每位学生提供免费的理财教育。501(c)(3) 非营利组织。',
  },
  'common.continue': { en: 'Continue', es: 'Continuar', zh: '继续' },
  'common.back': { en: 'Back', es: 'Atrás', zh: '返回' },
  'common.start': { en: 'Start', es: 'Empezar', zh: '开始' },
  'common.search': { en: 'Search', es: 'Buscar', zh: '搜索' },
  'common.englishOnly': {
    en: 'English only for now',
    es: 'Por ahora solo en inglés',
    zh: '目前仅提供英文',
  },
  'glossary.title': { en: 'Glossary', es: 'Glosario', zh: '词汇表' },
  'glossary.blurb': {
    en: 'Every key money term from the BFF Academy lessons, in one place.',
    es: 'Todos los términos clave de dinero de las lecciones de BFF Academy, en un solo lugar.',
    zh: 'BFF 学院课程中的所有关键理财术语，尽在一处。',
  },
  'glossary.searchPlaceholder': {
    en: 'Search terms… (e.g. “interest”)',
    es: 'Buscar términos… (p. ej. “interés”)',
    zh: '搜索术语……（例如“利息”）',
  },
  'glossary.from': { en: 'From', es: 'De', zh: '来自' },
  'glossary.empty': {
    en: 'No terms match your search.',
    es: 'Ningún término coincide con tu búsqueda.',
    zh: '没有符合搜索的术语。',
  },
  'lesson.startQuiz': { en: 'Start the quiz', es: 'Empezar el examen', zh: '开始测验' },
  'lesson.seeResults': { en: 'See my results', es: 'Ver mis resultados', zh: '查看我的成绩' },
  'lesson.step': { en: 'Step', es: 'Paso', zh: '步骤' },
  'lesson.of': { en: 'of', es: 'de', zh: '/' },
  'lesson.questionWord': { en: 'Question', es: 'Pregunta', zh: '问题' },
  'lesson.complete': { en: 'Complete!', es: '¡Completado!', zh: '完成！' },
  'lesson.reviewAnswers': { en: 'Review your answers', es: 'Revisa tus respuestas', zh: '查看你的答案' },
  'lesson.retake': { en: 'Retake quiz', es: 'Repetir examen', zh: '重新测验' },
  'lesson.backToLessons': { en: 'Back to lessons', es: 'Volver a lecciones', zh: '返回课程' },
  'lesson.nextLesson': { en: 'Next lesson', es: 'Próxima lección', zh: '下一课' },
  'lesson.yourAnswer': { en: 'Your answer:', es: 'Tu respuesta:', zh: '你的答案：' },
  'lesson.correctAnswer': { en: 'Correct answer:', es: 'Respuesta correcta:', zh: '正确答案：' },
  'lesson.correctChip': { en: 'Correct', es: 'Correcta', zh: '正确' },
  'lesson.missedChip': { en: 'Missed', es: 'Fallada', zh: '答错' },
  'lesson.enterTip': { en: 'Tip: press', es: 'Consejo: presiona', zh: '提示：按' },
  'lesson.enterTipEnd': { en: 'to continue', es: 'para continuar', zh: '键继续' },
  'lesson.quizKicker': { en: 'Quiz', es: 'Examen', zh: '测验' },
  'readAloud.play': { en: 'Read this step aloud', es: 'Leer este paso en voz alta', zh: '朗读本步骤' },
  'readAloud.stop': { en: 'Stop reading', es: 'Detener lectura', zh: '停止朗读' },
}

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
  /** Pick a string for the current language from inline variants (en required). */
  tr: (v: Variants) => string
}

function pick(v: Variants, lang: Lang): string {
  return v[lang] ?? v.en
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key) => STRINGS[key]?.en ?? key,
  tr: (v) => v.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY)
      return saved === 'es' || saved === 'zh' ? saved : 'en'
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
  const tr = (v: Variants) => pick(v, lang)

  return (
    <LangContext.Provider value={{ lang, setLang, t, tr }}>{children}</LangContext.Provider>
  )
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
  const variant = lang === 'es' ? lesson.es : lang === 'zh' ? lesson.zh : undefined
  if (variant) {
    return {
      title: variant.title ?? lesson.title,
      description: variant.description ?? lesson.description,
      sections: variant.sections ?? lesson.sections,
      quiz: variant.quiz ?? lesson.quiz,
      fallback: false,
    }
  }
  return {
    title: lesson.title,
    description: lesson.description,
    sections: lesson.sections,
    quiz: lesson.quiz,
    // fallback = a non-English language was requested but this lesson lacks it.
    fallback: lang !== 'en',
  }
}

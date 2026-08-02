// AI Open-Response Grading — a reusable lesson block.
//
// A lesson passes in a short free-text `prompt` (and an optional `rubric`); the
// student writes a sentence or two and gets warm, specific AI feedback: a score
// chip, a summary, "What went well", and "To improve". Fully self-contained —
// no router, no lesson-specific imports — so any lesson section can drop it in.
//
// Grade shape returned by the `grade-response` edge function:
//   { score: number | null; summary: string; strengths: string[]; improve: string[] }

import { useId, useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { invokeAI, AI_ENABLED, AINotConfiguredError, AIOfflineError } from '../lib/ai'
import { offlineAICopy } from '../lib/offlineCopy'
import { useLang } from '../lib/i18n'

interface Grade {
  score: number | null
  summary: string
  strengths: string[]
  improve: string[]
}

export interface OpenResponseProps {
  prompt: string
  rubric?: string
  id?: string
}

type Status = 'idle' | 'loading' | 'done' | 'not-configured' | 'offline' | 'error'

export default function OpenResponse({ prompt, rubric, id }: OpenResponseProps) {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [grade, setGrade] = useState<Grade | null>(null)

  const reactId = useId()
  const fieldId = id ?? reactId
  const textareaId = `${fieldId}-answer`

  const submitting = status === 'loading'
  const showFeedback = status === 'done' && grade !== null

  async function handleSubmit() {
    if (submitting || !answer.trim()) return
    setStatus('loading')
    try {
      const result = await invokeAI<Grade>('grade-response', {
        prompt,
        answer,
        rubric,
        lang,
      })
      setGrade(result)
      setStatus('done')
    } catch (err) {
      if (err instanceof AIOfflineError) {
        setStatus('offline')
      } else if (err instanceof AINotConfiguredError) {
        setStatus('not-configured')
      } else {
        setStatus('error')
      }
    }
  }

  function handleTryAgain() {
    // Keep the answer so the student can revise it, and clear the old grade.
    setGrade(null)
    setStatus('idle')
  }

  const scoreLabel = zh ? '得分' : es ? 'Puntuación' : 'Score'

  return (
    <div className="card accent-left">
      <p className="eyebrow text-bff-600">
        <span className="eyebrow-line" aria-hidden="true" />
        {zh ? '开放式问题' : es ? 'Respuesta abierta' : 'Open response'}
      </p>

      {/* The question label doubles as the textarea's <label> for screen readers. */}
      <label
        htmlFor={textareaId}
        className="mt-2 block font-display text-lg font-bold leading-snug text-ink"
      >
        {prompt}
      </label>

      <textarea
        id={textareaId}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={submitting || showFeedback}
        rows={4}
        className="input mt-3 resize-y leading-relaxed disabled:cursor-not-allowed disabled:bg-ink/5 disabled:text-ink/50"
        placeholder={
          zh
            ? '用一两句话写下你的想法……'
            : es
              ? 'Escribe tu idea en una o dos frases…'
              : 'Write your thinking in a sentence or two…'
        }
      />

      {!AI_ENABLED && (
        <p className="mt-2 text-sm text-ink/50">
          {zh
            ? 'AI 反馈暂时不可用，但你仍然可以写下并保存你的答案，导师会阅读它。'
            : es
              ? 'Los comentarios con IA no están disponibles por ahora, pero aún puedes escribir tu respuesta y tu mentor la leerá.'
              : 'AI feedback is unavailable right now, but you can still write your answer — your mentor can read it.'}
        </p>
      )}

      {!showFeedback && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !answer.trim() || !AI_ENABLED}
            aria-busy={submitting}
            className="btn-primary"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            )}
            {submitting
              ? zh
                ? '正在批改…'
                : es
                  ? 'Revisando…'
                  : 'Reading your answer…'
              : zh
                ? '获取反馈'
                : es
                  ? 'Obtener comentarios'
                  : 'Get feedback'}
          </button>
          {AI_ENABLED && (
            <span className="text-sm text-ink/50">
              {zh
                ? 'AI 会给出鼓励性的具体反馈。'
                : es
                  ? 'La IA te dará comentarios alentadores y específicos.'
                  : 'AI gives you warm, specific feedback.'}
            </span>
          )}
        </div>
      )}

      {/* Live region: announces the feedback (or an error) as it arrives. */}
      <div role="status" aria-live="polite">
        {status === 'not-configured' && (
          <div className="mt-4 rounded-[6px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {zh
              ? 'AI 反馈还没有设置好——不过没关系，你的导师仍然可以阅读你的答案。'
              : es
                ? 'Los comentarios con IA aún no están configurados, pero tu mentor todavía puede leer tu respuesta.'
                : "AI feedback isn't set up yet — your mentor can still read your answer."}
          </div>
        )}

        {status === 'offline' && (
          <div className="mt-4 flex flex-col gap-3 rounded-[6px] border border-ink/20 bg-paper-deep p-4 text-sm text-ink sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="block font-display font-bold">{offlineAICopy(lang).title}</span>
              <span className="mt-0.5 block text-ink/70">
                {zh
                  ? '你的答案已保留在这里——恢复网络后再提交即可。'
                  : es
                    ? 'Tu respuesta sigue aquí — envíala de nuevo cuando vuelvas a tener conexión.'
                    : 'Your answer is still here — send it again once you are back online.'}
              </span>
            </span>
            <button type="button" onClick={handleSubmit} className="btn-secondary shrink-0">
              {zh ? '重试' : es ? 'Reintentar' : 'Try again'}
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 flex flex-col gap-3 rounded-[6px] border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
            <span>
              {zh
                ? '获取反馈时出错了。请再试一次。'
                : es
                  ? 'Algo salió mal al obtener comentarios. Inténtalo de nuevo.'
                  : 'Something went wrong getting feedback. Please try again.'}
            </span>
            <button type="button" onClick={handleSubmit} className="btn-secondary shrink-0">
              {zh ? '重试' : es ? 'Reintentar' : 'Try again'}
            </button>
          </div>
        )}

        {showFeedback && grade && (
          <div className="panel mt-4 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="flex items-center gap-1.5 font-display text-base font-bold text-ink">
                <Sparkles className="h-4 w-4 text-bff-600" aria-hidden="true" />
                {zh ? '你的反馈' : es ? 'Tus comentarios' : 'Your feedback'}
              </h3>
              {grade.score !== null && (
                <span className="chip bg-bff-100 text-bff-800">
                  {scoreLabel}: {grade.score}/100
                </span>
              )}
            </div>

            <p className="mt-3 leading-relaxed text-ink/70">{grade.summary}</p>

            {grade.strengths.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-bold text-ink">
                  {zh ? '做得好的地方' : es ? 'Lo que hiciste bien' : 'What went well'}
                </h4>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/70">
                  {grade.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {grade.improve.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-bold text-ink">
                  {zh ? '可以改进的地方' : es ? 'Para mejorar' : 'To improve'}
                </h4>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/70">
                  {grade.improve.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            <button type="button" onClick={handleTryAgain} className="btn-secondary mt-5">
              {zh ? '再试一次' : es ? 'Intentar de nuevo' : 'Try again'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

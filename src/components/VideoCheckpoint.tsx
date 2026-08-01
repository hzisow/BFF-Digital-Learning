// Edpuzzle-style interactive video: a YouTube embed that pauses at set
// timestamps and asks a question before playback can continue. Skipping ahead
// is blocked; questions missed by seeking pop at the end of the video. When
// YouTube can't load (school filters, offline), the questions render as plain
// cards so the lesson is never blocked.

import { useEffect, useId, useRef, useState } from 'react'
import { Pause, Play, Check, CheckCircle2, AlertCircle, Zap } from 'lucide-react'
import type { VideoQuestion } from '../content/types'
import { useLang } from '../lib/i18n'
import { Loading, Skeleton } from './Skeleton'

// ---------- Minimal YouTube IFrame API typings ----------

interface YTPlayer {
  getCurrentTime(): number
  getDuration(): number
  seekTo(seconds: number, allowSeekAhead: boolean): void
  pauseVideo(): void
  playVideo(): void
  destroy(): void
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: () => void
        onStateChange?: (e: { data: number }) => void
        onError?: () => void
      }
    },
  ) => YTPlayer
  PlayerState: { ENDED: number; PLAYING: number }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let ytApiPromise: Promise<YTNamespace> | null = null

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const fail = (err: Error) => {
      ytApiPromise = null // allow retry on a later mount
      reject(err)
    }
    const timeout = setTimeout(() => fail(new Error('YouTube took too long to load')), 8000)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout)
      prev?.()
      if (window.YT) resolve(window.YT)
      else fail(new Error('YouTube API missing after load'))
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    tag.async = true
    tag.onerror = () => {
      clearTimeout(timeout)
      fail(new Error('YouTube failed to load'))
    }
    document.head.appendChild(tag)
  })
  return ytApiPromise
}

// ---------- Shared question card ----------

function QuestionCard({
  q,
  index,
  total,
  onAnswered,
  onContinue,
  compact,
  zh,
  es,
}: {
  q: VideoQuestion
  index: number
  total: number
  onAnswered: () => void
  onContinue: () => void
  compact?: boolean
  zh: boolean
  es: boolean
}) {
  const [chosen, setChosen] = useState<number | null>(null)
  const revealed = chosen != null
  const gotIt = chosen === q.answerIndex
  const questionId = useId()

  function pick(i: number) {
    if (revealed) return
    setChosen(i)
    onAnswered()
  }

  function optionStateLabel(i: number): string | undefined {
    if (!revealed) return undefined
    if (i === q.answerIndex)
      return zh
        ? `${q.options[i]}，正确答案`
        : es
          ? `${q.options[i]}, respuesta correcta`
          : `${q.options[i]}, correct answer`
    if (i === chosen)
      return zh
        ? `${q.options[i]}，你的答案，错误`
        : es
          ? `${q.options[i]}, tu respuesta, incorrecta`
          : `${q.options[i]}, your answer, incorrect`
    return undefined
  }

  return (
    <div className={`w-full ${compact ? '' : 'card'} text-left`}>
      <p className="eyebrow text-ink">
        <Pause className="h-3.5 w-3.5" aria-hidden="true" />{' '}
        {zh
          ? `视频检查 · 第 ${index + 1} / ${total} 题`
          : es
            ? `Control del video · ${index + 1} de ${total}`
            : `Video check · ${index + 1} of ${total}`}
      </p>
      <p id={questionId} className="mt-2 font-display font-bold leading-snug text-ink">
        {q.question}
      </p>
      <div role="group" aria-labelledby={questionId} className="mt-3 space-y-2">
        {q.options.map((opt, i) => {
          let cls = 'border-ink/15 bg-white text-ink/80 hover:border-bff-400 hover:bg-paper-soft'
          if (revealed) {
            cls =
              i === q.answerIndex
                ? 'border-green-500 bg-green-50 text-green-800'
                : i === chosen
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-ink/15 bg-white text-ink/40'
          }
          return (
            <button
              key={i}
              type="button"
              disabled={revealed}
              aria-label={optionStateLabel(i)}
              onClick={() => pick(i)}
              className={`w-full rounded-[6px] border-2 px-3 py-2 text-left text-sm font-medium transition disabled:cursor-default ${cls}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {revealed && (
        <div
          role="status"
          className={`mt-3 rounded-[6px] border p-3 text-sm leading-relaxed ${
            gotIt
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}
        >
          <span className="font-bold">
            {gotIt ? (
              <>
                {zh ? '答对了！' : es ? '¡Perfecto!' : 'Nailed it!'} <Check className="inline h-4 w-4 align-text-bottom" aria-hidden="true" />{' '}
              </>
            ) : zh ? (
              '不错的尝试！'
            ) : es ? (
              '¡Buen intento! '
            ) : (
              'Good try! '
            )}
          </span>
          {q.explanation}
        </div>
      )}
      {revealed && (
        <button type="button" onClick={onContinue} className="btn-primary mt-4 w-full">
          {index + 1 < total
            ? zh
              ? '继续观看'
              : es
                ? 'Seguir viendo'
                : 'Keep watching'
            : zh
              ? '继续'
              : es
                ? 'Continuar'
                : 'Continue'}{' '}
          <Play className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

// ---------- Fallback when YouTube is blocked ----------

function FallbackQuestions({
  videoId,
  questions,
  onAllAnswered,
  zh,
  es,
}: {
  videoId: string
  questions: VideoQuestion[]
  onAllAnswered: () => void
  zh: boolean
  es: boolean
}) {
  const [step, setStep] = useState(0)
  const done = step >= questions.length
  useEffect(() => {
    if (done) onAllAnswered()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  return (
    <div className="space-y-4">
      <div className="rounded-[6px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="flex items-center gap-1.5 font-bold">
          <AlertCircle className="h-4 w-4" aria-hidden="true" /> {zh ? '视频无法加载？' : es ? '¿No carga el video?' : 'Video not loading?'}
        </p>
        <p className="mt-1">
          {zh ? (
            <>
              有些学校网络会屏蔽 YouTube。你可以{' '}
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                在新标签页中打开视频
              </a>
              ——或者直接回答下面的视频问题以继续。
            </>
          ) : es ? (
            <>
              Algunas redes escolares bloquean YouTube. Puedes{' '}
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                abrir el video en una pestaña nueva
              </a>{' '}
              — o simplemente responder las preguntas del video de abajo para seguir.
            </>
          ) : (
            <>
              Some school networks block YouTube. You can{' '}
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                open the video in a new tab
              </a>{' '}
              — or just answer the video questions below to keep going.
            </>
          )}
        </p>
      </div>
      {done ? (
        <p
          role="status"
          className="flex items-center justify-center gap-1.5 rounded-[6px] bg-green-50 p-4 text-center text-sm font-bold text-green-700"
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />{' '}
          {zh ? '所有视频检查都完成了，继续前进吧！' : es ? '¡Listos todos los controles del video, sigue adelante!' : 'All video checks done — keep going!'}
        </p>
      ) : (
        <QuestionCard
          key={step}
          q={questions[step]}
          index={step}
          total={questions.length}
          onAnswered={() => {}}
          onContinue={() => setStep(step + 1)}
          zh={zh}
          es={es}
        />
      )}
    </div>
  )
}

// ---------- The interactive player ----------

export default function VideoCheckpoint({
  videoId,
  questions,
  onDone,
}: {
  videoId: string
  questions: VideoQuestion[]
  onDone: () => void
}) {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const hostRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [duration, setDuration] = useState(0)
  const [watchedPct, setWatchedPct] = useState(0)
  const [answered, setAnswered] = useState<boolean[]>(() => questions.map(() => false))
  const [active, setActive] = useState<number | null>(null)
  const [ended, setEnded] = useState(false)

  // Refs mirror state the poll loop needs without re-subscribing.
  const answeredRef = useRef(answered)
  answeredRef.current = answered
  const activeRef = useRef(active)
  activeRef.current = active
  const maxWatchedRef = useRef(0)
  const doneFiredRef = useRef(false)

  const sorted = useRef([...questions].sort((a, b) => a.at - b.at)).current
  const allAnswered = answered.every(Boolean)
  const watchDone = allAnswered && (ended || sorted.length > 0)

  // Fire onDone exactly once when requirements are met.
  useEffect(() => {
    if ((watchDone || (sorted.length === 0 && ended)) && !doneFiredRef.current) {
      doneFiredRef.current = true
      onDone()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDone, ended])

  // When a question overlay opens, move keyboard focus to its first option so
  // screen-reader / keyboard users land inside the required dialog.
  useEffect(() => {
    if (active == null) return
    const firstOption = panelRef.current?.querySelector('button')
    firstOption?.focus()
  }, [active])

  useEffect(() => {
    let cancelled = false
    let poll: ReturnType<typeof setInterval> | undefined

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !hostRef.current) return
        const player = new YT.Player(hostRef.current, {
          videoId,
          playerVars: { rel: 0, playsinline: 1, modestbranding: 1, origin: window.location.origin },
          events: {
            onReady: () => {
              if (cancelled) return
              setReady(true)
              setDuration(player.getDuration())
            },
            onStateChange: (e) => {
              if (cancelled) return
              if (e.data === YT.PlayerState.ENDED) {
                // Catch-up: pop any questions the student hasn't answered yet.
                const firstUnanswered = answeredRef.current.findIndex((a) => !a)
                if (firstUnanswered >= 0) setActive(firstUnanswered)
                setEnded(true)
              }
            },
            onError: () => {
              if (!cancelled) setFailed(true)
            },
          },
        })
        playerRef.current = player

        poll = setInterval(() => {
          if (cancelled || activeRef.current != null) return
          let t = 0
          try {
            t = player.getCurrentTime()
          } catch {
            return
          }
          if (!t && t !== 0) return
          // Anti-skip: rewind seeks that jump past what's been watched.
          if (t > maxWatchedRef.current + 1.8) {
            player.seekTo(maxWatchedRef.current, true)
            return
          }
          maxWatchedRef.current = Math.max(maxWatchedRef.current, t)
          const dur = player.getDuration()
          if (dur > 0) {
            setDuration(dur)
            setWatchedPct(Math.min(100, (maxWatchedRef.current / dur) * 100))
          }
          // Pause for the next unanswered question whose time has come.
          const idx = sorted.findIndex((q, i) => !answeredRef.current[i] && t >= q.at)
          if (idx >= 0) {
            player.pauseVideo()
            setActive(idx)
          }
        }, 300)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
      if (poll) clearInterval(poll)
      try {
        playerRef.current?.destroy()
      } catch {
        // player may already be gone
      }
      playerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId])

  if (failed) {
    return (
      <FallbackQuestions
        videoId={videoId}
        questions={sorted}
        zh={zh}
        es={es}
        onAllAnswered={() => {
          if (!doneFiredRef.current) {
            doneFiredRef.current = true
            onDone()
          }
        }}
      />
    )
  }

  function continueWatching() {
    if (active == null) return
    // In the end-of-video catch-up, chain straight to the next unanswered one.
    const next = answeredRef.current.findIndex((a, i) => !a && i !== active)
    setActive(null)
    if (ended && next >= 0) {
      setActive(next)
    } else if (!ended) {
      playerRef.current?.playVideo()
    }
  }

  const fallbackDur = sorted.length > 0 ? Math.max(...sorted.map((q) => q.at)) * 1.25 : 1

  return (
    <div>
      {/* Player + question overlay */}
      <div className="relative overflow-hidden rounded-[8px] border border-ink/10 bg-ink shadow-card">
        <div className="aspect-video w-full">
          <div ref={hostRef} className="h-full w-full" />
        </div>
        {!ready && (
          // Player-shaped placeholder: the 16:9 block keeps the frame while the
          // YouTube iframe boots, instead of a bare line of text.
          <Loading
            label={zh ? '正在加载视频…' : es ? 'Cargando video…' : 'Loading video…'}
            className="absolute inset-0 bg-paper"
          >
            <Skeleton className="aspect-video w-full rounded-none" />
          </Loading>
        )}
        {active != null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={
              zh
                ? '视频问题——回答后继续观看'
                : es
                  ? 'Pregunta del video — responde para seguir viendo'
                  : 'Video question — answer to keep watching'
            }
            className="absolute inset-0 z-10 flex items-stretch justify-end"
          >
            {/* Light scrim: the paused frame stays visible, panel edge reads cleanly */}
            <div
              className="absolute inset-0 bg-ink/40"
              aria-hidden
            />
            {/* "Paused" pill sits over the still-visible video */}
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-[5px] border border-white/15 bg-ink/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
              <Pause className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />{' '}
              {zh ? '已暂停以回答问题' : es ? 'En pausa para una pregunta' : 'Paused for a question'}
            </div>
            {/* Question slides in from the right (bottom on small screens) */}
            <div
              ref={panelRef}
              tabIndex={-1}
              className="relative flex h-full w-full animate-slide-in-up flex-col overflow-y-auto border-l-2 border-ink bg-white/95 p-4 shadow-2xl backdrop-blur sm:w-[62%] sm:max-w-sm sm:animate-slide-in-right sm:p-5"
            >
              <div className="my-auto">
                <QuestionCard
                  key={active}
                  q={sorted[active]}
                  index={active}
                  total={sorted.length}
                  compact
                  zh={zh}
                  es={es}
                  onAnswered={() =>
                    setAnswered((prev) => prev.map((a, i) => (i === active ? true : a)))
                  }
                  onContinue={continueWatching}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Watch progress + question markers */}
      <div className="mt-3">
        <div
          role="progressbar"
          aria-label={zh ? '视频观看进度' : es ? 'Progreso del video' : 'Video watch progress'}
          aria-valuenow={Math.round(watchedPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="relative h-2.5 overflow-visible rounded-full bg-ink/10"
        >
          <div
            className="h-full rounded-full bg-bff-500 transition-all duration-300"
            style={{ width: `${watchedPct}%` }}
          />
          {sorted.map((q, i) => {
            const pct = Math.min(97, (q.at / (duration || fallbackDur)) * 100)
            return (
              <span
                key={i}
                aria-hidden="true"
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white shadow ${
                  answered[i] ? 'bg-green-500' : 'bg-gold-400'
                }`}
                style={{ left: `calc(${pct}% - 8px)` }}
              />
            )
          })}
        </div>
        <div
          role="status"
          className="mt-2 flex items-center justify-between text-xs font-semibold text-ink/50"
        >
          <span>
            {sorted.filter((_, i) => answered[i]).length}/{sorted.length}{' '}
            {zh ? '道问题已回答' : es ? 'preguntas respondidas' : 'questions answered'}
          </span>
          {watchDone ? (
            <span className="flex items-center gap-1 text-green-700">
              {zh ? '所有检查都完成了，请在下方继续！' : es ? '¡Listos todos los controles, continúa abajo!' : 'All checks done — continue below!'}{' '}
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />{' '}
              {zh
                ? '视频会暂停来考考你——不要快进哦！'
                : es
                  ? 'El video se pausa para hacerte preguntas; ¡no adelantes!'
                  : 'The video pauses to quiz you — no skipping ahead!'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

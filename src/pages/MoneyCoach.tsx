// AI Money Coach — a chat tutor students ask personal-finance questions.
// The coach replies in the student's language and stays scoped to the BFF
// money curriculum (the guardrails live server-side in the edge function).
// This page is the chat UI: message log, input, starter prompts, and calm
// handling for the "not set up yet" and transient-error cases.

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { MessageCircle, ArrowUp, RefreshCw, Bot } from 'lucide-react'
import { invokeAI, AI_ENABLED, AINotConfiguredError, AIOfflineError } from '../lib/ai'
import { offlineAICopy } from '../lib/offlineCopy'
import { useLang } from '../lib/i18n'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * A displayable reason for a failed AI call. The functions report failures in
 * the response payload (see lib/ai.ts), so the Error message already carries
 * the upstream text; we only filter out supabase-js's own generic wrapper.
 */
function serverReason(err: unknown): string | null {
  const msg = err instanceof Error ? err.message : String(err ?? '')
  if (!msg || /non-2xx/i.test(msg)) return null
  return msg
}

export default function MoneyCoach() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [notConfigured, setNotConfigured] = useState(false)
  const [failed, setFailed] = useState(false)
  const [offline, setOffline] = useState(false)
  const [failReason, setFailReason] = useState<string | null>(null)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Keep the newest message in view as the conversation grows and while the
  // coach is "typing". Global CSS neutralizes smooth-scroll under reduced motion.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, busy])

  // Grow the box to fit what has been typed. Reset to auto first, otherwise
  // scrollHeight is measured against the height already set and the field can
  // only ever get taller, never shrink back after a delete. The max-height in
  // the class caps it (about seven lines) and turns on scrolling past that.
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    // Empty: drop the inline height entirely and let rows={1} govern. Measuring
    // an empty textarea returns the height of the *wrapped placeholder*, which
    // left the box sitting two lines tall before anyone had typed anything.
    if (!input) {
      el.style.height = ''
      return
    }
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [input])

  // Enter sends, Shift+Enter starts a new line. A textarea's default is the
  // other way round, and this is a chat.
  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== 'Enter' || e.shiftKey) return
    e.preventDefault()
    send(input)
  }

  const starters = zh
    ? [
        '信用评分是什么？',
        '我该怎么开始存钱？',
        '罗斯个人退休账户（Roth IRA）是什么？',
        '预算是怎么运作的？',
      ]
    : es
      ? [
          '¿Qué es un puntaje de crédito?',
          '¿Cómo empiezo a ahorrar?',
          '¿Qué es una cuenta Roth IRA?',
          '¿Cómo funciona un presupuesto?',
        ]
      : [
          "What's a credit score?",
          'How do I start saving?',
          'What is a Roth IRA?',
          'How does a budget work?',
        ]

  async function runCoach(convo: ChatMessage[]) {
    setBusy(true)
    setFailed(false)
    setOffline(false)
    setFailReason(null)
    try {
      const { reply } = await invokeAI<{ reply: string }>('money-coach', {
        messages: convo,
        lang,
      })
      setMessages([...convo, { role: 'assistant', content: reply }])
    } catch (err) {
      if (err instanceof AIOfflineError) {
        // The question stays in the thread so Retry resends it verbatim once
        // the connection comes back.
        setOffline(true)
      } else if (err instanceof AINotConfiguredError) {
        setNotConfigured(true)
      } else {
        // Leave the user's message in place so Retry can resend it, and keep
        // the server's reason so the UI can show something actionable rather
        // than a dead end.
        setFailed(true)
        setFailReason(serverReason(err))
      }
    } finally {
      setBusy(false)
      // Return focus to the input so keyboard users keep their place.
      inputRef.current?.focus()
    }
  }

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    void runCoach(next)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  // ---- Localized UI chrome ----
  const kicker = zh ? '理财教练' : es ? 'Asesor de dinero' : 'Money Coach'
  const titleNode = zh ? (
    <>
      AI <em>理财</em>教练
    </>
  ) : es ? (
    <>
      Asesor de <em>dinero</em> con IA
    </>
  ) : (
    <>
      AI <em>Money</em> Coach
    </>
  )
  const blurb = zh
    ? '有任何关于赚钱、预算、存钱、信用或大学费用的问题，随时问我。'
    : es
      ? 'Pregúntame lo que quieras sobre ganar dinero, presupuestos, ahorros, crédito o cómo pagar la universidad.'
      : 'Ask me anything about earning, budgeting, saving, credit, or paying for college.'
  const logLabel = zh
    ? '与理财教练的对话'
    : es
      ? 'Conversación con el asesor de dinero'
      : 'Conversation with the Money Coach'
  const greeting = zh
    ? '你好！我是你的 BFF 理财教练。想聊聊钱的哪个话题呢？'
    : es
      ? '¡Hola! Soy tu asesor de dinero de BFF. ¿Sobre qué tema del dinero quieres hablar?'
      : "Hi! I'm your BFF Money Coach. What money topic can I help you with?"
  const startersLabel = zh ? '试试这样问：' : es ? 'Prueba a preguntar:' : 'Try asking:'
  const inputLabel = zh
    ? '向理财教练提问'
    : es
      ? 'Haz una pregunta al asesor de dinero'
      : 'Ask the Money Coach a question'
  const placeholder = zh
    ? '关于预算、存钱、信用……'
    : es
      ? 'Sobre presupuestos, ahorros, crédito…'
      : 'Ask about budgeting, saving, credit…'
  const sendLabel = zh ? '发送' : es ? 'Enviar' : 'Send'
  const typingLabel = zh
    ? '教练正在输入……'
    : es
      ? 'El asesor está escribiendo…'
      : 'Coach is typing…'
  const errorText = zh
    ? '出了点问题，请再试一次。'
    : es
      ? 'Algo salió mal. Inténtalo de nuevo.'
      : 'Something went wrong. Please try again.'
  const retryLabel = zh ? '重试' : es ? 'Reintentar' : 'Retry'
  const disclaimer = zh
    ? '这里提供的是通用理财知识，不是个人理财建议。遇到重大决定，请和信任的大人聊聊。'
    : es
      ? 'Esto es educación financiera general, no asesoramiento personal. Para decisiones importantes, habla con un adulto de confianza.'
      : 'General money education, not personal financial advice. For big decisions, talk with a trusted adult.'
  const notConnectedText = zh
    ? '理财教练尚未连接。请稍后再来，或询问你的 BFF 导师。'
    : es
      ? 'El asesor de dinero aún no está conectado. Vuelve más tarde o pregunta a tu mentor de BFF.'
      : "The Money Coach isn't connected yet. Check back later, or ask your BFF mentor."
  const notSetUpText = zh
    ? 'AI 理财教练尚未设置，请询问你的 BFF 导师。'
    : es
      ? 'El asesor de dinero con IA aún no está configurado: pregunta a tu mentor de BFF.'
      : "The AI coach isn't set up yet, ask your BFF mentor."

  const header = (
    <header className="ed-hero chamfer px-6 py-9 sm:px-10 sm:py-11">
      <span
        className="ed-hero-orbit"
        style={{ width: 320, height: 320, top: -150, right: -110 }}
        aria-hidden="true"
      />
      <span
        className="ed-hero-orbit gold"
        style={{ width: 200, height: 200, bottom: -120, left: -70 }}
        aria-hidden="true"
      />
      <div className="relative z-[1]">
        <p className="eyebrow text-bff-300">
          <span className="eyebrow-line" aria-hidden="true" />
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {kicker}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
          {titleNode}
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-white/70">{blurb}</p>
      </div>
    </header>
  )

  // Backend not connected at all — no chat, just a calm notice.
  if (!AI_ENABLED) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        {header}
        <div role="status" className="panel mt-8 p-5 pt-6 text-ink/80 shadow-card">
          {notConnectedText}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col px-4 py-12">
      {header}

      <div className="card mt-8 flex flex-col gap-4 p-4 sm:p-6">
        {/* Message log: announces new messages to assistive tech. */}
        <div
          role="log"
          aria-live="polite"
          aria-label={logLabel}
          aria-busy={busy}
          className="flex max-h-[60vh] min-h-[16rem] flex-col gap-3 overflow-y-auto"
        >
          {/* Coach greeting is shown, not part of the sent history. */}
          <Bubble role="assistant">{greeting}</Bubble>

          {messages.map((m, i) => (
            <Bubble key={i} role={m.role}>
              {m.content}
            </Bubble>
          ))}

          {busy && (
            <div className="flex items-center gap-2 self-start rounded-[12px] rounded-tl-sm border border-ink/15 bg-white px-4 py-3">
              <span className="sr-only">{typingLabel}</span>
              <span aria-hidden="true" className="flex gap-1">
                <Dot delay="0ms" />
                <Dot delay="150ms" />
                <Dot delay="300ms" />
              </span>
            </div>
          )}

          {failed && (
            <div
              role="alert"
              className="flex flex-wrap items-center gap-3 self-start rounded-[10px] border border-gold-400 bg-gold-400/10 px-4 py-3 text-sm text-ink"
            >
              <span className="min-w-0">
                {errorText}
                {failReason && (
                  <span className="mt-1 block break-words font-mono text-xs text-ink/60">
                    {failReason}
                  </span>
                )}
              </span>
              <button
                type="button"
                className="btn-secondary px-3 py-1.5 text-sm"
                onClick={() => void runCoach(messages)}
                disabled={busy}
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {retryLabel}
              </button>
            </div>
          )}

          {offline && (
            <div
              role="status"
              className="flex flex-wrap items-center gap-3 self-start rounded-[10px] border border-ink/20 bg-paper-deep px-4 py-3 text-sm text-ink"
            >
              <span className="min-w-0">
                <span className="block font-display font-bold">
                  {offlineAICopy(lang).title}
                </span>
                <span className="mt-0.5 block text-ink/70">{offlineAICopy(lang).body}</span>
              </span>
              <button
                type="button"
                className="btn-secondary px-3 py-1.5 text-sm"
                onClick={() => void runCoach(messages)}
                disabled={busy}
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {retryLabel}
              </button>
            </div>
          )}

          {notConfigured && (
            <div
              role="status"
              className="self-start rounded-[10px] border border-ink/15 bg-paper px-4 py-3 text-sm text-ink/80"
            >
              {notSetUpText}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Starter prompts — only before the student has asked anything. */}
        {messages.length === 0 && (
          <div>
            <p className="eyebrow mb-2 text-bff-600">
              <span className="eyebrow-line" aria-hidden="true" />
              {startersLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="chip border border-ink/15 bg-white text-ink/80 transition hover:border-bff-400 hover:bg-bff-50 hover:text-bff-700"
                  onClick={() => send(s)}
                  disabled={busy}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* One composer, not a field with a button parked beside it. The border
            and focus ring belong to the container, so the whole thing lights up
            as a single control and the send action can never drift out of
            alignment with the box it belongs to. */}
        <form
          onSubmit={onSubmit}
          aria-busy={busy}
          className="rounded-[10px] border border-ink/15 bg-white transition focus-within:border-bff-500 focus-within:ring-2 focus-within:ring-bff-200"
        >
          <label htmlFor="coach-input" className="sr-only">
            {inputLabel}
          </label>
          {/* A textarea, not a single-line input: a real question runs past one
              line, and on a phone that meant the start of your own sentence
              scrolled out of sight while you were still typing it. It starts one
              line tall and grows to five, then scrolls.

              `block` matters here too: a textarea is inline by default and would
              leave a strip of descender space inside the container. */}
          <textarea
            id="coach-input"
            ref={inputRef}
            rows={1}
            // The global a11y rule puts a focus ring on every textarea, which
            // here drew a second ring *inside* the container's own. Suppressed
            // on the field and carried by the container instead: focus is still
            // plainly visible, it just outlines the whole composer, which is the
            // control the student is actually in.
            className="block max-h-[11rem] w-full resize-none overflow-y-auto bg-transparent px-4 pt-3 leading-relaxed text-ink placeholder-ink/40 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={busy}
            autoComplete="off"
          />
          <div className="flex items-center justify-end px-2 pb-2 pt-1">
            <button
              type="submit"
              // A round icon button inside the composer. The label is carried by
              // aria-label rather than on screen: at this size the word would
              // crowd the box, and every chat on a student's phone already uses
              // exactly this affordance.
              aria-label={sendLabel}
              disabled={busy || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-bff-600 text-white transition hover:bg-bff-700 disabled:bg-ink/15 disabled:text-ink/40"
            >
              <ArrowUp className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>

      <p className="mt-4 px-1 text-center text-xs leading-relaxed text-ink/50">
        {disclaimer}
      </p>
    </div>
  )
}

// ---- Presentational helpers ----

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: ReactNode }) {
  const isUser = role === 'user'
  if (isUser) {
    return (
      <div className="max-w-[85%] self-end whitespace-pre-wrap rounded-[12px] rounded-br-sm bg-bff-600 px-4 py-2.5 text-white">
        {children}
      </div>
    )
  }
  return (
    <div className="flex max-w-[88%] items-start gap-2.5 self-start">
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white"
      >
        <Bot className="h-4 w-4" />
      </span>
      <div className="whitespace-pre-wrap rounded-[12px] rounded-tl-sm border border-ink/15 bg-white px-4 py-2.5 text-ink">
        {children}
      </div>
    </div>
  )
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-ink/40 motion-reduce:animate-none"
      style={{ animationDelay: delay }}
    />
  )
}

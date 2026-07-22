// AI Money Coach — a chat tutor students ask personal-finance questions.
// The coach replies in the student's language and stays scoped to the BFF
// money curriculum (the guardrails live server-side in the edge function).
// This page is the chat UI: message log, input, starter prompts, and calm
// handling for the "not set up yet" and transient-error cases.

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { invokeAI, AI_ENABLED, AINotConfiguredError } from '../lib/ai'
import { useLang } from '../lib/i18n'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
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

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Keep the newest message in view as the conversation grows and while the
  // coach is "typing". Global CSS neutralizes smooth-scroll under reduced motion.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, busy])

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
    try {
      const { reply } = await invokeAI<{ reply: string }>('money-coach', {
        messages: convo,
        lang,
      })
      setMessages([...convo, { role: 'assistant', content: reply }])
    } catch (err) {
      if (err instanceof AINotConfiguredError) {
        setNotConfigured(true)
      } else {
        // Leave the user's message in place so Retry can resend it.
        setFailed(true)
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
  const title = zh ? 'AI 理财教练' : es ? 'Asesor de dinero con IA' : 'AI Money Coach'
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
    ? 'AI 理财教练尚未设置——请询问你的 BFF 导师。'
    : es
      ? 'El asesor de dinero con IA aún no está configurado: pregunta a tu mentor de BFF.'
      : "The AI coach isn't set up yet — ask your BFF mentor."

  const header = (
    <div className="text-center">
      <p className="chip mx-auto bg-bff-50 text-bff-700">
        <ChatIcon />
        {kicker}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-slate-900">{title}</h1>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">{blurb}</p>
    </div>
  )

  // Backend not connected at all — no chat, just a calm notice.
  if (!AI_ENABLED) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        {header}
        <div
          role="status"
          className="card mt-8 border-bff-100 bg-bff-50/60 text-center text-slate-700"
        >
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
            <div className="flex items-center gap-2 self-start rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3">
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
              className="flex flex-wrap items-center gap-3 self-start rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              <span>{errorText}</span>
              <button
                type="button"
                className="btn-secondary px-3 py-1.5 text-sm"
                onClick={() => void runCoach(messages)}
                disabled={busy}
              >
                {retryLabel}
              </button>
            </div>
          )}

          {notConfigured && (
            <div
              role="status"
              className="self-start rounded-2xl border border-bff-100 bg-bff-50 px-4 py-3 text-sm text-slate-700"
            >
              {notSetUpText}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Starter prompts — only before the student has asked anything. */}
        {messages.length === 0 && (
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-500">{startersLabel}</p>
            <div className="flex flex-wrap gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="chip border border-slate-200 bg-white text-slate-700 transition hover:border-bff-300 hover:bg-bff-50 hover:text-bff-700"
                  onClick={() => send(s)}
                  disabled={busy}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} aria-busy={busy} className="flex items-end gap-2">
          <div className="flex-1">
            <label htmlFor="coach-input" className="sr-only">
              {inputLabel}
            </label>
            <input
              id="coach-input"
              ref={inputRef}
              type="text"
              className="input"
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={busy || !input.trim()}
          >
            {sendLabel}
          </button>
        </form>
      </div>

      <p className="mt-4 px-1 text-center text-xs leading-relaxed text-slate-500">
        {disclaimer}
      </p>
    </div>
  )
}

// ---- Presentational helpers ----

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: ReactNode }) {
  const isUser = role === 'user'
  return (
    <div
      className={
        isUser
          ? 'max-w-[85%] self-end whitespace-pre-wrap rounded-2xl rounded-br-md bg-bff-600 px-4 py-2.5 text-white'
          : 'max-w-[85%] self-start whitespace-pre-wrap rounded-2xl rounded-bl-md bg-slate-100 px-4 py-2.5 text-slate-800'
      }
    >
      {children}
    </div>
  )
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-slate-400 motion-reduce:animate-none"
      style={{ animationDelay: delay }}
    />
  )
}

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

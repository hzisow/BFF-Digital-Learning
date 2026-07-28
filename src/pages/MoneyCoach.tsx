// AI Money Coach — a chat tutor students ask personal-finance questions.
// The coach replies in the student's language and stays scoped to the BFF
// money curriculum (the guardrails live server-side in the edge function).
// This page is the chat UI: message log, input, starter prompts, and calm
// handling for the "not set up yet" and transient-error cases.

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { MessageCircle, Send, RefreshCw, Bot } from 'lucide-react'
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
    ? 'AI 理财教练尚未设置——请询问你的 BFF 导师。'
    : es
      ? 'El asesor de dinero con IA aún no está configurado: pregunta a tu mentor de BFF.'
      : "The AI coach isn't set up yet — ask your BFF mentor."

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
              <span>{errorText}</span>
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
            <Send className="h-4 w-4" aria-hidden="true" />
            {sendLabel}
          </button>
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

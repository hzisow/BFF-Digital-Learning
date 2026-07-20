import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import type { LiveGameProps } from '../live/types'

const SLUG = 'scam-spotter'

// ---------- Inbox data ----------
//
// Message bodies are stored as segments so cue phrases can be highlighted in
// the reveal without fragile string matching. A `cue` segment is a red flag on
// scam messages and a trust signal on legit ones.

type Segment = string | { cue: string; why: string }

interface InboxMessage {
  id: string
  kind: 'email' | 'text'
  sender: string
  address: string
  subject: string
  body: Segment[][] // paragraphs of segments
  isScam: boolean
  verdictNote: string
}

const MESSAGES: InboxMessage[] = [
  {
    id: 'amazon',
    kind: 'email',
    sender: 'Amazon Support',
    address: 'security@amaz0n-support.help',
    subject: 'URGENT: Your account will be locked',
    body: [
      [
        'Dear Valued Customer, we detected unusual activity on your account. ',
        {
          cue: 'You must act in the next 10 minutes',
          why: 'Manufactured urgency — real companies never give you a 10-minute countdown.',
        },
        ' or your account will be permanently locked.',
      ],
      [
        'Click below to ',
        {
          cue: 'verify your password',
          why: 'No real company asks you to confirm your password through an email link.',
        },
        ' and restore full access: http://amaz0n-support.help/verify',
      ],
    ],
    isScam: true,
    verdictNote:
      'Classic phishing. Also check the sender: "amaz0n" with a zero, on a weird ".help" domain — not amazon.com.',
  },
  {
    id: 'newsletter',
    kind: 'email',
    sender: 'Jefferson High School',
    address: 'newsletter@jeffersonhigh.edu',
    subject: 'Eagle Weekly — Spirit Week schedule',
    body: [
      [
        'Hi Eagles! Spirit Week starts Monday: Pajama Day, Decades Day, and Friday pep rally in the gym at 2:00.',
      ],
      [
        'Yearbook photo retakes are Wednesday during lunch. ',
        {
          cue: 'Questions? Stop by the front office or call 555-0148.',
          why: 'Trust signal: it points you to a place and phone number you already know — no links, no rush.',
        },
      ],
    ],
    isScam: false,
    verdictNote:
      'Legit. Calm tone, a school domain you recognize, and it asks for nothing — no links, no money, no personal info.',
  },
  {
    id: 'giftcard-prize',
    kind: 'text',
    sender: '+1 (830) 555-0142',
    address: 'Unknown number',
    subject: 'You WON a $1,000 gift card!',
    body: [
      [
        'CONGRATS! ',
        {
          cue: "You've been selected as the WINNER of a $1,000 Visa gift card",
          why: 'You cannot win a raffle you never entered. Surprise prizes are bait.',
        },
        ' from the National Student Raffle!',
      ],
      [
        {
          cue: 'Claim expires TODAY',
          why: 'Urgency again — scammers rush you so you do not stop and think.',
        },
        ' — tap to collect: http://claim-prize.win/8842',
      ],
    ],
    isScam: true,
    verdictNote:
      'Prize scam. You never entered any raffle, the link is a sketchy ".win" domain, and the "prize" evaporates today. Delete.',
  },
  {
    id: 'bank-statement',
    kind: 'email',
    sender: 'First National Bank',
    address: 'no-reply@firstnational.com',
    subject: 'Your June statement is ready',
    body: [
      [
        'Hello, your monthly account statement is now available. ',
        {
          cue: 'To view it, log in to online banking the way you normally do, or use our mobile app.',
          why: 'Trust signal: it tells you to use your normal login — it does not hand you a link or ask for anything.',
        },
      ],
      [
        {
          cue: 'We will never ask for your password or PIN by email.',
          why: 'Trust signal: real banks say this because scammers do the opposite.',
        },
      ],
    ],
    isScam: false,
    verdictNote:
      'Legit. No link to click, no urgency, nothing requested. It even reminds you it will never ask for your password.',
  },
  {
    id: 'principal-giftcards',
    kind: 'email',
    sender: "Principal's Office",
    address: 'principal.desk@school-payments-portal.com',
    subject: 'Overdue lunch balance — final notice',
    body: [
      [
        'Our records show an overdue cafeteria balance of $85. ',
        {
          cue: 'To avoid suspension of lunch privileges, pay TODAY',
          why: 'Threats plus a same-day deadline are pressure tactics, not how schools operate.',
        },
        '.',
      ],
      [
        {
          cue: 'Purchase two $50 Apple gift cards and reply with the codes',
          why: 'Gift cards are untraceable cash. NO real school, company, or government agency takes payment in gift cards. Ever.',
        },
        ' on the back to settle your account.',
      ],
    ],
    isScam: true,
    verdictNote:
      'Gift-card scam. The sender domain is not your school, and gift-card codes = instant, untraceable money for a scammer.',
  },
  {
    id: 'shipping',
    kind: 'text',
    sender: '28777',
    address: 'Delivery notifications',
    subject: 'Your order has shipped',
    body: [
      [
        {
          cue: 'Your order #83921 (blue phone case) has shipped',
          why: 'Trust signal: it names the exact item and order number from a purchase you actually made.',
        },
        ' and will arrive Thursday.',
      ],
      ['No action needed. Track anytime from your account order page.'],
    ],
    isScam: false,
    verdictNote:
      'Legit. You did order that phone case. It matches a real order, asks for nothing, and says "no action needed."',
  },
  {
    id: 'crypto',
    kind: 'text',
    sender: '+44 7700 900123',
    address: 'Unknown international number',
    subject: 'Double your crypto — giveaway!',
    body: [
      [
        'OFFICIAL GIVEAWAY: ',
        {
          cue: 'send 0.1 Bitcoin and receive 0.2 Bitcoin back instantly',
          why: '"Send money, get double back" is 100% a scam, 100% of the time. Money sent is money gone.',
        },
        ' — guaranteed!',
      ],
      [
        {
          cue: 'Only the first 100 people qualify',
          why: 'Fake scarcity — another pressure tactic to make you rush.',
        },
        '. Wallet: bc1q-giveaway-now',
      ],
    ],
    isScam: true,
    verdictNote:
      'Too good to be true = not true. Nobody doubles strangers’ money. Crypto payments cannot be reversed, so it’s gone forever.',
  },
  {
    id: 'netflix',
    kind: 'email',
    sender: 'Netflix Billing',
    address: 'billing@netfIix-accounts.com',
    subject: 'Payment declined — update card within 24 hours',
    body: [
      [
        'We could not process your payment. ',
        {
          cue: 'Your account will be suspended in 24 hours',
          why: 'A countdown to disaster is a pressure tactic. Real billing issues wait for you.',
        },
        ' unless you act now.',
      ],
      [
        'Please ',
        {
          cue: 'confirm your card number and security code',
          why: 'Real companies never ask you to type card details from an email link — that’s how cards get stolen.',
        },
        ' here: http://netfIix-accounts.com/billing',
      ],
    ],
    isScam: true,
    verdictNote:
      'Look closely at the sender: "netfIix" uses a capital I disguised as an L, on a fake domain. Spoofed sender + card-detail request = phishing.',
  },
]

// ---------- Scoring ----------

type Verdict = 'legit' | 'scam'

function tierFor(score: number): { title: string; emoji: string } {
  if (score >= 100) return { title: 'Scam-Proof Shield', emoji: '🛡️' }
  if (score >= 75) return { title: 'Sharp-Eyed Skeptic', emoji: '🔍' }
  if (score >= 50) return { title: 'Getting Suspicious', emoji: '🤨' }
  return { title: 'Phish Food', emoji: '🎣' }
}

function cuesOf(m: InboxMessage): { cue: string; why: string }[] {
  return m.body.flat().filter((s): s is { cue: string; why: string } => typeof s !== 'string')
}

// ---------- Body rendering ----------

function Body({ message, revealed }: { message: InboxMessage; revealed: boolean }) {
  return (
    <div className="space-y-2 text-sm text-slate-700">
      {message.body.map((para, i) => (
        <p key={i}>
          {para.map((seg, j) =>
            typeof seg === 'string' ? (
              <span key={j}>{seg}</span>
            ) : revealed ? (
              <mark
                key={j}
                className={`rounded px-1 font-semibold ${
                  message.isScam ? 'bg-amber-200 text-slate-900' : 'bg-green-100 text-green-900'
                }`}
              >
                {seg.cue}
              </mark>
            ) : (
              <span key={j}>{seg.cue}</span>
            ),
          )}
        </p>
      ))}
    </div>
  )
}

// ---------- Component ----------

export default function ScamSpotter({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const [verdicts, setVerdicts] = useState<Partial<Record<string, Verdict>>>({})
  const [openId, setOpenId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const studentRef = useRef(student)
  studentRef.current = student
  useEffect(() => {
    void saveProgress(studentRef.current, SLUG, { status: 'started' })
  }, [])

  const classifiedCount = MESSAGES.filter((m) => verdicts[m.id]).length
  const allClassified = classifiedCount === MESSAGES.length
  const open = MESSAGES.find((m) => m.id === openId) ?? null

  const correctCount = MESSAGES.filter(
    (m) => verdicts[m.id] === (m.isScam ? 'scam' : 'legit'),
  ).length
  const score = Math.round((correctCount / MESSAGES.length) * 100)
  const tier = tierFor(score)

  function mark(id: string, v: Verdict) {
    setVerdicts((prev) => ({ ...prev, [id]: v }))
  }

  function submit() {
    if (!allClassified) return
    setSubmitted(true)
    setOpenId(null)
    window.scrollTo({ top: 0 })
    const finalCorrect = MESSAGES.filter(
      (m) => verdicts[m.id] === (m.isScam ? 'scam' : 'legit'),
    ).length
    void saveProgress(studentRef.current, SLUG, {
      status: 'completed',
      score: Math.round((finalCorrect / MESSAGES.length) * 100),
      data: { verdicts, correct: finalCorrect, total: MESSAGES.length },
    })
    onComplete?.(Math.round((finalCorrect / MESSAGES.length) * 100))
  }

  function reset() {
    setVerdicts({})
    setOpenId(null)
    setSubmitted(false)
    window.scrollTo({ top: 0 })
  }

  // ---------- Results view ----------
  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          <span aria-hidden="true">🕵️</span> Scam Spotter{' '}
          <span aria-hidden="true">📱</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Case closed. Here's what the messages were hiding.</p>

        <div className="card animate-pop-in mt-4 space-y-2 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{tier.emoji}</p>
          <h2 className="font-display text-3xl font-bold text-slate-900">{tier.title}</h2>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="text-sm text-slate-600">
            You called {correctCount} of {MESSAGES.length} messages correctly.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {MESSAGES.map((m, i) => {
            const yourCall = verdicts[m.id]
            const correct = yourCall === (m.isScam ? 'scam' : 'legit')
            return (
              <div
                key={m.id}
                className="card animate-slide-up p-4"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800">
                    <span className="mr-1" aria-hidden="true">{m.kind === 'email' ? '📧' : '💬'}</span>
                    {m.sender} — {m.subject}
                  </p>
                  <span
                    className={`chip ${correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}
                  >
                    {correct ? (
                      <>
                        <span aria-hidden="true">✓</span> You got it
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">✗</span> You missed this one
                      </>
                    )}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  From: {m.address} · Actually{' '}
                  <span className={`font-bold ${m.isScam ? 'text-red-600' : 'text-green-700'}`}>
                    {m.isScam ? 'a SCAM' : 'legit'}
                  </span>{' '}
                  · You said: {yourCall === 'scam' ? 'Scam' : 'Legit'}
                </p>
                <div className="mt-3">
                  <Body message={m} revealed />
                </div>
                <div
                  className={`mt-3 rounded-xl p-3 text-xs ${
                    m.isScam ? 'bg-amber-50 text-slate-700' : 'bg-green-50 text-slate-700'
                  }`}
                >
                  <p className="font-display font-bold text-slate-900">
                    {m.isScam ? (
                      <>
                        <span aria-hidden="true">🚩</span> Red flags
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">🤝</span> Trust signals
                      </>
                    )}
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">
                    {cuesOf(m).map((c) => (
                      <li key={c.cue}>
                        <span className="font-semibold">“{c.cue}”</span> — {c.why}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2">{m.verdictNote}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="card animate-slide-up mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700"
          style={{ animationDelay: `${MESSAGES.length * 0.12}s` }}
        >
          <p className="font-display font-bold text-slate-900">
            <span aria-hidden="true">🛡️</span> Keep your S.H.I.E.L.D. up
          </p>
          <p className="mt-1">
            <strong>S</strong>ecure your passwords · <strong>H</strong>ide your personal info ·{' '}
            <strong>I</strong>gnore suspicious messages · <strong>E</strong>nable 2FA ·{' '}
            <strong>L</strong>ock your devices · <strong>D</strong>on't shop on public Wi-Fi. When a
            message pushes urgency, prizes, gift cards, or password links — slow down. Scammers need
            you rushing.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            Investigate again
          </button>
          <Link to="/activities" className="btn-primary">
            More activities
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Message detail view ----------
  if (open) {
    const v = verdicts[open.id]
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          <span aria-hidden="true">🕵️</span> Scam Spotter{' '}
          <span aria-hidden="true">📱</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Read closely. Is this message legit, or a scam?</p>

        <div className="card animate-pop-in mt-4">
          <button className="btn-ghost -ml-2 text-sm" onClick={() => setOpenId(null)}>
            <span aria-hidden="true">←</span> Back to inbox
          </button>
          <div className="mt-3 border-b border-slate-200 pb-3">
            <p className="text-sm font-semibold text-slate-800">
              <span className="mr-1" aria-hidden="true">{open.kind === 'email' ? '📧' : '💬'}</span>
              {open.sender}
            </p>
            <p className="text-xs text-slate-500">{open.address}</p>
            <p className="mt-1 font-display font-bold text-slate-900">{open.subject}</p>
          </div>
          <div className="mt-3">
            <Body message={open} revealed={false} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              aria-pressed={v === 'legit'}
              onClick={() => mark(open.id, 'legit')}
              className={`flex-1 rounded-xl border-2 px-4 py-2.5 font-display font-semibold transition ${
                v === 'legit'
                  ? 'border-green-600 bg-green-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-green-400'
              }`}
            >
              Legit <span aria-hidden="true">✅</span>
            </button>
            <button
              type="button"
              aria-pressed={v === 'scam'}
              onClick={() => mark(open.id, 'scam')}
              className={`flex-1 rounded-xl border-2 px-4 py-2.5 font-display font-semibold transition ${
                v === 'scam'
                  ? 'border-red-600 bg-red-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-red-400'
              }`}
            >
              Scam <span aria-hidden="true">🚨</span>
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500" role="status" aria-live="polite">
            {v
              ? `Marked as ${v === 'scam' ? 'scam' : 'legit'} — you can change your mind anytime before submitting.`
              : 'Pick a verdict to file this message.'}
          </p>
        </div>
      </div>
    )
  }

  // ---------- Inbox view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">🕵️</span> Scam Spotter{' '}
        <span aria-hidden="true">📱</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">Your inbox has 8 new messages. Some of them are traps.</p>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        <p>
          Open each message, read it like a detective, and mark it{' '}
          <strong>
            Legit <span aria-hidden="true">✅</span>
          </strong>{' '}
          or{' '}
          <strong>
            Scam <span aria-hidden="true">🚨</span>
          </strong>
          . Watch for urgency, weird sender addresses, surprise prizes, gift-card demands, and
          anyone asking for passwords or card numbers. Classify all 8, then submit.
        </p>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-600" role="status" aria-live="polite">
        {classifiedCount} of {MESSAGES.length} messages classified
      </p>

      <ul className="mt-2 space-y-2">
        {MESSAGES.map((m) => {
          const v = verdicts[m.id]
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setOpenId(m.id)}
                className="flex w-full items-center justify-between gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left transition hover:border-bff-300"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    <span className="mr-1" aria-hidden="true">{m.kind === 'email' ? '📧' : '💬'}</span>
                    {m.sender}
                  </p>
                  <p className="truncate text-xs text-slate-600">{m.subject}</p>
                </div>
                <span
                  className={`chip shrink-0 ${
                    v === 'scam'
                      ? 'bg-red-100 text-red-700'
                      : v === 'legit'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {v === 'scam' ? (
                    <>
                      Scam <span aria-hidden="true">🚨</span>
                    </>
                  ) : v === 'legit' ? (
                    <>
                      Legit <span aria-hidden="true">✅</span>
                    </>
                  ) : (
                    'Unread'
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 text-center">
        <button className="btn-primary w-full sm:w-auto" onClick={submit} disabled={!allClassified}>
          Submit verdicts
        </button>
        {!allClassified && (
          <p className="mt-2 text-sm text-slate-500">
            Classify every message before submitting — {MESSAGES.length - classifiedCount} to go.
          </p>
        )}
      </div>
    </div>
  )
}

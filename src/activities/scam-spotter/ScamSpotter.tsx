import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
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
  senderEs: string
  address: string
  addressEs: string
  subject: string
  subjectEs: string
  body: Segment[][] // paragraphs of segments
  bodyEs: Segment[][]
  isScam: boolean
  verdictNote: string
  verdictNoteEs: string
}

const MESSAGES: InboxMessage[] = [
  {
    id: 'amazon',
    kind: 'email',
    sender: 'Amazon Support',
    senderEs: 'Soporte de Amazon',
    address: 'security@amaz0n-support.help',
    addressEs: 'security@amaz0n-support.help',
    subject: 'URGENT: Your account will be locked',
    subjectEs: 'URGENTE: Tu cuenta será bloqueada',
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
    bodyEs: [
      [
        'Estimado cliente, detectamos actividad inusual en tu cuenta. ',
        {
          cue: 'Debes actuar en los próximos 10 minutos',
          why: 'Urgencia inventada: las empresas reales nunca te dan una cuenta regresiva de 10 minutos.',
        },
        ' o tu cuenta será bloqueada permanentemente.',
      ],
      [
        'Haz clic abajo para ',
        {
          cue: 'verificar tu contraseña',
          why: 'Ninguna empresa real te pide confirmar tu contraseña a través de un enlace en un correo.',
        },
        ' y restaurar el acceso completo: http://amaz0n-support.help/verify',
      ],
    ],
    isScam: true,
    verdictNote:
      'Classic phishing. Also check the sender: "amaz0n" with a zero, on a weird ".help" domain — not amazon.com.',
    verdictNoteEs:
      'Phishing clásico. Fíjate también en el remitente: "amaz0n" con un cero, en un dominio raro ".help", no amazon.com.',
  },
  {
    id: 'newsletter',
    kind: 'email',
    sender: 'Jefferson High School',
    senderEs: 'Jefferson High School',
    address: 'newsletter@jeffersonhigh.edu',
    addressEs: 'newsletter@jeffersonhigh.edu',
    subject: 'Eagle Weekly — Spirit Week schedule',
    subjectEs: 'Eagle Weekly — Horario de la Semana Escolar',
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
    bodyEs: [
      [
        '¡Hola, Eagles! La Semana Escolar empieza el lunes: Día de Pijamas, Día de las Décadas y el viernes la porra en el gimnasio a las 2:00.',
      ],
      [
        'Las fotos de repetición para el anuario son el miércoles durante el almuerzo. ',
        {
          cue: '¿Preguntas? Pasa por la oficina principal o llama al 555-0148.',
          why: 'Señal de confianza: te dirige a un lugar y un número de teléfono que ya conoces, sin enlaces ni prisas.',
        },
      ],
    ],
    isScam: false,
    verdictNote:
      'Legit. Calm tone, a school domain you recognize, and it asks for nothing — no links, no money, no personal info.',
    verdictNoteEs:
      'Legítimo. Tono tranquilo, un dominio escolar que reconoces y no pide nada: sin enlaces, sin dinero, sin información personal.',
  },
  {
    id: 'giftcard-prize',
    kind: 'text',
    sender: '+1 (830) 555-0142',
    senderEs: '+1 (830) 555-0142',
    address: 'Unknown number',
    addressEs: 'Número desconocido',
    subject: 'You WON a $1,000 gift card!',
    subjectEs: '¡GANASTE una tarjeta de regalo de $1,000!',
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
    bodyEs: [
      [
        '¡FELICIDADES! ',
        {
          cue: 'Has sido seleccionado como GANADOR de una tarjeta de regalo Visa de $1,000',
          why: 'No puedes ganar un sorteo en el que nunca participaste. Los premios sorpresa son un anzuelo.',
        },
        ' de la Rifa Nacional de Estudiantes!',
      ],
      [
        {
          cue: 'El reclamo vence HOY',
          why: 'Urgencia otra vez: los estafadores te apuran para que no te detengas a pensar.',
        },
        ' — toca para cobrar: http://claim-prize.win/8842',
      ],
    ],
    isScam: true,
    verdictNote:
      'Prize scam. You never entered any raffle, the link is a sketchy ".win" domain, and the "prize" evaporates today. Delete.',
    verdictNoteEs:
      'Estafa de premio. Nunca participaste en ninguna rifa, el enlace es un dominio sospechoso ".win" y el "premio" se esfuma hoy. Bórralo.',
  },
  {
    id: 'bank-statement',
    kind: 'email',
    sender: 'First National Bank',
    senderEs: 'First National Bank',
    address: 'no-reply@firstnational.com',
    addressEs: 'no-reply@firstnational.com',
    subject: 'Your June statement is ready',
    subjectEs: 'Tu estado de cuenta de junio está listo',
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
    bodyEs: [
      [
        'Hola, tu estado de cuenta mensual ya está disponible. ',
        {
          cue: 'Para verlo, entra a la banca en línea como lo haces normalmente, o usa nuestra app móvil.',
          why: 'Señal de confianza: te dice que uses tu inicio de sesión de siempre; no te da un enlace ni te pide nada.',
        },
      ],
      [
        {
          cue: 'Nunca te pediremos tu contraseña ni tu PIN por correo.',
          why: 'Señal de confianza: los bancos reales dicen esto porque los estafadores hacen lo contrario.',
        },
      ],
    ],
    isScam: false,
    verdictNote:
      'Legit. No link to click, no urgency, nothing requested. It even reminds you it will never ask for your password.',
    verdictNoteEs:
      'Legítimo. Sin enlaces para hacer clic, sin urgencia, sin pedir nada. Incluso te recuerda que nunca te pedirá tu contraseña.',
  },
  {
    id: 'principal-giftcards',
    kind: 'email',
    sender: "Principal's Office",
    senderEs: 'Oficina del Director',
    address: 'principal.desk@school-payments-portal.com',
    addressEs: 'principal.desk@school-payments-portal.com',
    subject: 'Overdue lunch balance — final notice',
    subjectEs: 'Saldo de almuerzo vencido — aviso final',
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
    bodyEs: [
      [
        'Nuestros registros muestran un saldo vencido de la cafetería de $85. ',
        {
          cue: 'Para evitar la suspensión de tus privilegios de almuerzo, paga HOY',
          why: 'Las amenazas más un plazo para el mismo día son tácticas de presión, no la forma en que funcionan las escuelas.',
        },
        '.',
      ],
      [
        {
          cue: 'Compra dos tarjetas de regalo Apple de $50 y responde con los códigos',
          why: 'Las tarjetas de regalo son dinero imposible de rastrear. NINGUNA escuela, empresa o agencia de gobierno real acepta pagos en tarjetas de regalo. Jamás.',
        },
        ' del reverso para saldar tu cuenta.',
      ],
    ],
    isScam: true,
    verdictNote:
      'Gift-card scam. The sender domain is not your school, and gift-card codes = instant, untraceable money for a scammer.',
    verdictNoteEs:
      'Estafa de tarjetas de regalo. El dominio del remitente no es tu escuela, y los códigos de tarjetas de regalo son dinero instantáneo e imposible de rastrear para un estafador.',
  },
  {
    id: 'shipping',
    kind: 'text',
    sender: '28777',
    senderEs: '28777',
    address: 'Delivery notifications',
    addressEs: 'Notificaciones de entrega',
    subject: 'Your order has shipped',
    subjectEs: 'Tu pedido ha sido enviado',
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
    bodyEs: [
      [
        {
          cue: 'Tu pedido #83921 (funda azul para teléfono) ha sido enviado',
          why: 'Señal de confianza: nombra el artículo exacto y el número de pedido de una compra que sí hiciste.',
        },
        ' y llegará el jueves.',
      ],
      ['No se requiere ninguna acción. Rastréalo cuando quieras desde la página de pedidos de tu cuenta.'],
    ],
    isScam: false,
    verdictNote:
      'Legit. You did order that phone case. It matches a real order, asks for nothing, and says "no action needed."',
    verdictNoteEs:
      'Legítimo. Sí pediste esa funda para teléfono. Coincide con un pedido real, no pide nada y dice "no se requiere ninguna acción".',
  },
  {
    id: 'crypto',
    kind: 'text',
    sender: '+44 7700 900123',
    senderEs: '+44 7700 900123',
    address: 'Unknown international number',
    addressEs: 'Número internacional desconocido',
    subject: 'Double your crypto — giveaway!',
    subjectEs: '¡Duplica tu cripto — sorteo!',
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
    bodyEs: [
      [
        'SORTEO OFICIAL: ',
        {
          cue: 'envía 0.1 Bitcoin y recibe 0.2 Bitcoin de vuelta al instante',
          why: '"Envía dinero y recibe el doble" es una estafa el 100% de las veces. El dinero enviado es dinero perdido.',
        },
        ' — ¡garantizado!',
      ],
      [
        {
          cue: 'Solo califican las primeras 100 personas',
          why: 'Escasez falsa: otra táctica de presión para hacerte apurar.',
        },
        '. Billetera: bc1q-giveaway-now',
      ],
    ],
    isScam: true,
    verdictNote:
      'Too good to be true = not true. Nobody doubles strangers’ money. Crypto payments cannot be reversed, so it’s gone forever.',
    verdictNoteEs:
      'Demasiado bueno para ser verdad = no es verdad. Nadie duplica el dinero de desconocidos. Los pagos en cripto no se pueden revertir, así que se pierde para siempre.',
  },
  {
    id: 'netflix',
    kind: 'email',
    sender: 'Netflix Billing',
    senderEs: 'Facturación de Netflix',
    address: 'billing@netfIix-accounts.com',
    addressEs: 'billing@netfIix-accounts.com',
    subject: 'Payment declined — update card within 24 hours',
    subjectEs: 'Pago rechazado — actualiza tu tarjeta en 24 horas',
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
    bodyEs: [
      [
        'No pudimos procesar tu pago. ',
        {
          cue: 'Tu cuenta será suspendida en 24 horas',
          why: 'Una cuenta regresiva hacia el desastre es una táctica de presión. Los problemas de facturación reales pueden esperar.',
        },
        ' a menos que actúes ahora.',
      ],
      [
        'Por favor ',
        {
          cue: 'confirma el número de tu tarjeta y el código de seguridad',
          why: 'Las empresas reales nunca te piden escribir los datos de tu tarjeta desde un enlace en un correo; así es como roban las tarjetas.',
        },
        ' aquí: http://netfIix-accounts.com/billing',
      ],
    ],
    isScam: true,
    verdictNote:
      'Look closely at the sender: "netfIix" uses a capital I disguised as an L, on a fake domain. Spoofed sender + card-detail request = phishing.',
    verdictNoteEs:
      'Mira de cerca el remitente: "netfIix" usa una I mayúscula disfrazada de L, en un dominio falso. Remitente falsificado + petición de datos de tarjeta = phishing.',
  },
]

// ---------- Scoring ----------

type Verdict = 'legit' | 'scam'

function tierFor(score: number, es: boolean): { title: string; emoji: string } {
  if (score >= 100) return { title: es ? 'Escudo Antiestafas' : 'Scam-Proof Shield', emoji: '🛡️' }
  if (score >= 75) return { title: es ? 'Escéptico de Ojo Agudo' : 'Sharp-Eyed Skeptic', emoji: '🔍' }
  if (score >= 50) return { title: es ? 'Empezando a Sospechar' : 'Getting Suspicious', emoji: '🤨' }
  return { title: es ? 'Carnada de Phishing' : 'Phish Food', emoji: '🎣' }
}

function cuesOf(m: InboxMessage, es: boolean): { cue: string; why: string }[] {
  const body = es ? m.bodyEs : m.body
  return body.flat().filter((s): s is { cue: string; why: string } => typeof s !== 'string')
}

// ---------- Body rendering ----------

function Body({ message, revealed, es }: { message: InboxMessage; revealed: boolean; es: boolean }) {
  const body = es ? message.bodyEs : message.body
  return (
    <div className="space-y-2 text-sm text-slate-700">
      {body.map((para, i) => (
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
  const { lang } = useLang()
  const es = lang === 'es'
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
  const tier = tierFor(score, es)

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
          <span aria-hidden="true">🕵️</span> {es ? 'Detector de Estafas' : 'Scam Spotter'}{' '}
          <span aria-hidden="true">📱</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {es
            ? 'Caso cerrado. Esto es lo que escondían los mensajes.'
            : "Case closed. Here's what the messages were hiding."}
        </p>

        <div className="card animate-pop-in mt-4 space-y-2 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{tier.emoji}</p>
          <h2 className="font-display text-3xl font-bold text-slate-900">{tier.title}</h2>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="text-sm text-slate-600">
            {es
              ? `Acertaste ${correctCount} de ${MESSAGES.length} mensajes.`
              : `You called ${correctCount} of ${MESSAGES.length} messages correctly.`}
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
                    {es ? m.senderEs : m.sender} — {es ? m.subjectEs : m.subject}
                  </p>
                  <span
                    className={`chip ${correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}
                  >
                    {correct ? (
                      <>
                        <span aria-hidden="true">✓</span> {es ? 'Acertaste' : 'You got it'}
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">✗</span> {es ? 'Fallaste este' : 'You missed this one'}
                      </>
                    )}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {es ? 'De' : 'From'}: {es ? m.addressEs : m.address} ·{' '}
                  {es ? 'En realidad es' : 'Actually'}{' '}
                  <span className={`font-bold ${m.isScam ? 'text-red-600' : 'text-green-700'}`}>
                    {m.isScam ? (es ? 'una ESTAFA' : 'a SCAM') : es ? 'legítimo' : 'legit'}
                  </span>{' '}
                  · {es ? 'Dijiste' : 'You said'}:{' '}
                  {yourCall === 'scam' ? (es ? 'Estafa' : 'Scam') : es ? 'Legítimo' : 'Legit'}
                </p>
                <div className="mt-3">
                  <Body message={m} revealed es={es} />
                </div>
                <div
                  className={`mt-3 rounded-xl p-3 text-xs ${
                    m.isScam ? 'bg-amber-50 text-slate-700' : 'bg-green-50 text-slate-700'
                  }`}
                >
                  <p className="font-display font-bold text-slate-900">
                    {m.isScam ? (
                      <>
                        <span aria-hidden="true">🚩</span> {es ? 'Señales de alerta' : 'Red flags'}
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">🤝</span> {es ? 'Señales de confianza' : 'Trust signals'}
                      </>
                    )}
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">
                    {cuesOf(m, es).map((c) => (
                      <li key={c.cue}>
                        <span className="font-semibold">“{c.cue}”</span> — {c.why}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2">{es ? m.verdictNoteEs : m.verdictNote}</p>
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
            <span aria-hidden="true">🛡️</span>{' '}
            {es ? 'Mantén tu S.H.I.E.L.D. en alto' : 'Keep your S.H.I.E.L.D. up'}
          </p>
          {es ? (
            <p className="mt-1">
              <strong>S</strong>eguridad en tus contraseñas · <strong>H</strong>az privada tu
              información personal · <strong>I</strong>gnora los mensajes sospechosos ·{' '}
              <strong>E</strong>nciende la verificación en dos pasos (2FA) · <strong>L</strong>imita
              el acceso a tus dispositivos · <strong>D</strong>eja de comprar en Wi-Fi público. Cuando
              un mensaje empuja urgencia, premios, tarjetas de regalo o enlaces para contraseñas, ve
              más despacio. Los estafadores te necesitan apurado.
            </p>
          ) : (
            <p className="mt-1">
              <strong>S</strong>ecure your passwords · <strong>H</strong>ide your personal info ·{' '}
              <strong>I</strong>gnore suspicious messages · <strong>E</strong>nable 2FA ·{' '}
              <strong>L</strong>ock your devices · <strong>D</strong>on't shop on public Wi-Fi. When a
              message pushes urgency, prizes, gift cards, or password links — slow down. Scammers need
              you rushing.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            {es ? 'Investigar de nuevo' : 'Investigate again'}
          </button>
          <Link to="/activities" className="btn-primary">
            {es ? 'Más actividades' : 'More activities'}
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
          <span aria-hidden="true">🕵️</span> {es ? 'Detector de Estafas' : 'Scam Spotter'}{' '}
          <span aria-hidden="true">📱</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {es
            ? 'Lee con atención. ¿Este mensaje es legítimo o una estafa?'
            : 'Read closely. Is this message legit, or a scam?'}
        </p>

        <div className="card animate-pop-in mt-4">
          <button className="btn-ghost -ml-2 text-sm" onClick={() => setOpenId(null)}>
            <span aria-hidden="true">←</span> {es ? 'Volver a la bandeja' : 'Back to inbox'}
          </button>
          <div className="mt-3 border-b border-slate-200 pb-3">
            <p className="text-sm font-semibold text-slate-800">
              <span className="mr-1" aria-hidden="true">{open.kind === 'email' ? '📧' : '💬'}</span>
              {es ? open.senderEs : open.sender}
            </p>
            <p className="text-xs text-slate-500">{es ? open.addressEs : open.address}</p>
            <p className="mt-1 font-display font-bold text-slate-900">
              {es ? open.subjectEs : open.subject}
            </p>
          </div>
          <div className="mt-3">
            <Body message={open} revealed={false} es={es} />
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
              {es ? 'Legítimo' : 'Legit'} <span aria-hidden="true">✅</span>
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
              {es ? 'Estafa' : 'Scam'} <span aria-hidden="true">🚨</span>
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500" role="status" aria-live="polite">
            {v
              ? es
                ? `Marcado como ${v === 'scam' ? 'estafa' : 'legítimo'}: puedes cambiar de opinión en cualquier momento antes de enviar.`
                : `Marked as ${v === 'scam' ? 'scam' : 'legit'} — you can change your mind anytime before submitting.`
              : es
                ? 'Elige un veredicto para archivar este mensaje.'
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
        <span aria-hidden="true">🕵️</span> {es ? 'Detector de Estafas' : 'Scam Spotter'}{' '}
        <span aria-hidden="true">📱</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {es
          ? 'Tu bandeja tiene 8 mensajes nuevos. Algunos son trampas.'
          : 'Your inbox has 8 new messages. Some of them are traps.'}
      </p>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        {es ? (
          <p>
            Abre cada mensaje, léelo como un detective y márcalo{' '}
            <strong>
              Legítimo <span aria-hidden="true">✅</span>
            </strong>{' '}
            o{' '}
            <strong>
              Estafa <span aria-hidden="true">🚨</span>
            </strong>
            . Vigila la urgencia, las direcciones de remitente raras, los premios sorpresa, las
            exigencias de tarjetas de regalo y a cualquiera que pida contraseñas o números de
            tarjeta. Clasifica los 8 y luego envía.
          </p>
        ) : (
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
        )}
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-600" role="status" aria-live="polite">
        {es
          ? `${classifiedCount} de ${MESSAGES.length} mensajes clasificados`
          : `${classifiedCount} of ${MESSAGES.length} messages classified`}
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
                    {es ? m.senderEs : m.sender}
                  </p>
                  <p className="truncate text-xs text-slate-600">{es ? m.subjectEs : m.subject}</p>
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
                      {es ? 'Estafa' : 'Scam'} <span aria-hidden="true">🚨</span>
                    </>
                  ) : v === 'legit' ? (
                    <>
                      {es ? 'Legítimo' : 'Legit'} <span aria-hidden="true">✅</span>
                    </>
                  ) : es ? (
                    'Sin leer'
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
          {es ? 'Enviar veredictos' : 'Submit verdicts'}
        </button>
        {!allClassified && (
          <p className="mt-2 text-sm text-slate-500">
            {es
              ? `Clasifica todos los mensajes antes de enviar — faltan ${MESSAGES.length - classifiedCount}.`
              : `Classify every message before submitting — ${MESSAGES.length - classifiedCount} to go.`}
          </p>
        )}
      </div>
    </div>
  )
}

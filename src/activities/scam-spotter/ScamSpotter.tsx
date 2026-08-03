import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Check, X, AlertTriangle, Mail, MessageSquare, Smartphone,
  UserSearch, ShieldCheck, Siren, Handshake, Search, Eye, Fish,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

const SLUG = 'scam-spotter'

/** Local icon lookup: data below stores a lucide icon NAME, never a glyph. */
const ITEM_ICONS: Record<string, LucideIcon> = {
  Mail, MessageSquare, ShieldCheck, Search, Eye, Fish,
}

/** Message-type marker: envelope for email, speech bubble for a text. */
function KindMark({ kind }: { kind: 'email' | 'text' }) {
  const Icon = kind === 'email' ? ITEM_ICONS.Mail : ITEM_ICONS.MessageSquare
  return <Icon className="mr-1 inline-block h-4 w-4 align-[-0.15em] text-slate-500" aria-hidden="true" />
}

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
  senderZh: string
  address: string
  addressEs: string
  addressZh: string
  subject: string
  subjectEs: string
  subjectZh: string
  body: Segment[][] // paragraphs of segments
  bodyEs: Segment[][]
  bodyZh: Segment[][]
  isScam: boolean
  verdictNote: string
  verdictNoteEs: string
  verdictNoteZh: string
}

const MESSAGES: InboxMessage[] = [
  {
    id: 'amazon',
    kind: 'email',
    sender: 'Amazon Support',
    senderEs: 'Soporte de Amazon',
    senderZh: 'Amazon 客服',
    address: 'security@amaz0n-support.help',
    addressEs: 'security@amaz0n-support.help',
    addressZh: 'security@amaz0n-support.help',
    subject: 'URGENT: Your account will be locked',
    subjectEs: 'URGENTE: Tu cuenta será bloqueada',
    subjectZh: '紧急：你的账户即将被锁定',
    body: [
      [
        'Dear Valued Customer, we detected unusual activity on your account. ',
        {
          cue: 'You must act in the next 10 minutes',
          why: 'Manufactured urgency, real companies never give you a 10-minute countdown.',
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
    bodyZh: [
      [
        '尊敬的贵宾客户，我们检测到你的账户有异常活动。',
        {
          cue: '你必须在接下来的 10 分钟内采取行动',
          why: '人为制造的紧迫感，真正的公司绝不会给你一个 10 分钟的倒计时。',
        },
        '，否则你的账户将被永久锁定。',
      ],
      [
        '点击下方以',
        {
          cue: '验证你的密码',
          why: '没有任何真正的公司会让你通过邮件里的链接来确认密码。',
        },
        '，恢复完整访问权限：http://amaz0n-support.help/verify',
      ],
    ],
    isScam: true,
    verdictNote:
      'Classic phishing. Also check the sender: "amaz0n" with a zero, on a weird ".help" domain, not amazon.com.',
    verdictNoteEs:
      'Phishing clásico. Fíjate también en el remitente: "amaz0n" con un cero, en un dominio raro ".help", no amazon.com.',
    verdictNoteZh:
      '经典的钓鱼攻击。也留意一下发件人：「amaz0n」里用的是数字零，而且域名是奇怪的「.help」，根本不是 amazon.com。',
  },
  {
    id: 'newsletter',
    kind: 'email',
    sender: 'Jefferson High School',
    senderEs: 'Jefferson High School',
    senderZh: 'Jefferson High School',
    address: 'newsletter@jeffersonhigh.edu',
    addressEs: 'newsletter@jeffersonhigh.edu',
    addressZh: 'newsletter@jeffersonhigh.edu',
    subject: 'Eagle Weekly, Spirit Week schedule',
    subjectEs: 'Eagle Weekly, Horario de la Semana Escolar',
    subjectZh: 'Eagle Weekly，校园精神周日程',
    body: [
      [
        'Hi Eagles! Spirit Week starts Monday: Pajama Day, Decades Day, and Friday pep rally in the gym at 2:00.',
      ],
      [
        'Yearbook photo retakes are Wednesday during lunch. ',
        {
          cue: 'Questions? Stop by the front office or call 555-0148.',
          why: 'Trust signal: it points you to a place and phone number you already know, no links, no rush.',
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
    bodyZh: [
      [
        '嗨，Eagles！校园精神周从周一开始：睡衣日、年代装扮日，还有周五在体育馆 2:00 的动员大会。',
      ],
      [
        '毕业纪念册的补拍安排在周三午餐时间。',
        {
          cue: '有疑问？到前台办公室来一趟，或拨打 555-0148。',
          why: '可信信号：它把你指向一个你早就熟悉的地点和电话号码，没有链接，也不催你。',
        },
      ],
    ],
    isScam: false,
    verdictNote:
      'Legit. Calm tone, a school domain you recognize, and it asks for nothing, no links, no money, no personal info.',
    verdictNoteEs:
      'Legítimo. Tono tranquilo, un dominio escolar que reconoces y no pide nada: sin enlaces, sin dinero, sin información personal.',
    verdictNoteZh:
      '合法。语气平和，是你认得的学校域名，而且什么都不索取，没有链接、不要钱、不要个人信息。',
  },
  {
    id: 'giftcard-prize',
    kind: 'text',
    sender: '+1 (830) 555-0142',
    senderEs: '+1 (830) 555-0142',
    senderZh: '+1 (830) 555-0142',
    address: 'Unknown number',
    addressEs: 'Número desconocido',
    addressZh: '未知号码',
    subject: 'You WON a $1,000 gift card!',
    subjectEs: '¡GANASTE una tarjeta de regalo de $1,000!',
    subjectZh: '你中了一张 $1,000 的礼品卡！',
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
          why: 'Urgency again, scammers rush you so you do not stop and think.',
        },
        ', tap to collect: http://claim-prize.win/8842',
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
        ', toca para cobrar: http://claim-prize.win/8842',
      ],
    ],
    bodyZh: [
      [
        '恭喜！',
        {
          cue: '你已被选为一张 $1,000 Visa 礼品卡的中奖者',
          why: '你不可能中一个自己从没参加过的抽奖。天上掉下来的奖品就是诱饵。',
        },
        '，来自全国学生抽奖活动！',
      ],
      [
        {
          cue: '领取资格今天到期',
          why: '又是紧迫感，骗子催你赶紧行动，好让你没空停下来想一想。',
        },
        '，点击领取：http://claim-prize.win/8842',
      ],
    ],
    isScam: true,
    verdictNote:
      'Prize scam. You never entered any raffle, the link is a sketchy ".win" domain, and the "prize" evaporates today. Delete.',
    verdictNoteEs:
      'Estafa de premio. Nunca participaste en ninguna rifa, el enlace es un dominio sospechoso ".win" y el "premio" se esfuma hoy. Bórralo.',
    verdictNoteZh:
      '中奖骗局。你从没参加过任何抽奖，链接是可疑的「.win」域名，而且这个「奖品」今天就会蒸发。删掉它。',
  },
  {
    id: 'bank-statement',
    kind: 'email',
    sender: 'First National Bank',
    senderEs: 'First National Bank',
    senderZh: 'First National Bank',
    address: 'no-reply@firstnational.com',
    addressEs: 'no-reply@firstnational.com',
    addressZh: 'no-reply@firstnational.com',
    subject: 'Your June statement is ready',
    subjectEs: 'Tu estado de cuenta de junio está listo',
    subjectZh: '你的 6 月对账单已生成',
    body: [
      [
        'Hello, your monthly account statement is now available. ',
        {
          cue: 'To view it, log in to online banking the way you normally do, or use our mobile app.',
          why: 'Trust signal: it tells you to use your normal login. It does not hand you a link or ask for anything.',
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
    bodyZh: [
      [
        '你好，你的每月账户对账单现已生成。',
        {
          cue: '要查看它，请像平常一样登录网上银行，或使用我们的手机 App。',
          why: '可信信号：它让你用自己一贯的方式登录，不塞给你链接，也不索取任何东西。',
        },
      ],
      [
        {
          cue: '我们绝不会通过邮件向你索要密码或 PIN。',
          why: '可信信号：真正的银行会这么说，正是因为骗子的做法恰恰相反。',
        },
      ],
    ],
    isScam: false,
    verdictNote:
      'Legit. No link to click, no urgency, nothing requested. It even reminds you it will never ask for your password.',
    verdictNoteEs:
      'Legítimo. Sin enlaces para hacer clic, sin urgencia, sin pedir nada. Incluso te recuerda que nunca te pedirá tu contraseña.',
    verdictNoteZh:
      '合法。没有可点的链接，没有紧迫感，什么都不索取。它甚至提醒你，它绝不会向你索要密码。',
  },
  {
    id: 'principal-giftcards',
    kind: 'email',
    sender: "Principal's Office",
    senderEs: 'Oficina del Director',
    senderZh: '校长办公室',
    address: 'principal.desk@school-payments-portal.com',
    addressEs: 'principal.desk@school-payments-portal.com',
    addressZh: 'principal.desk@school-payments-portal.com',
    subject: 'Overdue lunch balance, final notice',
    subjectEs: 'Saldo de almuerzo vencido, aviso final',
    subjectZh: '午餐费欠款逾期，最后通知',
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
    bodyZh: [
      [
        '我们的记录显示，你有一笔 $85 的食堂欠款逾期未付。',
        {
          cue: '为避免午餐权限被暂停，请今天就付款',
          why: '威胁再加上「当天截止」是施压手段，学校根本不是这么办事的。',
        },
        '。',
      ],
      [
        {
          cue: '购买两张 $50 的 Apple 礼品卡，并把卡背面的兑换码回复给我们',
          why: '礼品卡就是无法追踪的现金。没有任何真正的学校、公司或政府机构会用礼品卡收款。永远不会。',
        },
        '，以结清你的账户。',
      ],
    ],
    isScam: true,
    verdictNote:
      'Gift-card scam. The sender domain is not your school, and gift-card codes = instant, untraceable money for a scammer.',
    verdictNoteEs:
      'Estafa de tarjetas de regalo. El dominio del remitente no es tu escuela, y los códigos de tarjetas de regalo son dinero instantáneo e imposible de rastrear para un estafador.',
    verdictNoteZh:
      '礼品卡骗局。发件人域名根本不是你的学校，而礼品卡兑换码 = 骗子马上到手、又无法追踪的钱。',
  },
  {
    id: 'shipping',
    kind: 'text',
    sender: '28777',
    senderEs: '28777',
    senderZh: '28777',
    address: 'Delivery notifications',
    addressEs: 'Notificaciones de entrega',
    addressZh: '配送通知',
    subject: 'Your order has shipped',
    subjectEs: 'Tu pedido ha sido enviado',
    subjectZh: '你的订单已发货',
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
    bodyZh: [
      [
        {
          cue: '你的订单 #83921（蓝色手机壳）已发货',
          why: '可信信号：它写出了你确实下过的那笔订单里的具体商品和订单号。',
        },
        '，将于周四送达。',
      ],
      ['无需任何操作。你随时可以在账户的订单页面查看物流。'],
    ],
    isScam: false,
    verdictNote:
      'Legit. You did order that phone case. It matches a real order, asks for nothing, and says "no action needed."',
    verdictNoteEs:
      'Legítimo. Sí pediste esa funda para teléfono. Coincide con un pedido real, no pide nada y dice "no se requiere ninguna acción".',
    verdictNoteZh:
      '合法。你确实订过那个手机壳。它和一笔真实订单对得上，什么都不索取，还写着「无需任何操作」。',
  },
  {
    id: 'crypto',
    kind: 'text',
    sender: '+44 7700 900123',
    senderEs: '+44 7700 900123',
    senderZh: '+44 7700 900123',
    address: 'Unknown international number',
    addressEs: 'Número internacional desconocido',
    addressZh: '未知的国际号码',
    subject: 'Double your crypto, giveaway!',
    subjectEs: '¡Duplica tu cripto, sorteo!',
    subjectZh: '让你的加密币翻倍，免费赠送活动！',
    body: [
      [
        'OFFICIAL GIVEAWAY: ',
        {
          cue: 'send 0.1 Bitcoin and receive 0.2 Bitcoin back instantly',
          why: '"Send money, get double back" is 100% a scam, 100% of the time. Money sent is money gone.',
        },
        ', guaranteed!',
      ],
      [
        {
          cue: 'Only the first 100 people qualify',
          why: 'Fake scarcity, another pressure tactic to make you rush.',
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
        ', ¡garantizado!',
      ],
      [
        {
          cue: 'Solo califican las primeras 100 personas',
          why: 'Escasez falsa: otra táctica de presión para hacerte apurar.',
        },
        '. Billetera: bc1q-giveaway-now',
      ],
    ],
    bodyZh: [
      [
        '官方赠送活动：',
        {
          cue: '发送 0.1 个比特币，立刻返还给你 0.2 个比特币',
          why: '「发钱给你返双倍」百分之百是骗局，每一次都是。钱一发出去就是有去无回。',
        },
        '，保证到账！',
      ],
      [
        {
          cue: '仅限前 100 名有资格',
          why: '虚假的稀缺感，又一个催你赶紧行动的施压手段。',
        },
        '。钱包地址：bc1q-giveaway-now',
      ],
    ],
    isScam: true,
    verdictNote:
      'Too good to be true = not true. Nobody doubles strangers’ money. Crypto payments cannot be reversed, so it’s gone forever.',
    verdictNoteEs:
      'Demasiado bueno para ser verdad = no es verdad. Nadie duplica el dinero de desconocidos. Los pagos en cripto no se pueden revertir, así que se pierde para siempre.',
    verdictNoteZh:
      '好到不真实 = 就是不真实。没有人会把陌生人的钱翻倍。加密币付款无法撤销，所以钱一去就永远回不来了。',
  },
  {
    id: 'netflix',
    kind: 'email',
    sender: 'Netflix Billing',
    senderEs: 'Facturación de Netflix',
    senderZh: 'Netflix 账单',
    address: 'billing@netfIix-accounts.com',
    addressEs: 'billing@netfIix-accounts.com',
    addressZh: 'billing@netfIix-accounts.com',
    subject: 'Payment declined, update card within 24 hours',
    subjectEs: 'Pago rechazado, actualiza tu tarjeta en 24 horas',
    subjectZh: '付款被拒，请在 24 小时内更新银行卡',
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
          why: 'Real companies never ask you to type card details from an email link. That’s how cards get stolen.',
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
    bodyZh: [
      [
        '我们无法处理你的付款。',
        {
          cue: '除非你现在就行动，否则你的账户将在 24 小时内被暂停',
          why: '一个通往灾难的倒计时是施压手段。真正的账单问题会一直等着你。',
        },
        '。',
      ],
      [
        '请在此',
        {
          cue: '确认你的卡号和安全码',
          why: '真正的公司绝不会让你通过邮件里的链接输入银行卡信息，银行卡就是这么被盗的。',
        },
        '：http://netfIix-accounts.com/billing',
      ],
    ],
    isScam: true,
    verdictNote:
      'Look closely at the sender: "netfIix" uses a capital I disguised as an L, on a fake domain. Spoofed sender + card-detail request = phishing.',
    verdictNoteEs:
      'Mira de cerca el remitente: "netfIix" usa una I mayúscula disfrazada de L, en un dominio falso. Remitente falsificado + petición de datos de tarjeta = phishing.',
    verdictNoteZh:
      '仔细看发件人：「netfIix」用了一个大写字母 I 冒充小写 L，而且域名是假的。伪造的发件人 + 索要卡片信息 = 钓鱼。',
  },
]

// ---------- Scoring ----------

type Verdict = 'legit' | 'scam'

function tierFor(score: number, es: boolean, zh: boolean): { title: string; icon: string } {
  if (score >= 100) return { title: zh ? '防骗金钟罩' : es ? 'Escudo Antiestafas' : 'Scam-Proof Shield', icon: 'ShieldCheck' }
  if (score >= 75) return { title: zh ? '火眼金睛怀疑派' : es ? 'Escéptico de Ojo Agudo' : 'Sharp-Eyed Skeptic', icon: 'Search' }
  if (score >= 50) return { title: zh ? '开始起疑心' : es ? 'Empezando a Sospechar' : 'Getting Suspicious', icon: 'Eye' }
  return { title: zh ? '钓鱼诱饵' : es ? 'Carnada de Phishing' : 'Phish Food', icon: 'Fish' }
}

function cuesOf(m: InboxMessage, es: boolean, zh: boolean): { cue: string; why: string }[] {
  const body = zh ? m.bodyZh : es ? m.bodyEs : m.body
  return body.flat().filter((s): s is { cue: string; why: string } => typeof s !== 'string')
}

// ---------- Body rendering ----------

function Body({ message, revealed, es, zh }: { message: InboxMessage; revealed: boolean; es: boolean; zh: boolean }) {
  const body = zh ? message.bodyZh : es ? message.bodyEs : message.body
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
  const zh = lang === 'zh'
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
  const tier = tierFor(score, es, zh)
  const TierIcon = ITEM_ICONS[tier.icon]

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
        <header className="mb-2">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh
              ? '案子结了。这些是消息里藏着的东西。'
              : es
              ? 'Caso cerrado. Esto es lo que escondían los mensajes.'
              : "Case closed. Here's what the messages were hiding."}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            <UserSearch className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />{' '}
            {zh ? (
              <>识骗<em>高手</em></>
            ) : es ? (
              <>Detector de <em>Estafas</em></>
            ) : (
              <>Scam <em>Spotter</em></>
            )}{' '}
            <Smartphone className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />
          </h1>
        </header>

        <div className="card animate-pop-in mt-4 space-y-2 text-center" role="status">
          <TierIcon className="mx-auto h-14 w-14 text-bff-600" aria-hidden="true" />
          <h2 className="font-display text-3xl font-bold text-slate-900">{tier.title}</h2>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="text-sm text-slate-600">
            {zh
              ? `${MESSAGES.length} 条消息里你答对了 ${correctCount} 条。`
              : es
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
                    <KindMark kind={m.kind} />
                    {zh ? m.senderZh : es ? m.senderEs : m.sender}, {zh ? m.subjectZh : es ? m.subjectEs : m.subject}
                  </p>
                  <span
                    className={`chip ${correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}
                  >
                    {correct ? (
                      <>
                        <Check className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" /> {zh ? '答对了' : es ? 'Acertaste' : 'You got it'}
                      </>
                    ) : (
                      <>
                        <X className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" /> {zh ? '这条看走眼了' : es ? 'Fallaste este' : 'You missed this one'}
                      </>
                    )}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {zh ? '来自' : es ? 'De' : 'From'}: {zh ? m.addressZh : es ? m.addressEs : m.address} ·{' '}
                  {zh ? '实际上是' : es ? 'En realidad es' : 'Actually'}{' '}
                  <span className={`font-bold ${m.isScam ? 'text-red-600' : 'text-green-700'}`}>
                    {m.isScam ? (zh ? '一个骗局' : es ? 'una ESTAFA' : 'a SCAM') : zh ? '合法' : es ? 'legítimo' : 'legit'}
                  </span>{' '}
                  · {zh ? '你的判断' : es ? 'Dijiste' : 'You said'}:{' '}
                  {yourCall === 'scam' ? (zh ? '骗局' : es ? 'Estafa' : 'Scam') : zh ? '合法' : es ? 'Legítimo' : 'Legit'}
                </p>
                <div className="mt-3">
                  <Body message={m} revealed es={es} zh={zh} />
                </div>
                <div
                  className={`mt-3 rounded-xl p-3 text-xs ${
                    m.isScam ? 'bg-amber-50 text-slate-700' : 'bg-green-50 text-slate-700'
                  }`}
                >
                  <p className="font-display font-bold text-slate-900">
                    {m.isScam ? (
                      <>
                        <AlertTriangle className="mr-1 inline-block h-4 w-4 align-[-0.15em] text-red-600" aria-hidden="true" /> {zh ? '危险信号' : es ? 'Señales de alerta' : 'Red flags'}
                      </>
                    ) : (
                      <>
                        <Handshake className="mr-1 inline-block h-4 w-4 align-[-0.15em] text-green-700" aria-hidden="true" /> {zh ? '可信信号' : es ? 'Señales de confianza' : 'Trust signals'}
                      </>
                    )}
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">
                    {cuesOf(m, es, zh).map((c) => (
                      <li key={c.cue}>
                        <span className="font-semibold">“{c.cue}”</span>, {c.why}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2">{zh ? m.verdictNoteZh : es ? m.verdictNoteEs : m.verdictNote}</p>
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
            <ShieldCheck className="inline-block h-4 w-4 align-[-0.15em] text-bff-600" aria-hidden="true" />{' '}
            {zh ? '举好你的 S.H.I.E.L.D. 盾牌' : es ? 'Mantén tu S.H.I.E.L.D. en alto' : 'Keep your S.H.I.E.L.D. up'}
          </p>
          {zh ? (
            <p className="mt-1">
              <strong>S</strong>：守好你的密码 · <strong>H</strong>：藏好你的个人信息 ·{' '}
              <strong>I</strong>：忽略可疑消息 · <strong>E</strong>：开启双重验证（2FA） ·{' '}
              <strong>L</strong>：锁好你的设备 · <strong>D</strong>：别在公共 Wi-Fi 上购物。当一条消息拿紧迫感、奖品、礼品卡或索要密码的链接来推你时，慢下来。骗子就指望着你慌慌张张。
            </p>
          ) : es ? (
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
              message pushes urgency, prizes, gift cards, or password links. Slow down. Scammers need
              you rushing.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={reset}>
            {zh ? '重新调查' : es ? 'Investigar de nuevo' : 'Investigate again'}
          </button>
          <Link to="/activities" className="btn-primary">
            {zh ? '更多活动' : es ? 'Más actividades' : 'More activities'}
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
        <header className="mb-2">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh
              ? '仔细读。这条消息是合法的，还是一个骗局？'
              : es
              ? 'Lee con atención. ¿Este mensaje es legítimo o una estafa?'
              : 'Read closely. Is this message legit, or a scam?'}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            <UserSearch className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />{' '}
            {zh ? (
              <>识骗<em>高手</em></>
            ) : es ? (
              <>Detector de <em>Estafas</em></>
            ) : (
              <>Scam <em>Spotter</em></>
            )}{' '}
            <Smartphone className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />
          </h1>
        </header>

        <div className="card animate-pop-in mt-4">
          <button className="btn-ghost -ml-2 text-sm" onClick={() => setOpenId(null)}>
            <ArrowLeft className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" /> {zh ? '返回收件箱' : es ? 'Volver a la bandeja' : 'Back to inbox'}
          </button>
          <div className="mt-3 border-b border-slate-200 pb-3">
            <p className="text-sm font-semibold text-slate-800">
              <KindMark kind={open.kind} />
              {zh ? open.senderZh : es ? open.senderEs : open.sender}
            </p>
            <p className="text-xs text-slate-500">{zh ? open.addressZh : es ? open.addressEs : open.address}</p>
            <p className="mt-1 font-display font-bold text-slate-900">
              {zh ? open.subjectZh : es ? open.subjectEs : open.subject}
            </p>
          </div>
          <div className="mt-3">
            <Body message={open} revealed={false} es={es} zh={zh} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              aria-pressed={v === 'legit'}
              onClick={() => mark(open.id, 'legit')}
              className={`flex-1 rounded-xl border-2 px-4 py-2.5 font-display font-semibold transition active:scale-[0.97] ${
                v === 'legit'
                  ? 'border-green-600 bg-green-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-green-400'
              }`}
            >
              {zh ? '合法' : es ? 'Legítimo' : 'Legit'} <ShieldCheck className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-pressed={v === 'scam'}
              onClick={() => mark(open.id, 'scam')}
              className={`flex-1 rounded-xl border-2 px-4 py-2.5 font-display font-semibold transition active:scale-[0.97] ${
                v === 'scam'
                  ? 'border-red-600 bg-red-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-red-400'
              }`}
            >
              {zh ? '骗局' : es ? 'Estafa' : 'Scam'} <Siren className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500" role="status" aria-live="polite">
            {v
              ? zh
                ? `已标记为${v === 'scam' ? '骗局' : '合法'}，提交之前你随时可以改主意。`
                : es
                ? `Marcado como ${v === 'scam' ? 'estafa' : 'legítimo'}: puedes cambiar de opinión en cualquier momento antes de enviar.`
                : `Marked as ${v === 'scam' ? 'scam' : 'legit'}. You can change your mind anytime before submitting.`
              : zh
                ? '选一个判断来归档这条消息。'
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
      <header className="mb-2">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh
            ? '你的收件箱有 8 条新消息。其中一些是陷阱。'
            : es
            ? 'Tu bandeja tiene 8 mensajes nuevos. Algunos son trampas.'
            : 'Your inbox has 8 new messages. Some of them are traps.'}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          <UserSearch className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />{' '}
          {zh ? (
            <>识骗<em>高手</em></>
          ) : es ? (
            <>Detector de <em>Estafas</em></>
          ) : (
            <>Scam <em>Spotter</em></>
          )}{' '}
          <Smartphone className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />
        </h1>
      </header>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        {zh ? (
          <p>
            打开每一条消息，像侦探一样读它，然后把它标记为{' '}
            <strong>
              合法 <ShieldCheck className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </strong>{' '}
            或{' '}
            <strong>
              骗局 <Siren className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </strong>
            。留意紧迫感、奇怪的发件人地址、天上掉下来的奖品、索要礼品卡，以及任何索取密码或卡号的人。把这 8 条都分类好，然后提交。
          </p>
        ) : es ? (
          <p>
            Abre cada mensaje, léelo como un detective y márcalo{' '}
            <strong>
              Legítimo <ShieldCheck className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </strong>{' '}
            o{' '}
            <strong>
              Estafa <Siren className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </strong>
            . Vigila la urgencia, las direcciones de remitente raras, los premios sorpresa, las
            exigencias de tarjetas de regalo y a cualquiera que pida contraseñas o números de
            tarjeta. Clasifica los 8 y luego envía.
          </p>
        ) : (
          <p>
            Open each message, read it like a detective, and mark it{' '}
            <strong>
              Legit <ShieldCheck className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </strong>{' '}
            or{' '}
            <strong>
              Scam <Siren className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </strong>
            . Watch for urgency, weird sender addresses, surprise prizes, gift-card demands, and
            anyone asking for passwords or card numbers. Classify all 8, then submit.
          </p>
        )}
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-600" role="status" aria-live="polite">
        {zh
          ? `${MESSAGES.length} 条消息中已分类 ${classifiedCount} 条`
          : es
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
                className="flex w-full items-center justify-between gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left transition hover:border-bff-300 active:scale-[0.98]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    <KindMark kind={m.kind} />
                    {zh ? m.senderZh : es ? m.senderEs : m.sender}
                  </p>
                  <p className="truncate text-xs text-slate-600">{zh ? m.subjectZh : es ? m.subjectEs : m.subject}</p>
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
                      {zh ? '骗局' : es ? 'Estafa' : 'Scam'} <Siren className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
                    </>
                  ) : v === 'legit' ? (
                    <>
                      {zh ? '合法' : es ? 'Legítimo' : 'Legit'} <ShieldCheck className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
                    </>
                  ) : zh ? (
                    '未读'
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
          {zh ? '提交判断' : es ? 'Enviar veredictos' : 'Submit verdicts'}
        </button>
        {!allClassified && (
          <p className="mt-2 text-sm text-slate-500">
            {zh
              ? `提交前请把每一条消息都分类好，还剩 ${MESSAGES.length - classifiedCount} 条。`
              : es
              ? `Clasifica todos los mensajes antes de enviar, faltan ${MESSAGES.length - classifiedCount}.`
              : `Classify every message before submitting, ${MESSAGES.length - classifiedCount} to go.`}
          </p>
        )}
      </div>
    </div>
  )
}

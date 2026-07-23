import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Lightbulb } from 'lucide-react'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

// ---------- Score bands (standard FICO ranges) ----------

const SCORE_MIN = 300
const SCORE_MAX = 850
const START_SCORE = 630

interface Band {
  name: string
  nameEs: string
  nameZh: string
  min: number
  max: number
  barClass: string
  chipClass: string
}

const BANDS: Band[] = [
  { name: 'Poor', nameEs: 'Malo', nameZh: '差', min: 300, max: 579, barClass: 'bg-red-400', chipClass: 'bg-red-100 text-red-700' },
  { name: 'Fair', nameEs: 'Regular', nameZh: '一般', min: 580, max: 669, barClass: 'bg-amber-400', chipClass: 'bg-amber-100 text-amber-700' },
  { name: 'Good', nameEs: 'Bueno', nameZh: '良好', min: 670, max: 739, barClass: 'bg-lime-400', chipClass: 'bg-lime-100 text-lime-800' },
  { name: 'Very Good', nameEs: 'Muy bueno', nameZh: '很好', min: 740, max: 799, barClass: 'bg-green-400', chipClass: 'bg-green-100 text-green-700' },
  { name: 'Exceptional', nameEs: 'Excepcional', nameZh: '极佳', min: 800, max: 850, barClass: 'bg-green-600', chipClass: 'bg-green-100 text-green-800' },
]

function bandFor(score: number): Band {
  return BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1]
}

// ---------- FICO factors (the real weights) ----------

type Factor = 'payment' | 'utilization' | 'length' | 'new' | 'mix'

const FACTORS: Record<Factor, string> = {
  payment: 'Payment history · 35%',
  utilization: 'Credit utilization · 30%',
  length: 'Length of history · 15%',
  new: 'New credit · 10%',
  mix: 'Credit mix · 10%',
}

const FACTORS_ES: Record<Factor, string> = {
  payment: 'Historial de pagos · 35%',
  utilization: 'Uso del crédito · 30%',
  length: 'Antigüedad del historial · 15%',
  new: 'Crédito nuevo · 10%',
  mix: 'Variedad de crédito · 10%',
}

const FACTORS_ZH: Record<Factor, string> = {
  payment: '还款记录 · 35%',
  utilization: '信用额度使用率 · 30%',
  length: '信用历史长度 · 15%',
  new: '新开信用账户 · 10%',
  mix: '信用类型组合 · 10%',
}

// ---------- The 10 months ----------

interface Choice {
  id: string
  label: string
  labelEs: string
  labelZh: string
  delta: number
  explanation: string
  explanationEs: string
  explanationZh: string
  factors: Factor[]
}

interface MonthCard {
  emoji: string
  title: string
  titleEs: string
  titleZh: string
  scenario: string
  scenarioEs: string
  scenarioZh: string
  choices: Choice[]
}

const MONTHS: MonthCard[] = [
  {
    emoji: '💌',
    title: 'The first bill',
    titleEs: 'La primera factura',
    titleZh: '第一张账单',
    scenario:
      'Your first credit card statement lands: $85 balance, minimum due $25. Meanwhile, concert tickets for Friday just dropped and they are NOT cheap.',
    scenarioEs:
      'Llega el primer estado de cuenta de tu tarjeta de crédito: saldo de $85, pago mínimo $25. Mientras tanto, salieron las entradas para el concierto del viernes y NO son baratas.',
    scenarioZh:
      '你的第一张信用卡账单来了：欠款 $85，最低还款额 $25。与此同时，周五演唱会的门票刚刚开售，而且一点也不便宜。',
    choices: [
      {
        id: 'pay-full',
        label: 'Pay the $85 in full',
        labelEs: 'Pagar los $85 completos',
        labelZh: '全额还清 $85',
        delta: 15,
        explanation:
          'On time and in full. Payment history is the single biggest slice of your score, and a $0 carried balance keeps your utilization low too.',
        explanationEs:
          'A tiempo y completo. El historial de pagos es la parte más importante de tu puntaje, y no arrastrar saldo mantiene bajo tu uso del crédito.',
        explanationZh:
          '按时且全额还款。还款记录是信用分中占比最大的一块，而且不结转任何欠款也能让你的信用额度使用率保持在低位。',
        factors: ['payment', 'utilization'],
      },
      {
        id: 'pay-min',
        label: 'Pay the $25 minimum',
        labelEs: 'Pagar el mínimo de $25',
        labelZh: '只还最低还款额 $25',
        delta: 5,
        explanation:
          "Still on time — that's what payment history records — but the leftover $60 rolls over and starts collecting interest at around 24% APR.",
        explanationEs:
          'Sigue siendo a tiempo —eso es lo que registra el historial de pagos—, pero los $60 restantes se arrastran y empiezan a generar intereses de alrededor del 24% anual.',
        explanationZh:
          '仍然算按时还款——这正是还款记录所记录的——但剩下的 $60 会结转到下期，并开始以约 24% 的年利率（APR）计息。',
        factors: ['payment'],
      },
      {
        id: 'skip',
        label: 'Skip it — tickets first',
        labelEs: 'Saltártelo: primero las entradas',
        labelZh: '不还了——门票优先',
        delta: -85,
        explanation:
          'The payment goes 30+ days late and hits your credit report. One late mark is the biggest single hit your score can take, and it can stick around for up to 7 years.',
        explanationEs:
          'El pago se atrasa más de 30 días y queda en tu reporte de crédito. Una sola marca de atraso es el mayor golpe que puede recibir tu puntaje, y puede quedarse hasta 7 años.',
        explanationZh:
          '这笔还款逾期超过 30 天，会被记入你的信用报告。一条逾期记录是信用分能承受的最大单次打击，而且它可能会保留长达 7 年。',
        factors: ['payment'],
      },
    ],
  },
  {
    emoji: '🛍️',
    title: 'The checkout counter',
    titleEs: 'La caja registradora',
    titleZh: '收银台',
    scenario:
      'A clothing store offers 20% off your whole purchase today if you open their store credit card. The cashier is waiting.',
    scenarioEs:
      'Una tienda de ropa te ofrece hoy un 20% de descuento en toda tu compra si abres su tarjeta de crédito de la tienda. El cajero está esperando.',
    scenarioZh:
      '一家服装店提出：只要你今天办理他们的商店信用卡，整笔消费就打八折。收银员正等着你。',
    choices: [
      {
        id: 'decline',
        label: 'No thanks — just the hoodie',
        labelEs: 'No gracias, solo la sudadera',
        labelZh: '不用了——只买这件卫衣',
        delta: 5,
        explanation:
          'No hard inquiry, no brand-new account. Your existing accounts quietly get older, which slowly helps your score.',
        explanationEs:
          'Sin consulta dura ni cuenta nueva. Tus cuentas actuales van ganando antigüedad, lo que poco a poco ayuda a tu puntaje.',
        explanationZh:
          '没有硬查询，也没有新开账户。你现有的账户在悄悄变老，这会慢慢帮你抬高信用分。',
        factors: ['new', 'length'],
      },
      {
        id: 'open',
        label: 'Open the card for the discount',
        labelEs: 'Abrir la tarjeta por el descuento',
        labelZh: '为了折扣办这张卡',
        delta: -10,
        explanation:
          'A hard inquiry plus a brand-new account lowers your average account age. That 20% off cost more than it saved.',
        explanationEs:
          'Una consulta dura más una cuenta nueva baja la antigüedad promedio de tus cuentas. Ese 20% de descuento costó más de lo que ahorró.',
        explanationZh:
          '一次硬查询加上一个全新账户，会拉低你账户的平均年龄。那八折省下的，还不如它带来的损失多。',
        factors: ['new', 'length'],
      },
      {
        id: 'open-max',
        label: 'Open it AND buy the whole cart',
        labelEs: 'Abrirla Y comprar todo el carrito',
        labelZh: '办卡，并且把整车都买了',
        delta: -30,
        explanation:
          'An inquiry, a new account, and a nearly maxed-out card all at once. High utilization on any card is a classic red flag.',
        explanationEs:
          'Una consulta, una cuenta nueva y una tarjeta casi al tope, todo de una vez. El uso alto en cualquier tarjeta es una señal de alerta clásica.',
        explanationZh:
          '一次查询、一个新账户，外加一张几乎刷爆的卡，全都一次发生。任何一张卡额度使用率过高都是经典的危险信号。',
        factors: ['new', 'utilization'],
      },
    ],
  },
  {
    emoji: '📈',
    title: 'Limit raised',
    titleEs: 'Subió el límite',
    titleZh: '额度提高了',
    scenario:
      'Good news from your card company: your credit limit just doubled from $500 to $1,000. What changes?',
    scenarioEs:
      'Buenas noticias de tu compañía de tarjeta: tu límite de crédito acaba de duplicarse de $500 a $1,000. ¿Qué cambia?',
    scenarioZh:
      '发卡公司传来好消息：你的信用额度刚从 $500 翻倍到了 $1,000。这会带来什么改变？',
    choices: [
      {
        id: 'same-spend',
        label: 'Keep spending like before',
        labelEs: 'Seguir gastando como antes',
        labelZh: '和以前一样消费',
        delta: 20,
        explanation:
          'Same spending on double the limit cuts your utilization roughly in half. Under 30% is the healthy zone; under 10% is elite.',
        explanationEs:
          'El mismo gasto con el doble de límite reduce tu uso del crédito casi a la mitad. Menos del 30% es la zona sana; menos del 10% es de élite.',
        explanationZh:
          '消费不变、额度翻倍，会让你的额度使用率差不多减半。低于 30% 是健康区间；低于 10% 是顶尖水平。',
        factors: ['utilization'],
      },
      {
        id: 'max-it',
        label: 'New limit, new lifestyle',
        labelEs: 'Nuevo límite, nuevo estilo de vida',
        labelZh: '新额度，新生活方式',
        delta: -30,
        explanation:
          "Spending up to the new limit pushes utilization near 100% — the classic 'maxed out' signal lenders hate.",
        explanationEs:
          'Gastar hasta el nuevo límite lleva tu uso del crédito cerca del 100%: la clásica señal de "tarjeta al tope" que los prestamistas odian.',
        explanationZh:
          '花到新额度的上限会把使用率推到接近 100%——这正是放贷方最讨厌的经典「刷爆」信号。',
        factors: ['utilization'],
      },
    ],
  },
  {
    emoji: '🗃️',
    title: 'The forgotten card',
    titleEs: 'La tarjeta olvidada',
    titleZh: '被遗忘的那张卡',
    scenario:
      "Your very first card has been sitting unused in a drawer for months. It feels useless. Close it?",
    scenarioEs:
      'Tu primera tarjeta lleva meses sin usar, guardada en un cajón. Parece inútil. ¿La cierras?',
    scenarioZh:
      '你的第一张卡在抽屉里几个月没用了，感觉毫无用处。要注销它吗？',
    choices: [
      {
        id: 'keep-open',
        label: 'Keep it open with one small autopaid subscription',
        labelEs: 'Mantenerla abierta con una suscripción pequeña de pago automático',
        labelZh: '留着它，绑定一个自动扣费的小额订阅',
        delta: 10,
        explanation:
          'Your oldest account keeps aging, and its limit keeps your overall utilization low. Old cards are quiet MVPs.',
        explanationEs:
          'Tu cuenta más antigua sigue ganando antigüedad, y su límite mantiene bajo tu uso total del crédito. Las tarjetas viejas son héroes silenciosos.',
        explanationZh:
          '你最老的账户继续变老，它的额度也让你的整体使用率保持在低位。旧卡是默默无闻的最有价值球员。',
        factors: ['length', 'utilization'],
      },
      {
        id: 'close-it',
        label: 'Close it — feels tidy',
        labelEs: 'Cerrarla: se siente ordenado',
        labelZh: '注销它——感觉更清爽',
        delta: -20,
        explanation:
          'Closing your oldest card shrinks your available credit (utilization jumps) and will eventually shorten your credit history.',
        explanationEs:
          'Cerrar tu tarjeta más antigua reduce tu crédito disponible (el uso sube) y con el tiempo acorta tu historial de crédito.',
        explanationZh:
          '注销你最老的卡会减少你的可用信用额度（使用率随之飙升），并且最终会缩短你的信用历史长度。',
        factors: ['length', 'utilization'],
      },
    ],
  },
  {
    emoji: '🤝',
    title: 'The co-sign ask',
    titleEs: 'La petición de ser aval',
    titleZh: '请你做担保人',
    scenario:
      "Your friend can't get approved for a phone financing plan and asks you to co-sign. \"You won't have to pay anything, promise!\"",
    scenarioEs:
      'A tu amigo no le aprueban un plan de financiamiento para un teléfono y te pide que seas su aval. "¡No tendrás que pagar nada, te lo prometo!"',
    scenarioZh:
      '你朋友的手机分期贷款申请没通过，于是请你做联署担保人。「你什么都不用付，我保证！」',
    choices: [
      {
        id: 'decline-cosign',
        label: 'Offer moral support instead',
        labelEs: 'Ofrecer apoyo moral en su lugar',
        labelZh: '改为给他精神上的支持',
        delta: 5,
        explanation:
          "Co-signing makes their debt legally YOUR debt. Saying no protects your payment history from someone else's forgetfulness.",
        explanationEs:
          'Ser aval convierte su deuda legalmente en TU deuda. Decir que no protege tu historial de pagos de los olvidos de otra persona.',
        explanationZh:
          '联署担保会让他的债务在法律上变成「你的」债务。说不，能保护你的还款记录不受别人健忘的连累。',
        factors: ['payment'],
      },
      {
        id: 'cosign',
        label: 'Co-sign — what could go wrong?',
        labelEs: 'Ser aval: ¿qué podría salir mal?',
        labelZh: '做担保人——能出什么岔子呢？',
        delta: -25,
        explanation:
          "A hard inquiry, plus the whole loan lands on YOUR report. When your friend pays late next month, that late mark is yours too.",
        explanationEs:
          'Una consulta dura, y además todo el préstamo queda en TU reporte. Cuando tu amigo pague tarde el próximo mes, esa marca de atraso también es tuya.',
        explanationZh:
          '一次硬查询，而且整笔贷款都会记到「你的」信用报告上。等你朋友下个月逾期还款，那条逾期记录也算在你头上。',
        factors: ['payment', 'new'],
      },
    ],
  },
  {
    emoji: '⏰',
    title: 'Autopilot',
    titleEs: 'Piloto automático',
    titleZh: '自动挡',
    scenario: "School, practice, work — life is getting busy. Set up autopay on your card?",
    scenarioEs:
      'Escuela, entrenamiento, trabajo: la vida se está poniendo ocupada. ¿Configuras el pago automático en tu tarjeta?',
    scenarioZh:
      '上学、训练、打工——生活越来越忙。要给你的卡设置自动还款吗？',
    choices: [
      {
        id: 'auto-full',
        label: 'Autopay the full balance',
        labelEs: 'Pago automático del saldo completo',
        labelZh: '自动全额还款',
        delta: 15,
        explanation:
          "You can't be late if the robot pays. A perfect payment history builds itself while you sleep.",
        explanationEs:
          'No puedes atrasarte si el robot paga. Un historial de pagos perfecto se construye solo mientras duermes.',
        explanationZh:
          '让机器人替你还款，就不可能逾期了。完美的还款记录在你睡觉时就自己攒了起来。',
        factors: ['payment'],
      },
      {
        id: 'auto-min',
        label: 'Autopay the minimum, pay extra manually',
        labelEs: 'Pago automático del mínimo, y pagar extra a mano',
        labelZh: '自动还最低额，多出来的手动还',
        delta: 8,
        explanation:
          'A late payment is now impossible — solid. Just remember that carrying a balance still costs interest.',
        explanationEs:
          'Ahora es imposible atrasarte: muy bien. Solo recuerda que arrastrar un saldo igual cuesta intereses.',
        explanationZh:
          '现在逾期已经不可能了——很稳。只是别忘了，结转欠款照样要付利息。',
        factors: ['payment'],
      },
      {
        id: 'no-auto',
        label: "Nah, I'll just remember",
        labelEs: 'Nah, me acordaré solo',
        labelZh: '算了，我自己记着就行',
        delta: 0,
        explanation:
          'You remembered… 3 days late. Under 30 days late never reaches your credit report, so your score survives — but you paid a $30 late fee. Living dangerously.',
        explanationEs:
          'Te acordaste… 3 días tarde. Un atraso de menos de 30 días nunca llega a tu reporte de crédito, así que tu puntaje sobrevive, pero pagaste una multa de $30 por atraso. Viviendo al límite.',
        explanationZh:
          '你记起来了……晚了 3 天。逾期不满 30 天不会进入你的信用报告，所以信用分保住了——但你付了 $30 的滞纳金。玩得挺悬。',
        factors: ['payment'],
      },
    ],
  },
  {
    emoji: '🔎',
    title: 'The free checkup',
    titleEs: 'La revisión gratis',
    titleZh: '免费体检',
    scenario:
      'You can pull your full credit report for free at AnnualCreditReport.com. Worth the 10 minutes?',
    scenarioEs:
      'Puedes obtener tu reporte de crédito completo gratis en AnnualCreditReport.com. ¿Vale los 10 minutos?',
    scenarioZh:
      '你可以在 AnnualCreditReport.com 上免费拉取你的完整信用报告。值得花这 10 分钟吗？',
    choices: [
      {
        id: 'check-report',
        label: 'Check it',
        labelEs: 'Revisarlo',
        labelZh: '查一下',
        delta: 10,
        explanation:
          "Checking your OWN report is a soft inquiry — zero harm, ever. Good thing too: you find a card you never opened, dispute it, and it's removed.",
        explanationEs:
          'Revisar TU PROPIO reporte es una consulta blanda: nunca hace daño. Y menos mal: encuentras una tarjeta que nunca abriste, la disputas y la eliminan.',
        explanationZh:
          '查看「你自己的」报告是一次软查询——永远不会有任何损害。而且幸好查了：你发现了一张自己从没开过的卡，提出异议后它被删掉了。',
        factors: ['payment', 'new'],
      },
      {
        id: 'skip-report',
        label: 'Sounds boring',
        labelEs: 'Suena aburrido',
        labelZh: '听起来很无聊',
        delta: 0,
        explanation:
          'Nothing changes today — but about 1 in 4 credit reports contains an error, and errors you never see can quietly drag your score for years.',
        explanationEs:
          'Hoy no cambia nada, pero cerca de 1 de cada 4 reportes de crédito tiene un error, y los errores que nunca ves pueden arrastrar tu puntaje durante años sin que te des cuenta.',
        explanationZh:
          '今天什么都不会变——但大约每 4 份信用报告里就有 1 份含有错误，而那些你从没看到的错误，可能会在多年里悄悄拖累你的信用分。',
        factors: [],
      },
    ],
  },
  {
    emoji: '💻',
    title: 'The laptop',
    titleEs: 'La laptop',
    titleZh: '那台笔记本电脑',
    scenario: 'Your dream gaming laptop is $900. Your card limit is $1,000. It is ON SALE.',
    scenarioEs:
      'La laptop gamer de tus sueños cuesta $900. El límite de tu tarjeta es $1,000. Está EN OFERTA.',
    scenarioZh:
      '你梦寐以求的游戏本要 $900。你的卡额度是 $1,000。而它正在「打折」。',
    choices: [
      {
        id: 'save-up',
        label: 'Save cash for 3 more months',
        labelEs: 'Ahorrar en efectivo 3 meses más',
        labelZh: '再攒 3 个月现金',
        delta: 10,
        explanation:
          'Utilization stays low, zero interest paid, on-time streak continues. The laptop will still exist in October.',
        explanationEs:
          'El uso del crédito se mantiene bajo, cero intereses pagados y tu racha de pagos a tiempo continúa. La laptop seguirá existiendo en octubre.',
        explanationZh:
          '额度使用率保持在低位，一分利息都不用付，按时还款的连胜也在继续。到了十月，这台电脑还会在。',
        factors: ['utilization'],
      },
      {
        id: 'charge-it',
        label: "Charge it, pay it off 'eventually'",
        labelEs: 'Cargarla a la tarjeta y pagarla "algún día"',
        labelZh: '刷卡买下，「以后」再还',
        delta: -25,
        explanation:
          'A $900 balance on a $1,000 limit means 90% utilization gets reported this month. Lenders read that as maxed out.',
        explanationEs:
          'Un saldo de $900 con un límite de $1,000 significa que este mes se reporta un 90% de uso. Los prestamistas lo leen como tarjeta al tope.',
        explanationZh:
          '在 $1,000 额度上欠 $900，意味着本月上报的使用率是 90%。放贷方会把它解读为已经刷爆。',
        factors: ['utilization'],
      },
      {
        id: 'bnpl',
        label: "Split it into 4 'easy' payments",
        labelEs: 'Dividirla en 4 pagos "fáciles"',
        labelZh: '拆成 4 期「轻松」还款',
        delta: -5,
        explanation:
          'Buy-now-pay-later plans increasingly show up on credit reports — and a missed installment hurts just like a missed card payment.',
        explanationEs:
          'Los planes de "compra ahora, paga después" aparecen cada vez más en los reportes de crédito, y una cuota no pagada duele igual que un pago de tarjeta no hecho.',
        explanationZh:
          '「先买后付」计划越来越多地出现在信用报告上——而漏还一期的伤害，和漏还一次信用卡账单一样。',
        factors: ['new', 'payment'],
      },
    ],
  },
  {
    emoji: '🧱',
    title: 'Builder move',
    titleEs: 'Jugada para construir crédito',
    titleZh: '养信用的一招',
    scenario:
      'Your credit union offers a $300 credit-builder loan: pay $25/month for a year, get the money back at the end, payments reported to the bureaus.',
    scenarioEs:
      'Tu cooperativa de crédito ofrece un préstamo para construir crédito de $300: pagas $25 al mes durante un año, recibes el dinero de vuelta al final y los pagos se reportan a los burós de crédito.',
    scenarioZh:
      '你的信用合作社推出一笔 $300 的信用培养贷款：每月还 $25，为期一年，期末把钱如数退给你，还款记录会上报给征信机构。',
    choices: [
      {
        id: 'builder-loan',
        label: 'Take the builder loan',
        labelEs: 'Tomar el préstamo para construir crédito',
        labelZh: '办这笔信用培养贷款',
        delta: 10,
        explanation:
          'An installment loan next to your revolving card improves your credit mix, and every on-time payment feeds the biggest factor of all.',
        explanationEs:
          'Un préstamo a plazos junto a tu tarjeta rotativa mejora la variedad de tu crédito, y cada pago a tiempo alimenta el factor más importante de todos.',
        explanationZh:
          '在循环信用卡之外再有一笔分期贷款，会改善你的信用类型组合，而且每一次按时还款都在滋养占比最大的那个因素。',
        factors: ['mix', 'payment'],
      },
      {
        id: 'pass-loan',
        label: 'Pass for now',
        labelEs: 'Pasar por ahora',
        labelZh: '暂时先不办',
        delta: 5,
        explanation:
          'Totally reasonable. Your existing accounts keep aging, and account age is free points.',
        explanationEs:
          'Totalmente razonable. Tus cuentas actuales siguen ganando antigüedad, y la antigüedad de las cuentas son puntos gratis.',
        explanationZh:
          '完全合理。你现有的账户继续变老，而账户年龄就是白送的分数。',
        factors: ['length'],
      },
    ],
  },
  {
    emoji: '📱',
    title: 'The cracked screen finale',
    titleEs: 'El gran final de la pantalla rota',
    titleZh: '碎屏大结局',
    scenario:
      "Month 10: your phone screen finally gives out completely. You need a replacement — how do you pay?",
    scenarioEs:
      'Mes 10: la pantalla de tu teléfono finalmente muere por completo. Necesitas un reemplazo. ¿Cómo pagas?',
    scenarioZh:
      '第 10 个月：你的手机屏幕终于彻底罢工了。你得换一台——你怎么付钱？',
    choices: [
      {
        id: 'refurb-cash',
        label: 'Buy a refurbished one with savings',
        labelEs: 'Comprar uno reacondicionado con tus ahorros',
        labelZh: '用积蓄买一台翻新机',
        delta: 10,
        explanation:
          'No new debt, utilization untouched, and your on-time streak rolls on. Boring is beautiful.',
        explanationEs:
          'Sin deuda nueva, sin tocar tu uso del crédito y tu racha de pagos a tiempo continúa. Lo aburrido es hermoso.',
        explanationZh:
          '没有新债务，额度使用率纹丝不动，按时还款的连胜继续。无聊，才是最美的。',
        factors: ['utilization', 'payment'],
      },
      {
        id: 'carrier-plan',
        label: '0% carrier financing with autopay',
        labelEs: 'Financiamiento de la operadora al 0% con pago automático',
        labelZh: '运营商 0 利率分期，绑定自动还款',
        delta: 5,
        explanation:
          "A small installment loan paid on time is fine — it even adds to your mix. Just don't stack five of these.",
        explanationEs:
          'Un pequeño préstamo a plazos pagado a tiempo está bien; hasta suma a la variedad de tu crédito. Solo no acumules cinco de estos.',
        explanationZh:
          '一笔按时偿还的小额分期贷款没问题——它甚至会丰富你的信用类型组合。只是别一口气叠上五笔这样的。',
        factors: ['mix', 'payment'],
      },
      {
        id: 'max-card',
        label: 'New flagship on the credit card, pay minimums',
        labelEs: 'Un nuevo teléfono tope de gama a la tarjeta, pagando mínimos',
        labelZh: '刷卡买台新旗舰，只还最低额',
        delta: -30,
        explanation:
          'A big balance near your limit plus minimum payments means high utilization now and months of interest later.',
        explanationEs:
          'Un saldo grande cerca de tu límite más pagos mínimos significa uso alto ahora y meses de intereses después.',
        explanationZh:
          '一笔接近额度上限的大额欠款，再加上只还最低额，意味着现在使用率高企，往后还要付好几个月的利息。',
        factors: ['utilization'],
      },
    ],
  },
]

// ---------- Final titles ----------

function titleFor(score: number, es: boolean, zh: boolean): [title: string, emoji: string, blurb: string] {
  if (score >= 800)
    return zh
      ? ['信用传奇', '🏆', '一个极佳的分数。放贷方会为你铺上红地毯——所有产品都给你最优利率。']
      : es
      ? ['Leyenda del crédito', '🏆', 'Un puntaje excepcional. Los prestamistas te alfombrarán el camino: las mejores tasas en todo.']
      : ['Credit Legend', '🏆', 'An exceptional score. Lenders will roll out the red carpet — best rates on everything.']
  if (score >= 740)
    return zh
      ? ['信用分大师', '🥋', '很好。你养成了大多数成年人一辈子都没弄明白的好习惯。']
      : es
      ? ['Maestro del puntaje', '🥋', 'Muy bueno. Formaste hábitos que la mayoría de los adultos nunca logra entender.']
      : ['Score Sensei', '🥋', 'Very good. You built habits most adults never figure out.']
  if (score >= 670)
    return zh
      ? ['稳健的建设者', '🧱', '一个良好的分数——习惯稳定，成长稳定。继续一笔一笔地累积按时还款吧。']
      : es
      ? ['Constructor sólido', '🧱', 'Un buen puntaje: hábitos constantes, crecimiento constante. Sigue acumulando pagos a tiempo.']
      : ['Solid Builder', '🧱', 'A good score — steady habits, steady growth. Keep stacking on-time payments.']
  if (score >= 580)
    return zh
      ? ['仍在努力中', '🚧', '一般。有些选择让你付出了代价，但没有什么是持续按时还款修复不了的。']
      : es
      ? ['Trabajo en progreso', '🚧', 'Regular. Algunas decisiones te costaron, pero nada que los pagos constantes a tiempo no puedan reparar.']
      : ['Work in Progress', '🚧', "Fair. Some choices cost you, but nothing that consistent on-time payments can't repair."]
  return zh
    ? ['重建模式', '🔧', '信用分受到了实实在在的损伤。好消息是：还款记录会随时间慢慢愈合，从今天就开始。']
    : es
    ? ['Modo reconstrucción', '🔧', 'El puntaje sufrió un daño real. La buena noticia: el historial de pagos sana con el tiempo, empezando hoy.']
    : ['Rebuild Mode', '🔧', 'The score took real damage — the good news: payment history heals with time, starting today.']
}

function clampScore(n: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, n))
}

/** Map 300-850 linearly onto 0-100 for saved progress. */
function progressScore(score: number): number {
  return Math.round(((clampScore(score) - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100)
}

function deltaChip(delta: number, es: boolean, zh: boolean): { text: string; classes: string } {
  const pts = zh ? '分' : es ? 'puntos' : 'points'
  if (delta > 0) return { text: `+${delta} ${pts}`, classes: 'bg-green-100 text-green-700' }
  if (delta < 0) return { text: `${delta} ${pts}`, classes: 'bg-red-100 text-red-700' }
  return { text: `±0 ${pts}`, classes: 'bg-slate-100 text-slate-600' }
}

// ---------- Score meter ----------

function ScoreMeter({ score, es, zh }: { score: number; es: boolean; zh: boolean }) {
  const pct = ((score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100
  const band = bandFor(score)
  return (
    <div>
      <div
        className="relative"
        role="progressbar"
        aria-valuemin={SCORE_MIN}
        aria-valuemax={SCORE_MAX}
        aria-valuenow={score}
        aria-valuetext={`${score} — ${zh ? band.nameZh : es ? band.nameEs : band.name}`}
        aria-label={zh ? '信用分仪表' : es ? 'Medidor de puntaje de crédito' : 'Credit score meter'}
      >
        <div className="flex h-4 w-full overflow-hidden rounded-full">
          {BANDS.map((b) => (
            <div
              key={b.name}
              className={`h-full ${b.barClass}`}
              style={{ width: `${((b.max - b.min + 1) / (SCORE_MAX - SCORE_MIN + 1)) * 100}%` }}
            />
          ))}
        </div>
        {/* Marker */}
        <div
          aria-hidden="true"
          className="absolute -top-1 h-6 w-1.5 rounded-full bg-slate-900 shadow transition-all duration-500 ease-out"
          style={{ left: `calc(${pct}% - 3px)` }}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5" aria-hidden="true">
        {BANDS.map((b) => (
          <span
            key={b.name}
            className={`chip ${b.name === band.name ? b.chipClass : 'bg-slate-100 text-slate-600'}`}
          >
            {zh ? b.nameZh : es ? b.nameEs : b.name} {b.min}–{b.max}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------- Component ----------

interface HistoryEntry {
  month: number
  title: string
  choiceId: string
  choiceLabel: string
  choiceLabelEs: string
  choiceLabelZh: string
  delta: number
  explanation: string
  explanationEs: string
  explanationZh: string
}

export default function CreditScoreSim({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [monthIndex, setMonthIndex] = useState(0)
  const [score, setScore] = useState(START_SCORE)
  const [feedback, setFeedback] = useState<Choice | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [done, setDone] = useState(false)

  const studentRef = useRef(student)
  studentRef.current = student

  // Mark the activity as started once.
  useEffect(() => {
    void saveProgress(studentRef.current, 'credit-score-sim', { status: 'started' })
  }, [])

  const month = MONTHS[monthIndex]
  const band = bandFor(score)

  function choose(choice: Choice) {
    if (feedback) return
    setScore((s) => clampScore(s + choice.delta))
    setFeedback(choice)
    setHistory((h) => [
      ...h,
      {
        month: monthIndex + 1,
        title: month.title,
        choiceId: choice.id,
        choiceLabel: choice.label,
        choiceLabelEs: choice.labelEs,
        choiceLabelZh: choice.labelZh,
        delta: choice.delta,
        explanation: choice.explanation,
        explanationEs: choice.explanationEs,
        explanationZh: choice.explanationZh,
      },
    ])
  }

  function nextMonth() {
    if (monthIndex + 1 >= MONTHS.length) {
      setDone(true)
      window.scrollTo({ top: 0 })
      void saveProgress(studentRef.current, 'credit-score-sim', {
        status: 'completed',
        score: progressScore(score),
        data: { finalScore: score, choices: history.map((h) => h.choiceId) },
      })
      onComplete?.(progressScore(score))
    } else {
      setMonthIndex((i) => i + 1)
      setFeedback(null)
      window.scrollTo({ top: 0 })
    }
  }

  function playAgain() {
    setMonthIndex(0)
    setScore(START_SCORE)
    setFeedback(null)
    setHistory([])
    setDone(false)
    window.scrollTo({ top: 0 })
  }

  // ---------- Final screen ----------
  if (done) {
    const [title, emoji, blurb] = titleFor(score, es, zh)
    const best = history.reduce((a, b) => (b.delta > a.delta ? b : a), history[0])
    const worst = history.reduce((a, b) => (b.delta < a.delta ? b : a), history[0])
    const pts = zh ? '分' : es ? 'puntos' : 'points'
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="card animate-pop-in space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{emoji}</p>
          <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
          <p className="font-display text-lg font-bold text-bff-700">
            {zh ? '最终分数' : es ? 'Puntaje final' : 'Final score'}: {score} — {zh ? band.nameZh : es ? band.nameEs : band.name}
          </p>
          <p className="mx-auto max-w-md text-sm text-slate-700">{blurb}</p>
          <div className="px-2 pt-2 text-left">
            <ScoreMeter score={score} es={es} zh={zh} />
          </div>
          <p className="text-xs text-slate-500">
            {zh ? '起始' : es ? 'Empezaste en' : 'Started at'} {START_SCORE} ·{' '}
            {zh ? '结束' : es ? 'terminaste en' : 'finished at'} {score} (
            {score - START_SCORE >= 0 ? '+' : ''}
            {score - START_SCORE} {zh ? '，历时 10 个月' : es ? 'en 10 meses' : 'over 10 months'})
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="card animate-slide-up border-green-200 bg-green-50">
            <h2 className="font-display text-base font-bold text-slate-900">
              <span aria-hidden="true">🌟</span> {zh ? '最佳操作' : es ? 'Mejor jugada' : 'Best move'}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {zh ? '第' : es ? 'Mes' : 'Month'} {best.month}{zh ? ' 个月' : ''}: {zh ? best.choiceLabelZh : es ? best.choiceLabelEs : best.choiceLabel}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {best.delta >= 0 ? `+${best.delta}` : best.delta} {pts} —{' '}
              {zh ? best.explanationZh : es ? best.explanationEs : best.explanation}
            </p>
          </div>
          <div className="card animate-slide-up border-red-200 bg-red-50">
            <h2 className="font-display text-base font-bold text-slate-900">
              <span aria-hidden="true">🕳️</span> {zh ? '代价最大的操作' : es ? 'Jugada más costosa' : 'Costliest move'}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {zh ? '第' : es ? 'Mes' : 'Month'} {worst.month}{zh ? ' 个月' : ''}: {zh ? worst.choiceLabelZh : es ? worst.choiceLabelEs : worst.choiceLabel}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {worst.delta >= 0 ? `+${worst.delta}` : worst.delta} {pts} —{' '}
              {zh ? worst.explanationZh : es ? worst.explanationEs : worst.explanation}
            </p>
          </div>
        </div>

        <div className="card mt-4 border-bff-200 bg-bff-50">
          <h2 className="font-display text-lg font-bold text-slate-900">
            <Lightbulb className="mr-1 inline-block h-5 w-5 align-[-0.2em] text-bff-600" aria-hidden="true" />{' '}
            {zh ? '配方永远不变' : es ? 'La receta nunca cambia' : 'The recipe never changes'}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {zh
              ? '每一张账单都按时还，把欠款保持在低位，让账户慢慢变老，少开新的信用账户。这就是全部的通关秘籍——下面这五个因素就是 FICO 衡量它的方式。'
              : es
              ? 'Paga cada factura a tiempo, mantén los saldos bajos, deja que las cuentas ganen antigüedad y abre crédito nuevo pocas veces. Ese es todo el truco: los cinco factores de abajo son cómo FICO lo mide.'
              : "Pay every bill on time, keep balances low, let accounts age, and open new credit rarely. That's the whole cheat code — the five factors below are how FICO weighs it."}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {(Object.keys(FACTORS) as Factor[]).map((f) => (
              <li key={f} className="chip bg-white text-bff-700">
                {zh ? FACTORS_ZH[f] : es ? FACTORS_ES[f] : FACTORS[f]}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={playAgain}>
            {zh ? '再玩 10 个月' : es ? 'Jugar 10 meses más' : 'Play 10 more months'}
          </button>
          <Link to="/activities" className="btn-primary">
            {zh ? '返回活动列表' : es ? 'Volver a las actividades' : 'Back to activities'}{' '}
            <ArrowRight className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Playing view ----------
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        <span aria-hidden="true">💳📈</span>{' '}
        {zh ? '信用分养成记' : es ? 'Constructor de Puntaje de Crédito' : 'Credit Score Builder'}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {zh
          ? '10 个月，10 个决定。养出那个跟随你一辈子的三位数。'
          : es
          ? '10 meses, 10 decisiones. Construye el número de tres dígitos que te acompaña toda la vida.'
          : '10 months, 10 decisions. Build the three-digit number that follows you for life.'}
      </p>

      {/* Score meter */}
      <section className="card mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-lg font-bold text-slate-900" aria-live="polite">
            {zh ? '分数' : es ? 'Puntaje' : 'Score'}: {score}{' '}
            <span className="font-semibold text-bff-700">— {zh ? band.nameZh : es ? band.nameEs : band.name}</span>
          </p>
          <p className="text-sm text-slate-500">
            {zh ? '第' : es ? 'Mes' : 'Month'} {monthIndex + 1} {zh ? '个月，共' : es ? 'de' : 'of'} {MONTHS.length}{zh ? ' 个月' : ''}
          </p>
        </div>
        <div className="mt-3">
          <ScoreMeter score={score} es={es} zh={zh} />
        </div>
      </section>

      {/* Decision card */}
      <section className="card mt-4">
        <h2 className="font-display text-lg font-bold text-slate-900">
          <span className="mr-1" aria-hidden="true">{month.emoji}</span>
          {zh ? '第' : es ? 'Mes' : 'Month'} {monthIndex + 1}{zh ? ' 个月' : ''}: {zh ? month.titleZh : es ? month.titleEs : month.title}
        </h2>
        <p className="mt-2 text-sm text-slate-700">{zh ? month.scenarioZh : es ? month.scenarioEs : month.scenario}</p>

        {feedback === null ? (
          <div className="mt-4 space-y-2">
            {month.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => choose(choice)}
                className="block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:border-bff-400 hover:bg-bff-50 active:scale-[0.98]"
              >
                {zh ? choice.labelZh : es ? choice.labelEs : choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 animate-pop-in rounded-xl border-2 border-bff-200 bg-bff-50 p-4" role="status">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`chip ${deltaChip(feedback.delta, es, zh).classes}`}>
                {deltaChip(feedback.delta, es, zh).text}
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {zh ? feedback.labelZh : es ? feedback.labelEs : feedback.label}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              {zh ? feedback.explanationZh : es ? feedback.explanationEs : feedback.explanation}
            </p>
            {feedback.factors.length > 0 && (
              <ul
                className="mt-3 flex flex-wrap gap-1.5"
                aria-label={zh ? '涉及的信用分因素' : es ? 'Factores del puntaje de crédito involucrados' : 'Credit score factors involved'}
              >
                {feedback.factors.map((f) => (
                  <li key={f} className="chip bg-white text-bff-700">
                    {zh ? FACTORS_ZH[f] : es ? FACTORS_ES[f] : FACTORS[f]}
                  </li>
                ))}
              </ul>
            )}
            <button className="btn-primary mt-4" onClick={nextMonth}>
              {monthIndex + 1 >= MONTHS.length
                ? zh
                  ? '查看你的最终分数'
                  : es
                  ? 'Ver tu puntaje final'
                  : 'See your final score'
                : zh
                  ? `进入第 ${monthIndex + 2} 个月`
                  : es
                  ? `Al mes ${monthIndex + 2}`
                  : `On to month ${monthIndex + 2}`}{' '}
              <ArrowRight className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
            </button>
          </div>
        )}
      </section>

      {/* Factor legend */}
      <section className="card mt-4 bg-slate-100/70 p-4">
        <h2 className="font-display text-sm font-bold text-slate-900">
          {zh ? '究竟是什么在左右一个信用分？' : es ? '¿Qué mueve realmente un puntaje de crédito?' : 'What actually moves a credit score?'}
        </h2>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {(Object.keys(FACTORS) as Factor[]).map((f) => (
            <li key={f} className="chip bg-white text-slate-600">
              {zh ? FACTORS_ZH[f] : es ? FACTORS_ES[f] : FACTORS[f]}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

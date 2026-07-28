import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Lightbulb, Receipt, Search, SearchCheck, Glasses, Frown, Flag,
  IceCream, Joystick, Sprout,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

/** Local icon lookup: data below stores a lucide icon NAME, never a glyph. */
const ITEM_ICONS: Record<string, LucideIcon> = {
  IceCream, Joystick, Sprout, SearchCheck, Search, Glasses, Frown,
}

// ---------- Round data (all numbers hand-checked for consistency) ----------
//
// The detective's rule: flag any line whose number doesn't match its own
// label's math, or a charge that shouldn't be there at all. Every clean line
// below is verifiable; every planted error is verifiable too.

type Section = 'earnings' | 'deductions' | 'summary'

interface StubLine {
  id: string
  section: Section
  label: string
  labelEs: string
  labelZh: string
  /** Small print under the label, e.g. the hours × rate the player can check. */
  detail?: string
  detailEs?: string
  detailZh?: string
  /** Displayed dollar amount (may be the planted error). */
  amount: string
  /** True if this line is a planted error the player should flag. */
  isError: boolean
  /**
   * If set, selecting this line ALSO counts as catching the error line with
   * that id (used for the duplicate state-tax pair — flagging either copy is
   * a legitimate catch, never a false alarm).
   */
  aliasOf?: string
  /** Shown on reveal: the correct math, whether the line is right or wrong. */
  reveal: string
  revealEs: string
  revealZh: string
}

interface StubRound {
  id: string
  worker: string
  /** Key into ITEM_ICONS. */
  icon: string
  employer: string
  period: string
  periodEs: string
  periodZh: string
  story: string
  storyEs: string
  storyZh: string
  errorCount: number
  lines: StubLine[]
}

const ROUNDS: StubRound[] = [
  {
    id: 'maya',
    worker: 'Maya Chen',
    icon: 'IceCream',
    employer: 'Scoop City Ice Cream',
    period: 'Jun 1 – Jun 14, 2026',
    periodEs: '1 – 14 de junio de 2026',
    periodZh: '2026 年 6 月 1 日 – 6 月 14 日',
    story:
      'Maya worked 22 hours scooping mint chip. Her paycheck feels lighter than she expected. Exactly 1 error hides on this stub.',
    storyEs:
      'Maya trabajó 22 horas sirviendo helado de menta con chocolate. Su cheque se siente más liviano de lo que esperaba. Exactamente 1 error se esconde en este comprobante.',
    storyZh:
      'Maya 花了 22 个小时舀薄荷巧克力片冰淇淋。她的工资感觉比预期的少。这张工资单上正好藏着 1 个错误。',
    errorCount: 1,
    lines: [
      {
        id: 'maya-gross',
        section: 'earnings',
        label: 'Gross pay',
        labelEs: 'Pago bruto',
        labelZh: '税前工资',
        detail: '22 hrs × $15.00/hr',
        detailEs: '22 hrs × $15.00/hr',
        detailZh: '22 hrs × $15.00/hr',
        amount: '$290.00',
        isError: true,
        reveal:
          '22 hrs × $15.00 = $330.00 — not $290.00. Maya was shorted $40 before taxes were even taken out.',
        revealEs:
          '22 hrs × $15.00 = $330.00 — no $290.00. A Maya le quitaron $40 antes de siquiera cobrar impuestos.',
        revealZh:
          '22 hrs × $15.00 = $330.00——不是 $290.00。还没扣税，Maya 就被少算了 $40。',
      },
      {
        id: 'maya-fed',
        section: 'deductions',
        label: 'Federal income tax',
        labelEs: 'Impuesto federal sobre la renta',
        labelZh: '联邦所得税',
        detail: 'Withholding from her W-4 form',
        detailEs: 'Retención de su formulario W-4',
        detailZh: '根据她的 W-4 表格代扣',
        amount: '$10.00',
        isError: false,
        reveal:
          'Federal withholding comes from the W-4 form Maya filled out when hired — $10.00 matches it. Nothing to recompute here.',
        revealEs:
          'La retención federal viene del formulario W-4 que Maya llenó al ser contratada — $10.00 coincide. Nada que recalcular aquí.',
        revealZh:
          '联邦代扣税来自 Maya 入职时填的 W-4 表格——$10.00 是对得上的。这里没什么要重新算的。',
      },
      {
        id: 'maya-state',
        section: 'deductions',
        label: 'State income tax',
        labelEs: 'Impuesto estatal sobre la renta',
        labelZh: '州所得税',
        detail: '2.0% of gross',
        detailEs: '2.0% del bruto',
        detailZh: '税前工资的 2.0%',
        amount: '$6.60',
        isError: false,
        reveal:
          '2.0% of the real gross: $330.00 × 0.02 = $6.60. Correct — payroll taxed her true earnings.',
        revealEs:
          '2.0% del bruto real: $330.00 × 0.02 = $6.60. Correcto — nómina gravó sus ingresos reales.',
        revealZh:
          '真实税前工资的 2.0%：$330.00 × 0.02 = $6.60。正确——工资部门是按她的真实收入计税的。',
      },
      {
        id: 'maya-ss',
        section: 'deductions',
        label: 'Social Security',
        labelEs: 'Seguro Social',
        labelZh: 'Social Security',
        detail: '6.2% of gross',
        detailEs: '6.2% del bruto',
        detailZh: '税前工资的 6.2%',
        amount: '$20.46',
        isError: false,
        reveal: '6.2% of the real gross: $330.00 × 0.062 = $20.46. Correct.',
        revealEs: '6.2% del bruto real: $330.00 × 0.062 = $20.46. Correcto.',
        revealZh: '真实税前工资的 6.2%：$330.00 × 0.062 = $20.46。正确。',
      },
      {
        id: 'maya-medicare',
        section: 'deductions',
        label: 'Medicare',
        labelEs: 'Medicare',
        labelZh: 'Medicare',
        detail: '1.45% of gross',
        detailEs: '1.45% del bruto',
        detailZh: '税前工资的 1.45%',
        amount: '$4.79',
        isError: false,
        reveal: '1.45% of the real gross: $330.00 × 0.0145 = $4.785, which rounds to $4.79. Correct.',
        revealEs: '1.45% del bruto real: $330.00 × 0.0145 = $4.785, que se redondea a $4.79. Correcto.',
        revealZh: '真实税前工资的 1.45%：$330.00 × 0.0145 = $4.785，四舍五入为 $4.79。正确。',
      },
      {
        id: 'maya-total-ded',
        section: 'summary',
        label: 'Total deductions',
        labelEs: 'Total de deducciones',
        labelZh: '扣除项合计',
        amount: '$41.85',
        isError: false,
        reveal: '$10.00 + $6.60 + $20.46 + $4.79 = $41.85. The addition checks out.',
        revealEs: '$10.00 + $6.60 + $20.46 + $4.79 = $41.85. La suma cuadra.',
        revealZh: '$10.00 + $6.60 + $20.46 + $4.79 = $41.85。加起来没错。',
      },
      {
        id: 'maya-net',
        section: 'summary',
        label: 'Net pay',
        labelEs: 'Pago neto',
        labelZh: '税后实发工资',
        detail: 'What lands in her account',
        detailEs: 'Lo que llega a su cuenta',
        detailZh: '真正到她账户里的钱',
        amount: '$288.15',
        isError: false,
        reveal:
          '$330.00 (the REAL gross) − $41.85 = $288.15. This line was computed correctly — the typo lives up on the gross pay line.',
        revealEs:
          '$330.00 (el bruto REAL) − $41.85 = $288.15. Esta línea se calculó bien — el error está arriba, en la línea del pago bruto.',
        revealZh:
          '$330.00（真实税前工资）− $41.85 = $288.15。这一行算得没错——出错的是上面那行税前工资。',
      },
    ],
  },
  {
    id: 'darius',
    worker: 'Darius Webb',
    icon: 'Joystick',
    employer: 'Pixel Palace Arcade',
    period: 'Jun 15 – Jun 28, 2026',
    periodEs: '15 – 28 de junio de 2026',
    periodZh: '2026 年 6 月 15 日 – 6 月 28 日',
    story:
      'Darius fixed claw machines for 25 hours. His manager said the uniform fee is $10 per paycheck — get that in writing, Darius. 2 errors hide on this stub.',
    storyEs:
      'Darius arregló máquinas de garra durante 25 horas. Su gerente dijo que la cuota del uniforme es de $10 por cheque — pídelo por escrito, Darius. 2 errores se esconden en este comprobante.',
    storyZh:
      'Darius 修抓娃娃机修了 25 个小时。他的经理说制服费是每张工资单扣 $10——Darius，这个要让他写下来。这张工资单上藏着 2 个错误。',
    errorCount: 2,
    lines: [
      {
        id: 'darius-gross',
        section: 'earnings',
        label: 'Gross pay',
        labelEs: 'Pago bruto',
        labelZh: '税前工资',
        detail: '25 hrs × $16.00/hr',
        detailEs: '25 hrs × $16.00/hr',
        detailZh: '25 hrs × $16.00/hr',
        amount: '$400.00',
        isError: false,
        reveal: '25 hrs × $16.00 = $400.00. Correct.',
        revealEs: '25 hrs × $16.00 = $400.00. Correcto.',
        revealZh: '25 hrs × $16.00 = $400.00。正确。',
      },
      {
        id: 'darius-fed',
        section: 'deductions',
        label: 'Federal income tax',
        labelEs: 'Impuesto federal sobre la renta',
        labelZh: '联邦所得税',
        detail: 'Withholding from his W-4 form',
        detailEs: 'Retención de su formulario W-4',
        detailZh: '根据他的 W-4 表格代扣',
        amount: '$14.00',
        isError: false,
        reveal: 'Matches the withholding Darius chose on his W-4. Nothing to recompute here.',
        revealEs: 'Coincide con la retención que Darius eligió en su W-4. Nada que recalcular aquí.',
        revealZh: '和 Darius 在 W-4 上选的代扣金额一致。这里没什么要重新算的。',
      },
      {
        id: 'darius-state',
        section: 'deductions',
        label: 'State income tax',
        labelEs: 'Impuesto estatal sobre la renta',
        labelZh: '州所得税',
        detail: '3.0% of gross',
        detailEs: '3.0% del bruto',
        detailZh: '税前工资的 3.0%',
        amount: '$12.00',
        isError: false,
        reveal: '3.0% of $400.00 = $12.00. Correct.',
        revealEs: '3.0% de $400.00 = $12.00. Correcto.',
        revealZh: '$400.00 的 3.0% = $12.00。正确。',
      },
      {
        id: 'darius-ss',
        section: 'deductions',
        label: 'Social Security',
        labelEs: 'Seguro Social',
        labelZh: 'Social Security',
        detail: '6.2% of gross',
        detailEs: '6.2% del bruto',
        detailZh: '税前工资的 6.2%',
        amount: '$48.00',
        isError: true,
        reveal:
          'Social Security is 6.2%: $400.00 × 0.062 = $24.80. The $48.00 shown is 12% — Darius was charged nearly double the legal rate.',
        revealEs:
          'El Seguro Social es 6.2%: $400.00 × 0.062 = $24.80. Los $48.00 que aparecen son el 12% — a Darius le cobraron casi el doble de la tasa legal.',
        revealZh:
          'Social Security 是 6.2%：$400.00 × 0.062 = $24.80。显示的 $48.00 是 12%——Darius 被扣了差不多两倍于法定税率的钱。',
      },
      {
        id: 'darius-medicare',
        section: 'deductions',
        label: 'Medicare',
        labelEs: 'Medicare',
        labelZh: 'Medicare',
        detail: '1.45% of gross',
        detailEs: '1.45% del bruto',
        detailZh: '税前工资的 1.45%',
        amount: '$5.80',
        isError: false,
        reveal: '1.45% of $400.00 = $5.80. Correct.',
        revealEs: '1.45% de $400.00 = $5.80. Correcto.',
        revealZh: '$400.00 的 1.45% = $5.80。正确。',
      },
      {
        id: 'darius-uniform',
        section: 'deductions',
        label: 'Uniform fee',
        labelEs: 'Cuota del uniforme',
        labelZh: '制服费',
        detail: 'Agreed: $10.00 per paycheck',
        detailEs: 'Acordado: $10.00 por cheque',
        detailZh: '约定：每张工资单 $10.00',
        amount: '$20.00',
        isError: true,
        reveal:
          'The agreement was $10.00 per paycheck — this fee was charged twice. Always compare fees on your stub to what you agreed to in writing.',
        revealEs:
          'El acuerdo era de $10.00 por cheque — esta cuota se cobró dos veces. Siempre compara las cuotas de tu comprobante con lo que acordaste por escrito.',
        revealZh:
          '约定是每张工资单 $10.00——这笔费用被收了两次。永远要拿工资单上的费用和你书面约定的内容对照。',
      },
      {
        id: 'darius-total-ded',
        section: 'summary',
        label: 'Total deductions',
        labelEs: 'Total de deducciones',
        labelZh: '扣除项合计',
        amount: '$99.80',
        isError: false,
        reveal:
          'The lines shown do add to $99.80 — the addition is fine, but two of the lines being added are wrong. It should be $14.00 + $12.00 + $24.80 + $5.80 + $10.00 = $66.60.',
        revealEs:
          'Las líneas mostradas sí suman $99.80 — la suma está bien, pero dos de las líneas sumadas están mal. Debería ser $14.00 + $12.00 + $24.80 + $5.80 + $10.00 = $66.60.',
        revealZh:
          '显示的这几行加起来确实是 $99.80——加法本身没错，但被加的其中两行是错的。正确的应该是 $14.00 + $12.00 + $24.80 + $5.80 + $10.00 = $66.60。',
      },
      {
        id: 'darius-net',
        section: 'summary',
        label: 'Net pay',
        labelEs: 'Pago neto',
        labelZh: '税后实发工资',
        detail: 'What lands in his account',
        detailEs: 'Lo que llega a su cuenta',
        detailZh: '真正到他账户里的钱',
        amount: '$300.20',
        isError: false,
        reveal:
          '$400.00 − $99.80 = $300.20, so the subtraction itself is right. With the two bad deductions fixed, Darius should take home $400.00 − $66.60 = $333.40.',
        revealEs:
          '$400.00 − $99.80 = $300.20, así que la resta en sí está bien. Con las dos deducciones malas corregidas, Darius debería llevarse a casa $400.00 − $66.60 = $333.40.',
        revealZh:
          '$400.00 − $99.80 = $300.20，所以减法本身没错。把那两笔算错的扣除项改正后，Darius 应该拿到 $400.00 − $66.60 = $333.40。',
      },
    ],
  },
  {
    id: 'sofia',
    worker: 'Sofia Ramirez',
    icon: 'Sprout',
    employer: 'Green Thumb Garden Center',
    period: 'Jul 1 – Jul 14, 2026',
    periodEs: '1 – 14 de julio de 2026',
    periodZh: '2026 年 7 月 1 日 – 7 月 14 日',
    story:
      'Sofia watered 4,000 succulents across 30 hours. At first glance this check looks GREAT — suspiciously great. 2 errors hide on this stub.',
    storyEs:
      'Sofia regó 4,000 suculentas a lo largo de 30 horas. A primera vista este cheque se ve GENIAL — sospechosamente genial. 2 errores se esconden en este comprobante.',
    storyZh:
      'Sofia 花了 30 个小时给 4,000 株多肉植物浇水。乍一看这张工资单好得很——好得可疑。这张工资单上藏着 2 个错误。',
    errorCount: 2,
    lines: [
      {
        id: 'sofia-gross',
        section: 'earnings',
        label: 'Gross pay',
        labelEs: 'Pago bruto',
        labelZh: '税前工资',
        detail: '30 hrs × $14.50/hr',
        detailEs: '30 hrs × $14.50/hr',
        detailZh: '30 hrs × $14.50/hr',
        amount: '$435.00',
        isError: false,
        reveal: '30 hrs × $14.50 = $435.00. Correct.',
        revealEs: '30 hrs × $14.50 = $435.00. Correcto.',
        revealZh: '30 hrs × $14.50 = $435.00。正确。',
      },
      {
        id: 'sofia-fed',
        section: 'deductions',
        label: 'Federal income tax',
        labelEs: 'Impuesto federal sobre la renta',
        labelZh: '联邦所得税',
        detail: 'Withholding from her W-4 form',
        detailEs: 'Retención de su formulario W-4',
        detailZh: '根据她的 W-4 表格代扣',
        amount: '$16.00',
        isError: false,
        reveal: 'Matches the withholding Sofia chose on her W-4. Nothing to recompute here.',
        revealEs: 'Coincide con la retención que Sofia eligió en su W-4. Nada que recalcular aquí.',
        revealZh: '和 Sofia 在 W-4 上选的代扣金额一致。这里没什么要重新算的。',
      },
      {
        id: 'sofia-state-1',
        section: 'deductions',
        label: 'State income tax',
        labelEs: 'Impuesto estatal sobre la renta',
        labelZh: '州所得税',
        detail: '2.5% of gross',
        detailEs: '2.5% del bruto',
        detailZh: '税前工资的 2.5%',
        amount: '$10.88',
        isError: false,
        aliasOf: 'sofia-state-2',
        reveal:
          '2.5% of $435.00 = $10.875, which rounds to $10.88, so this line’s own math is fine — but the SAME tax appears twice on this stub. Flagging either copy counts as the catch.',
        revealEs:
          '2.5% de $435.00 = $10.875, que se redondea a $10.88, así que la matemática de esta línea está bien — pero el MISMO impuesto aparece dos veces en este comprobante. Marcar cualquiera de las dos copias cuenta como acierto.',
        revealZh:
          '$435.00 的 2.5% = $10.875，四舍五入为 $10.88，所以这一行本身的算法没错——但同一笔税在这张工资单上出现了两次。标记其中任意一份都算抓到。',
      },
      {
        id: 'sofia-state-2',
        section: 'deductions',
        label: 'State income tax',
        labelEs: 'Impuesto estatal sobre la renta',
        labelZh: '州所得税',
        detail: '2.5% of gross',
        detailEs: '2.5% del bruto',
        detailZh: '税前工资的 2.5%',
        amount: '$10.88',
        isError: true,
        reveal:
          'Duplicate! State income tax was already taken a line above — Sofia paid $10.88 twice for the same tax. One state, one state tax.',
        revealEs:
          '¡Duplicado! El impuesto estatal ya se cobró una línea arriba — Sofia pagó $10.88 dos veces por el mismo impuesto. Un estado, un impuesto estatal.',
        revealZh:
          '重复了！州所得税上面那一行已经扣过了——Sofia 为同一笔税付了两次 $10.88。一个州，只有一笔州税。',
      },
      {
        id: 'sofia-ss',
        section: 'deductions',
        label: 'Social Security',
        labelEs: 'Seguro Social',
        labelZh: 'Social Security',
        detail: '6.2% of gross',
        detailEs: '6.2% del bruto',
        detailZh: '税前工资的 6.2%',
        amount: '$26.97',
        isError: false,
        reveal: '6.2% of $435.00 = $26.97. Correct.',
        revealEs: '6.2% de $435.00 = $26.97. Correcto.',
        revealZh: '$435.00 的 6.2% = $26.97。正确。',
      },
      {
        id: 'sofia-medicare',
        section: 'deductions',
        label: 'Medicare',
        labelEs: 'Medicare',
        labelZh: 'Medicare',
        detail: '1.45% of gross',
        detailEs: '1.45% del bruto',
        detailZh: '税前工资的 1.45%',
        amount: '$6.31',
        isError: false,
        reveal: '1.45% of $435.00 = $6.3075, which rounds to $6.31. Correct.',
        revealEs: '1.45% de $435.00 = $6.3075, que se redondea a $6.31. Correcto.',
        revealZh: '$435.00 的 1.45% = $6.3075，四舍五入为 $6.31。正确。',
      },
      {
        id: 'sofia-total-ded',
        section: 'summary',
        label: 'Total deductions',
        labelEs: 'Total de deducciones',
        labelZh: '扣除项合计',
        amount: '$71.04',
        isError: false,
        reveal:
          'The lines shown do add to $71.04 — but one of them is a duplicate. The correct total is $16.00 + $10.88 + $26.97 + $6.31 = $60.16.',
        revealEs:
          'Las líneas mostradas sí suman $71.04 — pero una de ellas es un duplicado. El total correcto es $16.00 + $10.88 + $26.97 + $6.31 = $60.16.',
        revealZh:
          '显示的这几行加起来确实是 $71.04——但其中一行是重复的。正确的合计是 $16.00 + $10.88 + $26.97 + $6.31 = $60.16。',
      },
      {
        id: 'sofia-net',
        section: 'summary',
        label: 'Net pay',
        labelEs: 'Pago neto',
        labelZh: '税后实发工资',
        detail: 'What lands in her account',
        detailEs: 'Lo que llega a su cuenta',
        detailZh: '真正到她账户里的钱',
        amount: '$506.04',
        isError: true,
        reveal:
          'Net pay can NEVER be bigger than gross pay! Someone ADDED the deductions instead of subtracting: $435.00 + $71.04 = $506.04. Correct net: $435.00 − $60.16 = $374.84. (Sadly, payroll always claws overpayments back.)',
        revealEs:
          '¡El pago neto NUNCA puede ser mayor que el pago bruto! Alguien SUMÓ las deducciones en vez de restarlas: $435.00 + $71.04 = $506.04. Neto correcto: $435.00 − $60.16 = $374.84. (Lamentablemente, nómina siempre recupera los pagos de más.)',
        revealZh:
          '税后实发工资绝不可能比税前工资还高！有人把扣除项加上去了，而不是减掉：$435.00 + $71.04 = $506.04。正确的税后工资：$435.00 − $60.16 = $374.84。（可惜，工资部门总会把多发的钱追回去。）',
      },
    ],
  },
]

const TOTAL_ERRORS = ROUNDS.reduce((sum, r) => sum + r.errorCount, 0) // 5
const POINTS_PER_CATCH = 20 // 5 × 20 = 100 max
const FALSE_ALARM_PENALTY = 5

// ---------- Scoring ----------

type LineStatus = 'caught' | 'missed' | 'false' | 'clean' | 'twin'

interface RoundResult {
  found: number
  falseAlarms: number
  points: number
  statuses: Record<string, LineStatus>
}

function scoreRound(round: StubRound, selected: ReadonlySet<string>): RoundResult {
  // Which error lines were caught (directly, or via their alias twin)?
  const caught = new Set<string>()
  for (const line of round.lines) {
    if (!selected.has(line.id)) continue
    if (line.isError) caught.add(line.id)
    else if (line.aliasOf) caught.add(line.aliasOf)
  }

  const statuses: Record<string, LineStatus> = {}
  let falseAlarms = 0
  for (const line of round.lines) {
    if (line.isError) {
      statuses[line.id] = caught.has(line.id) ? 'caught' : 'missed'
    } else if (line.aliasOf) {
      // Flagging the twin is never a false alarm.
      statuses[line.id] = selected.has(line.id) ? 'twin' : 'clean'
    } else if (selected.has(line.id)) {
      statuses[line.id] = 'false'
      falseAlarms += 1
    } else {
      statuses[line.id] = 'clean'
    }
  }

  const found = caught.size
  return {
    found,
    falseAlarms,
    points: found * POINTS_PER_CATCH - falseAlarms * FALSE_ALARM_PENALTY,
    statuses,
  }
}

function gradeFor(score: number, es: boolean, zh: boolean): [title: string, icon: string, blurb: string] {
  if (score >= 90)
    return zh
      ? ['首席工资单稽查员', 'SearchCheck', '工资部门都怕你。什么都逃不过那把放大镜。']
      : es
      ? ['Inspector Jefe de Comprobantes', 'SearchCheck', 'Los departamentos de nómina te temen. Nada se le escapa a esa lupa.']
      : ['Chief Paystub Inspector', 'SearchCheck', 'Payroll departments fear you. Nothing gets past that magnifying glass.']
  if (score >= 70)
    return zh
      ? ['火眼金睛审计员', 'Search', '大部分猫腻你都抓到了——你未来的工资单有着落了。']
      : es
      ? ['Auditor de Ojo Agudo', 'Search', 'Atrapaste la mayoría de los enredos — tus futuros cheques están en buenas manos.']
      : ['Sharp-Eyed Auditor', 'Search', 'You caught most of the funny business — your future paychecks are in good hands.']
  if (score >= 45)
    return zh
      ? ['新手侦探', 'Glasses', '你嗅出了一些错误——继续练习"小时数 × 时薪"的算法。']
      : es
      ? ['Detective Novato', 'Glasses', 'Olfateaste algunos errores — sigue practicando esa matemática de horas × tarifa.']
      : ['Rookie Detective', 'Glasses', 'You sniffed out some errors — keep practicing that hours × rate math.']
  return zh
    ? ['工资部门蒙混过关了', 'Frown', '这次错误溜走了。再来一次——你的钱值得你多核对一遍。']
    : es
    ? ['La Nómina Se Salió con la Suya', 'Frown', 'Los errores se escaparon esta vez. Inténtalo otra vez — tu dinero merece la doble revisión.']
    : ['Payroll Got Away With It', 'Frown', 'The errors slipped by this time. Run it back — your money is worth the double-check.']
}

// ---------- Presentational helpers ----------

const SECTION_TITLES: Record<Section, string> = {
  earnings: 'Earnings',
  deductions: 'Deductions',
  summary: 'Summary',
}

const SECTION_TITLES_ES: Record<Section, string> = {
  earnings: 'Ingresos',
  deductions: 'Deducciones',
  summary: 'Resumen',
}

const SECTION_TITLES_ZH: Record<Section, string> = {
  earnings: '收入',
  deductions: '扣除项',
  summary: '汇总',
}

function statusChip(status: LineStatus, es: boolean, zh: boolean): { text: string; classes: string } | null {
  switch (status) {
    case 'caught':
      return { text: `${zh ? '抓到了！' : es ? '¡Atrapado!' : 'Caught!'} +${POINTS_PER_CATCH}`, classes: 'bg-green-100 text-green-700' }
    case 'missed':
      return { text: zh ? '漏掉的错误' : es ? 'Error no detectado' : 'Missed error', classes: 'bg-red-100 text-red-700' }
    case 'false':
      return { text: `${zh ? '误报' : es ? 'Falsa alarma' : 'False alarm'} −${FALSE_ALARM_PENALTY}`, classes: 'bg-amber-100 text-amber-700' }
    case 'twin':
      return { text: zh ? '同一处，算对' : es ? 'Mismo acierto' : 'Same catch', classes: 'bg-green-100 text-green-700' }
    case 'clean':
      return null
  }
}

function revealRowClasses(status: LineStatus): string {
  switch (status) {
    case 'caught':
    case 'twin':
      return 'border-green-500 bg-green-50'
    case 'missed':
      return 'border-red-400 bg-red-50'
    case 'false':
      return 'border-amber-400 bg-amber-50'
    case 'clean':
      return 'border-slate-200 bg-white'
  }
}

// ---------- Component ----------

type Phase = 'picking' | 'reveal' | 'done'

export default function PaystubDetective({ onComplete }: LiveGameProps) {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [roundIndex, setRoundIndex] = useState(0)
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())
  const [phase, setPhase] = useState<Phase>('picking')
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null)
  const [totalFound, setTotalFound] = useState(0)
  const [totalFalse, setTotalFalse] = useState(0)
  const [rawScore, setRawScore] = useState(0)

  const studentRef = useRef(student)
  studentRef.current = student

  // Mark the activity as started once.
  useEffect(() => {
    void saveProgress(studentRef.current, 'paystub-detective', { status: 'started' })
  }, [])

  const round = ROUNDS[roundIndex]
  const score = Math.max(0, Math.min(100, rawScore))

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function submitRound() {
    if (selected.size === 0) return
    const result = scoreRound(round, selected)
    setRoundResult(result)
    setTotalFound((n) => n + result.found)
    setTotalFalse((n) => n + result.falseAlarms)
    setRawScore((n) => n + result.points)
    setPhase('reveal')
  }

  function nextRound() {
    if (roundIndex + 1 >= ROUNDS.length) {
      setPhase('done')
      window.scrollTo({ top: 0 })
      void saveProgress(studentRef.current, 'paystub-detective', {
        status: 'completed',
        score,
        data: { found: totalFound, falseAccusations: totalFalse },
      })
      onComplete?.(score)
    } else {
      setRoundIndex((i) => i + 1)
      setSelected(new Set())
      setRoundResult(null)
      setPhase('picking')
      window.scrollTo({ top: 0 })
    }
  }

  function playAgain() {
    setRoundIndex(0)
    setSelected(new Set())
    setRoundResult(null)
    setTotalFound(0)
    setTotalFalse(0)
    setRawScore(0)
    setPhase('picking')
    window.scrollTo({ top: 0 })
  }

  // ---------- Final screen ----------
  if (phase === 'done') {
    const [title, gradeIcon, blurb] = gradeFor(score, es, zh)
    const GradeIcon = ITEM_ICONS[gradeIcon]
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="card animate-pop-in space-y-4 text-center" role="status">
          <GradeIcon className="mx-auto h-14 w-14 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="mx-auto max-w-md text-sm text-slate-700">{blurb}</p>
          <div className="mx-auto flex max-w-md flex-wrap justify-center gap-2 text-sm">
            <span className="chip bg-green-100 text-green-700">
              {zh
                ? `抓到 ${totalFound} / ${TOTAL_ERRORS} 个错误`
                : es
                ? `${totalFound} de ${TOTAL_ERRORS} errores atrapados`
                : `${totalFound} of ${TOTAL_ERRORS} errors caught`}
            </span>
            <span className="chip bg-amber-100 text-amber-700">
              {zh
                ? `${totalFalse} 次误报`
                : es
                ? `${totalFalse} falsa${totalFalse === 1 ? '' : 's'} alarma${totalFalse === 1 ? '' : 's'}`
                : `${totalFalse} false alarm${totalFalse === 1 ? '' : 's'}`}
            </span>
          </div>
        </div>

        <div className="card mt-4 animate-slide-up border-bff-200 bg-bff-50">
          <h2 className="font-display text-lg font-bold text-slate-900">
            <Lightbulb className="mr-1 inline-block h-5 w-5 align-[-0.2em] text-bff-600" aria-hidden="true" /> {zh ? '关键要点' : es ? 'La lección clave' : 'The key takeaway'}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {zh
              ? '一定要核对你的工资单——错误很常见，而且那是你的钱。'
              : es
              ? 'Siempre revisa tu comprobante de pago — los errores son comunes y es TU dinero.'
              : "Always check your paystub — errors are common and it's YOUR money."}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>{zh ? '用你的小时数 × 你的时薪。每一次都应该等于税前工资。' : es ? 'Multiplica tus horas × tu tarifa. Debe ser igual al pago bruto, siempre.' : 'Multiply your hours × your rate. It should equal gross pay, every time.'}</li>
            <li>{zh ? '记住固定税率：Social Security 是税前工资的 6.2%，Medicare 是 1.45%。' : es ? 'Conoce las tasas fijas: el Seguro Social es 6.2% y Medicare es 1.45% del bruto.' : 'Know the fixed rates: Social Security is 6.2% and Medicare is 1.45% of gross.'}</li>
            <li>{zh ? '任何你没书面同意的费用都要质疑——还有任何出现两次的税。' : es ? 'Cuestiona cualquier cuota que no acordaste por escrito — y cualquier impuesto que aparezca dos veces.' : "Question any fee you didn't agree to in writing — and any tax listed twice."}</li>
            <li>{zh ? '税后实发工资应该等于税前工资减去扣除项，绝不可能比税前工资还高。' : es ? 'El pago neto debe ser igual al pago bruto menos las deducciones. Nunca puede ser mayor que el bruto.' : 'Net pay must equal gross pay minus deductions. It can never be bigger than gross.'}</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={playAgain}>
            {zh ? '再查一次' : es ? 'Investigar de nuevo' : 'Investigate again'}
          </button>
          <Link to="/activities" className="btn-primary">
            {zh ? '返回活动列表' : es ? 'Volver a las actividades' : 'Back to activities'} <ArrowRight className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Round view (picking or reveal) ----------
  const revealing = phase === 'reveal' && roundResult !== null
  const sections: Section[] = ['earnings', 'deductions', 'summary']
  const RoundIcon = ITEM_ICONS[round.icon]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh ? '第' : es ? 'Ronda' : 'Round'} {roundIndex + 1} {zh ? `轮，共 ${ROUNDS.length} 轮` : es ? 'de' : 'of'} {zh ? '' : ROUNDS.length}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            <Receipt className="inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />
            <Search className="ml-1 inline-block h-7 w-7 align-[-0.15em] text-bff-600" aria-hidden="true" />{' '}
            {zh ? (
              <>工资单<em>侦探</em></>
            ) : es ? (
              <>Detective de <em>Comprobantes</em></>
            ) : (
              <>Paystub <em>Detective</em></>
            )}
          </h1>
        </div>
        <p className="chip bg-bff-50 text-bff-700" aria-live="polite">
          {zh ? '得分' : es ? 'Puntaje' : 'Score'}: {score}
        </p>
      </div>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        {zh ? (
          <p>
            三个青少年打工者都怀疑自己的工资算错了——而工资单上的错误比你想的要常见。<strong>把每一行看起来可疑的都点一下</strong>，然后提交。如果某一行的数字和它自己标签上的算法对不上，或者有一笔本不该出现的费用，就标记这一行。每抓到一个 +{POINTS_PER_CATCH}；每次误报 −{FALSE_ALARM_PENALTY}。
          </p>
        ) : es ? (
          <p>
            Tres trabajadores adolescentes sospechan que sus cheques están mal — y los errores de
            nómina son más comunes de lo que crees. <strong>Toca cada línea que se vea sospechosa</strong>,
            luego envía. Marca una línea si su número no coincide con la matemática de su propia etiqueta,
            o si hay un cargo que no debería estar ahí. Cada acierto vale +{POINTS_PER_CATCH}; cada falsa
            alarma cuesta −{FALSE_ALARM_PENALTY}.
          </p>
        ) : (
          <p>
            Three teen workers suspect their paychecks are wrong — and payroll errors are more common
            than you'd think. <strong>Tap every line that looks fishy</strong>, then submit. Flag a
            line if its number doesn't match its own label's math, or if a charge shouldn't be there
            at all. Each catch is worth +{POINTS_PER_CATCH}; each false alarm costs −
            {FALSE_ALARM_PENALTY}.
          </p>
        )}
      </div>

      {/* Case briefing */}
      <div className="card mt-4">
        <p className="text-sm text-slate-700">
          <RoundIcon className="mr-1 inline-block h-5 w-5 align-[-0.2em] text-bff-600" aria-hidden="true" />
          <strong>{zh ? '案件' : es ? 'Caso' : 'Case'} #{roundIndex + 1}: {round.worker}</strong> — {zh ? round.storyZh : es ? round.storyEs : round.story}
        </p>
      </div>

      {/* The paystub */}
      <section className="card mt-4 p-0" aria-label={zh ? `${round.worker} 的工资单` : es ? `Comprobante de pago de ${round.worker}` : `Paystub for ${round.worker}`}>
        <div className="rounded-t-[7px] border-b border-slate-200 bg-slate-100 px-5 py-4">
          <p className="font-display text-base font-bold text-slate-900">{round.employer}</p>
          <p className="text-sm text-slate-600">
            {zh ? '员工' : es ? 'Empleado' : 'Employee'}: {round.worker} · {zh ? '工资周期' : es ? 'Periodo de pago' : 'Pay period'}: {zh ? round.periodZh : es ? round.periodEs : round.period}
          </p>
        </div>

        <div className="space-y-4 p-5">
          {sections.map((section) => (
            <div key={section}>
              <h2 className="font-display text-xs font-bold uppercase tracking-wide text-slate-600">
                {zh ? SECTION_TITLES_ZH[section] : es ? SECTION_TITLES_ES[section] : SECTION_TITLES[section]}
              </h2>
              <ul className="mt-1.5 space-y-1.5">
                {round.lines
                  .filter((l) => l.section === section)
                  .map((line) => {
                    const on = selected.has(line.id)
                    const status = revealing ? roundResult.statuses[line.id] : null

                    if (revealing && status) {
                      const chip = statusChip(status, es, zh)
                      return (
                        <li
                          key={line.id}
                          className={`animate-slide-up rounded-xl border-2 px-4 py-3 ${revealRowClasses(status)}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{zh ? line.labelZh : es ? line.labelEs : line.label}</p>
                              {line.detail && <p className="text-xs text-slate-600">{zh ? line.detailZh : es ? line.detailEs : line.detail}</p>}
                            </div>
                            <div className="text-right">
                              <p className="font-display text-sm font-bold text-slate-800">
                                {line.amount}
                              </p>
                              {chip && (
                                <span className={`chip mt-1 ${chip.classes}`}>{chip.text}</span>
                              )}
                            </div>
                          </div>
                          <p className="mt-2 border-t border-slate-200/70 pt-2 text-xs text-slate-700">
                            {zh ? line.revealZh : es ? line.revealEs : line.reveal}
                          </p>
                        </li>
                      )
                    }

                    return (
                      <li key={line.id}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(line.id)}
                          className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition active:scale-[0.98] ${
                            on
                              ? 'border-red-500 bg-red-50 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-bff-300'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{zh ? line.labelZh : es ? line.labelEs : line.label}</p>
                            {line.detail && <p className="text-xs text-slate-600">{zh ? line.detailZh : es ? line.detailEs : line.detail}</p>}
                          </div>
                          <div className="text-right">
                            <p className="font-display text-sm font-bold text-slate-800">
                              {line.amount}
                            </p>
                            <p className={`text-xs font-semibold ${on ? 'text-red-600' : 'text-slate-500'}`}>
                              {on ? (
                                <>
                                  {zh ? '已标记' : es ? 'Marcado' : 'Flagged'}{' '}
                                  <Flag className="inline-block h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" />
                                </>
                              ) : (
                                zh ? '看起来没问题' : es ? 'Se ve bien' : 'Looks fine'
                              )}
                            </p>
                          </div>
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Reveal summary + controls */}
      {revealing ? (
        <div className="card mt-4 animate-pop-in text-center" role="status">
          <h2 className="font-display text-lg font-bold text-slate-900">
            {zh ? `第 ${roundIndex + 1} 轮判定` : es ? `Veredicto de la ronda ${roundIndex + 1}` : `Round ${roundIndex + 1} verdict`}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {zh
              ? `你抓到了 ${round.errorCount} 个错误中的 ${roundResult.found} 个`
              : es
              ? `Atrapaste ${roundResult.found} de ${round.errorCount} error${round.errorCount === 1 ? '' : 'es'}`
              : `You caught ${roundResult.found} of ${round.errorCount} error${round.errorCount === 1 ? '' : 's'}`}
            {roundResult.falseAlarms > 0
              ? zh
                ? `，并且报了 ${roundResult.falseAlarms} 次误报`
                : es
                ? ` y levantaste ${roundResult.falseAlarms} falsa${roundResult.falseAlarms === 1 ? '' : 's'} alarma${roundResult.falseAlarms === 1 ? '' : 's'}`
                : ` and raised ${roundResult.falseAlarms} false alarm${roundResult.falseAlarms === 1 ? '' : 's'}`
              : zh
                ? '，没有任何误报'
                : es
                ? ' sin ninguna falsa alarma'
                : ' with zero false alarms'}
            {' — '}
            <strong className="text-bff-700">
              {roundResult.points >= 0 ? `+${roundResult.points}` : roundResult.points} {zh ? '分' : es ? 'puntos' : 'points'}
            </strong>
            {zh ? '。' : '.'}
          </p>
          <button className="btn-primary mt-4" onClick={nextRound}>
            {roundIndex + 1 >= ROUNDS.length
              ? zh ? '查看你的侦探评级' : es ? 'Ver tu calificación de detective' : 'See your detective rating'
              : zh ? '下一个案件' : es ? 'Siguiente caso' : 'Next case'}{' '}
            <ArrowRight className="inline-block h-4 w-4 align-[-0.15em]" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={submitRound}
            disabled={selected.size === 0}
          >
            {zh
              ? `提交本轮——已标记 ${selected.size} 行`
              : es
              ? `Enviar ronda — ${selected.size} línea${selected.size === 1 ? '' : 's'} marcada${selected.size === 1 ? '' : 's'}`
              : `Submit round — ${selected.size} line${selected.size === 1 ? '' : 's'} flagged`}
          </button>
          {selected.size === 0 && (
            <p className="mt-2 text-sm text-slate-500">
              {zh
                ? `至少标记一行可疑的才能提交。（这张工资单里藏着 ${round.errorCount} 个错误。）`
                : es
                ? `Marca al menos una línea sospechosa para enviar. (${round.errorCount} error${round.errorCount === 1 ? '' : 'es'} escondido${round.errorCount === 1 ? '' : 's'} en este comprobante.)`
                : `Flag at least one suspicious line to submit. (${round.errorCount} error${round.errorCount === 1 ? '' : 's'} hiding in this stub.)`}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

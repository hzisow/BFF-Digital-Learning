import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import type { LiveGameProps } from '../live/types'

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
  /** Small print under the label, e.g. the hours × rate the player can check. */
  detail?: string
  detailEs?: string
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
}

interface StubRound {
  id: string
  worker: string
  emoji: string
  employer: string
  period: string
  periodEs: string
  story: string
  storyEs: string
  errorCount: number
  lines: StubLine[]
}

const ROUNDS: StubRound[] = [
  {
    id: 'maya',
    worker: 'Maya Chen',
    emoji: '🍦',
    employer: 'Scoop City Ice Cream',
    period: 'Jun 1 – Jun 14, 2026',
    periodEs: '1 – 14 de junio de 2026',
    story:
      'Maya worked 22 hours scooping mint chip. Her paycheck feels lighter than she expected. Exactly 1 error hides on this stub.',
    storyEs:
      'Maya trabajó 22 horas sirviendo helado de menta con chocolate. Su cheque se siente más liviano de lo que esperaba. Exactamente 1 error se esconde en este comprobante.',
    errorCount: 1,
    lines: [
      {
        id: 'maya-gross',
        section: 'earnings',
        label: 'Gross pay',
        labelEs: 'Pago bruto',
        detail: '22 hrs × $15.00/hr',
        detailEs: '22 hrs × $15.00/hr',
        amount: '$290.00',
        isError: true,
        reveal:
          '22 hrs × $15.00 = $330.00 — not $290.00. Maya was shorted $40 before taxes were even taken out.',
        revealEs:
          '22 hrs × $15.00 = $330.00 — no $290.00. A Maya le quitaron $40 antes de siquiera cobrar impuestos.',
      },
      {
        id: 'maya-fed',
        section: 'deductions',
        label: 'Federal income tax',
        labelEs: 'Impuesto federal sobre la renta',
        detail: 'Withholding from her W-4 form',
        detailEs: 'Retención de su formulario W-4',
        amount: '$10.00',
        isError: false,
        reveal:
          'Federal withholding comes from the W-4 form Maya filled out when hired — $10.00 matches it. Nothing to recompute here.',
        revealEs:
          'La retención federal viene del formulario W-4 que Maya llenó al ser contratada — $10.00 coincide. Nada que recalcular aquí.',
      },
      {
        id: 'maya-state',
        section: 'deductions',
        label: 'State income tax',
        labelEs: 'Impuesto estatal sobre la renta',
        detail: '2.0% of gross',
        detailEs: '2.0% del bruto',
        amount: '$6.60',
        isError: false,
        reveal:
          '2.0% of the real gross: $330.00 × 0.02 = $6.60. Correct — payroll taxed her true earnings.',
        revealEs:
          '2.0% del bruto real: $330.00 × 0.02 = $6.60. Correcto — nómina gravó sus ingresos reales.',
      },
      {
        id: 'maya-ss',
        section: 'deductions',
        label: 'Social Security',
        labelEs: 'Seguro Social',
        detail: '6.2% of gross',
        detailEs: '6.2% del bruto',
        amount: '$20.46',
        isError: false,
        reveal: '6.2% of the real gross: $330.00 × 0.062 = $20.46. Correct.',
        revealEs: '6.2% del bruto real: $330.00 × 0.062 = $20.46. Correcto.',
      },
      {
        id: 'maya-medicare',
        section: 'deductions',
        label: 'Medicare',
        labelEs: 'Medicare',
        detail: '1.45% of gross',
        detailEs: '1.45% del bruto',
        amount: '$4.79',
        isError: false,
        reveal: '1.45% of the real gross: $330.00 × 0.0145 = $4.785, which rounds to $4.79. Correct.',
        revealEs: '1.45% del bruto real: $330.00 × 0.0145 = $4.785, que se redondea a $4.79. Correcto.',
      },
      {
        id: 'maya-total-ded',
        section: 'summary',
        label: 'Total deductions',
        labelEs: 'Total de deducciones',
        amount: '$41.85',
        isError: false,
        reveal: '$10.00 + $6.60 + $20.46 + $4.79 = $41.85. The addition checks out.',
        revealEs: '$10.00 + $6.60 + $20.46 + $4.79 = $41.85. La suma cuadra.',
      },
      {
        id: 'maya-net',
        section: 'summary',
        label: 'Net pay',
        labelEs: 'Pago neto',
        detail: 'What lands in her account',
        detailEs: 'Lo que llega a su cuenta',
        amount: '$288.15',
        isError: false,
        reveal:
          '$330.00 (the REAL gross) − $41.85 = $288.15. This line was computed correctly — the typo lives up on the gross pay line.',
        revealEs:
          '$330.00 (el bruto REAL) − $41.85 = $288.15. Esta línea se calculó bien — el error está arriba, en la línea del pago bruto.',
      },
    ],
  },
  {
    id: 'darius',
    worker: 'Darius Webb',
    emoji: '🕹️',
    employer: 'Pixel Palace Arcade',
    period: 'Jun 15 – Jun 28, 2026',
    periodEs: '15 – 28 de junio de 2026',
    story:
      'Darius fixed claw machines for 25 hours. His manager said the uniform fee is $10 per paycheck — get that in writing, Darius. 2 errors hide on this stub.',
    storyEs:
      'Darius arregló máquinas de garra durante 25 horas. Su gerente dijo que la cuota del uniforme es de $10 por cheque — pídelo por escrito, Darius. 2 errores se esconden en este comprobante.',
    errorCount: 2,
    lines: [
      {
        id: 'darius-gross',
        section: 'earnings',
        label: 'Gross pay',
        labelEs: 'Pago bruto',
        detail: '25 hrs × $16.00/hr',
        detailEs: '25 hrs × $16.00/hr',
        amount: '$400.00',
        isError: false,
        reveal: '25 hrs × $16.00 = $400.00. Correct.',
        revealEs: '25 hrs × $16.00 = $400.00. Correcto.',
      },
      {
        id: 'darius-fed',
        section: 'deductions',
        label: 'Federal income tax',
        labelEs: 'Impuesto federal sobre la renta',
        detail: 'Withholding from his W-4 form',
        detailEs: 'Retención de su formulario W-4',
        amount: '$14.00',
        isError: false,
        reveal: 'Matches the withholding Darius chose on his W-4. Nothing to recompute here.',
        revealEs: 'Coincide con la retención que Darius eligió en su W-4. Nada que recalcular aquí.',
      },
      {
        id: 'darius-state',
        section: 'deductions',
        label: 'State income tax',
        labelEs: 'Impuesto estatal sobre la renta',
        detail: '3.0% of gross',
        detailEs: '3.0% del bruto',
        amount: '$12.00',
        isError: false,
        reveal: '3.0% of $400.00 = $12.00. Correct.',
        revealEs: '3.0% de $400.00 = $12.00. Correcto.',
      },
      {
        id: 'darius-ss',
        section: 'deductions',
        label: 'Social Security',
        labelEs: 'Seguro Social',
        detail: '6.2% of gross',
        detailEs: '6.2% del bruto',
        amount: '$48.00',
        isError: true,
        reveal:
          'Social Security is 6.2%: $400.00 × 0.062 = $24.80. The $48.00 shown is 12% — Darius was charged nearly double the legal rate.',
        revealEs:
          'El Seguro Social es 6.2%: $400.00 × 0.062 = $24.80. Los $48.00 que aparecen son el 12% — a Darius le cobraron casi el doble de la tasa legal.',
      },
      {
        id: 'darius-medicare',
        section: 'deductions',
        label: 'Medicare',
        labelEs: 'Medicare',
        detail: '1.45% of gross',
        detailEs: '1.45% del bruto',
        amount: '$5.80',
        isError: false,
        reveal: '1.45% of $400.00 = $5.80. Correct.',
        revealEs: '1.45% de $400.00 = $5.80. Correcto.',
      },
      {
        id: 'darius-uniform',
        section: 'deductions',
        label: 'Uniform fee',
        labelEs: 'Cuota del uniforme',
        detail: 'Agreed: $10.00 per paycheck',
        detailEs: 'Acordado: $10.00 por cheque',
        amount: '$20.00',
        isError: true,
        reveal:
          'The agreement was $10.00 per paycheck — this fee was charged twice. Always compare fees on your stub to what you agreed to in writing.',
        revealEs:
          'El acuerdo era de $10.00 por cheque — esta cuota se cobró dos veces. Siempre compara las cuotas de tu comprobante con lo que acordaste por escrito.',
      },
      {
        id: 'darius-total-ded',
        section: 'summary',
        label: 'Total deductions',
        labelEs: 'Total de deducciones',
        amount: '$99.80',
        isError: false,
        reveal:
          'The lines shown do add to $99.80 — the addition is fine, but two of the lines being added are wrong. It should be $14.00 + $12.00 + $24.80 + $5.80 + $10.00 = $66.60.',
        revealEs:
          'Las líneas mostradas sí suman $99.80 — la suma está bien, pero dos de las líneas sumadas están mal. Debería ser $14.00 + $12.00 + $24.80 + $5.80 + $10.00 = $66.60.',
      },
      {
        id: 'darius-net',
        section: 'summary',
        label: 'Net pay',
        labelEs: 'Pago neto',
        detail: 'What lands in his account',
        detailEs: 'Lo que llega a su cuenta',
        amount: '$300.20',
        isError: false,
        reveal:
          '$400.00 − $99.80 = $300.20, so the subtraction itself is right. With the two bad deductions fixed, Darius should take home $400.00 − $66.60 = $333.40.',
        revealEs:
          '$400.00 − $99.80 = $300.20, así que la resta en sí está bien. Con las dos deducciones malas corregidas, Darius debería llevarse a casa $400.00 − $66.60 = $333.40.',
      },
    ],
  },
  {
    id: 'sofia',
    worker: 'Sofia Ramirez',
    emoji: '🪴',
    employer: 'Green Thumb Garden Center',
    period: 'Jul 1 – Jul 14, 2026',
    periodEs: '1 – 14 de julio de 2026',
    story:
      'Sofia watered 4,000 succulents across 30 hours. At first glance this check looks GREAT — suspiciously great. 2 errors hide on this stub.',
    storyEs:
      'Sofia regó 4,000 suculentas a lo largo de 30 horas. A primera vista este cheque se ve GENIAL — sospechosamente genial. 2 errores se esconden en este comprobante.',
    errorCount: 2,
    lines: [
      {
        id: 'sofia-gross',
        section: 'earnings',
        label: 'Gross pay',
        labelEs: 'Pago bruto',
        detail: '30 hrs × $14.50/hr',
        detailEs: '30 hrs × $14.50/hr',
        amount: '$435.00',
        isError: false,
        reveal: '30 hrs × $14.50 = $435.00. Correct.',
        revealEs: '30 hrs × $14.50 = $435.00. Correcto.',
      },
      {
        id: 'sofia-fed',
        section: 'deductions',
        label: 'Federal income tax',
        labelEs: 'Impuesto federal sobre la renta',
        detail: 'Withholding from her W-4 form',
        detailEs: 'Retención de su formulario W-4',
        amount: '$16.00',
        isError: false,
        reveal: 'Matches the withholding Sofia chose on her W-4. Nothing to recompute here.',
        revealEs: 'Coincide con la retención que Sofia eligió en su W-4. Nada que recalcular aquí.',
      },
      {
        id: 'sofia-state-1',
        section: 'deductions',
        label: 'State income tax',
        labelEs: 'Impuesto estatal sobre la renta',
        detail: '2.5% of gross',
        detailEs: '2.5% del bruto',
        amount: '$10.88',
        isError: false,
        aliasOf: 'sofia-state-2',
        reveal:
          '2.5% of $435.00 = $10.875 → $10.88, so this line’s own math is fine — but the SAME tax appears twice on this stub. Flagging either copy counts as the catch.',
        revealEs:
          '2.5% de $435.00 = $10.875 → $10.88, así que la matemática de esta línea está bien — pero el MISMO impuesto aparece dos veces en este comprobante. Marcar cualquiera de las dos copias cuenta como acierto.',
      },
      {
        id: 'sofia-state-2',
        section: 'deductions',
        label: 'State income tax',
        labelEs: 'Impuesto estatal sobre la renta',
        detail: '2.5% of gross',
        detailEs: '2.5% del bruto',
        amount: '$10.88',
        isError: true,
        reveal:
          'Duplicate! State income tax was already taken a line above — Sofia paid $10.88 twice for the same tax. One state, one state tax.',
        revealEs:
          '¡Duplicado! El impuesto estatal ya se cobró una línea arriba — Sofia pagó $10.88 dos veces por el mismo impuesto. Un estado, un impuesto estatal.',
      },
      {
        id: 'sofia-ss',
        section: 'deductions',
        label: 'Social Security',
        labelEs: 'Seguro Social',
        detail: '6.2% of gross',
        detailEs: '6.2% del bruto',
        amount: '$26.97',
        isError: false,
        reveal: '6.2% of $435.00 = $26.97. Correct.',
        revealEs: '6.2% de $435.00 = $26.97. Correcto.',
      },
      {
        id: 'sofia-medicare',
        section: 'deductions',
        label: 'Medicare',
        labelEs: 'Medicare',
        detail: '1.45% of gross',
        detailEs: '1.45% del bruto',
        amount: '$6.31',
        isError: false,
        reveal: '1.45% of $435.00 = $6.3075, which rounds to $6.31. Correct.',
        revealEs: '1.45% de $435.00 = $6.3075, que se redondea a $6.31. Correcto.',
      },
      {
        id: 'sofia-total-ded',
        section: 'summary',
        label: 'Total deductions',
        labelEs: 'Total de deducciones',
        amount: '$71.04',
        isError: false,
        reveal:
          'The lines shown do add to $71.04 — but one of them is a duplicate. The correct total is $16.00 + $10.88 + $26.97 + $6.31 = $60.16.',
        revealEs:
          'Las líneas mostradas sí suman $71.04 — pero una de ellas es un duplicado. El total correcto es $16.00 + $10.88 + $26.97 + $6.31 = $60.16.',
      },
      {
        id: 'sofia-net',
        section: 'summary',
        label: 'Net pay',
        labelEs: 'Pago neto',
        detail: 'What lands in her account',
        detailEs: 'Lo que llega a su cuenta',
        amount: '$506.04',
        isError: true,
        reveal:
          'Net pay can NEVER be bigger than gross pay! Someone ADDED the deductions instead of subtracting: $435.00 + $71.04 = $506.04. Correct net: $435.00 − $60.16 = $374.84. (Sadly, payroll always claws overpayments back.)',
        revealEs:
          '¡El pago neto NUNCA puede ser mayor que el pago bruto! Alguien SUMÓ las deducciones en vez de restarlas: $435.00 + $71.04 = $506.04. Neto correcto: $435.00 − $60.16 = $374.84. (Lamentablemente, nómina siempre recupera los pagos de más.)',
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

function gradeFor(score: number, es: boolean): [title: string, emoji: string, blurb: string] {
  if (score >= 90)
    return es
      ? ['Inspector Jefe de Comprobantes', '🕵️', 'Los departamentos de nómina te temen. Nada se le escapa a esa lupa.']
      : ['Chief Paystub Inspector', '🕵️', 'Payroll departments fear you. Nothing gets past that magnifying glass.']
  if (score >= 70)
    return es
      ? ['Auditor de Ojo Agudo', '🔎', 'Atrapaste la mayoría de los enredos — tus futuros cheques están en buenas manos.']
      : ['Sharp-Eyed Auditor', '🔎', 'You caught most of the funny business — your future paychecks are in good hands.']
  if (score >= 45)
    return es
      ? ['Detective Novato', '🧢', 'Olfateaste algunos errores — sigue practicando esa matemática de horas × tarifa.']
      : ['Rookie Detective', '🧢', 'You sniffed out some errors — keep practicing that hours × rate math.']
  return es
    ? ['La Nómina Se Salió con la Suya', '😅', 'Los errores se escaparon esta vez. Inténtalo otra vez — tu dinero merece la doble revisión.']
    : ['Payroll Got Away With It', '😅', 'The errors slipped by this time. Run it back — your money is worth the double-check.']
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

function statusChip(status: LineStatus, es: boolean): { text: string; classes: string } | null {
  switch (status) {
    case 'caught':
      return { text: `${es ? '¡Atrapado!' : 'Caught!'} +${POINTS_PER_CATCH}`, classes: 'bg-green-100 text-green-700' }
    case 'missed':
      return { text: es ? 'Error no detectado' : 'Missed error', classes: 'bg-red-100 text-red-700' }
    case 'false':
      return { text: `${es ? 'Falsa alarma' : 'False alarm'} −${FALSE_ALARM_PENALTY}`, classes: 'bg-amber-100 text-amber-700' }
    case 'twin':
      return { text: `${es ? 'Mismo acierto' : 'Same catch'} ✓`, classes: 'bg-green-100 text-green-700' }
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
    const [title, emoji, blurb] = gradeFor(score, es)
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="card animate-pop-in space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{emoji}</p>
          <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
          <p className="font-display text-lg font-bold text-bff-700">{score} / 100</p>
          <p className="mx-auto max-w-md text-sm text-slate-700">{blurb}</p>
          <div className="mx-auto flex max-w-md flex-wrap justify-center gap-2 text-sm">
            <span className="chip bg-green-100 text-green-700">
              {es
                ? `${totalFound} de ${TOTAL_ERRORS} errores atrapados`
                : `${totalFound} of ${TOTAL_ERRORS} errors caught`}
            </span>
            <span className="chip bg-amber-100 text-amber-700">
              {es
                ? `${totalFalse} falsa${totalFalse === 1 ? '' : 's'} alarma${totalFalse === 1 ? '' : 's'}`
                : `${totalFalse} false alarm${totalFalse === 1 ? '' : 's'}`}
            </span>
          </div>
        </div>

        <div className="card mt-4 animate-slide-up border-bff-200 bg-bff-50">
          <h2 className="font-display text-lg font-bold text-slate-900">
            <span aria-hidden="true">💡</span> {es ? 'La lección clave' : 'The key takeaway'}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {es
              ? 'Siempre revisa tu comprobante de pago — los errores son comunes y es TU dinero.'
              : "Always check your paystub — errors are common and it's YOUR money."}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>{es ? 'Multiplica tus horas × tu tarifa. Debe ser igual al pago bruto, siempre.' : 'Multiply your hours × your rate. It should equal gross pay, every time.'}</li>
            <li>{es ? 'Conoce las tasas fijas: el Seguro Social es 6.2% y Medicare es 1.45% del bruto.' : 'Know the fixed rates: Social Security is 6.2% and Medicare is 1.45% of gross.'}</li>
            <li>{es ? 'Cuestiona cualquier cuota que no acordaste por escrito — y cualquier impuesto que aparezca dos veces.' : "Question any fee you didn't agree to in writing — and any tax listed twice."}</li>
            <li>{es ? 'El pago neto debe ser igual al pago bruto menos las deducciones. Nunca puede ser mayor que el bruto.' : 'Net pay must equal gross pay minus deductions. It can never be bigger than gross.'}</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn-secondary" onClick={playAgain}>
            {es ? 'Investigar de nuevo' : 'Investigate again'}
          </button>
          <Link to="/activities" className="btn-primary">
            {es ? 'Volver a las actividades' : 'Back to activities'} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    )
  }

  // ---------- Round view (picking or reveal) ----------
  const revealing = phase === 'reveal' && roundResult !== null
  const sections: Section[] = ['earnings', 'deductions', 'summary']

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            <span aria-hidden="true">🧾🔍</span> {es ? 'Detective de Comprobantes' : 'Paystub Detective'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {es ? 'Ronda' : 'Round'} {roundIndex + 1} {es ? 'de' : 'of'} {ROUNDS.length}
          </p>
        </div>
        <p className="chip bg-bff-50 text-bff-700" aria-live="polite">
          {es ? 'Puntaje' : 'Score'}: {score}
        </p>
      </div>

      <div className="card mt-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
        {es ? (
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
          <span className="mr-1" aria-hidden="true">{round.emoji}</span>
          <strong>{es ? 'Caso' : 'Case'} #{roundIndex + 1}: {round.worker}</strong> — {es ? round.storyEs : round.story}
        </p>
      </div>

      {/* The paystub */}
      <section className="card mt-4 p-0" aria-label={es ? `Comprobante de pago de ${round.worker}` : `Paystub for ${round.worker}`}>
        <div className="rounded-t-2xl border-b border-slate-200 bg-slate-100 px-5 py-4">
          <p className="font-display text-base font-bold text-slate-900">{round.employer}</p>
          <p className="text-sm text-slate-600">
            {es ? 'Empleado' : 'Employee'}: {round.worker} · {es ? 'Periodo de pago' : 'Pay period'}: {es ? round.periodEs : round.period}
          </p>
        </div>

        <div className="space-y-4 p-5">
          {sections.map((section) => (
            <div key={section}>
              <h2 className="font-display text-xs font-bold uppercase tracking-wide text-slate-600">
                {es ? SECTION_TITLES_ES[section] : SECTION_TITLES[section]}
              </h2>
              <ul className="mt-1.5 space-y-1.5">
                {round.lines
                  .filter((l) => l.section === section)
                  .map((line) => {
                    const on = selected.has(line.id)
                    const status = revealing ? roundResult.statuses[line.id] : null

                    if (revealing && status) {
                      const chip = statusChip(status, es)
                      return (
                        <li
                          key={line.id}
                          className={`animate-slide-up rounded-xl border-2 px-4 py-3 ${revealRowClasses(status)}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{es ? line.labelEs : line.label}</p>
                              {line.detail && <p className="text-xs text-slate-600">{es ? line.detailEs : line.detail}</p>}
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
                            {es ? line.revealEs : line.reveal}
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
                          className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                            on
                              ? 'border-red-500 bg-red-50 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-bff-300'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{es ? line.labelEs : line.label}</p>
                            {line.detail && <p className="text-xs text-slate-600">{es ? line.detailEs : line.detail}</p>}
                          </div>
                          <div className="text-right">
                            <p className="font-display text-sm font-bold text-slate-800">
                              {line.amount}
                            </p>
                            <p className={`text-xs font-semibold ${on ? 'text-red-600' : 'text-slate-500'}`}>
                              {on ? (
                                <>
                                  {es ? 'Marcado' : 'Flagged'} <span aria-hidden="true">🚩</span>
                                </>
                              ) : (
                                es ? 'Se ve bien' : 'Looks fine'
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
            {es ? `Veredicto de la ronda ${roundIndex + 1}` : `Round ${roundIndex + 1} verdict`}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {es
              ? `Atrapaste ${roundResult.found} de ${round.errorCount} error${round.errorCount === 1 ? '' : 'es'}`
              : `You caught ${roundResult.found} of ${round.errorCount} error${round.errorCount === 1 ? '' : 's'}`}
            {roundResult.falseAlarms > 0
              ? es
                ? ` y levantaste ${roundResult.falseAlarms} falsa${roundResult.falseAlarms === 1 ? '' : 's'} alarma${roundResult.falseAlarms === 1 ? '' : 's'}`
                : ` and raised ${roundResult.falseAlarms} false alarm${roundResult.falseAlarms === 1 ? '' : 's'}`
              : es
                ? ' sin ninguna falsa alarma'
                : ' with zero false alarms'}
            {' — '}
            <strong className="text-bff-700">
              {roundResult.points >= 0 ? `+${roundResult.points}` : roundResult.points} {es ? 'puntos' : 'points'}
            </strong>
            .
          </p>
          <button className="btn-primary mt-4" onClick={nextRound}>
            {roundIndex + 1 >= ROUNDS.length
              ? es ? 'Ver tu calificación de detective' : 'See your detective rating'
              : es ? 'Siguiente caso' : 'Next case'}{' '}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={submitRound}
            disabled={selected.size === 0}
          >
            {es
              ? `Enviar ronda — ${selected.size} línea${selected.size === 1 ? '' : 's'} marcada${selected.size === 1 ? '' : 's'}`
              : `Submit round — ${selected.size} line${selected.size === 1 ? '' : 's'} flagged`}
          </button>
          {selected.size === 0 && (
            <p className="mt-2 text-sm text-slate-500">
              {es
                ? `Marca al menos una línea sospechosa para enviar. (${round.errorCount} error${round.errorCount === 1 ? '' : 'es'} escondido${round.errorCount === 1 ? '' : 's'} en este comprobante.)`
                : `Flag at least one suspicious line to submit. (${round.errorCount} error${round.errorCount === 1 ? '' : 's'} hiding in this stub.)`}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

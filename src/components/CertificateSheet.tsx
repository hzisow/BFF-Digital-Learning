// The certificate itself, as one component.
//
// It is rendered in three places now: the real thing on /certificate, a locked
// preview on that same page before it is earned, and the promo on the home
// page. Keeping one copy means the certificate a student is shown on day one
// is exactly the certificate they earn, down to the rule under the name. A
// mockup would drift from the real document within a release or two.

import { Trophy } from 'lucide-react'
import { Logo } from './Logo'

export interface CertificateSheetProps {
  name: string
  dateStr: string
  avgScore: number | null
  lang: string
}

export function CertificateSheet({ name, dateStr, avgScore, lang }: CertificateSheetProps) {
  const es = lang === 'es'
  const zh = lang === 'zh'
  return (
    <div className="certificate-sheet border-[3px] border-ink bg-white p-1.5 shadow-card">
      <div className="relative border border-ink/20 px-8 py-10 text-center sm:px-14 sm:py-14">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gold-400" />
        <Logo className="mx-auto h-12" />
        <p className="eyebrow mt-6 justify-center">
          {zh ? '成就证书' : es ? 'Certificado de logro' : 'Certificate of Achievement'}
        </p>
        <p className="mt-8 text-sm text-ink/60">
          {zh ? '荣誉授予' : es ? 'Se otorga con orgullo a' : 'Proudly presented to'}
        </p>
        <p className="mx-auto mt-3 max-w-xl border-b-2 border-ink/20 pb-3 font-display text-4xl font-extrabold text-ink sm:text-5xl">
          {name.trim() || (zh ? '在此填写你的名字' : es ? 'Tu nombre aquí' : 'Your name here')}
        </p>
        <p className="mx-auto mt-8 max-w-lg leading-relaxed text-ink/70">
          {zh
            ? '因成功完成 BFF Academy 金融素养课程，涵盖赚钱、预算、储蓄与投资、信用、保险、财务决策、规划和消费者保护的全部 8 节课。'
            : es
              ? 'por completar con éxito el plan de estudios de educación financiera BFF Academy, las 8 lecciones: ingresos, presupuesto, ahorro e inversión, crédito, seguros, decisiones financieras, planificación y protección al consumidor.'
              : 'for successfully completing the BFF Academy financial literacy curriculum, all 8 lessons spanning earning, budgeting, saving & investing, credit, insurance, financial decision-making, planning, and consumer protection.'}
        </p>
        {avgScore != null && (
          <p className="mt-5 inline-flex items-center gap-2 font-display font-bold text-bff-700">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            {zh ? `测验平均分：${avgScore}%` : es ? `Promedio de exámenes: ${avgScore}%` : `Quiz average: ${avgScore}%`}
          </p>
        )}
        {/* Values above their rules and labels below, matching the downloaded
            PDF. A student who prints this and a student who saves the file
            should end up holding the same document. */}
        <div className="mt-14 grid grid-cols-3 items-end gap-6">
          <div>
            <p className="pb-1.5 text-sm text-ink">{dateStr}</p>
            <p className="border-t border-ink/50 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/60">
              {zh ? '日期' : es ? 'Fecha' : 'Date'}
            </p>
          </div>
          <p className="self-end text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/60">
            Building Financial Futures of America
          </p>
          <div>
            <p className="pb-1 font-display text-xl italic text-ink">BFF of America</p>
            <p className="border-t border-ink/50 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/60">
              {zh ? 'BFF Academy 导师' : es ? 'Mentor de BFF Academy' : 'BFF Academy Mentor'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * The same sheet shrunk to fit a card, for the home page promo and the locked
 * state.
 *
 * It renders at a fixed 760px and is shrunk rather than reflowed, because the
 * sheet's type is set with viewport breakpoints: dropping it into a narrow
 * column on a wide screen keeps the desktop padding and wraps the name onto two
 * lines, which is not the document the student will actually receive.
 *
 * `zoom` rather than `transform: scale()` on purpose. A transform does not
 * affect layout, so it needs a fixed-aspect box around it, and any box that is
 * not exactly the scaled sheet's proportions either clips the certificate or
 * leaves a band of dead space under it. Both happened. `zoom` shrinks the box
 * too, so the frame is always exactly the size of what is inside it.
 */
export function CertificatePreview(props: CertificateSheetProps & { className?: string }) {
  const { className = '', ...sheet } = props
  return (
    <div className={`pointer-events-none w-full overflow-hidden ${className}`} aria-hidden="true">
      <div className="mx-auto w-[760px] [zoom:0.45] sm:[zoom:0.62] lg:[zoom:0.7]">
        <CertificateSheet {...sheet} />
      </div>
    </div>
  )
}

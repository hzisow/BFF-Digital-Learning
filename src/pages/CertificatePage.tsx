// Printable certificate of completion, unlocked by finishing all 8 core
// BFF Academy lessons. The student types their name (nothing is uploaded —
// it only appears on the printed page).

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Printer, ArrowRight, Trophy } from 'lucide-react'
import { Logo } from '../components/Logo'
import { lessonPassed } from '../lib/mastery'
import { ACTIVITIES } from '../lib/activities'
import { useLang } from '../lib/i18n'
import { loadLocalProgress } from '../lib/progress'
import { useStudent } from '../lib/session'

export default function CertificatePage() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const { student } = useStudent()
  const progress = useMemo(() => loadLocalProgress(), [])
  const [name, setName] = useState(student?.nickname ?? '')

  const lessons = useMemo(
    () => ACTIVITIES.filter((a) => a.kind === 'lesson').sort((a, b) => a.sortKey - b.sortKey),
    [],
  )
  // Passing, not merely finishing — otherwise the certificate would contradict
  // the path, which refuses to unlock the next lesson under the same score.
  const doneCount = lessons.filter((l) => lessonPassed(progress[l.slug])).length
  const allDone = doneCount === lessons.length

  const scores = lessons
    .map((l) => progress[l.slug]?.score)
    .filter((s): s is number => typeof s === 'number')
  const avgScore =
    scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null

  const dateStr = new Date().toLocaleDateString(zh ? 'zh-CN' : es ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (!allDone) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[10px] bg-ink text-gold-400">
          <Trophy className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-6 justify-center">
          {zh ? '成就证书' : es ? 'Certificado de logro' : 'Certificate of Achievement'}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink">
          {zh ? (
            <>就快<em>是你的</em>了……</>
          ) : es ? (
            <>Casi <em>tuyo</em>…</>
          ) : (
            <>Almost <em>yours</em>…</>
          )}
        </h1>
        <p className="mt-4 leading-relaxed text-ink/60">
          {zh
            ? `完成 BFF Academy 全部 8 节课后就能解锁证书。你已经完成了 ${doneCount} / ${lessons.length} 节——继续加油！`
            : es
            ? `El certificado se desbloquea al completar las 8 lecciones de BFF Academy. Llevas ${doneCount} de ${lessons.length} — ¡sigue así!`
            : `The certificate unlocks when you complete all 8 BFF Academy lessons. You're at ${doneCount} of ${lessons.length} — keep going!`}
        </p>
        <Link to="/lessons" className="btn-primary mt-8 inline-flex">
          {zh ? '返回我的学习路径' : es ? 'Volver a mi ruta' : 'Back to my path'} <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Print rules: only the certificate sheet prints */}
      <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          body { background: white !important; }
          .certificate-sheet { box-shadow: none !important; margin: 0 !important; border-width: 6px !important; }
        }
      `}</style>

      <div className="no-print mb-8 text-center">
        <h1 className="font-display text-4xl font-extrabold text-ink">
          {zh ? (
            <>你的<em>证书</em>！</>
          ) : es ? (
            <>¡Tu <em>certificado</em>!</>
          ) : (
            <>Your <em>certificate</em>!</>
          )}
        </h1>
        <p className="mt-3 text-ink/60">
          {zh
            ? '按你希望显示的样子输入你的名字，然后打印出来。'
            : es
            ? 'Escribe tu nombre como quieres que aparezca y luego imprímelo.'
            : 'Type your name the way you want it to appear, then print it.'}
        </p>
        <div className="mx-auto mt-4 flex max-w-md flex-col items-center gap-3 sm:flex-row">
          <label htmlFor="cert-name" className="sr-only">
            {zh ? '你的名字' : es ? 'Tu nombre' : 'Your name'}
          </label>
          <input
            id="cert-name"
            className="input"
            placeholder={zh ? '你的名字' : es ? 'Tu nombre' : 'Your name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
          />
          <button type="button" className="btn-primary shrink-0" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" /> {zh ? '打印' : es ? 'Imprimir' : 'Print'}
          </button>
        </div>
      </div>

      {/* The certificate itself — an editorial framed credential */}
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
              ? '因成功完成 BFF Academy 金融素养课程——涵盖赚钱、预算、储蓄与投资、信用、保险、财务决策、规划和消费者保护的全部 8 节课。'
              : es
              ? 'por completar con éxito el plan de estudios de educación financiera BFF Academy — las 8 lecciones: ingresos, presupuesto, ahorro e inversión, crédito, seguros, decisiones financieras, planificación y protección al consumidor.'
              : 'for successfully completing the BFF Academy financial literacy curriculum — all 8 lessons spanning earning, budgeting, saving & investing, credit, insurance, financial decision-making, planning, and consumer protection.'}
          </p>
          {avgScore != null && (
            <p className="mt-5 inline-flex items-center gap-2 font-display font-bold text-bff-700">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              {zh ? `测验平均分：${avgScore}%` : es ? `Promedio de exámenes: ${avgScore}%` : `Quiz average: ${avgScore}%`}
            </p>
          )}
          <div className="mt-12 flex items-end justify-between gap-8 text-left">
            <div>
              <p className="border-t border-ink/40 pt-2 text-xs font-semibold uppercase tracking-wide text-ink/60">
                {zh ? '日期' : es ? 'Fecha' : 'Date'}
              </p>
              <p className="text-sm text-ink">{dateStr}</p>
            </div>
            <span className="text-ink" aria-hidden="true">
              <Trophy className="h-9 w-9" />
            </span>
            <div>
              <p className="border-t border-ink/40 pt-2 text-xs font-semibold uppercase tracking-wide text-ink/60">
                Building Financial Futures of America
              </p>
              <p className="text-sm text-ink">{zh ? 'BFF 导师' : es ? 'Mentor BFF' : 'BFF Mentor'}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="no-print mt-6 text-center text-sm text-ink/50">
        {zh
          ? '你的名字不会被保存或发送到任何地方——它只存在于这个页面上。'
          : es
          ? 'Tu nombre no se guarda ni se envía a ningún lado — solo vive en esta página.'
          : 'Your name is never saved or sent anywhere — it only lives on this page.'}
      </p>
    </div>
  )
}

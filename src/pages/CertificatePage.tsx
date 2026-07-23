// Printable certificate of completion, unlocked by finishing all 8 core
// BFF Academy lessons. The student types their name (nothing is uploaded —
// it only appears on the printed page).

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Printer, ArrowRight } from 'lucide-react'
import { Logo } from '../components/Logo'
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
  const doneCount = lessons.filter((l) => progress[l.slug]?.status === 'completed').length
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
        <p className="text-6xl" aria-hidden="true">🏆</p>
        <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">
          {zh ? '就快是你的了……' : es ? 'Casi tuyo…' : 'Almost yours…'}
        </h1>
        <p className="mt-3 leading-relaxed text-slate-600">
          {zh
            ? `完成 BFF Academy 全部 8 节课后就能解锁证书。你已经完成了 ${doneCount} / ${lessons.length} 节——继续加油！`
            : es
            ? `El certificado se desbloquea al completar las 8 lecciones de BFF Academy. Llevas ${doneCount} de ${lessons.length} — ¡sigue así!`
            : `The certificate unlocks when you complete all 8 BFF Academy lessons. You're at ${doneCount} of ${lessons.length} — keep going!`}
        </p>
        <Link to="/lessons" className="btn-primary mt-8 inline-flex">
          {zh ? '返回我的学习路径' : es ? 'Volver a mi ruta' : 'Back to my path'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
        <h1 className="font-display text-3xl font-extrabold text-slate-900">
          {zh ? '你的证书！🎉' : es ? '¡Tu certificado! 🎉' : 'Your certificate! 🎉'}
        </h1>
        <p className="mt-2 text-slate-600">
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

      {/* The certificate itself */}
      <div className="certificate-sheet rounded-lg border-8 border-double border-bff-700 bg-white p-8 text-center shadow-lg sm:p-12">
        <Logo className="mx-auto h-12" />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-bff-700">
          {zh ? '成就证书' : es ? 'Certificado de logro' : 'Certificate of Achievement'}
        </p>
        <p className="mt-8 text-sm text-slate-600">
          {zh ? '荣誉授予' : es ? 'Se otorga con orgullo a' : 'Proudly presented to'}
        </p>
        <p className="mt-3 border-b-2 border-slate-300 pb-2 font-display text-4xl font-extrabold text-slate-900">
          {name.trim() || (zh ? '在此填写你的名字' : es ? 'Tu nombre aquí' : 'Your name here')}
        </p>
        <p className="mx-auto mt-8 max-w-lg leading-relaxed text-slate-700">
          {zh
            ? '因成功完成 BFF Academy 金融素养课程——涵盖赚钱、预算、储蓄与投资、信用、保险、财务决策、规划和消费者保护的全部 8 节课。'
            : es
            ? 'por completar con éxito el plan de estudios de educación financiera BFF Academy — las 8 lecciones: ingresos, presupuesto, ahorro e inversión, crédito, seguros, decisiones financieras, planificación y protección al consumidor.'
            : 'for successfully completing the BFF Academy financial literacy curriculum — all 8 lessons spanning earning, budgeting, saving & investing, credit, insurance, financial decision-making, planning, and consumer protection.'}
        </p>
        {avgScore != null && (
          <p className="mt-4 font-display font-bold text-bff-700">
            {zh ? `测验平均分：${avgScore}%` : es ? `Promedio de exámenes: ${avgScore}%` : `Quiz average: ${avgScore}%`}
          </p>
        )}
        <div className="mt-12 flex items-end justify-between gap-8 text-left">
          <div>
            <p className="border-t border-slate-400 pt-2 text-xs font-semibold text-slate-600">
              {zh ? '日期' : es ? 'Fecha' : 'Date'}
            </p>
            <p className="text-sm text-slate-800">{dateStr}</p>
          </div>
          <p className="text-4xl" aria-hidden="true">🏆</p>
          <div>
            <p className="border-t border-slate-400 pt-2 text-xs font-semibold text-slate-600">
              Building Financial Futures of America
            </p>
            <p className="text-sm text-slate-800">{zh ? 'BFF 导师' : es ? 'Mentor BFF' : 'BFF Mentor'}</p>
          </div>
        </div>
      </div>

      <p className="no-print mt-6 text-center text-sm text-slate-500">
        {zh
          ? '你的名字不会被保存或发送到任何地方——它只存在于这个页面上。'
          : es
          ? 'Tu nombre no se guarda ni se envía a ningún lado — solo vive en esta página.'
          : 'Your name is never saved or sent anywhere — it only lives on this page.'}
      </p>
    </div>
  )
}

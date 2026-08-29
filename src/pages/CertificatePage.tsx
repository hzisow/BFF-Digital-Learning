// Printable certificate of completion, unlocked by finishing all 8 core
// BFF Academy lessons. The student types their name (nothing is uploaded —
// it only appears on the printed page).

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Printer, ArrowRight, Trophy, Download, Loader2, Lock } from 'lucide-react'
import { CertificateSheet, CertificatePreview } from '../components/CertificateSheet'
import { lessonPassed } from '../lib/mastery'
import { ACTIVITIES } from '../lib/activities'
import { useLang } from '../lib/i18n'
import { loadLocalProgress } from '../lib/progress'
import { useStudent } from '../lib/session'
import { downloadCertificate } from '../lib/certificatePdf'

export default function CertificatePage() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const { student } = useStudent()
  const progress = useMemo(() => loadLocalProgress(), [])
  // Seeded from the roster name ("Jayden M.") and editable, because a
  // certificate should carry the student's full name and the roster only ever
  // holds a last initial.
  const [name, setName] = useState(() => student?.nickname ?? '')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  async function onDownload() {
    setSaveError(null)
    setSaving(true)
    try {
      await downloadCertificate({
        name,
        dateStr,
        lessonCount: lessons.length,
        avgScore,
        lang,
      })
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
  }

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

  // Not earned yet. Show the actual document rather than describing it: a
  // student who can see the thing they are working toward, with their own
  // progress against it, has a reason to open lesson four. A paragraph saying
  // "a certificate unlocks at the end" does not do that.
  if (!allDone) {
    const pct = Math.round((doneCount / lessons.length) * 100)
    const remaining = lessons.length - doneCount
    return (
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">
              <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
              {zh ? '成就证书' : es ? 'Certificado de logro' : 'Certificate of Achievement'}
              <span className="eyebrow-line" aria-hidden="true" />
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
              {zh ? (
                <>这张证书<em>还差一点</em></>
              ) : es ? (
                <>Este certificado es <em>casi tuyo</em></>
              ) : (
                <>This certificate is <em>almost yours</em></>
              )}
            </h1>
            <p className="mt-4 leading-relaxed text-ink/65">
              {zh
                ? `全部 8 节核心课程过关后，它就带着你的名字解锁了。你已经完成 ${doneCount} 节，还剩 ${remaining} 节。`
                : es
                  ? `Se desbloquea con tu nombre cuando apruebas las 8 lecciones del núcleo. Llevas ${doneCount} y te ${remaining === 1 ? 'queda' : 'quedan'} ${remaining}.`
                  : `It unlocks with your name on it once you pass all 8 core lessons. You have ${doneCount} down and ${remaining} to go.`}
            </p>

            <div className="mt-7 max-w-sm">
              <div className="flex items-center justify-between text-sm font-semibold text-ink/70">
                <span>
                  {zh
                    ? `${doneCount} / ${lessons.length} 节已过关`
                    : es
                      ? `${doneCount} de ${lessons.length} aprobadas`
                      : `${doneCount} of ${lessons.length} passed`}
                </span>
                <span>{pct}%</span>
              </div>
              <div
                role="progressbar"
                aria-label={zh ? '证书进度' : es ? 'Progreso del certificado' : 'Certificate progress'}
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-2 h-3 overflow-hidden rounded-full bg-paper-deep"
              >
                <div className="h-full rounded-full bg-bff-500" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <Link to="/lessons" className="btn-primary mt-8 inline-flex">
              {doneCount === 0
                ? zh
                  ? '开始第一节课'
                  : es
                    ? 'Empezar la primera lección'
                    : 'Start the first lesson'
                : zh
                  ? '继续我的学习路径'
                  : es
                    ? 'Seguir con mi ruta'
                    : 'Keep going on my path'}
              <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative">
            <CertificatePreview
              name=""
              dateStr={dateStr}
              avgScore={null}
              lang={lang}
              className="rounded-[10px] opacity-45 grayscale"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-gold-400 shadow-card">
                <Lock className="h-6 w-6" aria-hidden="true" />
              </span>
            </span>
          </div>
        </div>
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
            ? '确认一下名字的写法，然后下载或打印。'
            : es
            ? 'Confirma cómo quieres que aparezca tu nombre, y descárgalo o imprímelo.'
            : 'Check how you want your name to read, then download or print it.'}
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
          <button
            type="button"
            className="btn-primary shrink-0"
            onClick={onDownload}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="h-4 w-4" aria-hidden="true" />
            )}
            {zh ? '下载 PDF' : es ? 'Descargar PDF' : 'Download PDF'}
          </button>
          <button type="button" className="btn-ghost shrink-0" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" /> {zh ? '打印' : es ? 'Imprimir' : 'Print'}
          </button>
        </div>
        {saveError && (
          <p role="alert" className="mx-auto mt-3 max-w-md text-sm font-semibold text-red-700">
            {saveError}
          </p>
        )}
        {lang === 'zh' && (
          <p className="mx-auto mt-3 max-w-md text-xs text-ink/50">
            下载的 PDF 使用英文版式（PDF 字体不含中文字形）。想要中文证书，请使用「打印」。
          </p>
        )}
      </div>

      {/* The certificate itself — an editorial framed credential */}
      <CertificateSheet name={name} dateStr={dateStr} avgScore={avgScore} lang={lang} />

      <p className="no-print mt-6 text-center text-sm text-ink/50">
        {zh
          ? '你的名字不会被保存或发送到任何地方，它只存在于这个页面上。'
          : es
          ? 'Tu nombre no se guarda ni se envía a ningún lado. Solo vive en esta página.'
          : 'Your name is never saved or sent anywhere. It only lives on this page.'}
      </p>
    </div>
  )
}

// Printable certificate of completion, unlocked by finishing all 8 core
// BFF Academy lessons. The student types their name (nothing is uploaded —
// it only appears on the printed page).

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Printer, ArrowRight, Trophy, Download, Loader2, Lock, Share2, Copy, Check } from 'lucide-react'
import { CertificateSheet, CertificatePreview } from '../components/CertificateSheet'
import { BACKEND_ENABLED } from '../lib/config'
import { issueCertificate, linkedInAddUrl, verifyUrl } from '../lib/certificate'
import { LinkedInIcon } from '../components/LinkedInIcon'
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
          ? '除非你在下面选择公开分享，否则你的名字只存在于这个页面上，不会被保存或发送。'
          : es
          ? 'Tu nombre solo vive en esta página y no se guarda ni se envía, a menos que elijas compartirlo abajo.'
          : 'Your name only lives on this page, and is never saved or sent anywhere, unless you choose to share it below.'}
      </p>

      <ShareSection
        name={name}
        avgScore={avgScore}
        lessonsPassed={lessons.length}
        lang={lang}
      />
    </div>
  )
}

/**
 * Publishing the certificate, and handing it to LinkedIn.
 *
 * Kept below the fold and behind a button on purpose. A student who never
 * touches this has published nothing; the page above is still a private
 * document drawn in their own browser. Pressing the button is what makes a name
 * and a date readable by anyone holding the link, and the copy says that in
 * those words before the button, not after.
 */
function ShareSection({
  name,
  avgScore,
  lessonsPassed,
  lang,
}: {
  name: string
  avgScore: number | null
  lessonsPassed: number
  lang: string
}) {
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [id, setId] = useState<string | null>(null)
  const [issuedAt, setIssuedAt] = useState<Date | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  if (!BACKEND_ENABLED) return null

  async function share() {
    setBusy(true)
    setErr(null)
    try {
      const newId = await issueCertificate(name, avgScore, lessonsPassed)
      setId(newId)
      setIssuedAt(new Date())
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e)
      setErr(
        m === 'TOO_MANY'
          ? zh
            ? '你刚刚已经发出过几张了，请过一小时再试。'
            : es
              ? 'Acabas de emitir varios. Inténtalo de nuevo en una hora.'
              : 'You have issued a few just now. Try again in an hour.'
          : zh
            ? '现在没能发出证书，请稍后再试。'
            : es
              ? 'No pudimos emitirlo ahora mismo. Inténtalo de nuevo.'
              : 'We could not issue it right now. Try again in a moment.',
      )
    } finally {
      setBusy(false)
    }
  }

  const link = id ? verifyUrl(id) : ''

  return (
    <section className="no-print mt-14 border-t border-ink/10 pt-10">
      <h2 className="font-display text-xl font-bold text-ink">
        {zh ? '添加到 LinkedIn' : es ? 'Añádelo a LinkedIn' : 'Add it to LinkedIn'}
      </h2>

      {!id ? (
        <>
          <p className="mt-3 max-w-xl leading-relaxed text-ink/65">
            {zh
              ? 'LinkedIn 需要一个别人能打开、用来核实这张证书的网址。点下面的按钮，我们会生成一个公开页面，上面显示你的名字、发放日期和测验平均分，凭链接即可查看。'
              : es
                ? 'LinkedIn necesita una dirección que otra persona pueda abrir para comprobar el certificado. Al pulsar el botón creamos una página pública con tu nombre, la fecha y tu promedio, visible para cualquiera que tenga el enlace.'
                : 'LinkedIn needs a web address someone else can open to check the certificate is real. Pressing the button creates a public page showing your name, the date, and your quiz average, readable by anyone who has the link.'}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/55">
            {zh
              ? '页面上不会出现你的班级、学校、邮箱或逐课成绩。如果你还不满 18 岁，先和家长或老师商量一下。'
              : es
                ? 'La página no muestra tu clase, tu escuela, tu correo ni tus notas por lección. Si eres menor de edad, coméntalo antes con tu familia o tu profesor.'
                : 'The page never shows your class, your school, your email, or your per-lesson scores. If you are under 18, talk it over with a parent or teacher first.'}
          </p>
          {err && (
            <p role="alert" className="mt-4 text-sm font-semibold text-red-700">
              {err}
            </p>
          )}
          <button
            type="button"
            className="btn-secondary mt-6"
            onClick={() => void share()}
            disabled={busy || !name.trim()}
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Share2 className="h-4 w-4" aria-hidden="true" />
            )}
            {zh
              ? '生成可分享的证书'
              : es
                ? 'Crear un certificado compartible'
                : 'Create a shareable certificate'}
          </button>
          {!name.trim() && (
            <p className="mt-2 text-sm text-ink/50">
              {zh
                ? '先在上面填写你的名字。'
                : es
                  ? 'Escribe tu nombre arriba primero.'
                  : 'Add your name above first.'}
            </p>
          )}
        </>
      ) : (
        <>
          <p className="mt-3 max-w-xl leading-relaxed text-ink/65">
            {zh
              ? '证书已生成。点下面的按钮，LinkedIn 会打开「证书」表单，字段已经替你填好了，你只要保存。'
              : es
                ? 'Listo. El botón abre el formulario de certificaciones de LinkedIn con todo relleno: solo tienes que guardar.'
                : 'Done. The button opens LinkedIn’s certifications form with every field already filled in. You just press save.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              className="btn-primary"
              href={linkedInAddUrl(id, issuedAt ?? new Date())}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon className="h-4 w-4" />
              {zh ? '添加到 LinkedIn' : es ? 'Añadir a LinkedIn' : 'Add to LinkedIn'}
            </a>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                void navigator.clipboard.writeText(link).then(() => {
                  setCopied(true)
                  window.setTimeout(() => setCopied(false), 2000)
                })
              }}
            >
              {copied ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              {copied
                ? zh
                  ? '已复制'
                  : es
                    ? 'Copiado'
                    : 'Copied'
                : zh
                  ? '复制核验链接'
                  : es
                    ? 'Copiar enlace'
                    : 'Copy the link'}
            </button>
          </div>
          <p className="mt-4 break-all font-mono text-xs text-ink/50">{link}</p>
          <p role="status" className="sr-only">
            {copied ? (zh ? '链接已复制' : es ? 'Enlace copiado' : 'Link copied') : ''}
          </p>
        </>
      )}
    </section>
  )
}

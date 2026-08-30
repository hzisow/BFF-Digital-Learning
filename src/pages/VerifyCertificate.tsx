// The public face of a shared certificate.
//
// This is what opens when somebody clicks through from a LinkedIn profile, or
// when a parent or an admissions officer is handed the link. It has to answer
// one question fast: is this real, and what did they actually do? So it leads
// with the certificate itself and states the terms underneath, including the
// pass mark, so "completed" is not taken on trust.

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BadgeCheck, SearchX } from 'lucide-react'
import { CertificateSheet } from '../components/CertificateSheet'
import { useLang } from '../lib/i18n'
import { PASS_SCORE } from '../lib/mastery'
import { verifyCertificate, type VerifiedCertificate } from '../lib/certificate'
import { SkeletonPage } from '../components/Skeleton'

export default function VerifyCertificate() {
  const { id = '' } = useParams()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [cert, setCert] = useState<VerifiedCertificate | null | 'missing'>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let live = true
    verifyCertificate(id)
      .then((c) => live && setCert(c ?? 'missing'))
      .catch((e) => live && setError(e instanceof Error ? e.message : String(e)))
    return () => {
      live = false
    }
  }, [id])

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p role="alert" className="font-display text-lg font-bold text-ink">
          {zh
            ? '暂时无法核验这张证书，请稍后再试。'
            : es
              ? 'No pudimos verificar este certificado ahora mismo. Inténtalo de nuevo.'
              : 'We could not check this certificate right now. Try again in a moment.'}
        </p>
      </div>
    )
  }

  if (cert === null) {
    return <SkeletonPage label={zh ? '核验中…' : es ? 'Verificando…' : 'Checking…'} cards={1} />
  }

  // A bad id is the ordinary case for a mistyped or truncated link, so it reads
  // as "we could not find this one", not as an accusation.
  if (cert === 'missing') {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[10px] bg-paper-deep text-ink/50">
          <SearchX className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-ink">
          {zh ? '找不到这张证书' : es ? 'No encontramos este certificado' : 'No certificate here'}
        </h1>
        <p className="mt-4 leading-relaxed text-ink/65">
          {zh
            ? '这个链接和任何一张已发出的证书都不匹配。它可能被截断了，请向持有人索取完整链接。'
            : es
              ? 'Este enlace no coincide con ningún certificado emitido. Puede que esté cortado: pide el enlace completo a quien te lo envió.'
              : 'This link does not match a certificate we issued. It may have been cut short, so ask whoever sent it for the whole link.'}
        </p>
        <Link to="/" className="btn-secondary mt-8 inline-flex">
          {zh ? '了解 BFF Classroom' : es ? 'Conoce BFF Classroom' : 'About BFF Classroom'}
        </Link>
      </div>
    )
  }

  const issued = new Date(cert.issuedAt)
  const dateStr = issued.toLocaleDateString(zh ? 'zh-CN' : es ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
        <BadgeCheck className="h-4 w-4" aria-hidden="true" />
        {zh ? '已核验的证书' : es ? 'Certificado verificado' : 'Verified certificate'}
      </p>
      <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {zh
          ? `${cert.displayName} 完成了 BFF Academy。`
          : es
            ? `${cert.displayName} completó BFF Academy.`
            : `${cert.displayName} completed BFF Academy.`}
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-ink/65">
        {zh
          ? `发放于 ${dateStr}，涵盖 ${cert.lessonsPassed} 节核心课程，每节测验都达到 ${PASS_SCORE}% 或以上。`
          : es
            ? `Emitido el ${dateStr}, tras aprobar ${cert.lessonsPassed} lecciones del núcleo con ${PASS_SCORE}% o más en cada examen.`
            : `Issued ${dateStr}, for passing ${cert.lessonsPassed} core lessons at ${PASS_SCORE}% or better on every quiz.`}
      </p>

      <div className="mt-10">
        <CertificateSheet
          name={cert.displayName}
          dateStr={dateStr}
          avgScore={cert.avgScore}
          lang={lang}
        />
      </div>

      <div className="mt-10 border-t border-ink/10 pt-8">
        <p className="max-w-xl leading-relaxed text-ink/65">
          {zh
            ? 'BFF Academy 是 BFF of America 的免费金融素养课程，由学生创办的 501(c)(3) 非营利组织运营。课程共 8 节核心课，可在课堂上跟导师学习，也可以自学。'
            : es
              ? 'BFF Academy es el curso gratuito de educación financiera de BFF of America, una organización 501(c)(3) fundada por estudiantes. Son 8 lecciones del núcleo, en clase con un mentor o por cuenta propia.'
              : 'BFF Academy is the free financial literacy course from BFF of America, a student-founded 501(c)(3) nonprofit. Eight core lessons, taken in class with a mentor or on your own.'}
        </p>
        <Link to="/lessons" className="btn-secondary mt-6 inline-flex">
          {zh ? '看看这门课' : es ? 'Ver el curso' : 'See the course'}
          <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

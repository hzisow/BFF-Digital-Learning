// The certificate as a downloadable PDF.
//
// "Print" was the only way to keep the certificate, which means a student on a
// Chromebook with no printer had nothing to show for finishing the course. This
// draws the same credential as a landscape A4 file they can save, email to a
// parent, or attach to an application.
//
// Drawn with jsPDF primitives rather than rasterising the DOM: text stays
// selectable, the file is a few KB instead of a megabyte, and it does not depend
// on the page's fonts having finished loading. jsPDF is imported dynamically by
// the caller so ~130KB gzip stays out of everyone else's bundle.
//
// Known limit, same as the worksheet generator: jsPDF's built-in fonts are
// Latin-only, so a Chinese certificate falls back to English chrome. A student's
// own name still renders if it is Latin script. Fixing this properly means
// embedding a CJK font, which is megabytes.

import type { jsPDF } from 'jspdf'

const INK = '#0c1a27'
const BLUE = '#0077b5'
const GOLD = '#f0b35a'
const MUTED = '#5c6470'

export interface CertificateInput {
  name: string
  /** Already-formatted for the reader's locale. */
  dateStr: string
  lessonCount: number
  avgScore: number | null
  lang: 'en' | 'es' | 'zh'
}

interface Copy {
  eyebrow: string
  presented: string
  body: string
  average: (n: number) => string
  date: string
  org: string
  mentor: string
}

function copyFor(lang: CertificateInput['lang'], lessonCount: number): Copy {
  // Spanish keeps its accents (Latin-1 is fine); Chinese falls back to English
  // because the built-in fonts have no CJK glyphs and would draw blank boxes.
  if (lang === 'es') {
    return {
      eyebrow: 'CERTIFICADO DE LOGRO',
      presented: 'Se otorga con orgullo a',
      body: `por completar con exito el plan de estudios de educacion financiera de BFF Academy — las ${lessonCount} lecciones, desde ingresos y presupuesto hasta credito, seguros y proteccion al consumidor.`,
      average: (n) => `Promedio de examenes: ${n}%`,
      date: 'FECHA',
      org: 'BUILDING FINANCIAL FUTURES OF AMERICA',
      mentor: 'Mentor BFF',
    }
  }
  return {
    eyebrow: 'CERTIFICATE OF ACHIEVEMENT',
    presented: 'Proudly presented to',
    body: `for successfully completing the BFF Academy financial literacy curriculum — all ${lessonCount} lessons, from earning and budgeting through credit, insurance and consumer protection.`,
    average: (n) => `Quiz average: ${n}%`,
    date: 'DATE',
    org: 'BUILDING FINANCIAL FUTURES OF AMERICA',
    mentor: 'BFF Mentor',
  }
}

/** The BFF mark, if it loads. Branding degrades rather than blocking the file. */
async function loadLogo(): Promise<string | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}brand/logo.png`)
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

export async function renderCertificate(
  doc: jsPDF,
  input: CertificateInput,
): Promise<jsPDF> {
  const c = copyFor(input.lang, input.lessonCount)
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()

  // Double rule, matching the on-screen credential.
  doc.setDrawColor(INK)
  doc.setLineWidth(3)
  doc.rect(28, 28, W - 56, H - 56)
  doc.setLineWidth(0.6)
  doc.rect(40, 40, W - 80, H - 80)

  // Gold cap across the top of the inner frame.
  doc.setFillColor(GOLD)
  doc.rect(40, 40, W - 80, 6, 'F')

  const cx = W / 2
  let y = 92

  const logo = await loadLogo()
  if (logo) {
    const w = 96
    const h = 34
    try {
      doc.addImage(logo, 'PNG', cx - w / 2, y - 24, w, h, undefined, 'FAST')
      y += 30
    } catch {
      // A malformed image should not cost the student their certificate.
    }
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(BLUE)
  doc.text(c.eyebrow, cx, y + 22, { align: 'center', charSpace: 2.2 })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(MUTED)
  doc.text(c.presented, cx, y + 60, { align: 'center' })

  // The name, shrunk to fit rather than overflowing the rule beneath it.
  const name = input.name.trim() || '—'
  doc.setFont('times', 'bold')
  doc.setTextColor(INK)
  let nameSize = 40
  const maxNameWidth = W - 220
  doc.setFontSize(nameSize)
  while (doc.getTextWidth(name) > maxNameWidth && nameSize > 16) {
    nameSize -= 2
    doc.setFontSize(nameSize)
  }
  const nameY = y + 104
  doc.text(name, cx, nameY, { align: 'center' })

  doc.setDrawColor(INK)
  doc.setLineWidth(1)
  const ruleHalf = Math.min(maxNameWidth, doc.getTextWidth(name) + 80) / 2
  doc.line(cx - ruleHalf, nameY + 14, cx + ruleHalf, nameY + 14)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(MUTED)
  const bodyLines = doc.splitTextToSize(c.body, W - 240) as string[]
  doc.text(bodyLines, cx, nameY + 46, { align: 'center', lineHeightFactor: 1.5 })

  let afterBody = nameY + 46 + bodyLines.length * 16

  if (input.avgScore != null) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(BLUE)
    doc.text(c.average(input.avgScore), cx, afterBody + 16, { align: 'center' })
    afterBody += 16
  }

  // Signature rules, pinned to the bottom of the frame rather than flowing from
  // the body — a long name must not push them off the page.
  const footY = H - 96
  const pad = 92
  doc.setDrawColor(INK)
  doc.setLineWidth(0.8)
  doc.line(pad, footY, pad + 190, footY)
  doc.line(W - pad - 230, footY, W - pad, footY)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(MUTED)
  doc.text(c.date, pad, footY + 14, { charSpace: 1.2 })
  doc.text(c.org, W - pad, footY + 14, { align: 'right', charSpace: 0.6 })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(INK)
  doc.text(input.dateStr, pad, footY + 30)
  doc.text(c.mentor, W - pad, footY + 30, { align: 'right' })

  return doc
}

/** Build and save the file. Returns the filename actually used. */
export async function downloadCertificate(input: CertificateInput): Promise<string> {
  const { jsPDF: JsPDF } = await import('jspdf')
  const doc = new JsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  await renderCertificate(doc, input)
  const safe =
    input.name
      .trim()
      .replace(/[^\p{L}\p{N} _-]/gu, '')
      .replace(/\s+/g, '-')
      .slice(0, 40) || 'certificate'
  const filename = `BFF-Academy-Certificate-${safe}.pdf`
  doc.save(filename)
  return filename
}

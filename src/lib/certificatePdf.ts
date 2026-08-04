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
// Typography is the site's own: Fraunces for the name, Public Sans for
// everything else, instanced from the variable fonts at a single weight and
// shipped as separate asset files (~95KB total) that only download when someone
// actually generates a certificate. jsPDF's built-in Times and Helvetica are
// the fallback if a font request fails, because a plain certificate beats no
// certificate.
//
// Known limit, same as the worksheet generator: neither the embedded fonts nor
// jsPDF's built-ins carry CJK glyphs, so a Chinese certificate falls back to
// English chrome. A student's own name still renders if it is Latin script.
// Fixing this properly means embedding a CJK font, which is megabytes.

import type { jsPDF } from 'jspdf'

import frauncesBoldUrl from '../assets/certfonts/fraunces-700.ttf?url'
import scriptUrl from '../assets/certfonts/great-vibes-400.ttf?url'
import sansRegularUrl from '../assets/certfonts/public-sans-400.ttf?url'
import sansBoldUrl from '../assets/certfonts/public-sans-700.ttf?url'

const INK = '#0c1a27'
const BLUE = '#0077b5'
const GOLD = '#f0b35a'
const MUTED = '#5c6470'
const RULE = '#c9ced6'

export interface CertificateInput {
  name: string
  /** Already-formatted for the reader's locale. */
  dateStr: string
  lessonCount: number
  avgScore: number | null
  lang: 'en' | 'es' | 'zh'
  /**
   * Who signs. Drawn in a script face above the right-hand rule, so every
   * certificate comes out signed without anyone hand-signing a PDF.
   *
   * Deliberately a typeface and not a scan of real handwriting: this repository
   * is public, and a scanned signature committed to it is a signature anyone
   * can lift and reuse. Defaults to the organisation.
   */
  signedBy?: string
}

interface Copy {
  eyebrow: string
  presented: string
  body: string
  sealLabel: string
  sealCaption: string
  date: string
  org: string
  /** Printed under the signature rule: the role, not the person. */
  mentor: string
  /** Drawn in script above the rule when no signer is supplied. */
  signature: string
}

function copyFor(lang: CertificateInput['lang'], lessonCount: number): Copy {
  // Spanish keeps its accents; Chinese falls back to English because no font
  // here has CJK glyphs and the text would draw as blank boxes.
  if (lang === 'es') {
    return {
      eyebrow: 'CERTIFICADO DE LOGRO',
      presented: 'Se otorga con orgullo a',
      body: `por completar el plan de estudios de educación financiera de BFF Academy, las ${lessonCount} lecciones, desde ingresos y presupuesto hasta crédito, seguros y protección al consumidor.`,
      sealLabel: 'PROMEDIO',
      sealCaption: `${lessonCount} LECCIONES`,
      date: 'FECHA',
      org: 'BUILDING FINANCIAL FUTURES OF AMERICA',
      mentor: 'MENTOR DE BFF ACADEMY',
      signature: 'BFF of America',
    }
  }
  return {
    eyebrow: 'CERTIFICATE OF ACHIEVEMENT',
    presented: 'Proudly presented to',
    body: `for completing the BFF Academy financial literacy curriculum, all ${lessonCount} lessons, from earning and budgeting through credit, insurance and consumer protection.`,
    sealLabel: 'QUIZ AVERAGE',
    sealCaption: `${lessonCount} LESSONS`,
    date: 'DATE',
    org: 'BUILDING FINANCIAL FUTURES OF AMERICA',
    mentor: 'BFF ACADEMY MENTOR',
    signature: 'BFF of America',
  }
}

/** Fetch a binary asset as the base64 jsPDF's virtual filesystem expects. */
async function fetchBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = new Uint8Array(await res.arrayBuffer())
    // Chunked: spreading a 36KB font into String.fromCharCode in one call can
    // exceed the argument limit.
    let bin = ''
    for (let i = 0; i < buf.length; i += 8192) {
      bin += String.fromCharCode(...buf.subarray(i, i + 8192))
    }
    return btoa(bin)
  } catch {
    return null
  }
}

/** The font names this module draws with, or the built-ins if embedding failed. */
interface Fonts {
  display: string
  sans: string
  /** Null when embedding failed: the signature falls back to printed text. */
  script: string | null
}

const BUILTIN: Fonts = { display: 'times', sans: 'helvetica', script: null }

/**
 * Register the site's typefaces with the document. Any failure falls back to
 * jsPDF's built-ins rather than throwing, so a blocked asset request costs the
 * student some polish and not the file.
 */
async function embedFonts(doc: jsPDF): Promise<Fonts> {
  const [display, sansRegular, sansBold, script] = await Promise.all([
    fetchBase64(frauncesBoldUrl),
    fetchBase64(sansRegularUrl),
    fetchBase64(sansBoldUrl),
    fetchBase64(scriptUrl),
  ])
  if (!display || !sansRegular || !sansBold) return BUILTIN
  try {
    doc.addFileToVFS('Fraunces-Bold.ttf', display)
    doc.addFont('Fraunces-Bold.ttf', 'Fraunces', 'bold')
    doc.addFileToVFS('PublicSans-Regular.ttf', sansRegular)
    doc.addFont('PublicSans-Regular.ttf', 'PublicSans', 'normal')
    doc.addFileToVFS('PublicSans-Bold.ttf', sansBold)
    doc.addFont('PublicSans-Bold.ttf', 'PublicSans', 'bold')
    // The script face is the one optional font: without it the signature prints
    // as ordinary text, which is worse-looking but still a valid certificate.
    if (script) {
      doc.addFileToVFS('GreatVibes.ttf', script)
      doc.addFont('GreatVibes.ttf', 'GreatVibes', 'normal')
    }
    return { display: 'Fraunces', sans: 'PublicSans', script: script ? 'GreatVibes' : null }
  } catch {
    return BUILTIN
  }
}

/**
 * The BFF mark, pre-cropped to its artwork so it can be placed at its true
 * aspect ratio. The square source has about 60% transparent padding, which is
 * why drawing that one into a wordmark-shaped box produced a smudge.
 * Branding degrades rather than blocking the file.
 */
async function loadLogo(): Promise<string | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}brand/logo-wide.png`)
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

/** Aspect ratio of `logo-wide.png`, so the draw box never distorts the mark. */
const LOGO_RATIO = 900 / 398

/** Short gold brackets at each corner of the inner frame. */
function cornerMarks(doc: jsPDF, x: number, y: number, w: number, h: number) {
  const arm = 26
  doc.setDrawColor(GOLD)
  doc.setLineWidth(2)
  const corners: Array<[number, number, number, number]> = [
    [x, y, 1, 1],
    [x + w, y, -1, 1],
    [x, y + h, 1, -1],
    [x + w, y + h, -1, -1],
  ]
  for (const [px, py, dx, dy] of corners) {
    doc.line(px, py, px + arm * dx, py)
    doc.line(px, py, px, py + arm * dy)
  }
}

/**
 * The medallion that anchors the middle of the page. It carries the quiz
 * average when there is one and the lesson count when there is not, so the
 * space is never merely decorative.
 */
function seal(doc: jsPDF, f: Fonts, cx: number, cy: number, c: Copy, avg: number | null) {
  const r = 46
  doc.setDrawColor(GOLD)
  doc.setLineWidth(2.2)
  doc.circle(cx, cy, r)
  doc.setDrawColor(RULE)
  doc.setLineWidth(0.7)
  doc.circle(cx, cy, r - 7)

  doc.setFont(f.sans, 'bold')
  doc.setFontSize(6.5)
  doc.setTextColor(MUTED)
  doc.text(avg != null ? c.sealLabel : c.sealCaption.split(' ').slice(1).join(' '), cx, cy - 13, {
    align: 'center',
    charSpace: 1.1,
  })

  doc.setFont(f.display, 'bold')
  doc.setFontSize(avg != null ? 25 : 30)
  doc.setTextColor(BLUE)
  doc.text(avg != null ? `${avg}%` : c.sealCaption.split(' ')[0], cx, cy + 9, { align: 'center' })

  doc.setDrawColor(GOLD)
  doc.setLineWidth(1)
  doc.line(cx - 12, cy + 21, cx + 12, cy + 21)
}

export async function renderCertificate(
  doc: jsPDF,
  input: CertificateInput,
): Promise<jsPDF> {
  const c = copyFor(input.lang, input.lessonCount)
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const cx = W / 2

  const [f, logo] = await Promise.all([embedFonts(doc), loadLogo()])

  // Double rule with gold corner brackets, so the border reads as considered
  // rather than as a default box.
  doc.setDrawColor(INK)
  doc.setLineWidth(2.4)
  doc.rect(24, 24, W - 48, H - 48)
  doc.setDrawColor(RULE)
  doc.setLineWidth(0.6)
  doc.rect(36, 36, W - 72, H - 72)
  cornerMarks(doc, 36, 36, W - 72, H - 72)

  doc.setFillColor(GOLD)
  doc.rect(36, 36, W - 72, 5, 'F')

  // Fixed vertical anchors rather than a flowing layout: every certificate has
  // the same blocks in the same order, and pinning them keeps a long name from
  // pushing the signature rules off the page or leaving a hole in the middle.
  if (logo) {
    const w = 132
    try {
      doc.addImage(logo, 'PNG', cx - w / 2, 66, w, w / LOGO_RATIO, undefined, 'FAST')
    } catch {
      // A malformed image should not cost the student their certificate.
    }
  }

  doc.setFont(f.sans, 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(BLUE)
  doc.text(c.eyebrow, cx, 152, { align: 'center', charSpace: 2.6 })

  doc.setFont(f.sans, 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(MUTED)
  doc.text(c.presented, cx, 182, { align: 'center' })

  // The name, shrunk to fit rather than overflowing its rule.
  // No name typed: draw nothing and let the rule stand on its own. A literal
  // placeholder character would print onto the certificate.
  const name = input.name.trim()
  doc.setFont(f.display, 'bold')
  doc.setTextColor(INK)
  const maxNameWidth = W - 240
  let nameSize = 42
  doc.setFontSize(nameSize)
  while (doc.getTextWidth(name) > maxNameWidth && nameSize > 16) {
    nameSize -= 1
    doc.setFontSize(nameSize)
  }
  const nameY = 238
  doc.text(name, cx, nameY, { align: 'center' })

  // The rule keeps a minimum length so a short name does not leave a stub.
  doc.setDrawColor(INK)
  doc.setLineWidth(0.9)
  const ruleHalf = Math.min(maxNameWidth, Math.max(doc.getTextWidth(name) + 90, 280)) / 2
  doc.line(cx - ruleHalf, nameY + 16, cx + ruleHalf, nameY + 16)

  doc.setFont(f.sans, 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(MUTED)
  const bodyLines = doc.splitTextToSize(c.body, W - 300) as string[]
  doc.text(bodyLines, cx, nameY + 46, { align: 'center', lineHeightFactor: 1.55 })

  // Values sit above their rules and labels below them, which is how a real
  // signed document reads: the line is the thing you write on.
  const footY = H - 80
  const pad = 96
  const ruleW = 205
  const dateCx = pad + ruleW / 2
  const signCx = W - pad - ruleW / 2

  // The seal is centred in whatever room is left between the body and the
  // signature block, so the middle of the page is never a hole.
  const bodyBottom = nameY + 46 + bodyLines.length * 16
  seal(doc, f, cx, (bodyBottom + footY - 24) / 2, c, input.avgScore)

  doc.setFont(f.sans, 'normal')
  doc.setFontSize(11)
  doc.setTextColor(INK)
  doc.text(input.dateStr, dateCx, footY - 9, { align: 'center' })

  const signature = (input.signedBy ?? c.signature).trim()
  if (signature) {
    doc.setTextColor(INK)
    if (f.script) {
      doc.setFont(f.script, 'normal')
      // Script capitals carry swashes that reach well past the advance width
      // getTextWidth reports, so fit to a box noticeably narrower than the rule.
      let sigSize = 27
      doc.setFontSize(sigSize)
      while (doc.getTextWidth(signature) > ruleW - 56 && sigSize > 12) {
        sigSize -= 1
        doc.setFontSize(sigSize)
      }
      // Script faces sit high on the baseline, so nudge it down onto the rule.
      doc.text(signature, signCx, footY - 4, { align: 'center' })
    } else {
      doc.setFont(f.sans, 'normal')
      doc.setFontSize(12)
      doc.text(signature, signCx, footY - 9, { align: 'center' })
    }
  }

  doc.setDrawColor(INK)
  doc.setLineWidth(0.8)
  doc.line(pad, footY, pad + ruleW, footY)
  doc.line(W - pad - ruleW, footY, W - pad, footY)

  // One baseline for all three, so the footer reads as a row and not as three
  // captions that happen to be near each other.
  const labelY = footY + 16
  doc.setFont(f.sans, 'bold')
  doc.setFontSize(7)
  doc.setTextColor(MUTED)
  doc.text(c.date, dateCx, labelY, { align: 'center', charSpace: 1.4 })
  doc.text(c.mentor, signCx, labelY, { align: 'center', charSpace: 1.4 })
  doc.text(c.org, cx, labelY, { align: 'center', charSpace: 1.6 })

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

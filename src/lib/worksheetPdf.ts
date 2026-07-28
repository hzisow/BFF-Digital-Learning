// Builds a printable student worksheet PDF from the structured data the
// lesson-plan edge function returns for `kind: 'worksheet'`.
//
// The point of laying this out by hand (rather than printing HTML) is control
// over ANSWER SPACE: a short-answer question gets ruled lines a student can
// actually write on, a scenario gets more, and multiple-choice gets checkboxes
// plus a final answer blank. Everything is real vector text, so it stays crisp
// when printed and remains selectable.
//
// jsPDF is imported dynamically by callers so it stays out of the main bundle.

import type { jsPDF } from 'jspdf'

export type QuestionType = 'multiple-choice' | 'short-answer' | 'scenario'

export interface WorksheetQuestion {
  type: QuestionType
  prompt: string
  options: string[]
  answer: string
}

export interface Worksheet {
  title: string
  instructions: string
  questions: WorksheetQuestion[]
}

// Letter page in points.
const PAGE_W = 612
const PAGE_H = 792
const MARGIN = 54 // 0.75in
const CONTENT_W = PAGE_W - MARGIN * 2

// Handwriting needs room: ~26pt between rules is comfortable for teen writing.
const RULE_GAP = 26
const LINES_FOR: Record<QuestionType, number> = {
  'multiple-choice': 0,
  'short-answer': 3,
  scenario: 6,
}

const INK = [12, 26, 39] as const
const BLUE = [0, 119, 181] as const
const RULE = [170, 178, 186] as const
const MUTED = [92, 100, 112] as const

export interface WorksheetLabels {
  name: string
  date: string
  answerKey: string
  answerLabel: string
  teacherNote: string
  page: string
}

export const EN_LABELS: WorksheetLabels = {
  name: 'Name',
  date: 'Date',
  answerKey: 'Answer Key',
  answerLabel: 'Answer',
  teacherNote: 'Teacher copy - remove this page before handing out.',
  page: 'Page',
}

export const ES_LABELS: WorksheetLabels = {
  name: 'Nombre',
  date: 'Fecha',
  answerKey: 'Clave de respuestas',
  answerLabel: 'Respuesta',
  teacherNote: 'Copia del maestro: retira esta hoja antes de repartir.',
  page: 'Página',
}

export const ZH_LABELS: WorksheetLabels = {
  name: '姓名',
  date: '日期',
  answerKey: '答案',
  answerLabel: '答案',
  teacherNote: '教师版：发给学生前请移除此页。',
  page: '第',
}

/**
 * jsPDF's built-in fonts are Latin-only, so CJK would render as blank boxes.
 * Detect it and fall back to Latin labels rather than print garbage; the
 * question text itself still comes through for Spanish/English worksheets.
 */
function hasCjk(s: string): boolean {
  return /[㐀-鿿豈-﫿]/.test(s)
}

export function labelsFor(lang: string): WorksheetLabels {
  if (lang === 'es') return ES_LABELS
  if (lang === 'zh') return ZH_LABELS
  return EN_LABELS
}

export function isCjkWorksheet(w: Worksheet): boolean {
  return hasCjk(w.title + w.instructions + w.questions.map((q) => q.prompt).join(''))
}

/** Draw the ruled answer area and return the y position below it. */
function ruledLines(doc: jsPDF, y: number, count: number): number {
  doc.setDrawColor(...RULE)
  doc.setLineWidth(0.6)
  let cursor = y
  for (let i = 0; i < count; i++) {
    cursor += RULE_GAP
    doc.line(MARGIN + 12, cursor, PAGE_W - MARGIN, cursor)
  }
  return cursor + 10
}

/** Vertical space a question needs, used for page-break and fill decisions. */
function questionHeight(doc: jsPDF, q: WorksheetQuestion): number {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  const promptLines = doc.splitTextToSize(q.prompt, CONTENT_W - 22)
  const optionsHeight = q.type === 'multiple-choice' ? q.options.length * 20 + 24 : 0
  return promptLines.length * 14 + optionsHeight + (LINES_FOR[q.type] ?? 3) * RULE_GAP + 34
}

/** An empty square a student can tick. */
function checkbox(doc: jsPDF, x: number, y: number) {
  doc.setDrawColor(...MUTED)
  doc.setLineWidth(0.8)
  doc.rect(x, y - 8, 10, 10)
}

/**
 * Fetch the BFF logo and return it as a data URL, which is the only image form
 * jsPDF accepts. Returns null if it cannot be loaded so branding degrades to
 * the wordmark rather than failing the whole export.
 */
export async function loadLogo(): Promise<{ data: string; ratio: number } | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}brand/logo.png`)
    if (!res.ok) return null
    const blob = await res.blob()
    const data = await new Promise<string>((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = () => resolve(String(fr.result))
      fr.onerror = () => reject(fr.error)
      fr.readAsDataURL(blob)
    })
    const ratio = await new Promise<number>((resolve) => {
      const img = new Image()
      img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 3)
      img.onerror = () => resolve(3)
      img.src = data
    })
    return { data, ratio }
  } catch {
    return null
  }
}

/** Brand rule + logo across every page footer, plus page numbers. */
function footer(
  doc: jsPDF,
  labels: WorksheetLabels,
  latinOnly: boolean,
  logo: { data: string; ratio: number } | null,
) {
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    const baseline = PAGE_H - 34

    // Hairline above the footer ties the page together.
    doc.setDrawColor(...RULE)
    doc.setLineWidth(0.5)
    doc.line(MARGIN, baseline - 14, PAGE_W - MARGIN, baseline - 14)

    let x = MARGIN
    if (logo) {
      const h = 24
      const w = h * logo.ratio
      doc.addImage(logo.data, 'PNG', x, baseline - 16, w, h, undefined, 'FAST')
      x += w + 6
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...BLUE)
    doc.text('BFF Classroom', x, baseline)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...MUTED)
    doc.text('Building Financial Futures of America', x, baseline + 10)

    const word = latinOnly ? EN_LABELS.page : labels.page
    doc.setTextColor(...MUTED)
    doc.text(`${word} ${i} / ${pages}`, PAGE_W - MARGIN, baseline, { align: 'right' })
  }
}

/**
 * Render the worksheet. Returns the jsPDF document so the caller can save it or
 * turn it into a blob URL for preview.
 */
export function buildWorksheetPdf(
  doc: jsPDF,
  worksheet: Worksheet,
  lang: string,
  meta: { topic: string; gradeBand: string },
  logo: { data: string; ratio: number } | null = null,
): jsPDF {
  // Built-in fonts have no CJK glyphs; fall back to Latin chrome so a Chinese
  // worksheet still prints its structure instead of empty boxes.
  const latinOnly = isCjkWorksheet(worksheet)
  const labels = latinOnly ? EN_LABELS : labelsFor(lang)

  let y = MARGIN

  // ---- Header ----
  doc.setFillColor(...INK)
  doc.rect(0, 0, PAGE_W, 8, 'F')

  // Brand lockup above the title so the sheet is identifiable at a glance.
  if (logo) {
    const h = 42
    doc.addImage(logo.data, 'PNG', MARGIN, y - 8, h * logo.ratio, h, undefined, 'FAST')
    y += h - 2
  } else {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...BLUE)
    doc.text('BFF CLASSROOM', MARGIN, y + 6)
    y += 18
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(17)
  doc.setTextColor(...INK)
  const titleLines = doc.splitTextToSize(worksheet.title, CONTENT_W)
  doc.text(titleLines, MARGIN, y + 14)
  y += 14 + titleLines.length * 20

  if (meta.gradeBand) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...MUTED)
    doc.text(meta.gradeBand, MARGIN, y)
    y += 14
  }

  // Name / date rules
  y += 6
  doc.setFontSize(10)
  doc.setTextColor(...INK)
  doc.setFont('helvetica', 'bold')
  doc.text(`${labels.name}:`, MARGIN, y)
  doc.setDrawColor(...RULE)
  doc.setLineWidth(0.7)
  doc.line(MARGIN + 42, y + 2, MARGIN + 280, y + 2)
  doc.text(`${labels.date}:`, MARGIN + 310, y)
  doc.line(MARGIN + 352, y + 2, PAGE_W - MARGIN, y + 2)
  y += 24

  // Instructions
  if (worksheet.instructions) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...MUTED)
    const ins = doc.splitTextToSize(worksheet.instructions, CONTENT_W)
    doc.text(ins, MARGIN, y)
    y += ins.length * 13 + 6
  }

  doc.setDrawColor(...BLUE)
  doc.setLineWidth(1.5)
  doc.line(MARGIN, y, PAGE_W - MARGIN, y)
  y += 22

  // ---- Questions ----
  worksheet.questions.forEach((q, i) => {
    const numLabel = `${i + 1}.`
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    const promptLines = doc.splitTextToSize(q.prompt, CONTENT_W - 22)

    // How much vertical room this question needs, so we never split one across
    // a page break mid-answer.
    const lineCount = LINES_FOR[q.type] ?? 3
    const needed = questionHeight(doc, q)

    if (y + needed > PAGE_H - 60) {
      doc.addPage()
      y = MARGIN
    }

    doc.setTextColor(...BLUE)
    doc.text(numLabel, MARGIN, y)
    doc.setTextColor(...INK)
    doc.text(promptLines, MARGIN + 22, y)
    y += promptLines.length * 14 + 6

    if (q.type === 'multiple-choice') {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10.5)
      doc.setTextColor(...INK)
      q.options.forEach((opt, oi) => {
        const letter = String.fromCharCode(65 + oi)
        checkbox(doc, MARGIN + 24, y)
        const optLines = doc.splitTextToSize(`${letter}.  ${opt}`, CONTENT_W - 60)
        doc.text(optLines, MARGIN + 42, y)
        y += Math.max(20, optLines.length * 14)
      })
      // A blank so the student commits to one answer.
      y += 6
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text(`${labels.answerLabel}:`, MARGIN + 24, y)
      doc.setDrawColor(...RULE)
      doc.line(MARGIN + 24 + 52, y + 2, MARGIN + 190, y + 2)
      y += 22
    } else {
      // A written question that is the last to fit on its page expands into
      // whatever space is left, so a page break turns into extra writing room
      // instead of a half-empty sheet.
      let lines = lineCount
      const next = worksheet.questions[i + 1]
      const afterBase = y + lineCount * RULE_GAP + 16
      const nextFits = next ? afterBase + questionHeight(doc, next) <= PAGE_H - 60 : false
      if (!nextFits) {
        const room = Math.floor((PAGE_H - 70 - y) / RULE_GAP)
        lines = Math.max(lineCount, Math.min(room, 16))
      }
      y = ruledLines(doc, y, lines)
      y += 6
    }
  })

  // ---- Answer key on its own page ----
  doc.addPage()
  y = MARGIN
  doc.setFillColor(...BLUE)
  doc.rect(0, 0, PAGE_W, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...INK)
  doc.text(latinOnly ? EN_LABELS.answerKey : labels.answerKey, MARGIN, y + 12)
  y += 12 + 18
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text(latinOnly ? EN_LABELS.teacherNote : labels.teacherNote, MARGIN, y)
  y += 20

  worksheet.questions.forEach((q, i) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...INK)
    const ansLines = doc.splitTextToSize(`${i + 1}. ${q.answer}`, CONTENT_W)
    if (y + ansLines.length * 13 > PAGE_H - 60) {
      doc.addPage()
      y = MARGIN
    }
    doc.setFont('helvetica', 'normal')
    doc.text(ansLines, MARGIN, y)
    y += ansLines.length * 13 + 8
  })

  footer(doc, labels, latinOnly, logo)
  return doc
}

/** Filename-safe slug for the download. */
export function worksheetFilename(topic: string): string {
  const slug =
    topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50) || 'worksheet'
  return `bff-worksheet-${slug}.pdf`
}

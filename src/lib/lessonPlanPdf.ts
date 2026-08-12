// Turns the Markdown a lesson plan comes back as into a printable PDF, laid
// out to match the student worksheet so a mentor's two documents look like they
// came from the same place.
//
// Downloading a .md file asked a teacher to find something that opens Markdown,
// which on a school laptop is usually nothing. This renders the real structure
// instead: headings, bullets, numbered steps, and the timed agenda table.
//
// Deliberately a small Markdown subset, matching what the generator is prompted
// to produce. Anything unrecognised falls through as a paragraph rather than
// being dropped, so an unexpected construct costs formatting, never content.

import type { jsPDF } from 'jspdf'

const PAGE_W = 612
const PAGE_H = 792
const MARGIN = 54
const CONTENT_W = PAGE_W - MARGIN * 2
const BOTTOM = PAGE_H - 62

const INK = [12, 26, 39] as const
const BLUE = [0, 119, 181] as const
const RULE = [170, 178, 186] as const
const MUTED = [92, 100, 112] as const
const BAND = [241, 244, 247] as const

type Block =
  | { kind: 'h'; level: number; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'li'; text: string; ordered: boolean; marker: string }
  | { kind: 'table'; rows: string[][] }
  | { kind: 'rule' }

/** Strip the inline syntax the built-in fonts cannot express as-is. */
function inline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(^|\W)\*(?!\s)(.+?)\*(?=\W|$)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .trim()
}

function splitRow(line: string): string[] {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => inline(c))
}

/** A `|---|---|` separator, which carries alignment rather than content. */
function isDivider(line: string): boolean {
  return /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(line) && line.includes('-')
}

export function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  const blocks: Block[] = []
  let para: string[] = []
  let fenced = false

  const flush = () => {
    if (para.length) {
      blocks.push({ kind: 'p', text: inline(para.join(' ')) })
      para = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // The prompt forbids wrapping the document in a fence, but a stray one
    // should not turn the rest of the plan into literal backticks.
    if (/^\s*```/.test(line)) {
      flush()
      fenced = !fenced
      continue
    }
    if (fenced) {
      para.push(line)
      continue
    }

    if (!line.trim()) {
      flush()
      continue
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    if (heading) {
      flush()
      blocks.push({ kind: 'h', level: heading[1].length, text: inline(heading[2]) })
      continue
    }

    if (/^\s*([-*_])\s*\1\s*\1[\s\-*_]*$/.test(line)) {
      flush()
      blocks.push({ kind: 'rule' })
      continue
    }

    // A table is its header row plus every row under it, so it is consumed
    // whole here rather than one line at a time.
    if (line.includes('|') && isDivider(lines[i + 1] ?? '')) {
      flush()
      const rows = [splitRow(line)]
      i++
      while (i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].trim()) {
        rows.push(splitRow(lines[++i]))
      }
      blocks.push({ kind: 'table', rows })
      continue
    }

    const bullet = /^\s*[-*+]\s+(.*)$/.exec(line)
    if (bullet) {
      flush()
      blocks.push({ kind: 'li', text: inline(bullet[1]), ordered: false, marker: '•' })
      continue
    }

    const numbered = /^\s*(\d+)[.)]\s+(.*)$/.exec(line)
    if (numbered) {
      flush()
      blocks.push({ kind: 'li', text: inline(numbered[2]), ordered: true, marker: `${numbered[1]}.` })
      continue
    }

    para.push(line.trim())
  }
  flush()
  return blocks.filter((b) => b.kind !== 'p' || b.text.length > 0)
}

/** True if the plan contains characters the built-in PDF fonts cannot draw. */
export function hasCjk(s: string): boolean {
  return /[　-鿿＀-￯]/.test(s)
}

export function lessonPlanFilename(topic: string): string {
  const slug =
    topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50) || 'lesson-plan'
  return `bff-lesson-plan-${slug}.pdf`
}

export function buildLessonPlanPdf(
  doc: jsPDF,
  markdown: string,
  meta: { topic: string; gradeBand: string; minutes: number },
  logo: { data: string; ratio: number } | null = null,
): jsPDF {
  const blocks = parseMarkdown(markdown)
  let y = MARGIN

  function page() {
    doc.addPage()
    y = MARGIN
  }
  function need(h: number) {
    if (y + h > BOTTOM) page()
  }

  // ---- Header ----
  doc.setFillColor(...INK)
  doc.rect(0, 0, PAGE_W, 8, 'F')

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
  doc.setFontSize(9)
  doc.setTextColor(...BLUE)
  doc.text('LESSON PLAN', MARGIN, y + 10)
  y += 22

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...INK)
  const title = doc.splitTextToSize(meta.topic || 'Lesson plan', CONTENT_W)
  doc.text(title, MARGIN, y)
  y += title.length * 21

  const facts = [meta.gradeBand, meta.minutes ? `${meta.minutes} minutes` : ''].filter(Boolean)
  if (facts.length) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...MUTED)
    doc.text(facts.join('  ·  '), MARGIN, y + 4)
    y += 16
  }
  doc.setDrawColor(...RULE)
  doc.setLineWidth(0.6)
  doc.line(MARGIN, y + 4, PAGE_W - MARGIN, y + 4)
  y += 22

  // ---- Body ----
  for (const block of blocks) {
    if (block.kind === 'rule') {
      need(16)
      doc.setDrawColor(...RULE)
      doc.setLineWidth(0.5)
      doc.line(MARGIN, y, PAGE_W - MARGIN, y)
      y += 14
      continue
    }

    if (block.kind === 'h') {
      // The model's own H1 usually restates the title, which is already set.
      const size = block.level <= 1 ? 14 : block.level === 2 ? 12.5 : 11
      const lines = doc.splitTextToSize(block.text, CONTENT_W)
      need(lines.length * (size + 4) + 18)
      y += block.level <= 2 ? 12 : 8
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(size)
      const tone = block.level <= 2 ? BLUE : INK
      doc.setTextColor(tone[0], tone[1], tone[2])
      doc.text(lines, MARGIN, y)
      y += lines.length * (size + 3) + 5
      continue
    }

    if (block.kind === 'p') {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(...INK)
      const lines: string[] = doc.splitTextToSize(block.text, CONTENT_W)
      for (const line of lines) {
        need(15)
        doc.text(line, MARGIN, y)
        y += 14
      }
      y += 5
      continue
    }

    if (block.kind === 'li') {
      const indent = 16
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      const lines: string[] = doc.splitTextToSize(block.text, CONTENT_W - indent)
      need(lines.length * 14 + 2)
      const markerTone = block.ordered ? BLUE : MUTED
      doc.setTextColor(markerTone[0], markerTone[1], markerTone[2])
      doc.setFont('helvetica', block.ordered ? 'bold' : 'normal')
      doc.text(block.marker, MARGIN + 2, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...INK)
      for (const line of lines) {
        need(15)
        doc.text(line, MARGIN + indent, y)
        y += 14
      }
      y += 3
      continue
    }

    // ---- Table: the timed agenda, usually. Columns are sized by their
    // widest cell so a "Minutes" column does not get the same width as
    // "Teacher does / Students do".
    const rows = block.rows
    const cols = Math.max(...rows.map((r) => r.length))
    const norm = rows.map((r) => {
      const copy = [...r]
      while (copy.length < cols) copy.push('')
      return copy
    })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const weights = Array.from({ length: cols }, (_, c) =>
      Math.max(...norm.map((r) => doc.getTextWidth(r[c]) || 1)),
    )
    const total = weights.reduce((a, w) => a + w, 0)
    // Clamp so one long cell cannot squeeze the others to nothing.
    const min = CONTENT_W / (cols * 3)
    let widths = weights.map((w) => Math.max(min, (w / total) * CONTENT_W))
    const scale = CONTENT_W / widths.reduce((a, w) => a + w, 0)
    widths = widths.map((w) => w * scale)

    const pad = 6
    for (let r = 0; r < norm.length; r++) {
      const head = r === 0
      doc.setFont('helvetica', head ? 'bold' : 'normal')
      doc.setFontSize(head ? 9 : 9.5)
      const cells = norm[r].map((text, c) =>
        doc.splitTextToSize(text, widths[c] - pad * 2),
      ) as string[][]
      const rowH = Math.max(...cells.map((l) => l.length)) * 12 + pad * 2

      if (y + rowH > BOTTOM) {
        page()
        // Repeat the header so a table split across pages stays readable.
        if (!head) {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9)
          const hc = norm[0].map((t, c) => doc.splitTextToSize(t, widths[c] - pad * 2)) as string[][]
          const hh = Math.max(...hc.map((l) => l.length)) * 12 + pad * 2
          doc.setFillColor(...BAND)
          doc.rect(MARGIN, y, CONTENT_W, hh, 'F')
          let hx = MARGIN
          doc.setTextColor(...INK)
          hc.forEach((lines, c) => {
            doc.text(lines, hx + pad, y + pad + 9)
            hx += widths[c]
          })
          y += hh
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9.5)
        }
      }

      if (head) {
        doc.setFillColor(...BAND)
        doc.rect(MARGIN, y, CONTENT_W, rowH, 'F')
      }
      let x = MARGIN
      doc.setTextColor(...INK)
      cells.forEach((lines, c) => {
        doc.text(lines, x + pad, y + pad + 9)
        x += widths[c]
      })
      doc.setDrawColor(...RULE)
      doc.setLineWidth(0.4)
      doc.line(MARGIN, y + rowH, PAGE_W - MARGIN, y + rowH)
      y += rowH
    }
    y += 12
  }

  // ---- Footer on every page ----
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    const baseline = PAGE_H - 34
    doc.setDrawColor(...RULE)
    doc.setLineWidth(0.5)
    doc.line(MARGIN, baseline - 14, PAGE_W - MARGIN, baseline - 14)

    let x = MARGIN
    if (logo) {
      const h = 24
      doc.addImage(logo.data, 'PNG', x, baseline - 16, h * logo.ratio, h, undefined, 'FAST')
      x += h * logo.ratio + 6
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...BLUE)
    doc.text('BFF Classroom', x, baseline)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...MUTED)
    doc.text('Building Financial Futures of America', x, baseline + 10)
    doc.text(`Page ${i} / ${pages}`, PAGE_W - MARGIN, baseline, { align: 'right' })
  }

  return doc
}

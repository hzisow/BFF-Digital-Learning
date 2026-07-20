// Tiny CSV helpers: build a spreadsheet-safe CSV string and trigger a download
// in the browser. Used by mentor analytics to export class progress.

/** Quote a single cell so commas, quotes, and newlines survive Excel/Sheets. */
function cell(value: string | number | null | undefined): string {
  const s = value == null ? '' : String(value)
  // Guard against CSV/formula injection: a leading =,+,-,@ can execute in Excel.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s
  return /["\n,]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe
}

/** Rows (including an optional header row) → a CSV string with CRLF line endings. */
export function toCsv(rows: Array<Array<string | number | null | undefined>>): string {
  return rows.map((r) => r.map(cell).join(',')).join('\r\n')
}

/** Download a CSV string as a file. No-op outside the browser. */
export function downloadCsv(filename: string, csv: string): void {
  if (typeof document === 'undefined') return
  // Prepend a BOM so Excel reads UTF-8 (e.g. accented Spanish names) correctly.
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Lesson Plan & Worksheet Generator — a mentor/admin tool (Team tab). Mentors
// pick a kind (lesson plan or worksheet), a topic, a grade band, and (for
// lesson plans) a class length, then Claude drafts classroom-ready materials as
// Markdown. Mentors can copy, print, or download the result as a .md file.
//
// Access is gated to signed-in BFF team members; the edge function additionally
// best-effort checks the caller is an approved mentor.

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { Check, Copy, Download, Printer, Sparkles, Wand2 } from 'lucide-react'
import { invokeAI, AI_ENABLED, AINotConfiguredError } from '../../lib/ai'
import { buildWorksheetPdf, worksheetFilename, loadLogo } from '../../lib/worksheetPdf'
import type { Worksheet } from '../../lib/worksheetPdf'
import { useLang } from '../../lib/i18n'
import { useAdmin } from '../../lib/session'
import { Skeleton, SkeletonPage, SkeletonText } from '../../components/Skeleton'

type Kind = 'lesson-plan' | 'worksheet'

// ---------- Tiny, safe Markdown-to-HTML renderer ----------
// We deliberately avoid a Markdown npm dependency. Everything is HTML-escaped
// FIRST, then a small, fixed set of block/inline patterns is applied, so no raw
// user/model HTML can ever reach the DOM.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Inline: **bold**, *italic*, `code`. Input is already HTML-escaped.
function inlineMd(s: string): string {
  return s
    .replace(/`([^`]+)`/g, '<code class="rounded bg-slate-100 px-1 py-0.5 text-[0.85em] text-slate-800">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
}

function renderMarkdown(md: string): string {
  const lines = escapeHtml(md).replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Blank line starts a paragraph break.
    if (/^\s*$/.test(line)) {
      i++
      continue
    }

    // Table: a header row followed by a |---|---| separator row.
    if (line.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) && lines[i + 1].includes('-')) {
      const parseRow = (row: string) =>
        row
          .trim()
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((c) => c.trim())
      const headers = parseRow(line)
      i += 2
      const bodyRows: string[][] = []
      while (i < lines.length && lines[i].includes('|') && !/^\s*$/.test(lines[i])) {
        bodyRows.push(parseRow(lines[i]))
        i++
      }
      const thead =
        '<thead><tr>' +
        headers.map((h) => `<th class="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold text-slate-800">${inlineMd(h)}</th>`).join('') +
        '</tr></thead>'
      const tbody =
        '<tbody>' +
        bodyRows
          .map(
            (r) =>
              '<tr>' +
              r.map((c) => `<td class="border border-slate-200 px-3 py-2 align-top text-slate-700">${inlineMd(c)}</td>`).join('') +
              '</tr>',
          )
          .join('') +
        '</tbody>'
      out.push(`<div class="my-3 overflow-x-auto"><table class="w-full border-collapse text-sm">${thead}${tbody}</table></div>`)
      continue
    }

    // Headings.
    const h = /^(#{1,6})\s+(.*)$/.exec(line)
    if (h) {
      const level = h[1].length
      const sizes: Record<number, string> = {
        1: 'mt-2 mb-3 font-display text-2xl font-bold text-slate-900',
        2: 'mt-5 mb-2 font-display text-xl font-bold text-slate-900',
        3: 'mt-4 mb-2 font-display text-lg font-semibold text-slate-900',
        4: 'mt-3 mb-1 font-semibold text-slate-900',
        5: 'mt-3 mb-1 font-semibold text-slate-700',
        6: 'mt-3 mb-1 font-semibold text-slate-600',
      }
      out.push(`<h${level} class="${sizes[level]}">${inlineMd(h[2].trim())}</h${level}>`)
      i++
      continue
    }

    // Horizontal rule.
    if (/^\s*([-*_])\s*(\1\s*){2,}$/.test(line)) {
      out.push('<hr class="my-4 border-slate-200" />')
      i++
      continue
    }

    // Ordered list.
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(`<li class="mb-1">${inlineMd(lines[i].replace(/^\s*\d+\.\s+/, ''))}</li>`)
        i++
      }
      out.push(`<ol class="my-2 list-decimal space-y-0.5 pl-6 text-slate-700">${items.join('')}</ol>`)
      continue
    }

    // Unordered list.
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(`<li class="mb-1">${inlineMd(lines[i].replace(/^\s*[-*+]\s+/, ''))}</li>`)
        i++
      }
      out.push(`<ul class="my-2 list-disc space-y-0.5 pl-6 text-slate-700">${items.join('')}</ul>`)
      continue
    }

    // Paragraph: gather consecutive non-blank, non-structural lines.
    const para: string[] = []
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !lines[i].includes('|')
    ) {
      para.push(lines[i].trim())
      i++
    }
    if (para.length) {
      out.push(`<p class="my-2 leading-relaxed text-slate-700">${inlineMd(para.join(' '))}</p>`)
    } else {
      i++
    }
  }

  return out.join('\n')
}

export default function LessonPlanGenerator() {
  const { adminUser, adminReady } = useAdmin()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  const [kind, setKind] = useState<Kind>('lesson-plan')
  const [topic, setTopic] = useState('')
  const [gradeBand, setGradeBand] = useState('')
  const [minutes, setMinutes] = useState(45)
  const [busy, setBusy] = useState(false)
  const [markdown, setMarkdown] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notConfigured, setNotConfigured] = useState(false)
  const [copied, setCopied] = useState(false)
  // Worksheets come back structured and are rendered as a real PDF; lesson
  // plans stay Markdown.
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfUrlRef = useRef<string | null>(null)
  const pdfFrameRef = useRef<HTMLIFrameElement | null>(null)

  const renderedHtml = useMemo(() => (markdown ? renderMarkdown(markdown) : ''), [markdown])

  // Blob URLs are a manual resource: release the previous one whenever it is
  // replaced, and on unmount, so previewing repeatedly cannot leak memory.
  useEffect(() => {
    pdfUrlRef.current = pdfUrl
    return () => {
      if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current)
    }
  }, [pdfUrl])

  // Guard: mentors only. Wait for auth to resolve before deciding, so we don't
  // redirect a signed-in mentor during the initial session check.
  if (!adminReady) {
    return <SkeletonPage label={zh ? '加载中…' : es ? 'Cargando…' : 'Loading…'} cards={2} />
  }
  if (!adminUser) return <Navigate to="/team" replace />

  const isWorksheet = kind === 'worksheet'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!topic.trim() || busy) return
    setBusy(true)
    setError(null)
    setNotConfigured(false)
    setMarkdown('')
    setWorksheet(null)
    setPdfUrl(null)
    const failed = zh
      ? '生成器无法完成此请求。请尝试改写主题。'
      : es
        ? 'El generador no pudo completar esta solicitud. Intenta reformular el tema.'
        : "The generator couldn't complete this request. Try rephrasing the topic."
    try {
      const res = await invokeAI<{ markdown?: string; worksheet?: Worksheet }>('lesson-plan', {
        kind,
        topic: topic.trim(),
        gradeBand: gradeBand.trim(),
        minutes,
        lang,
      })
      if (kind === 'worksheet') {
        const ws = res.worksheet
        if (!ws?.questions?.length) {
          setError(failed)
        } else {
          setWorksheet(ws)
          await renderPdf(ws)
        }
      } else {
        const md = res.markdown ?? ''
        if (!md) setError(failed)
        else setMarkdown(md)
      }
    } catch (err) {
      if (err instanceof AINotConfiguredError) {
        setNotConfigured(true)
      } else {
        setError(err instanceof Error ? err.message : String(err))
      }
    } finally {
      setBusy(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError(zh ? '无法复制到剪贴板。' : es ? 'No se pudo copiar al portapapeles.' : 'Could not copy to clipboard.')
    }
  }

  /**
   * Build the worksheet PDF and expose it as a blob URL for the inline
   * preview. jsPDF is imported on demand so it never lands in the main bundle.
   */
  async function renderPdf(ws: Worksheet) {
    const [{ jsPDF }, logo] = await Promise.all([import('jspdf'), loadLogo()])
    const doc = new jsPDF({ unit: 'pt', format: 'letter' })
    buildWorksheetPdf(doc, ws, lang, { topic: topic.trim(), gradeBand: gradeBand.trim() }, logo)
    const url = URL.createObjectURL(doc.output('blob'))
    setPdfUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }

  function saveFile(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  async function handleDownload() {
    // Worksheets download as a print-ready PDF; lesson plans stay Markdown so
    // mentors can paste them into their own docs.
    if (isWorksheet && worksheet) {
      const [{ jsPDF }, logo] = await Promise.all([import('jspdf'), loadLogo()])
      const doc = new jsPDF({ unit: 'pt', format: 'letter' })
      buildWorksheetPdf(
        doc,
        worksheet,
        lang,
        { topic: topic.trim(), gradeBand: gradeBand.trim() },
        logo,
      )
      doc.save(worksheetFilename(topic.trim()))
      return
    }
    const base = (topic.trim() || 'lesson-plan')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60)
    saveFile(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }), `lesson-plan-${base || 'bff'}.md`)
  }

  const resultName = zh ? '生成的材料' : es ? 'Materiales generados' : 'Generated materials'

  return (
    <div>
      {/* Editorial ink hero — mentor teaching tool. */}
      <section className="ed-hero">
        <span
          aria-hidden="true"
          className="ed-hero-orbit -right-24 -top-40 h-[520px] w-[520px]"
        />
        <span
          aria-hidden="true"
          className="ed-hero-orbit gold -left-40 bottom-[-11rem] h-[440px] w-[440px]"
        />
        <div className="relative z-[1] mx-auto max-w-4xl px-4 py-14 sm:py-16">
          <p className="eyebrow text-bff-300">
            <span className="eyebrow-line" aria-hidden="true" />
            <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
            {zh ? '导师工具' : es ? 'Herramienta para mentores' : 'Mentor tool'}
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
            {zh ? (
              <>
                教案与练习题<em>生成器</em>
              </>
            ) : es ? (
              <>
                <em>Generador</em> de planes de clase y hojas de trabajo
              </>
            ) : (
              <>
                Lesson plan &amp; worksheet <em>generator</em>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            {zh
              ? '为您的课堂草拟符合 BFF Academy 课程的理财教学材料。请先审阅并根据学生情况进行调整。'
              : es
                ? 'Redacta materiales de educación financiera alineados con el currículo de BFF Academy para tu aula. Revísalos y adáptalos a tus estudiantes antes de usarlos.'
                : 'Draft financial-literacy teaching materials aligned to the BFF Academy curriculum for your classroom. Always review and adapt them for your students before use.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10">

      {!AI_ENABLED && (
        <div role="status" className="card mb-6 border-amber-200 bg-amber-50">
          <p className="text-sm font-medium text-amber-800">
            {zh
              ? 'AI 功能需要连接 Supabase 后端。'
              : es
                ? 'Las funciones de IA requieren que el backend de Supabase esté conectado.'
                : 'AI features require the Supabase backend to be connected.'}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card mb-8">
        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold text-slate-700">
            {zh ? '材料类型' : es ? 'Tipo de material' : 'What do you need?'}
          </legend>
          <div className="flex flex-wrap gap-3">
            {(['lesson-plan', 'worksheet'] as Kind[]).map((k) => {
              const label =
                k === 'lesson-plan'
                  ? zh
                    ? '教案'
                    : es
                      ? 'Plan de clase'
                      : 'Lesson plan'
                  : zh
                    ? '练习题'
                    : es
                      ? 'Hoja de trabajo'
                      : 'Worksheet'
              const active = kind === k
              return (
                <label
                  key={k}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-2.5 font-display font-semibold transition focus-within:ring-2 focus-within:ring-bff-400 focus-within:ring-offset-2 ${
                    active ? 'border-bff-600 bg-bff-50 text-bff-700' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="kind"
                    value={k}
                    checked={active}
                    onChange={() => setKind(k)}
                    className="h-4 w-4 accent-bff-600"
                  />
                  {label}
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold text-slate-700">
              {zh ? '主题' : es ? 'Tema' : 'Topic'}
            </span>
            <input
              className="input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              placeholder={
                zh
                  ? '例如：了解信用评分'
                  : es
                    ? 'p. ej. Cómo funcionan los puntajes de crédito'
                    : 'e.g. How credit scores work'
              }
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">
              {zh ? '年级段' : es ? 'Nivel de grado' : 'Grade band'}
            </span>
            <input
              className="input"
              type="text"
              value={gradeBand}
              onChange={(e) => setGradeBand(e.target.value)}
              placeholder={zh ? '默认：初中/高中' : es ? 'Predeterminado: secundaria/preparatoria' : 'Default: middle/high school'}
            />
          </label>

          {!isWorksheet && (
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">
                {zh ? '课时长度（分钟）' : es ? 'Duración de la clase (minutos)' : 'Class length (minutes)'}
              </span>
              <input
                className="input"
                type="number"
                min={10}
                max={180}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </label>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button type="submit" className="btn-primary" disabled={busy || !AI_ENABLED || !topic.trim()} aria-busy={busy}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {busy
              ? zh
                ? '生成中…'
                : es
                  ? 'Generando…'
                  : 'Generating…'
              : zh
                ? '生成'
                : es
                  ? 'Generar'
                  : 'Generate'}
          </button>
          {busy && (
            <span role="status" className="text-sm text-slate-500">
              {zh ? '正在起草材料…' : es ? 'Redactando los materiales…' : 'Drafting your materials…'}
            </span>
          )}
        </div>
      </form>

      {notConfigured && (
        <div role="status" className="card mb-6 border-amber-200 bg-amber-50">
          <h2 className="font-display text-lg font-bold text-amber-900">
            {zh ? '尚未设置' : es ? 'Aún no está configurado' : 'Not set up yet'}
          </h2>
          <p className="mt-1 text-sm text-amber-800">
            {zh
              ? 'AI 功能尚未启用。请在 Supabase 的 Edge Functions 密钥中添加您的 Anthropic API 密钥。'
              : es
                ? 'Las funciones de IA aún no están activas. Agrega tu clave de Anthropic en los secretos de Edge Functions de Supabase.'
                : 'AI features are not set up yet — add your Anthropic key in Supabase (Edge Functions secrets).'}
          </p>
        </div>
      )}

      {error && (
        <div role="alert" className="card mb-6 border-red-200 bg-red-50">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      <section
        role="region"
        aria-label={resultName}
        aria-live="polite"
        aria-busy={busy}
      >
        {/* While Claude drafts, hold the shape of the result that is coming.
            The section above already carries aria-live + aria-busy, and every
            skeleton shape is aria-hidden, so nothing is announced twice. */}
        {busy && isWorksheet && !worksheet && (
          <div className="card">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-11 w-28" />
                <Skeleton className="h-11 w-36" />
              </div>
            </div>
            {/* Stands in for the PDF preview iframe. */}
            <Skeleton className="h-[860px] w-full" />
            <Skeleton className="mt-3 h-3 w-3/4" />
          </div>
        )}

        {busy && !isWorksheet && !markdown && (
          <div className="card">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Skeleton className="h-6 w-56" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-11 w-24" />
                <Skeleton className="h-11 w-24" />
                <Skeleton className="h-11 w-32" />
              </div>
            </div>
            <Skeleton className="h-7 w-2/3" />
            <SkeletonText lines={4} className="mt-4" />
            <Skeleton className="mt-6 h-5 w-1/2" />
            <SkeletonText lines={5} className="mt-4" />
            <Skeleton className="mt-6 h-5 w-2/5" />
            <SkeletonText lines={3} className="mt-4" />
          </div>
        )}

        {/* Worksheet: a real PDF, previewed exactly as it will print. */}
        {worksheet && (
          <div className="card">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-ink">{worksheet.title}</h2>
                <p className="mt-1 text-sm text-ink/60">
                  {worksheet.questions.length}{' '}
                  {zh ? '道题 · 含答案页' : es ? 'preguntas · con clave de respuestas' : 'questions · answer key included'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    // Print the PDF itself, not the page around it.
                    pdfFrameRef.current?.contentWindow?.print()
                  }}
                  disabled={!pdfUrl}
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  {zh ? '打印' : es ? 'Imprimir' : 'Print'}
                </button>
                <button type="button" className="btn-primary" onClick={() => void handleDownload()}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {zh ? '下载 PDF' : es ? 'Descargar PDF' : 'Download PDF'}
                </button>
              </div>
            </div>
            {pdfUrl ? (
              <iframe
                ref={pdfFrameRef}
                src={pdfUrl}
                title={worksheet.title}
                className="h-[860px] w-full rounded-[6px] border border-ink/15 bg-paper-deep"
              />
            ) : (
              <p className="text-sm text-ink/60">
                {zh ? '正在生成 PDF…' : es ? 'Generando el PDF…' : 'Building the PDF…'}
              </p>
            )}
            <p className="mt-3 text-xs text-ink/50">
              {zh
                ? '学生页留有书写空间；答案在最后一页，发放前可移除。'
                : es
                  ? 'Las páginas del estudiante dejan espacio para escribir; la clave va en la última página y puedes retirarla antes de repartir.'
                  : 'Student pages leave room to write. The answer key is the last page - remove it before handing out.'}
            </p>
          </div>
        )}

        {markdown && (
          <div className="card">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <h2 className="font-display text-xl font-bold text-ink">{resultName}</h2>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-secondary" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  {copied ? (zh ? '已复制' : es ? 'Copiado' : 'Copied') : zh ? '复制' : es ? 'Copiar' : 'Copy'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => window.print()}>
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  {zh ? '打印' : es ? 'Imprimir' : 'Print'}
                </button>
                <button type="button" className="btn-ghost" onClick={() => void handleDownload()}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {zh ? '下载 .md' : es ? 'Descargar .md' : 'Download .md'}
                </button>
              </div>
            </div>
            {copied && (
              <p role="status" className="sr-only">
                {zh ? '已复制到剪贴板' : es ? 'Copiado al portapapeles' : 'Copied to clipboard'}
              </p>
            )}
            <article
              className="max-w-none text-slate-700"
              // Safe: renderMarkdown HTML-escapes all input before applying a
              // fixed, closed set of formatting patterns — no raw HTML passes through.
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        )}
      </section>
      </div>
    </div>
  )
}

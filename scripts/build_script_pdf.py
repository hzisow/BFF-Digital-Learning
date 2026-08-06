"""Turn docs/video-scripts.md into a PDF the recording team can read off.

One source of truth: the Markdown is the script, this only sets it. Re-run after
any edit.

    python3 scripts/build_script_pdf.py

Typeset for reading aloud rather than for skimming, which drives most of the
choices here: 12pt body on 20pt leading, a measure short enough that the eye
does not lose its place returning to the left margin, and every script starting
on a fresh page. A script runs to two pages at this size; what matters is that a
page never breaks mid-paragraph, which the body style enforces.

Fonts are the site's own, reused from the certificate assets. If they ever move,
this falls back to Helvetica rather than failing.
"""

import re
import sys
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "video-scripts.md"
OUT = ROOT / "docs" / "video-scripts.pdf"

INK = colors.HexColor("#0c1a27")
BLUE = colors.HexColor("#0077b5")
GOLD = colors.HexColor("#f0b35a")
MUTED = colors.HexColor("#5c6470")
RULE = colors.HexColor("#c9ced6")

# Words per minute a presenter actually speaks at. The four recorded videos come
# out near this once you discount their pauses.
WPM = 150


def register_fonts() -> tuple[str, str, str]:
    """(body, bold, display). Falls back to the built-ins if the assets moved."""
    fonts = ROOT / "src" / "assets" / "certfonts"
    try:
        pdfmetrics.registerFont(TTFont("PublicSans", fonts / "public-sans-400.ttf"))
        pdfmetrics.registerFont(TTFont("PublicSans-Bold", fonts / "public-sans-700.ttf"))
        pdfmetrics.registerFont(TTFont("Fraunces", fonts / "fraunces-700.ttf"))
        return "PublicSans", "PublicSans-Bold", "Fraunces"
    except Exception as exc:  # noqa: BLE001
        print(f"note: brand fonts unavailable ({exc}), using Helvetica", file=sys.stderr)
        return "Helvetica", "Helvetica-Bold", "Helvetica-Bold"


BODY, BOLD, DISPLAY = register_fonts()

S = {
    "cover_title": ParagraphStyle(
        "cover_title", fontName=DISPLAY, fontSize=30, leading=34, textColor=INK,
        spaceAfter=10,
    ),
    "cover_sub": ParagraphStyle(
        "cover_sub", fontName=BODY, fontSize=12, leading=19, textColor=MUTED,
        spaceAfter=22,
    ),
    "h2": ParagraphStyle(
        "h2", fontName=DISPLAY, fontSize=13, leading=18, textColor=INK,
        spaceBefore=14, spaceAfter=6,
    ),
    "slug": ParagraphStyle(
        "slug", fontName=BOLD, fontSize=8, leading=11, textColor=BLUE,
        spaceAfter=3,
    ),
    "title": ParagraphStyle(
        "title", fontName=DISPLAY, fontSize=21, leading=25, textColor=INK,
        spaceAfter=3,
    ),
    "meta": ParagraphStyle(
        "meta", fontName=BOLD, fontSize=8, leading=12, textColor=MUTED,
        spaceAfter=16,
    ),
    # The read-aloud style. Generous leading is the whole point.
    "body": ParagraphStyle(
        "body", fontName=BODY, fontSize=12, leading=20, textColor=INK,
        alignment=TA_LEFT, spaceAfter=11,
        # Move the whole paragraph to the next page rather than break it. A
        # presenter turning a page mid-sentence is exactly what this document is
        # meant to prevent.
        allowWidows=0, allowOrphans=0,
    ),
    "note": ParagraphStyle(
        "note", fontName=BODY, fontSize=10.5, leading=17, textColor=MUTED,
        spaceAfter=9,
    ),
    "checkpoint": ParagraphStyle(
        "checkpoint", fontName=BOLD, fontSize=8.5, leading=12, textColor=colors.HexColor("#8a5a12"),
        backColor=colors.HexColor("#fdf4e3"),
        borderColor=GOLD, borderWidth=0, borderPadding=(7, 9, 7, 9),
        leftIndent=0, spaceBefore=4, spaceAfter=14,
    ),
}


def md_inline(text: str) -> str:
    """The little Markdown these scripts actually use."""
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+)`", r'<font face="Courier">\1</font>', text)
    return text


def page_furniture(canvas, doc):
    """Hairline and page number on every page after the cover."""
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(0.9 * inch, 0.72 * inch, LETTER[0] - 0.9 * inch, 0.72 * inch)
    canvas.setFont(BOLD, 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.9 * inch, 0.55 * inch, "BFF CLASSROOM  /  VIDEO SCRIPTS")
    canvas.drawRightString(LETTER[0] - 0.9 * inch, 0.55 * inch, str(canvas.getPageNumber() - 1))
    canvas.restoreState()


def build() -> None:
    raw = SRC.read_text(encoding="utf-8")
    # Everything before the first numbered script is front matter.
    blocks = re.split(r"^---\s*$", raw, flags=re.M)
    head, scripts_md = blocks[0], "---".join(blocks[1:])

    doc = BaseDocTemplate(
        str(OUT), pagesize=LETTER,
        leftMargin=0.9 * inch, rightMargin=1.5 * inch,
        topMargin=0.85 * inch, bottomMargin=0.95 * inch,
        title="BFF Classroom video scripts", author="BFF of America",
    )
    frame = Frame(
        doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main",
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame]),
        PageTemplate(id="script", frames=[frame], onPage=page_furniture),
    ])

    story: list = []

    logo = ROOT / "public" / "brand" / "logo-wide.png"
    if logo.exists():
        story.append(Image(str(logo), width=1.9 * inch, height=1.9 * inch / 2.264))
        story.append(Spacer(1, 26))
    story.append(Paragraph("Video scripts", S["cover_title"]))
    story.append(Paragraph(
        "Nine lessons without a recording, written to match the four that have one.",
        S["cover_sub"],
    ))

    story.append(NextPageTemplate("script"))
    story.append(PageBreak())

    # Front matter. Markdown hard-wraps its paragraphs, so join the lines back up
    # before setting them or every line becomes its own paragraph.
    for block in re.split(r"\n\s*\n", head.strip()):
        block = block.strip()
        if not block or block.startswith("# "):
            continue
        if block.startswith("## "):
            story.append(Paragraph(md_inline(block[3:].strip()), S["h2"]))
            continue
        # A numbered list is one paragraph per item, not one per wrapped line.
        items = re.split(r"\n(?=\d+\.\s)", block)
        for item in items:
            story.append(Paragraph(md_inline(" ".join(item.split())), S["note"]))

    story.append(PageBreak())

    # Each "## n. slug" starts a page.
    parts = re.split(r"^## ", scripts_md, flags=re.M)[1:]
    for i, part in enumerate(parts):
        lines = part.splitlines()
        heading = lines[0].strip()
        slug = re.sub(r"^\d+\.\s*", "", heading)
        rest = "\n".join(lines[1:])

        title = ""
        m = re.search(r"\*\*Title:\*\*\s*(.+)", rest)
        if m:
            title = m.group(1).strip()
            rest = rest.replace(m.group(0), "")

        spoken = re.sub(r"`\[CHECKPOINT[^\]]*\]`", "", rest)
        spoken = re.sub(r"\*\*[^*]*\*\*", "", spoken)
        words = len(spoken.split())
        mins, secs = divmod(round(words / WPM * 60), 60)

        if i:
            story.append(PageBreak())
        story.append(Paragraph(slug.upper(), S["slug"]))
        story.append(Paragraph(md_inline(title or slug), S["title"]))
        story.append(Paragraph(
            f"{words} WORDS  &nbsp;·&nbsp;  ABOUT {mins}:{secs:02d} SPOKEN", S["meta"],
        ))

        for para in [p.strip() for p in rest.split("\n\n") if p.strip()]:
            if para.startswith("---"):
                continue
            flat = " ".join(para.split())
            # Checked against the raw line: a checkpoint is a whole paragraph on
            # its own, never part of one.
            cp = re.match(r"^`\[CHECKPOINT:?\s*([^\]]*)\]`$", flat)
            if cp:
                label = (cp.group(1).strip() or "checkpoint").upper()
                story.append(Paragraph(f"CHECKPOINT &nbsp;·&nbsp; {label}", S["checkpoint"]))
            else:
                story.append(Paragraph(md_inline(flat), S["body"]))

    doc.build(story)
    print(f"wrote {OUT.relative_to(ROOT)}  ({OUT.stat().st_size // 1024} KB, {len(parts)} scripts)")


if __name__ == "__main__":
    build()

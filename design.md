# BFF Classroom — design system

The locked visual system for classroom.bffofamerica.org. Everything that ships
should be expressible in the tokens and patterns below. If something needs a
value that is not here, add it here first, then use it by name.

**Genre:** editorial. Civic, printed, quiet. A school handout that somebody cared
about, not a SaaS dashboard and not a kids' app.

**Audience:** middle and high school students, mostly on school Chromebooks and
phones, often on bad wifi, in three languages. Secondary: volunteer mentors, who
see the same system with more density.

---

## 0. What was already right

This is not a from-scratch system. The app already had good bones and they stay:

- **Fraunces + Public Sans.** A real pairing with drawing in it. It replaced
  Bricolage Grotesque + Inter precisely because reviewers read that as generated.
- **Warm paper and navy ink**, not zinc grey on white.
- **Tightened radii and layered shadows** rather than Tailwind defaults.
- **One easing and three durations**, applied app-wide.

What follows keeps all of that and fixes the parts that read as machine output.

---

## 1. The three rules that fix the look

The app does not look generated because of its colours. It looks generated
because every heading, every section, and every button is built the same way.
These three rules do most of the work.

### 1.1 No italic emphasis words in headings

`h1 em, h2 em, h3 em { font-style: italic; color: var(--accent) }` is currently a
global base rule, so every heading in the app carries a blue italic word:
*"Money skills that actually matter"*, *"leave with a certificate"*, *"This
certificate is almost yours"*, *"Nothing to review!"*. Three on the home page
alone. It is the single most recognisable AI-written-page tell there is, and here
it is systematised.

**Headings are roman. Always.** Carry emphasis one of three ways instead, and use
at most one per view:

| Device | When | How |
| --- | --- | --- |
| **Weight break** | Default | Same face, `--weight-display` on the phrase, `--weight-display-light` on the rest |
| **Drawn underline** | The one phrase that is the page's point | 3px `--color-gold` rule under the phrase, offset 0.12em |
| **Colour** | Rare, and never at body size | `--color-accent-text`, never `--color-accent` (see §2.4) |

Italic survives only as emphasis inside running body copy, where it is ordinary
typography rather than a signature.

### 1.2 Eyebrows are off by default

`— THE COURSE`, `PLAY`, `— THE CERTIFICATE —`, `— WHO WE ARE`: four uppercase
tracked kickers with rule-lines on one page. One is a design choice; four is a
template.

**Budget: one eyebrow per page**, and only when the section genuinely needs a
label the heading cannot carry. The lesson player's `Week 2 · Day 1` is a real
label and stays. Everything else earns it or loses it.

Never place the eyebrow left with the heading right. Stacked only.

### 1.3 Consecutive sections must differ structurally

The home page runs the same shape four times: eyebrow, serif heading with an
italic word, grey paragraph, outlined button with an arrow. Only the background
colour alternates. That is one section repeated, not four sections.

**No two adjacent sections may share a shape.** Pick from the archetypes in §8,
and never repeat one back to back.

---

## 2. Colour

OKLCH throughout. The hex values the app shipped with are preserved exactly;
they have only been restated in a perceptual space so that lightness steps mean
something.

### 2.1 Base

| Token | Value | Was | Use |
| --- | --- | --- | --- |
| `--color-paper` | `oklch(96.4% 0.010 93.6)` | `#f5f3ec` | Page ground |
| `--color-paper-deep` | `oklch(92.2% 0.014 88.7)` | `#e9e5db` | Recessed wells, track backgrounds |
| `--color-surface` | `oklch(100% 0 0)` | `#fff` | Cards, sheets, anything that lifts |
| `--color-ink` | `oklch(21.2% 0.032 247.9)` | `#0c1a27` | Body text, dark bands |
| `--color-ink-soft` | `oklch(26.8% 0.044 245.2)` | `#12283a` | Second-level dark surfaces |
| `--color-ink-muted` | `oklch(48% 0.020 248)` | new | Secondary text — **5.88:1 on paper** |

Ink on paper is **15.88:1**. There is a lot of headroom; spend it on hierarchy
rather than on more greys.

### 2.2 Brand blue

The eleven-step `bff` ramp is unchanged. The steps that matter:

| Token | Value | Contrast on paper |
| --- | --- | --- |
| `--color-accent` | `oklch(54.6% 0.130 242.3)` (`#0077b5`) | **4.39:1** |
| `--color-accent-text` | `oklch(46.8% 0.110 241.9)` (`#036092`) | **6.13:1** |
| `--color-accent-deep` | `oklch(41.5% 0.092 239.9)` (`#075178`) | 7.70:1 |
| `--color-accent-wash` | `oklch(96.6% 0.016 233.0)` (`#eaf6fd`) | tint only |

### 2.3 Gold

`--color-gold` `oklch(80.6% 0.127 74.5)` (`#f0b35a`). **9.47:1 on ink, 1.68:1 on
paper.** It is a dark-band colour and a rule colour. It is never text on paper.

### 2.4 The accent contrast rule

`--color-accent` at 4.39:1 **fails WCAG AA for normal-size text.** The app
currently uses it for links and for the italic emphasis word. Large display text
only needs 3:1, so headings were fine by luck; body-size links were not.

- Text below 24px (or below 19px bold): `--color-accent-text`
- Large display text, icons, borders, fills: `--color-accent`
- Never: `--color-gold` as text on paper

### 2.5 Status

The app currently reaches for raw Tailwind (`bg-green-100 text-green-700`,
`bg-amber-100`, `bg-red-50`). Those are tuned for a white-and-zinc page and go
slightly sour on warm paper. These are hue-matched to the base and verified:

| Role | Text | Tint | On paper | On own tint |
| --- | --- | --- | --- | --- |
| Success | `oklch(46% 0.115 152)` | `oklch(94% 0.035 152)` | 6.08:1 | 5.73:1 |
| Warning | `oklch(47% 0.110 70)` | `oklch(94% 0.045 80)` | 6.30:1 | 5.85:1 |
| Danger | `oklch(49% 0.170 27)` | `oklch(94% 0.035 25)` | 6.16:1 | 5.63:1 |

Meaning is carried by icon plus text, never by colour alone. A red chip that only
says "3" tells a colourblind student nothing.

### 2.6 Accent budget

Accent is for **the one thing the user should do next** and for state that must
be noticed. On any given view: one primary action, one progress indicator, and
links. Everything else is ink, muted ink, and paper. If two things on screen are
competing in blue, one of them is wrong.

---

## 3. Type

Fraunces Variable (display) and Public Sans Variable (body), self-hosted. Two
families, no third.

### 3.1 Scale

A major-third ramp, named by role rather than by size, so a heading cannot be
picked for how big it looks.

| Token | Size / line-height | Role |
| --- | --- | --- |
| `--text-display` | `clamp(2.5rem, 6vw, 3.75rem)` / 1.03 | Page-defining headline. One per page. |
| `--text-h1` | `clamp(2rem, 4vw, 2.75rem)` / 1.06 | Section headline |
| `--text-h2` | `1.5rem` / 1.15 | Sub-section |
| `--text-h3` | `1.125rem` / 1.3 | Card and panel titles |
| `--text-lead` | `1.125rem` / 1.6 | Standfirst under a headline |
| `--text-body` | `1rem` / 1.65 | Running text |
| `--text-small` | `0.875rem` / 1.55 | Secondary, captions |
| `--text-micro` | `0.75rem` / 1.4, `0.08em` tracking | Labels, chips, eyebrows |

**Headline length governs size.** Over 50 characters, step down one rung. Over 90,
rewrite it. `--text-display` is for short statements.

### 3.2 Weight and tracking

- Display: 700 (`--weight-display`), or 400 (`--weight-display-light`) when
  breaking weight for emphasis inside one heading.
- Body: 400, 600 for emphasis. Never 300 — it fails on a school Chromebook at
  arm's length.
- Display tracking `-0.011em`. Body tracking 0. Micro `0.08em`.

### 3.3 Measure

Body copy caps at **66 characters** (`--measure`). Chinese caps at 40 characters,
which is roughly the same visual line. Nothing runs the full width of a 1280px
container.

---

## 4. Space

4-pt scale. Use the names, not the numbers.

| Token | Value | Use |
| --- | --- | --- |
| `--space-2xs` | 4px | Icon to label |
| `--space-xs` | 8px | Inside a chip |
| `--space-sm` | 12px | Tight stacks |
| `--space-md` | 16px | Default gap |
| `--space-lg` | 24px | Card padding |
| `--space-xl` | 40px | Between blocks in a section |
| `--space-2xl` | 64px | Section padding, mobile |
| `--space-3xl` | 96px | Section padding, desktop |

**Vertical rhythm is not uniform.** A section that is dense should sit tighter
than a section that is a single statement. Equal padding on every section is what
makes a page read as a template.

---

## 5. Line, radius, elevation

- `--rule-hair` `1px solid oklch(21.2% 0.032 247.9 / 0.12)` — the default divider
- `--rule-strong` `2px solid var(--color-ink)` — deliberate, structural
- `--rule-accent` `3px solid var(--color-gold)` — the drawn underline, §1.1

Radii stay tightened: `--radius-sm` 5px, `--radius-md` 10px, `--radius-lg` 14px,
`--radius-pill` 999px. Nothing is more rounded than 14px except pills.

Two elevations only:

- `--shadow-card` `0 1px 2px rgb(15 42 66 / 0.06), 0 2px 8px rgb(15 42 66 / 0.05)`
- `--shadow-lift` `0 2px 4px rgb(15 42 66 / 0.08), 0 10px 24px rgb(15 42 66 / 0.09)`

A card either sits or lifts. There is no third state and no soft 40px blur.

---

## 6. Motion

Unchanged, because it was already right. One curve, three durations.

```
--ease-out: cubic-bezier(0.2, 0, 0, 1);
--dur-press: 90ms;   /* press feedback */
--dur-hover: 160ms;  /* colour, border, opacity */
--dur-move:  220ms;  /* position, reveal */
```

Rules: animate `transform` and `opacity` only. Never animate the focus ring — it
appears instantly. Under `prefers-reduced-motion`, spatial motion collapses to a
crossfade. **Cut motion before adding it.**

---

## 7. Components

Every interactive element ships all eight states: default, hover,
`:focus-visible`, active, disabled, loading, error, success.

**Buttons.** Three only. `primary` (accent fill, one per view), `secondary`
(ink hairline on surface), `ghost` (no border until hover). Labels are verbs and
say what happens: "Start BFF Academy", not "Get started".

**Arrows are rationed.** The home page currently has five `→` after five buttons.
**One arrow per view**, on the primary action only, and only when the action
genuinely moves the student forward.

**Cards.** Surface, `--radius-md`, `--shadow-card`, `--space-lg` padding. A card
is for a thing you can open. Do not put a card around a paragraph.

**Chips.** `--text-micro`, `--radius-pill`, status tint plus status text plus an
icon.

**Focus.** 2px `--color-accent` ring, 2px offset, on everything. Never removed,
never animated, never lighter than 3:1 against its background.

---

## 8. Section archetypes

Pick per section; never repeat back to back (§1.3).

1. **Statement** — one headline at `--text-display`, one line of support, one
   action. Generous space, nothing else. Use once per page at most.
2. **Split** — copy one side, a real artifact the other (the certificate, a
   screenshot, a chart). The artifact must be real. An empty half-column reads
   as a failed image, which is what the "who we are" section currently looks like.
3. **Register** — a list or table with hairline rules. Dense, quiet, scannable.
   Good for the curriculum, the roster, the glossary.
4. **Board** — a grid of cards of *uneven* span. Even 3-ups are the most
   templated shape there is; make one tile wide.
5. **Band** — full-bleed ink or accent-deep, short, used as punctuation between
   two light sections. No more than one per page.

---

## 9. Copy

- Say the thing. "Pass the quiz on every lesson and it unlocks with your name on
  it" beats "Unlock exclusive rewards".
- Never invent a number. If there is no metric, do not render a metric.
- No em dashes in English or Spanish. Chinese is exempt — 破折号 is ordinary
  punctuation there.
- No emoji anywhere. Enforced by the icon registry.
- Errors say what happened and what to do next, in that order.
- Every string exists in all three languages before it ships. English leaking
  into a Chinese screen is a bug, not a fallback.

---

## 10. Exports

`tokens.css` at the project root carries every token above as a CSS custom
property. `tailwind.config.js` maps them into utility classes. The two must not
drift: `tailwind.config.js` reads from the custom properties, it does not restate
the values.

Nothing in the app should contain a raw hex, a raw `oklch()`, or a bare
`font-family`. If a value is needed that is not a token, add it here first.

---

*Hallmark · genre: editorial · macrostructure family: Split / Register / Board ·
theme: custom (BFF brand) · paper light · display high-contrast-serif · accent cool*

# Wedding Website — Design Specification

Use this document as the visual design guide when building the homepage. It combines specific elements from multiple design explorations into one cohesive direction.

## Overall Aesthetic

Modern asymmetric editorial. Think high-end fashion or luxury brand website — sophisticated, contemporary, designer-forward. Heavy emphasis on whitespace, intentional layout, and bold typography. The page should feel curated and minimal but not empty.

### Core Layout Principles

- **12-column grid system** with asymmetric offsets (e.g., content in `col-span-4` left, body text starting at `col-start-6 col-span-6`)
- **Numbered sections** using a monospaced accent label (001, 002, 003, 004) in a small uppercase sans-serif with wide tracking
- **Offset column grids** for visual asymmetry — headings left-aligned in a narrow column, content offset to the right
- **Full-width max container** at `max-w-7xl` with `px-6 md:px-12` padding
- **Clean 1px divider lines** between major sections (`h-px bg-border`)
- Mobile-first, responsive with `md:` breakpoints

### Section Pattern

Each major content section follows this structure:

```
[Section number — "001" in accent color, uppercase, tracking-[0.3em]]
[Section title — serif, text-4xl md:text-5xl, can break across lines]

                    [Content block — offset to the right on desktop]
                    [Body text in sans-serif, text-lg, leading-relaxed]
```

## Background & Color

### Dreamy Watercolor Wash Background

The page has a blush-white (`#fff8f8`) base with **layered gradient blurs fixed behind all content**, creating a soft watercolor wash effect:

```
Fixed layer (pointer-events-none, z-0):
  - Top-right: 60vw x 60vh, gradient from rose-pink/40 via blush-pink/20 to transparent, rounded-full, blur-3xl
  - Bottom-left: 50vw x 50vh, gradient from sage-green/20 via cream/30 to transparent, rounded-full, blur-3xl
  - Center-left: 30vw x 30vh, gradient from blush-pink/15 to cream/20, rounded-full, blur-3xl
```

All page content sits at `relative z-10` above the fixed gradient layer.

### Color Palette

| Token         | Value     | Usage                                    |
|---------------|-----------|------------------------------------------|
| blush-white   | `#fff8f8` | Page background                          |
| blush-pink    | `#F7e0e8` | Gradient layers, photo placeholders      |
| rose-pink     | `#ffdae9` | Gradient layers, accent fills            |
| sage-green    | `#d2d98b` | Accent lines between names, dividers     |
| cream         | `#ffffe3` | Gradient endpoints, subtle backgrounds   |
| heading       | `#2c2424` | Headings, primary text, dark sections    |
| body          | `#5a4f4f` | Body paragraph text                      |
| muted         | `#8a7f7f` | Secondary text, labels, metadata         |
| accent        | `#d4a0b0` | Section numbers, icon tints, CTA accents |
| border        | `#f0e0e4` | Divider lines, card borders              |

## Typography

### Fonts

- **Serif**: Playfair Display — used for names, section headings, large display text
- **Sans-serif**: Lato (weights 300, 400, 700) — used for body text, labels, navigation, buttons

### Type Scale

| Element             | Style                                                              |
|---------------------|--------------------------------------------------------------------|
| Names (hero)        | `font-serif text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight` |
| Section headings    | `font-serif text-4xl md:text-5xl`                                  |
| Sub-headings        | `font-serif text-2xl`                                              |
| Stats numbers       | `font-serif text-3xl`                                              |
| Body text           | `font-sans text-lg leading-relaxed`                                |
| Body secondary      | `font-sans text-sm leading-relaxed`                                |
| Labels / metadata   | `font-sans text-xs uppercase tracking-[0.2em] text-muted`         |
| Section numbers     | `font-sans text-xs uppercase tracking-[0.3em] text-accent`        |
| Tiny labels         | `font-sans text-[10px] uppercase tracking-[0.4em]`                |

## Navigation (from Route 10 — Zen Minimal)

Clean, spacious, understated header:

```
<nav> — flex, items-center, justify-between, px-8 md:px-16, py-10

  Left:  Full couple names ("Alessia & Jordan") in small-caps
         text-sm, tracking-[0.5em], uppercase
         Uses fontVariant: "small-caps"

  Right: Horizontal links (hidden on mobile, md:flex)
         text-xs, tracking-[0.3em], uppercase, text-muted
         Gap of gap-12 between items
         Hover: text transitions to heading color
         RSVP link is distinguished with border-b border-heading pb-0.5
```

The nav should feel like it's barely there — generous whitespace, muted colors, no background or borders on the bar itself.

## Hero Section

Asymmetric editorial layout using a 12-column grid:

- **Left (col-span-7)**: Stacked names in massive serif type, with a sage-green horizontal line + "and" separator between them. One name can have an italic letter for a typographic flourish (`Ales<i>s</i>ia`).
- **Right (col-span-5)**: A portrait-orientation photo placeholder (`aspect-[3/4]`) with location and time metadata below it in small uppercase text.
- Date appears above the names in accent-colored small uppercase text with wide tracking.

## Photo Gallery (from Route 5 — Polaroid Style)

A horizontally centered flex-wrap gallery of polaroid-style photo cards:

```
Container: flex, flex-wrap, justify-center, gap-6 md:gap-8

Each polaroid:
  - White card: bg-white, p-3, pb-12 (extra bottom padding for caption area)
  - Slight rotation: alternating -rotate-3, rotate-1, -rotate-1
  - Shadow: shadow-md
  - Photo area: aspect-[4/3] with gradient placeholder
  - Caption: font-serif, text-xs, italic, text-muted, text-center, mt-3
  - Hover: rotation straightens (e.g., hover:rotate-0 transition-transform)

Example captions (italic, personal, lowercase):
  "Our first dance practice"
  "The proposal spot"
  "Sunday mornings"
```

The polaroids should feel casually scattered, like photos laid out on a table.

## "Our Story" Section (from Route 6 — Vertical Timeline)

A vertical timeline with items alternating left and right of a center line:

```
Container: relative, max-w-4xl centered

Center line:
  - Absolute positioned, left-1/2, top-0 to bottom-0
  - Width: w-px
  - Gradient: from transparent, via accent/30, back to transparent
    (gives the line a soft fade-in/fade-out)

Each timeline item:
  - Flex row (md:flex-row-reverse for alternating sides)
  - Dot marker on the center line:
    w-3 h-3, rounded-full, border-2 border-accent, bg matching page background
  - Content on one side (md:w-1/2):
    - Year: large serif text (text-3xl) in accent color at 60% opacity
    - Title: serif text-2xl
    - Description: sans-serif text-sm, muted color, leading-relaxed
  - Text alignment flips (text-right on left items, text-left on right items)
  - Generous spacing between items (mb-20)
```

On mobile, the timeline collapses to a single column with the line on the left (`left-4`) and all content to the right with `pl-12`.

## Remaining Sections

These sections follow the core asymmetric editorial pattern from Route 3:

### When & Where

- 12-column offset header (number + title left, description right)
- 2-column grid below with `gap-px bg-border` creating a thin line between cells
- Left cell: venue name, address, directions link
- Right cell: schedule list with time + dot marker + event name
- Full-width map placeholder below

### Countdown

- Horizontal flex layout with label left ("Counting Down" / "See You Soon") and numbers right
- Clean white card with thin border
- Numbers in serif, labels in tiny uppercase sans-serif

### RSVP

- Full-width dark section (`bg-heading`) with centered white text
- Section number in accent, heading in serif, body in muted white
- CTA button: inverted colors (white bg, dark text), uppercase, wide tracking

### Footer

- Minimal flex row: initials left, date center, location right
- Small serif for initials, tiny uppercase sans for date and location

## Interaction & Motion

- Hover transitions on all interactive elements (`transition-colors`, `transition-transform`)
- Polaroid photos straighten on hover (`hover:rotate-0 transition-transform`)
- Navigation links change from muted to heading color on hover
- Buttons shift background color on hover
- Underlined links shift to accent color on hover
- No heavy animations — the design relies on layout and typography, not motion

## Key Design Principles

1. **Asymmetry over symmetry** — offset grids, staggered elements, nothing perfectly centered except when intentional
2. **Typography as decoration** — the large serif names and numbers ARE the visual interest; minimal need for icons or illustrations
3. **Soft backdrop, sharp content** — dreamy watercolor gradients behind, but crisp editorial layout on top
4. **Restraint** — every element earns its place; generous whitespace between sections (py-24)
5. **Editorial numbering** — sections feel like chapters or magazine spreads (001, 002, 003)
6. **Personal touches** — polaroid captions, timeline stories, italic flourishes in names

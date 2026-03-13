# 9-nine- Visual Novel Portal — Style Guide

> **Source:** https://9-nine-project.com/
> **Date captured:** 2026-03-13
> **Reuse target:** Visual novel / anime IP promotional website, design reference

---

## 1. Design Personality

**Elegant, serene, and premium Japanese visual-novel branding.** The site blends classical serif typography (Cormorant Infant) with clean Japanese sans-serif (Noto Sans JP), anchored by a single dominant deep-blue hue. The overall impression is calm sophistication — crystal-clear white space, diamond/geometric decorative motifs, and restrained animation that feels like pages turning in a storybook.

**Key adjectives (evidence-grounded):**
- **Serene** — 0.4s universal transition speed; no jarring motion anywhere
- **Premium** — 120–264px section gaps; bimodal spacing (tiny or huge, nothing in between)
- **Crystalline** — diamond-shaped carousel dots (`transform: rotate(45deg)`), diamond-tile footer overlay, canvas particle system
- **Editorial** — Cormorant Infant serif at 40px display size with 3px letter-spacing; bilingual heading pattern
- **Borderless** — zero `border-radius` site-wide; zero `box-shadow` on interactive elements; depth via spacing and color only

---

## 2. Color Tokens

### 2.1 Primary Palette

| Token | Hex | RGB | Observed usage |
|-------|-----|-----|----------------|
| `--color-primary` | `#004789` | `rgb(0, 71, 137)` | Nav links, heading `.en`, button bg, footer bg, tab dots, border accents, decorative lines |
| `--color-primary-hover` | `#0c569a` | `rgb(12, 86, 154)` | `.sw-Button:hover` background (observed via computed style diff) |
| `--color-primary-light` | `#005299` | `rgb(0, 82, 153)` | Character name plates, character CV text |
| `--color-accent-sky` | `#0084ff` | `rgb(0, 132, 255)` | Section background wash at 5% opacity; bright accent highlight |
| `--color-accent-sky-light` | `#72cafc` | `rgb(114, 202, 252)` | Lighter sky accent (background element) |

### 2.2 Neutral Palette

| Token | Hex | RGB | Observed usage |
|-------|-----|-----|----------------|
| `--color-text` | `#333` | `rgb(51, 51, 51)` | `body` color, default text |
| `--color-text-secondary` | `#343434` | `rgb(52, 52, 52)` | News title text, slightly variant body |
| `--color-text-inverse` | `#fff` | `rgb(255, 255, 255)` | Text on `--color-primary` bg (footer nav, buttons, mobile nav) |
| `--color-surface` | `#fff` | `rgb(255, 255, 255)` | Page background, card surfaces |
| `--color-surface-blue-tint` | `#eff4fd` | `rgb(239, 244, 253)` | Subtle blue-tinted border/divider |
| `--color-black` | `#000` | `rgb(0, 0, 0)` | Rare — hamburger icon, pure-black decorations |

### 2.3 Overlay & Shadow

| Token | Value | Observed usage |
|-------|-------|----------------|
| `--overlay-tag` | `rgba(225, 228, 232, 0.8)` | Frosted tag/label backgrounds |
| `--overlay-blue-wash` | `rgba(0, 132, 255, 0.05)` | Subtle blue section background wash |
| `--overlay-white-80` | `rgba(255, 255, 255, 0.8)` | White overlay panel |
| `--overlay-white-20` | `rgba(255, 255, 255, 0.2)` | Subtle white mist |
| `--shadow-card` | `rgba(102, 113, 152, 0.1) 0 0 10px 0` | Only box-shadow on entire site — soft card/panel glow |
| `--shadow-character` | `drop-shadow(rgba(0, 71, 136, 0.1) 20px 0 0)` | Character art animated drop-shadow (slides right via keyframe) |
| `--glow-white` | `drop-shadow(rgba(255, 255, 255, 0.4) 0 0 22px)` | White glow filter on decorative elements |

### 2.4 Color Philosophy

The palette is intentionally monochromatic. `#004789` is the only chromatic hue used for UI elements. All visual hierarchy comes from:
- **Opacity variation** (tab dots: 0.3 inactive → 1.0 active)
- **Lightness steps** (`#004789` → `#005299` → `#0084ff` → `#72cafc`)
- **White space** rather than color fills to separate sections

No warm colors, no grays beyond `#333`/`#343434`. The site has zero CSS custom properties in `:root` — all values are hardcoded in the stylesheet.

---

## 3. Typography

### 3.1 Font Stack

| Role | Family | Weight(s) | Source |
|------|--------|-----------|--------|
| **Display / English headings** | `Cormorant Infant` | 600, 700 | Google Fonts |
| **English UI labels** | `Oswald` | 400 | Google Fonts |
| **Japanese body** | `Noto Sans JP` + `YakuHanJP` | 400, 500, 700 | Google Fonts + CDN (v3.3.1) |
| **Japanese headings / names** | `Noto Serif JP` | 500, 700 | Google Fonts |

**Full body stack (observed on `<body>`):**
```css
font-family: YakuHanJP, "Noto Sans JP", "Hiragino Kaku Gothic ProN",
  "Hiragino Kaku Gothic Pro", "ＭＳ ゴシック", sans-serif;
```

### 3.2 Type Scale

| Token | Size | Line-height | Weight | Observed usage |
|-------|------|-------------|--------|----------------|
| `--text-display` | `40px` | `40px` (1:1) | 600 | Section heading English label (`.sw-Subtitle .en`) — "NEWS", "CHARACTER", etc. |
| `--text-xl` | `28px` | — | — | Large feature text |
| `--text-lg` | `23px` | — | — | Sub-feature text |
| `--text-footer-nav` | `18px` | `18px` (1:1) | 400 | Footer navigation links (Cormorant Infant) |
| `--text-nav` | `16px` | `16px` (1:1) | 400 | Header nav links (Cormorant Infant), news date (Oswald), news title (Noto Sans JP at `26px` line-height) |
| `--text-button` | `14px` | `64px` (line-height = button height) | 400 | "VIEW MORE" button label (Oswald) |
| `--text-body` | `12px` | `12px` (1:1) | 400 | Body default, heading `.ja` subtitle, character names |
| `--text-caption` | `10px` | — | 400 | Copyright, small labels |

### 3.3 Letter Spacing

| Token | Value | Observed on |
|-------|-------|-------------|
| `--ls-display` | `3px` (0.075em at 40px) | `.sw-Subtitle .en` — Cormorant Infant headings |
| `--ls-nav` | `1.6px` (0.1em at 16px) | Header nav links, news date |
| `--ls-footer-nav` | `1.8px` (0.1em at 18px) | Footer navigation links |
| `--ls-button` | `1.4px` (0.1em at 14px) | `.sw-Button` label |
| `--ls-subtitle-ja` | `0.6px` (0.05em at 12px) | `.sw-Subtitle .ja` Japanese subtitle |
| `--ls-copyright` | `1px` | Footer copyright text |

### 3.4 Bilingual Section Heading Pattern

Every major section uses a consistent bilingual heading — the site's most distinctive typographic pattern:

```css
/* Container */
.sw-Subtitle {
  display: flex;
  align-items: center;       /* or block with margin-top on .ja for stacked variant */
}

/* English label — large serif */
.sw-Subtitle .en {
  font-family: "Cormorant Infant";
  font-weight: 600;
  font-size: 40px;
  line-height: 40px;
  color: #004789;
  letter-spacing: 3px;
}

/* Japanese label — small sans-serif */
.sw-Subtitle .ja {
  font-family: "Noto Sans JP";
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #004789;
  letter-spacing: 0.6px;
  margin-left: 20px;         /* horizontal variant */
}
```

**Reusable pattern:** Large serif English label + small sans-serif secondary label, same accent color, horizontally aligned (or stacked with `margin-top: 12px` for wider sections).

### 3.5 Typography Rules

1. **1:1 line-height ratio** is used everywhere except news titles (`16px / 26px`). This creates extremely tight, compact text blocks — a deliberate Japanese web design convention.
2. **Letter-spacing is always 0.1em** on Cormorant Infant and Oswald text. This is the site's typographic signature.
3. **Font weight is minimal** — only 400 (body) and 500–600 (headings). No bold body text.
4. **Noto Serif JP** is reserved exclusively for character name plates — it never appears in UI or navigation.

---

## 4. Layout

### 4.1 Content Width

| Token | Value | Observed usage |
|-------|-------|----------------|
| `--width-page` | `1280px` | `body` computed width, full-bleed sections |
| `--width-content` | `1200px` | Inner content containers (`margin: 0 40px` on 1280px body) |
| `--width-footer-inner` | `960px` | Footer inner content (`margin: 0 160px`) |
| `--width-hero` | `920px` | Hero visual area (1280px - 2×180px padding) |

### 4.2 Section Spacing (Observed)

| Section | Top padding | Bottom padding | Pattern |
|---------|------------|----------------|---------|
| Mainvisual (hero) | `120px` | — | Hero area with blur-reveal |
| Pickup (carousel) | `150px` | — | First content section |
| News | `150px` | `142px` | Standard content section |
| Channel (video) | `264px` | — | Extra-tall gap (visual break) |
| Game | `190px` | `200px` | Largest symmetric gap |
| Character | `133px` | — | Gallery section |
| Goods | `225px` | `140px` | Tallest top padding |
| Special | `135px` | — | Standard |
| Official (SNS) | `222px` | `160px` | Pre-footer section |

**Spacing philosophy:** The site uses a **bimodal distribution** — either tiny (0–20px for internal component spacing) or massive (120–264px for section gaps). There is almost nothing in the 30–100px range. This creates a gallery-like, high-end experience.

### 4.3 Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-section-xl` | `222–264px` | Extra-large section gaps (Channel, Official, Goods) |
| `--space-section-lg` | `150–200px` | Standard section gaps (News, Game, Pickup) |
| `--space-section-md` | `133–142px` | Moderate section gaps (Character, News bottom) |
| `--space-gutter` | `40px` | Page horizontal margins (1280px → 1200px content) |
| `--space-footer-gutter` | `160px` | Footer horizontal margins (1280px → 960px content) |
| `--space-nav-top` | `52px` | Nav link top padding (creates vertical rhythm) |
| `--space-heading-gap` | `20px` | Gap between `.en` and `.ja` in bilingual headings |
| `--space-button-margin-top` | `67px` | Gap above "VIEW MORE" buttons |

### 4.4 Grid Philosophy

The layout uses **no CSS Grid** — it relies entirely on flexbox and absolute positioning. Sections stack vertically with generous vertical spacing. Horizontal layouts use `display: flex` with fixed widths. The character gallery uses overlapping absolute positioning for a staggered depth effect.

---

## 5. Components

### 5.1 Button — "VIEW MORE"

The primary CTA button. Distinctive for its extending decorative line with arrow tip.

```css
/* Default state */
.sw-Button {
  display: block;
  width: 260px;
  height: 64px;
  line-height: 64px;
  margin: 67px auto 0;
  color: #fff;
  background: #004789;
  font-family: Oswald;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1.4px;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 0;
  position: relative;
  transition: 0.4s;
  cursor: pointer;
}

/* Decorative line extending right */
.sw-Button::before {
  content: "";
  position: absolute;
  top: 32px;              /* vertically centered */
  right: -50px;
  width: 80px;
  height: 2px;
  border-top: 0.67px solid #004789;
  border-bottom: 0.67px solid #fff;
  transition: 0.4s;
}

/* Arrow tip */
.sw-Button::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -50px;
  width: 10px;
  height: 1px;
  background: #004789;
  transform: rotate(20deg);
  transform-origin: right;
  transition: 0.4s;
}
```

**State matrix (observed):**

| State | Background | Color | `::before` right | `::after` transform | Transition |
|-------|-----------|-------|------------------|---------------------|------------|
| Default | `#004789` | `#fff` | `-50px` | `rotate(20deg)` | — |
| Hover | `#0c569a` | `#fff` | `-60px` (slides out 10px) | `rotate(180deg)` (arrow flips) | `0.4s` |
| Focus-visible | Not styled | — | — | — | — |

### 5.2 Navigation Link (Header)

```css
/* Default */
.st-Header_Static nav ul li a {
  display: block;
  padding: 52px 25px 0;
  font-family: "Cormorant Infant";
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 1.6px;
  color: #004789;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  height: 120px;            /* total nav bar height */
}

/* Underline indicator (::before) — vertical line that grows on hover */
.st-Header_Static nav ul li a::before {
  content: "";
  position: absolute;
  bottom: 78px;
  left: 50%;
  width: 1px;
  height: 0;               /* hidden by default */
  background: #004789;
  transition: 0.4s;
}
```

**State matrix (observed):**

| State | Color | `::before` height | `::before` opacity | Animation |
|-------|-------|-------------------|-------------------|-----------|
| Default | `#004789` | `0` | — | — |
| Hover | `#004789` | `42px` | `0.6` | `transition: 0.4s` |
| Current (active page) | `#004789` | `42px` | `1` | `header-line 0.5s ease 0.8s` (animated in on page load) |

### 5.3 Navigation Link (Footer)

```css
.st-Footer nav a {
  display: block;
  padding: 52px 25px 0;
  font-family: "Cormorant Infant";
  font-size: 18px;          /* 2px larger than header nav */
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 1.8px;
  color: #fff;              /* inverse on primary bg */
  height: 120px;
  position: relative;
  cursor: pointer;
}
/* Same ::before underline pattern as header, with transition: 0.4s */
```

### 5.4 Tab Dot Indicator (Carousel)

```css
/* Diamond-shaped dots — rotated 45° squares */
[role="tab"] {
  display: block;
  width: 8px;
  height: 8px;
  background: #004789;
  border: none;
  border-radius: 0;         /* NOT circles — sharp squares */
  transform: rotate(45deg); /* creates diamond shape */
  opacity: 0.3;
  cursor: pointer;
  transition: opacity 0.4s;
  padding: 0;
  margin: 0;
}
[role="tab"][aria-selected="true"] {
  opacity: 1;
}
```

**Reusable insight:** The site uses **diamond-shaped** pagination dots (rotated squares), not circles — consistent with the crystalline/geometric motif throughout.

### 5.5 News List Item

| Element | Font | Size | Weight | Color | Letter-spacing |
|---------|------|------|--------|-------|---------------|
| Date | Oswald | 16px | 400 | `#004789` | 1.6px |
| Category tag | — | — | — | — | (not rendered as separate element in computed styles) |
| Title | Noto Sans JP | 16px | 400 | `#343434` | normal |

```css
/* Thumbnail container */
.idx-News_Inner .thumb {
  width: 380px;
  height: 214px;
  overflow: hidden;
  border-radius: 0;
}
.idx-News_Inner .thumb img {
  object-fit: cover;
  transition: transform 0.4s;
}
/* Hover: subtle zoom */
.idx-News_Inner li a:hover .thumb img {
  transform: scale(1.05);
}
/* Hover: title color change */
.idx-News_Inner li a:hover .title {
  color: #004789;           /* text → primary on hover */
  transition: color 0.4s;
}
/* Hover: overlay appears on thumbnail */
.idx-News_Inner .thumb::before {
  content: "";
  /* overlay that fades in on hover */
  transition: 0.4s;
}
```

### 5.6 Character Name Plate

```css
.character-name {
  font-family: "Noto Serif JP";
  font-size: 12px;
  font-weight: 500;
  color: #005299;           /* --color-primary-light */
}
.character-cv {
  font-family: "Noto Serif JP";
  font-size: 12px;
  color: #005299;
}
```

### 5.7 Footer

```css
.st-Footer {
  background: #004789;
  position: relative;
  z-index: 1;
}

/* Decorative wavy top border — repeating background image */
.st-Footer::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 23px;
  background: url(deco_footer_line.png) repeat-x top center / 300px 23px;
}

/* Diamond pattern overlay */
.st-Footer::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 423px;
  background: url(bg_footer_dia.png) repeat-x top center / 107px 389px;
}

/* Footer inner */
.st-Footer_Inner {
  width: 960px;
  padding: 66px 0 40px;
  margin: 0 160px;
}

/* Footer logo */
.st-Footer_Inner .logo img {
  width: 167px;
  height: 74.5px;
}

/* Copyright */
.st-Footer .copyright {
  font-family: "Noto Sans JP";
  font-size: 10px;
  color: #fff;
  letter-spacing: 1px;
}
```

### 5.8 Page Top Button

```css
.st-Pagetop a {
  width: 101px;
  height: 182px;
  font-family: "Cormorant Infant";
  font-size: 16px;
  color: #fff;
  background: transparent;
  border: none;
  border-radius: 0;
}
/* ::before and ::after create decorative arrow, transition: 0.4s */
```

---

## 6. Decorative Motifs

### 6.1 Diamond / Crystal Pattern

The signature visual element is a **diamond (rhombus) geometric pattern**, used as:
- **Footer background overlay** — repeating diamond tile (`bg_footer_dia.png`, 107×389px tile)
- **Carousel pagination** — 8×8px squares rotated 45° (`transform: rotate(45deg)`)
- **Section separator accents** — positioned absolutely as decorative corners
- **Wavy footer border** — repeating wave pattern (`deco_footer_line.png`, 300×23px tile)

### 6.2 Particle System

The hero section uses a `<canvas id="particles">` particle effect, creating floating specs that suggest a crystalline/magical atmosphere. CSS transition `0.2s` is applied for opacity fading.

### 6.3 SVG Stroke Drawing

Section heading decorations use SVG stroke-draw animation — lines that "write themselves" on scroll via `svg-stroke` keyframe (2s ease-out, `stroke-dashoffset: 1000px → 0`).

### 6.4 Section Backgrounds

Each major section uses full-bleed decorative background images (subtle geometric/diamond watermarks) positioned behind content using pseudo-elements.

---

## 7. Border & Radius

### 7.1 Border Radius

**All border radius values are exactly `0px` across the entire site.** Buttons, images, cards, containers, navigation — everything is sharp-cornered. This is a deliberate design choice creating a unified angular aesthetic consistent with the diamond/geometric motif.

### 7.2 Border Usage

The design philosophy is **borderless**. No card borders, no container borders, no button borders.

**When borders appear (rare):**
- Active nav indicator: `::before` pseudo-element with `background: #004789` (not a CSS border)
- Button decorative line: `border-top: 0.67px solid #004789` + `border-bottom: 0.67px solid #fff` (creates a double-line effect)
- Subtle section divider: `border-color: #eff4fd` (very light blue, barely visible)

---

## 8. Responsive Strategy

### 8.1 Breakpoints (Extracted from CSS)

| Breakpoint | Usage |
|-----------|-------|
| `max-width: 767px` | Mobile / SP — primary mobile breakpoint |
| `min-width: 768px` | Desktop / PC — primary desktop breakpoint |
| `min-width: 768px and max-width: 1280px` | Small desktop |
| `min-width: 768px and max-width: 1560px` | Medium desktop |
| `min-width: 1561px` | Large desktop |
| `min-width: 1921px` | Extra-large desktop (caps fluid sizing) |

### 8.2 Responsive Patterns

- **Mobile uses `vw` units extensively** for fluid sizing (e.g., `6.5vw` for heading size)
- **Desktop uses fixed `px` values**
- **Transitions are desktop-only** — all `transition: 0.4s` rules are inside `min-width: 768px` media queries
- **Character gallery stagger delays differ** between mobile and desktop (mobile delays are slightly longer)

---

## 9. Copy-Paste Examples

### 9.1 Bilingual Section Heading

```html
<h2 class="section-heading">
  <span class="en">SECTION TITLE</span>
  <span class="ja">セクションタイトル</span>
</h2>

<style>
.section-heading {
  display: flex;
  align-items: center;
}
.section-heading .en {
  font-family: "Cormorant Infant", serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 40px;
  color: #004789;
  letter-spacing: 3px;
}
.section-heading .ja {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #004789;
  letter-spacing: 0.6px;
  margin-left: 20px;
}
</style>
```

### 9.2 CTA Button with Extending Line

```html
<a href="#" class="cta-button">VIEW MORE</a>

<style>
.cta-button {
  display: block;
  width: 260px;
  height: 64px;
  line-height: 64px;
  margin: 0 auto;
  color: #fff;
  background: #004789;
  font-family: Oswald, sans-serif;
  font-size: 14px;
  letter-spacing: 1.4px;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 0;
  position: relative;
  transition: 0.4s;
}
.cta-button::before {
  content: "";
  position: absolute;
  top: 50%;
  right: -50px;
  width: 80px;
  height: 2px;
  border-top: 0.67px solid #004789;
  border-bottom: 0.67px solid #fff;
  transition: 0.4s;
}
.cta-button::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -50px;
  width: 10px;
  height: 1px;
  background: #004789;
  transform: rotate(20deg);
  transform-origin: right;
  transition: 0.4s;
}
.cta-button:hover {
  background: #0c569a;
}
.cta-button:hover::before,
.cta-button:hover::after {
  right: -60px;
}
.cta-button:hover::after {
  transform: rotate(180deg);
}
</style>
```

### 9.3 Diamond Pagination Dots

```html
<div class="dot-nav" role="tablist">
  <button role="tab" aria-selected="true" class="dot active">1</button>
  <button role="tab" class="dot">2</button>
  <button role="tab" class="dot">3</button>
</div>

<style>
.dot-nav {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
}
.dot {
  display: block;
  width: 8px;
  height: 8px;
  padding: 0;
  background: #004789;
  border: none;
  border-radius: 0;
  transform: rotate(45deg);
  opacity: 0.3;
  cursor: pointer;
  transition: opacity 0.4s;
  color: transparent;
  font-size: 0;
}
.dot.active,
.dot[aria-selected="true"] {
  opacity: 1;
}
</style>
```

### 9.4 Navigation Bar with Underline Reveal

```html
<nav class="nav-bar">
  <a href="#" class="nav-link active">HOME</a>
  <a href="#" class="nav-link">NEWS</a>
  <a href="#" class="nav-link">ABOUT</a>
</nav>

<style>
.nav-bar {
  display: flex;
  height: 120px;
}
.nav-link {
  display: block;
  padding: 52px 25px 0;
  font-family: "Cormorant Infant", serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 1.6px;
  color: #004789;
  text-decoration: none;
  position: relative;
}
.nav-link::before {
  content: "";
  position: absolute;
  bottom: 78px;
  left: 50%;
  width: 1px;
  height: 0;
  background: #004789;
  transition: 0.4s;
}
.nav-link:hover::before {
  height: 42px;
  opacity: 0.6;
}
.nav-link.active::before {
  height: 42px;
  opacity: 1;
}
</style>
```

### 9.5 News Card with Hover Zoom

```html
<a href="#" class="news-card">
  <div class="news-thumb">
    <img src="thumbnail.jpg" alt="">
  </div>
  <div class="news-meta">
    <span class="news-date">2026.03.13</span>
  </div>
  <p class="news-title">Article title goes here</p>
</a>

<style>
.news-card {
  display: block;
  text-decoration: none;
}
.news-thumb {
  width: 380px;
  height: 214px;
  overflow: hidden;
  border-radius: 0;
}
.news-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.news-card:hover .news-thumb img {
  transform: scale(1.05);
}
.news-date {
  font-family: Oswald, sans-serif;
  font-size: 16px;
  color: #004789;
  letter-spacing: 1.6px;
}
.news-title {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #343434;
  line-height: 26px;
  transition: color 0.4s;
}
.news-card:hover .news-title {
  color: #004789;
}
</style>
```

---

## 10. Classification Summary

| Source Trait | Classification | Notes |
|-------------|---------------|-------|
| Deep-blue monochrome palette (`#004789` family) | **Reusable** | Single-hue system easily remapped to any brand color |
| Cormorant Infant + Noto Sans JP bilingual pairing | **Reusable** | Elegant serif/sans contrast for any dual-language site |
| Bilingual section heading pattern (`.en` + `.ja`) | **Reusable** | Works for any dual-language or label+subtitle pattern |
| 0.4s universal hover transition | **Reusable** | Clean, consistent, unhurried feel |
| "VIEW MORE" button with extending line + arrow | **Reusable** | Distinctive and fully copy-pasteable |
| Diamond-shaped pagination dots | **Reusable** | Simple, on-brand alternative to circles |
| Zero border-radius site-wide | **Reusable** | Strong geometric identity choice |
| Bimodal spacing (tiny or huge) | **Reusable** | Creates premium gallery feel |
| 1:1 line-height ratio | **Adapted** | Works for Japanese text; may need adjustment for Latin-heavy content |
| Diamond geometric motif (footer tiles, decorations) | **Adapted** | Specific to crystal/magical theme but geometric concept is universal |
| Canvas particle system | **Adapted** | Mood-specific; concept reusable for atmospheric effects |
| Character staggered gallery with depth delays | **Adapted** | Visual novel specific layout; stagger concept is reusable |
| Footer with decorative wave border | **Adapted** | Technique reusable, imagery is IP-specific |
| SVG stroke-draw heading decorations | **Reusable** | Works for any decorative line art |
| Scroll-triggered class-toggle animation system | **Reusable** | Lightweight AOS alternative |
| Product branding, logo, copy | **Discarded** | Product-specific |
| News/game/character content structure | **Discarded** | Content-specific IA |

---

## 11. Implementation Notes

### 11.1 Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:wght@600;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@500;700&family=Oswald&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.3.1/dist/css/yakuhanjp.min.css" rel="stylesheet">
```

### 11.2 Base Reset

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: YakuHanJP, "Noto Sans JP", "Hiragino Kaku Gothic ProN",
    "Hiragino Kaku Gothic Pro", sans-serif;
  font-size: 12px;
  line-height: 12px;
  color: #333;
  background: #fff;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
button { font: inherit; border: none; background: none; cursor: pointer; padding: 0; }
img { display: block; max-width: 100%; border-radius: 0; }
```

### 11.3 Accessibility Gaps

- **12px base font** is below WCAG 2.1 recommended minimum (16px)
- **1:1 line-height** is very tight for readability
- **No `:focus-visible` styles** observed — keyboard navigation has no visual indicator
- **Color contrast is strong:** `#004789` on `#fff` = ~8.5:1 ratio (AAA); `#333` on `#fff` = ~12.6:1 (AAA)
- **Tab dots use `color: transparent`** — needs `aria-label` for screen readers

### 11.4 Adaptation Notes

**Keep when porting:**
- The bilingual heading pattern (works for any label+subtitle)
- The 0.4s transition speed (creates calm, deliberate feel)
- The monochromatic palette approach (swap `#004789` for your brand color)
- The button with extending line (unique, memorable)
- Diamond dots instead of circles (distinctive)

**Adjust when porting:**
- Increase base font to 14–16px for Latin-heavy content
- Add `:focus-visible` outlines for accessibility
- Consider `line-height: 1.5` for body text readability
- The 120–264px section gaps may be excessive for content-dense applications




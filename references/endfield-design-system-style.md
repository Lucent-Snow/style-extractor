# Arknights: Endfield Design System – Style + Motion Guide (Reference)

**Project**: Arknights: Endfield (明日方舟：终末地)  
**Type**: Official game website (marketing + content hub)  
**URL**: `https://endfield.hypergryph.com/`  
**Reference Purpose**: A “best-practice” example for **style + motion** extraction (includes runtime animation evidence, keyframes, semantic tokens, and interaction matrix).  
**Last verified**: 2026-02-02  

---

## Table of Contents
1. [Overview](#1-overview)  
2. [Design Philosophy](#2-design-philosophy)  
3. [Semantic Tokens (Recommended)](#3-semantic-tokens-recommended)  
4. [Color Palette](#4-color-palette)  
5. [Typography](#5-typography)  
6. [Spacing System](#6-spacing-system)  
7. [Component Styles](#7-component-styles)  
8. [Motion System (Core)](#8-motion-system-core)  
9. [Border Styles](#9-border-styles)  
10. [Border Radius](#10-border-radius)  
11. [Opacity & Transparency](#11-opacity--transparency)  
12. [Z-Index / Layering](#12-z-index--layering)  
13. [Responsive Behavior](#13-responsive-behavior)  
14. [CSS Variables / Theme Sources](#14-css-variables--theme-sources)  
15. [Layout Patterns](#15-layout-patterns)  
16. [Example Components (Copy-Paste)](#16-example-components-copy-paste)  
17. [Evidence Notes (How it was extracted)](#17-evidence-notes-how-it-was-extracted)  

---

## 1. Overview

Endfield’s UI reads like a “technical console” overlaying cinematic media: high-contrast neutrals, disciplined geometry, and a single high-energy accent yellow for navigation/CTAs. Motion is not decoration—it’s *sequencing and feedback*: short transitions for state changes, and scripted keyframes for “tech” emphasis (shake/breath/flash).

**Visual signatures**
- High-contrast grayscale base + **brand accent yellow** for interaction emphasis
- Wide, uppercase headings + dense, code-like microcopy blocks
- Layered overlays on media (video/image) to maintain readability
- Motion that communicates *activation* and *section change* with tight timings

---

## 2. Design Philosophy

**Principles**
- **Console clarity**: content hierarchy is reinforced by rigid alignment, strong typography, and restrained color.
- **One accent rule**: the yellow accent is reserved for “important action / attention / active state” rather than decoration.
- **Sequenced entrance**: “staged” delays (200ms → 600ms ladder) create a deliberate, premium cadence.
- **Media-first surfaces**: overlays and gradients exist to keep text legible on video-heavy backgrounds.

---

## 3. Semantic Tokens (Recommended)

> Style Extractor should output *semantic tokens* first. Raw values are evidence; semantic names are maintainability.

### 3.1 Color tokens

```css
:root {
  /* Brand / interaction */
  --color-accent: #fffa00;             /* primary emphasis / CTA */
  --color-accent-strong: #fff500;      /* borders/dividers on CTA */

  /* Text */
  --color-text: #191919;               /* primary text */
  --color-text-muted: #999999;         /* metadata / low emphasis */
  --color-text-inverse: #eeeeee;       /* on dark surfaces */

  /* Surfaces */
  --color-bg: #ffffff;                 /* base */
  --color-surface: #f2f2f2;            /* cards/panels */
  --color-surface-2: #e6e6e6;          /* subtle blocks */
  --color-surface-dark: #383838;       /* dark UI blocks */

  /* Borders */
  --color-border: #d9d9d9;
  --color-border-muted: rgba(255,255,255,0.2);

  /* Overlays */
  --overlay-dark-50: rgba(0,0,0,0.5);
  --overlay-dark-70: rgba(0,0,0,0.7);
}
```

### 3.2 Motion tokens

```css
:root {
  /* Durations */
  --motion-200: 200ms;     /* icon/state toggles */
  --motion-300: 300ms;     /* standard UI transitions */
  --motion-400: 400ms;     /* staged entrances (bg sweep) */
  --motion-600: 600ms;     /* media fades */
  --motion-1000: 1000ms;   /* “flash reveal” keyframes */
  --motion-1600: 1600ms;   /* scroll hints */
  --motion-2000: 2000ms;   /* CTA breathing/shake loops */

  /* Easing */
  --ease-standard: ease;
  --ease-inout: ease-in-out;
  --ease-out: ease-out;
  --ease-linear: linear;
  --ease-emphasis: cubic-bezier(.36,.07,.19,.97); /* “tech shake” */
}
```

---

## 4. Color Palette

> The “palette” is the *evidence list*; tokens are the *system*.

### 4.1 Core colors (observed)
- Accent yellow: `#FFFA00` (`rgb(255, 250, 0)`)
- Text: `#191919` (`rgb(25, 25, 25)`)
- Surface dark: `#383838`
- Surface: `#F2F2F2` / `#E6E6E6`
- Border: `#D9D9D9`
- Muted text: `#999999`
- Inverse highlight: `#EEEEEE`

### 4.2 Usage mapping
- `#FFFA00`: primary CTA background, section dividers, “active” highlights
- `#191919`: default UI text + “console” labels
- `#383838`: tags, dark cards, background blocks behind text
- overlays: `rgba(0,0,0,0.2~0.7)` for video readability

---

## 5. Typography

Endfield uses multiple families to create “industrial console” hierarchy:
- Sans families for body/UI (`SansRegular/SansMedium/SansBold`)
- Wide display families for headings (`Novecentosanswide-*`)
- Tech-modern Latin families (`Gilroy-*`) for numbers/labels

### 5.1 Practical guidance
- Headings: uppercase, compact line-height (near 1), sometimes negative letter spacing for impact
- Body: medium weight preferred; supports dense paragraph blocks over dark overlays

---

## 6. Spacing System

Spacing is a mix of:
- **Large structural offsets** for cinematic composition (hero / left rail / huge paddings)
- **Tight micro-spacing** for console UI (2–8px equivalents), often expressed via rem scaling

**Recommendation for semantic spacing tokens**
- `--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-6: 24px`, `--space-8: 32px`
- Use large “layout tokens” separately: `--layout-gutter`, `--layout-rail`, `--layout-hero-offset`

---

## 7. Component Styles

### 7.1 Buttons (pattern)
- CTA: yellow surface, dark text, left border accent, subtle shadow texture, quick hover transitions
- Secondary: light surface, muted border, less contrast

### 7.2 Tags / Badges
- Dark chip with white text, small radius (`2px`), used for categories/dates

### 7.3 Navigation (left rail)
- Vertical nav items, icon + label; active state uses color transitions and indicator movement

---

## 8. Motion System (Core)

This section is where a **static style guide usually fails**. Endfield’s quality comes from:
- runtime transitions with specific durations/easing
- keyframe “tech” effects
- staged delay chains
- JS-driven components (e.g., Swiper) where CSS alone is incomplete

### 8.1 Runtime transitions (observed via `document.getAnimations()`)

**Navigation switch**
- `iconColor`: `200ms ease` (`color` transition on SVG/icon)
- `overlaySlide`: `300ms ease` (`transform` translateY for indicator/overlay)

**Media background video fade**
- `opacity 1 -> 0`: `600ms ease`
- Implemented via a class toggle that applies `opacity: 0` to a `video` element, relying on `transition: opacity .6s`

### 8.2 Staged delay chain (the “premium cadence”)

Example pattern (Operator section divider):
- background sweep enters first (delayed), then icon, then subtitle, then title
- typical ladder: `200ms → 400ms → 500ms → 600ms` (delays), with `300–400ms` durations

**What to document**
- each element’s: `property`, `duration`, `delay`, `easing`, and from/to states

### 8.3 Keyframes (extract full definitions)

> These primitives are directly reusable across projects if you keep naming semantic.

**Shake (CTA emphasis)** – `__01-Home_activityShake__piREg`
```css
@keyframes __01-Home_activityShake__piREg{
  0%{transform:translateZ(0)}
  5%{transform:translate3d(-.25rem,-.0625rem,0)}
  10%{transform:translate3d(.25rem,.0625rem,0)}
  15%{transform:translate3d(-.125rem,-.0625rem,0)}
  20%{transform:translate3d(.125rem,.0625rem,0)}
  25%{transform:translateZ(0)}
  to{transform:translateZ(0)}
}
```

**Breathing (CTA background)** – `__01-Home_activityBreath__e_bFe`
```css
@keyframes __01-Home_activityBreath__e_bFe{
  0%{background-color:rgba(0,0,0,.5)}
  50%{background-color:rgba(85,85,85,.5)}
  to{background-color:rgba(0,0,0,.5)}
}
```

**Scroll hint (move + fade loop)** – `__01-Home_scrollTipMove__Rmj8S`
```css
@keyframes __01-Home_scrollTipMove__Rmj8S{
  0%{transform:translateX(-50%) translateY(0);opacity:0}
  60%{opacity:1}
  80%{transform:translateX(-50%) translateY(1.5rem);opacity:0}
  to{transform:translateX(-50%) translateY(0);opacity:0}
}
```

**Flash reveal (stutter to visible)** – `__05-Gameplay_flashing__W8_Z1`
```css
@keyframes __05-Gameplay_flashing__W8_Z1{
  0%{opacity:0}
  10%{opacity:.5}
  11%{opacity:0}
  20%{opacity:.5}
  21%{opacity:0}
  40%{opacity:.5}
  41%{opacity:0}
  to{opacity:1}
}
```

**Marquee (rolling content)** – `RollingContent_carousel__Yi3KP`
```css
@keyframes RollingContent_carousel__Yi3KP{
  0%{transform:translateX(0)}
  80%{transform:translateX(-50%)}
  to{transform:translateX(-50%)}
}
```

### 8.4 Third-party / JS-driven motion (Swiper example)

Evidence of Swiper:
- `.swiper-wrapper` / `.swiper-slide` in DOM
- Swiper base CSS includes `transition-property: transform`

**Extractor requirement**
- If motion is JS-driven, add a “sampling trace”:
  - sample `getComputedStyle(target).transform` each `requestAnimationFrame` for ~700ms after click/drag
  - infer duration & easing (or document “discrete step” updates if no smooth interpolation)

### 8.5 Interaction state matrix (must include more than hover/disabled)

For each primary interactive component type:
- `default`
- `hover` (if `any-hover:hover`)
- `active/pressed`
- `focus-visible`
- `disabled`
- `loading` (if present)

Document:
- visual differences (color/border/opacity/transform)
- whether motion occurs (transition/animation)

---

## 9. Border Styles

Border language is “industrial”:
- thin dividers (`1px`) on panels
- CTA left accent bar (thicker)

---

## 10. Border Radius

Typical small radius (chip/button edges):
- `2px` is common for tags/buttons
- some surfaces use slightly larger radii but remain conservative

---

## 11. Opacity & Transparency

Overlay strategy (core to media-first UI):
- `rgba(0,0,0,0.2)` for subtle darkening
- `rgba(0,0,0,0.5)` for readable text overlays
- `rgba(0,0,0,0.7)` for emphasis / deeper modal overlays

---

## 12. Z-Index / Layering

Layering pattern:
- media background (image/video)
- overlay gradients
- content blocks
- fixed navigation rail/header
- modals / media viewers

Document as a semantic stack (`--z-nav`, `--z-modal`, etc.) even if raw values differ.

---

## 13. Responsive Behavior

Endfield uses **orientation-based** variants heavily:
- `@media (orientation: portrait)` branches define many layout overrides

Document:
- which components disappear on portrait vs landscape
- how nav/button sizing changes
- how typography scales and wraps

---

## 14. CSS Variables / Theme Sources

Even when a site doesn’t expose a clean `:root` token set, you can still:
- extract repeated raw values and propose semantic tokens (Section 3)
- find third-party CSS variables (e.g., Swiper uses `--swiper-theme-color`)

---

## 15. Layout Patterns

**Section viewer + hash navigation**
- single-page “section stack”
- navigation updates `location.hash`
- scrolling between sections triggers enter animations and active-state decorations

**Console blocks**
- dense text columns, labels, counters (`01 / 010` etc.)
- framed by dividers, icons, and small caps headings

---

## 16. Example Components (Copy-Paste)

### 16.1 Endfield CTA Button (semantic recreation)

```html
<button class="ef-cta">
  <span class="ef-cta__label">RESERVE</span>
</button>
```

```css
.ef-cta{
  height: 64px;
  padding: 0 24px;
  min-width: 240px;
  border-radius: 4px;
  border-left: 12px solid var(--color-accent-strong);
  background: var(--color-accent);
  color: var(--color-text);
  transition: border-color var(--motion-200) var(--ease-standard),
              background-color var(--motion-200) var(--ease-standard);
  cursor: pointer;
}
.ef-cta:hover{ border-left-color: #efe701; }
.ef-cta:active{ border-left-color: #e6de01; }
.ef-cta:focus-visible{
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### 16.2 Flash reveal utility (maps to gameplay/AIC)

```css
.ef-flash-reveal{ opacity: 0; }
.ef-flash-reveal.is-active{
  animation: __05-Gameplay_flashing__W8_Z1 var(--motion-1000) var(--ease-out) forwards;
}
```

---

## 17. Evidence Notes (How it was extracted)

**Minimum evidence set for motion**
1) `document.getAnimations({subtree:true})` snapshots around interactions  
2) list loaded stylesheets/scripts; detect third-party libs (Swiper/GSAP/etc.)  
3) extract full `@keyframes` definitions from CSS text when possible  
4) document staged delay chains (multiple elements with coordinated delays)  
5) state matrix beyond hover/disabled (focus-visible, active/pressed, loading)  

**When animations are “invisible” to Web Animations API**
- treat as JS-driven: sample computed transforms/opacity per frame, or use a performance trace

---

**End of Reference**


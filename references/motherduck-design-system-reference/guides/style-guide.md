# MotherDuck Design System — Style Guide

> **Source:** https://motherduck.com/
> **Date captured:** 2026-03-13
> **Viewport:** 1280px desktop
> **CMS:** Next.js (styled-components)

---

## 1. Design Personality

**Technical product made approachable.** MotherDuck's visual language is built on monospace typography, hard 2px corners, strong charcoal borders, and a warm cream canvas. The result feels like a well-designed developer tool that doesn't take itself too seriously — sharp and systemized, but never cold.

**Key personality traits (evidence-grounded):**
- **Monospace-led** — `Aeonik Mono` is used for body, nav, buttons, and headings alike, giving the entire site a console/terminal feel
- **Border-disciplined** — `2px solid rgb(56, 56, 56)` is the universal structural element; shadows are rare
- **Warm neutral base** — cream `rgb(244, 239, 234)` instead of cold gray or white
- **Single-radius system** — `2px` on nearly every component; no radius variety
- **Accent-role clarity** — yellow owns CTA, teal owns secondary/success, blue owns informational; they never compete
- **Retro offset shadow** — `rgb(56, 56, 56) -6px 6px 0px 0px` on featured cards, creating a flat-but-lifted effect

---

## 2. Semantic Color Tokens

### 2.1 Accent colors

| Token | Value | Usage |
|---|---|---|
| `--color-accent-primary` | `rgb(255, 222, 0)` | Primary CTA background ("TRY 7 DAYS FREE"), persona badge (Software Engineers), section highlights |
| `--color-accent-secondary` | `rgb(83, 219, 201)` | Secondary persona badge (Data Scientists), success/support accents |
| `--color-accent-info` | `rgb(111, 194, 255)` | Tertiary persona badge (Data Engineers), "START FREE" nav button background |
| `--color-accent-coral` | `rgb(255, 113, 105)` | Newsletter "SUBSCRIBE" badge background |
| `--color-accent-lime` | `rgb(249, 238, 62)` | Subtle yellow variant (observed on some interactive states) |

### 2.2 Text colors

| Token | Value | Usage |
|---|---|---|
| `--color-text-primary` | `rgb(56, 56, 56)` | Headings, body text, borders, button text — the dominant text color |
| `--color-text-body` | `rgb(0, 0, 0)` | Form input text, some body copy |
| `--color-text-muted` | `rgb(161, 161, 161)` | Disabled button text, muted labels, input borders (default) |
| `--color-text-subtle` | `rgb(129, 129, 129)` | Secondary metadata |
| `--color-text-inverse` | `rgb(255, 255, 255)` | Text on dark backgrounds (footer, dark badges, persona cards active state) |
| `--color-text-soft` | `rgb(192, 192, 192)` | Very light labels |

### 2.3 Surface colors

| Token | Value | Usage |
|---|---|---|
| `--color-bg-cream` | `rgb(244, 239, 234)` | Page background, secondary button background |
| `--color-bg-soft` | `rgb(248, 248, 247)` | Form input background (70% opacity), disabled button background, featured card background |
| `--color-bg-card` | `rgb(255, 255, 255)` | Cards, content panels |
| `--color-bg-dark` | `rgb(56, 56, 56)` | Footer background, "How We Scale" badge, active persona card state, dark tags |
| `--color-bg-mid` | `rgb(90, 90, 90)` | Subtle dark variant |
| `--color-bg-muted` | `rgb(215, 215, 215)` | Neutral dividers |

### 2.4 Overlay colors

| Token | Value | Usage |
|---|---|---|
| `--overlay-dark` | `rgba(0, 0, 0, 0.7)` | Modal/overlay backdrops |

### 2.5 Badge-specific tinted backgrounds

These appear on ecosystem category badges:

| Token | Value |
|---|---|
| `--badge-bg-blue` | `rgb(235, 249, 255)` |
| `--badge-bg-green` | `rgb(232, 245, 233)` |
| `--badge-bg-purple` | `rgb(247, 241, 255)` |
| `--badge-bg-lime` | `rgb(249, 251, 231)` |
| `--badge-bg-yellow` | `rgb(255, 253, 231)` |
| `--badge-bg-gray` | `rgb(236, 239, 241)` |
| `--badge-bg-indigo` | `rgb(234, 240, 255)` |
| `--badge-bg-red` | `rgb(255, 235, 233)` |
| `--badge-bg-orange` | `rgb(253, 237, 218)` |

Matching border colors: `rgb(84, 180, 222)`, `rgb(56, 193, 176)`, `rgb(178, 145, 222)`, `rgb(179, 196, 25)`, `rgb(225, 196, 39)`, `rgb(132, 166, 188)`, `rgb(117, 151, 238)`, `rgb(243, 142, 132)`, `rgb(245, 177, 97)`.

### 2.6 Implementation-ready CSS variables

```css
:root {
  /* Accent */
  --color-accent-primary: rgb(255, 222, 0);
  --color-accent-secondary: rgb(83, 219, 201);
  --color-accent-info: rgb(111, 194, 255);
  --color-accent-coral: rgb(255, 113, 105);

  /* Text */
  --color-text-primary: rgb(56, 56, 56);
  --color-text-body: rgb(0, 0, 0);
  --color-text-muted: rgb(161, 161, 161);
  --color-text-inverse: rgb(255, 255, 255);

  /* Surfaces */
  --color-bg-cream: rgb(244, 239, 234);
  --color-bg-soft: rgb(248, 248, 247);
  --color-bg-card: rgb(255, 255, 255);
  --color-bg-dark: rgb(56, 56, 56);
}
```

**Transferable rules:**
- Use warm off-whites instead of pure cold grays for the main canvas
- Keep heavy text and borders in charcoal rather than pure black
- Let accent yellow own primary CTA duty exclusively
- Use secondary accent colors for semantic variation (persona, category), not for every button

---

## 3. Typography

### 3.1 Font stack

| Token | Value | Usage |
|---|---|---|
| `--font-ui` | `"Aeonik Mono", sans-serif` | Primary: body, nav, buttons, headings, labels — the dominant face |
| `--font-display` | `"Aeonik Fono", "Aeonik Mono"` | Display emphasis (marquee section dividers) |
| `--font-body` | `Inter, Arial, sans-serif` | Hero subtitle, persona descriptions, form inputs — softer reading face |
| `--font-brand` | `Aeonik, sans-serif` | Small brand labels (e.g., "MotherDuck AI" badge, weight 600) |

### 3.2 Type scale

| Token | Size | Line height | Weight | Usage |
|---|---|---|---|---|
| `--type-display` | `56px` | `67.2px` (1.2) | `400` | Hero H1, uppercase, letter-spacing `1.12px` |
| `--type-section-lg` | `48px` | `57.6px` (1.2) | `400` | Large section headings (e.g., "ECOSYSTEM") |
| `--type-section` | `32px` | `44.8px` (1.4) | `400` | Standard section headings, uppercase |
| `--type-module` | `24px` | `28.8px` (1.2) | `400–500` | Card headings, sub-section titles, uppercase |
| `--type-subtitle` | `20px` | `28px` (1.4) | `300` | Hero subtitle (Inter), descriptive paragraphs |
| `--type-badge` | `18px` | `25.2px` (1.4) | `400` | Persona badges, category labels, uppercase |
| `--type-body` | `16px` | `16px` (1.0) | `400` | Default body, nav links, buttons |
| `--type-small` | `14px` | `19.6px` (1.4) | `300` | Persona descriptions, card metadata (Inter) |
| `--type-caption` | `13px` | — | `400` | Small labels |
| `--type-micro` | `12px` | — | `400` | Fine print, badges |
| `--type-nano` | `11px` | — | `400` | Smallest observed text |

### 3.3 Typography patterns

- **All headings are uppercase** via `text-transform: uppercase`
- **Weight stays near 400** — the site is crisp, not loud. Only the brand label "MotherDuck AI" uses 600
- **Letter-spacing on H1** — `1.12px` (0.02em) adds subtle tracking to the hero
- **Nav links** — `16px`, `letter-spacing: 0.32px`, `line-height: 19.2px`
- **Single-family discipline** — Aeonik Mono carries nav, buttons, headings, and body. Inter is reserved for softer reading contexts (subtitle, descriptions, form inputs)
- **Bilingual note** — `"Noto Sans SC"` is loaded for Chinese content support

---

## 4. Spacing + Density

### 4.1 Layout variables (from CSS)

| Token | Value | Usage |
|---|---|---|
| `--header-desktop` | `90px` | Desktop header height |
| `--header-mobile` | `70px` | Mobile header height |
| `--eyebrow-desktop` | `55px` | Desktop eyebrow bar height |
| `--eyebrow-mobile` | `70px` | Mobile eyebrow bar height |

### 4.2 Spacing tokens (observed)

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `4px` | Badge padding vertical, tight icon gaps |
| `--space-sm` | `8px` | Button groups, badge H2 vertical padding, small gaps |
| `--space-md` | `16px` | Badge padding horizontal, card internal spacing, form input horizontal padding |
| `--space-lg` | `24px` | Card padding, module spacing, badge H2 horizontal padding |
| `--space-xl` | `32px` | Section internal padding |
| `--space-2xl` | `56px` | Section vertical rhythm |
| `--space-section` | `90px` | Footer top padding |
| `--space-hero` | `127px` | Large section gaps |

### 4.3 Density philosophy

This is a spacious but not luxurious system. Space creates clarity, not drama.

- Section gaps are generous (~127px between major sections)
- Internal component spacing is tight (8–24px)
- Nav bar: 70px height with 20px vertical padding
- The duality matters: if everything is spacious, the product feel is lost; if everything is tight, the marketing layer disappears

---

## 5. Component System

### 5.1 Primary CTA Button

The hero "TRY 7 DAYS FREE" button. Blue background, charcoal border, retro hover lift.

| Property | Default | Hover |
|---|---|---|
| background | `rgb(111, 194, 255)` | `rgb(111, 194, 255)` (unchanged) |
| color | `rgb(56, 56, 56)` | `rgb(56, 56, 56)` |
| border | `2px solid rgb(56, 56, 56)` | `2px solid rgb(56, 56, 56)` |
| border-radius | `2px` | `2px` |
| padding | `16.5px 22px` | `16.5px 22px` |
| font | `Aeonik Mono`, `16px`, `400`, uppercase | — |
| transform | `none` | `translate(7px, -7px)` |
| box-shadow | `none` | `none` (shadow is a sibling pseudo-element) |
| transition | `transform 0.12s ease-in-out` | — |

**Hover mechanism:** The button translates `7px` right and `7px` up, revealing a charcoal offset shadow (`-6px 6px`) underneath. This creates a "press to push back" affordance.

### 5.2 Secondary CTA Button

The "BOOK A DEMO" button. Cream background matching the page, same border and hover pattern.

| Property | Default | Hover |
|---|---|---|
| background | `rgb(244, 239, 234)` | `rgb(244, 239, 234)` |
| color | `rgb(56, 56, 56)` | `rgb(56, 56, 56)` |
| border | `2px solid rgb(56, 56, 56)` | `2px solid rgb(56, 56, 56)` |
| padding | `16.5px 22px` | `16.5px 22px` |
| transform | `none` | `translate(7px, -7px)` |
| transition | `transform 0.12s ease-in-out` | — |

### 5.3 Nav Button ("START FREE")

Smaller padding variant, blue background, same border system.

| Property | Value |
|---|---|
| background | `rgb(111, 194, 255)` |
| color | `rgb(56, 56, 56)` |
| border | `2px solid rgb(56, 56, 56)` |
| border-radius | `2px` |
| padding | `11.5px 18px` |
| font | `Aeonik Mono`, `16px`, `400`, uppercase |
| transition | `transform 0.12s ease-in-out` |

### 5.4 Disabled / Submit Button

| Property | Value |
|---|---|
| background | `rgb(248, 248, 247)` |
| color | `rgb(161, 161, 161)` |
| border | `2px solid rgb(161, 161, 161)` |
| border-radius | `2px` |
| padding | `17.25px 23px` |
| cursor | `pointer` (still pointer even when disabled) |
| transition | `transform 0.12s ease-in-out` |

Transferable idea: disabled buttons remain structurally present — they don't ghost away. The muted palette signals inactivity without breaking the layout.

### 5.5 Nav Link

| Property | Value |
|---|---|
| font | `Aeonik Mono`, `16px`, `400` |
| color | `rgb(56, 56, 56)` |
| letter-spacing | `0.32px` |
| border | `0.667px solid transparent` |
| border-radius | `2px` |
| display | `flex`, gap `6px` |
| transition | `all` (browser default) |

Hover effect is understated: the transparent border becomes visible rather than the text wildly changing.

### 5.6 Text Link ("READ MORE", "LEARN MORE")

| Property | Value |
|---|---|
| font | `Aeonik Mono`, `16px`, `400` |
| color | `rgb(56, 56, 56)` |
| border | `0.667px solid transparent` |
| text-decoration | `none` |
| transition | `all` |

### 5.7 Card (Content Panel)

White background, charcoal border, no radius. Used for feature cards ("Hypertenancy", "MCP Server").

| Property | Value |
|---|---|
| background | `rgb(255, 255, 255)` |
| border | `2px solid rgb(56, 56, 56)` |
| border-radius | `0px` |
| display | `flex` |
| overflow | `hidden` |

### 5.8 Featured Card (with retro shadow)

The AI demo card uses the retro offset shadow pattern.

| Property | Value |
|---|---|
| background | `rgb(248, 248, 247)` |
| border | `2px solid rgb(56, 56, 56)` |
| box-shadow | `rgb(56, 56, 56) -6px 6px 0px 0px` |

### 5.9 Form Input

| Property | Value |
|---|---|
| font | `Inter`, `16px`, `400` |
| color | `rgb(0, 0, 0)` |
| background | `rgba(248, 248, 247, 0.7)` |
| border | `2px solid rgb(56, 56, 56)` |
| border-radius | `2px` |
| padding | `16px 40px 16px 24px` |
| letter-spacing | `0.32px` |
| transition | `0.2s ease-in-out, padding` |

The chat-style input variant uses:
| Property | Value |
|---|---|
| font | `Aeonik Mono`, `14px` |
| border | `2px solid rgb(56, 56, 56)` |
| border-radius | `0px` |
| padding | `0px 16px` |
| height | `44px` |
| transition | `box-shadow 0.15s` |

### 5.10 Persona Badge (H3 with colored background)

Used in the "Who is it for?" section. Each persona gets a distinct accent color.

| Persona | Background | Color | Border |
|---|---|---|---|
| Software Engineers | `rgb(255, 222, 0)` | `rgb(56, 56, 56)` | `2px solid rgb(56, 56, 56)` |
| Data Scientists | `rgb(83, 219, 201)` | `rgb(56, 56, 56)` | `2px solid rgb(56, 56, 56)` |
| Data Engineers | `rgb(111, 194, 255)` | `rgb(56, 56, 56)` | `2px solid rgb(56, 56, 56)` |

Common properties: `padding: 4px 16px`, `font-size: 18px`, `font-weight: 400`, `text-transform: uppercase`, `border-radius: 0px`.

Active/selected state inverts: `background: rgb(56, 56, 56)`, `color: rgb(255, 255, 255)`, with `transition: background-color 0.3s, color 0.3s`.

### 5.11 Section Badge Heading (H2 with background)

A distinctive pattern: section headings rendered as inline badges with colored backgrounds.

| Heading | Background | Color | Padding |
|---|---|---|---|
| "How We Scale" | `rgb(56, 56, 56)` | `rgb(255, 255, 255)` | `8px 24px` |
| "SUBSCRIBE" | `rgb(255, 113, 105)` | `rgb(56, 56, 56)` | `8px 30px` |

Common: `font-size: 32px`, `font-weight: 400`, `text-transform: uppercase`, `border-radius: 0px`.

### 5.12 Persona Card (Clickable)

| Property | Default | Hover (implied) |
|---|---|---|
| transform | `scale(0.9)` | `scale(1)` |
| transition | `transform 0.3s` | — |
| border | none | — |
| background | transparent | — |

Cards start at 90% scale and grow to full size on hover/interaction.

### 5.13 Community Social Card

Profile picture: `border-radius: 50%`, `width: 46px`. Cards are minimal — no border, no background, no shadow. The content (quote text + profile) carries the visual weight.

---

## 6. Border, Radius, Shadow, and Layering

| Trait | Pattern |
|---|---|
| Border strategy | Borders do most of the structural work. `2px solid rgb(56, 56, 56)` is the universal border. |
| Radius scale | Essentially one value: `2px`. Circles (`50%`) only for avatars. `11px` observed once (likely third-party). |
| Shadow strategy | Rare. The retro offset shadow `rgb(56, 56, 56) -6px 6px 0px 0px` is the only shadow pattern. No soft drop shadows. |
| Hover shadow | Buttons don't gain shadows on hover — they translate to reveal a pre-existing offset shadow underneath. |
| Opacity | Modest. `rgba(248, 248, 247, 0.7)` on form inputs. No heavy transparency layers. |
| Layering | Conventional product-site layering. No theatrical z-index stacking. |

**Key insight:** This system proves how much identity can come from border discipline alone. The single radius, single border weight, and single shadow pattern create a cohesive visual language without any complexity.

---

## 7. Layout Tendencies

### 7.1 Page structure

- **Eyebrow bar** — announcement strip at top (`55px` desktop, `70px` mobile)
- **Header** — `70px` height, `20px` vertical padding, transparent background
- **Main content** — full-width sections with internal containers
- **Footer** — `rgb(56, 56, 56)` dark background, `padding: 90px 0 72px`

### 7.2 Section patterns

The homepage uses several distinct section types:

1. **Hero** — large H1 + subtitle + dual CTA buttons
2. **Interactive demo** — embedded AI chat card with retro shadow
3. **Marquee divider** — repeating text strip ("DATA WAREHOUSE + AI", "USE CASES") as section separators
4. **Feature cards** — white bordered cards with image + text split layout
5. **Persona grid** — three clickable persona cards with colored badges
6. **Use case tabs** — tabbed content with duck illustrations
7. **Scaling diagram** — duckling size cards with illustrations
8. **Ecosystem hub** — category badges linking to integration pages
9. **Testimonial carousel** — horizontal scrolling quote cards
10. **Community wall** — social media post cards in a masonry-like grid
11. **Slack CTA** — full-width banner with illustration
12. **Newsletter** — yellow background section with email form
13. **Footer** — dark background with link columns

### 7.3 Reusable layout patterns

- Centered content containers with generous padding
- Clean grid sections with obvious reading order
- Flat cards with strong border separation
- Marquee text strips as section dividers (not just decorative — they establish section identity)
- Badge headings that break out of the normal heading hierarchy

### 7.4 Adapt carefully

- Warm marketing hero for tools that need denser utility-first landing pages
- Playful accent pairings in serious enterprise contexts
- Marquee dividers may feel too casual for some products

### 7.5 Discard

- Exact product nav, pricing flow, and copy hierarchy
- Duck-themed language and illustrations
- Specific persona/use-case content structure

---

## 8. Responsive Behavior

### 8.1 Breakpoints (from CSS media queries)

| Breakpoint | Usage |
|---|---|
| `max-width: 480px` | Small mobile |
| `min-width: 480px` | Mobile landscape |
| `min-width: 556px` | Small tablet |
| `min-width: 728px` | Tablet |
| `max-width: 768px` | Mobile-first max |
| `min-width: 960px` | Desktop start |
| `max-width: calc(1301px)` | Below wide desktop |
| `min-width: 1302px` | Wide desktop |
| `min-width: 1440px` | Large desktop |
| `min-width: 1600px` | Extra-wide |

### 8.2 Responsive patterns

- Container padding reduces on mobile
- Header height shifts: `90px` desktop → `70px` mobile
- Eyebrow bar: `55px` desktop → `70px` mobile (taller on mobile for touch targets)
- Multi-column areas collapse to single column
- The token system stays consistent across breakpoints — only layout changes, not visual language

---

## 9. Copy-Paste Examples

### 9.1 Primary CTA with retro shadow

```html
<div class="md-cta-wrap">
  <a href="#" class="md-btn md-btn--primary">TRY 7 DAYS FREE</a>
</div>
```

```css
.md-cta-wrap {
  position: relative;
  display: inline-block;
}
.md-cta-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgb(56, 56, 56);
  z-index: -1;
}
.md-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "Aeonik Mono", sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  padding: 16.5px 22px;
  border: 2px solid rgb(56, 56, 56);
  border-radius: 2px;
  text-decoration: none;
  transition: transform 0.12s ease-in-out;
}
.md-btn--primary {
  background: rgb(111, 194, 255);
  color: rgb(56, 56, 56);
}
.md-btn--primary:hover {
  transform: translate(7px, -7px);
}
```

### 9.2 Secondary CTA

```css
.md-btn--secondary {
  background: rgb(244, 239, 234);
  color: rgb(56, 56, 56);
}
.md-btn--secondary:hover {
  transform: translate(7px, -7px);
}
```

### 9.3 Disabled button

```css
.md-btn--disabled {
  background: rgb(248, 248, 247);
  color: rgb(161, 161, 161);
  border-color: rgb(161, 161, 161);
  cursor: not-allowed;
}
```

### 9.4 Flat card

```html
<article class="md-card">
  <h3 class="md-card__title">Feature Title</h3>
  <p class="md-card__body">Supporting copy.</p>
</article>
```

```css
.md-card {
  background: rgb(255, 255, 255);
  border: 2px solid rgb(56, 56, 56);
  border-radius: 0px;
  overflow: hidden;
  display: flex;
}
.md-card__title {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 24px;
  font-weight: 400;
  text-transform: uppercase;
  color: rgb(56, 56, 56);
}
```

### 9.5 Persona badge

```html
<span class="md-badge md-badge--yellow">Software Engineers</span>
<span class="md-badge md-badge--teal">Data Scientists</span>
<span class="md-badge md-badge--blue">Data Engineers</span>
```

```css
.md-badge {
  display: inline-block;
  font-family: "Aeonik Mono", sans-serif;
  font-size: 18px;
  font-weight: 400;
  text-transform: uppercase;
  padding: 4px 16px;
  border: 2px solid rgb(56, 56, 56);
  border-radius: 0px;
  color: rgb(56, 56, 56);
  transition: background-color 0.3s, color 0.3s;
}
.md-badge--yellow { background: rgb(255, 222, 0); }
.md-badge--teal { background: rgb(83, 219, 201); }
.md-badge--blue { background: rgb(111, 194, 255); }
.md-badge.is-active {
  background: rgb(56, 56, 56);
  color: rgb(255, 255, 255);
}
```

### 9.6 Section badge heading

```html
<h2 class="md-section-badge md-section-badge--dark">How We Scale</h2>
```

```css
.md-section-badge {
  display: inline-block;
  font-family: "Aeonik Mono", sans-serif;
  font-size: 32px;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 44.8px;
  border-radius: 0px;
}
.md-section-badge--dark {
  background: rgb(56, 56, 56);
  color: rgb(255, 255, 255);
  padding: 8px 24px;
}
.md-section-badge--coral {
  background: rgb(255, 113, 105);
  color: rgb(56, 56, 56);
  padding: 8px 30px;
  border: 2px solid rgb(56, 56, 56);
}
```

### 9.7 Form input

```html
<input class="md-input" placeholder="Enter value" />
```

```css
.md-input {
  width: 100%;
  font-family: Inter, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.32px;
  padding: 16px 24px;
  border: 2px solid rgb(56, 56, 56);
  border-radius: 2px;
  background: rgba(248, 248, 247, 0.7);
  color: rgb(0, 0, 0);
  transition: 0.2s ease-in-out;
}
.md-input:focus {
  outline: none;
  border-color: rgb(56, 56, 56);
}
```

---

## 10. Classification Summary

| Trait | Classification | Notes |
|---|---|---|
| Monospace-led typography | `Reusable` | Single-family discipline creates strong coherence |
| Warm cream canvas | `Reusable` | Approachable alternative to cold grays |
| 2px border + 2px radius system | `Reusable` | Extreme simplicity, high identity |
| Charcoal-not-black text | `Reusable` | Softer than pure black, still authoritative |
| Retro offset shadow hover | `Reusable` | Distinctive interaction pattern |
| `0.12s ease-in-out` button transition | `Reusable` | Snappy, responsive feel |
| Badge heading pattern | `Reusable` | Inline colored headings as section markers |
| Persona color coding | `Reusable` | Three accent colors for three audience segments |
| Marquee section dividers | `Adapted` | Repeating text strips; concept reusable, execution is brand-specific |
| Ecosystem badge palette | `Adapted` | 9 tinted backgrounds; pattern reusable, exact colors are category-specific |
| Duck illustrations | `Discarded` | Brand-specific visual content |
| Product nav and IA | `Discarded` | Pricing/product/community/company structure |
| Testimonial carousel | `Adapted` | Layout pattern reusable, content is product-specific |
| Newsletter yellow section | `Adapted` | Full-width accent section; concept reusable |

---

## 11. Implementation Notes

- **Preserve the one-radius discipline.** Adding multiple radii weakens the system quickly. If you need softer corners for a specific context, use a separate token rather than inflating the base.
- **Prefer border-led structure over shadow-led structure.** The retro offset shadow is the only shadow pattern — don't add soft drop shadows.
- **Font loading:** Aeonik Mono is a commercial font. If unavailable, `"IBM Plex Mono", "SF Mono", monospace` is a reasonable fallback that preserves the console feel.
- **Accessibility gap:** The site does not have custom `:focus-visible` styles. If reusing this system, add clear focus indicators consistent with the border logic (e.g., `outline: 2px solid rgb(111, 194, 255); outline-offset: 2px`).
- **Keep accent color ownership clear.** Yellow = primary CTA. Teal = secondary/success. Blue = informational/nav. Coral = attention/newsletter. Don't let them compete.
- **The `0.12s` transition is intentionally fast.** This is snappier than the typical `0.2–0.3s` web standard, giving the site a responsive, tool-like feel.

---

## 12. Adaptation Notes

- **Keep:** typographic coherence (mono everywhere), sharp geometry (2px), warm neutral base, bordered components, retro shadow hover, badge heading pattern
- **Soften:** brand playfulness if the destination is more serious; reduce accent color count if the product doesn't have three distinct personas
- **Avoid copying:** duck-specific language, full marketing composition, literal CTA copy, exact product navigation structure

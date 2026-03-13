# MotherDuck Design System — Evidence Manifest

> **Extraction date:** 2026-03-13
> **Extractor:** Claude Code / Style Extractor Skill
> **Source URL:** https://motherduck.com/

---

## 1. Source Information

| Field | Value |
|---|---|
| URL | https://motherduck.com/ |
| Site type | SaaS product marketing site (cloud data warehouse) |
| Framework | Next.js with styled-components |
| Pages analyzed | Homepage only (index) |
| Viewport | 1280px desktop |
| Date captured | 2026-03-13 |

---

## 2. Screenshots

| File | Description | What it captures |
|---|---|---|
| `evidence/screenshots/01-homepage-viewport.png` | Homepage initial viewport (above fold) | Hero heading, dual CTA buttons, nav bar, eyebrow announcement |
| `evidence/screenshots/03-hero-cta-hover.png` | Hero CTA button hover state | "TRY 7 DAYS FREE" button with retro offset lift (translate 7px, -7px) |
| `evidence/screenshots/04-who-is-it-for.png` | "Who is it for?" persona section | Three persona cards with colored badges, scale interaction |
| `evidence/screenshots/05-how-we-scale.png` | "How We Scale" section | Badge heading (dark bg), duckling size cards with illustrations |
| `evidence/screenshots/06-ecosystem.png` | Ecosystem section | Category badges, integration hub layout |
| `evidence/screenshots/07-footer.png` | Footer and newsletter section | Dark footer, yellow newsletter section, link columns |

---

## 3. Downloaded Assets

| File | Source | Description |
|---|---|---|
| (none downloaded) | — | Site uses styled-components; CSS is generated at runtime, not available as static files |

---

## 4. Extraction Methods

### 4.1 Static Evidence

| Method | Tool | Details |
|---|---|---|
| Page navigation | `mcp__chrome-devtools__navigate_page` | Navigated to homepage, waited for full load |
| DOM snapshot | `mcp__chrome-devtools__take_snapshot` | Full a11y tree — 500+ nodes, all interactive elements identified |
| Screenshots | `mcp__chrome-devtools__take_screenshot` | 6 screenshots (viewport, hover state, 4 section-level) |
| Computed styles — global | `evaluate_script` | Extracted all unique text colors (8), bg colors (21), border colors (14), font families (11), font sizes (13), box-shadows (1), border-radii (3), transitions (30+) |
| Computed styles — components | `evaluate_script` | `getComputedStyle` on body, H1, hero subtitle, all H2s (12), all H3s (10), CTA buttons (3 variants), nav items (8), cards (3), inputs (3), persona badges, footer |
| Hover state — CTA button | `hover` on uid `3_74` + `evaluate_script` | Captured transform change: `none` → `matrix(1, 0, 0, 1, 7, -7)` = `translate(7px, -7px)` |
| Hover state — secondary CTA | `hover` on uid `3_76` + `evaluate_script` | Same transform pattern confirmed on "BOOK A DEMO" |
| Section layout | `evaluate_script` | Extracted H2 positions (y-coordinates), section heights, padding, margins, backgrounds |
| Badge heading pattern | `evaluate_script` | Identified 8 badge-style headings with colored backgrounds |
| Persona card structure | `evaluate_script` | Extracted card dimensions, badge styles, description typography, scale transforms |

### 4.2 Motion Evidence

| Method | Details |
|---|---|
| CSS variable scan | Scanned all `:root` rules — found `--header-desktop`, `--header-mobile`, `--eyebrow-desktop`, `--eyebrow-mobile` + Toastify/Swiper third-party vars |
| @keyframes extraction | Parsed all `CSSKeyframesRule` from stylesheets — 31 total (22 Toastify, 4 site-owned, 1 Swiper, 4 duplicates) |
| Transition scan | Extracted all `transition` properties from CSS rules — 41 transition declarations catalogued |
| Animation binding scan | Extracted all `animation` declarations — 4 animation bindings (all Toastify-related) |
| Media query extraction | Collected all `CSSMediaRule.conditionText` — 12 unique breakpoints |

### 4.3 Tools NOT Used

- `scripts/transition-scanner.js` — Not needed; styled-components CSS rules were accessible via `evaluate_script`
- `scripts/interaction-diff.js` — Not needed; hover states captured via direct hover + computed style diff
- `scripts/library-detect.js` — Not needed; framework identified from DOM structure (Next.js + styled-components class patterns)
- `scripts/motion-tools.js` — Not needed; no opaque JS-driven motion requiring rAF sampling
- Performance trace — Not needed for this complexity level

---

## 5. Interactions Tested

| Interaction | Method | Evidence | Completeness |
|---|---|---|---|
| "TRY 7 DAYS FREE" hover | `hover` on uid `3_74` + computed style capture | Screenshot 03, transform `translate(7px, -7px)` | Full |
| "BOOK A DEMO" hover | `hover` on uid `3_76` + computed style capture | Same transform pattern confirmed | Full |
| Persona badge active state | Computed style extraction | `bg: rgb(56,56,56)`, `color: #fff`, `transition: background-color 0.3s, color 0.3s` | CSS rules (not visually tested) |
| Persona card scale | Computed style extraction | `transform: scale(0.9)`, `transition: transform 0.3s` | CSS rules (not visually tested) |
| Nav link hover | DOM snapshot observation | `border: 0.667px solid transparent` → visible on hover | CSS rules only |
| Input focus | Computed style extraction | `transition: box-shadow 0.15s` / `0.2s ease-in-out` | CSS rules only |
| Popup close | `click` on uid `3_502` | HubSpot popup CTA dismissed | Functional |

---

## 6. Component State Matrix

### Primary CTA Button ("TRY 7 DAYS FREE")

| State | Background | Transform | Box-shadow | Trigger | Evidence |
|---|---|---|---|---|---|
| Default | `rgb(111, 194, 255)` | `none` | `none` | — | Computed styles |
| Hover | `rgb(111, 194, 255)` | `translate(7px, -7px)` | `none` (shadow is sibling) | Mouse hover | Screenshot 03 + computed diff |
| Active | `rgb(111, 194, 255)` | snap back | — | Mouse press | CSS `:active` rule (30ms transition) |
| Focus-visible | Not styled | — | — | — | No `:focus-visible` rules found |

### Secondary CTA Button ("BOOK A DEMO")

| State | Background | Transform | Evidence |
|---|---|---|---|
| Default | `rgb(244, 239, 234)` | `none` | Computed styles |
| Hover | `rgb(244, 239, 234)` | `translate(7px, -7px)` | Computed diff |

### Disabled Button ("SUBMIT")

| State | Background | Color | Border | Evidence |
|---|---|---|---|---|
| Disabled | `rgb(248, 248, 247)` | `rgb(161, 161, 161)` | `2px solid rgb(161, 161, 161)` | Computed styles |

### Persona Badge

| State | Background | Color | Border | Evidence |
|---|---|---|---|---|
| Default (yellow) | `rgb(255, 222, 0)` | `rgb(56, 56, 56)` | `2px solid rgb(56, 56, 56)` | Computed styles |
| Default (teal) | `rgb(83, 219, 201)` | `rgb(56, 56, 56)` | `2px solid rgb(56, 56, 56)` | Computed styles |
| Default (blue) | `rgb(111, 194, 255)` | `rgb(56, 56, 56)` | `2px solid rgb(56, 56, 56)` | Computed styles |
| Active/Selected | `rgb(56, 56, 56)` | `rgb(255, 255, 255)` | `2px solid rgb(56, 56, 56)` | Computed styles |

---

## 7. Confidence Assessment

### High Confidence
- **Color palette** — Complete extraction from computed styles across all DOM elements (8 text colors, 21 bg colors, 14 border colors)
- **Typography** — All font families confirmed via computed styles; all 13 font sizes catalogued
- **Border/radius system** — Universal `2px` radius and `2px solid rgb(56, 56, 56)` border confirmed across all components
- **Button hover mechanism** — Directly observed via hover + computed style diff (translate 7px, -7px)
- **Transition patterns** — Complete inventory (41 transition rules from CSS)
- **Breakpoints** — All 12 media query conditions extracted from CSS
- **Badge heading pattern** — All 8 badge-style headings identified with exact styles

### Medium Confidence
- **Retro offset shadow** — Observed on AI demo card (`-6px 6px 0px 0px`); button hover reveals this shadow via translate, but the shadow implementation (pseudo-element vs sibling) was inferred, not directly inspected
- **Persona card interaction** — Scale transform `0.9` → `1` observed in computed styles, but the exact trigger (hover vs scroll vs intersection) was not confirmed
- **Community social cards** — Minimal styling observed (no border, no bg); may have hover states not captured
- **Marquee section dividers** — Text content detected but exact animation (CSS animation vs JS scroll) not confirmed

### Gaps / Not Captured
- **Mobile layout** — Only desktop viewport (1280px) analyzed
- **Inner pages** — Only homepage analyzed. Product, pricing, blog pages may have additional components
- **Full-page screenshot** — Failed due to page size (14648px height); only viewport screenshots captured
- **Nav dropdown interaction** — Nav buttons (PRODUCT, COMMUNITY, COMPANY) were not interactive during hover testing
- **Testimonial carousel** — Horizontal scroll behavior not tested; only static card styles observed
- **Toast notification** — Toastify is loaded but no toast was triggered during extraction
- **Dark mode** — No dark mode toggle or `prefers-color-scheme` media query observed
- **Focus-visible states** — The site does not have custom `:focus-visible` styling

---

## 8. Third-Party Dependencies

| Library | Version | Purpose |
|---|---|---|
| Next.js | — | React framework (SSR/SSG) |
| styled-components | — | CSS-in-JS (class name patterns: `.hYweFU`, `.kIgTrP`, etc.) |
| react-toastify | — | Toast notifications (22 keyframes, CSS variables) |
| Swiper | — | Carousel/slider (`--swiper-theme-color`, `swiper-preloader-spin` keyframe) |
| Inter | — | Body/description font (Google Fonts or self-hosted) |
| Aeonik Mono | — | Primary UI font (commercial, self-hosted) |
| Aeonik Fono | — | Display font variant (commercial, self-hosted) |
| Aeonik | — | Brand label font (commercial, self-hosted) |
| Noto Sans SC | — | Chinese language support |
| HubSpot | — | Popup CTA forms (iframe-based) |

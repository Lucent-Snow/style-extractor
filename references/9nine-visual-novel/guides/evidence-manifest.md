# 9-nine- Visual Novel Portal — Evidence Manifest

> **Extraction date:** 2026-03-13
> **Extractor:** Claude Code / Style Extractor Skill
> **Source URL:** https://9-nine-project.com/

---

## 1. Source Information

| Field | Value |
|-------|-------|
| URL | https://9-nine-project.com/ |
| Site type | Visual novel / anime IP promotional portal |
| CMS | WordPress (custom theme: `nine-project`) |
| Pages analyzed | Homepage only (index) |
| Viewport | 1280px desktop |
| Date captured | 2026-03-13 |

---

## 2. Screenshots

| File | Description | What it captures |
|------|-------------|-----------------|
| `evidence/screenshots/01-homepage-viewport.png` | Homepage initial viewport (above fold) | Hero area, header nav, particle canvas |
| `evidence/screenshots/02-homepage-fullpage.png` | Full page screenshot (all sections) | Complete page layout, section spacing, vertical rhythm |
| `evidence/screenshots/03-nav-hover.png` | Header navigation with hover on "NEWS" | Nav underline reveal (::before height: 42px, opacity: 0.6) |
| `evidence/screenshots/04-button-hover.png` | "VIEW MORE" button hover state | Background change #004789 → #0c569a, line slides to right: -60px, arrow flips |
| `evidence/screenshots/05-footer.png` | Footer section | Blue bg, diamond overlay, wave border, nav links, copyright |
| `evidence/screenshots/06-character-section.png` | Character gallery section | Staggered character portraits, name plates, depth layout |
| `evidence/screenshots/07-news-section.png` | News listing section | Thumbnail cards, date/category/title typography, "VIEW MORE" button |

---

## 3. Downloaded Assets

| File | Source | Description |
|------|--------|-------------|
| `evidence/assets/style.css` | `nine-project/assets/css/index/style.css` | Main stylesheet (minified) — all selectors, keyframes, transitions, media queries |
| `evidence/assets/google-fonts.css` | Google Fonts API | Font-face declarations for Cormorant Infant (600, 700), Noto Sans JP (400, 500, 700), Noto Serif JP (500, 700), Oswald (400) |
| `evidence/assets/yakuhanjp.min.css` | jsDelivr CDN (v3.3.1) | YakuHanJP font-face declarations |

---

## 4. Extraction Methods

### 4.1 Static Evidence

| Method | Tool | Details |
|--------|------|---------|
| Page navigation | `mcp__chrome-devtools__navigate_page` | Navigated to homepage, waited for full load |
| DOM snapshot | `mcp__chrome-devtools__take_snapshot` | Full a11y tree — 256 nodes, all interactive elements identified |
| Screenshots | `mcp__chrome-devtools__take_screenshot` | 7 screenshots (viewport, fullpage, 5 component-level) |
| Computed styles — global | `evaluate_script` | Extracted all unique text colors (6), bg colors (6), border colors (7), font families (5), font sizes (10), box-shadows (1), filters (2) from every DOM element |
| Computed styles — components | `evaluate_script` | `getComputedStyle` on body, nav links (4), section headings (4 with .en/.ja), buttons (2 with ::before/::after), footer (with ::before/::after), tab dots (3), character name plates (3), news items |
| Hover state — nav | `mcp__chrome-devtools__hover` on uid `1_5` + `evaluate_script` | Captured ::before height change (0 → 42px), opacity (→ 0.6) |
| Hover state — button | `mcp__chrome-devtools__hover` on uid `1_112` + `evaluate_script` | Captured bg change (#004789 → #0c569a), ::before right (-50px → -60px), ::after transform flip |
| Section layout | `evaluate_script` | Extracted padding/margin/width for all 18 `[class*="idx-"]` sections and their `_Inner` containers |
| Header/footer layout | `evaluate_script` | Header dimensions, nav display, logo size, footer inner width/padding/margin, copyright styles |

### 4.2 Motion Evidence

| Method | Details |
|--------|---------|
| @keyframes extraction | Parsed all `CSSKeyframesRule` from stylesheets — 11 unique keyframes (some duplicated across PC/SP sheets) |
| Transition scan | Extracted all `transition` properties from CSS rules — 60+ transition declarations catalogued |
| Animation binding scan | Extracted all `animation` / `animationName` declarations with duration, delay, easing — 15 animation bindings |
| Delay chain extraction | Regex-matched `nth-of-type` selectors with `animationDelay` — 8 header nav delays, 20 character delays (10 PC + 10 SP) |
| Breakpoint extraction | Collected all `CSSMediaRule.conditionText` — 15 unique media query breakpoints |
| CSS variable scan | Scanned all `:root` rules — confirmed zero custom properties (all values hardcoded) |

### 4.3 Tools NOT Used

- `scripts/transition-scanner.js` — Not injected; CSS rule parsing via `evaluate_script` was sufficient for complete transition inventory
- `scripts/interaction-diff.js` — Not needed; site uses scroll-trigger classes (`.animated`), not inline-style mutations
- `scripts/library-detect.js` — Not needed; no third-party animation library detected (pure CSS keyframes + class toggling)
- `scripts/motion-tools.js` — Not needed; no opaque JS-driven motion requiring rAF sampling
- Performance trace — Not needed for this complexity level

---

## 5. Interactions Tested

| Interaction | Method | Evidence | Completeness |
|-------------|--------|----------|-------------|
| Nav link hover ("NEWS") | `hover` on uid `1_5` + computed style capture | Screenshot 03, ::before height 0→42px, opacity→0.6 | Full |
| "VIEW MORE" button hover | `hover` on uid `1_112` + computed style capture | Screenshot 04, bg #004789→#0c569a, line right -50px→-60px, arrow flips | Full |
| Carousel tab dots | DOM snapshot observation | `[role="tab"]` with `aria-selected`, opacity 0.3/1.0, transform rotate(45deg) | Observed (no click test) |
| Character gallery | Computed style extraction | Staggered animation delays extracted, depth ordering confirmed | Delays only (scroll trigger not fired) |
| News thumbnail hover | CSS rule extraction | `transform: scale(1.05)` on img, `color: #004789` on title, overlay ::before | CSS rules only (not visually tested) |

---

## 6. Component State Matrix

### Navigation Link

| State | Color | `::before` height | `::before` opacity | Trigger | Evidence |
|-------|-------|-------------------|-------------------|---------|----------|
| Default | `#004789` | `0` | — | — | Computed styles |
| Hover | `#004789` | `42px` | `0.6` | Mouse hover | Screenshot 03 + computed diff |
| Current | `#004789` | `42px` | `1` | Page match | `header-line 0.5s ease 0.8s` keyframe |

### "VIEW MORE" Button

| State | Background | Color | `::before` right | `::after` transform | Evidence |
|-------|-----------|-------|------------------|---------------------|----------|
| Default | `#004789` | `#fff` | `-50px` | `rotate(20deg)` | Computed styles |
| Hover | `#0c569a` | `#fff` | `-60px` | `rotate(180deg)` | Screenshot 04 + computed diff |
| Focus-visible | Not styled | — | — | — | No `:focus-visible` rules found |

### Carousel Tab Dot

| State | Background | Opacity | Shape | Evidence |
|-------|-----------|---------|-------|----------|
| Default | `#004789` | `0.3` | 8×8px diamond (rotate 45°) | Computed styles |
| Selected | `#004789` | `1` | 8×8px diamond | DOM `aria-selected="true"` |

### News Item

| State | Thumbnail | Title color | Overlay | Evidence |
|-------|-----------|------------|---------|----------|
| Default | `scale(1)` | `#343434` | Hidden | Computed styles |
| Hover | `scale(1.05)` | `#004789` | Fades in | CSS transition rules |

---

## 7. Confidence Assessment

### High Confidence
- **Color palette** — Complete extraction from computed styles across all DOM elements (6 text colors, 6 bg colors, 7 border colors)
- **Typography** — All four font families confirmed via Google Fonts request + computed styles; all 10 font sizes catalogued
- **@keyframes** — Complete extraction (11 unique keyframes with full CSS text)
- **Transition patterns** — Complete inventory (60+ transition rules from CSS)
- **Button/nav hover states** — Directly observed via hover + computed style diff
- **Delay chains** — Complete extraction from CSS nth-of-type rules (8 nav + 20 character)
- **Breakpoints** — All 15 media query conditions extracted from CSS
- **Section spacing** — All 18 sections measured via computed styles

### Medium Confidence
- **Character gallery layout** — Delays and image dimensions extracted, but absolute positioning coordinates not fully mapped
- **Loading screen sequence** — Keyframes and timings extracted from CSS, but actual loading behavior not observed (page loaded too fast)
- **Footer decorative images** — Background image URLs and sizes extracted from ::before/::after computed styles, but actual tile patterns only visible in screenshots

### Gaps / Not Captured
- **Mobile layout** — Only desktop viewport (1280px) analyzed. Mobile uses extensive `vw` units and different character stagger delays
- **Inner pages** — Only homepage analyzed. NEWS detail, CHARACTER detail, GAME pages may have additional components
- **JavaScript behavior** — No JS files downloaded. Scroll observer implementation is inferred from CSS class patterns (`.anim-sc` → `.animated`)
- **Focus-visible states** — The site does not have custom `:focus-visible` styling
- **Loading screen real-time** — The full loading screen choreography (6s mask wipe) was not observed
- **Canvas particle implementation** — Canvas code not extracted; only CSS transition property captured
- **News category tag** — `.cat` element returned null in computed styles (may be conditionally rendered or differently structured)

---

## 8. Third-Party Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| YakuHanJP | 3.3.1 | Japanese punctuation-optimized font subset |
| Google Fonts | — | Cormorant Infant, Noto Sans JP, Noto Serif JP, Oswald |
| WordPress | — | CMS (custom theme `nine-project`) |
| Slick Slider | — | Carousel (inferred from `.slick-next`, `.slick-prev`, `.slick-dots` selectors in CSS) |
| No animation libraries | — | All motion is pure CSS keyframes + Intersection Observer class toggling |

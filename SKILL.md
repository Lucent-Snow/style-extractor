---
name: style-extractor
description: Extract evidence-based style guides and motion appendices from websites or web apps. Use when Codex needs reusable visual language, semantic tokens, component/state rules, runtime animation evidence, or style references that preserve design signal while stripping product-specific structure and content.
---

# Style Extractor (Web Style + Motion)

Extract a reusable design system from **web UIs**: colors, typography, spacing, components, states, and, when relevant, motion (timings, keyframes, delay chains, JS-driven behavior).

Core principle:
- Extract **visual language and interaction rules**, not the source product's information architecture.
- Keep what is reusable: tokens, component patterns, state changes, layout tendencies, motion cadence.
- Strip what is product-specific: business copy, app logic, navigation tree, feature taxonomy, marketing claims.

## Output location (REQUIRED)

- Save all generated deliverables under: `%USERPROFILE%\\style-extractor\\`
- Never write generated outputs under the skill folder (`.codex/skills/...`)
- Never dump screenshots, CSS, JS, and Markdown side-by-side in the root output directory

Each extraction must create a dedicated project folder:

```text
%USERPROFILE%\style-extractor\
  <project>-<style>\
    guides\
      style-guide.md
      motion-guide.md
      evidence-manifest.md
    evidence\
      screenshots\
      assets\
      notes\
```

Required deliverables for every extraction:
- `%USERPROFILE%\\style-extractor\\<project>-<style>\\guides\\style-guide.md`
- `%USERPROFILE%\\style-extractor\\<project>-<style>\\guides\\evidence-manifest.md`
- `%USERPROFILE%\\style-extractor\\<project>-<style>\\evidence\\`

Required when motion is meaningful:
- `%USERPROFILE%\\style-extractor\\<project>-<style>\\guides\\motion-guide.md`

Subdirectory rules:
- `guides/` only for final Markdown deliverables
- `evidence/screenshots/` only for PNG/JPG/WebP captures
- `evidence/assets/` only for downloaded CSS/JS/SVG/font stylesheets
- `evidence/notes/` only for raw dumps, runtime notes, traces, or helper text files
- Root project folder should contain folders only; no loose screenshots or loose guide files

Use these reference files:
- `references/output-contract.md` — required output structure and anti-patterns
- `references/style-guide-template.md` — required sections for the style guide
- `references/motion-guide-template.md` — required sections for the motion appendix
- `references/evidence-manifest-template.md` — required sections for the evidence manifest

## References (quality bar)

- `references/9nine-visual-novel/` — best-practice **style + motion** reference package
- `references/motherduck-design-system-reference/` — strong **static style** reference package

What to learn from these references:
- keep the document dense enough to feel like a real reference manual
- preserve semantic token tables with representative raw values
- preserve component state matrices with concrete observed values
- preserve copy-paste examples and practical implementation notes when they materially help reuse

What not to copy blindly:
- long generic filler or repeated product intro
- raw-value dumping without semantic grouping
- excessive product-specific branding or IA detail
- sections that exist only to make the document look long, without adding reuse value

## Required reference read-through (MANDATORY)

Before starting any extraction, read in this order:
1) `references/output-contract.md`
2) `references/style-guide-template.md`
3) `references/motion-guide-template.md`
4) `references/evidence-manifest-template.md`
5) all files under `references/9nine-visual-novel/guides/`
6) all files under `references/motherduck-design-system-reference/guides/`

Reference package selection rule:
- motion-heavy, media-heavy, or section-transition-driven source → use `references/9nine-visual-novel/` as the primary quality bar
- static-structure-heavy source → read `references/motherduck-design-system-reference/`

Do not start evidence collection, screenshotting, script execution, or drafting until both reference packages have been reviewed.
Extraction is incomplete if the final deliverable does not explicitly state:
- that both reference packages were reviewed before extraction
- which package was used as the primary quality bar for the current target

---

## Workflow

### Phase 0 — Inputs

1) Project name + style/variant name
2) Sources: URL / web repo / both
3) Motion assessment: does the site have meaningful motion? (determines whether Phase 1B is needed)
4) Reuse target: web app / marketing site / desktop app / design reference only
5) Primary reference package selected: 9nine / MotherDuck

Before gathering evidence, decide which source traits belong in the reusable style and which should be excluded. Use this simple filter:
- Keep: tokens, spacing rhythm, typography hierarchy, density, component language, state treatment, motion cadence
- Adapt carefully: layout primitives, panel structure, navigation patterns, content density
- Discard: product copy, feature-specific flows, brand story, app-specific IA, domain-specific labels

### Phase 0.5 — Read the reference package (REQUIRED)

Complete all of the following before Phase 1A:
- read `references/output-contract.md`
- read `references/style-guide-template.md`
- read `references/motion-guide-template.md`
- read `references/evidence-manifest-template.md`
- read `references/9nine-visual-novel/guides/style-guide.md`
- read `references/9nine-visual-novel/guides/motion-guide.md`
- read `references/9nine-visual-novel/guides/evidence-manifest.md`
- read `references/motherduck-design-system-reference/guides/style-guide.md`
- read `references/motherduck-design-system-reference/guides/motion-guide.md`
- read `references/motherduck-design-system-reference/guides/evidence-manifest.md`
- choose one of the two packages as the primary quality bar for the current extraction

If both packages are not read first, the extraction is invalid.

### Phase 1A — Static evidence gathering

#### Step 1 — Open page & screenshots

Use Chrome MCP tools:
- `new_page` / `select_page` / `navigate_page`
- `take_screenshot` (fullPage when helpful)

Minimum screenshot set:
1) baseline (full page/section)
2) navigation visible + active state
3) primary CTA: default + hover + pressed (if possible)
4) form controls: default + focus-visible (+ invalid if present)
5) modal/dialog open (if any)

#### Step 2 — Extract computed styles

Use `evaluate_script` to pull:
- CSS Variables (`:root` and scoped)
- Colors, typography, spacing from `getComputedStyle`
- Component state matrices (default / hover / active / focus-visible / disabled)

#### Step 3 — Pull CSS/JS bodies

- `list_network_requests` / `get_network_request` to download CSS files
- Useful for extracting `@keyframes`, CSS variables, and media queries offline

Minimum static evidence to keep in `...\\evidence\\`:
- screenshots under `evidence/screenshots/`
- downloaded CSS/JS under `evidence/assets/`
- notes and selector inventories under `evidence/notes/`

---

### Phase 1B — Motion evidence gathering (when site has meaningful motion)

> Static and motion are independent paths. Skip this phase if the site has no meaningful animation.

Follow these steps **in priority order**. Each level captures more; stop when you have enough evidence.

#### Level 1 — @keyframes extraction (no interaction needed)

Paste `scripts/transition-scanner.js`, then call:
```js
__seTransition.keyframes()
```
Returns all `@keyframes` definitions from stylesheets. This is deterministic and complete—no timing issues.

#### Level 2 — CSS transition scan (no interaction needed)

Same script, call:
```js
__seTransition.scan()            // scan entire page
__seTransition.scan('.my-section') // scan specific section
```
Returns every element's `transition-property / duration / easing / delay` + clusters by pattern. This shows **what can animate** even if nothing is animating yet.

#### Level 3 — Interaction diff (requires triggering interactions)

This captures the dominant pattern on modern sites: **JS sets inline style → CSS transition interpolates**.

Paste `scripts/interaction-diff.js`, then:
```js
// 1. Watch elements you care about
__seDiff.watch([
  '[class*="sectionContainer"]',
  '[class*="illustration"]',
  '[class*="navItem"]',
  'button, a[class*="cta"], a[class*="CTA"]'
])

// 2. Trigger interaction and capture diff
__seDiff.triggerAndCapture(
  () => document.querySelector('.nav-item-2').click(),
  { captureAt: 50, settleAt: 500 }
)
```
Returns:
- `diffs` — per-element before/after inline style + computed style changes
- `duringAnimations` — `document.getAnimations()` captured within the 50ms transition window
- `afterAnimations` — what's still running after settle

**Key insight**: `document.getAnimations()` only returns results during active CSS transitions. The capture window is typically <300ms. This script captures within that window automatically.

Repeat for 3+ key interactions (section change, component switch, hover, scroll).

#### Level 4 — JS library extraction

Paste `scripts/library-detect.js` to detect third-party animation libraries.

Returns `{ globals, instances, dom, fingerprints, assets }`.

Key: many modern sites bundle libraries as modules, so `window.Swiper` etc. may be undefined. The script also checks:
- `el.swiper` — Swiper instance on DOM elements (works when bundled)
- `[data-aos-*]` — AOS attributes on elements
- `[data-framer-*]` — Framer Motion attributes
- Asset URL hints (script/stylesheet URLs containing library names)

When instances are found, configs are extracted directly (Swiper params, AOS settings, etc.).

#### Level 5 — rAF sampling (fallback for opaque JS motion)

When the above levels don't capture enough (e.g., hand-written `requestAnimationFrame` loops), use `scripts/motion-tools.js`:
```js
__seMotion.sample('.animated-element', { durationMs: 800, include: ['transform', 'opacity'] })
```
Records computed style values every frame. Useful for inferring duration and property ranges, but cannot capture easing or intent.

#### Level 6 — Performance trace (optional, complex motion)

For very complex orchestrated animations:
- `performance_start_trace` / `performance_stop_trace`
- Analyze via `performance_analyze_insight`

---

### Phase 2 — Abstraction and de-productization (REQUIRED)

Do not write the guide as a product teardown. Convert evidence into reusable rules.

For each major finding, classify it explicitly:
- `Reusable`: can be copied directly as a token, component rule, state rule, or motion primitive
- `Adapted`: useful idea, but needs reshaping for the target product type
- `Discarded`: source-specific structure or content that should not be copied

Examples:
- A cloud-blue surface palette: `Reusable`
- A docs sidebar + article rail layout: `Adapted`
- An AI chat app's prompt-library IA: `Discarded`
- A marketing hero with video background: `Adapted` or `Discarded`, depending on target

### Phase 3 — Semantic tokenization (REQUIRED)

Do not stop at raw values. Convert repeated values into **semantic tokens**:
1) cluster repeated values (colors/radii/durations/easings/shadows)
2) map usage (CTA/text/border/overlay/active/etc.)
3) name by intent (e.g., `--color-accent`, `--motion-300`, `nav.switch.iconColor`)
4) keep evidence alongside tokens (raw values + element/selector/screenshot)

### Phase 4 — Write the deliverables

Start from the reference templates. Do not improvise the top-level structure unless the source clearly requires one.

#### Deliverable A — Style guide (REQUIRED)

Follow `references/style-guide-template.md`.

This file must answer:
- what the style feels like
- which tokens define it
- how components behave across states
- what layout tendencies are reusable
- how to rebuild the visual language without copying the product itself

#### Deliverable B — Motion guide (REQUIRED when dynamic)

Follow `references/motion-guide-template.md`.

This file must answer:
- what moves
- what triggers motion
- durations, delays, easing, and keyframes
- whether motion is CSS-driven, transition-driven, or JS/library-driven
- which motion primitives are reusable in another product

#### Deliverable C — Evidence manifest (REQUIRED)

Follow `references/evidence-manifest-template.md`.

Include:
- source URLs / repo refs / date captured
- screenshot list
- downloaded CSS/JS files or notes
- scripts used
- interactions tested
- gaps, blockers, and confidence notes
- reference package reviewed and which package files were read before extraction

Component state matrix must include at least:
- default / hover / active(pressed) / focus-visible / disabled
- include loading / selected / invalid when those states exist

---

## Scripts reference

| Script | Namespace | Purpose |
|--------|-----------|---------|
| `scripts/transition-scanner.js` | `__seTransition` | Scan CSS transitions + extract @keyframes |
| `scripts/interaction-diff.js` | `__seDiff` | Before/after inline style diff + instant getAnimations |
| `scripts/motion-tools.js` | `__seMotion` | getAnimations snapshot + rAF sampling |
| `scripts/library-detect.js` | (returns directly) | Library detection + instance config extraction |
| `scripts/extract-keyframes.py` | CLI | Offline @keyframes extraction from downloaded CSS files |

---

## Quality checklist

### Static
- [ ] tokens include usage intent (not just lists)
- [ ] examples are copy-pasteable (HTML+CSS)
- [ ] 5+ copy-paste component examples
- [ ] reusable vs adapted vs discarded source traits are called out
- [ ] product-specific IA/copy is stripped from the final guide

### Motion (when dynamic)
- [ ] all @keyframes extracted from stylesheets (Level 1)
- [ ] CSS transition patterns documented with durations/easing (Level 2)
- [ ] 3+ key interactions with before/after diff evidence (Level 3)
- [ ] JS libraries detected and configs extracted when present (Level 4)
- [ ] at least one documented "delay chain" if present
- [ ] motion semantic tokens defined (duration scale + easing scale)

### Self-check (run after completing the guide)
1. Does every color token have a usage mapping? (not just a hex list)
2. Does every component have a state matrix with actual computed values?
3. Can someone reproduce the motion from the documentation alone?
4. Are all copy-paste examples self-contained (HTML + CSS in one block)?
5. If the original product disappeared, would this guide still be useful as a design reference?
6. Did the guide extract style without accidentally cloning the source product's information model?

### Failure conditions

Do not consider the extraction complete if any of the following are true:
- output is only one prose-heavy markdown file with no evidence manifest
- tokens are raw lists without semantic naming or usage mapping
- the document describes the source product more than the reusable style
- dynamic sites have no motion appendix despite meaningful motion
- examples cannot be implemented directly
- screenshots and downloaded assets are dumped loose in the project root instead of grouped into subfolders

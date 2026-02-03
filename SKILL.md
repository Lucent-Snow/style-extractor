---
name: style-extractor
description: Extract evidence-based web UI style + motion guides (Markdown, optional HTML prototype).
---

# Style Extractor (Web Style + Motion)

This skill extracts a reusable design system from **web UIs**: colors, typography, spacing, components, and—when the UI is dynamic—motion (runtime timings, keyframes, delay chains).

## Output location (REQUIRED)

- Save all generated deliverables under: `%USERPROFILE%\\style-extractor\\`
- Never write generated outputs under the skill folder (`.codex/skills/...`)

Recommended structure:
- `...\\<project>-<style>-style.md`
- `...\\<project>-<style>-evidence\\` (screenshots / css / js / motion / traces)

## References (quality bar)

- `references/endfield-design-system-style.md` — best-practice **style + motion** reference
- `references/motherduck-design-system-style.md` — strong **static style** reference

---

## Workflow

### Phase 0 — Inputs

1) Project name + style/variant name  
2) Sources: URL / web repo / both  
3) Motion importance: if meaningful motion exists, Strategy A2/A3 is required

### Phase 1 — Evidence gathering (do this first)

#### Strategy A — Live website (Chrome MCP)

Use:
- `new_page` / `select_page` / `navigate_page`
- `take_screenshot` (fullPage when helpful)
- `evaluate_script`
- `list_network_requests` / `get_network_request` (pull CSS/JS bodies when possible)
- `performance_start_trace` / `performance_stop_trace` (optional for complex motion)

#### Strategy A1.5 — Screenshot-assisted evidence (HIGHLY RECOMMENDED)

Screenshots don’t replace computed styles, but they improve:
- semantic intent (primary vs secondary vs disabled)
- gated/hard-to-freeze states (login, region locks, scroll-only reveals)
- visual-only details (textures, subtle gradients, composition)

Minimum screenshot set:
1) baseline (full page/section)
2) navigation visible + active state
3) primary CTA: default + hover + pressed (if possible)
4) form controls: default + focus-visible (+ invalid if present)
5) modal/dialog open (if any)
6) motion sequence (2–4 shots): ~0ms / ~120ms / ~300–600ms after trigger

#### Strategy A2 — Runtime motion evidence (REQUIRED for dynamic sites)

Computed styles alone won’t reconstruct timing quality. Capture runtime motion via:
- `document.getAnimations({ subtree: true })`
- per animation: `duration/delay/fill/iterations/easing` + moved properties (`opacity/transform/color/...`)
- when possible: full keyframes via `animation.effect.getKeyframes()`

Minimum capture loop:
1) baseline snapshot
2) trigger interaction (click/scroll/hover/focus)
3) snapshots at `t0`, `t80–120ms`, `t300–600ms`

Reusable snippets (paste into `evaluate_script`):
- `scripts/motion-tools.js`
- `scripts/library-detect.js`
- `scripts/extract-keyframes.py` (offline keyframes extraction from downloaded `.css`)

#### Strategy A3 — JS-driven motion / third-party libs (IMPORTANT)

If motion is JS-driven (e.g., Swiper/carousels), `document.getAnimations()` may miss the main movement.

Detect via:
- DOM/CSS fingerprints (`.swiper-wrapper/.swiper-slide`, `--swiper-theme-color`)
- asset hints (script/style URLs containing `swiper/gsap/lottie/three`)
- globals (`window.Swiper`, `window.gsap`, ...)

Fallback evidence:
- per-frame sampling (rAF loop ~700–900ms): `transform/opacity/...`
- or a Performance trace

### Phase 2 — Semantic tokenization (REQUIRED)

Do not stop at raw values. Convert repeated values into **semantic tokens**:
1) cluster repeated values (colors/radii/durations/easings/shadows)
2) map usage (CTA/text/border/overlay/active/etc.)
3) name by intent (e.g., `--color-accent`, `--motion-300`, `nav.switch.iconColor`)
4) keep evidence alongside tokens (raw values + element/selector/screenshot)

### Phase 3 — Write the style guide (recommended sections)

Minimum recommended sections:
1) Overview
2) Design philosophy (evidence-based)
3) Semantic tokens (colors + motion)
4) Color palette + usage mapping
5) Typography scale
6) Spacing scale
7) Components (with state matrix)
8) Motion (runtime evidence + full `@keyframes` + delay chains + JS-driven notes)
9) Layering (z-index/overlays)
10) Responsive behavior (breakpoints + degradation)
11) Copy-paste examples (5+)

Component state matrix must include at least:
- default / hover / active(pressed) / focus-visible / disabled (loading if present)

## Quality checklist

Static:
- tokens include usage intent (not just lists)
- examples are copy-pasteable (HTML+CSS)

Motion (when dynamic):
- 3+ key interactions with `document.getAnimations()` evidence
- full `@keyframes` blocks for important animations
- at least one documented “delay chain” if present
- JS-driven motion: detection proof + sampling/trace evidence


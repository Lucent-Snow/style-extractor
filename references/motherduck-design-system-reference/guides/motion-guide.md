# MotherDuck Design System — Motion Guide

> **Source:** https://motherduck.com/
> **Date captured:** 2026-03-13
> **Motion complexity:** Low-moderate — CSS transitions + styled-components keyframes + scroll-triggered transforms

---

## 1. Motion Personality

**Snappy, functional, restrained.** Motion on MotherDuck serves utility, not spectacle. Transitions are fast (0.12s–0.3s), easing is standard, and there are no cinematic entrance sequences. The dominant motion pattern is the retro offset shadow hover — buttons translate to reveal a shadow underneath, creating a satisfying "click me" affordance.

**Key motion adjectives (evidence-grounded):**
- **Snappy** — `0.12s ease-in-out` is the dominant button transition, faster than typical web standards
- **Functional** — motion signals interactivity (hover, focus, state change), not decoration
- **Restrained** — no scroll-triggered entrance animations on the main content
- **Consistent** — the same `0.12s ease-in-out` pattern applies to all button variants
- **Scroll-driven** — some sections use `transform 1s, opacity 1s` for scroll-triggered reveals

---

## 2. Duration Scale

| Token | Value | Observed usage |
|---|---|---|
| `--duration-snap` | `30ms` | Active/press state transitions |
| `--duration-fast` | `0.12s` | **Dominant duration** — all button hover transitions |
| `--duration-base` | `0.15s` | Input focus, SVG icon transforms, opacity fades |
| `--duration-ui` | `0.2s` | Border, background, height, opacity state changes |
| `--duration-state` | `0.3s` | Persona badge color swap, nav menu, persona card scale, scroll-triggered transforms |
| `--duration-reveal` | `0.4s` | Section opacity reveals, card entrance fades |
| `--duration-entrance` | `0.5s` | Opacity fade-in with delay |
| `--duration-scroll` | `1s` | Scroll-triggered section transforms + opacity |

**Dominant duration: `0.12s`** — used for all button hover transitions. This is notably faster than the typical `0.2–0.3s` web standard, giving the site a tool-like responsiveness.

---

## 3. Easing Scale

| Token | Value | Observed usage |
|---|---|---|
| `--ease-default` | `ease-in-out` | Buttons, inputs, most UI transitions |
| `--ease-reveal` | `ease-out` | Opacity reveals, section entrances |
| `--ease-entrance` | `ease-in` | Fade-out animations |
| `--ease-spring` | `linear(0 0%, ... 1.003 65.1%, 1 100%)` | Spring-like scroll transform (custom linear easing with overshoot) |

The custom `linear()` easing function creates a spring-like overshoot effect — the element slightly overshoots its target position (peaks at `1.003`) before settling. Used for scroll-triggered card transforms.

---

## 4. Transition Patterns

### 4.1 Button Hover — Retro Offset Lift

```css
transition: transform 0.12s ease-in-out;
```

On hover, buttons translate `translate(7px, -7px)` to reveal a charcoal offset shadow underneath. This is the site's signature interaction.

**Elements using this pattern:**
- "TRY 7 DAYS FREE" (primary CTA)
- "BOOK A DEMO" (secondary CTA)
- "START FREE" (nav CTA)
- "SUBMIT" buttons
- All button variants with `2px solid` borders

### 4.2 Active/Press State

```css
transition: transform 30ms ease-in-out;
```

On `:active`, the transition shortens to `30ms` for immediate press feedback. The button snaps back faster than it lifts.

### 4.3 Persona Badge State Change

```css
transition: background-color 0.3s, color 0.3s;
```

When a persona tab is selected, the badge smoothly inverts from colored-background/dark-text to dark-background/white-text.

### 4.4 Persona Card Scale

```css
transition: transform 0.3s;
```

Persona cards start at `scale(0.9)` and grow to `scale(1)` on hover/interaction.

### 4.5 Input Focus

```css
/* Chat input */
transition: box-shadow 0.15s;

/* Form input */
transition: 0.2s ease-in-out, padding;
```

### 4.6 Section Scroll Reveal

```css
transition: transform 1s, opacity 1s;
```

Combined transform + opacity transition triggered by scroll position. The `1s` duration creates a gentle reveal.

### 4.7 Spring Scroll Transform

```css
transition: transform 1s linear(0 0%, 0.006 1.15%, 0.022 2.3%, 0.091 5.1%,
  0.18 7.6%, 0.508 16.3%, 0.607 19.325%, 0.691 22.35%, 0.762 25.375%,
  0.822 28.4%, 0.872 31.75%, 0.912 35.1%, 0.944 38.9%, 0.968 43%,
  0.985 47.6%, 0.996 53.1%, 1.001 58.4%, 1.003 65.1%, 1 100%);
```

Custom `linear()` easing with spring-like overshoot for scroll-triggered card transforms.

### 4.8 Opacity Fade Scale

```css
/* Fast UI fade */
transition: opacity 0.15s ease-in-out;

/* Medium reveal */
transition: opacity 0.2s ease-in-out;

/* Section reveal */
transition: opacity 0.3s ease-out;

/* Slow entrance */
transition: opacity 0.4s ease-out;
```

### 4.9 Height/Collapse

```css
transition: height 0.15s ease-in-out;
transition: height 0.2s ease-in-out, margin-top 0.2s ease-in-out;
transition: max-height 1s ease-in;
```

### 4.10 SVG Icon Transform

```css
/* Arrow rotation */
transition: transform 0.2s ease-in-out;

/* Icon path morph */
transition: 100ms ease-in-out; /* on path elements */
```

### 4.11 Nav/Dropdown

```css
/* Dropdown border reveal */
transition: border-bottom 0.2s ease-in-out, background-color 0.2s ease-in-out;

/* Dropdown content */
transition: right 0.2s ease-in-out, opacity 0.5s ease-in-out;
```

---

## 5. @keyframes Inventory

### 5.1 Site-Owned Keyframes

#### `hCmOrq` — Fade Up (Toast/Notification Enter)

```css
@keyframes hCmOrq {
  0%   { transform: translateY(1rem); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
```

**Binding:** `200ms ease-out forwards`

#### `iBNjHa` — Fade Down (Toast/Notification Exit)

```css
@keyframes iBNjHa {
  0%   { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(1rem); opacity: 0; }
}
```

**Binding:** `200ms ease-in-out forwards`

#### `idkxa` — Scale Up (Tooltip/Popover Enter)

```css
@keyframes idkxa {
  0%    { opacity: 0; transform: translateY(calc(-50% + 1px)) scale(0.8); }
  49.9% { opacity: 0; }
  50%   { opacity: 1; }
  100%  { opacity: 1; transform: translateY(calc(-50% + 1px)) scale(1); }
}
```

Two-phase animation: invisible scale-up in the first half, then snap to visible and continue scaling.

#### `jLKMiS` — Scale Down (Tooltip/Popover Exit)

Reverse of `idkxa` — scales from 1 to 0.8 while fading out.

### 5.2 Third-Party Keyframes (Toastify — Discarded)

22 Toastify keyframes are present (bounce, zoom, flip, slide variants in all directions). These are from the `react-toastify` library and are **not part of the design system**. Also present: `swiper-preloader-spin` from Swiper.

---

## 6. Complete Transition Inventory

41 transition rules extracted from CSS. Grouped by pattern:

| Pattern | Count | Representative selectors |
|---|---|---|
| `transform 0.12s ease-in-out` | ~8 | `.hYweFU`, `.kIgTrP`, `.fQiulQ` (button variants) |
| `transform 30ms ease-in-out` | ~3 | `.hYweFU:active`, `.kIgTrP:active` (press states) |
| `transform 0.2s ease-in-out` | ~3 | `.hAfsSP`, `.lmjJiJ` (icon/arrow transforms) |
| `transform 0.3s` | ~3 | `.fAbQfd`, `.comCta`, `.fzXPOx` (card/persona scale) |
| `opacity 0.Xs ease-*` | ~6 | Various opacity fades (0.15s–0.4s) |
| `height/margin 0.Xs` | ~3 | `.dmzMdf`, `.hNJpCO` (collapse/expand) |
| `background-color 0.3s, color 0.3s` | 1 | `.dqBFzp` (persona badge swap) |
| `border-bottom 0.2s, bg 0.2s` | 1 | `.boOfwU` (nav dropdown) |
| `box-shadow 0.15s` | 1 | `.hCMCpH` (input focus) |
| `transform 1s, opacity 1s` | 1 | `.bLJbyM` (scroll reveal) |
| Spring `linear()` 1s | 1 | `.go1656994552` (scroll card) |
| `max-height 1s ease-in` | 1 | `.go3128134379` (large collapse) |

---

## 7. Motion Primitives (Reusable)

| Primitive | Duration | Easing | Trigger | Copy-paste ready |
|---|---|---|---|---|
| Button retro lift | `0.12s` | `ease-in-out` | Hover | Yes |
| Button press snap | `30ms` | `ease-in-out` | Active | Yes |
| Badge color swap | `0.3s` | default | State change | Yes |
| Card scale | `0.3s` | default | Hover | Yes |
| Input focus | `0.15s` | default | Focus | Yes |
| Opacity fade (UI) | `0.15s–0.2s` | `ease-in-out` | State change | Yes |
| Opacity fade (reveal) | `0.3s–0.4s` | `ease-out` | Scroll | Yes |
| Section scroll reveal | `1s` | `ease-out` or spring | Scroll | Yes |
| Height collapse | `0.15s–0.2s` | `ease-in-out` | Toggle | Yes |
| Toast enter | `200ms` | `ease-out` | Notification | Pattern |
| Toast exit | `200ms` | `ease-in-out` | Notification | Pattern |

---

## 8. Motion Classification

| Source Motion | Classification | Notes |
|---|---|---|
| `0.12s` button retro lift | **Reusable** | Signature interaction; works for any bordered button system |
| `30ms` active press | **Reusable** | Snappy press feedback; pair with any hover lift |
| Badge color swap `0.3s` | **Reusable** | Clean tab/toggle state transition |
| Card scale `0.3s` | **Reusable** | Subtle hover affordance |
| Input focus transitions | **Reusable** | Standard form interaction |
| Section scroll reveal `1s` | **Reusable** | Gentle content entrance |
| Spring `linear()` easing | **Adapted** | Custom easing; concept reusable, exact curve is site-specific |
| Toastify animations | **Discarded** | Third-party library, not part of design system |
| Tooltip scale animation | **Adapted** | Two-phase opacity+scale; pattern reusable |
| Nav dropdown transitions | **Reusable** | Border + background reveal on hover |

---

## 9. Implementation Notes

- **Motion should stay subordinate to typography and borders.** This is a static-heavy system where motion serves utility, not personality.
- **The `0.12s` duration is intentionally fast.** Don't slow it down to `0.2s` — the snappiness is part of the tool-like feel.
- **The `30ms` active state is key.** It creates a satisfying "click" feel by making the press response nearly instant.
- **No `prefers-reduced-motion` handling observed.** If reusing this system, add `@media (prefers-reduced-motion: reduce)` to disable transforms and reduce transitions to opacity-only.
- **The spring `linear()` easing is a modern CSS feature.** Check browser support if targeting older browsers. Fallback: `ease-out`.

# 9-nine- Visual Novel Portal — Motion Guide

> **Source:** https://9-nine-project.com/
> **Date captured:** 2026-03-13
> **Motion complexity:** Moderate — CSS keyframes + scroll-triggered class toggling + canvas particles

---

## 1. Motion Personality

**Gentle, choreographed reveals.** Motion is used to create a sense of pages gracefully unfolding — elements fade in, slide upward, or blur-to-sharp as the user scrolls. The overall tempo is unhurried (0.4s–2s), with staggered delays that create a cascading "one after another" entrance feel. There is no jarring or rapid motion anywhere.

**Key motion adjectives (evidence-grounded):**
- **Graceful** — `fade-up` keyframe uses only 20px translateY, not dramatic slides
- **Staggered** — nav items enter with 0.1s step delays; characters with 0.05s steps
- **Crystalline** — blur-to-sharp hero reveal (`filter: blur(10px) → blur(0)`)
- **Scroll-triggered** — all content animations fire via Intersection Observer class toggling
- **Desktop-only hover** — all `transition: 0.4s` rules are inside `min-width: 768px` media queries

---

## 2. Duration Scale

| Token | Value | Observed usage |
|-------|-------|----------------|
| `--duration-instant` | `0.2s` | Canvas particle opacity |
| `--duration-fast` | `0.3s` | Loading inner reveal |
| `--duration-base` | `0.4s` | **Dominant duration** — buttons, links, nav, body opacity, fade-up (menu), all hover transitions |
| `--duration-loading-transition` | `0.4s + 0.2s delay` | Loading screen opacity fade (with delay) |
| `--duration-nav-open` | `0.5s` | Fixed nav container opacity |
| `--duration-nav-stagger` | `0.8s` | Header nav item entrance animation |
| `--duration-content` | `1s` | Scroll-triggered fade-up, opacity reveals, character image entrance |
| `--duration-hero` | `1s + 0.2s delay` | Hero blur-to-sharp reveal |
| `--duration-logo` | `1s` | Header logo container transform |
| `--duration-svg` | `2s` | SVG stroke drawing animation |
| `--duration-loading-mask` | `6s` | Loading screen mask wipe (long, cinematic) |

**Dominant duration: `0.4s`** — used for nearly all hover transitions, UI state changes, and menu animations. This is significantly slower than modern web standards (typically 0.15–0.25s), creating a deliberate, unhurried feel.

---

## 3. Easing Scale

| Token | Value | Observed usage |
|-------|-------|----------------|
| `--ease-default` | `ease-out` | Scroll-triggered fade/fade-up, hero blur reveal, SVG stroke draw |
| `--ease-nav` | `ease` | Header nav stagger entrance, character image entrance, header-line |
| `--ease-loading` | `ease-in-out` | Loading screen transitions, menu open fade-up |
| `--ease-loading-mask` | `linear` | Loading mask wipe (constant speed) |
| `--ease-share` | `linear` | Share button wiggle |

---

## 4. @keyframes Inventory

### 4.1 `load-opacity` — Simple Fade In
```css
@keyframes load-opacity {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
```
**Bindings:**
- `.anim-sc.animFade.animated` → `1s ease-out forwards` (scroll-triggered content)
- `.anim-ld.animFade.animated` → `1s ease-out forwards` (load-triggered content)
- `.st-Loading::before`, `::after`, `_Inner` → `0.4s ease-in-out forwards` (loading screen)

### 4.2 `fade-up` — Fade In + Slide Up
```css
@keyframes fade-up {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
```
**Bindings:**
- `.anim-sc.animFadeup.animated` → `1s ease-out forwards` (scroll-triggered content)
- `.st-Header_Fixed_Inner nav.open .logo, .menu, .official` → `0.4s ease-in-out forwards` (menu open)

### 4.3 `load-blur` — Blur to Sharp
```css
@keyframes load-blur {
  0%   { filter: blur(10px); }
  100% { filter: blur(0); }
}
```
**Binding:** `.idx-Mainvisual_Inner .wrap.animated` → `1s ease-out 0.2s forwards` (hero image starts heavily blurred and sharpens after 0.2s delay)

### 4.4 `svg-stroke` — SVG Line Draw
```css
@keyframes svg-stroke {
  0%   { stroke-dashoffset: 1000px; }
  100% { stroke-dashoffset: 0; }
}
```
**Binding:** `svg.anim-sc.animated` → `2s ease-out forwards` (decorative SVG elements "draw themselves" on scroll)

### 4.5 `header-nav` — Nav Item Entrance (Fade Up, Smaller)
```css
@keyframes header-nav {
  0%   { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
```
**Bindings:**
- `.st-Header_Static.animated li` → `0.8s ease forwards` (with staggered delays per item)
- `.idx-Character_Inner .wrap.animated .chara-image li img` → `1s ease forwards` (character images reuse this keyframe)

### 4.6 `header-line` — Nav Underline Grow
```css
@keyframes header-line {
  0%   { top: 0; height: 0; }
  100% { top: 0; height: 42px; }
}
```
**Binding:** `.st-Header_Static.animated li a.current::before` → `0.5s ease 0.8s forwards` (current page underline grows after nav items settle)

### 4.7 `chara-shadow` — Character Drop Shadow Slide
```css
@keyframes chara-shadow {
  0%   { filter: drop-shadow(rgba(0, 71, 136, 0.1) 0 0 0); }
  100% { filter: drop-shadow(rgba(0, 71, 136, 0.1) 20px 0 0); }
}
```
**Binding:** Character portrait images — a blue-tinted shadow slides 20px to the right, creating depth.

### 4.8 `load-fade` / `load-fade-sp` — Loading Mask Wipe
```css
@keyframes load-fade {
  0%   { -webkit-mask-position-y: 0; }
  100% { -webkit-mask-position-y: -500px; }
}
```
**Binding:** `.st-Loading_Inner::after` → `6s linear forwards` (PC) / `load-fade-sp` variant for mobile

### 4.9 `post-share` — Share Button Wiggle
```css
@keyframes post-share {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
}
```
**Binding:** `.sw-Share ul li a:hover` → `0.4s linear forwards` (desktop only — attention-drawing wiggle)

### 4.10 `rotate-y` / `rotate-x` — Continuous Rotation
```css
@keyframes rotate-y {
  0%   { transform: translateY(-50%) rotate(0deg); }
  100% { transform: translateY(-50%) rotate(360deg); }
}
@keyframes rotate-x {
  0%   { transform: translateX(-50%) rotate(0deg); }
  100% { transform: translateX(-50%) rotate(360deg); }
}
```
**Binding:** Decorative spinning geometric ornaments (likely diamond shapes).

---

## 5. Transition Patterns

### 5.1 Universal Hover Transition
```css
transition: 0.4s;
```
Applied to nearly all interactive elements, but **only on desktop** (`min-width: 768px`). This creates a consistent, unhurried feel across all hover states.

**Elements using this pattern (60+ selectors observed):**
- `.sw-Button` + `::before` + `::after`
- `.st-Header_Static nav ul li a::before` (underline)
- `.st-Footer_Inner nav ul li a::before`
- `.sw-Breadcrumb ul li a`
- `.sw-Pagination ul li a`
- `.sw-Body a` and `a img`
- `.sw-Share ul li a` and `a img`
- `.sw-Modal` and `.sw-Modal_Close span`
- `.idx-News_Inner .wrap ul li a .thumb::before` (overlay)
- `.idx-Channel_Inner .wrap .item ul li a .thumb img`
- `.idx-Character_Inner .wrap .chara-image li` and `li img`
- `.idx-Character_Inner .wrap .chara-button li a` and `::before`
- `.idx-Special_Inner .wrap ul li a::before`, `::after`, `.thumb::before`
- `.idx-Official_Inner .wrap ul li a`
- `.st-Header_Fixed_Inner .hamburger button` + `::before` + `::after`
- `.st-Header_Fixed_Inner nav .logo, .menu, .official`
- `.st-Footer_Inner .middle .logo a`, `.share ul li a::before`, `.share ul li a img`
- `.st-Footer_Inner .official ul li a`, `.bottom a`
- `.st-Pagetop a::before`, `a::after`

### 5.2 Transform Transitions (0.4s)
```css
transition: transform 0.4s, -webkit-transform 0.4s;
```
Used for image zoom effects:
- `.idx-Pickup_Inner .wrap ul li a img` — carousel image zoom
- `.idx-News_Inner .wrap ul li a .thumb img` — news thumbnail zoom
- `.idx-Goods_Inner .wrap ul li a img` — goods image zoom
- `.idx-Special_Inner .wrap ul li a .thumb img` — special thumbnail zoom

### 5.3 Header Logo Transform (Layered Timing)
```css
.st-Header_Fixed_Inner .logos {
  transition: transform 1s;           /* container: slow */
}
.st-Header_Fixed_Inner .logos .logo {
  transition: transform 0.4s;         /* logo image: fast */
}
.st-Header_Fixed_Inner .logos .text {
  transition: opacity 0.4s;           /* text: fast fade */
}
```
The header logo area uses a slower 1s transform for the container and 0.4s for individual items — creating a layered, slightly delayed feel when the fixed header transforms.

### 5.4 Nav Menu Open
```css
.st-Header_Fixed_Inner nav {
  transition: opacity 0.5s;           /* container fades in */
}
.st-Header_Fixed_Inner nav .logo,
.st-Header_Fixed_Inner nav .menu,
.st-Header_Fixed_Inner nav .official {
  transition: 0.4s;                   /* items ready for transition */
}
/* Open state uses fade-up keyframe */
.st-Header_Fixed_Inner nav.open .logo,
.st-Header_Fixed_Inner nav.open .menu,
.st-Header_Fixed_Inner nav.open .official {
  animation: fade-up 0.4s ease-in-out forwards;
}
```

### 5.5 Specific Property Transitions
```css
/* Nav menu underline width */
.st-Header_Fixed_Inner nav .menu li a::before {
  transition: width 0.4s;
}
/* Official link icon transform */
.st-Header_Fixed_Inner > .official ul li a::before {
  transition: transform 0.4s;
}
/* News title color */
.idx-News_Inner .wrap ul li a .title {
  transition: color 0.4s;
}
/* Tab dot opacity */
.idx-Pickup_Inner #slider-nav_dots .slick-dots li button {
  transition: opacity 0.4s;
}
/* Body opacity (page load) */
body { transition: opacity 0.4s; }
/* Loading screen */
.st-Loading { transition: opacity 0.4s 0.2s; }  /* 0.2s delay */
```

---

## 6. Delay Chains

### 6.1 Header Nav Stagger (Page Load)

Nav items enter sequentially on page load with `header-nav 0.8s ease forwards`:

| Item | Delay | Cumulative |
|------|-------|------------|
| 1st (HOME) | `0.1s` | 0.1s |
| 2nd (NEWS) | `0.2s` | 0.2s |
| 3rd (ABOUT) | `0.3s` | 0.3s |
| 4th (GAME) | `0.4s` | 0.4s |
| 5th (ANIME) | `0.5s` | 0.5s |
| 6th (CHARACTER) | `0.6s` | 0.6s |
| 7th (GOODS) | `0.7s` | 0.7s |
| 8th (SPECIAL) | `0.8s` | 0.8s |

**Step: 0.1s** — linear stagger, left to right.

### 6.2 Character Gallery Stagger (Scroll-Triggered)

Character portraits enter with staggered delays using `header-nav 1s ease forwards`. The stagger is **not linear** — it's grouped by visual depth:

**Desktop (min-width: 768px):**

| Position | Character | Delay | Visual layer |
|----------|-----------|-------|-------------|
| 1st | Front-left | `0.3s` | Foreground |
| 2nd | Front-center-left | `0.35s` | Foreground |
| 3rd | Front-center | `0.4s` | Foreground |
| 4th | Front-center-right | `0.45s` | Foreground |
| 5th | Front-right | `0.5s` | Foreground |
| 6th | Back-left | `50ms` | **Background (enters first)** |
| 7th | Back-center-left | `0.1s` | Background |
| 8th | Back-center | `0.15s` | Background |
| 9th | Back-center-right | `0.2s` | Background |
| 10th | Back-right | `0.25s` | Background |

**Key insight:** Background characters (6th–10th) enter **before** foreground characters (1st–5th), creating a depth-perception effect where the back row appears first and the front row cascades in on top.

### 6.3 Hero Entrance Choreography

```
body opacity: 0.4s (immediate)
 └── hero blur: 1s ease-out (0.2s delay)
      └── nav items: 0.8s each (0.1s stagger starting at 0.1s)
           └── current nav underline: 0.5s ease (0.8s delay — after nav settles)
```

Total entrance sequence: ~1.3s from page load to fully settled state.

---

## 7. Scroll-Triggered Animation System

The site uses a **class-toggling scroll observer** pattern (no third-party library):

```
.anim-sc          → element is scroll-observable (starts invisible)
.animFade         → will use load-opacity keyframe
.animFadeup       → will use fade-up keyframe
.animated         → class added when element enters viewport
```

```css
/* Before scroll trigger: invisible */
.anim-sc {
  opacity: 0;
}

/* After scroll trigger: animate in */
.anim-sc.animFade.animated {
  animation: load-opacity 1s ease-out forwards;
}
.anim-sc.animFadeup.animated {
  animation: fade-up 1s ease-out forwards;
}

/* SVG variant */
svg.anim-sc.animated {
  animation: svg-stroke 2s ease-out forwards;
}
```

This is a lightweight alternative to AOS — an Intersection Observer adds `.animated` class, CSS handles the rest. No JavaScript animation runtime needed.

**Load-triggered variant:** `.anim-ld` uses the same keyframes but triggers on page load instead of scroll.

---

## 8. Canvas Particle System

The hero section includes `<canvas id="particles">` with floating particle specs creating a magical/crystalline atmosphere. CSS transition `0.2s` is applied for opacity fading. The canvas implementation is JavaScript-driven (not extracted — would require JS file download).

---

## 9. Motion Primitives (Reusable)

| Primitive | Keyframe | Duration | Easing | Trigger | Copy-paste ready |
|-----------|----------|----------|--------|---------|-----------------|
| Fade in | `load-opacity` | 0.4s–1s | ease-out / ease-in-out | Scroll / load | Yes |
| Fade up | `fade-up` | 0.4s–1s | ease-out / ease-in-out | Scroll / menu open | Yes |
| Blur reveal | `load-blur` | 1s | ease-out | Page load (hero) | Yes |
| Line draw | `svg-stroke` | 2s | ease-out | Scroll | Yes |
| Shadow slide | `chara-shadow` | — | — | Scroll (character) | Yes |
| Underline grow | `header-line` | 0.5s | ease | Page load (nav) | Yes |
| Hover transition | CSS transition | 0.4s | default | Hover (desktop) | Yes |
| Stagger chain | delay increment | 0.1s step (nav) / 0.05s step (chars) | — | Load / scroll | Pattern |
| Wiggle | `post-share` | 0.4s | linear | Hover | Yes |
| Continuous spin | `rotate-y` / `rotate-x` | infinite | — | Always | Yes |

---

## 10. Motion Classification

| Source Motion | Classification | Notes |
|--------------|---------------|-------|
| 0.4s universal hover transition | **Reusable** | Clean, consistent feel; swap duration to taste |
| Fade-up scroll reveal (20px translateY) | **Reusable** | Standard modern pattern |
| Blur-to-sharp hero reveal | **Reusable** | Elegant loading effect; works for any hero |
| SVG stroke draw | **Reusable** | Works for any decorative line art |
| Nav stagger delays (0.1s step) | **Reusable** | Copy the step pattern for any sequential entrance |
| Nav underline grow animation | **Reusable** | Elegant active-state indicator |
| Share button wiggle | **Reusable** | Simple attention draw |
| Scroll-triggered class-toggle system | **Reusable** | Lightweight AOS alternative |
| Character depth-stagger (back-first) | **Adapted** | Gallery-specific but depth concept is reusable |
| Canvas particles | **Adapted** | Mood-specific; concept reusable for atmospheric effects |
| Loading mask wipe (6s) | **Adapted** | Technique reusable; timing is site-specific |
| Continuous rotation ornaments | **Adapted** | Decorative; concept reusable |


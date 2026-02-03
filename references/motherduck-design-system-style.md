# MotherDuck Design System – Style Guide

**Project**: MotherDuck
**Description**: Ducking Simple Data Warehouse based on DuckDB
**URL**: https://motherduck.com/
**Generated**: 2026-01-24

---

## Table of Contents
1. [Overview](#overview)
2. [Design Philosophy](#design-philosophy)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Spacing System](#spacing-system)
6. [Component Styles](#component-styles)
7. [Shadows & Elevation](#shadows--elevation)
8. [Animations & Transitions](#animations--transitions)
9. [Border Styles](#border-styles)
10. [Border Radius](#border-radius)
11. [Opacity & Transparency](#opacity--transparency)
12. [Z-Index Layers](#z-index-layers)
13. [Responsive Breakpoints](#responsive-breakpoints)
14. [CSS Variables](#css-variables)
15. [Layout Patterns](#layout-patterns)
16. [Example Component Reference](#example-component-reference)

---

## 1. Overview

MotherDuck's design system embodies a clean, modern aesthetic with a playful duck-themed brand identity. The design combines professional data analytics tools with approachable, friendly visuals through bright accent colors and distinctive typography.

**Key Characteristics:**
- Monospace typography (Aeonik Mono) for technical authenticity
- High-contrast color palette with vibrant accent colors
- Minimal shadows and flat design elements
- Consistent 2px border radius across components
- Generous whitespace and breathing room

---

## 2. Design Philosophy

**Principles:**
- **Technical yet Approachable**: Monospace fonts establish technical credibility while bright colors maintain accessibility
- **Data-First**: Clean layouts prioritize content and data visualization
- **Playful Professionalism**: Duck-themed branding adds personality without sacrificing authority
- **Clarity**: High contrast ratios and clear hierarchy ensure readability
- **Consistency**: Systematic use of spacing, colors, and typography across all touchpoints

---

## 3. Color Palette

### Brand Colors

**Primary Yellow (Duck Yellow)**
- Hex: `#FFDE00` / `#F9EE3E`
- RGB: `rgb(255, 222, 0)` / `rgb(249, 238, 62)`
- Usage: Primary CTAs, brand accents, highlights

**Secondary Teal**
- RGB: `rgb(83, 219, 201)` / `#53DBC9`
- Usage: Secondary accents, success states

**Tertiary Blue**
- RGB: `rgb(111, 194, 255)` / `#6FC2FF`
- Usage: Links, informational elements

### Neutral Colors

**Primary Text**
- Charcoal: `rgb(56, 56, 56)` / `#383838`
- Black: `rgb(0, 0, 0)` / `#000000`

**Secondary Text**
- Gray: `rgb(161, 161, 161)` / `#A1A1A1`

**Backgrounds**
- Cream: `rgb(244, 239, 234)` / `#F4EFEA`
- Off-White: `rgb(248, 248, 247)` / `#F8F8F7`
- Pure White: `rgb(255, 255, 255)` / `#FFFFFF`

### Semantic Colors

**Success**
- Light Green BG: `rgb(232, 245, 233)` / `#E8F5E9`
- Green: `#07bc0c`

**Info**
- Light Blue BG: `rgb(234, 240, 255)` / `#EAEAFF` / `rgb(235, 249, 255)` / `#EBF9FF`
- Blue: `#3498db`

**Warning**
- Light Yellow BG: `rgb(249, 251, 231)` / `#F9FBE7` / `rgb(255, 253, 231)` / `#FFFDE7`
- Yellow: `#f1c40f`

**Error**
- Light Red BG: `rgb(255, 235, 233)` / `#FFEBE9`
- Red: `#e74c3c`

### Extended Palette

**Accent Colors for Data Visualization**
- Pink: `rgb(243, 142, 132)` / `#F38E84`
- Orange: `rgb(245, 177, 97)` / `#F5B161` / `rgb(253, 237, 218)` / `#FDEDD A`
- Yellow-Green: `rgb(179, 196, 25)` / `#B3C419`
- Gold: `rgb(225, 196, 39)` / `#E1C427`
- Purple: `rgb(178, 145, 222)` / `#B291DE` / `rgb(247, 241, 255)` / `#F7F1FF`
- Slate Blue: `rgb(132, 166, 188)` / `#84A6BC`
- Royal Blue: `rgb(117, 151, 238)` / `#7597EE`
- Teal: `rgb(56, 193, 176)` / `#38C1B0`
- Sky Blue: `rgb(84, 180, 222)` / `#54B4DE`

### Color Usage Guidelines

```css
/* Primary Actions */
.primary-button {
  background-color: rgb(255, 222, 0);
  color: rgb(56, 56, 56);
}

/* Secondary Actions */
.secondary-button {
  background-color: rgb(248, 248, 247);
  color: rgb(161, 161, 161);
  border: 2px solid rgb(161, 161, 161);
}

/* Text Hierarchy */
body {
  color: rgb(0, 0, 0); /* Primary text */
}

.muted-text {
  color: rgb(161, 161, 161); /* Secondary text */
}

/* Backgrounds */
.section-bg {
  background-color: rgb(244, 239, 234); /* Cream background */
}

.card-bg {
  background-color: rgb(255, 255, 255); /* White cards */
}
```

---

## 4. Typography

### Font Families

**Primary: Aeonik Mono**
- Family: `"Aeonik Mono", sans-serif`
- Usage: Body text, UI elements, headings
- Style: Monospace, geometric, technical

**Secondary: Aeonik Fono**
- Family: `"Aeonik Fono", "Aeonik Mono"`
- Usage: Display text, special headings

**Fallback: Inter**
- Family: `Inter, sans-serif`
- Usage: System fallback

**Code/Technical: Aeonik Mono**
- Family: `"Aeonik Mono", monospace`
- Usage: Code blocks, technical data

### Type Scale

**Headings**

```css
h1 {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 56px;
  font-weight: 400;
  line-height: 67.2px; /* 1.2 */
  letter-spacing: 1.12px; /* 2% of font size */
  color: rgb(56, 56, 56);
  margin: 0;
}

h2 {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 44.8px; /* 1.4 */
  letter-spacing: normal;
  color: rgb(56, 56, 56);
  margin: 0;
}

h3 {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 28.8px; /* 1.2 */
  letter-spacing: normal;
  color: rgb(56, 56, 56);
  margin: 0;
}
```

**Body Text**

```css
body {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  color: rgb(0, 0, 0);
}
```

### Font Weights

- Regular: `400` (primary weight across all text)

### Typography Guidelines

- All typography uses regular weight (400) for consistency
- Monospace font creates unique, technical aesthetic
- Generous line-height ensures readability
- H1 includes subtle letter-spacing (2%) for visual impact
- All heading margins reset to 0 for precise spacing control

---

## 5. Spacing System

### Base Unit

**Primary**: `8px` (base increment)

### Spacing Scale

```css
/* Extracted spacing values from the site */
--space-xs: 8px;      /* Small gaps */
--space-sm: 20px;     /* Card padding, small margins */
--space-md: 24px;     /* Medium spacing */
--space-lg: 32px;     /* Section padding top */
--space-xl: 40px;     /* Large spacing */
--space-2xl: 56px;    /* Section padding bottom */
--space-3xl: 60px;    /* Large section gaps */
--space-4xl: 127px;   /* Extra large margins */
--space-5xl: 130px;   /* Hero/feature spacing */
```

### Spacing Usage

```css
/* Section Spacing */
section {
  padding: 32px 0 56px; /* Top and bottom */
  margin: 127px 0 0; /* Large top margin */
}

/* Container Spacing */
.container {
  padding: 0 60px; /* Horizontal padding */
}

/* Card/Component Spacing */
.card {
  padding: 24px;
  margin-bottom: 20px;
}

/* Element Gaps */
.flex-container {
  gap: 8px; /* Tight spacing */
}

.grid-container {
  gap: 40px; /* Generous spacing */
}
```

### Vertical Rhythm

- Section top margin: `127px`
- Section padding: `32px 0 56px`
- Card spacing: `20px` - `24px`
- Element gaps: `8px` - `40px`

---

## 6. Component Styles

### Buttons

**Primary Button**

```css
.button-primary {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 17.25px 23px;
  background-color: rgb(255, 222, 0); /* Duck Yellow */
  color: rgb(56, 56, 56);
  border: 2px solid rgb(56, 56, 56);
  border-radius: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.12s ease-in-out;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

**Secondary Button (Disabled State)**

```css
.button-secondary {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 17.25px 23px;
  background-color: rgb(248, 248, 247);
  color: rgb(161, 161, 161);
  border: 2px solid rgb(161, 161, 161);
  border-radius: 2px;
  text-transform: uppercase;
}
```

**Text Button / Link Button**

```css
.button-text {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 0;
  background-color: transparent;
  color: rgb(56, 56, 56);
  border: 0.666667px solid transparent;
  border-radius: 2px;
  text-transform: none;
}

.button-text:hover {
  border-color: rgb(56, 56, 56);
}
```

### Navigation

```css
.nav-link {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgb(56, 56, 56);
  text-decoration: none;
  padding: 0;
  border-radius: 2px;
  border: 0.666667px solid transparent;
  transition: all 0.12s ease-in-out;
}

.nav-link:hover {
  border-color: rgb(56, 56, 56);
}
```

### Cards

```css
.card {
  background-color: rgb(255, 255, 255);
  border: 2px solid rgb(56, 56, 56);
  border-radius: 2px;
  padding: 24px;
  transition: box-shadow 0.12s ease-in-out, transform 0.12s ease-in-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}
```

### Form Inputs

```css
input[type="text"],
input[type="email"],
textarea {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 16px;
  padding: 17.25px 23px;
  background-color: rgb(255, 255, 255);
  color: rgb(56, 56, 56);
  border: 2px solid rgb(161, 161, 161);
  border-radius: 2px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: rgb(56, 56, 56);
}
```

### Badges / Tags

Based on the color palette, badges can use the extended accent colors:

```css
.badge {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 2px;
  border: 1px solid currentColor;
}

.badge-blue {
  background-color: rgb(234, 240, 255);
  color: rgb(84, 180, 222);
  border-color: rgb(84, 180, 222);
}

.badge-teal {
  background-color: rgb(232, 245, 233);
  color: rgb(56, 193, 176);
  border-color: rgb(56, 193, 176);
}

.badge-purple {
  background-color: rgb(247, 241, 255);
  color: rgb(178, 145, 222);
  border-color: rgb(178, 145, 222);
}

.badge-yellow {
  background-color: rgb(249, 251, 231);
  color: rgb(179, 196, 25);
  border-color: rgb(179, 196, 25);
}
```

---

## 7. Shadows & Elevation

MotherDuck uses minimal shadows, preferring a flat design aesthetic.

### Shadow Scale

```css
/* No shadows detected on main elements */
/* Only toast notifications use shadows */
--shadow-toast: 0px 4px 12px rgba(0, 0, 0, 0.1);

/* Recommended shadow scale for future use */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12);
```

### Elevation Strategy

Instead of shadows, MotherDuck uses:
- **Borders**: 2px solid borders for definition
- **Color Contrast**: Background color variations
- **Transform on Hover**: Slight Y-axis translation for interaction feedback

```css
/* Hover elevation pattern */
.card:hover,
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}
```

---

## 8. Animations & Transitions

### Transition Defaults

```css
/* Primary transition pattern */
.interactive-element {
  transition: all 0.12s ease-in-out;
}

/* Specific transitions for hover effects */
.card,
.button {
  transition: box-shadow 0.12s ease-in-out, transform 0.12s ease-in-out;
}
```

### Animation Guidelines

- **Duration**: 120ms (0.12s) for all transitions
- **Easing**: `ease-in-out` for smooth, natural motion
- **Properties**: Primarily transform and box-shadow
- **Hover Effects**: Subtle upward translation (-2px to -4px)

### Common Animations

```css
/* Button hover */
@keyframes button-hover {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2px);
  }
}

/* Card hover */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}
```

---

## 9. Border Styles

### Border Widths

```css
--border-thin: 0.666667px; /* Subtle borders on links */
--border-regular: 1px;     /* Standard borders */
--border-thick: 2px;       /* Primary border width */
```

### Border Colors

```css
--border-primary: rgb(56, 56, 56);    /* Dark charcoal */
--border-secondary: rgb(161, 161, 161); /* Gray */
--border-transparent: rgba(0, 0, 0, 0); /* Hidden borders */
```

### Border Usage

```css
/* Primary components */
.button,
.card,
.input {
  border: 2px solid rgb(56, 56, 56);
}

/* Secondary/disabled state */
.button-secondary {
  border: 2px solid rgb(161, 161, 161);
}

/* Interactive elements */
.nav-link {
  border: 0.666667px solid transparent;
}

.nav-link:hover {
  border-color: rgb(56, 56, 56);
}
```

### Border Patterns

- Cards, buttons, inputs: 2px solid borders
- Navigation links: 0.666667px borders (visible on hover)
- Data visualization borders use extended color palette

---

## 10. Border Radius

### Radius Scale

MotherDuck uses a **flat, minimal radius** approach:

```css
--radius-sm: 2px;  /* Universal border radius */
```

### Usage

```css
/* All components use 2px radius */
.button,
.card,
.input,
.badge,
.nav-link {
  border-radius: 2px;
}
```

### Guidelines

- **Consistency**: All interactive elements use 2px
- **Sharp Aesthetic**: Near-square corners maintain technical feel
- **No variation**: Single radius value across entire system

---

## 11. Opacity & Transparency

### Opacity Scale

```css
--opacity-toast: 0.9;           /* Toast background */
--opacity-blue-accent: 0.4;     /* Blue accent overlay */
--opacity-overlay: 0.7;         /* Modal/overlay background */
--opacity-progress: 0.2;        /* Progress bar background */
```

### Transparent Colors

```css
/* Transparent backgrounds */
background-color: rgba(0, 0, 0, 0);      /* Fully transparent */
background-color: rgba(43, 165, 255, 0.4); /* Blue with 40% opacity */
background-color: rgba(0, 0, 0, 0.7);    /* Dark overlay */
```

### Usage Guidelines

- Overlays: 70% opacity dark background
- Accent highlights: 40% opacity colors
- Toast notifications: 90% opacity background
- Progress indicators: 20% opacity background

---

## 12. Z-Index Layers

### Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-toast: 9999; /* Toast notifications */
```

### Layer Usage

```css
/* Toast notifications (highest) */
.toast-container {
  z-index: 9999;
}

/* Modals */
.modal {
  z-index: 500;
}

.modal-backdrop {
  z-index: 400;
}

/* Navigation (sticky) */
nav {
  z-index: 200;
}
```

---

## 13. Responsive Breakpoints

### Breakpoint System

```css
/* Extracted from CSS variables and layout analysis */
--header-mobile: 70px;   /* Mobile header height */
--header-desktop: 90px;  /* Desktop header height */
--eyebrow-mobile: 70px;  /* Mobile eyebrow height */
--eyebrow-desktop: 55px; /* Desktop eyebrow height */
```

### Container Widths

```css
--container-max-width: 960px; /* Primary content container */
```

### Recommended Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 640px) {  /* Small tablets */
  /* Adjust spacing, typography */
}

@media (min-width: 768px) {  /* Tablets */
  nav {
    height: 90px; /* Switch to desktop header */
  }
}

@media (min-width: 1024px) { /* Desktop */
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}

@media (min-width: 1280px) { /* Large desktop */
  /* Optional wider layouts */
}
```

### Responsive Patterns

```css
/* Container padding adjusts with viewport */
.container {
  padding: 0 20px; /* Mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 0 60px; /* Desktop */
  }
}
```

---

## 14. CSS Variables

Complete CSS custom property system from MotherDuck:

```css
:root {
  /* Layout Variables */
  --header-mobile: 70px;
  --header-desktop: 90px;
  --eyebrow-mobile: 70px;
  --eyebrow-desktop: 55px;

  /* Toast/Notification System */
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: #e74c3c;
  --toastify-color-transparent: hsla(0,0%,100%,.7);

  --toastify-icon-color-info: #3498db;
  --toastify-icon-color-success: #07bc0c;
  --toastify-icon-color-warning: #f1c40f;
  --toastify-icon-color-error: #e74c3c;

  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-toast-background: #fff;
  --toastify-toast-width: fit-content;
  --toastify-toast-min-height: fit-content;
  --toastify-toast-max-height: 800px;
  --toastify-toast-padding: 14px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(16px, 0px);
  --toastify-toast-right: max(16px, 0px);
  --toastify-toast-bottom: max(16px, 0px);
  --toastify-toast-left: max(16px, 0px);
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);

  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;

  --toastify-color-progress-light: linear-gradient(90deg,#4cd964,#5ac8fa,#007aff,#34aadc,#5856d6,#ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: #3498db;
  --toastify-color-progress-success: #07bc0c;
  --toastify-color-progress-warning: #f1c40f;
  --toastify-color-progress-error: #e74c3c;
  --toastify-color-progress-bgo: .2;

  /* Swiper/Carousel */
  --swiper-theme-color: #007aff;

  /* Obsidian Clipper Integration */
  --obsidian-clipper-background-primary: #fff;
  --obsidian-clipper-background-primary-rgb: 255, 255, 255;
  --obsidian-clipper-background-opacity: 0.9;
  --obsidian-clipper-text-muted: #5c5c5c;

  /* Vimium Integration */
  --vimium-foreground-color: white;
  --vimium-foreground-text-color: black;
  --vimium-background-color: white;
  --vimium-background-text-color: black;
  --vimium-link-color: blue;
}
```

---

## 15. Layout Patterns

### Container System

```css
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 60px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
}
```

### Grid Layouts

```css
/* Recommended grid for cards/features */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

### Flexbox Patterns

```css
/* Navigation layout */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

/* Button groups */
.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
```

### Section Layouts

```css
section {
  padding: 32px 0 56px;
  margin-top: 127px;
}

section:first-of-type {
  margin-top: 0;
}
```

### Vertical Spacing Strategy

- Large top margins for section separation (127px)
- Asymmetric section padding (32px top, 56px bottom)
- Consistent container horizontal padding (60px desktop, 20px mobile)

---

## 16. Example Component Reference

### Hero Section

```html
<section class="hero" style="
  background-color: rgb(244, 239, 234);
  padding: 32px 0 56px;
  margin-top: 0;
">
  <div class="container" style="
    max-width: 960px;
    margin: 0 auto;
    padding: 0 60px;
  ">
    <h1 style="
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 56px;
      font-weight: 400;
      line-height: 67.2px;
      letter-spacing: 1.12px;
      color: rgb(56, 56, 56);
      margin: 0 0 24px 0;
    ">
      Ducking Simple Data Warehouse
    </h1>
    <p style="
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 16px;
      color: rgb(56, 56, 56);
      margin: 0 0 40px 0;
    ">
      Making analytics ducking awesome with DuckDB.
    </p>
    <button style="
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 16px;
      font-weight: 400;
      padding: 17.25px 23px;
      background-color: rgb(255, 222, 0);
      color: rgb(56, 56, 56);
      border: 2px solid rgb(56, 56, 56);
      border-radius: 2px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.12s ease-in-out;
    ">
      Get Started
    </button>
  </div>
</section>
```

### Card Component

```html
<div class="card" style="
  background-color: rgb(255, 255, 255);
  border: 2px solid rgb(56, 56, 56);
  border-radius: 2px;
  padding: 24px;
  transition: box-shadow 0.12s ease-in-out, transform 0.12s ease-in-out;
">
  <h3 style="
    font-family: 'Aeonik Mono', sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 28.8px;
    color: rgb(56, 56, 56);
    margin: 0 0 20px 0;
  ">
    Feature Title
  </h3>
  <p style="
    font-family: 'Aeonik Mono', sans-serif;
    font-size: 16px;
    color: rgb(56, 56, 56);
    margin: 0;
  ">
    Feature description goes here.
  </p>
</div>

<style>
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}
</style>
```

### Navigation Component

```html
<nav style="
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background-color: rgb(255, 255, 255);
">
  <div class="logo">
    <span style="
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 24px;
      font-weight: 400;
      color: rgb(56, 56, 56);
    ">
      MotherDuck
    </span>
  </div>

  <div style="display: flex; gap: 10px;">
    <a href="#" style="
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: rgb(56, 56, 56);
      text-decoration: none;
      padding: 0;
      border-radius: 2px;
      border: 0.666667px solid transparent;
      transition: all 0.12s ease-in-out;
    " class="nav-link">
      PRODUCT
    </a>
    <a href="#" style="
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: rgb(56, 56, 56);
      text-decoration: none;
      padding: 0;
      border-radius: 2px;
      border: 0.666667px solid transparent;
      transition: all 0.12s ease-in-out;
    " class="nav-link">
      COMMUNITY
    </a>
    <a href="#" style="
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: rgb(56, 56, 56);
      text-decoration: none;
      padding: 0;
      border-radius: 2px;
      border: 0.666667px solid transparent;
      transition: all 0.12s ease-in-out;
    " class="nav-link">
      COMPANY
    </a>
  </div>
</nav>

<style>
.nav-link:hover {
  border-color: rgb(56, 56, 56);
}
</style>
```

### Button Variants

```html
<!-- Primary Button -->
<button style="
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 17.25px 23px;
  background-color: rgb(255, 222, 0);
  color: rgb(56, 56, 56);
  border: 2px solid rgb(56, 56, 56);
  border-radius: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.12s ease-in-out;
" class="btn-primary">
  Primary Action
</button>

<!-- Secondary Button (Disabled State) -->
<button style="
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 17.25px 23px;
  background-color: rgb(248, 248, 247);
  color: rgb(161, 161, 161);
  border: 2px solid rgb(161, 161, 161);
  border-radius: 2px;
  text-transform: uppercase;
  cursor: not-allowed;
" disabled>
  Disabled
</button>

<!-- Text/Link Button -->
<button style="
  font-family: 'Aeonik Mono', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 0;
  background-color: transparent;
  color: rgb(56, 56, 56);
  border: 0.666667px solid transparent;
  border-radius: 2px;
  text-transform: none;
  cursor: pointer;
  transition: all 0.12s ease-in-out;
" class="btn-text">
  Text Action
</button>

<style>
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-text:hover {
  border-color: rgb(56, 56, 56);
}
</style>
```

### Form Input

```html
<form style="max-width: 600px;">
  <input
    type="email"
    placeholder="Enter your email"
    style="
      font-family: 'Aeonik Mono', sans-serif;
      font-size: 16px;
      padding: 17.25px 23px;
      width: 100%;
      background-color: rgb(255, 255, 255);
      color: rgb(56, 56, 56);
      border: 2px solid rgb(161, 161, 161);
      border-radius: 2px;
      margin-bottom: 20px;
    "
    class="form-input"
  />

  <button style="
    font-family: 'Aeonik Mono', sans-serif;
    font-size: 16px;
    font-weight: 400;
    padding: 17.25px 23px;
    background-color: rgb(248, 248, 247);
    color: rgb(161, 161, 161);
    border: 2px solid rgb(161, 161, 161);
    border-radius: 2px;
    text-transform: uppercase;
  " disabled>
    SUBMIT
  </button>
</form>

<style>
.form-input:focus {
  outline: none;
  border-color: rgb(56, 56, 56);
}
</style>
```

### Color Badge System

```html
<div style="display: flex; gap: 8px; flex-wrap: wrap;">
  <span style="
    font-family: 'Aeonik Mono', sans-serif;
    font-size: 14px;
    padding: 4px 12px;
    background-color: rgb(234, 240, 255);
    color: rgb(84, 180, 222);
    border: 1px solid rgb(84, 180, 222);
    border-radius: 2px;
  ">
    Analytics
  </span>

  <span style="
    font-family: 'Aeonik Mono', sans-serif;
    font-size: 14px;
    padding: 4px 12px;
    background-color: rgb(232, 245, 233);
    color: rgb(56, 193, 176);
    border: 1px solid rgb(56, 193, 176);
    border-radius: 2px;
  ">
    DuckDB
  </span>

  <span style="
    font-family: 'Aeonik Mono', sans-serif;
    font-size: 14px;
    padding: 4px 12px;
    background-color: rgb(247, 241, 255);
    color: rgb(178, 145, 222);
    border: 1px solid rgb(178, 145, 222);
    border-radius: 2px;
  ">
    Cloud
  </span>

  <span style="
    font-family: 'Aeonik Mono', sans-serif;
    font-size: 14px;
    padding: 4px 12px;
    background-color: rgb(249, 251, 231);
    color: rgb(179, 196, 25);
    border: 1px solid rgb(179, 196, 25);
    border-radius: 2px;
  ">
    SQL
  </span>
</div>
```

---

## Implementation Notes

### Font Loading

```html
<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="path/to/aeonik-mono.css">
```

Or use web font CDN if available:

```css
@import url('https://motherduck.com/_next/static/css/53fee669452ee665.css');
```

### CSS Reset

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Aeonik Mono", sans-serif;
  font-size: 16px;
  color: rgb(0, 0, 0);
  background-color: rgb(244, 239, 234);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font-family: inherit;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}
```

### Accessibility Considerations

- Ensure 2px borders provide sufficient clickable areas
- Maintain WCAG AA contrast ratios (already met with current palette)
- Use semantic HTML5 elements
- Add focus states for keyboard navigation:

```css
button:focus,
a:focus,
input:focus {
  outline: 2px solid rgb(56, 56, 56);
  outline-offset: 2px;
}
```

### Performance Tips

- Preload Aeonik Mono font for faster rendering
- Use CSS custom properties for theming flexibility
- Minimize box-shadow usage (already minimal)
- Use transform for animations (hardware accelerated)

---

**End of Style Guide**

*This document was generated through analysis of https://motherduck.com/ on 2026-01-24.*

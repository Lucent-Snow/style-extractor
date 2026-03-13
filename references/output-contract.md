# Output Contract

Use this contract for every extraction. Treat it as a required deliverable spec, not a suggestion.

## Required folder shape

Always produce one dedicated extraction directory:

```text
<project>-<style>/
  guides/
    style-guide.md
    motion-guide.md
    evidence-manifest.md
  evidence/
    screenshots/
    assets/
    notes/
```

Produce when motion is meaningful:
- `guides/motion-guide.md`

Never place final guide files, screenshots, CSS, or JS loose in the extraction root.

## File purposes

### `guides/style-guide.md`
Capture the reusable visual language:
- design philosophy
- semantic tokens
- typography
- spacing
- components + state matrix
- layout tendencies
- responsive behavior
- copy-paste examples

This file is for designers or engineers who want to rebuild the style in another product.

### `guides/motion-guide.md`
Capture the reusable motion system:
- interaction triggers
- durations / delays / easing
- transition patterns
- keyframes
- JS-library evidence
- reusable motion primitives

This file is required whenever motion is part of the source's identity or usability.

### `guides/evidence-manifest.md`
Capture how the guide was derived:
- source URL or repo
- capture date
- screenshots and what each one proves
- downloaded CSS/JS or notes
- scripts used
- interactions tested
- confidence notes and unresolved gaps

### `evidence/screenshots/`
Store screenshots only:
- baseline captures
- state captures
- sequence captures

### `evidence/assets/`
Store downloaded assets only:
- CSS
- JS
- SVG references
- font stylesheets

### `evidence/notes/`
Store raw support notes only:
- traces
- runtime notes
- selector inventories
- dumps / helper text

## Anti-patterns

Reject outputs that:
- spend more space describing the original product than the reusable style
- copy the source app's IA, feature taxonomy, or content structure
- list raw colors, timings, or selectors without semantic naming
- provide no evidence trail
- mix static style and motion into one unstructured document
- dump all files flat into one directory with no folder hierarchy
- read like a thin summary when the evidence clearly supports a denser reference
- replace observed values with vague adjectives such as “soft”, “clean”, or “premium” without evidence
- bloat the document with generic implementation advice that is not grounded in the source
- dump exhaustive weak-value lists with no semantic grouping or prioritization

## Reuse filter

For each major trait, decide which bucket it belongs to:

- `Reusable`: can be copied directly
- `Adapted`: useful idea, but must be reshaped
- `Discarded`: product-specific, should not be copied

Examples:
- Reusable: accent color system, card radius, button states, motion duration scale
- Adapted: sidebar layout, hero composition, section rhythm
- Discarded: pricing table logic, chat workflow, product copy, page IA

## Minimum evidence bar

Static:
- 1 baseline screenshot in `evidence/screenshots/`
- 3 or more component/state captures in `evidence/screenshots/`
- computed style evidence for core tokens in `evidence/notes/`
- enough raw evidence to support border/radius/layering notes when those traits appear important

Dynamic:
- 3 or more key interactions documented in `guides/evidence-manifest.md`
- transition evidence or animation evidence in `evidence/notes/`
- keyframes when present in `evidence/assets/` or `evidence/notes/`
- JS-library notes when relevant in `evidence/notes/`

## Density expectations

The guide should feel like a reusable reference, not a short memo.

Expected qualities:
- token tables contain representative raw values and usage mapping
- component sections include real state evidence, not only narrative summaries
- implementation notes appear when they materially help another engineer recreate the style
- border / radius / opacity / layering are called out explicitly when visually important
- copy-paste examples are substantial enough to be implementation starting points

Do not chase length for its own sake.
Do preserve the “reference manual” feeling when the source supports it.

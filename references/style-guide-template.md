# Style Guide Template

Use this as the top-level structure for `<project>-<style>-style-guide.md`.

Quality intent:
- Keep the document dense enough to function as a real reference, not just a summary.
- Favor semantically grouped evidence over raw-value dumping.
- Include practical implementation guidance where it materially helps reuse.
- Avoid long generic filler, repeated product description, or exhaustive weak-value lists with no prioritization.

## 1. Overview

- Project / variant / source
- Type: marketing site / web app / docs / dashboard / desktop-web
- Visual summary in 3-6 bullets
- 1 short paragraph describing the dominant visual read

Optional:
- A short table of contents when the document is long enough to benefit from one

## 2. Design Philosophy

State the style principles using evidence, not adjectives alone.

For each principle:
- what it is
- which tokens/components prove it
- whether it is `Reusable`, `Adapted`, or `Discarded`

## 3. Semantic Tokens

Required groups:
- color tokens
- typography tokens
- spacing tokens
- radius / border / shadow tokens
- opacity / layering tokens

Use semantic names and map each token to usage.

For each important token cluster, include:
- semantic token name
- representative raw value(s)
- usage mapping
- confidence or evidence note when helpful

## 4. Color Palette + Usage Mapping

Include:
- brand/accent colors
- neutrals
- semantic colors
- usage notes

Do not stop at a swatch list. Explain where each color belongs.

Good pattern to copy from strong references:
- separate core colors from semantic usage
- include direct implementation examples for CTA / text / surface / border roles

## 5. Typography

Include:
- font families
- size scale
- weight scale
- line-height and letter-spacing tendencies
- mixed-language notes when relevant

When useful, include:
- representative CSS snippets
- fallback and loading notes
- guidance on where display typography stops and body typography begins

## 6. Spacing + Density

Include:
- spacing scale
- content density
- module rhythm
- container or gutter patterns

## 7. Component System

Cover 5 or more meaningful components.

For each component, include:
- role
- visual rule
- state matrix
- reusable notes
- actual raw values when captured (color, border, transition, radius, etc.)

Minimum state matrix:
- default
- hover
- active
- focus-visible
- disabled

Include selected / invalid / loading when they exist.

Good pattern to preserve from strong references:
- state tables with observed values
- note clearly when a state was not styled or not evidenced

Avoid:
- vague “hover gets brighter” prose without values or evidence

## 8. Border, Radius, Shadow, and Layering

Document separately when these are meaningfully part of the visual language.

Include:
- border widths
- border color strategy
- radius scale
- shadow / elevation strategy
- opacity / transparency usage
- z-index / layer ordering

If the source has minimal shadows or minimal layering, say so explicitly instead of inventing a heavy system.

## 9. Layout Tendencies

Document:
- page composition patterns
- primary/secondary region balance
- card vs panel behavior
- navigation style

Mark clearly which layout traits should only be adapted, not copied literally.

## 10. Responsive Behavior

Document breakpoints, collapse behavior, and simplifications.

When possible include:
- container widths
- layout shifts by breakpoint
- touch/hover conditional behavior

## 11. CSS Variables / Theme Sources

Include when available:
- root variable declarations
- scoped theme variables
- source-of-truth notes for tokens coming from CSS vars, inline styles, or JS

Do not dump the entire stylesheet blindly. Curate the variables that matter to reuse.

## 12. Copy-Paste Examples

Provide 5 or more self-contained examples with HTML + CSS in one block.

Examples should express the extracted style, not recreate the original product.

Good examples usually include:
- primary CTA
- secondary action
- nav or marker element
- card / panel
- one motion-driven or layered component when relevant

## 13. Implementation Notes

Include practical notes when they materially improve reuse:
- font loading
- reset assumptions
- accessibility gaps in the source
- performance caveats
- when JS is required instead of pure CSS

Keep this grounded in evidence. Do not add generic frontend advice.

## 14. Adaptation Notes

Include:
- what to keep when porting the style to another product
- what to soften or simplify
- what to avoid copying

Good adaptation notes are especially important when the source is a marketing site or highly domain-specific app.

# Motion Guide Template

Use this as the top-level structure for `<project>-<style>-motion-guide.md`.

## 1. Motion Summary

Summarize:
- overall motion character
- where motion matters most
- whether the system is transition-led, keyframe-led, or JS-led

## 2. Motion Tokens

Required groups:
- duration scale
- delay scale
- easing scale
- motion property families

Name tokens semantically, not only by raw value.

## 3. Trigger Matrix

List 3 or more key interactions.

For each interaction, capture:
- trigger
- target elements
- properties that change
- duration
- delay
- easing
- evidence source

## 4. Transition Patterns

Document recurring patterns such as:
- opacity + translate entrance
- icon color switch
- panel expand/collapse
- overlay sweep
- active-state highlight shift

## 5. Keyframes

For important animations, include:
- keyframe name
- purpose
- full `@keyframes` block when available
- observed bindings (duration, easing, iteration, fill)

## 6. JS-Driven Motion

Document:
- detected libraries
- config evidence
- whether motion is visible via `document.getAnimations()`
- when rAF sampling or trace was needed

## 7. Delay Chains / Sequencing

Call out any staged entrances or chained reveals.

For each chain, list:
- order
- delay ladder
- what visual effect the sequence creates

## 8. Reusable Motion Primitives

Translate the source motion into reusable primitives such as:
- `content.fadeSlideIn`
- `nav.activeSwitch`
- `card.hoverLift`
- `cta.breathingAccent`

Mark each as `Reusable`, `Adapted`, or `Discarded`.

## 9. Evidence Notes

Include:
- which scripts were used
- what interactions were tested
- what evidence is partial or inferred
- any blind spots

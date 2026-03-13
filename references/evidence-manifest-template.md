# Evidence Manifest Template

Use this as the top-level structure for `<project>-<style>-evidence-manifest.md`.

## 1. Source Summary

- Project / variant
- URL or repo
- capture date
- device or viewport
- theme / locale / login state if relevant

## 2. Screenshots

List each screenshot with:
- filename
- folder path (normally `evidence/screenshots/...`)
- what it captures
- why it matters

## 3. Downloaded Assets / Notes

List:
- CSS files under `evidence/assets/`
- JS files under `evidence/assets/`
- inline snippets or dumps under `evidence/notes/`
- traces under `evidence/notes/`
- any extra notes under `evidence/notes/`

## 4. Scripts Used

Record which skill scripts were used and for what:
- `transition-scanner.js`
- `interaction-diff.js`
- `library-detect.js`
- `motion-tools.js`
- `extract-keyframes.py`

## 5. Interactions Tested

For each tested interaction, record:
- trigger
- target area
- evidence captured
- whether results were complete, partial, or inferred

## 6. Coverage Assessment

Split findings into:
- static coverage
- motion coverage
- state coverage

## 7. Gaps and Confidence

Include:
- blockers
- cross-origin limitations
- protected states you could not enter
- anything inferred rather than directly observed
- confidence level for the overall extraction

// Style Extractor: CSS transition scanner (paste into evaluate_script)
//
// Scans all elements for CSS transition declarations and clusters results.
// Returns structured data: per-element transition configs + clustered patterns.
//
// Exposes:
// - window.__seTransition.scan(root?)  — scan all elements (default: document)
// - window.__seTransition.keyframes()  — extract all @keyframes from stylesheets
//
// This file is intentionally framework-agnostic and safe to paste as an IIFE.

(() => {
  if (window.__seTransition?.installed) return;

  function cssPath(el) {
    if (!el || el.nodeType !== 1) return null;
    if (el.id) return `#${CSS.escape(el.id)}`;
    const parts = [];
    let cur = el;
    let depth = 0;
    while (cur && cur.nodeType === 1 && depth < 6) {
      let part = cur.tagName.toLowerCase();
      if (cur.classList && cur.classList.length) {
        part += Array.from(cur.classList).slice(0, 2).map(c => `.${CSS.escape(c)}`).join('');
      }
      const parent = cur.parentElement;
      if (parent) {
        const same = Array.from(parent.children).filter(c => c.tagName === cur.tagName);
        if (same.length > 1) part += `:nth-of-type(${same.indexOf(cur) + 1})`;
      }
      parts.unshift(part);
      if (parent?.id) { parts.unshift(`#${CSS.escape(parent.id)}`); break; }
      cur = parent;
      depth++;
    }
    return parts.join(' > ');
  }

  /**
   * Scan all elements under `root` for CSS transition declarations.
   * Returns { elements, patterns }.
   *   elements — per-element details (capped at opts.limit, default 80)
   *   patterns — clustered by (property + duration + easing) signature
   */
  function scan(root, opts) {
    const node = root
      ? (typeof root === 'string' ? document.querySelector(root) : root)
      : document;
    if (!node) return { error: 'root not found' };

    const limit = opts?.limit ?? 80;
    const all = node.querySelectorAll('*');
    const elements = [];
    const patternMap = {};

    for (const el of all) {
      const s = getComputedStyle(el);
      const tp = s.transitionProperty;
      const td = s.transitionDuration;
      if (!tp || tp === 'none' || tp === 'all 0s' || !td || td === '0s') continue;

      // Parse multi-value transition shorthand
      const props = tp.split(',').map(p => p.trim());
      const durs = td.split(',').map(d => d.trim());
      const easings = s.transitionTimingFunction.split(',').map(e => e.trim());
      const delays = s.transitionDelay.split(',').map(d => d.trim());

      const transitions = props.map((p, i) => ({
        property: p,
        duration: durs[i % durs.length],
        easing: easings[i % easings.length],
        delay: delays[i % delays.length] !== '0s' ? delays[i % delays.length] : null
      }));

      // Skip elements where all durations are 0s
      if (transitions.every(t => t.duration === '0s')) continue;

      const sig = transitions.map(t => `${t.property}|${t.duration}|${t.easing}`).join(';');
      patternMap[sig] = patternMap[sig] || { transitions: transitions, count: 0, examples: [] };
      patternMap[sig].count++;
      if (patternMap[sig].examples.length < 3) {
        patternMap[sig].examples.push({
          tag: el.tagName.toLowerCase(),
          className: String(el.className || '').slice(0, 120),
          path: cssPath(el)
        });
      }

      if (elements.length < limit) {
        elements.push({
          tag: el.tagName.toLowerCase(),
          className: String(el.className || '').slice(0, 120),
          path: cssPath(el),
          transitions,
          inlineStyle: el.getAttribute('style')?.slice(0, 200) || null
        });
      }
    }

    // Sort patterns by count descending
    const patterns = Object.values(patternMap).sort((a, b) => b.count - a.count);

    return {
      totalScanned: all.length,
      totalWithTransitions: elements.length + Object.values(patternMap).reduce((s, p) => s + Math.max(0, p.count - 3), 0),
      elements,
      patterns
    };
  }

  /**
   * Extract all @keyframes definitions from stylesheets.
   * Returns array of { name, frames: [{ keyText, cssText }] }.
   * Handles CORS-blocked sheets gracefully.
   */
  function keyframes() {
    const result = [];
    const seen = new Set();

    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules || sheet.rules; } catch { continue; }
      if (!rules) continue;

      for (const rule of rules) {
        if (rule.type === CSSRule.KEYFRAMES_RULE && !seen.has(rule.name)) {
          seen.add(rule.name);
          const frames = [];
          for (let i = 0; i < rule.cssRules.length; i++) {
            frames.push({
              keyText: rule.cssRules[i].keyText,
              cssText: rule.cssRules[i].style.cssText.slice(0, 400)
            });
          }
          result.push({ name: rule.name, frameCount: frames.length, frames });
        }
      }
    }
    return result;
  }

  window.__seTransition = {
    installed: true,
    scan,
    keyframes
  };
})();

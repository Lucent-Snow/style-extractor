// Style Extractor: Motion tools (paste into evaluate_script when extracting dynamic UIs)
//
// Exposes:
// - window.__seMotion.install(): installs helpers (idempotent)
// - window.__seMotion.capture(label): captures document.getAnimations() snapshot
// - window.__seMotion.sample(el, opts): samples computed styles per rAF for JS-driven motion
//
// This file is intentionally framework-agnostic and safe to paste as an IIFE.

(() => {
  if (window.__seMotion?.installed) return;

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
      if (parent?.id) {
        parts.unshift(`#${CSS.escape(parent.id)}`);
        break;
      }
      cur = parent;
      depth++;
    }
    return parts.join(' > ');
  }

  function summarizeKeyProps(kfs) {
    if (!Array.isArray(kfs) || kfs.length === 0) return null;
    const omit = new Set(['offset', 'easing', 'composite', 'computedOffset']);
    const props = new Set();
    for (const kf of kfs) for (const p of Object.keys(kf)) if (!omit.has(p)) props.add(p);
    const out = {};
    for (const p of props) {
      let first = null;
      let last = null;
      let firstOffset = null;
      let lastOffset = null;
      for (const kf of kfs) {
        if (kf[p] == null) continue;
        if (first == null) {
          first = kf[p];
          firstOffset = kf.offset ?? kf.computedOffset ?? null;
        }
        last = kf[p];
        lastOffset = kf.offset ?? kf.computedOffset ?? null;
      }
      out[p] = { from: first, to: last, fromOffset: firstOffset, toOffset: lastOffset };
    }
    return out;
  }

  function describeTarget(el) {
    if (!el || el.nodeType !== 1) return null;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      className: el.className ? String(el.className).slice(0, 200) : null,
      text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80) || null,
      path: cssPath(el),
      rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      computed: {
        opacity: s.opacity,
        transform: s.transform,
        filter: s.filter,
        clipPath: s.clipPath,
        willChange: s.willChange
      }
    };
  }

  function capture(label) {
    const anims = document.getAnimations({ subtree: true });
    return {
      label,
      at: Date.now(),
      url: location.href,
      scrollY: Math.round(scrollY),
      animationCount: anims.length,
      animations: anims.map(a => {
        const effect = a.effect;
        const timing = effect?.getTiming?.() ?? null;
        const target = (() => { try { return effect?.target ?? null; } catch { return null; } })();
        const keyframes = (() => { try { return effect?.getKeyframes?.() ?? null; } catch { return null; } })();
        return {
          type: a.constructor?.name ?? null,
          playState: a.playState,
          currentTime: a.currentTime ?? null,
          animationName: a.animationName ?? null,
          timing,
          keyProps: summarizeKeyProps(keyframes),
          target: describeTarget(target)
        };
      })
    };
  }

  async function sample(el, opts) {
    const target = typeof el === 'string' ? document.querySelector(el) : el;
    if (!target) return { ok: false, reason: 'target not found' };

    const ms = Math.max(100, opts?.durationMs ?? 800);
    const include = opts?.include ?? ['transform', 'opacity'];
    const out = [];
    const start = performance.now();

    await new Promise(resolve => {
      function step() {
        const t = performance.now();
        const s = getComputedStyle(target);
        const row = { t: Math.round(t - start) };
        for (const k of include) row[k] = s[k];
        out.push(row);
        if (t - start >= ms) return resolve();
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });

    return {
      ok: true,
      target: describeTarget(target),
      durationMs: ms,
      samples: out
    };
  }

  window.__seMotion = {
    installed: true,
    install: () => true,
    capture,
    sample
  };
})();


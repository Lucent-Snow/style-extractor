// Style Extractor: Interaction diff (paste into evaluate_script)
//
// Records inline styles + computed motion properties before/after an interaction,
// and captures document.getAnimations() within the transition window.
//
// Exposes:
// - window.__seDiff.watch(selectors)           — start watching elements
// - window.__seDiff.triggerAndCapture(fn, opts) — trigger interaction, capture diff
// - window.__seDiff.snapshot(label)             — manual snapshot of watched elements
//
// Usage (in evaluate_script):
//   1. Paste this file
//   2. __seDiff.watch(['.my-btn', '.hero-title', '[class*="section"]'])
//   3. __seDiff.triggerAndCapture(() => document.querySelector('.nav-item').click())
//
// This file is intentionally framework-agnostic and safe to paste as an IIFE.

(() => {
  if (window.__seDiff?.installed) return;

  const MOTION_PROPS = ['opacity', 'transform', 'color', 'backgroundColor', 'borderColor',
    'boxShadow', 'width', 'height', 'top', 'left', 'filter', 'clipPath'];

  let watchedSelectors = [];
  let watchedElements = [];

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

  function describeEl(el) {
    return {
      tag: el.tagName.toLowerCase(),
      className: String(el.className || '').slice(0, 120),
      path: cssPath(el),
      text: (el.innerText || '').trim().slice(0, 40) || null
    };
  }

  function captureState(el) {
    const s = getComputedStyle(el);
    const computed = {};
    for (const p of MOTION_PROPS) computed[p] = s[p];
    return {
      inlineStyle: el.getAttribute('style')?.slice(0, 300) || null,
      computed
    };
  }

  function captureAnimations() {
    const anims = document.getAnimations({ subtree: true });
    return anims.map(a => {
      const effect = a.effect;
      const timing = effect?.getTiming?.() ?? null;
      const target = (() => { try { return effect?.target ?? null; } catch { return null; } })();
      const keyframes = (() => { try { return effect?.getKeyframes?.() ?? null; } catch { return null; } })();

      const props = keyframes ? [...new Set(keyframes.flatMap(kf =>
        Object.keys(kf).filter(k => !['offset', 'easing', 'composite', 'computedOffset'].includes(k))
      ))] : [];

      return {
        type: a.constructor?.name ?? null,
        animationName: a.animationName ?? null,
        playState: a.playState,
        timing: timing ? {
          duration: timing.duration,
          delay: timing.delay,
          easing: timing.easing,
          fill: timing.fill,
          iterations: timing.iterations
        } : null,
        properties: props,
        target: target?.nodeType === 1 ? describeEl(target) : null
      };
    });
  }

  /**
   * Register selectors to watch. Each selector can match multiple elements.
   */
  function watch(selectors) {
    watchedSelectors = Array.isArray(selectors) ? selectors : [selectors];
    watchedElements = [];
    for (const sel of watchedSelectors) {
      const els = document.querySelectorAll(sel);
      for (const el of els) watchedElements.push({ selector: sel, el });
    }
    return { watching: watchedElements.length, selectors: watchedSelectors };
  }

  /**
   * Take a labeled snapshot of all watched elements.
   */
  function snapshot(label) {
    return {
      label,
      at: Date.now(),
      elements: watchedElements.map(({ selector, el }) => ({
        selector,
        ...describeEl(el),
        ...captureState(el)
      })),
      animations: captureAnimations()
    };
  }

  /**
   * Trigger an interaction and capture before/after diff.
   *
   * @param {Function} triggerFn — the interaction to trigger (e.g., () => el.click())
   * @param {Object}   opts
   * @param {number}   opts.captureAt — ms after trigger to capture (default 50)
   * @param {number}   opts.settleAt — ms to wait for settle snapshot (default 500)
   */
  async function triggerAndCapture(triggerFn, opts) {
    const captureAt = opts?.captureAt ?? 50;
    const settleAt = opts?.settleAt ?? 500;

    // Before
    const before = snapshot('before');

    // Trigger
    triggerFn();

    // During — capture within the transition window
    await new Promise(r => setTimeout(r, captureAt));
    const during = snapshot('during');

    // After — wait for transitions to settle
    await new Promise(r => setTimeout(r, settleAt - captureAt));
    const after = snapshot('after');

    // Compute diffs
    const diffs = watchedElements.map(({ selector, el }, i) => {
      const b = before.elements[i]?.computed || {};
      const a = after.elements[i]?.computed || {};
      const changes = {};
      for (const p of MOTION_PROPS) {
        if (b[p] !== a[p]) changes[p] = { from: b[p], to: a[p] };
      }
      const inlineChanged = before.elements[i]?.inlineStyle !== after.elements[i]?.inlineStyle;

      return {
        selector,
        ...describeEl(el),
        inlineChanged,
        inlineBefore: before.elements[i]?.inlineStyle,
        inlineAfter: after.elements[i]?.inlineStyle,
        computedChanges: changes,
        hasChanges: Object.keys(changes).length > 0 || inlineChanged
      };
    }).filter(d => d.hasChanges);

    return {
      trigger: triggerFn.toString().slice(0, 200),
      timing: { captureAt, settleAt },
      diffs,
      duringAnimations: during.animations,
      afterAnimations: after.animations
    };
  }

  window.__seDiff = {
    installed: true,
    watch,
    snapshot,
    triggerAndCapture
  };
})();

// Style Extractor: Motion tools (paste into evaluate_script when extracting dynamic UIs)
//
// Exposes:
// - window.__seMotion.install(): installs helpers (idempotent)
// - window.__seMotion.capture(label): captures document.getAnimations() snapshot
// - window.__seMotion.sample(targets, opts): multi-target rAF sampling + change summary
// - window.__seMotion.runScenario(opts): baseline -> trigger -> checkpoints + sampling
//
// This file is intentionally framework-agnostic and safe to paste as an IIFE.

(() => {
  if (window.__seMotion?.installed) return;

  const DEFAULT_INCLUDE = ['transform', 'opacity', 'filter', 'clipPath', 'backgroundColor'];

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
      depth += 1;
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
        backgroundColor: s.backgroundColor,
        willChange: s.willChange
      }
    };
  }

  function normalizeInclude(include) {
    const list = Array.isArray(include) ? include : DEFAULT_INCLUDE;
    const seen = new Set();
    const out = [];
    for (const item of list) {
      const key = String(item || '').trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(key);
    }
    return out.length ? out : DEFAULT_INCLUDE.slice();
  }

  function collectTargets(input, out) {
    if (!input) return;
    if (Array.isArray(input)) {
      for (const item of input) collectTargets(item, out);
      return;
    }
    if (typeof input === 'string') {
      const nodes = document.querySelectorAll(input);
      for (const node of nodes) out.push(node);
      return;
    }
    if (input.nodeType === 1) out.push(input);
  }

  function resolveTargets(input) {
    const collected = [];
    collectTargets(input, collected);
    const seen = new Set();
    const out = [];
    for (const el of collected) {
      if (!el || seen.has(el)) continue;
      seen.add(el);
      out.push(el);
    }
    return out;
  }

  function readProp(style, prop) {
    if (prop in style) return style[prop];
    const cssName = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
    return style.getPropertyValue(cssName);
  }

  function takeStyleSnapshot(el, include, t) {
    const s = getComputedStyle(el);
    const row = { t };
    for (const key of include) row[key] = readProp(s, key);
    return row;
  }

  function buildSummary(rows, include) {
    const changedProps = [];
    const propertyChanges = {};
    const turningPoints = [];

    for (const prop of include) {
      const first = rows[0]?.[prop] ?? null;
      const last = rows[rows.length - 1]?.[prop] ?? null;
      let prev = first;
      const events = [];

      for (let i = 1; i < rows.length; i += 1) {
        const next = rows[i]?.[prop] ?? null;
        if (next !== prev) {
          events.push({ t: rows[i].t, from: prev, to: next });
          prev = next;
        }
      }

      if (events.length) changedProps.push(prop);
      propertyChanges[prop] = {
        from: first,
        to: last,
        changeCount: events.length,
        firstChangeAtMs: events[0]?.t ?? null,
        lastChangeAtMs: events[events.length - 1]?.t ?? null
      };
      for (const evt of events) {
        turningPoints.push({ t: evt.t, prop, value: evt.to });
      }
    }

    turningPoints.sort((a, b) => a.t - b.t);
    return {
      changedPropCount: changedProps.length,
      changedProps,
      propertyChanges,
      turningPoints: turningPoints.slice(0, 40)
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
        const target = (() => {
          try {
            return effect?.target ?? null;
          } catch {
            return null;
          }
        })();
        const keyframes = (() => {
          try {
            return effect?.getKeyframes?.() ?? null;
          } catch {
            return null;
          }
        })();
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

  async function sample(targetInput, opts) {
    const targets = resolveTargets(targetInput);
    if (!targets.length) return { ok: false, reason: 'targets not found' };

    const ms = Math.max(120, opts?.durationMs ?? 800);
    const include = normalizeInclude(opts?.include);
    const rowsByTarget = targets.map(() => []);
    const start = performance.now();

    await new Promise(resolve => {
      function step() {
        const now = performance.now();
        const t = Math.round(now - start);
        for (let i = 0; i < targets.length; i += 1) {
          rowsByTarget[i].push(takeStyleSnapshot(targets[i], include, t));
        }
        if (now - start >= ms) return resolve();
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });

    const samples = rowsByTarget.map((rows, index) => ({
      targetIndex: index,
      target: describeTarget(targets[index]),
      rows
    }));

    const summaries = rowsByTarget.map((rows, index) => ({
      targetIndex: index,
      target: describeTarget(targets[index]),
      ...buildSummary(rows, include)
    }));

    const aggregateTurningPoints = [];
    for (const summary of summaries) {
      for (const point of summary.turningPoints) {
        aggregateTurningPoints.push({ targetIndex: summary.targetIndex, ...point });
      }
    }
    aggregateTurningPoints.sort((a, b) => a.t - b.t);

    return {
      ok: true,
      durationMs: ms,
      include,
      targetCount: targets.length,
      changedTargetCount: summaries.filter(s => s.changedPropCount > 0).length,
      aggregateTurningPoints: aggregateTurningPoints.slice(0, 80),
      samples,
      summaries
    };
  }

  function normalizeTrigger(trigger) {
    if (!trigger) return { type: 'none' };
    if (typeof trigger === 'string') return { type: 'click', selector: trigger };
    return trigger;
  }

  function triggerTarget(trigger) {
    if (!trigger) return null;
    if (trigger.element && trigger.element.nodeType === 1) return trigger.element;
    if (trigger.selector) return document.querySelector(trigger.selector);
    return null;
  }

  function performTrigger(input) {
    const trigger = normalizeTrigger(input);
    const type = trigger.type || 'none';

    if (type === 'none') return { ok: true, type: 'none' };

    const target = triggerTarget(trigger);
    const out = {
      ok: false,
      type,
      selector: trigger.selector || null,
      target: describeTarget(target)
    };

    try {
      if (type === 'click') {
        if (!target) return { ...out, reason: 'click target not found' };
        target.scrollIntoView({ block: 'center', inline: 'center' });
        target.click();
        return { ...out, ok: true };
      }

      if (type === 'hover') {
        if (!target) return { ...out, reason: 'hover target not found' };
        const over = new MouseEvent('mouseover', { bubbles: true, cancelable: true, view: window });
        const enter = new MouseEvent('mouseenter', { bubbles: true, cancelable: true, view: window });
        target.dispatchEvent(over);
        target.dispatchEvent(enter);
        return { ...out, ok: true };
      }

      if (type === 'focus') {
        if (!target) return { ...out, reason: 'focus target not found' };
        target.focus({ preventScroll: false });
        return { ...out, ok: true };
      }

      if (type === 'scrollBy') {
        const top = Number(trigger.deltaY ?? 240);
        const left = Number(trigger.deltaX ?? 0);
        window.scrollBy({ top, left, behavior: 'auto' });
        return { ...out, ok: true, deltaX: left, deltaY: top };
      }

      return { ...out, reason: `unsupported trigger type: ${type}` };
    } catch (err) {
      return { ...out, reason: String(err && err.message ? err.message : err) };
    }
  }

  function waitMs(ms) {
    return new Promise(resolve => setTimeout(resolve, Math.max(0, ms)));
  }

  function normalizeCheckpoints(input) {
    const raw = Array.isArray(input) ? input : [0, 100, 300, 600];
    const out = [];
    const seen = new Set();
    for (const item of raw) {
      const n = Math.max(0, Math.round(Number(item)));
      if (!Number.isFinite(n) || seen.has(n)) continue;
      seen.add(n);
      out.push(n);
    }
    out.sort((a, b) => a - b);
    return out.length ? out : [0, 100, 300, 600];
  }

  async function runScenario(opts) {
    const options = opts || {};
    const label = options.label || 'scenario';
    const checkpointsMs = normalizeCheckpoints(options.checkpointsMs);
    const include = normalizeInclude(options.include);
    const targets = options.targets ?? options.targetSelectors ?? options.target ?? [];

    const baseline = capture(`${label}:baseline`);
    const trigger = performTrigger(options.trigger);

    const maxCheckpoint = checkpointsMs[checkpointsMs.length - 1] || 0;
    const durationMs = Math.max(120, options.durationMs ?? maxCheckpoint, maxCheckpoint);

    const checkpointPromise = Promise.all(
      checkpointsMs.map(async ms => {
        await waitMs(ms);
        return { checkpointMs: ms, snapshot: capture(`${label}:t${ms}`) };
      })
    );

    const samplePromise = sample(targets, { durationMs, include });
    const [checkpoints, sampled] = await Promise.all([checkpointPromise, samplePromise]);

    return {
      ok: true,
      label,
      url: location.href,
      trigger,
      baseline,
      checkpoints,
      sampled,
      durationMs
    };
  }

  window.__seMotion = {
    installed: true,
    version: '2.0.0',
    install: () => ({ ok: true, version: '2.0.0' }),
    capture,
    sample,
    runScenario
  };
})();


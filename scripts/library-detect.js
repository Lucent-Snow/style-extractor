// Style Extractor: library + fingerprint detection (paste into evaluate_script)
(() => {
  function cssPath(el) {
    if (!el || el.nodeType !== 1) return null;
    if (el.id) return `#${CSS.escape(el.id)}`;
    const parts = [];
    let cur = el;
    let depth = 0;
    while (cur && cur.nodeType === 1 && depth < 5) {
      let part = cur.tagName.toLowerCase();
      if (cur.classList && cur.classList.length) {
        part += Array.from(cur.classList).slice(0, 2).map(c => `.${CSS.escape(c)}`).join('');
      }
      parts.unshift(part);
      cur = cur.parentElement;
      depth += 1;
    }
    return parts.join(' > ');
  }

  function hasKeyword(urls, keyword) {
    const k = String(keyword).toLowerCase();
    return urls.some(url => String(url).toLowerCase().includes(k));
  }

  function toClassName(value) {
    return value ? String(value).trim().replace(/\s+/g, ' ').slice(0, 160) : null;
  }

  const assets = {
    scripts: Array.from(document.scripts).map(s => s.src).filter(Boolean),
    stylesheets: Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href).filter(Boolean)
  };
  const allAssetUrls = assets.scripts.concat(assets.stylesheets);

  const globals = {
    Swiper: typeof window.Swiper !== 'undefined',
    gsap: typeof window.gsap !== 'undefined',
    ScrollTrigger: typeof window.ScrollTrigger !== 'undefined',
    anime: typeof window.anime !== 'undefined',
    THREE: typeof window.THREE !== 'undefined',
    lottie: typeof window.lottie !== 'undefined',
    FramerMotion: typeof window.framerMotion !== 'undefined' || typeof window.Motion !== 'undefined',
    barba: typeof window.barba !== 'undefined',
    LocomotiveScroll: typeof window.LocomotiveScroll !== 'undefined'
  };

  const dom = {
    swiper: !!document.querySelector('.swiper, .swiper-wrapper, .swiper-slide'),
    framer: !!document.querySelector('[data-framer-name], [data-framer-component-type]'),
    barba: !!document.querySelector('[data-barba], [data-barba="wrapper"], [data-barba="container"]'),
    locomotive: !!document.querySelector('[data-scroll-container], [data-scroll-section], [data-scroll]'),
    video: document.querySelectorAll('video').length,
    canvas: document.querySelectorAll('canvas').length,
    svg: document.querySelectorAll('svg').length
  };

  const fingerprints = {
    hasSwiperThemeVar: (() => {
      try {
        const v = getComputedStyle(document.documentElement).getPropertyValue('--swiper-theme-color');
        return Boolean(v && v.trim());
      } catch {
        return false;
      }
    })(),
    assetHints: {
      swiper: hasKeyword(allAssetUrls, 'swiper'),
      gsap: hasKeyword(assets.scripts, 'gsap'),
      lottie: hasKeyword(assets.scripts, 'lottie'),
      three: hasKeyword(assets.scripts, 'three'),
      framerMotion: hasKeyword(allAssetUrls, 'framer-motion') || hasKeyword(allAssetUrls, 'framer'),
      barba: hasKeyword(allAssetUrls, 'barba'),
      locomotiveScroll: hasKeyword(allAssetUrls, 'locomotive-scroll') || hasKeyword(allAssetUrls, 'locomotive')
    }
  };

  const libraryEvidence = {
    swiper: {
      global: globals.Swiper,
      dom: dom.swiper || fingerprints.hasSwiperThemeVar,
      asset: fingerprints.assetHints.swiper
    },
    gsap: {
      global: globals.gsap || globals.ScrollTrigger,
      dom: false,
      asset: fingerprints.assetHints.gsap
    },
    lottie: {
      global: globals.lottie,
      dom: !!document.querySelector('lottie-player, [data-lottie], [class*="lottie"]'),
      asset: fingerprints.assetHints.lottie
    },
    three: {
      global: globals.THREE,
      dom: dom.canvas > 0,
      asset: fingerprints.assetHints.three
    },
    framerMotion: {
      global: globals.FramerMotion,
      dom: dom.framer,
      asset: fingerprints.assetHints.framerMotion
    },
    barba: {
      global: globals.barba,
      dom: dom.barba,
      asset: fingerprints.assetHints.barba
    },
    locomotiveScroll: {
      global: globals.LocomotiveScroll,
      dom: dom.locomotive,
      asset: fingerprints.assetHints.locomotiveScroll
    }
  };

  const detections = Object.entries(libraryEvidence).map(([name, evidence]) => {
    const hits = [];
    if (evidence.global) hits.push('global');
    if (evidence.dom) hits.push('dom');
    if (evidence.asset) hits.push('asset');
    const score = hits.length;
    const level = score >= 2 ? 'high' : score === 1 ? 'medium' : 'none';
    return {
      name,
      detected: score > 0,
      level,
      score,
      evidence,
      evidenceTypes: hits
    };
  });

  function collectRuntimeMotionHints() {
    const anims = document.getAnimations({ subtree: true });
    const transformTargets = [];
    for (const anim of anims) {
      const effect = anim.effect;
      const target = (() => {
        try {
          return effect?.target ?? null;
        } catch {
          return null;
        }
      })();
      const keyframes = (() => {
        try {
          return effect?.getKeyframes?.() ?? [];
        } catch {
          return [];
        }
      })();
      const propSet = new Set();
      for (const kf of keyframes) {
        for (const key of Object.keys(kf)) {
          if (key === 'offset' || key === 'easing' || key === 'composite' || key === 'computedOffset') continue;
          propSet.add(key);
        }
      }
      if (!propSet.has('transform') && !propSet.has('opacity') && !propSet.has('filter')) continue;
      transformTargets.push({
        animationName: anim.animationName || null,
        playState: anim.playState,
        props: Array.from(propSet).sort(),
        target: target
          ? {
              tag: target.tagName ? target.tagName.toLowerCase() : null,
              id: target.id || null,
              className: toClassName(target.className),
              path: cssPath(target)
            }
          : null
      });
    }
    return {
      animationCount: anims.length,
      sampledMotionAnimations: transformTargets.slice(0, 40)
    };
  }

  function collectSuspiciousMotionNodes(limit) {
    const nodes = Array.from(document.querySelectorAll('*')).slice(0, 2500);
    const out = [];
    for (const el of nodes) {
      const s = getComputedStyle(el);
      const will = s.willChange || '';
      const anim = s.animationName || '';
      const transitionProp = s.transitionProperty || '';
      const transitionDuration = s.transitionDuration || '';
      const className = toClassName(el.className || '');
      const id = el.id || '';
      let score = 0;

      if (/transform|opacity|filter|clip-path/.test(will)) score += 3;
      if (anim && anim !== 'none') score += 3;
      if (transitionDuration && transitionDuration !== '0s' && /(transform|opacity|filter|all)/.test(transitionProp)) score += 2;
      if (/animate|motion|parallax|scroll|reveal|fade|slide|carousel|swiper|hero/i.test(`${className} ${id}`)) score += 1;
      if (el.hasAttribute('data-scroll') || el.hasAttribute('data-animate') || el.hasAttribute('data-aos')) score += 1;

      if (score <= 0) continue;
      out.push({
        score,
        tag: el.tagName.toLowerCase(),
        id: id || null,
        className,
        path: cssPath(el),
        styleHints: {
          willChange: will || null,
          animationName: anim || null,
          transitionProperty: transitionProp || null,
          transitionDuration: transitionDuration || null,
          transform: s.transform || null,
          opacity: s.opacity || null
        }
      });
    }
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, Math.max(1, limit || 25));
  }

  return {
    globals,
    dom,
    assets,
    fingerprints,
    detections,
    runtimeMotionHints: collectRuntimeMotionHints(),
    suspiciousMotionNodes: collectSuspiciousMotionNodes(25)
  };
})();


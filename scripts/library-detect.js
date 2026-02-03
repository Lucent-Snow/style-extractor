// Style Extractor: basic library + fingerprint detection (paste into evaluate_script)
(() => {
  const globals = {
    Swiper: typeof window.Swiper !== 'undefined',
    gsap: typeof window.gsap !== 'undefined',
    ScrollTrigger: typeof window.ScrollTrigger !== 'undefined',
    anime: typeof window.anime !== 'undefined',
    THREE: typeof window.THREE !== 'undefined',
    lottie: typeof window.lottie !== 'undefined'
  };

  const dom = {
    swiper: !!document.querySelector('.swiper, .swiper-wrapper, .swiper-slide'),
    video: document.querySelectorAll('video').length,
    canvas: document.querySelectorAll('canvas').length,
    svg: document.querySelectorAll('svg').length
  };

  const assets = {
    scripts: Array.from(document.scripts).map(s => s.src).filter(Boolean),
    stylesheets: Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href).filter(Boolean)
  };

  function hasKeyword(urls, kw) {
    const k = kw.toLowerCase();
    return urls.some(u => String(u).toLowerCase().includes(k));
  }

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
      swiper: hasKeyword(assets.scripts.concat(assets.stylesheets), 'swiper'),
      gsap: hasKeyword(assets.scripts, 'gsap'),
      lottie: hasKeyword(assets.scripts, 'lottie'),
      three: hasKeyword(assets.scripts, 'three')
    }
  };

  return { globals, dom, fingerprints, assets };
})();


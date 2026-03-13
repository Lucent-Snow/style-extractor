// Style Extractor: library + fingerprint detection (paste into evaluate_script)
//
// Detects animation libraries and extracts configs when possible.
// Detection strategies: global objects → DOM instances → DOM fingerprints → asset hints.
//
// Returns { globals, instances, dom, fingerprints, assets }.

(() => {
  const globals = {
    Swiper: typeof window.Swiper !== 'undefined',
    gsap: typeof window.gsap !== 'undefined',
    ScrollTrigger: typeof window.ScrollTrigger !== 'undefined',
    anime: typeof window.anime !== 'undefined',
    THREE: typeof window.THREE !== 'undefined',
    lottie: typeof window.lottie !== 'undefined',
    AOS: typeof window.AOS !== 'undefined'
  };

  // ── DOM instance extraction (works even when globals are bundled away) ──

  const instances = {};

  // Swiper: read config from el.swiper
  const swiperEls = document.querySelectorAll('.swiper');
  const swiperInstances = [];
  for (const el of swiperEls) {
    const inst = el.swiper;
    if (inst) {
      swiperInstances.push({
        container: String(el.className).slice(0, 120),
        slides: inst.slides?.length ?? null,
        params: {
          slidesPerView: inst.params?.slidesPerView,
          spaceBetween: inst.params?.spaceBetween,
          speed: inst.params?.speed,
          loop: inst.params?.loop,
          effect: inst.params?.effect,
          direction: inst.params?.direction,
          autoplay: inst.params?.autoplay ? {
            delay: inst.params.autoplay.delay,
            disableOnInteraction: inst.params.autoplay.disableOnInteraction
          } : false,
          freeMode: inst.params?.freeMode?.enabled ?? inst.params?.freeMode ?? false,
          pagination: !!inst.params?.pagination?.el,
          navigation: !!(inst.params?.navigation?.nextEl || inst.params?.navigation?.prevEl)
        }
      });
    }
  }
  if (swiperInstances.length) instances.swiper = swiperInstances;

  // AOS: read config from data-aos-* attributes
  const aosEls = document.querySelectorAll('[data-aos]');
  if (aosEls.length) {
    instances.aos = [...aosEls].slice(0, 20).map(el => ({
      element: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0].slice(0, 40) : ''),
      animation: el.dataset.aos,
      duration: el.dataset.aosDuration || null,
      delay: el.dataset.aosDelay || null,
      easing: el.dataset.aosEasing || null,
      once: el.dataset.aosOnce || null,
      offset: el.dataset.aosOffset || null
    }));
  }

  // Framer Motion: read data-framer-* attributes
  const framerEls = document.querySelectorAll('[data-framer-appear-id], [data-framer-component-type]');
  if (framerEls.length) {
    instances.framerMotion = {
      count: framerEls.length,
      examples: [...framerEls].slice(0, 5).map(el => ({
        tag: el.tagName.toLowerCase(),
        className: String(el.className || '').slice(0, 80),
        appearId: el.dataset.framerAppearId || null,
        componentType: el.dataset.framerComponentType || null
      }))
    };
  }

  // ── DOM fingerprints ──

  const dom = {
    swiper: swiperEls.length,
    swiperWithInstance: swiperInstances.length,
    aos: aosEls.length,
    framer: framerEls.length,
    video: document.querySelectorAll('video').length,
    canvas: document.querySelectorAll('canvas').length,
    svg: document.querySelectorAll('svg').length,
    lottiePlayer: document.querySelectorAll('lottie-player, dotlottie-player').length
  };

  // ── Asset + CSS variable hints ──

  const scriptUrls = Array.from(document.scripts).map(s => s.src).filter(Boolean);
  const styleUrls = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href).filter(Boolean);
  const allUrls = scriptUrls.concat(styleUrls);

  function hasKeyword(urls, kw) {
    const k = kw.toLowerCase();
    return urls.some(u => String(u).toLowerCase().includes(k));
  }

  const fingerprints = {
    hasSwiperThemeVar: (() => {
      try {
        const v = getComputedStyle(document.documentElement).getPropertyValue('--swiper-theme-color');
        return Boolean(v && v.trim());
      } catch { return false; }
    })(),
    assetHints: {
      swiper: hasKeyword(allUrls, 'swiper'),
      gsap: hasKeyword(scriptUrls, 'gsap'),
      lottie: hasKeyword(scriptUrls, 'lottie'),
      three: hasKeyword(scriptUrls, 'three'),
      anime: hasKeyword(scriptUrls, 'anime'),
      framer: hasKeyword(scriptUrls, 'framer'),
      aos: hasKeyword(allUrls, 'aos')
    }
  };

  const assets = {
    scripts: scriptUrls,
    stylesheets: styleUrls
  };

  return { globals, instances, dom, fingerprints, assets };
})();

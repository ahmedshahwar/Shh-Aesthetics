import Lenis from 'lenis';

let lenis = null;

export function initSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return lenis;

  lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4) });

  const raf = (time) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export function setScrollLocked(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export function scrollToTarget(target) {
  if (target === '#top' || target === 0) {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.resize(); // page height may have just changed (route switch)
    lenis.scrollTo(el, { duration: 1.6, force: true });
  }
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(0, { immediate, force: true });
  }
  else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
}

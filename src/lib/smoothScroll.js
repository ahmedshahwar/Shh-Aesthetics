/*
 * Inertia smooth scrolling (Lenis) for mouse wheels and trackpads. It loads after the
 * page is idle so it never delays the first paint, and it is skipped for visitors who
 * ask for reduced motion. Touch scrolling stays native.
 */
let lenis = null;
let destroyed = false;

export async function initSmoothScroll() {
  destroyed = false;
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const { default: Lenis } = await import('lenis');
  if (destroyed || lenis) return;
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, autoRaf: true });
}

export function destroySmoothScroll() {
  destroyed = true;
  lenis?.destroy();
  lenis = null;
}

export function setScrollLocked(locked) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export function scrollToTarget(target, instant = false) {
  const el = target === '#top' || target === 0 ? 0 : typeof target === 'string' ? document.querySelector(target) : target;
  if (el === null) return;
  if (lenis) {
    lenis.scrollTo(el, { immediate: instant, duration: 1.4, force: true });
    return;
  }
  const behavior = instant ? 'instant' : 'smooth';
  if (el === 0) window.scrollTo({ top: 0, behavior });
  else el.scrollIntoView({ behavior });
}

export function scrollToTop(immediate = false) {
  scrollToTarget(0, immediate);
}

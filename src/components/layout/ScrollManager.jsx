import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget, scrollToTop } from '../../lib/smoothScroll';

/** Resets scroll on page change and honours #hash targets after render. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    const instant = firstLoad.current;
    firstLoad.current = false;

    if (!hash) {
      scrollToTop(true);
      return;
    }
    const t = setTimeout(() => scrollToTarget(hash, instant), instant ? 0 : 150);
    return () => clearTimeout(t);
  }, [pathname, hash, key]);

  return null;
}

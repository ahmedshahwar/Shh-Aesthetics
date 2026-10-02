import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget, scrollToTop } from '../../lib/smoothScroll';

/**
 * Resets scroll on page change and honours #hash targets.
 * Arriving from another page (or a fresh load) jumps straight to the section;
 * a hash link on the current page glides there.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    const changedPage = lastPath.current !== pathname;
    lastPath.current = pathname;

    if (!hash) {
      scrollToTop(true);
      return;
    }

    // The new page is committed by now; a zero timer lets any layout effects settle first.
    const t = setTimeout(() => scrollToTarget(hash, changedPage), 0);
    return () => clearTimeout(t);
  }, [pathname, hash, key]);

  return null;
}

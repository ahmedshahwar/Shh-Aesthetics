import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget, scrollToTop } from '../../lib/smoothScroll';

/** Resets scroll on page change and honours #hash targets after render. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      scrollToTop(true);
      return;
    }
    const t = setTimeout(() => scrollToTarget(hash), 300);
    return () => clearTimeout(t);
  }, [pathname, hash, key]);

  return null;
}

import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToTarget } from '../lib/smoothScroll';

/**
 * One navigate function for every link on the site.
 * "/#faq" smooth-scrolls when you're already home, otherwise routes home
 * and <ScrollManager> finishes the scroll once the page has rendered.
 */
export function useSiteNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (href) => {
      const [path = '/', hash = ''] = href.split('#');
      const target = path || '/';
      if (target === pathname) {
        scrollToTarget(hash ? `#${hash}` : '#top');
        return;
      }
      navigate(hash ? `${target}#${hash}` : target);
    },
    [navigate, pathname]
  );
}

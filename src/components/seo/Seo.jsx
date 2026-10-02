import { useEffect } from 'react';
import { PAGE_SEO, SITE_URL } from '../../constants/seo';

const setAttr = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Keeps the head tags in step with in-app navigation. The first load already has
 * the right tags, because every page is pre-rendered with its own head at build time.
 */
export default function Seo({ page }) {
  useEffect(() => {
    const seo = PAGE_SEO[page];
    if (!seo) return;

    document.title = seo.title;
    setAttr('meta[name="description"]', 'content', seo.description);
    setAttr('meta[property="og:title"]', 'content', seo.title);
    setAttr('meta[property="og:description"]', 'content', seo.description);
    setAttr('meta[name="twitter:title"]', 'content', seo.title);
    setAttr('meta[name="twitter:description"]', 'content', seo.description);

    if (seo.path) {
      const url = `${SITE_URL}${seo.path}`;
      setAttr('link[rel="canonical"]', 'href', url);
      setAttr('meta[property="og:url"]', 'content', url);
    }
  }, [page]);

  return null;
}

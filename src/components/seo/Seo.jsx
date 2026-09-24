import { useEffect } from 'react';
import { PAGE_SEO, SITE_URL } from '../../constants/seo';

const setMeta = (selector, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(selector.startsWith('link') ? 'href' : 'content', value);
};

// The FAQ structured data in index.html describes the home page FAQ,
// so it's only kept in the page while the home page is showing.
let faqScript = null;

/**
 * Updates the tags that already exist in index.html for the current page:
 * title, description, canonical URL, and the social preview (Open Graph / X).
 * Renders nothing.
 */
export default function Seo({ page }) {
  useEffect(() => {
    const seo = PAGE_SEO[page];
    if (!seo) return;
    const url = `${SITE_URL}${seo.path}`;

    document.title = seo.title;
    setMeta('meta[name="description"]', seo.description);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:title"]', seo.title);
    setMeta('meta[property="og:description"]', seo.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', seo.title);
    setMeta('meta[name="twitter:description"]', seo.description);

    const current = document.getElementById('ld-faq');
    if (page === 'home') {
      if (!current && faqScript) document.head.appendChild(faqScript);
    } else if (current) {
      faqScript = current;
      current.remove();
    }
  }, [page]);

  return null;
}

/*
 * Writes a complete HTML file for every route after `vite build`, so search engines
 * and AI crawlers get real content, headings, links and per-page tags without
 * running JavaScript. Vercel serves /contact from contact.html (cleanUrls) and
 * 404.html with a real 404 status.
 */
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const { PAGE_SEO, ROUTE_PAGES, SITE_URL } = await import(pathToFileURL(resolve(root, 'src/constants/seo.js')).href);
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function pageMeta(seo) {
  const url = seo.path ? `${SITE_URL}${seo.path}` : null;
  const t = escapeAttr(seo.title);
  const d = escapeAttr(seo.description);
  return [
    `<title>${escapeText(seo.title)}</title>`,
    `<meta name="description" content="${d}" />`,
    url && `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

const routes = [
  ...Object.entries(ROUTE_PAGES).map(([url, page]) => ({ url, page, file: url === '/' ? 'index.html' : `${url.slice(1)}.html` })),
  { url: '/404', page: 'notFound', file: '404.html' },
];

for (const { url, page, file } of routes) {
  // React emits resource hints (e.g. the hero image preload) inline; move them into <head>.
  const hints = [];
  const body = render(url).replace(/<link rel="preload"[^>]*\/>/g, (tag) => {
    hints.push(tag);
    return '';
  });

  const html = template
    .replace(/<!--page-meta-->[\s\S]*?<!--\/page-meta-->/, pageMeta(PAGE_SEO[page]))
    .replace('</head>', `${hints.map((h) => `  ${h}\n`).join('')}  </head>`)
    .replace('<!--app-->', body);

  writeFileSync(resolve(dist, file), html);
  console.log(`prerendered ${url} -> dist/${file}`);
}

rmSync(ssrDir, { recursive: true, force: true });

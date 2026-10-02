import { SITE_URL } from '../../constants/seo';
import SiteLink from '../ui/SiteLink';
import JsonLd from './JsonLd';

/** items: [{ name, path }], ending with the current page. Home is added automatically. */
export default function Breadcrumbs({ items, className = '' }) {
  const trail = [{ name: 'Home', path: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={`breadcrumbs ${className}`}>
      <ol>
        {trail.map((item, i) =>
          i === trail.length - 1 ? (
            <li key={item.path} aria-current="page">{item.name}</li>
          ) : (
            <li key={item.path}>
              <SiteLink href={item.path}>{item.name}</SiteLink>
            </li>
          )
        )}
      </ol>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
          })),
        }}
      />
    </nav>
  );
}

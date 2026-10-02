import { useSiteNav } from '../../hooks/useSiteNav';

/** A real <a href> (crawlable, keyboard and middle-click friendly) that routes and smooth-scrolls in-app. */
export default function SiteLink({ href, onClick, children, ...rest }) {
  const go = useSiteNav();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

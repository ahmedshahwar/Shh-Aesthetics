import { useSiteNav } from '../../hooks/useSiteNav';
import styles from './Button.module.css';

/** variant: 'champagne' | 'ink' | 'outline' | 'outlineDark' */
export default function Button({ children, href, onClick, variant = 'champagne', className = '', ...rest }) {
  const go = useSiteNav();
  const Tag = href ? 'a' : 'button';
  const external = href?.startsWith('http');
  const internal = href?.startsWith('/');

  const handleClick = (e) => {
    onClick?.(e);
    if (internal && !e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      go(href);
    }
  };

  return (
    <Tag
      href={href}
      onClick={handleClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(!href ? { type: 'button' } : {})}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

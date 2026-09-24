import { motion } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useSiteNav } from '../../hooks/useSiteNav';
import styles from './MagneticButton.module.css';

/**
 * Pill / circle button with a magnetic pull, a colour-fill sweep and a
 * rolling label on hover.
 * variant: 'champagne' | 'ink' | 'ivory' | 'outline' | 'outlineDark'
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'champagne',
  shape = 'pill',
  strength = 0.3,
  className = '',
  ...rest
}) {
  const { ref, style, handlers } = useMagnetic(strength);
  const go = useSiteNav();
  const Tag = href ? motion.a : motion.button;
  const external = href?.startsWith('http');
  const internal = href?.startsWith('/');

  const handleClick = (e) => {
    if (internal && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      go(href);
    }
    onClick?.(e);
  };

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={handleClick}
      style={style}
      {...handlers}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${styles.btn} ${styles[variant]} ${styles[shape]} ${className}`}
      data-cursor="hide"
      {...rest}
    >
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.roll}>
        <span className={styles.label}>{children}</span>
        <span className={styles.label} aria-hidden="true">{children}</span>
      </span>
    </Tag>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { BRAND, CONTACT, NAV_LINKS } from '../../constants/content';
import { setScrollLocked } from '../../lib/smoothScroll';
import { EASE, EASE_IN_OUT } from '../../lib/motion';
import Button from '../ui/Button';
import SiteLink from '../ui/SiteLink';
import styles from './Navbar.module.css';

const MENU_LINKS = [
  { label: 'Home', href: '/' },
  ...NAV_LINKS.slice(0, -1),
  { label: 'Service areas', href: '/service-areas' },
  NAV_LINKS.at(-1),
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);
  const menuRef = useRef(null);

  // Tucks away on the way down, returns on the way up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  const setMenu = (next) => {
    setOpen(next);
    setScrollLocked(next);
    document.documentElement.toggleAttribute('data-menu-open', next);
  };

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenu(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href) => href === pathname;

  return (
    <>
      <m.header
        className={`${styles.header} ${solid || open ? styles.solid : ''}`}
        initial={false}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className={styles.bar}>
          <SiteLink href="/" className={styles.logo} onClick={() => setMenu(false)} aria-label="Shh Aesthetics home" translate="no">
            {BRAND.name}
          </SiteLink>

          <nav className={styles.links} aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <SiteLink
                key={l.href}
                href={l.href}
                className={styles.link}
                aria-current={isActive(l.href) ? 'page' : undefined}
              >
                {l.label}
              </SiteLink>
            ))}
          </nav>

          <div className={styles.right}>
            <Button href={CONTACT.bookUrl} className={styles.book}>
              {CONTACT.bookLabel}
            </Button>

            <button
              ref={burgerRef}
              type="button"
              className={styles.burger}
              onClick={() => setMenu(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className={styles.burgerText}>{open ? 'Close' : 'Menu'}</span>
              <span className={`${styles.burgerIcon} ${open ? styles.burgerOpen : ''}`} aria-hidden="true">
                <i /><i />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={menuRef}
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          >
            <nav className={styles.overlayNav} aria-label="Mobile">
              {MENU_LINKS.map((l, i) => (
                <div key={l.href} className={styles.overlayMask}>
                  <m.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: EASE }}
                  >
                    <SiteLink href={l.href} className={styles.overlayLink} onClick={() => setMenu(false)}>
                      {l.label}
                    </SiteLink>
                  </m.div>
                </div>
              ))}
            </nav>
            <div className={styles.overlayFoot}>
              <Button href={CONTACT.bookUrl} onClick={() => setMenu(false)}>{CONTACT.bookLabel}</Button>
              <a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a>
              <a href={CONTACT.smsHref}>Text</a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

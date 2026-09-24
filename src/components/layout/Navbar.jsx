import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { BRAND, CONTACT, NAV_LINKS } from '../../constants/content';
import { setScrollLocked } from '../../lib/smoothScroll';
import { useSiteNav } from '../../hooks/useSiteNav';
import { EASE, EASE_IN_OUT } from '../../lib/motion';
import MagneticButton from '../ui/MagneticButton';
import styles from './Navbar.module.css';

export default function Navbar({ ready }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Smart header: tucks away on the way down, returns on the way up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  const toggle = (next = !open) => {
    setOpen(next);
    setScrollLocked(next);
  };

  const siteNav = useSiteNav();
  const go = (href) => {
    toggle(false);
    // wait for the overlay to start closing before moving
    setTimeout(() => siteNav(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        className={`${styles.header} ${solid ? styles.solid : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: ready && !hidden ? 0 : -100, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: ready && !solid ? 0.9 : 0 }}
      >
        <div className={styles.bar}>
          <button className={styles.logo} onClick={() => go('/')} aria-label={`${BRAND.name}, back to top`}>
            {BRAND.name}
          </button>

          <nav className={styles.links} aria-label="Primary">
            {NAV_LINKS.map((l, i) => (
              <button key={l.href} className={styles.link} onClick={() => go(l.href)}>
                <sup>0{i + 1}</sup>
                <span className={styles.linkText} data-text={l.label}>{l.label}</span>
              </button>
            ))}
          </nav>

          <div className={styles.right}>
            <MagneticButton href={CONTACT.bookUrl} className={styles.book} strength={0.25}>
              Book a consult
            </MagneticButton>

            <button
              className={styles.burger}
              onClick={() => toggle()}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className={styles.burgerText}>{open ? 'Close' : 'Menu'}</span>
              <span className={`${styles.burgerIcon} ${open ? styles.burgerOpen : ''}`}>
                <i /><i />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: EASE_IN_OUT }}
          >
            <nav className={styles.overlayNav} aria-label="Mobile">
              {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map((l, i) => (
                <div key={l.href} className={styles.overlayMask}>
                  <motion.button
                    className={styles.overlayLink}
                    onClick={() => go(l.href)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease: EASE }}
                  >
                    <span>0{i + 1}</span>
                    {l.label}
                  </motion.button>
                </div>
              ))}
            </nav>
            <motion.div
              className={styles.overlayFoot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0 }}
            >
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <span>We come to you · {CONTACT.areasShort}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

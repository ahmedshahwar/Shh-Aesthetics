import { motion } from 'framer-motion';
import { BRAND, CONTACT, NAV_LINKS } from '../../constants/content';
import { useSiteNav } from '../../hooks/useSiteNav';
import { EASE } from '../../lib/motion';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const go = useSiteNav();

  return (
    <footer className={`sheet ${styles.footer}`}>
      <div className={`container ${styles.top}`}>
        <p className={styles.sign}>
          Still scrolling? <em>Your skin could be glowing by now.</em>
        </p>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h4>Explore</h4>
            {NAV_LINKS.map((l) => (
              <button key={l.href} onClick={() => go(l.href)} className={styles.link}>
                {l.label}
              </button>
            ))}
          </div>
          <div className={styles.col}>
            <h4>Say hi</h4>
            <a href={CONTACT.phoneHref} className={styles.link}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} className={styles.link}>Email Kelly</a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className={styles.link}>Facebook</a>
          </div>
          <div className={styles.col}>
            <h4>The fine print</h4>
            <button onClick={() => go('/privacy')} className={styles.link}>Privacy policy</button>
            <button onClick={() => go('/terms')} className={styles.link}>Terms &amp; conditions</button>
          </div>
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <motion.svg
          viewBox="0 0 1000 132"
          className={styles.wordmark}
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <text x="0" y="118" textLength="1000" lengthAdjust="spacingAndGlyphs">
            {BRAND.name.toUpperCase()}
          </text>
        </motion.svg>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {year} {BRAND.legal}</span>
        <span>House calls in {CONTACT.areasShort} counties</span>
        <button className={styles.toTop} onClick={() => go(window.location.pathname)}>
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}

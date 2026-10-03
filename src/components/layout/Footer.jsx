import { m } from 'framer-motion';
import { BRAND, CONTACT, MEDICAL_DISCLAIMER, NAV_LINKS } from '../../constants/content';
import { openCookieSettings } from '../../lib/consent';
import { scrollToTop } from '../../lib/smoothScroll';
import { EASE } from '../../lib/motion';
import SiteLink from '../ui/SiteLink';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`sheet ${styles.footer}`}>
      <div className={`container ${styles.top}`}>
        <p className={styles.sign}>
          Natural results. House calls. <em>Nobody has to know.</em>
        </p>

        <div className={styles.cols}>
          <nav className={styles.col} aria-labelledby="footer-explore">
            <h2 id="footer-explore">Explore</h2>
            <SiteLink href="/" className={styles.link}>Home</SiteLink>
            {NAV_LINKS.map((l) => (
              <SiteLink key={l.href} href={l.href} className={styles.link}>{l.label}</SiteLink>
            ))}
            <SiteLink href="/service-areas" className={styles.link}>Service areas</SiteLink>
          </nav>
          <div className={styles.col}>
            <h2>Get in touch</h2>
            <SiteLink href={CONTACT.bookUrl} className={styles.link}>{CONTACT.bookLabel}</SiteLink>
            <a href={CONTACT.phoneHref} className={styles.link}>Call Kelly</a>
            <a href={CONTACT.smsHref} className={styles.link}>Text Kelly</a>
            <a href={`mailto:${CONTACT.email}`} className={styles.link}>Email Kelly</a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className={styles.link}>Facebook</a>
          </div>
          <nav className={styles.col} aria-labelledby="footer-legal">
            <h2 id="footer-legal">Legal</h2>
            <SiteLink href="/privacy" className={styles.link}>Privacy policy</SiteLink>
            <SiteLink href="/terms" className={styles.link}>Terms &amp; conditions</SiteLink>
            <button type="button" className={styles.link} onClick={openCookieSettings}>Cookie settings</button>
          </nav>
        </div>
      </div>

      <div className={`container ${styles.disclaimer}`}>
        <p>
          <strong>Medical disclaimer.</strong> {MEDICAL_DISCLAIMER}
        </p>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <m.svg
          viewBox="0 0 1000 132"
          className={styles.wordmark}
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <text x="0" y="118" textLength="1000" lengthAdjust="spacingAndGlyphs">
            {BRAND.name.toUpperCase()}
          </text>
        </m.svg>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span suppressHydrationWarning>© {year} <span translate="no">{BRAND.legal}</span></span>
        <span>House calls in {CONTACT.areasShort} counties</span>
        <button type="button" className={styles.toTop} onClick={() => scrollToTop()}>
          Back to top
        </button>
      </div>
    </footer>
  );
}

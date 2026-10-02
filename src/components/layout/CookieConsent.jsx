import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { getConsentRaw, loadOptionalScripts, onOpenCookieSettings, saveConsent, subscribeConsent } from '../../lib/consent';
import { EASE } from '../../lib/motion';
import SiteLink from '../ui/SiteLink';
import Button from '../ui/Button';
import styles from './CookieConsent.module.css';

const SERVER = 'server';

export default function CookieConsent() {
  // Pre-rendered HTML never includes the bar; the browser decides after it reads the saved choice.
  const saved = useSyncExternalStore(subscribeConsent, getConsentRaw, () => SERVER);
  const [reopened, setReopened] = useState(false);
  const panelRef = useRef(null);

  const open = saved !== SERVER && (saved === null || reopened);

  useEffect(() => {
    if (!saved || saved === SERVER) return;
    try {
      if (JSON.parse(saved).analytics) loadOptionalScripts();
    } catch {
      /* unreadable saved choice: treat as no analytics */
    }
  }, [saved]);

  useEffect(() => onOpenCookieSettings(() => setReopened(true)), []);

  useEffect(() => {
    if (reopened) panelRef.current?.querySelector('button')?.focus();
  }, [reopened]);

  const choose = (analytics) => {
    saveConsent(analytics);
    setReopened(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <m.section
          ref={panelRef}
          className={styles.panel}
          aria-labelledby="cookie-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE, delay: reopened ? 0 : 0.8 } }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.25, ease: EASE } }}
        >
          <h2 id="cookie-title" className={styles.title}>A few cookies, no secrets.</h2>
          <p className={styles.text}>
            Necessary cookies keep the site and booking calendar working. With your OK, we also use
            analytics cookies to see what helps. Change this anytime in Cookie settings.{' '}
            <SiteLink href="/privacy#cookies">Privacy policy</SiteLink>
          </p>
          <div className={styles.actions}>
            <Button onClick={() => choose(true)}>Accept all</Button>
            <Button variant="outline" onClick={() => choose(false)}>Necessary only</Button>
          </div>
        </m.section>
      )}
    </AnimatePresence>
  );
}

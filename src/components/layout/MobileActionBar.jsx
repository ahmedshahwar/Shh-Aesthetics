import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT } from '../../constants/content';
import SiteLink from '../ui/SiteLink';
import styles from './MobileActionBar.module.css';

/**
 * Phone-only bar: Book, Call or Text in one tap from anywhere.
 * Steps aside while the booking calendar or the hero's own Book button is on screen,
 * so the same button never shows twice.
 */
export default function MobileActionBar() {
  const { pathname } = useLocation();
  const [away, setAway] = useState(false);

  useEffect(() => {
    const visible = new Set();
    const onChange = (entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setAway(visible.size > 0);
    };
    // The calendar only counts once it fills most of the screen; a hero button counts as soon as it shows
    const calendarIo = new IntersectionObserver(onChange, { rootMargin: '0px 0px -30% 0px' });
    const buttonIo = new IntersectionObserver(onChange);
    const calendar = document.getElementById('book');
    if (calendar) calendarIo.observe(calendar);
    document.querySelectorAll('[data-hide-action-bar]').forEach((el) => buttonIo.observe(el));
    return () => {
      calendarIo.disconnect();
      buttonIo.disconnect();
      setAway(false);
    };
  }, [pathname]);

  return (
    <nav
      className={`${styles.bar} ${away ? styles.away : ''} ${CONTACT.chatWidgetId ? styles.withChat : ''}`}
      aria-label="Quick contact"
    >
      <SiteLink href={CONTACT.bookUrl} className={`${styles.action} ${styles.book}`}>
        {CONTACT.bookLabel}
      </SiteLink>
      <a href={CONTACT.phoneHref} className={styles.action}>Call</a>
      <a href={CONTACT.smsHref} className={styles.action}>Text</a>
    </nav>
  );
}

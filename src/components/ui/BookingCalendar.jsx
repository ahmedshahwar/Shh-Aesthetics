import { useEffect } from 'react';
import styles from './BookingCalendar.module.css';

const GHL_EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * GoHighLevel booking widget slot.
 * Give it the widget URL and id (CONTACT.calendarEmbedUrl / calendarEmbedId) and it renders the iframe
 * plus GHL's auto-resize script. With no URL it shows a styled placeholder.
 */
export default function BookingCalendar({ src, id = 'shh-booking-calendar' }) {
  useEffect(() => {
    if (!src || document.querySelector(`script[src="${GHL_EMBED_SCRIPT}"]`)) return;
    const s = document.createElement('script');
    s.src = GHL_EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, [src]);

  return (
    <div className={styles.card}>
      <div className={styles.bar}>
        <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
        <span>Book your appointment</span>
        <span className={styles.secure}>Secure booking</span>
      </div>

      {src ? (
        <iframe
          src={src}
          title="Book an appointment with Shh Aesthetics"
          className={styles.frame}
          scrolling="no"
          allow="payment"
          id={id}
        />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.skeleton} aria-hidden="true">
            <div className={styles.month}>
              <span />
              <b>This month</b>
              <span />
            </div>
            <div className={styles.days}>
              {DAYS.map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className={styles.dates}>
              {Array.from({ length: 35 }, (_, i) => (
                <span key={i} className={[9, 12, 16, 19, 23, 26].includes(i) ? styles.open : ''} />
              ))}
            </div>
          </div>
          <p className={styles.note}>
            <strong>Your GHL calendar goes here.</strong>
            Paste the booking widget URL into <code>calendarEmbedUrl</code> in
            <code>src/constants/content.js</code>.
          </p>
        </div>
      )}
    </div>
  );
}

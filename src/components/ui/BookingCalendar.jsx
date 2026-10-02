import { useEffect } from 'react';
import styles from './BookingCalendar.module.css';

const GHL_EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';

/**
 * GoHighLevel booking widget.
 * Give it the widget URL and id (CONTACT.calendarEmbedUrl / calendarEmbedId) and it renders the iframe
 * plus GHL's auto-resize script.
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
      {src ? (
        <iframe
          src={src}
          title="Book a free consultation with Shh Aesthetics"
          className={styles.frame}
          scrolling="no"
          allow="payment"
          id={id}
        />
      ) : (
        <p className={styles.placeholder}>
          Online booking is being set up. In the meantime, call or email to book your consultation.
        </p>
      )}
    </div>
  );
}

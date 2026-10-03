import { useState } from 'react';
import { CONTACT, FAQS } from '../../constants/content';
import RevealLines from '../ui/RevealLines';
import styles from './Faq.module.css';

export default function Faq() {
  const [open, setOpen] = useState(FAQS[0].id);

  return (
    <section id="faq" className={`sheet theme-ink ${styles.section}`} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <RevealLines id="faq-title" className={`heading ${styles.heading}`} lines={["Questions you’re too polite to ask."]} />
          <p className={styles.note}>
            Something else on your mind? Call or text{' '}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>, or ask me at your free consultation.
          </p>
        </div>

        <ul className={styles.list}>
          {FAQS.map((f) => {
            const isOpen = open === f.id;
            return (
              <li key={f.id} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${f.id}`}
                    className={styles.q}
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${f.id}`}
                  >
                    <span className={styles.qText}>{f.q}</span>
                    <span className={styles.icon} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-a-${f.id}`}
                  className={styles.panel}
                  data-open={isOpen}
                  role="region"
                  aria-labelledby={`faq-q-${f.id}`}
                  inert={!isOpen}
                >
                  <div className={styles.a}>
                    <p>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CONTACT, CONTACT_PAGE } from '../../../constants/content';
import Breadcrumbs from '../../seo/Breadcrumbs';
import Button from '../../ui/Button';
import styles from './ContactHero.module.css';

const ROWS = [
  { label: 'Call or text', value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'House calls', value: `${CONTACT.areasShort} counties` },
  { label: 'Mailing address', value: CONTACT.address },
];

export default function ContactHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.7]);

  return (
    <section id="top" ref={ref} className={styles.hero} aria-labelledby="contact-page-title">
      <m.div className={styles.stage} style={reduce ? undefined : { scale }}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={`container ${styles.grid}`}>
          <div className={styles.copy}>
            <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} className={styles.crumbs} />

            <h1 id="contact-page-title" className={`label ${styles.kicker}`}>
              Book a free in-home consultation
            </h1>
            <p className={styles.title}>Spill it. I won't.</p>

            <p className={styles.intro}>{CONTACT_PAGE.intro}</p>
            {CONTACT.chatWidgetId && (
              <p className={styles.chat}>Prefer to type? Use the chat button in the corner of this page.</p>
            )}

            <div className={styles.ctas}>
              <Button href="/contact#book">Choose a time</Button>
            </div>
          </div>

          <dl className={styles.rows}>
            {ROWS.map((r) => (
              <div key={r.label} className={styles.row}>
                <dt className={styles.rowLabel}>{r.label}</dt>
                <dd className={styles.rowValue}>{r.href ? <a href={r.href}>{r.value}</a> : r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <m.div className={styles.dim} style={reduce ? { opacity: 0 } : { opacity: dim }} aria-hidden="true" />
      </m.div>
    </section>
  );
}

import { m } from 'framer-motion';
import { CONTACT } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import { clipReveal, fadeUp, inView } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import Button from '../ui/Button';
import SmartImage from '../ui/SmartImage';
import styles from './Contact.module.css';

const DETAILS = [
  { label: 'Serving', value: `${CONTACT.areasShort} counties` },
  { label: 'Call or text', value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
];

export default function Contact() {
  return (
    <section id="contact" className={`sheet theme-champagne ${styles.section}`} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <RevealLines id="contact-title" className={`heading ${styles.heading}`} lines={["Your secret's safe with me."]} />
          <m.p className={styles.sub} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
            Book a free consultation at home. Bring your questions and your screenshots.
            I'll bring everything else.
          </m.p>

          <div className={styles.cta}>
            <Button href={CONTACT.bookUrl} variant="ink">{CONTACT.bookLabel}</Button>
          </div>

          <dl className={styles.details}>
            {DETAILS.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.href ? <a href={d.href}>{d.value}</a> : d.value}</dd>
              </div>
            ))}
          </dl>

          <p className={styles.disclaimer}>{CONTACT.disclaimer}</p>
        </div>

        <m.div className={styles.visual} initial="hidden" whileInView="visible" viewport={inView}>
          <m.div className={styles.frame} variants={clipReveal}>
            <SmartImage src={IMAGES.contact} alt="A calm moment before a treatment" className={styles.img} />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

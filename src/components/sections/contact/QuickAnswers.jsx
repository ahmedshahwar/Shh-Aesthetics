import { m } from 'framer-motion';
import { CONTACT_PAGE, FAQS } from '../../../constants/content';
import { fadeUp, inView, staggerParent } from '../../../lib/motion';
import RevealLines from '../../ui/RevealLines';
import Button from '../../ui/Button';
import styles from './QuickAnswers.module.css';

const ANSWERS = CONTACT_PAGE.quickAnswers.map((id) => FAQS.find((f) => f.id === id)).filter(Boolean);

export default function QuickAnswers() {
  return (
    <section className={`sheet theme-champagne ${styles.section}`} aria-labelledby="quick-title">
      <div className={`container ${styles.head}`}>
        <RevealLines id="quick-title" className="heading" lines={['Before you book.']} />
        <Button href="/#faq" variant="outlineDark">Read all FAQs</Button>
      </div>

      <m.ul
        className={`container ${styles.grid}`}
        variants={staggerParent(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
      >
        {ANSWERS.map((f) => (
          <m.li key={f.id} className={styles.card} variants={fadeUp}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}

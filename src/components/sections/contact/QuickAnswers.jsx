import { motion } from 'framer-motion';
import { CONTACT_PAGE, FAQS } from '../../../constants/content';
import { fadeUp, inView, staggerParent } from '../../../lib/motion';
import RevealLines from '../../ui/RevealLines';
import MagneticButton from '../../ui/MagneticButton';
import styles from './QuickAnswers.module.css';

const ANSWERS = CONTACT_PAGE.quickAnswers
  .map((q) => FAQS.find((f) => f.q === q))
  .filter(Boolean);

export default function QuickAnswers() {
  return (
    <section className={`sheet ${styles.section}`}>
      <div className={`container ${styles.head}`}>
        <div>
          <p className="eyebrow"><span>(02)</span> Quick answers</p>
          <RevealLines
            className={styles.heading}
            lines={['Before you', <em key="e">hit book.</em>]}
          />
        </div>
        <MagneticButton href="/#faq" variant="outlineDark">All the FAQs</MagneticButton>
      </div>

      <motion.ul
        className={`container ${styles.grid}`}
        variants={staggerParent(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
      >
        {ANSWERS.map((f, i) => (
          <motion.li key={f.q} className={styles.card} variants={fadeUp}>
            <span className={styles.num}>0{i + 1}</span>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

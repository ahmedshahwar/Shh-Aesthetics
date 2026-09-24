import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT, FAQS } from '../../constants/content';
import { EASE, fadeUp, inView, staggerParent } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import MagneticButton from '../ui/MagneticButton';
import styles from './Faq.module.css';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={`sheet theme-ink ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <aside className={styles.side}>
          <p className="eyebrow"><span>(07)</span> FAQ</p>
          <RevealLines
            className={styles.heading}
            lines={["Questions you're", <em key="e" className="accent">too polite</em>, 'to ask.']}
          />
          <div className={styles.note}>
            <p>Still curious? Ask me in person. I'll bring the answers to your door.</p>
            <MagneticButton href={CONTACT.bookUrl} variant="outline">Ask Kelly</MagneticButton>
          </div>
        </aside>

        <motion.ul
          className={styles.list}
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li key={f.q} className={`${styles.item} ${isOpen ? styles.open : ''}`} variants={fadeUp}>
                <button
                  className={styles.q}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                >
                  <span className={styles.num}>0{i + 1}</span>
                  <span className={styles.qText}>{f.q}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      className={styles.a}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

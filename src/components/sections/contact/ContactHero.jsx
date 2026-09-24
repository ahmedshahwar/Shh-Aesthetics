import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTACT, CONTACT_PAGE } from '../../../constants/content';
import { EASE } from '../../../lib/motion';
import { scrollToTarget } from '../../../lib/smoothScroll';
import RevealLines from '../../ui/RevealLines';
import MagneticButton from '../../ui/MagneticButton';
import styles from './ContactHero.module.css';

const ROWS = [
  { label: 'Call', value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'Address', value: CONTACT.address, href: CONTACT.mapsUrl, external: true },
  { label: 'House calls', value: `${CONTACT.areasShort} counties` },
];

export default function ContactHero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.75]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section id="top" ref={ref} className={styles.hero}>
      <motion.div className={styles.stage} style={{ scale }}>
        <div className={styles.glow} aria-hidden="true" />

        <motion.div className={`container ${styles.grid}`} style={{ y }}>
          <div className={styles.copy}>
            <motion.p className={`eyebrow ${styles.eyebrow}`} {...fade(0.3)}>
              <span>(00)</span> Contact us
            </motion.p>

            <RevealLines
              as="h1"
              className={styles.title}
              play={ready}
              delay={0.4}
              lines={['Spill it.', <em key="e" className="accent">We won't.</em>]}
            />

            <motion.p className={styles.intro} {...fade(0.9)}>
              {CONTACT_PAGE.intro}
            </motion.p>

            <motion.div className={styles.ctas} {...fade(1.05)}>
              <MagneticButton onClick={() => scrollToTarget('#book')}>
                Book it yourself <span aria-hidden="true">↓</span>
              </MagneticButton>
              <span className={styles.chat}>
                <span className={styles.pulse} aria-hidden="true" />
                Chat is open, bottom corner <span aria-hidden="true">↘</span>
              </span>
            </motion.div>
          </div>

          <motion.ul
            className={styles.rows}
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
          >
            {ROWS.map((r) => {
              const inner = (
                <>
                  <span className={styles.rowLabel}>{r.label}</span>
                  <span className={styles.rowValue}>{r.value}</span>
                  {r.href && <span className={styles.rowArrow} aria-hidden="true">→</span>}
                </>
              );
              return (
                <motion.li
                  key={r.label}
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
                  }}
                >
                  {r.href ? (
                    <a
                      href={r.href}
                      className={styles.row}
                      {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={styles.row}>{inner}</div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        <motion.div className={`container ${styles.foot}`} {...fade(1.3)}>
          <span>Replies within one business day</span>
          <span className={styles.footRight}>Scroll down to book</span>
        </motion.div>

        <motion.div className={styles.dim} style={{ opacity: dim }} aria-hidden="true" />
      </motion.div>
    </section>
  );
}

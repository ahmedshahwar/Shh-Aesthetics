import { Fragment, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MARQUEE_WORDS } from '../../constants/content';
import styles from './Marquee.module.css';

function Row({ x, outlined }) {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <motion.div className={`${styles.row} ${outlined ? styles.outlined : ''}`} style={{ x }}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={styles.word}>{w}</span>
          <span className={styles.star} aria-hidden="true">✦</span>
        </Fragment>
      ))}
    </motion.div>
  );
}

/** Two oversized rows drifting in opposite directions, driven by scroll. */
export default function Marquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  return (
    <section ref={ref} className={`sheet ${styles.section}`} aria-label={MARQUEE_WORDS.join(', ')}>
      <Row x={x1} />
      <Row x={x2} outlined />
    </section>
  );
}

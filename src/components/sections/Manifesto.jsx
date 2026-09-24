import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MANIFESTO, STATS } from '../../constants/content';
import { fadeUp, inView, staggerParent } from '../../lib/motion';
import CountUp from '../ui/CountUp';
import styles from './Manifesto.module.css';

/** A single token that lights up as scroll progress passes its slot. */
function Token({ token, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const scale = useTransform(progress, range, [0.6, 1]);

  if (typeof token === 'string') {
    return <motion.span style={{ opacity }} className={styles.word}>{token}</motion.span>;
  }
  return (
    <motion.span style={{ opacity, scale }} className={styles.mark} aria-hidden="true">
      {token.mark}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] });
  const total = MANIFESTO.length;

  return (
    <section id="intro" className={`sheet theme-ivory ${styles.section}`}>
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow"><span>(01)</span> The Shh standard</p>
          <p className={styles.aside}>Read this slowly. It's the whole point.</p>
        </div>

        <p ref={ref} className={styles.statement}>
          {MANIFESTO.map((t, i) => (
            <Token
              key={i}
              token={t}
              progress={scrollYProgress}
              range={[i / total, (i + 1) / total]}
            />
          ))}
        </p>

        <motion.ul
          className={styles.stats}
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {STATS.map((s) => (
            <motion.li key={s.label} className={styles.stat} variants={fadeUp}>
              <span className={styles.value}>
                <CountUp to={s.value} suffix={s.suffix} />
              </span>
              <span className={styles.label}>{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

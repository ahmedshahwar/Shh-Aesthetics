import { useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { REVIEWS } from '../../constants/content';
import { EASE, fadeUp, inView, staggerParent } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import styles from './Reviews.module.css';

const TILTS = [-1.6, 1.2, -0.6, 1.8, -1.2, 0.8];
const TONES = ['paper', 'ink', 'champagne', 'paper', 'wine', 'ink'];

function Stars() {
  return (
    <span className={styles.stars} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 14 14" width="13" height="13" aria-hidden="true">
          <path d="M7 0l2.16 4.38L14 5.1l-3.5 3.41.83 4.82L7 11.08l-4.33 2.28.83-4.83L0 5.1l4.84-.72L7 0z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [minX, setMinX] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const vw = viewportRef.current?.offsetWidth ?? 0;
      const tw = trackRef.current?.scrollWidth ?? 0;
      setMinX(Math.min(0, vw - tw));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const step = (dir) => {
    const card = trackRef.current?.firstElementChild;
    const w = card ? card.offsetWidth + 24 : 400;
    const next = Math.max(minX, Math.min(0, x.get() - dir * w));
    animate(x, next, { duration: 0.9, ease: EASE });
  };

  return (
    <section id="reviews" className={`sheet theme-ivory ${styles.section}`}>
      <div className={`container ${styles.head}`}>
        <div>
          <p className="eyebrow"><span>(06)</span> Kiss and tell</p>
          <RevealLines
            className={styles.heading}
            lines={["Don't take our word.", <em key="e" className="accent-dark">Take theirs.</em>]}
          />
        </div>
        <div className={styles.controls}>
          <span className={styles.hint}>Drag, or use the arrows</span>
          <button className={styles.arrow} onClick={() => step(-1)} aria-label="Previous reviews">←</button>
          <button className={styles.arrow} onClick={() => step(1)} aria-label="Next reviews">→</button>
        </div>
      </div>

      <div ref={viewportRef} className={styles.viewport} data-cursor="Drag">
        <motion.ul
          ref={trackRef}
          className={styles.track}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.08}
          dragTransition={{ power: 0.25, timeConstant: 300 }}
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {REVIEWS.map((r, i) => (
            <motion.li
              key={r.name}
              className={`${styles.card} ${styles[TONES[i % TONES.length]]}`}
              style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
              variants={fadeUp}
            >
              <div className={styles.cardTop}>
                <Stars />
                <span className={styles.treatment}>{r.treatment}</span>
              </div>
              <p className={styles.text}>{r.text}</p>
              <div className={styles.who}>
                <span className={styles.avatar} aria-hidden="true">{r.name[0]}</span>
                <span className={styles.name}>{r.name}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

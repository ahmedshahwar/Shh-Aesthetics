import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { EASE, EASE_IN_OUT } from '../../lib/motion';
import styles from './Preloader.module.css';

const DURATION = 2.2;

/** "shh..." with a loading line and counter, then the curtain lifts. */
export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: DURATION,
      delay: 0.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 250);
      },
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.wrap}
          exit={{ y: '-100%', transition: { duration: 1.1, ease: EASE_IN_OUT } }}
          aria-hidden="true"
        >
          <motion.div
            className={styles.inner}
            exit={{ opacity: 0, y: -40, transition: { duration: 0.5, ease: EASE } }}
          >
            <motion.span
              className={styles.word}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              shh
              <span className={styles.dots}>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.35, 1] }}
                    transition={{ duration: 1.4, delay: 0.7 + i * 0.18, repeat: Infinity, repeatDelay: 0.4 }}
                  >
                    .
                  </motion.span>
                ))}
              </span>
            </motion.span>

            <div className={styles.track}>
              <div className={styles.fill} style={{ transform: `scaleX(${progress / 100})` }} />
            </div>

            <div className={styles.meta}>
              <span>beauty is our little secret</span>
              <span className={styles.count}>{String(progress).padStart(3, '0')}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

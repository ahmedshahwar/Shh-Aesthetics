import { motion } from 'framer-motion';
import { EASE, inView } from '../../lib/motion';
import styles from './RevealLines.module.css';

/**
 * Each line slides up from behind a mask, one after another.
 * Pass `play` to control timing manually (e.g. after the preloader);
 * leave it undefined to trigger when scrolled into view.
 */
export default function RevealLines({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.12,
  play,
}) {
  const MotionTag = motion[Tag] ?? motion.h2;
  const trigger =
    play === undefined
      ? { initial: 'hidden', whileInView: 'visible', viewport: inView }
      : { initial: 'hidden', animate: play ? 'visible' : 'hidden' };

  return (
    <MotionTag
      className={className}
      {...trigger}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className={styles.mask}>
          <motion.span
            className={styles.line}
            variants={{
              hidden: { y: '110%', rotate: 2 },
              visible: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

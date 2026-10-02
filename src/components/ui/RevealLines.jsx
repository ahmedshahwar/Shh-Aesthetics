import { m } from 'framer-motion';
import { EASE, inView } from '../../lib/motion';
import styles from './RevealLines.module.css';

/** A section heading that slides up from behind a mask when scrolled into view. */
export default function RevealLines({ lines, as: Tag = 'h2', className = '', ...rest }) {
  const MotionTag = m[Tag] ?? m.h2;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      {...rest}
    >
      {lines.map((line, i) => (
        <span key={i} className={styles.mask}>
          <m.span
            className={styles.line}
            variants={{
              hidden: { y: '105%' },
              visible: { y: '0%', transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </MotionTag>
  );
}

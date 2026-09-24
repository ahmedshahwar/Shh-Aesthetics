import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './Cursor.module.css';

/**
 * Follower ring for fine pointers. Elements opt in with data-cursor:
 *  data-cursor="View"  → ring grows into a labelled disc
 *  data-cursor="hide"  → ring tucks away (magnetic buttons handle themselves)
 * Plain links/buttons get a gentle grow.
 */
export default function Cursor() {
  const isFine = useMediaQuery('(pointer: fine)');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 });
  const [mode, setMode] = useState({ type: 'default', label: '' });

  useEffect(() => {
    if (!isFine) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const tagged = e.target.closest('[data-cursor]');
      if (tagged) {
        const v = tagged.dataset.cursor;
        setMode(v === 'hide' ? { type: 'hide', label: '' } : { type: 'label', label: v });
        return;
      }
      setMode(e.target.closest('a, button') ? { type: 'link', label: '' } : { type: 'default', label: '' });
    };

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
    };
  }, [isFine, x, y]);

  if (!isFine) return null;

  return (
    <motion.div className={styles.cursor} style={{ x: sx, y: sy }} data-mode={mode.type} aria-hidden="true">
      <span className={styles.ring}>
        <span className={styles.label}>{mode.label}</span>
      </span>
    </motion.div>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTACT } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import MagneticButton from '../ui/MagneticButton';
import SmartImage from '../ui/SmartImage';
import styles from './Gallery.module.css';

/** Vertical scroll drives a pinned horizontal filmstrip. */
export default function Gallery() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      id="gallery"
      ref={outerRef}
      className={`sheet theme-ink ${styles.section}`}
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className={styles.pin}>
        <div className={`container ${styles.head}`}>
          <div>
            <p className="eyebrow"><span>(05)</span> The vibe</p>
            <h2 className={styles.heading}>
              Glow, <em className="accent">unfiltered.</em>
            </h2>
          </div>
          <p className={styles.hint}>
            Keep scrolling <span aria-hidden="true">→</span>
          </p>
        </div>

        <motion.div ref={trackRef} className={styles.track} style={{ x }}>
          {IMAGES.gallery.map((item, i) => (
            <figure key={item.caption} className={`${styles.card} ${styles[`v${i % 3}`]}`} data-cursor="View">
              <SmartImage src={item.src} alt={item.caption} className={styles.img} />
              <figcaption className={styles.caption}>
                <span>0{i + 1}</span>
                {item.caption}
              </figcaption>
            </figure>
          ))}

          <div className={styles.end}>
            <p>
              Your turn to be
              <br />
              <em>the secret.</em>
            </p>
            <MagneticButton href={CONTACT.bookUrl}>Book a consult</MagneticButton>
          </div>
        </motion.div>

        <div className={`container ${styles.progressWrap}`}>
          <motion.div className={styles.progress} style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}

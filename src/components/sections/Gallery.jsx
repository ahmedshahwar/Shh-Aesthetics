import { useLayoutEffect, useRef, useState } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CONTACT, GALLERY_HEADING } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import Button from '../ui/Button';
import SmartImage from '../ui/SmartImage';
import styles from './Gallery.module.css';

/** Vertical scroll drives a pinned horizontal filmstrip. With reduced motion it becomes a swipeable row. */
export default function Gallery() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    if (reduce) return;
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
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      id="gallery"
      ref={outerRef}
      className={`sheet theme-ink ${styles.section} ${reduce ? styles.static : ''}`}
      style={reduce ? undefined : { height: `calc(100svh + ${distance}px)` }}
      aria-labelledby="gallery-title"
    >
      <div className={styles.pin}>
        <div className="container">
          <h2 id="gallery-title" className="heading">{GALLERY_HEADING}</h2>
        </div>

        <div className={styles.viewport}>
          <m.ul ref={trackRef} className={styles.track} style={reduce ? undefined : { x }}>
            {IMAGES.gallery.map((item) => (
              <li key={item.caption}>
                <figure className={styles.card}>
                  <SmartImage src={item.src} alt={item.caption} className={styles.img} />
                  <figcaption className={styles.caption}>{item.caption}</figcaption>
                </figure>
              </li>
            ))}

            <li className={styles.end}>
              <p>Your turn to keep the secret.</p>
              <Button href={CONTACT.bookUrl}>{CONTACT.bookLabel}</Button>
            </li>
          </m.ul>
        </div>

        {!reduce && (
          <div className={`container ${styles.progressWrap}`} aria-hidden="true">
            <m.div className={styles.progress} style={{ scaleX: scrollYProgress }} />
          </div>
        )}
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { CONTACT } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import { EASE, EASE_IN_OUT } from '../../lib/motion';
import { scrollToTarget } from '../../lib/smoothScroll';
import RevealLines from '../ui/RevealLines';
import MagneticButton from '../ui/MagneticButton';
import RotatingBadge from '../ui/RotatingBadge';
import styles from './Hero.module.css';

const fade = (ready, delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: ready ? { opacity: 1, y: 0 } : {},
  transition: { duration: 1, delay, ease: EASE },
});

export default function Hero({ ready }) {
  const ref = useRef(null);

  // Pinned hero recedes as the next sheet slides over it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.75]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  // Pointer parallax on the portrait
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 80, damping: 20 });
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 20 });
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="top" ref={ref} className={styles.hero} onPointerMove={onMove}>
      <motion.div className={styles.stage} style={{ scale }}>
        <div className={styles.glow} aria-hidden="true" />

        <motion.div className={`container ${styles.grid}`} style={{ y: textY }}>
          <div className={styles.copy}>
            <motion.p className={`eyebrow ${styles.eyebrow}`} {...fade(ready, 0.35)}>
              <span>Mobile</span> Aesthetics &amp; Wellness, SW Florida
            </motion.p>

            <RevealLines
              as="h1"
              className={styles.title}
              play={ready}
              delay={0.45}
              lines={[
                'Beauty is our',
                <em key="e" className="accent">little secret.</em>,
              ]}
            />

            <motion.p className={styles.sub} {...fade(ready, 0.95)}>
              Natural-looking injectables, skin and wellness from a nurse practitioner who
              knows exactly when to stop, and who comes to <em>you</em>. They'll say you look
              rested. <em>You'll say nothing.</em>
            </motion.p>

            <motion.div className={styles.ctas} {...fade(ready, 1.1)}>
              <MagneticButton href={CONTACT.bookUrl}>
                Book a free consult <span aria-hidden="true">→</span>
              </MagneticButton>
              <button className={styles.textLink} onClick={() => scrollToTarget('#services')}>
                See the menu
              </button>
            </motion.div>
          </div>

          <div className={styles.visual}>
            <motion.div
              className={styles.arch}
              style={{ rotateX: tiltX, rotateY: tiltY }}
              initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)' }}
              animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)' } : {}}
              transition={{ duration: 1.6, delay: 0.2, ease: EASE_IN_OUT }}
            >
              <motion.img
                src={IMAGES.hero}
                alt="Woman holding a finger to her lips, the Shh Aesthetics signature gesture"
                className={styles.archImg}
                style={{ x: shiftX }}
                initial={{ scale: 1.35 }}
                animate={ready ? { scale: 1.12 } : {}}
                transition={{ duration: 2.4, delay: 0.2, ease: EASE }}
              />
            </motion.div>

            <motion.div className={styles.badge} {...fade(ready, 1.3)}>
              <RotatingBadge
                text="beauty is our little secret · shh · "
                label="Scroll to discover"
                onClick={() => scrollToTarget('#intro')}
              />
            </motion.div>

            <motion.span className={styles.archNote} {...fade(ready, 1.45)}>
              The universal sign
              <br />
              for <em>"don't tell anyone."</em>
            </motion.span>
          </div>
        </motion.div>

        <motion.div className={`container ${styles.foot}`} {...fade(ready, 1.5)}>
          <span>Injectables</span>
          <span className={styles.dot} />
          <span>Skin</span>
          <span className={styles.dot} />
          <span>Wellness</span>
          <span className={styles.dot} />
          <span>Delivered to your door</span>
          <span className={styles.footRight}>Scroll, if you can keep a secret</span>
        </motion.div>

        <motion.div className={styles.dim} style={{ opacity: dim }} aria-hidden="true" />
      </motion.div>
    </section>
  );
}

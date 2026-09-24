import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ABOUT, CONTACT } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import { clipReveal, fadeUp, inView, staggerParent } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import MagneticButton from '../ui/MagneticButton';
import SmartImage from '../ui/SmartImage';
import styles from './About.module.css';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mainY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const detailY = useTransform(scrollYProgress, [0, 1], ['40%', '-30%']);
  const stickerRotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="about" ref={ref} className={`sheet theme-ivory ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <motion.div className={styles.visual} initial="hidden" whileInView="visible" viewport={inView}>
          <motion.div className={styles.main} variants={clipReveal} data-cursor="Hi">
            <motion.div className={styles.mainInner} style={{ y: mainY }}>
              <SmartImage src={IMAGES.aboutMain} alt="Kelly, licensed nurse practitioner" className={styles.fill} />
            </motion.div>
          </motion.div>

          <motion.div className={styles.detail} style={{ y: detailY }}>
            <SmartImage src={IMAGES.aboutDetail} alt="Treatment detail" className={styles.fill} />
          </motion.div>

          <motion.div className={styles.sticker} style={{ rotate: stickerRotate }}>
            <span>Kelly's rule</span>
            If you can tell,
            <br />
            it's too much.
          </motion.div>
        </motion.div>

        <div className={styles.copy}>
          <p className="eyebrow"><span>(04)</span> Meet Kelly</p>
          <RevealLines
            className={styles.heading}
            lines={['The NP with', <em key="e" className="accent-dark">impeccable</em>, <em key="f" className="accent-dark">restraint.</em>]}
          />

          <motion.div variants={staggerParent(0.15)} initial="hidden" whileInView="visible" viewport={inView}>
            {ABOUT.paragraphs.map((p) => (
              <motion.p key={p.slice(0, 16)} className={styles.para} variants={fadeUp}>{p}</motion.p>
            ))}
          </motion.div>

          <motion.dl
            className={styles.creds}
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            {ABOUT.credentials.map((c) => (
              <motion.div key={c.label} className={styles.cred} variants={fadeUp}>
                <dt>{c.label}</dt>
                <dd>{c.value}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <div className={styles.sign}>
            <span className={styles.signature}>Kelly</span>
            <MagneticButton href={CONTACT.bookUrl} variant="outlineDark">
              Meet her in person
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

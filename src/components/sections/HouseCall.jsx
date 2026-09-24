import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTACT, HOUSE_CALL } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import { clipReveal, fadeUp, inView, staggerParent } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import MagneticButton from '../ui/MagneticButton';
import SmartImage from '../ui/SmartImage';
import styles from './HouseCall.module.css';

export default function HouseCall() {
  const ref = useRef(null);
  const stepsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const tagRotate = useTransform(scrollYProgress, [0, 1], [-14, 8]);

  // The route line draws itself as the steps scroll through
  const { scrollYProgress: stepsProgress } = useScroll({ target: stepsRef, offset: ['start 0.8', 'end 0.55'] });

  return (
    <section id="housecall" ref={ref} className={`sheet theme-ivory ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow"><span>(03)</span> The house call</p>
          <RevealLines
            className={styles.heading}
            lines={['Glam,', <em key="e" className="accent-dark">delivered.</em>]}
          />
          <motion.p className={styles.lede} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
            Shh is a mobile clinic. I pack up the whole experience and bring it to you.
            Your couch, your kitchen, your "I'm not putting real pants on today" era. The
            clinic is wherever you are.
          </motion.p>

          <motion.ul
            className={styles.areas}
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            {CONTACT.areas.map((a) => (
              <motion.li key={a} variants={fadeUp}>{a}</motion.li>
            ))}
          </motion.ul>
          <p className={styles.cities}>
            Including {CONTACT.cities.slice(0, -1).join(', ')} and {CONTACT.cities.at(-1)}.
          </p>

          <ol ref={stepsRef} className={styles.steps}>
            <motion.span className={styles.route} style={{ scaleY: stepsProgress }} aria-hidden="true" />
            {HOUSE_CALL.steps.map((s, i) => (
              <motion.li
                key={s.title}
                className={styles.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                custom={i * 0.08}
              >
                <span className={styles.stepNum}>0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <MagneticButton href={CONTACT.bookUrl} variant="ink">
            Summon Kelly <span aria-hidden="true">→</span>
          </MagneticButton>
        </div>

        <motion.div className={styles.visual} initial="hidden" whileInView="visible" viewport={inView}>
          <motion.div className={styles.frame} variants={clipReveal} data-cursor="Home">
            <motion.div className={styles.frameInner} style={{ y: imgY }}>
              <SmartImage src={IMAGES.houseCall} alt="Skincare at home" className={styles.img} />
            </motion.div>
          </motion.div>
          <motion.div className={styles.tag} style={{ rotate: tagRotate }}>
            <span>Now serving</span>
            your living room
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

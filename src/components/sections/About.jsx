import { m } from 'framer-motion';
import { ABOUT, CONTACT } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import { clipReveal, fadeUp, inView, staggerParent } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import Button from '../ui/Button';
import SmartImage from '../ui/SmartImage';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={`sheet theme-ivory ${styles.section}`} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <m.div className={styles.visual} initial="hidden" whileInView="visible" viewport={inView}>
          <m.div className={styles.main} variants={clipReveal}>
            <SmartImage src={IMAGES.aboutMain} alt="Kelly, licensed nurse practitioner and founder of Shh Aesthetics" className={styles.fill} />
          </m.div>
          <m.div className={styles.detail} variants={fadeUp} custom={0.4}>
            <SmartImage src={IMAGES.aboutDetail} alt="Close-up of a treatment in progress" className={styles.fill} />
          </m.div>
        </m.div>

        <div className={styles.copy}>
          <RevealLines id="about-title" className={`heading ${styles.heading}`} lines={['Meet Kelly, the NP with impeccable restraint.']} />

          <m.div variants={staggerParent(0.12)} initial="hidden" whileInView="visible" viewport={inView}>
            {ABOUT.paragraphs.map((p) => (
              <m.p key={p.slice(0, 16)} className={styles.para} variants={fadeUp}>{p}</m.p>
            ))}
            <m.blockquote className={styles.rule} variants={fadeUp}>
              <p>{ABOUT.rule}</p>
              <cite>Kelly's rule</cite>
            </m.blockquote>
          </m.div>

          <dl className={styles.creds}>
            {ABOUT.credentials.map((c) => (
              <div key={c.label} className={styles.cred}>
                <dt>{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.cta}>
            <Button href={CONTACT.bookUrl} variant="outlineDark">{CONTACT.bookLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

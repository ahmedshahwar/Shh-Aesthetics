import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTACT } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import { clipReveal, fadeUp, inView, staggerParent } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import MagneticButton from '../ui/MagneticButton';
import SmartImage from '../ui/SmartImage';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const details = [
    { label: 'I come to', value: CONTACT.areasShort },
    { label: 'Call me', value: CONTACT.phone, href: CONTACT.phoneHref },
    { label: 'Write me', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];

  return (
    <section id="contact" ref={ref} className={`sheet ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow"><span>(08)</span> Your move</p>
          <RevealLines
            className={styles.heading}
            lines={["Your secret's", <><em key="e">safe</em> with us.</>]}
          />
          <motion.p className={styles.sub} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
            Book a free consultation at your place. Bring your questions, your screenshots
            and your trust issues. I'll bring everything else.
          </motion.p>

          <motion.dl
            className={styles.details}
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            {details.map((d) => (
              <motion.div key={d.label} variants={fadeUp}>
                <dt>{d.label}</dt>
                <dd>
                  {d.href ? (
                    <a href={d.href} {...(d.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          <p className={styles.disclaimer}>{CONTACT.disclaimer}</p>
        </div>

        <motion.div className={styles.visual} initial="hidden" whileInView="visible" viewport={inView}>
          <motion.div className={styles.frame} variants={clipReveal}>
            <motion.div className={styles.frameInner} style={{ y: imgY }}>
              <SmartImage src={IMAGES.contact} alt="A calm moment before a treatment" className={styles.img} />
            </motion.div>
          </motion.div>
          <div className={styles.cta}>
            <MagneticButton href={CONTACT.bookUrl} variant="ink" shape="circle" strength={0.4}>
              Book your consult
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { m, useReducedMotion, useScroll } from 'framer-motion';
import { CONTACT, HOUSE_CALL } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import { clipReveal, fadeUp, inView } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import Button from '../ui/Button';
import SmartImage from '../ui/SmartImage';
import SiteLink from '../ui/SiteLink';
import ZipChecker from '../ui/ZipChecker';
import styles from './HouseCall.module.css';

export default function HouseCall() {
  const stepsRef = useRef(null);
  const reduce = useReducedMotion();

  // The route line draws itself as the steps scroll through.
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 0.8', 'end 0.55'] });

  return (
    <section id="housecall" className={`sheet theme-ivory ${styles.section}`} aria-labelledby="housecall-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <RevealLines id="housecall-title" className="heading" lines={['Glam, delivered to your door.']} />
          <m.p className={styles.lede} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
            {HOUSE_CALL.lede}
          </m.p>

          <div className={styles.areas}>
            <h3>Where I travel</h3>
            <p>
              Lee, Charlotte and Collier counties, including {CONTACT.cities.slice(0, -1).join(', ')} and{' '}
              {CONTACT.cities.at(-1)}.
            </p>
            <ZipChecker className={styles.zip} />
            <p className={styles.areaLinks}>
              <SiteLink href="/service-areas">See every area I serve</SiteLink>
            </p>
          </div>

          <ol ref={stepsRef} className={styles.steps}>
            <m.span
              className={styles.route}
              style={{ scaleY: reduce ? 1 : scrollYProgress }}
              aria-hidden="true"
            />
            {HOUSE_CALL.steps.map((s) => (
              <m.li
                key={s.title}
                className={styles.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
              >
                <span className={styles.marker} aria-hidden="true" />
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </m.li>
            ))}
          </ol>

          <Button href={CONTACT.bookUrl} variant="ink">{CONTACT.bookLabel}</Button>
        </div>

        <m.div className={styles.visual} initial="hidden" whileInView="visible" viewport={inView}>
          <m.div className={styles.frame} variants={clipReveal}>
            <SmartImage src={IMAGES.houseCall} alt="Skincare treatment set up at home" className={styles.img} />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

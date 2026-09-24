import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTACT, SERVICES } from '../../constants/content';
import { fadeUp, inView } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import MagneticButton from '../ui/MagneticButton';
import SmartImage from '../ui/SmartImage';
import styles from './Services.module.css';

const BUTTON_BY_THEME = { dark: 'champagne', light: 'ink', gold: 'ink' };

function ServiceCard({ service, index, total, progress }) {
  // Earlier cards shrink back as later ones stack on top of them.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const imgY = useTransform(progress, [index / total, (index + 1) / total], ['-6%', '6%']);

  return (
    <div className={styles.slot} style={{ '--i': index }}>
      <motion.article
        className={`${styles.card} ${styles[service.theme]}`}
        style={{ scale }}
      >
        <div className={styles.cardInner}>
          <div className={styles.text}>
            <div className={styles.meta}>
              <span>0{index + 1} / 0{total}</span>
              <span>{service.kicker}</span>
            </div>

            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.sass}>{service.sass}</p>
            <p className={styles.desc}>{service.description}</p>

            <ul className={styles.items}>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <MagneticButton href={CONTACT.bookUrl} variant={BUTTON_BY_THEME[service.theme]}>
              Book {service.title.toLowerCase()} <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>

          <div className={styles.media} data-cursor="Glow">
            <motion.div className={styles.mediaInner} style={{ y: imgY }}>
              <SmartImage src={service.image} alt={`${service.title} treatment`} className={styles.img} />
            </motion.div>
            <span className={styles.mediaTag}>{service.title}</span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Services() {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  return (
    <section id="services" className={`sheet theme-ink ${styles.section}`}>
      <div className={`container ${styles.head}`}>
        <div>
          <p className="eyebrow"><span>(02)</span> The menu</p>
          <RevealLines
            className={styles.heading}
            lines={['Pick your', <em key="e" className="accent">poison.</em>]}
          />
        </div>
        <motion.p className={styles.intro} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
          Three ways to glow, zero ways to look overdone. Every plan starts with a
          conversation, and every conversation happens on <em>your</em> couch.
        </motion.p>
      </div>

      <div ref={stackRef} className={`container ${styles.stack}`}>
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} total={SERVICES.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

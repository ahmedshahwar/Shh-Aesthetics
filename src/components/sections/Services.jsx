import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CONTACT, SERVICES } from '../../constants/content';
import { fadeUp, inView } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import SmartImage from '../ui/SmartImage';
import Button from '../ui/Button';
import PlaceholderTag from '../ui/PlaceholderTag';
import { SHOW_PLACEHOLDERS, STARTING_PRICES } from '../../constants/placeholders';
import styles from './Services.module.css';

const BUTTON_BY_THEME = { dark: 'outline', light: 'outlineDark', gold: 'outlineDark' };

function StartingPrice({ id }) {
  const price = STARTING_PRICES[id];
  if (price) return <p className={styles.price}>Starting at ${price}</p>;
  if (!SHOW_PLACEHOLDERS) return null;
  return (
    <p className={styles.price}>
      Starting at $— <PlaceholderTag />
    </p>
  );
}

function ServiceCard({ service, index, total, progress, reduce }) {
  // Earlier cards shrink back slightly as later ones stack on top of them.
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className={styles.slot} style={{ '--i': index }}>
      <m.article
        className={`${styles.card} ${styles[service.theme]}`}
        style={reduce ? undefined : { scale }}
        aria-labelledby={`service-${service.id}`}
      >
        <div className={styles.cardInner}>
          <div className={styles.text}>
            <p className={styles.kicker}>{service.kicker}</p>
            <h3 id={`service-${service.id}`} className={styles.title}>{service.title}</h3>
            <p className={styles.sass}>{service.sass}</p>
            <p className={styles.desc}>{service.description}</p>

            <ul className={styles.items} aria-label={`${service.title} options`}>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <StartingPrice id={service.id} />

            <Button href={CONTACT.bookUrl} variant={BUTTON_BY_THEME[service.theme]} className={styles.cta}>
              {service.cta}
            </Button>
          </div>

          <div className={styles.media}>
            <SmartImage src={service.image} alt={service.alt} className={styles.img} />
          </div>
        </div>
      </m.article>
    </div>
  );
}

export default function Services() {
  const stackRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  return (
    <section id="services" className={`sheet theme-ink ${styles.section}`} aria-labelledby="services-title">
      <div className={`container ${styles.head}`}>
        <RevealLines id="services-title" className="heading" lines={['Treatments, done quietly.']} />
        <m.p className={styles.intro} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
          Botox, Dysport, dermal fillers, peptide therapy and medical weight management, brought to
          your home in Cape Coral, Fort Myers, Naples and nearby. Every treatment starts with a free
          consultation and a plan built around your face, your goals and your health history.
        </m.p>
      </div>

      <div ref={stackRef} className={`container ${styles.stack}`}>
        {SERVICES.map((s, i) => (
          <ServiceCard
            key={s.id}
            service={s}
            index={i}
            total={SERVICES.length}
            progress={scrollYProgress}
            reduce={reduce}
          />
        ))}
      </div>
    </section>
  );
}

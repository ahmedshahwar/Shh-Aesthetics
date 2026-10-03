import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CONTACT } from '../../constants/content';
import { IMAGES } from '../../constants/images';
import Button from '../ui/Button';
import SiteLink from '../ui/SiteLink';
import HeroBackdrop from '../ui/HeroBackdrop';
import styles from './Hero.module.css';

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // The pinned hero recedes as the next section slides over it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.7]);

  return (
    <section id="top" ref={ref} className={styles.hero} aria-labelledby="home-title">
      <m.div className={styles.stage} style={reduce ? undefined : { scale }}>
        <div className={styles.glow} aria-hidden="true" />
        <HeroBackdrop />

        <div className={`container ${styles.grid}`}>
          <div className={styles.copy}>
            <h1 id="home-title" className={`label ${styles.kicker}`}>
              Mobile Botox, fillers and wellness in Cape Coral, Fort Myers and Naples
            </h1>

            <p className={styles.title}>
              Beauty is our <em className="accent">little secret.</em>
            </p>

            <p className={styles.sub}>
              Natural results from a licensed nurse practitioner who comes to your home.
              They’ll say you look rested. You’ll say nothing.
            </p>

            <div className={styles.ctas} data-hide-action-bar>
              <Button href={CONTACT.bookUrl}>{CONTACT.bookLabel}</Button>
              <SiteLink href="/#services" className={styles.textLink}>See treatments</SiteLink>
            </div>

            <div className={styles.trust}>
              <p>Licensed nurse practitioner. Free in-home consultation.</p>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.arch}>
              <img
                src={IMAGES.hero}
                alt="Shh Aesthetics logo: a woman holding a finger to her lips, with the words beauty is our little secret"
                className={styles.archImg}
                width="1200"
                height="1200"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <m.div className={styles.dim} style={reduce ? { opacity: 0 } : { opacity: dim }} aria-hidden="true" />
      </m.div>
    </section>
  );
}

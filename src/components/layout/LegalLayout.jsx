import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE, fadeUp, inView } from '../../lib/motion';
import { scrollToTarget } from '../../lib/smoothScroll';
import RevealLines from '../ui/RevealLines';
import Seo from '../seo/Seo';
import styles from './LegalLayout.module.css';

/**
 * Shared shell for the Privacy Policy and Terms pages:
 * pinned dark hero, then an ivory sheet with a sticky table of contents
 * (highlights the section you're reading) beside the document.
 *
 * sections: [{ id, title, content: <JSX> }]
 */
export default function LegalLayout({ ready, seoPage, eyebrow, titleLines, intro, updated, sections }) {
  const heroRef = useRef(null);
  const [active, setActive] = useState(sections[0]?.id);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.75]);

  // Highlight the section currently in the upper part of the screen
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-25% 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <main>
      <Seo page={seoPage} />
      <div>
        <section id="top" ref={heroRef} className={styles.hero}>
          <motion.div className={styles.stage} style={{ scale }}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={`container ${styles.heroInner}`}>
              <motion.p className={`eyebrow ${styles.eyebrow}`} {...fade(0.3)}>
                <span>(Legal)</span> {eyebrow}
              </motion.p>
              <RevealLines as="h1" className={styles.title} play={ready} delay={0.4} lines={titleLines} />
              <motion.p className={styles.intro} {...fade(0.9)}>{intro}</motion.p>
              <motion.span className={styles.updated} {...fade(1.05)}>
                Last updated: {updated}
              </motion.span>
            </div>
            <motion.div className={styles.dim} style={{ opacity: dim }} aria-hidden="true" />
          </motion.div>
        </section>

        <section className={`sheet theme-ivory ${styles.body}`}>
          <div className={`container ${styles.grid}`}>
            <nav className={styles.toc} aria-label="On this page">
              <p className={styles.tocLabel}>On this page</p>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <button
                      className={`${styles.tocLink} ${active === s.id ? styles.tocActive : ''}`}
                      onClick={() => scrollToTarget(`#${s.id}`)}
                    >
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <article className={styles.doc}>
              {sections.map((s, i) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  className={styles.block}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={inView}
                >
                  <h2 className={styles.blockTitle}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </h2>
                  <div className={styles.prose}>{s.content}</div>
                </motion.section>
              ))}
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

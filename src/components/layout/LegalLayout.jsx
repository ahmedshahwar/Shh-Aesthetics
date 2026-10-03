import { useEffect, useRef, useState } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SiteLink from '../ui/SiteLink';
import Breadcrumbs from '../seo/Breadcrumbs';
import Seo from '../seo/Seo';
import HeroBackdrop from '../ui/HeroBackdrop';
import styles from './LegalLayout.module.css';

/**
 * Shared shell for the Privacy Policy and Terms pages:
 * pinned dark hero, then an ivory sheet with a sticky table of contents
 * (highlights the section you’re reading) beside the document.
 *
 * sections: [{ id, title, content: <JSX> }]
 */
export default function LegalLayout({ seoPage, name, title, intro, updated, sections }) {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(sections[0]?.id);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.7]);

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

  return (
    <>
      <Seo page={seoPage} />
      <div>
        <section id="top" ref={heroRef} className={styles.hero}>
          <m.div className={styles.stage} style={reduce ? undefined : { scale }}>
            <HeroBackdrop tone="dusk" still />
            <div className={`container ${styles.heroInner}`}>
              <Breadcrumbs items={[{ name, path: `/${seoPage}` }]} className={styles.crumbs} />
              <h1 className={`label ${styles.kicker}`}>{name}</h1>
              <p className={styles.title}>{title}</p>
              <p className={styles.intro}>{intro}</p>
              <p className={styles.updated}>Last updated: {updated}</p>
            </div>
            <m.div className={styles.dim} style={reduce ? { opacity: 0 } : { opacity: dim }} aria-hidden="true" />
          </m.div>
        </section>

        <section className={`sheet theme-ivory ${styles.body}`}>
          <div className={`container ${styles.grid}`}>
            <nav className={styles.toc} aria-label="On this page">
              <p className={styles.tocLabel}>On this page</p>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <SiteLink
                      href={`/${seoPage}#${s.id}`}
                      className={`${styles.tocLink} ${active === s.id ? styles.tocActive : ''}`}
                      aria-current={active === s.id ? 'location' : undefined}
                    >
                      <span>{i + 1}.</span>
                      {s.title}
                    </SiteLink>
                  </li>
                ))}
              </ol>
            </nav>

            <article className={styles.doc}>
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className={styles.block} aria-labelledby={`${s.id}-title`}>
                  <h2 id={`${s.id}-title`} className={styles.blockTitle}>
                    <span>{i + 1}.</span>
                    {s.title}
                  </h2>
                  <div className={styles.prose}>{s.content}</div>
                </section>
              ))}
            </article>
          </div>
        </section>
      </div>
    </>
  );
}

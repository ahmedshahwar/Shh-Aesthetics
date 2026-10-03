import { m } from 'framer-motion';
import { CONTACT, FAQS, HOUSE_CALL, SERVICE_AREAS } from '../constants/content';
import { SITE_URL } from '../constants/seo';
import { fadeUp, inView, staggerParent } from '../lib/motion';
import Seo from '../components/seo/Seo';
import JsonLd from '../components/seo/JsonLd';
import Breadcrumbs from '../components/seo/Breadcrumbs';
import RevealLines from '../components/ui/RevealLines';
import Button from '../components/ui/Button';
import SiteLink from '../components/ui/SiteLink';
import Contact from '../components/sections/Contact';
import ZipChecker from '../components/ui/ZipChecker';
import HeroBackdrop from '../components/ui/HeroBackdrop';
import styles from './ServiceAreasPage.module.css';

const AREA_FAQS = ['areas', 'house-calls', 'duration', 'free-consult'].map((id) => FAQS.find((f) => f.id === id));

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'In-home Botox, fillers, skin care and weight management',
  serviceType: 'Mobile aesthetics',
  url: `${SITE_URL}/service-areas`,
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: SERVICE_AREAS.flatMap((a) => [
    { '@type': 'AdministrativeArea', name: `${a.name}, FL` },
    ...a.cities.map((c) => ({ '@type': 'City', name: `${c}, FL` })),
  ]),
};

export default function ServiceAreasPage() {
  return (
    <>
      <Seo page="serviceAreas" />
      <JsonLd data={SCHEMA} />

      <section id="top" className={styles.hero} aria-labelledby="areas-title">
        <HeroBackdrop tone="dusk" still />
        <div className={`container ${styles.heroInner}`}>
          <Breadcrumbs items={[{ name: 'Service areas', path: '/service-areas' }]} />
          <h1 id="areas-title" className={`label ${styles.kicker}`}>Mobile Botox and aesthetics service areas</h1>
          <p className={styles.title}>
            House calls across <em className="accent">Southwest Florida.</em>
          </p>
          <p className={styles.intro}>
            Shh is a mobile practice, so every consultation and treatment happens at your home. Kelly, a licensed
            nurse practitioner, travels across Lee, Collier and Charlotte counties.
          </p>
          <ZipChecker tone="dark" className={styles.zip} />
          <nav className={styles.jump} aria-label="Counties">
            {SERVICE_AREAS.map((a) => (
              <SiteLink key={a.id} href={`/service-areas#${a.id}`} className={styles.jumpLink}>{a.name}</SiteLink>
            ))}
          </nav>
        </div>
      </section>

      <section className={`sheet theme-ivory ${styles.counties}`} aria-label="Counties served">
        <div className="container">
          {SERVICE_AREAS.map((a) => (
            <m.article
              key={a.id}
              id={a.id}
              className={styles.county}
              aria-labelledby={`${a.id}-title`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
            >
              <div className={styles.countyCopy}>
                <h2 id={`${a.id}-title`} className="heading">{a.name}</h2>
                <p className={styles.countyText}>{a.text}</p>
                <div className={styles.countyActions}>
                  <Button href={CONTACT.bookUrl} variant="ink">{CONTACT.bookLabel}</Button>                </div>
              </div>
              <div>
                <h3 className={styles.citiesTitle}>House calls in</h3>
                <ul className={styles.cities}>
                  {a.cities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </m.article>
          ))}
        </div>
      </section>

      <section className={`sheet theme-ink ${styles.how}`} aria-labelledby="how-title">
        <div className="container">
          <RevealLines id="how-title" className="heading" lines={['How a house call works.']} />
          <m.ol
            className={styles.steps}
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            {HOUSE_CALL.steps.map((s, i) => (
              <m.li key={s.title} className={styles.step} variants={fadeUp}>
                <span className={styles.stepNum} aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </m.li>
            ))}
          </m.ol>

          <dl className={styles.faqs}>
            {AREA_FAQS.map((f) => (
              <div key={f.id} className={styles.faq}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.more}>
            <SiteLink href="/#services">See treatments</SiteLink>
            <SiteLink href="/#faq">Read all questions</SiteLink>
          </p>
        </div>
      </section>

      <Contact />
    </>
  );
}

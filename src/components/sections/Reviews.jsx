import { m } from 'framer-motion';
import { CONTACT } from '../../constants/content';
import { RESULTS, SHOW_PLACEHOLDERS, TESTIMONIALS } from '../../constants/placeholders';
import { fadeUp, inView, staggerParent } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import PlaceholderTag from '../ui/PlaceholderTag';
import styles from './Reviews.module.css';

const TILTS = [-1.4, 1.1, -0.6, 1.6, -1, 0.8];
const TONES = ['paper', 'ink', 'champagne', 'wine'];

const SAMPLE_REVIEWS = [
  { quote: 'A real client review goes here, word for word, shared with permission.', name: 'First name, last initial', treatment: 'Treatment' },
  { quote: 'A second review, ideally about the house-call experience.', name: 'First name, last initial', treatment: 'Treatment' },
  { quote: 'A third review, ideally from a first-time client.', name: 'First name, last initial', treatment: 'Treatment' },
];

/** Reviews and before-and-afters. Hidden on the live site until real content exists. */
export default function Reviews() {
  const reviews = TESTIMONIALS.length ? TESTIMONIALS : SHOW_PLACEHOLDERS ? SAMPLE_REVIEWS : [];
  const isSample = !TESTIMONIALS.length;
  const showResults = RESULTS.length > 0 || SHOW_PLACEHOLDERS;
  if (!reviews.length && !RESULTS.length) return null;

  return (
    <section id="reviews" className={`sheet theme-ivory ${styles.section}`} aria-labelledby="reviews-title">
      <div className={`container ${styles.head}`}>
        <RevealLines id="reviews-title" className="heading" lines={['Don’t take my word for it.']} />
      </div>

      {reviews.length > 0 && (
        <m.ul
          className={`container ${styles.track}`}
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {reviews.map((r, i) => (
            <m.li
              key={r.quote.slice(0, 24)}
              className={`${styles.card} ${styles[TONES[i % TONES.length]]}`}
              style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
              variants={fadeUp}
            >
              <figure>
                <span className={styles.treatment}>
                  {r.treatment} {isSample && <PlaceholderTag />}
                </span>
                <blockquote className={styles.text}>
                  <p>“{r.quote}”</p>
                </blockquote>
                <figcaption className={styles.who}>
                  <span className={styles.avatar} aria-hidden="true">{r.name[0]}</span>
                  <span className={styles.name}>{r.name}</span>
                </figcaption>
              </figure>
            </m.li>
          ))}
        </m.ul>
      )}

      {showResults && (
        <div className={`container ${styles.results}`}>
          <h3 className={styles.resultsTitle}>Before and after</h3>
          <ul className={styles.pairs}>
            {(RESULTS.length ? RESULTS : [null, null]).map((r, i) => (
              <li key={r?.before ?? i} className={styles.pair}>
                {r ? (
                  <>
                    <div className={styles.pairImgs}>
                      <img src={r.before} alt={`Before: ${r.alt}`} width="600" height="750" loading="lazy" decoding="async" />
                      <img src={r.after} alt={`After: ${r.alt}`} width="600" height="750" loading="lazy" decoding="async" />
                    </div>
                    <p className={styles.pairCaption}>{r.treatment}. {r.timing}.</p>
                  </>
                ) : (
                  <>
                    <div className={styles.pairImgs} aria-hidden="true">
                      <span className={styles.pairSlot}>Before</span>
                      <span className={styles.pairSlot}>After</span>
                    </div>
                    <p className={styles.pairCaption}>
                      Kelly’s own client photos, with written consent <PlaceholderTag />
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
          <p className={styles.disclaimer}>Shared with each client’s written permission. {CONTACT.disclaimer}</p>
        </div>
      )}
    </section>
  );
}

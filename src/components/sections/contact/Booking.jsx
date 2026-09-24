import { motion } from 'framer-motion';
import { CONTACT } from '../../../constants/content';
import { fadeUp, inView, staggerParent } from '../../../lib/motion';
import RevealLines from '../../ui/RevealLines';
import BookingCalendar from '../../ui/BookingCalendar';
import styles from './Booking.module.css';

const FACTS = [
  { label: 'Consultation', value: 'Free, and on your turf' },
  { label: 'I come to', value: `${CONTACT.areasShort} counties` },
  { label: 'Appointments', value: 'Usually 1 to 2 hours' },
  { label: 'Where', value: 'Your place. Couch optional.' },
];

export default function Booking() {
  return (
    <section id="book" className={`sheet theme-ivory ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <div>
          <p className="eyebrow"><span>(01)</span> Book it yourself</p>
          <RevealLines
            className={styles.heading}
            lines={['Pick a time.', <em key="e" className="accent-dark">I'll bring</em>, <em key="f" className="accent-dark">the glow.</em>]}
          />
          <motion.p className={styles.lede} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
            Choose a slot that suits you, tell me a little about what you're after, and
            I'll show up with everything else. No phone tag, no waiting room.
          </motion.p>
          </div>

          <div>

          <motion.dl
            className={styles.facts}
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            {FACTS.map((f) => (
              <motion.div key={f.label} className={styles.fact} variants={fadeUp}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <p className={styles.fallback}>
            Can't find a time that works? Call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> or
            email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
          </div>
        </div>

        <motion.div
          className={styles.calendar}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <BookingCalendar src={CONTACT.calendarEmbedUrl} id={CONTACT.calendarEmbedId} />
        </motion.div>
      </div>
    </section>
  );
}

import { m } from 'framer-motion';
import { CONTACT } from '../../../constants/content';
import { fadeUp, inView } from '../../../lib/motion';
import RevealLines from '../../ui/RevealLines';
import BookingCalendar from '../../ui/BookingCalendar';
import styles from './Booking.module.css';

const FACTS = [
  { label: 'Consultation', value: 'Free, at your home' },
  { label: 'Serving', value: `${CONTACT.areasShort} counties` },
  { label: 'Appointments', value: 'Usually 1 to 2 hours' },
  { label: 'Replies', value: 'Within one business day' },
];

export default function Booking() {
  return (
    <section id="book" className={`sheet theme-ivory ${styles.section}`} aria-labelledby="book-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <div>
            <RevealLines id="book-title" className="heading" lines={["Pick a time. I’ll bring the glow."]} />
            <m.p className={styles.lede} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
              Choose a time that suits you and tell me a little about what you’re after.
              I’ll arrive with everything else. No phone tag, no waiting room.
            </m.p>
          </div>

          <div>
            <dl className={styles.facts}>
              {FACTS.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>

            <p className={styles.fallback}>
              No time that works? Call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> or
              email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>
          </div>
        </div>

        <m.div className={styles.calendar} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
          <BookingCalendar src={CONTACT.calendarEmbedUrl} id={CONTACT.calendarEmbedId} />
          <p className={styles.note}>
            Please keep medical details for your consultation rather than the booking form.
          </p>
        </m.div>
      </div>
    </section>
  );
}

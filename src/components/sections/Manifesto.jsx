import { m } from 'framer-motion';
import { MANIFESTO } from '../../constants/content';
import { fadeUp, inView, staggerParent } from '../../lib/motion';
import RevealLines from '../ui/RevealLines';
import styles from './Manifesto.module.css';

export default function Manifesto() {
  return (
    <section id="intro" className={`sheet theme-ivory ${styles.section}`} aria-labelledby="manifesto-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.lead}>
          <RevealLines id="manifesto-title" className={styles.statement} lines={[MANIFESTO.statement]} />
          <m.p className={styles.body} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
            {MANIFESTO.body}
          </m.p>
        </div>

        <m.ul
          className={styles.principles}
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {MANIFESTO.principles.map((p) => (
            <m.li key={p.title} className={styles.principle} variants={fadeUp}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}

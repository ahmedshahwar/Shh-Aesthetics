import styles from './RotatingBadge.module.css';

/** Spinning circular text seal. Spins faster on hover. */
export default function RotatingBadge({ text, onClick, label }) {
  const id = 'badge-path';
  return (
    <button className={styles.badge} onClick={onClick} aria-label={label} data-cursor="hide">
      <svg viewBox="0 0 200 200" className={styles.ring} aria-hidden="true">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className={styles.center} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M12 4v16M12 20l-6-6M12 20l6-6" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </span>
    </button>
  );
}

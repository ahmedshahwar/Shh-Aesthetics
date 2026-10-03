import styles from './PlaceholderTag.module.css';

/** Small inline "Placeholder" marker for content Kelly still needs to supply. Development and demo builds only. */
export default function PlaceholderTag({ children = 'Placeholder' }) {
  return <span className={styles.tag} data-placeholder>{children}</span>;
}

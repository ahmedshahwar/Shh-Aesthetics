import { useState } from 'react';
import styles from './SmartImage.module.css';

/** Lazy image that fades in on load and falls back to a branded tone if the source fails. */
export default function SmartImage({ src, alt = '', className = '', eager = false }) {
  const [state, setState] = useState('loading');

  return (
    <div className={`${styles.frame} ${className}`} data-state={state}>
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={styles.img}
        />
      )}
      {state === 'error' && (
        <span className={styles.fallback} aria-hidden="true">shh</span>
      )}
    </div>
  );
}

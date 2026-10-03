import { useState } from 'react';
import styles from './SmartImage.module.css';

const WIDTHS = [480, 800, 1200, 1600];

/* Unsplash serves any width on request, so build a srcset and let the browser pick. */
function responsive(src) {
  if (!src.includes('unsplash.com')) return {};
  const at = (w) => src.replace(/([?&])w=\d+/, `$1w=${w}`);
  return { srcSet: WIDTHS.map((w) => `${at(w)} ${w}w`).join(', ') };
}

/** Lazy image with a branded backdrop. If the file fails to load, its alt text is shown in its place. */
export default function SmartImage({
  src,
  alt,
  className = '',
  eager = false,
  sizes = '(max-width: 900px) 100vw, 50vw',
  width = 1200,
  height = 1500,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`${styles.frame} ${className}`}>
      {failed ? (
        <span className={styles.fallback} role="img" aria-label={alt}>{alt}</span>
      ) : (
        <img
          src={src}
          {...responsive(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={styles.img}
        />
      )}
    </div>
  );
}

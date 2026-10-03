import { useId, useState } from 'react';
import { CONTACT } from '../../constants/content';
import { ZIP_AREAS } from '../../constants/zipCodes';
import SiteLink from './SiteLink';
import styles from './ZipChecker.module.css';

/**
 * "Do you come to me?" in one step. Answers as soon as five digits are typed.
 * tone: 'light' on ivory sections, 'dark' on ink ones.
 */
export default function ZipChecker({ tone = 'light', className = '' }) {
  const id = useId();
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);

  const check = (value) => {
    if (!/^\d{5}$/.test(value)) {
      setResult({ kind: 'invalid' });
      return;
    }
    const area = ZIP_AREAS.get(value);
    setResult(area ? { kind: 'yes', ...area } : { kind: 'no', zip: value });
  };

  const onChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZip(value);
    if (value.length === 5) check(value);
    else setResult(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    check(zip);
  };

  return (
    <form className={`${styles.checker} ${styles[tone]} ${className}`} onSubmit={onSubmit} noValidate>
      <label htmlFor={`${id}-zip`} className={styles.label}>Do I come to you? Check your zip code</label>
      <div className={styles.row}>
        <input
          id={`${id}-zip`}
          className={styles.input}
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="e.g. 33904"
          maxLength={5}
          value={zip}
          onChange={onChange}
          aria-describedby={`${id}-result`}
          aria-invalid={result?.kind === 'invalid' || undefined}
        />
        <button type="submit" className={styles.submit}>Check</button>
      </div>

      <p id={`${id}-result`} className={styles.result} aria-live="polite">
        {result?.kind === 'yes' && (
          <>
            <span className={styles.yes}>Yes, I come to you.</span> {result.town} is in {result.county}.{' '}
            <SiteLink href={CONTACT.bookUrl} className={styles.book}>{CONTACT.bookLabel}</SiteLink>
          </>
        )}
        {result?.kind === 'no' && (
          <>
            <span className={styles.no}>Not yet.</span> {result.zip} is outside Lee, Collier and Charlotte
            counties, which is where I travel for now.
          </>
        )}
        {result?.kind === 'invalid' && 'Enter a 5-digit zip code.'}
      </p>
    </form>
  );
}

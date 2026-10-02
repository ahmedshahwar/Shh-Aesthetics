import { CONTACT } from '../constants/content';
import Seo from '../components/seo/Seo';
import Button from '../components/ui/Button';
import SiteLink from '../components/ui/SiteLink';
import styles from './NotFoundPage.module.css';

const SUGGESTIONS = [
  { label: 'Treatments', href: '/#services' },
  { label: 'House calls', href: '/#housecall' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFoundPage() {
  return (
    <section className={styles.page} aria-labelledby="nf-title">
      <Seo page="notFound" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <h1 id="nf-title" className={`label ${styles.kicker}`}>Page not found (error 404)</h1>
        <p className={styles.title}>This page kept the secret a little too well.</p>
        <p className={styles.text}>
          The link may be old, or the page may have moved. Everything you came for is a click away.
        </p>

        <div className={styles.ctas}>
          <Button href="/">Back to home</Button>
          <Button href={CONTACT.bookUrl} variant="outline">{CONTACT.bookLabel}</Button>
        </div>

        <nav className={styles.links} aria-label="Popular pages">
          {SUGGESTIONS.map((s) => (
            <SiteLink key={s.href} href={s.href}>{s.label}</SiteLink>
          ))}
        </nav>
      </div>
    </section>
  );
}

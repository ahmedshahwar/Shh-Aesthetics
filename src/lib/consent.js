/*
 * Cookie consent. Necessary cookies (the site itself and the GoHighLevel booking
 * calendar and chat) always run. Anything that tracks visitors for analytics or ads
 * goes in OPTIONAL_SCRIPTS and only loads after the visitor accepts.
 *
 * Example entry: { id: 'ga4', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXX' }
 */
export const OPTIONAL_SCRIPTS = [];

const KEY = 'shh-consent-v1';
const OPEN_EVENT = 'shh:cookie-settings';
const CHANGE_EVENT = 'shh:consent-change';

export function getConsentRaw() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function subscribeConsent(callback) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function saveConsent(analytics) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, savedAt: new Date().toISOString() }));
  } catch {
    /* storage blocked: the choice still applies for this visit */
  }
  if (analytics) loadOptionalScripts();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function loadOptionalScripts() {
  OPTIONAL_SCRIPTS.forEach(({ id, src }) => {
    if (document.getElementById(`opt-${id}`)) return;
    const s = document.createElement('script');
    s.id = `opt-${id}`;
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  });
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(handler) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

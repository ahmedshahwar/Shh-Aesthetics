/**
 * Every photo on the site lives here, so swapping stock for real clinic
 * photography is a one-file job. Drop your own files in src/assets/images
 * and import them, or paste any URL.
 *
 * Current images are Unsplash photos, served from Unsplash's CDN.
 * Note: two of them come from plus.unsplash.com, which is Unsplash+
 * (their paid library). Check your licence before going live.
 */
import heroLogo from '../assets/images/hero-logo.png';

const unsplash = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Unsplash+ (paid library) */
const unsplashPlus = (id, w = 1400) =>
  `https://plus.unsplash.com/premium_photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: heroLogo,

  /* ── Menu cards ── */
  injectables: unsplash('1654374504608-67c4cfe65fca'),
  skincare: unsplash('1570172619644-dfd03ed5d881'),
  wellness: unsplash('1630595271375-5073a6c0638b'),

  /* ── Meet Kelly. PLACEHOLDER: replace with Kelly's own photo. ── */
  aboutMain: unsplash('1706565029539-d09af5896340', 1200),
  aboutDetail: unsplash('1706554597282-3cc8f3dfeca3', 700),

  gallery: [
    { src: unsplash('1761718209835-c8586b7dcac0', 1000), caption: 'Prep, glow, repeat' },
    { src: unsplash('1584457361626-06effef61a7c', 1000), caption: 'Lips, but make it subtle' },
    { src: unsplash('1678428901378-fdb0db557de5', 1000), caption: 'Still unmistakably you' },
    { src: unsplashPlus('1719617671521-848fd017eca0', 1000), caption: 'Quiet confidence' },
    { src: unsplash('1576671081837-49000212a370', 1000), caption: 'Measured, labelled, exact' },
    { src: unsplash('1787651343496-35b3666dd7d2', 1000), caption: 'Your hour. No phones.' },
  ],

  contact: unsplashPlus('1677474827617-6a7269f97574', 1400),
  houseCall: unsplash('1775133163619-219dff93bf15', 1000),
};

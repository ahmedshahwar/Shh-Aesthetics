/*
 * Trust and conversion content only Kelly can supply. Every value here is a
 * PLACEHOLDER until it is replaced with real, verifiable information.
 *
 * Never invent reviews, results or prices.
 *
 * Empty values never appear on the live site. During development (npm run dev),
 * or with VITE_SHOW_PLACEHOLDERS=1 in .env.local for a client demo, each empty
 * slot is drawn in place with a small "Placeholder" tag so you can see where it goes.
 */

export const SHOW_PLACEHOLDERS =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === '1';

/*
 * Real client reviews, shared with permission, word for word.
 * { quote: '...', name: 'First name + last initial', treatment: 'Botox' }
 */
export const TESTIMONIALS = [];

/*
 * Before-and-after photos, with written client consent for web use.
 * { before: '/results/lips-before.jpg', after: '/results/lips-after.jpg',
 *   treatment: 'Lip filler', timing: 'Two weeks after', alt: 'What both photos show' }
 */
export const RESULTS = [];

/* "Starting at" prices by treatment id, e.g. { injectables: 250 }. Hidden until set. */
export const STARTING_PRICES = { injectables: null, skin: null, wellness: null };

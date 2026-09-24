/**
 * Per-page search metadata. Titles stay under ~60 characters and
 * descriptions under ~155 so Google shows them without truncation.
 * The site-wide defaults and structured data live in index.html.
 */
export const SITE_URL = 'https://shhaestheticswellness.com';
 
export const PAGE_SEO = {
  home: {
    path: '/',
    title: 'Mobile Botox & Aesthetics in SW Florida | Shh Aesthetics',
    description:
      'Nurse practitioner-led mobile aesthetics. Natural-looking Botox, fillers, skin care and wellness at your home in Cape Coral, Fort Myers, Naples and nearby.',
  },
  contact: {
    path: '/contact',
    title: 'Book a Free In-Home Consultation | Shh Aesthetics',
    description:
      'Book a free consultation with Kelly, a licensed nurse practitioner. Mobile injectables, skin care and wellness at your home in Lee, Charlotte and Collier counties.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy | Shh Aesthetics & Wellness',
    description:
      'How Shh Aesthetics & Wellness collects, uses and protects your information, including our text messaging program.',
  },
  terms: {
    path: '/terms',
    title: 'Terms & Conditions | Shh Aesthetics & Wellness',
    description:
      'Terms for using the Shh Aesthetics & Wellness website and our appointment and offer text message alerts.',
  },
};
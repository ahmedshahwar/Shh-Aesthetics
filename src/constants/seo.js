/**
 * Per-page search metadata. Titles stay near 60 characters and descriptions
 * under ~155 so Google shows them in full. The build writes these into each
 * page's HTML (scripts/prerender.js); Seo.jsx keeps them in sync on in-app navigation.
 */
export const SITE_URL = 'https://shhaestheticswellness.com';

export const PAGE_SEO = {
  home: {
    path: '/',
    title: 'Mobile Botox & Fillers in Fort Myers & Naples | Shh Aesthetics',
    description:
      'In-home Botox, fillers, skin care and weight management in Cape Coral, Fort Myers and Naples from a licensed nurse practitioner. Free consultation.',
  },
  contact: {
    path: '/contact',
    title: 'Book a Free In-Home Botox Consultation | Shh Aesthetics',
    description:
      'Book a free at-home consultation with Kelly, a licensed nurse practitioner, in Cape Coral, Fort Myers, Naples and across Lee, Charlotte and Collier counties.',
  },
  serviceAreas: {
    path: '/service-areas',
    title: 'In-Home Botox in Lee, Collier & Charlotte County | Shh',
    description:
      'Mobile Botox, fillers and wellness at home in Fort Myers, Cape Coral, Naples, Bonita Springs, Estero, Marco Island, Punta Gorda and nearby. Free consultation.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy | Shh Aesthetics & Wellness',
    description:
      'How Shh Aesthetics & Wellness collects, uses and protects your information, including cookies and our text messaging program.',
  },
  terms: {
    path: '/terms',
    title: 'Terms & Conditions | Shh Aesthetics & Wellness',
    description:
      'Terms for using the Shh Aesthetics & Wellness website, our medical disclaimer, and our appointment and offer text message alerts.',
  },
  notFound: {
    path: null,
    title: 'Page Not Found | Shh Aesthetics',
    description:
      'This page could not be found. Shh Aesthetics offers mobile Botox, fillers, skin care and wellness in Fort Myers, Cape Coral and Naples.',
  },
};

export const ROUTE_PAGES = {
  '/': 'home',
  '/contact': 'contact',
  '/service-areas': 'serviceAreas',
  '/privacy': 'privacy',
  '/terms': 'terms',
};

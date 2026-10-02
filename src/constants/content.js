import { IMAGES } from './images';

export const BRAND = {
  name: 'Shh Aesthetics',
  legal: 'Shh Aesthetics & Wellness LLC',
  tagline: 'beauty is our little secret',
};

export const CONTACT = {
  contactUrl: '/contact',
  bookUrl: '/contact#book',
  bookLabel: 'Book a free consult',
  /* GoHighLevel booking widget: the src="" and id="" from GHL's embed code. */
  calendarEmbedUrl: 'https://api.leadconnectorhq.com/widget/booking/DAIUrM4FpFLGg0LDlzmd',
  calendarEmbedId: 'DAIUrM4FpFLGg0LDlzmd_1790031827490',
  email: 'kelly@shhaestheticswellness.com',
  phone: '(609) 221-2734',
  phoneHref: 'tel:+16092212734',
  address: '7901 4th St N, Ste 300, St. Petersburg, FL 33702',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=7901+4th+St+N+Ste+300+St.+Petersburg+FL+33702',
  location: 'Southwest Florida',
  areas: ['Lee County', 'Charlotte County', 'Collier County'],
  areasShort: 'Lee, Charlotte & Collier',
  cities: ['Cape Coral', 'Fort Myers', 'Naples', 'Bonita Springs', 'Estero', 'Lehigh Acres', 'Sanibel', 'Marco Island', 'Punta Gorda', 'Port Charlotte'],
  instagram: 'https://www.instagram.com/shhaestheticswellness/',
  facebook: 'https://www.facebook.com/shhaestheticswellness',
  /* GoHighLevel chat widget: paste the data-widget-id from GHL's chat embed code. Empty = no chat. */
  chatWidgetId: '',
  disclaimer: 'Every treatment starts with a consultation. Results vary from person to person.',
};

export const MEDICAL_DISCLAIMER =
  'The information on this website is general education, not medical advice. Treatments are provided only after a consultation with a licensed provider, and not every treatment is right for everyone. Individual results vary. In an emergency, call 911.';

/* Hash links point at home-page sections and work from any page. */
export const NAV_LINKS = [
  { label: 'Treatments', href: '/#services' },
  { label: 'House calls', href: '/#housecall' },
  { label: 'About Kelly', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
];

export const MANIFESTO = {
  statement: 'The best compliment is a confused one.',
  body:
    '“Did you change your hair?” “Were you away somewhere?” That is the goal. Fresh, not frozen. Refreshed, not rebuilt. You on a very good day, with nothing anyone can quite point to.',
  principles: [
    {
      title: 'Less, placed well.',
      text: 'We start conservative. Adding a touch at your follow-up is easy. Waiting for too much to wear off is not.',
    },
    {
      title: 'Medicine, not a menu.',
      text: 'Every plan starts with your health history and a real consultation with a licensed nurse practitioner.',
    },
    {
      title: 'Your place, your pace.',
      text: 'Treatments happen at home, on your schedule. No waiting room, no lobby run-ins, no rush.',
    },
  ],
};

export const SERVICES = [
  {
    id: 'injectables',
    title: 'Injectables',
    kicker: 'Botox, Dysport and fillers',
    sass: 'Softer lines, a little lift, and zero “what did you get done” energy.',
    description:
      'A conservative hand and a careful eye for proportion. We refine what is already there instead of reinventing it, so you still look like you, only better rested.',
    items: ['Botox & Dysport', 'Dermal fillers', 'Lip enhancement', 'Jawline contouring'],
    cta: 'Plan my injectables',
    image: IMAGES.injectables,
    alt: 'Close-up of a cosmetic injection treatment',
    theme: 'dark',
  },
  {
    id: 'skin',
    title: 'Skin Care',
    kicker: 'Peptides and home care',
    sass: 'Better skin, fewer products. Your bathroom counter will thank you.',
    description:
      'A plan for the skin you actually have. Nurse practitioner-guided peptide therapy and a home routine with nothing in it you do not need.',
    items: ['Peptide therapy', 'Custom home regimens'],
    cta: 'Build my skin plan',
    image: IMAGES.skincare,
    alt: 'Skincare products arranged on a vanity',
    theme: 'light',
  },
  {
    id: 'wellness',
    title: 'Wellness',
    kicker: 'Medically guided weight management',
    sass: 'Real support, regular check-ins, and no group weigh-ins.',
    description:
      'Weight management planned around your health history, with honest expectations and follow-ups that keep you on track. How you feel matters as much as how you look.',
    items: ['Weight management', 'Goal setting', 'Regular check-ins'],
    cta: 'Start my wellness plan',
    image: IMAGES.wellness,
    alt: 'A calm wellness moment at home',
    theme: 'gold',
  },
];

export const HOUSE_CALL = {
  lede:
    'Shh is a mobile practice. I bring everything your treatment needs, set up in a clean, well-lit spot in your home, and pack it all out when we are done. Your couch is the waiting room.',
  steps: [
    { title: 'You book', text: 'Choose a time online or give me a call. The consultation is free, with no commitment.' },
    { title: 'I come to you', text: 'I arrive with everything, including the good lighting. You just pick the room.' },
    { title: 'You glow', text: 'No drive home, no waiting room, and no running into a coworker in the lobby.' },
  ],
};

export const ABOUT = {
  paragraphs: [
    'Kelly is a licensed nurse practitioner with a clinician\'s training and a firm opinion about “too much.” If something will not suit you, she will tell you, kindly and clearly.',
    'She makes house calls so care never feels rushed. Every visit starts with a real conversation, and every plan is built around the face you already have. No upsells, and no add-ons you did not ask for.',
  ],
  rule: 'If you can tell, it\'s too much.',
  credentials: [
    { label: 'Credentials', value: 'Licensed nurse practitioner' },
    { label: 'Approach', value: 'Less, placed well' },
    { label: 'House calls in', value: 'Lee, Charlotte & Collier' },
  ],
};

export const GALLERY_HEADING = 'Glow, on your terms.';

/* Answered in Kelly's own voice. index.html mirrors these for search engines. */
export const FAQS = [
  {
    id: 'house-calls',
    q: 'Wait, you come to my house?',
    a: "Yes, that's the whole idea. I bring everything your treatment needs and set up wherever you're comfortable. No office, no waiting room, no small talk with a receptionist.",
  },
  {
    id: 'free-consult',
    q: 'Is the consultation really free?',
    a: 'Yes. We talk through your goals, your health history and your options, and you decide what happens next. No charge and no pressure.',
  },
  {
    id: 'areas',
    q: 'What areas do you cover?',
    a: "Lee, Charlotte and Collier counties, including Cape Coral, Fort Myers, Naples and nearby. Not sure you're in range? Ask, and I'll tell you when I can be there.",
  },
  {
    id: 'noticeable',
    q: 'Will people know I had something done?',
    a: 'Only if you tell them. I aim for results nobody can quite point to. Expect “you look great,” never “what happened to your face.”',
  },
  {
    id: 'pain',
    q: 'Does it hurt?',
    a: 'Usually less than your last bikini wax. I use numbing where it helps and go at your pace, always.',
  },
  {
    id: 'duration',
    q: 'How long does an appointment take?',
    a: 'Usually 1 to 2 hours, depending on the treatment. And your commute home is zero steps.',
  },
  {
    id: 'undecided',
    q: "What if I don't know what I want?",
    a: "That's what the consultation is for. We look, we talk, and we build a plan together. You never have to decide on the spot.",
  },
  {
    id: 'results',
    q: 'How long do results last?',
    a: "It depends on the treatment and on you. As a rough guide, Botox tends to last three to four months and fillers often last longer. I'll give you an honest timeline for your face, not a sales pitch.",
  },
  {
    id: 'candidate',
    q: 'Is everyone a good candidate?',
    a: "Not always. Some health conditions, medications and pregnancy rule out certain treatments. That's why every plan starts with your health history, and why I'll tell you if something isn't right for you.",
  },
  {
    id: 'provider',
    q: 'Who will actually be treating me?',
    a: 'Me. Kelly, licensed nurse practitioner, for every consultation and every treatment, start to finish.',
  },
];

export const CONTACT_PAGE = {
  intro:
    'Questions, timing, a treatment you saw on Instagram? Call, email or book a time below. I reply within one business day.',
  quickAnswers: ['house-calls', 'free-consult', 'areas', 'duration'],
};

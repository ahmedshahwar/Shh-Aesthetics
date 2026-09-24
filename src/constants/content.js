import { IMAGES } from './images';

export const BRAND = {
  name: 'Shh Aesthetics',
  legal: 'Shh Aesthetics & Wellness LLC',
  tagline: 'beauty is our little secret',
};

export const CONTACT = {
  contactUrl: '/contact',
  bookUrl: '/contact#book',
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
  instagram: 'https://instagram.com/shhaestheticswellness',
  facebook: 'https://facebook.com/shhaestheticswellness',
  disclaimer: 'All treatments begin with a consultation. Results vary from person to person.',
};

/* Hash links point at home-page sections and work from any page. */
export const NAV_LINKS = [
  { label: 'Menu', href: '/#services' },
  { label: 'House calls', href: '/#housecall' },
  { label: 'Kelly', href: '/#about' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
];

export const CONTACT_PAGE = {
  intro:
    "Have a question or want to request an appointment? Use the chat button in the bottom corner of this page, and we'll get back to you within one business day. You can also call or email us.",
  quickAnswers: ['Wait, you come to my house?', 'Is the consultation free?', 'What areas do you cover?', 'How long does an appointment take?'],
};

/* Manifesto: scroll-lit statement. `mark` tokens render as champagne sparkles. */
export const MANIFESTO = [
  'We', "don't", 'do', 'frozen.', 'We', "don't", 'do', 'duck.',
  { mark: '\u2726' },
  'We', 'do', 'the', 'kind', 'of', 'fresh', 'that', 'makes', 'your', 'friends',
  'suspicious', 'of', 'your', 'skincare', 'routine',
  { mark: '\u2726' },
  'and', 'your', 'ex', 'suspicious', 'of', 'everything.',
];

export const STATS = [
  { value: 100, suffix: '%', label: 'Nurse practitioner led. No shortcuts, no guesswork.' },
  { value: 0, suffix: '', label: 'Waiting rooms, frozen foreheads and pushy upsells.' },
  { value: 3, suffix: '', label: 'Ways to glow: injectables, skin and wellness.' },
];

export const SERVICES = [
  {
    id: 'injectables',
    title: 'Injectables',
    kicker: 'Subtle refinement',
    sass: 'Softer lines, fuller where it counts, and absolutely zero "what did you get done" energy.',
    description:
      'A light, conservative hand and an obsessive eye for proportion. We tweak, we never transform. You will still look like you, just the version that slept eight hours.',
    items: ['Botox & Dysport', 'Dermal fillers', 'Lip enhancement', 'Jawline contouring'],
    image: IMAGES.injectables,
    theme: 'dark',
  },
  {
    id: 'skin',
    title: 'Skin Care',
    kicker: 'Luminous by nature',
    sass: 'Glass skin without the ring light. Your foundation is about to feel very unemployed.',
    description:
      'A plan built for your actual skin, not the one on the ad. Nurse practitioner-guided peptide therapy and a home routine with nothing in it you do not need.',
    items: ['Peptide therapy', 'Custom home regimens'],
    image: IMAGES.skincare,
    theme: 'light',
  },
  {
    id: 'wellness',
    title: 'Wellness',
    kicker: 'Feel as good as you look',
    sass: 'Because tired is not a personality. Let us handle the inside job.',
    description:
      'Support for how you feel, not just how you photograph. Medically guided weight management with real check-ins, honest expectations and zero group weigh-ins.',
    items: ['Weight management', 'Goal setting', 'Regular reviews'],
    image: IMAGES.wellness,
    theme: 'gold',
  },
];

export const HOUSE_CALL = {
  steps: [
    { title: 'You book', text: 'Pick a time that suits you. Free consult, zero commitment, no pants required.' },
    { title: 'I pull up', text: 'Everything I need arrives with me. You supply the good lighting and the gossip.' },
    { title: 'You glow', text: 'No commute, no waiting room, no running into your coworker in the lobby.' },
  ],
};

export const MARQUEE_WORDS = ['Enhanced', 'Confident', 'Natural', 'We come to you', 'Never frozen', 'Always you'];

export const ABOUT = {
  paragraphs: [
    'Kelly is a licensed nurse practitioner with a clinician\'s precision and a strong opinion about "too much." Spoiler: she will tell you.',
    'And she makes house calls. Every visit starts with a real conversation, on your turf. No rush, no upsell, no menu of add-ons you did not ask for. Just thoughtful, evidence-based care designed around the face you already have.',
  ],
  credentials: [
    { label: 'Credentials', value: 'Licensed Nurse Practitioner' },
    { label: 'Philosophy', value: 'Less, but perfectly placed' },
    { label: 'Makes house calls in', value: 'Lee, Charlotte & Collier' },
  ],
};

/*
 * PLACEHOLDER REVIEWS. These are sample copy written to show the layout.
 * Replace every entry with real, verified client reviews (with permission)
 * before this site goes live.
 */
export const REVIEWS = [
  {
    name: 'Jess M.',
    treatment: 'Botox',
    text: 'Okay so I went in for "a little something" and walked out looking like I slept 10 hours and drank my water. My sister asked if I got bangs. I did not get bangs.',
  },
  {
    name: 'Danielle R.',
    treatment: 'Lip filler',
    text: 'Kelly talked me OUT of more filler. Who does that?? That is exactly why she is the only one allowed near my face now.',
  },
  {
    name: 'Maria G.',
    treatment: 'Filler',
    text: '10/10. She came to MY house, nobody rushed me, and it still looks natural three weeks later.',
  },
  {
    name: 'Alyssa T.',
    treatment: 'First time Botox',
    text: 'I was SO nervous lol. She explained every single step, it was barely a pinch, and I booked my next one before she even packed up.',
  },
  {
    name: 'Brooke P.',
    treatment: 'Peptides',
    text: 'My coworkers keep asking what I have been doing differently. I just smile and say nothing. shh.',
  },
  {
    name: 'Kristen L.',
    treatment: 'Weight management',
    text: 'Not a "wellness girl" at all, but having someone actually check in on me every few weeks changed everything. First plan I have ever stuck to.',
  },
];

/* Answered in Kelly's own voice. */
export const FAQS = [
  {
    q: 'Wait, you come to my house?',
    a: "I do, that's the whole idea. I come to you, so there's no office, no waiting room and no small talk with a receptionist. Just you, me and your very comfortable couch.",
  },
  {
    q: 'Is the consultation free?',
    a: "Yes. There's no charge for me to come out and talk it through. Worst case, you get a free skin pep talk.",
  },
  {
    q: 'What areas do you cover?',
    a: "Lee, Charlotte and Collier counties. Tell me where you are and I'll tell you when I can be there.",
  },
  {
    q: 'Will people know I had something done?',
    a: 'Only if you tell them. My whole thing is results nobody can quite point to. Expect "you look amazing," never "what happened to your face."',
  },
  {
    q: 'Does it hurt?',
    a: 'Less than your last bikini wax. I use numbing where it helps and go at your pace, always.',
  },
  {
    q: 'How long does an appointment take?',
    a: "Usually 1 to 2 hours, sometimes longer depending on what we're doing. The good news? Your commute home is zero steps.",
  },
  {
    q: "What if I don't know what I want?",
    a: "Perfect. That's what the consultation is for. We talk, we look, we build a plan together. No pressure and no upsell, ever.",
  },
  {
    q: 'How long do results last?',
    a: "It depends on the treatment and on you. I'll give you an honest timeline for your face, not a sales pitch.",
  },
  {
    q: 'Who will actually be treating me?',
    a: 'Me. Kelly, licensed nurse practitioner. Your face is not a training exercise.',
  },
];

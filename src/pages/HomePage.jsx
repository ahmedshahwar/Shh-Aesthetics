import { FAQS } from '../constants/content';
import Seo from '../components/seo/Seo';
import JsonLd from '../components/seo/JsonLd';
import Hero from '../components/sections/Hero';
import Manifesto from '../components/sections/Manifesto';
import Services from '../components/sections/Services';
import HouseCall from '../components/sections/HouseCall';
import Gallery from '../components/sections/Gallery';
import About from '../components/sections/About';
import Faq from '../components/sections/Faq';
import Contact from '../components/sections/Contact';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <Seo page="home" />
      <JsonLd data={FAQ_SCHEMA} />
      {/* Hero stays pinned only until the manifesto has fully covered it */}
      <div>
        <Hero />
        <Manifesto />
      </div>
      <Services />
      <HouseCall />
      <Gallery />
      <About />
      <Faq />
      <Contact />
    </>
  );
}

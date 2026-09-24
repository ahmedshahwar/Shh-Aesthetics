import Seo from '../components/seo/Seo';
import Hero from '../components/sections/Hero';
import Manifesto from '../components/sections/Manifesto';
import Services from '../components/sections/Services';
import HouseCall from '../components/sections/HouseCall';
import Marquee from '../components/sections/Marquee';
import About from '../components/sections/About';
import Gallery from '../components/sections/Gallery';
import Reviews from '../components/sections/Reviews';
import Faq from '../components/sections/Faq';
import Contact from '../components/sections/Contact';

export default function HomePage({ ready }) {
  return (
    <main>
      <Seo page="home" />
      {/* Hero stays pinned only until the manifesto has fully covered it */}
      <div>
        <Hero ready={ready} />
        <Manifesto />
      </div>
      <Services />
      <HouseCall />
      <Marquee />
      <About />
      <Gallery />
      <Reviews />
      <Faq />
      <Contact />
    </main>
  );
}

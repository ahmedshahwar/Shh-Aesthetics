import Seo from '../components/seo/Seo';
import ContactHero from '../components/sections/contact/ContactHero';
import Booking from '../components/sections/contact/Booking';
import QuickAnswers from '../components/sections/contact/QuickAnswers';

export default function ContactPage({ ready }) {
  return (
    <main>
      <Seo page="contact" />
      {/* Same pinned-hero trick as the home page */}
      <div>
        <ContactHero ready={ready} />
        <Booking />
      </div>
      <QuickAnswers />
    </main>
  );
}

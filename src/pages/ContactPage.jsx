import Seo from '../components/seo/Seo';
import ContactHero from '../components/sections/contact/ContactHero';
import Booking from '../components/sections/contact/Booking';
import QuickAnswers from '../components/sections/contact/QuickAnswers';

export default function ContactPage() {
  return (
    <>
      <Seo page="contact" />
      {/* Same pinned-hero transition as the home page */}
      <div>
        <ContactHero />
        <Booking />
      </div>
      <QuickAnswers />
    </>
  );
}

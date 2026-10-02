import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { destroySmoothScroll, initSmoothScroll } from './lib/smoothScroll';
import ScrollManager from './components/layout/ScrollManager';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CookieConsent from './components/layout/CookieConsent';
import ChatWidget from './components/layout/ChatWidget';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Animation features load in a separate chunk, after the page is already usable.
const loadMotion = () => import('./lib/motionFeatures').then((mod) => mod.default);

export default function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
    idle(() => initSmoothScroll());
    return destroySmoothScroll;
  }, []);

  return (
    <LazyMotion features={loadMotion} strict>
      <MotionConfig reducedMotion="user">
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollManager />
        <Navbar />

        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <CookieConsent />
        <ChatWidget />
      </MotionConfig>
    </LazyMotion>
  );
}

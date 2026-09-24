import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { destroySmoothScroll, initSmoothScroll, setScrollLocked } from './lib/smoothScroll';
import Preloader from './components/layout/Preloader';
import Cursor from './components/layout/Cursor';
import ScrollProgress from './components/layout/ScrollProgress';
import ScrollManager from './components/layout/ScrollManager';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    initSmoothScroll();
    setScrollLocked(true);
    return destroySmoothScroll;
  }, []);

  const handleLoaded = useCallback(() => {
    setScrollLocked(false);
    setReady(true);
  }, []);

  return (
    <>
      <Preloader onDone={handleLoaded} />
      <Cursor />
      <ScrollProgress />
      <ScrollManager />
      <Navbar ready={ready} />

      <Routes>
        <Route path="/" element={<HomePage ready={ready} />} />
        <Route path="/contact" element={<ContactPage ready={ready} />} />
        <Route path="/privacy" element={<PrivacyPage ready={ready} />} />
        <Route path="/terms" element={<TermsPage ready={ready} />} />
        <Route path="*" element={<HomePage ready={ready} />} />
      </Routes>

      <Footer />
    </>
  );
}

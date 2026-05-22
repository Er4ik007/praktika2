import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';


const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const SupportPage = lazy(() => import('./pages/SupportPage').then(m => ({ default: m.SupportPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// BOM 
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      {/* Заменили bg-white на bg-body, text-dark на text-body */}
      <div className="min-vh-100 bg-body text-body d-flex flex-column selection-red">
        <ScrollToTop />
        <Header />
        <main style={{ minHeight: 'calc(100vh - 350px)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <style>{`
          .font-sans { font-family: 'Inter', sans-serif; }
          .selection-red::selection { background: #fee2e2; color: #ef4444; }
          .fw-black { font-weight: 900; }
        `}</style>
      </div>
    </Router>
  );
}
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CosmicBackground } from './components/CosmicBackground';
import { LangProvider, useLang } from './i18n/LanguageContext';
import { AdminRoute } from './components/AdminRoute';
import { RatingsProvider } from './contexts/RatingsContext';


const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const CatalogPage = lazy(() => import('./pages/CatalogPage').then(m => ({ default: m.CatalogPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const SupportPage = lazy(() => import('./pages/SupportPage').then(m => ({ default: m.SupportPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const VenueDetailPage = lazy(() => import('./pages/VenueDetailPage').then(m => ({ default: m.VenueDetailPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { lang } = useLang();

  return (
    <>
      <CosmicBackground />
      <div className="min-vh-100 bg-body text-body d-flex flex-column selection-red">
        <ScrollToTop />
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ minHeight: 'calc(100vh - 350px)' }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/venue/:id" element={<VenueDetailPage />} />
              <Route path="/contacts" element={<ContactPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <Footer />
        <style>{`
          .font-sans { font-family: 'Inter', sans-serif; }
          .selection-red::selection { background: #fee2e2; color: #ef4444; }
          .fw-black { font-weight: 900; }
        `}</style>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LangProvider>
        <RatingsProvider>
          <AppContent />
        </RatingsProvider>
      </LangProvider>
    </Router>
  );
}

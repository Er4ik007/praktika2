import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

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
      <div className="min-vh-100 bg-white font-sans text-dark overflow-hidden selection-red">
        <ScrollToTop />
        <Header />
        <main style={{ minHeight: 'calc(100vh - 350px)' }}>
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
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { venues, Venue } from '../data';
import { VenueCard } from '../components/VenueCard';
import { Minsk3DWidget } from '../components/Minsk3DWidget';
import { useLang } from '../i18n/LanguageContext';

const SLIDES_KEYS = [
  { titleKey: 'home.slide1.title', subtitleKey: 'home.slide1.subtitle', image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80", link: "/catalog" },
  { titleKey: 'home.slide2.title', subtitleKey: 'home.slide2.subtitle', image: "src/images/dran.jpg", link: "/catalog?filter=belarusian" },
  { titleKey: 'home.slide3.title', subtitleKey: 'home.slide3.subtitle', image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80", link: "/catalog?filter=restaurant" },
  { titleKey: 'home.slide4.title', subtitleKey: 'home.slide4.subtitle', image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80", link: "/catalog?filter=coffee" },
  { titleKey: 'home.slide5.title', subtitleKey: 'home.slide5.subtitle', image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80", link: "/catalog?filter=bar" },
];

const FEATURED_VENUES = venues.slice(0, 3);

export const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { t } = useLang();

  useEffect(() => {
    document.title = "Главная";
  }, []);

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:8000/api/favorites', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setFavorites(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = useCallback(async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const isNowFavorite = !favorites.includes(id);
    setFavorites(prev => isNowFavorite ? [...prev, id] : prev.filter(fid => fid !== id));
    try {
      const res = await fetch('http://localhost:8000/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ venue_id: id })
      });
      if (!res.ok) {
        setFavorites(prev => !isNowFavorite ? [...prev, id] : prev.filter(fid => fid !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }, [favorites, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % SLIDES_KEYS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const SLIDES = SLIDES_KEYS.map(s => ({
    title: t(s.titleKey),
    subtitle: t(s.subtitleKey),
    image: s.image,
    link: s.link,
  }));

  return (
    <div>
      <section className="position-relative overflow-hidden w-100 mt-5" style={{ height: '80vh' }}>
        <AnimatePresence initial={false}>
          <motion.div key={current} initial={{ x: '100%', opacity: 0.5 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '-100%', opacity: 0.5 }} transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.5 } }} className="position-absolute inset-0 w-100 h-100">
            <div className="position-absolute inset-0 w-100 h-100 bg-cover bg-center" style={{ backgroundImage: `url(${SLIDES[current].image})` }} />
            <div className="position-absolute inset-0 w-100 h-100 bg-black opacity-50" />
            <div className="position-relative h-100 z-1 d-flex flex-column justify-content-center align-items-center text-center px-3 text-white">
              <motion.h1 key={`title-${current}-${t('home.slide1.title')}`} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="display-2 fw-black mb-3 tracking-tighter text-white">{SLIDES[current].title}</motion.h1>
              <motion.p key={`sub-${current}-${t('home.slide1.subtitle')}`} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="fs-3 fw-light opacity-75 max-w-2xl">{SLIDES[current].subtitle}</motion.p>

              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4">
                <Link to={SLIDES[current].link} className="btn btn-primary-custom">{t('home.goto')}</Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 z-2 d-flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="border-0 rounded-pill p-0 transition-all"
              style={{
                width: i === current ? '40px' : '10px',
                height: '10px',
                backgroundColor: i === current ? '#ef4444' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </section>

      <section className="py-5 container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 mt-5 pt-5">
          <div className="mb-4 mb-md-0">
            <h2 className="display-5 fw-black italic text-uppercase tracking-tight mb-2 text-body-emphasis">{t('home.popular')}</h2>
          </div>
          <Link to="/catalog" className="btn btn-link text-danger fw-bold text-decoration-none d-inline-flex align-items-center gap-1 hover-move-x">
            {t('home.allList')} <ChevronRight size={20} />
          </Link>
        </div>

        <div className="row g-4">
          {FEATURED_VENUES.map((venue: Venue, index: number) => (
            <div key={venue.id} className="col-md-4">
              <VenueCard
                venue={venue}
                isFavorite={favorites.includes(venue.id)}
                onToggleFavorite={toggleFavorite}
                index={index}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-5 bg-body-tertiary overflow-hidden position-relative mt-5">
        <div className="container position-relative z-1 py-5">
          <div className="row align-items-center justify-content-between g-5">
            <div className="col-lg-5">
              <h2 className="display-4 fw-black mb-4 italic text-uppercase lh-1 tracking-tighter text-body-emphasis">
                {t('home.about.title')}
              </h2>
              <p className="text-body-secondary fs-5 mb-5 lh-lg" style={{ maxWidth: '500px' }}>
                {t('home.about.desc')}
              </p>
              <div className="row g-4 mt-2">
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">150+</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">{t('home.stats.places')}</div>
                </div>
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">12k</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">{t('home.stats.guests')}</div>
                </div>
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">500+</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">{t('home.stats.reviews')}</div>
                </div>
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">24/7</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">{t('home.stats.support')}</div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 position-relative ms-auto">
              <div className="position-absolute inset-0 d-flex justify-content-center align-items-center" style={{ zIndex: 0, pointerEvents: 'none' }}>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: '350px', height: '350px',
                    background: 'linear-gradient(45deg, #ef4444, #f87171)',
                    filter: 'blur(80px)', borderRadius: '50%', position: 'absolute'
                  }}
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 360], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: '400px', height: '400px',
                    background: 'linear-gradient(45deg, #fbbf24, #ef4444)',
                    filter: 'blur(100px)', borderRadius: '50%', position: 'absolute',
                    marginLeft: '100px', marginTop: '100px'
                  }}
                />
              </div>

              <div className="position-relative" style={{ zIndex: 1, minHeight: '550px' }}>
                <Minsk3DWidget />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

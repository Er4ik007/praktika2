import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { venues, Venue } from '../data';
import { VenueCard } from '../components/VenueCard';

export const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    { title: "Гастрономический Минск", subtitle: "Откройте для себя лучшие вкусы столицы", image: "src/images/rest.jpg" },
    { title: "Белорусская Кухня", subtitle: "Традиции в современном исполнении", image: "src/images/dran.jpg" }
  ];

  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(fid => fid !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      <section className="position-relative overflow-hidden w-100 mt-5" style={{ height: '80vh' }}>
        <AnimatePresence initial={false}>
          <motion.div key={current} initial={{ x: '100%', opacity: 0.5 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '-100%', opacity: 0.5 }} transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.5 } }} className="position-absolute inset-0 w-100 h-100">
            <div className="position-absolute inset-0 w-100 h-100 bg-cover bg-center" style={{ backgroundImage: `url(${slides[current].image})` }} />
            <div className="position-absolute inset-0 w-100 h-100 bg-black opacity-50" />
            <div className="position-relative h-100 z-1 d-flex flex-column justify-content-center align-items-center text-center px-3 text-white">
              <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="display-2 fw-black mb-3 tracking-tighter text-white">{slides[current].title}</motion.h1>
              <Link to="/catalog" className="btn btn-primary-custom mt-4">Смотреть каталог</Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="py-5 container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 mt-5 pt-5">
          <div className="mb-4 mb-md-0">
            <h2 className="display-5 fw-black italic text-uppercase tracking-tight mb-2 text-body-emphasis">Популярное</h2>
          </div>
          <Link to="/catalog" className="btn btn-link text-danger fw-bold text-decoration-none d-inline-flex align-items-center gap-1 hover-move-x">
            Весь список <ChevronRight size={20} />
          </Link>
        </div>

        <div className="row g-4">
          {venues.slice(0, 3).map((venue: Venue) => (
            <div key={venue.id} className="col-md-4">
              <VenueCard venue={venue} isFavorite={favorites.includes(venue.id)} onToggleFavorite={toggleFavorite} />
            </div>
          ))}
        </div>
      </section>

      {/* Адаптивный блок: светло-серый днем, темно-серый ночью */}
      <section className="py-5 bg-body-tertiary overflow-hidden position-relative mt-5">
        <div className="container position-relative z-1 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="display-4 fw-black mb-4 italic text-uppercase lh-1 tracking-tighter text-body-emphasis">
                Минск — это про еду и атмосферу
              </h2>
              <div className="row g-4 mt-3">
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">150+</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">Проверенных мест</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .z-1 { z-index: 1; }
        .fw-black { font-weight: 900; }
        .hover-move-x:hover { transform: translateX(8px); }
      `}</style>
    </div>
  );
};
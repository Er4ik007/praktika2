import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom'; // Добавили useNavigate
import { ChevronRight } from 'lucide-react';
import { venues, Venue } from '../data';
import { VenueCard } from '../components/VenueCard';
import { Minsk3DWidget } from '../components/Minsk3DWidget';

export const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate(); // Для редиректа на логин
  
  useEffect(() => {
    document.title = "Главная";
  }, []);

  const slides = [
    { 
      title: "Гастрономический Минск", 
      subtitle: "Откройте для себя лучшие вкусы столицы", 
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80",
      link: "/catalog"
    },
    { 
      title: "Белорусская Кухня", 
      subtitle: "Традиции, драники и мачанка в лучшем исполнении", 
      image: "src/images/dran.jpg",
      link: "/catalog?filter=belarusian"
    },
    { 
      title: "Рестораны", 
      subtitle: "Идеальные места для идеального ужина", 
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80",
      link: "/catalog?filter=restaurant"
    },
    { 
      title: "Культура Кофе", 
      subtitle: "Лучшие спешелти кофейни в центре города", 
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80",
      link: "/catalog?filter=coffee"
    },
    { 
      title: "Атмосферные Бары", 
      subtitle: "Авторские коктейли, крафт и живая музыка", 
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80",
      link: "/catalog?filter=bar"
    }
  ];

  // === НОВАЯ ЛОГИКА ИЗБРАННОГО (СИНХРОНИЗАЦИЯ С БД) ===
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    // Загружаем лайки с сервера при открытии Главной страницы
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
        console.error("Ошибка загрузки избранного", err);
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (id: string) => {
    const token = localStorage.getItem('token');
    
    // Если не вошел в аккаунт — отправляем на страницу логина
    if (!token) {
      alert("Пожалуйста, войдите в аккаунт, чтобы сохранять заведения в избранное.");
      navigate('/login');
      return;
    }

    // Оптимистичный UI
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
        // Откат, если ошибка
        setFavorites(prev => !isNowFavorite ? [...prev, id] : prev.filter(fid => fid !== id));
        alert("Ошибка при сохранении");
      }
    } catch (err) {
      console.error(err);
    }
  };
  // === КОНЕЦ НОВОЙ ЛОГИКИ ===

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  const featuredVenues = venues.slice(0, 3);

  return (
    <div>
      <section className="position-relative overflow-hidden w-100 mt-5" style={{ height: '80vh' }}>
        <AnimatePresence initial={false}>
          <motion.div key={current} initial={{ x: '100%', opacity: 0.5 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '-100%', opacity: 0.5 }} transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.5 } }} className="position-absolute inset-0 w-100 h-100">
            <div className="position-absolute inset-0 w-100 h-100 bg-cover bg-center" style={{ backgroundImage: `url(${slides[current].image})` }} />
            <div className="position-absolute inset-0 w-100 h-100 bg-black opacity-50" />
            <div className="position-relative h-100 z-1 d-flex flex-column justify-content-center align-items-center text-center px-3 text-white">
              <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="display-2 fw-black mb-3 tracking-tighter text-white">{slides[current].title}</motion.h1>
              <motion.p initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="fs-3 fw-light opacity-75 max-w-2xl">{slides[current].subtitle}</motion.p>
              
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4">
                <Link to={slides[current].link} className="btn btn-primary-custom">Перейти</Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 z-2 d-flex gap-2">
          {slides.map((_, i) => (
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
            <h2 className="display-5 fw-black italic text-uppercase tracking-tight mb-2 text-body-emphasis">Популярное</h2>
          </div>
          <Link to="/catalog" className="btn btn-link text-danger fw-bold text-decoration-none d-inline-flex align-items-center gap-1 hover-move-x">
            Весь список <ChevronRight size={20} />
          </Link>
        </div>

        {/* ПЕРЕДАЕМ ИНДЕКС И НОВУЮ ФУНКЦИЮ TOGGLE В КАРТОЧКИ */}
        <div className="row g-4">
          {featuredVenues.map((venue: Venue, index: number) => (
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
                Минск — это про еду и атмосферу
              </h2>
              <p className="text-body-secondary fs-5 mb-5 lh-lg" style={{ maxWidth: '500px' }}>
                Мы лично проверяем каждое заведение, прежде чем добавить его в каталог. Честные отзывы, актуальные меню и бронирование в пару кликов.
              </p>
              <div className="row g-4 mt-2">
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">150+</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">Проверенных мест</div>
                </div>
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">12k</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">Довольных гостей</div>
                </div>
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">500+</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">Честных отзывов</div>
                </div>
                <div className="col-6">
                  <div className="display-5 fw-black text-danger mb-1">24/7</div>
                  <div className="small text-uppercase fw-bold tracking-widest text-body-secondary">Поддержка</div>
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
      <style>{`
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .z-1 { z-index: 1; }
        .fw-black { font-weight: 900; }
        .hover-move-x:hover { transform: translateX(8px); }
        .grayscale { filter: grayscale(100%); }
        .hover-color:hover { filter: grayscale(0%); }
      `}</style>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, ChevronLeft, CreditCard, Clock, Instagram, Send, X, ExternalLink } from 'lucide-react';
import { venues } from '../data';
import { BookingForm } from '../components/BookingForm';

const initialReviews = [
  { id: 1, author: 'Анна С.', rating: 5, text: 'Потрясающее место! Обязательно придем еще раз.', date: 'Вчера' },
  { id: 2, author: 'Максим', rating: 4, text: 'Вкусная еда, но в пятницу вечером пришлось подождать столик.', date: '3 дня назад' }
];

export const VenueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = venues.find(v => v.id === id);

  const [reviews, setReviews] = useState(initialReviews);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (activeImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!venue) return <div className="container py-5 my-5 text-center"><h1 className="display-4 fw-bold">Не найдено</h1></div>;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newReview = { id: Date.now(), author: 'Вы', rating: newReviewRating, text: newReviewText, date: 'Только что' };
    setReviews([newReview, ...reviews]);
    setNewReviewText('');
    setNewReviewRating(5);
    setIsReviewSubmitted(true);
    setTimeout(() => setIsReviewSubmitted(false), 3000);
  };

  return (
    <div className="pt-5">
      <section className="position-relative w-100" style={{ height: '50vh' }}>
        <img src={venue.image} alt={venue.name} className="w-100 h-100 object-fit-cover" />
        <div className="position-absolute inset-0 bg-black opacity-25" />
        <button onClick={() => navigate(-1)} className="position-absolute top-0 start-0 m-4 p-3 bg-body border-0 rounded-circle shadow-sm z-2">
          <ChevronLeft size={24} className="text-body" />
        </button>
      </section>

      <section className="container mt-n5 position-relative z-1 mb-5">
        <div className="card border-0 rounded-4 p-4 p-md-5 shadow-lg mx-auto bg-body" style={{ maxWidth: '1000px', marginTop: '-120px' }}>
          
          <div className="row mb-5">
            <div className="col-lg-8">
              <div className="small fw-bold text-danger text-uppercase tracking-widest mb-3">
                {venue.type === 'restaurant' ? 'Ресторан' : venue.type === 'coffee' ? 'Кофейня' : venue.type === 'bar' ? 'Бар' : 'Кафе'}
              </div>
              <h1 className="display-4 fw-black mb-4 text-body-emphasis tracking-tighter">{venue.name}</h1>
              <div className="d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center gap-2 bg-body-tertiary px-3 py-2 rounded-pill">
                  <Star size={18} className="text-warning fill-warning" />
                  <span className="fw-black text-body-emphasis">{venue.rating}</span>
                </div>
                <div className="d-flex align-items-center gap-2 bg-body-tertiary px-3 py-2 rounded-pill fw-bold">
                  <CreditCard size={18} className="text-body-secondary" />
                  <span className="text-body-emphasis">{'$'.repeat(venue.priceLevel)}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <a href="#booking" className="btn btn-primary-custom shadow-lg">Забронировать</a>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-lg-8">
              <h3 className="h4 fw-bold mb-4 italic text-decoration-underline text-danger underline-offset-8 text-body-emphasis">Описание</h3>
              <p className="text-body-secondary fs-5 lh-lg mb-5">{venue.description}</p>
              
              <div className="row g-4 py-4 border-top border-bottom border-light align-items-center">
                
                <div className="col-md-7">
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="bg-danger bg-opacity-10 p-3 rounded-4 flex-shrink-0">
                      <Clock size={24} className="text-danger" />
                    </div>
                    <div>
                      <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-1">Режим работы</h4>
                      <p className="text-body-secondary small fw-medium mb-0">Ежедневно: 10:00 — 23:00</p>
                    </div>
                  </div>
                  
                  {venue.allAddresses && venue.allAddresses.length > 0 && (
                    <div className="d-flex align-items-start gap-3">
                      <div className="bg-danger bg-opacity-10 p-3 rounded-4 flex-shrink-0">
                        <MapPin size={24} className="text-danger" />
                      </div>
                      <div className="w-100">
                        <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-3">Адреса сети в Минске</h4>
                        <div className="d-grid gap-2">
                          {venue.allAddresses.map((addr, idx) => (
                            <div key={idx} className="d-flex align-items-center gap-2 text-body-secondary fw-medium bg-body-tertiary p-2 px-3 rounded-3">
                              <div className="bg-danger rounded-circle flex-shrink-0" style={{width: '6px', height: '6px'}}></div>
                              {addr}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ИНТЕРАКТИВНАЯ КАРТА */}
                <div className="col-md-5 h-100">
                  <a 
                    /* ИЩЕМ В ЯНДЕКСЕ ПО НАЗВАНИЮ ЗАВЕДЕНИЯ, ЧТОБЫ ПОКАЗАТЬ ВСЮ СЕТЬ! */
                    href={`https://yandex.by/maps/157/minsk/search/${encodeURIComponent('Минск ' + venue.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-block position-relative rounded-4 overflow-hidden shadow-sm border bg-body-tertiary text-decoration-none group-map"
                    style={{ minHeight: '220px', height: '100%' }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
                      alt="Карта" 
                      className="position-absolute w-100 h-100 object-fit-cover opacity-50 transition-transform map-bg"
                    />
                    
                    <div className="position-absolute top-50 start-50 translate-middle text-danger map-pin transition-transform">
                      <MapPin size={40} className="drop-shadow-md" style={{ fill: '#fee2e2' }} />
                    </div>

                    <div className="position-absolute inset-0 bg-dark bg-opacity-50 d-flex flex-column align-items-center justify-content-center opacity-0 transition-opacity map-overlay">
                      <div className="bg-white text-dark fw-bold rounded-pill px-4 py-2 d-flex align-items-center text-center gap-2 shadow-lg">
                        {/* Динамический текст в зависимости от того, сеть это или одно место */}
                        <ExternalLink size={16} /> 
                        {venue.allAddresses && venue.allAddresses.length > 1 ? 'Показать все точки' : 'Открыть на карте'}
                      </div>
                    </div>
                  </a>
                </div>

              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="bg-body-tertiary rounded-4 p-4 h-100">
                <h3 className="fw-black italic text-uppercase h5 mb-4 text-body-emphasis">Особенности</h3>
                <ul className="list-unstyled mb-4">
                  {['Wifi', 'Оплата картой', 'Летняя терраса'].map((item) => (
                    <li key={item} className="d-flex align-items-center gap-3 mb-3 fw-bold text-body-secondary small">
                      <div className="bg-danger rounded-circle" style={{ width: '6px', height: '6px' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a href={venue.instagramUrl} target="_blank" rel="noopener noreferrer" className="card p-3 border-0 rounded-4 d-flex flex-row align-items-center justify-content-between text-decoration-none bg-body shadow-sm mb-4">
                  <div className="small fw-bold text-uppercase tracking-widest text-body-secondary">Instagram</div>
                  <Instagram size={18} className="text-danger" />
                </a>

                <div className="pt-3 border-top">
                  <h4 className="fw-black italic text-uppercase h6 mb-3 text-body-emphasis">Интерьер</h4>
                  <div className="row g-2">
                    {venue.gallery && venue.gallery[0] && (
                      <div className="col-6">
                        <div onClick={() => setActiveImage(venue.gallery[0])} className="ratio ratio-4x3 overflow-hidden rounded-3 border cursor-zoom-in">
                          <img src={venue.gallery[0]} alt="Интерьер" className="object-fit-cover gallery-thumb" />
                        </div>
                      </div>
                    )}
                    {venue.gallery && venue.gallery[1] && (
                      <div className="col-6">
                        <div onClick={() => setActiveImage(venue.gallery[1])} className="ratio ratio-4x3 overflow-hidden rounded-3 border cursor-zoom-in">
                          <img src={venue.gallery[1]} alt="Атмосфера" className="object-fit-cover gallery-thumb" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="container pb-5" style={{ maxWidth: '1000px' }}>
        <BookingForm venueName={venue.name} />
      </section>

      <section className="container pb-5 mb-5" style={{ maxWidth: '1000px' }}>
        <div className="card bg-body-tertiary border-0 rounded-4 p-4 p-md-5">
          <h3 className="display-6 fw-black italic text-uppercase tracking-tighter mb-5 text-body-emphasis">Отзывы гостей</h3>
          <div className="row g-5">
            <div className="col-md-5">
              <div className="bg-body p-4 rounded-4 shadow-sm">
                <h4 className="h5 fw-bold mb-4 text-body-emphasis">Оставить отзыв</h4>
                {isReviewSubmitted ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4 text-success">
                    <Send size={32} className="mb-2" />
                    <p className="fw-bold mb-0">Спасибо за ваш отзыв!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Оценка</label>
                      <div className="d-flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} type="button" onClick={() => setNewReviewRating(star)} className="btn btn-link p-0 border-0 text-decoration-none">
                            <Star size={24} className={star <= newReviewRating ? 'text-warning fill-warning' : 'text-secondary'} style={{ fill: star <= newReviewRating ? '#ffc107' : 'none' }} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <textarea required value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} placeholder="Поделитесь впечатлениями..." className="form-control rounded-3 bg-body-tertiary text-body border-0 shadow-none" rows={4} />
                    </div>
                    <button type="submit" className="btn btn-primary-custom w-100 py-2">Отправить</button>
                  </form>
                )}
              </div>
            </div>

            <div className="col-md-7">
              <div className="d-grid gap-4">
                <AnimatePresence>
                  {reviews.map((review) => (
                    <motion.div key={review.id} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-body p-4 rounded-4 shadow-sm">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="fw-bold text-body-emphasis d-block">{review.author}</span>
                          <span className="small text-body-secondary">{review.date}</span>
                        </div>
                        <div className="d-flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={i < review.rating ? 'text-warning fill-warning' : 'text-secondary opacity-25'} style={{ fill: i < review.rating ? '#ffc107' : 'none' }} />
                          ))}
                        </div>
                      </div>
                      <p className="text-body-secondary mb-0">{review.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="lightbox-overlay"
          >
            <button className="lightbox-close-btn"><X size={32} className="text-white" /></button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={activeImage} alt="Увеличенное изображение" className="lightbox-image"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .z-1 { z-index: 1; }
        .z-2 { z-index: 2; }
        .fw-black { font-weight: 900; }
        .underline-offset-8 { text-underline-offset: 8px; }
        
        .cursor-zoom-in { cursor: zoom-in; }
        .gallery-thumb { width: 100%; height: 100%; transition: transform 0.3s ease, filter 0.3s ease; }
        .gallery-thumb:hover { transform: scale(1.08); filter: brightness(0.9); }

        .lightbox-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; cursor: zoom-out; backdrop-filter: blur(5px); }
        .lightbox-image { max-width: 90%; max-height: 85vh; object-fit: contain; border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); cursor: default; }
        .lightbox-close-btn { position: absolute; top: 20px; right: 20px; background: transparent; border: 0; padding: 10px; cursor: pointer; transition: transform 0.2s ease; }
        .lightbox-close-btn:hover { transform: scale(1.1); }

        .group-map .map-bg { transition: transform 0.7s ease; filter: grayscale(100%); }
        .group-map:hover .map-bg { transform: scale(1.1); filter: grayscale(0%); }
        .group-map .map-pin { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .group-map:hover .map-pin { transform: translate(-50%, -80%) scale(1.2) !important; }
        .group-map .map-overlay { opacity: 0; transition: opacity 0.3s ease; }
        .group-map:hover .map-overlay { opacity: 1; }
        .drop-shadow-md { filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3)); }
      `}</style>
    </div>
  );
};
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MapPin, ChevronLeft, CreditCard, Clock, Instagram, Send } from 'lucide-react';
import { venues } from '../data';
import { BookingForm } from '../components/BookingForm';

// Моковые начальные отзывы
const initialReviews = [
  { id: 1, author: 'Анна С.', rating: 5, text: 'Потрясающее место! Обязательно придем еще раз.', date: 'Вчера' },
  { id: 2, author: 'Максим', rating: 4, text: 'Вкусная еда, но в пятницу вечером пришлось подождать столик.', date: '3 дня назад' }
];

export const VenueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = venues.find(v => v.id === id);

  // Состояния для отзывов
  const [reviews, setReviews] = useState(initialReviews);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  if (!venue) return <div className="container py-5 my-5 text-center"><h1 className="display-4 fw-bold">Не найдено</h1></div>;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newReview = {
      id: Date.now(),
      author: 'Вы', // Имя гостя
      rating: newReviewRating,
      text: newReviewText,
      date: 'Только что'
    };

    setReviews([newReview, ...reviews]);
    setNewReviewText('');
    setNewReviewRating(5);
    setIsReviewSubmitted(true);
    setTimeout(() => setIsReviewSubmitted(false), 3000);
  };

  return (
    <div className="pt-5">
      {/* Шапка с картинкой */}
      <section className="position-relative w-100" style={{ height: '50vh' }}>
        <img src={venue.image} alt={venue.name} className="w-100 h-100 object-fit-cover" />
        <div className="position-absolute inset-0 bg-black opacity-25" />
        <button onClick={() => navigate(-1)} className="position-absolute top-0 start-0 m-4 p-3 bg-body border-0 rounded-circle shadow-sm z-2">
          <ChevronLeft size={24} className="text-body" />
        </button>
      </section>

      {/* Основная инфа */}
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
                  <Star size={18} className="text-warning fill-warning" style={{ fill: '#ffc107' }}/>
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
              
              {/* ВЫВОД ВСЕХ АДРЕСОВ ИЗ БАЗЫ */}
              <div className="row g-4 py-4 border-top border-bottom border-light">
                <div className="col-12 d-flex align-items-start gap-3">
                  <div className="bg-danger bg-opacity-10 p-3 rounded-4 flex-shrink-0">
                    <Clock size={24} className="text-danger" />
                  </div>
                  <div>
                    <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-1">Режим работы</h4>
                    <p className="text-body-secondary small fw-medium mb-0">Ежедневно: 10:00 — 23:00</p>
                  </div>
                </div>
                
                {venue.allAddresses && venue.allAddresses.length > 0 && (
                  <div className="col-12 d-flex align-items-start gap-3 mt-4">
                    <div className="bg-danger bg-opacity-10 p-3 rounded-4 flex-shrink-0">
                      <MapPin size={24} className="text-danger" />
                    </div>
                    <div>
                      <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-3">Адреса сети в Минске</h4>
                      <div className="d-grid gap-2">
                        {venue.allAddresses.map((addr, idx) => (
                          <div key={idx} className="d-flex align-items-center gap-2 text-body-secondary fw-medium bg-body-tertiary p-2 rounded-3">
                            <div className="bg-danger rounded-circle flex-shrink-0" style={{width: '6px', height: '6px'}}></div>
                            {addr}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="bg-body-tertiary rounded-4 p-4 h-100">
                <h3 className="fw-black italic text-uppercase h5 mb-4 text-body-emphasis">Особенности</h3>
                <ul className="list-unstyled mb-5">
                  {['Wifi', 'Оплата картой', 'Летняя терраса'].map((item) => (
                    <li key={item} className="d-flex align-items-center gap-3 mb-3 fw-bold text-body-secondary small">
                      <div className="bg-danger rounded-circle" style={{ width: '6px', height: '6px' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={venue.instagramUrl} target="_blank" rel="noopener noreferrer" className="card p-3 border-0 rounded-4 d-flex flex-row align-items-center justify-content-between text-decoration-none bg-body shadow-sm">
                  <div className="small fw-bold text-uppercase tracking-widest text-body-secondary">Instagram</div>
                  <Instagram size={18} className="text-danger" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок бронирования */}
      <section id="booking" className="container pb-5" style={{ maxWidth: '1000px' }}>
        <BookingForm venueName={venue.name} />
      </section>

      {/* БЛОК ОТЗЫВОВ */}
      <section className="container pb-5 mb-5" style={{ maxWidth: '1000px' }}>
        <div className="card bg-body-tertiary border-0 rounded-4 p-4 p-md-5">
          <h3 className="display-6 fw-black italic text-uppercase tracking-tighter mb-5 text-body-emphasis">Отзывы гостей</h3>
          
          <div className="row g-5">
            {/* Форма написания отзыва */}
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
                          <button 
                            key={star} type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="btn btn-link p-0 border-0 text-decoration-none"
                          >
                            <Star size={24} className={star <= newReviewRating ? 'text-warning fill-warning' : 'text-secondary'} style={{ fill: star <= newReviewRating ? '#ffc107' : 'none' }} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <textarea 
                        required value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder="Поделитесь впечатлениями..."
                        className="form-control rounded-3 bg-body-tertiary text-body border-0 shadow-none" rows={4}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary-custom w-100 py-2">Отправить</button>
                  </form>
                )}
              </div>
            </div>

            {/* Список отзывов */}
            <div className="col-md-7">
              <div className="d-grid gap-4">
                <AnimatePresence>
                  {reviews.map((review) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-body p-4 rounded-4 shadow-sm"
                    >
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
      
      <style>{`
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .z-1 { z-index: 1; }
        .z-2 { z-index: 2; }
        .fw-black { font-weight: 900; }
        .underline-offset-8 { text-underline-offset: 8px; }
      `}</style>
    </div>
  );
};
import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Star, ChevronRight } from 'lucide-react';

export const BookingForm = ({ venueName }: { venueName?: string }) => {
  // Добавили phone в начальное состояние
  const [formState, setFormState] = useState({ name: '', phone: '', date: '', guests: '2', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    // Очищаем форму после отправки
    setFormState({ name: '', phone: '', date: '', guests: '1', message: '' });
  };

  return (
    <section className="py-5 bg-body-tertiary rounded-4 px-3" id="booking">
      <div className="mx-auto bg-body rounded-4 shadow-lg overflow-hidden row border" style={{ maxWidth: '900px' }}>
        <div className="col-md-5 bg-danger p-5 text-white d-flex flex-column justify-content-center">
          <h2 className="display-6 fw-bold mb-4">Бронирование</h2>
          {venueName && <p className="h5 mb-4 text-white text-opacity-75">в {venueName}</p>}
          <p className="text-white text-opacity-75 mb-5 fs-5">
            Забронируйте столик прямо сейчас. Мы свяжемся с вами в течение 10 минут для подтверждения.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="col-md-7 p-5">
          {submitted ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-5 text-success">
               <Send size={40} className="mb-3" />
               <h3 className="h2 fw-bold text-body-emphasis mb-2">Заявка отправлена!</h3>
             </motion.div>
          ) : (
            <div className="d-grid gap-4">
              <div className="row g-3">
                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Имя</label>
                  <input required value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} type="text" className="form-control rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none" placeholder="Иван Иванов" />
                </div>
                {/* НОВОЕ ПОЛЕ: Телефон */}
                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Контактный телефон</label>
                  <input required value={formState.phone} onChange={(e) => setFormState({...formState, phone: e.target.value})} type="tel" className="form-control rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none" placeholder="+375 (XX) XXX-XX-XX" />
                </div>
                <div className="col-sm-6">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Дата</label>
                  <input required value={formState.date} onChange={(e) => setFormState({...formState, date: e.target.value})} type="date" className="form-control rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none" />
                </div>
                <div className="col-sm-6">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Гости</label>
                  <select value={formState.guests} onChange={(e) => setFormState({...formState, guests: e.target.value})} className="form-select rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8+</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Пожелания</label>
                  <textarea value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="form-control rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none h-25" style={{ minHeight: '80px' }} placeholder="У окна, детский стульчик..." />
                </div>
              </div>
              <button type="submit" className="btn btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2 shadow-sm">
                Отправить запрос <ChevronRight size={18} />
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
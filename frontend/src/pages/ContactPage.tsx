import React, { useState, FormEvent, useEffect } from 'react';
import { MapPin, Phone, Mail, Instagram, Send } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Контакты";
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row g-5 py-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-black italic uppercase tracking-tighter mb-4 text-body-emphasis">Контакты</h1>
          <p className="text-secondary fs-5 mb-5 mw-md">
            У вас есть предложение по сотрудничеству или вы нашли ошибку на сайте? Свяжитесь с нами любым удобным способом.
          </p>

          <div className="d-grid gap-4">
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <MapPin size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-1">Адрес офиса</h4>
                <p className="text-secondary fw-medium mb-0">г. Минск, ул. Петруся Бровки, 14</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <Phone size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-1">Телефон</h4>
                <p className="text-secondary fw-medium mb-0">+375 (29) 519-73-31</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <Mail size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-1">Email</h4>
                <p className="text-secondary fw-medium mb-0">asasin.leha@yandex.ru</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <Instagram size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-1">Инстаграм</h4>
                <p className="text-secondary fw-medium mb-0">@minsk_gastro_guide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bg-body-tertiary p-4 p-md-5 rounded-5 shadow-sm border h-100">
            <h2 className="h2 fw-black mb-5 text-body-emphasis italic uppercase tracking-tighter">Напишите нам</h2>
            
            {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                 className="bg-success bg-opacity-10 text-success p-5 rounded-4 text-center border border-success border-opacity-25"
               >
                 <Send className="w-12 h-12 mx-auto mb-4" size={48} />
                 <h3 className="h4 fw-bold mb-2">Сообщение успешно отправлено!</h3>
                 <p className="mb-0 opacity-75">Мы ответим вам на указанный email в течение суток.</p>
               </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-md-6">
                  <label className="fw-black text-secondary text-uppercase small tracking-widest mb-2 d-inline-block">Имя</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-control bg-body rounded-4 border-0 py-3 px-4 shadow-sm" />
                </div>
                <div className="col-md-6">
                  <label className="fw-black text-secondary text-uppercase small tracking-widest mb-2 d-inline-block">Email</label>
                  {/* === ДОБАВЛЕН PATTERN И TITLE === */}
                  <input 
                    required 
                    type="email" 
                    pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                    title="Email должен содержать доменную зону (например: .com, .by, .ru)"
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="form-control bg-body rounded-4 border-0 py-3 px-4 shadow-sm" 
                  />
                </div>
                <div className="col-12">
                  <label className="fw-black text-secondary text-uppercase small tracking-widest mb-2 d-inline-block">Тема</label>
                  <input required type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="form-control bg-body rounded-4 border-0 py-3 px-4 shadow-sm" />
                </div>
                <div className="col-12">
                  <label className="fw-black text-secondary text-uppercase small tracking-widest mb-2 d-inline-block">Сообщение</label>
                  <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="form-control bg-body rounded-4 border-0 py-3 px-4 shadow-sm h-25" style={{ minHeight: '120px' }} />
                </div>
                <div className="col-12 pt-3">
                  <button type="submit" className="btn btn-primary-custom w-100 py-3 fs-5">Отправить сообщение</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .fw-black { font-weight: 900; }
        .mw-md { max-width: 450px; }
        .rounded-5 { border-radius: 2.5rem !important; }
      `}</style>
    </div>
  );
};


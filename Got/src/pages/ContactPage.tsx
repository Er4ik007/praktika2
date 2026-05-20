import React, { MapPin, Phone, Mail, Instagram } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="container py-5 mt-5">
      <div className="row g-5 py-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-black italic uppercase tracking-tighter mb-4">Контакты</h1>
          <p className="text-secondary fs-5 mb-5 mw-md">
            У вас есть предложение по сотрудничеству или вы нашли ошибку на сайте? Свяжитесь с нами любым удобным способом.
          </p>

          <div className="d-grid gap-4">
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <MapPin size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-dark text-uppercase small tracking-widest mb-1">Адрес офиса</h4>
                <p className="text-secondary fw-medium mb-0">г. Минск, ул. Петруся Бровки, 14</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <Phone size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-dark text-uppercase small tracking-widest mb-1">Телефон</h4>
                <p className="text-secondary fw-medium mb-0">+375 (29) 519-73-30</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <Mail size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-dark text-uppercase small tracking-widest mb-1">Email</h4>
                <p className="text-secondary fw-medium mb-0">asasin.leha@yandex.ru</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <Instagram size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-dark text-uppercase small tracking-widest mb-1">Инстаграм</h4>
                <p className="text-secondary fw-medium mb-0">@minsk_gastro_guide</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="bg-light p-4 p-md-5 rounded-5 shadow-sm border h-100">
            <h2 className="h2 fw-black mb-5 italic uppercase tracking-tighter">Напишите нам</h2>
            <form className="row g-4">
              <div className="col-md-6">
                <label className="fw-black text-muted text-uppercase small tracking-widest mb-2 d-inline-block">Имя</label>
                <input type="text" className="form-control rounded-4 border-0 py-3 px-4 shadow-sm" />
              </div>
              <div className="col-md-6">
                <label className="fw-black text-muted text-uppercase small tracking-widest mb-2 d-inline-block">Email</label>
                <input type="email" className="form-control rounded-4 border-0 py-3 px-4 shadow-sm" />
              </div>
              <div className="col-12">
                <label className="fw-black text-muted text-uppercase small tracking-widest mb-2 d-inline-block">Тема</label>
                <input type="text" className="form-control rounded-4 border-0 py-3 px-4 shadow-sm" />
              </div>
              <div className="col-12">
                <label className="fw-black text-muted text-uppercase small tracking-widest mb-2 d-inline-block">Сообщение</label>
                <textarea className="form-control rounded-4 border-0 py-3 px-4 shadow-sm h-25" style={{ minHeight: '120px' }} />
              </div>
              <div className="col-12 pt-3">
                <button className="btn btn-primary-custom w-100 py-3 fs-5">Отправить сообщение</button>
              </div>
            </form>
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
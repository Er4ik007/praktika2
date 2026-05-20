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
                <p className="text-secondary fw-medium mb-0">г. Минск, ул. Кальварийская, 21</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <Phone size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-dark text-uppercase small tracking-widest mb-1">Телефон</h4>
                <p className="text-secondary fw-medium mb-0">+375 (44) 123-45-67</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-4">
              <div className="bg-danger bg-opacity-10 rounded-4 p-3 flex-shrink-0">
                <Mail size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="fw-bold text-dark text-uppercase small tracking-widest mb-1">Email</h4>
                <p className="text-secondary fw-medium mb-0">hello@minskgastro.by</p>
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
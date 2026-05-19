import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-top py-5 mt-5">
      <div className="container">
        <div className="row justify-content-between g-4 mb-5">
          <div className="col-md-4 col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Utensils className="text-danger" size={24} />
              <span className="fw-bold fs-5 text-dark tracking-tighter">МИНСК ГАСТРО</span>
            </div>
            <p className="text-secondary small">
              Ваш надежный гид по лучшим заведениям Минска. Мы любим свой город и его кухню.
            </p>
          </div>
          
          <div className="col-md-7 col-lg-6">
            <div className="row g-4">
              <div className="col-6 col-sm-4">
                <h4 className="fw-bold small text-muted text-uppercase tracking-widest mb-4">Проект</h4>
                <ul className="list-unstyled small">
                  <li className="mb-3"><Link to="/about" className="text-decoration-none text-secondary hover-danger">О нас</Link></li>
                  <li className="mb-3"><Link to="/catalog" className="text-decoration-none text-secondary hover-danger">Каталог</Link></li>
                </ul>
              </div>
              <div className="col-6 col-sm-4">
                <h4 className="fw-bold small text-muted text-uppercase tracking-widest mb-4">Помощь</h4>
                <ul className="list-unstyled small">
                  <li className="mb-3"><Link to="/support" className="text-decoration-none text-secondary hover-danger">Поддержка</Link></li>
                  <li className="mb-3"><Link to="/contacts" className="text-decoration-none text-secondary hover-danger">Контакты</Link></li>
                </ul>
              </div>
              <div className="col-12 col-sm-4 d-none d-sm-block">
                <h4 className="fw-bold small text-muted text-uppercase tracking-widest mb-4">Соцсети</h4>
                <div className="d-flex gap-3">
                  <a href="https://www.instagram.com/nadyamilanovich__?igsh=MXAza3pubnA0cGw2Yg==&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center bg-light rounded-circle text-decoration-none text-dark fw-bold small transition-colors" style={{ width: '40px', height: '40px' }}>
                    <img src="src/components/inst_logo.jpg" alt="Instagram" style={{ width: '30px', height: '30px' }}></img>
                  </a>
                  <a href="https://t.me/ALEX_ALEXzh" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center bg-light rounded-circle text-decoration-none text-dark fw-bold small transition-colors" style={{ width: '40px', height: '40px' }}>
                    <img src="src/components/tg_logo.png" alt="Telegram" style={{ width: '30px', height: '30px' }}></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-muted small mb-0">
            © 2026 Minsk Gastro Guide. Все права защищены. Разработано в учебных целях.
          </p>
          <div className="d-flex gap-4">
            <Link to="/privacy" className="text-decoration-none text-muted small fw-medium hover-dark">Политика конфиденциальности</Link>
          </div>
        </div>
      </div>
      <style>{`
        .hover-danger:hover { color: #ef4444 !important; }
        .hover-dark:hover { color: #212529 !important; }
        .bg-light:hover { background-color: #e9ecef !important; }
      `}</style>
    </footer>
  );
};
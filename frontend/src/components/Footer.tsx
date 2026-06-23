import React from 'react';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';

export const Footer = () => {
  const { t } = useLang();

  return (
  <footer className="bg-body-tertiary border-top py-5 mt-5">
  <div className="container">
    <div className="row justify-content-between g-4 mb-5">
      <div className="col-md-4 col-lg-3">
        <div className="d-flex align-items-center gap-2 mb-4">
          <Utensils className="text-danger" size={24} />
          <span className="fw-bold fs-5 text-body tracking-tighter">{t('site.name')}</span>
        </div>
        <p className="text-body-secondary small">
          {t('footer.desc')}
        </p>
      </div>

          <div className="col-md-7 col-lg-6">
            <div className="row g-4">
              <div className="col-6 col-sm-4">
                <h4 className="fw-bold small text-body-secondary text-uppercase tracking-widest mb-4">{t('footer.project')}</h4>
                <ul className="list-unstyled small">
                  <li className="mb-3"><Link to="/about" className="text-decoration-none text-body hover-danger">{t('nav.about')}</Link></li>
                  <li className="mb-3"><Link to="/catalog" className="text-decoration-none text-body hover-danger">{t('nav.catalog')}</Link></li>
                </ul>
              </div>
              <div className="col-6 col-sm-4">
                <h4 className="fw-bold small text-body-secondary text-uppercase tracking-widest mb-4">{t('footer.help')}</h4>
                <ul className="list-unstyled small">
                  <li className="mb-3"><Link to="/support" className="text-decoration-none text-body hover-danger">{t('footer.support')}</Link></li>
                  <li className="mb-3"><Link to="/contacts" className="text-decoration-none text-body hover-danger">{t('nav.contacts')}</Link></li>
                </ul>
              </div>
              <div className="col-12 col-sm-4">
                <h4 className="fw-bold small text-body-secondary text-uppercase tracking-widest mb-4">{t('footer.socials')}</h4>
                <div className="d-flex gap-3">
                  <a href="https://www.instagram.com/nadyamilanovich__?igsh=MXAza3pubnA0cGw2Yg==&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center bg-body rounded-circle text-decoration-none text-body fw-bold small transition-colors shadow-sm" style={{ width: '40px', height: '40px' }}>
                  <img src="/inst_logo.png" alt="Instagram" style={{ width: '30px', height: '30px' }}></img>
                  </a>
                  <a href="https://t.me/ALEX_ALEXzh" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center bg-body rounded-circle text-decoration-none text-body fw-bold small transition-colors shadow-sm" style={{ width: '40px', height: '40px' }}>
                  <img src="/tg_logo.png" alt="Telegram" style={{ width: '30px', height: '30px' }}></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-body-secondary small mb-0">
            © 2026 Minsk Gastro Guide. {t('footer.copyright')}
          </p>
          <div className="d-flex gap-4">
            <Link to="/privacy" className="text-decoration-none text-body-secondary small fw-medium hover-body">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
      <style>{`
        .hover-danger:hover { color: #ef4444 !important; }
        .hover-body:hover { color: var(--bs-body-color) !important; }
      `}</style>
    </footer>
  );
};

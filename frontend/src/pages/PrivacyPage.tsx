import React, { useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';

export const PrivacyPage = () => {
  const { t } = useLang();

  useEffect(() => {
    document.title = t('privacy.title');
  }, [t]);

  return (
    <div className="container py-5 mt-5">
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="display-4 fw-black italic text-uppercase tracking-tighter mb-5 text-body-emphasis">
          {t('privacy.title')}
        </h1>

        <div className="text-body-secondary lh-lg">
          <p className="fw-bold text-body-emphasis mb-5">{t('privacy.lastUpdate')}</p>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">{t('privacy.section1.title')}</h2>
            <p>{t('privacy.section1.desc')}</p>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">{t('privacy.section2.title')}</h2>
            <p>{t('privacy.section2.desc')}</p>
            <ul className="mb-0">
              <li>{t('privacy.section2.point1')}</li>
              <li>{t('privacy.section2.point2')}</li>
              <li>{t('privacy.section2.point3')}</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">{t('privacy.section3.title')}</h2>
            <p>{t('privacy.section3.desc')}</p>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">{t('privacy.section4.title')}</h2>
            <p>{t('privacy.section4.desc')}</p>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">{t('privacy.section5.title')}</h2>
            <p>{t('privacy.section5.desc')}</p>
          </section>
        </div>
      </div>
      <style>{`
        .fw-black { font-weight: 900; }
      `}</style>
    </div>
  );
};

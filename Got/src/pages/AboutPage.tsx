import React from 'react';

export const AboutPage = () => {
  return (
    <div className="container py-5 mt-5">
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <h1 className="display-3 fw-black italic uppercase tracking-tighter mb-5 text-body-emphasis">О проекте</h1>
        <div className="text-secondary lh-lg fs-5">
          <p className="display-6 fw-light text-body italic border-start border-danger border-4 ps-4 mb-5">
            «Minsk Gastro Guide» — это не просто каталог, это наш взгляд на кулинарную жизнь Минска. Мы верим, что каждое заведение имеет свою душу и историю.
          </p>
          <p className="mb-5">
            Мы начали этот проект в 2026 году как учебную инициативу, чтобы объединить современные веб-технологии и нашу страсть к качественному сервису. Наша цель — помочь жителям и гостям столицы находить именно "свои" места, будь то шумный бар для вечера пятницы или тихая кофейня для утреннего чтения.
          </p>
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              
              <div className="bg-body-tertiary p-5 rounded-4 h-100 border-0">
                <h3 className="h3 fw-bold text-body mb-4">Наша миссия</h3>
                <p className="small mb-0 text-secondary">Популяризация белорусской гастрономической культуры и поддержка локальных предпринимателей через удобный цифровой интерфейс.</p>
              </div>
            </div>
            <div className="col-md-6">
              
              <div className="bg-body-tertiary p-5 rounded-4 h-100 border-0">
                <h3 className="h3 fw-bold text-body mb-4">Наши ценности</h3>
                <p className="small mb-0 text-secondary">Честность отзывов, актуальность данных, своевременные рекомендации и ответы на интересующие вопросы.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .fw-black { font-weight: 900; }
        .italic { font-style: italic; }
      `}</style>
    </div>
  );
};
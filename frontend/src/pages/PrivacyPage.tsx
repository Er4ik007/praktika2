import React, { useEffect } from 'react';

export const PrivacyPage = () => {
  useEffect(() => {
    document.title = "Политика конфиденциальности";
  }, []);
  return (
    <div className="container py-5 mt-5">
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        {/* Заменили text-dark на text-body-emphasis */}
        <h1 className="display-4 fw-black italic text-uppercase tracking-tighter mb-5 text-body-emphasis">
          Политика конфиденциальности
        </h1>
        
        {/* Заменили text-secondary на text-body-secondary для мягкого серого текста в любой теме */}
        <div className="text-body-secondary lh-lg">
          <p className="fw-bold text-body-emphasis mb-5">Последнее обновление: 18 мая 2026 г.</p>
          
          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">1. Сбор информации</h2>
            <p>Мы собираем информацию, которую вы предоставляете нам напрямую, например, при заполнении формы бронирования столика (имя, контактные данные, предпочтения). Также сайт автоматически собирает технические данные (IP-адрес, тип браузера) для обеспечения стабильной работы сервиса.</p>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">2. Использование данных</h2>
            <p>Ваши данные используются исключительно для:</p>
            <ul className="mb-0">
              <li>Обработки ваших запросов на бронирование.</li>
              <li>Улучшения качества нашего сервиса и UX-дизайна.</li>
              <li>Связи с вами по поводу ваших заявок.</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">3. Передача третьим лицам</h2>
            <p>Мы не продаем и не передаем ваши персональные данные сторонним организациям, за исключением случаев, когда это необходимо для выполнения вашего запроса (например, передача данных ресторану для подтверждения бронирования).</p>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">4. Защита информации</h2>
            <p>Мы принимаем все необходимые технические меры для защиты ваших данных от несанкционированного доступа, изменения или уничтожения.</p>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold text-body-emphasis mb-4">5. Ваши права</h2>
            <p>Вы имеете право запросить удаление ваших данных или изменение предоставленной информации, связавшись с нами по адресу hello@minskgastro.by.</p>
          </section>
        </div>
      </div>
      <style>{`
        .fw-black { font-weight: 900; }
      `}</style>
    </div>
  );
};
import React, { useEffect } from 'react';
import { Send } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

const TEAM_MEMBERS = [
  {
    nameKey: 'about.nadezhda.name',
    roleKey: 'about.nadezhda.role',
    descKey: 'about.nadezhda.desc',
    image: './photo/nadya.jpg',
    backImage: './photo/fion.webp',
    telegram: 'https://t.me/mnvmnvmnv'
  },
  {
    nameKey: 'about.alexey.name',
    roleKey: 'about.alexey.role',
    descKey: 'about.alexey.desc',
    image: './photo/leha.jpg',
    backImage: './photo/shrek.jpg',
    telegram: 'https://t.me/ALEX_ALEXzh'
  }
];

export const AboutPage = () => {
  const { t } = useLang();

  useEffect(() => {
    document.title = t('nav.about');
  }, [t]);

  return (
    <div className="container py-5 mt-5">
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <h1 className="display-3 fw-black italic uppercase tracking-tighter mb-5 text-body-emphasis">{t('about.title')}</h1>

        <div className="text-body-secondary lh-lg fs-5 mb-5 pb-4 border-bottom">
          <p className="display-6 fw-light text-body-emphasis italic border-start border-danger border-4 ps-4 mb-5">
            {t('about.quote')}
          </p>
          <p className="mb-5">
            {t('about.desc')}
          </p>

          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="bg-body-tertiary p-5 rounded-4 h-100 border-0 shadow-sm">
                <h3 className="h3 fw-bold text-body-emphasis mb-4">{t('about.mission')}</h3>
                <p className="small mb-0 text-body-secondary">{t('about.missionDesc')}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-body-tertiary p-5 rounded-4 h-100 border-0 shadow-sm">
                <h3 className="h3 fw-bold text-body-emphasis mb-4">{t('about.values')}</h3>
                <p className="small mb-0 text-body-secondary">{t('about.valuesDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h2 className="display-5 fw-black italic uppercase tracking-tighter mb-2 text-body-emphasis text-center">{t('about.team')}</h2>
          <p className="text-body-secondary text-center mb-5">{t('about.teamDesc')}</p>

          <div className="row g-4 justify-content-center">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="col-md-6">
                <div className={`flip-card-container h-100 $`}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front card bg-body-tertiary border-0 rounded-4 shadow-sm h-100 overflow-hidden">
                      <div className="ratio ratio-1x1 overflow-hidden" style={{ maxHeight: '350px' }}>
                        <img src={member.image} alt={member.name} className="object-fit-cover w-100 h-100 team-img-transition" />
                      </div>
                      <div className="card-body p-4 p-md-5 d-flex flex-column text-center">
                        <h3 className="h4 fw-bold text-body-emphasis mb-1">{t(member.nameKey)}</h3>
                        <div className="text-danger small fw-bold text-uppercase tracking-widest mb-3">
                          {t(member.roleKey)}
                        </div>
                        <p className="text-body-secondary small mb-4 flex-grow-1">
                          {t(member.descKey)}
                        </p>
                        <div className="mt-auto border-top pt-4">
                          <a href={member.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-light bg-body rounded-pill d-inline-flex align-items-center justify-content-center gap-2 px-4 py-2 shadow-sm hover-telegram-btn" title={t('about.writeTelegram')}>
                            <Send size={16} className="telegram-icon" />
                            <span className="small fw-bold text-body-emphasis telegram-text">{t('about.writeTelegram')}</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {member.backImage && (
                      <div className="flip-card-back card border-0 rounded-4 shadow-lg overflow-hidden h-100">
                        <img src={member.backImage} alt={member.name} className="object-fit-cover w-100 h-100" />
                        <div className="position-absolute bottom-0 start-0 w-100 p-4 d-flex flex-column align-items-center" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                          <h3 className="h5 fw-bold text-white mb-3">{t(member.nameKey)}</h3>
                          <a href={member.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-danger rounded-pill d-inline-flex align-items-center justify-content-center gap-2 px-4 py-2 shadow-sm">
                            <Send size={16} />
                            <span className="small fw-bold text-white">{t('about.writeTelegram')}</span>
                          </a>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .fw-black { font-weight: 900; }
        .italic { font-style: italic; }
        .group-hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .group-hover-lift:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.15) !important; }
        .team-img-transition { transition: transform 0.5s ease; }
        .group-hover-lift:hover .team-img-transition { transform: scale(1.05); }
        .hover-telegram-btn { transition: all 0.3s ease; }
        .hover-telegram-btn:hover { background-color: #0088cc !important; transform: translateY(-2px); }
        .hover-telegram-btn:hover .telegram-icon, .hover-telegram-btn:hover .telegram-text { color: white !important; }
        .flip-card-container { perspective: 1500px; }
        .flip-card-inner { display: grid; width: 100%; height: 100%; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
        .is-flippable:hover .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back { grid-area: 1 / 1; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .flip-card-back { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

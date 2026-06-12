import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, LogOut, Settings, Heart, CalendarClock } from 'lucide-react';
import { venues, Venue } from '../data'; // Подтянули данные
import { VenueCard } from '../components/VenueCard'; // Подтянули карточку

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{name: string, email: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('favorites'); // Сделали избранное активной вкладкой по умолчанию

  // Стейт для избранного
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  
  useEffect(() => {
    document.title = "Личный кабинет";
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // 1. Грузим профиль
    fetch('http://localhost:8000/api/users/me', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => {
      if (!res.ok) throw new Error('Ошибка авторизации');
      return res.json();
    })
    .then(data => {
      setUserData(data);
      // 2. СРАЗУ ПОСЛЕ ПРОФИЛЯ грузим избранное
      return fetch('http://localhost:8000/api/favorites', { headers: { 'Authorization': `Bearer ${token}` } });
    })
    .then(res => res.json())
    .then(favData => {
      setFavoriteIds(favData); // Сохраняем ID любимых заведений
      setIsLoading(false);
    })
    .catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      navigate('/login');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  // Функция для удаления карточки прямо из профиля
  const removeFavorite = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Оптимистично убираем с экрана
    setFavoriteIds(prev => prev.filter(fid => fid !== id));

    try {
      await fetch('http://localhost:8000/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ venue_id: id })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Фильтруем общую базу заведений, оставляя только те, чьи ID пришли с бэкенда
  const favoriteVenues = venues.filter(v => favoriteIds.includes(v.id));

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <div className="row g-5">
        
        {/* ЛЕВАЯ КОЛОНКА: МЕНЮ */}
        <div className="col-lg-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card bg-body-tertiary border-0 rounded-4 shadow-sm p-4">
            <div className="d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
              <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center fw-bold fs-4" style={{ width: '60px', height: '60px' }}>
                {userData?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="h5 fw-bold text-body-emphasis mb-1">{userData?.name}</h3>
                <p className="text-body-secondary small mb-0">{userData?.email}</p>
              </div>
            </div>

            <div className="d-flex flex-column gap-2">
              <button onClick={() => setActiveTab('favorites')} className={`btn text-start fw-bold p-3 rounded-3 ${activeTab === 'favorites' ? 'btn-danger text-white' : 'btn-light bg-body text-body-secondary hover-bg-light'}`}>
                <Heart size={18} className="me-2" /> Мое Избранное
              </button>
              <button onClick={() => setActiveTab('bookings')} className={`btn text-start fw-bold p-3 rounded-3 ${activeTab === 'bookings' ? 'btn-danger text-white' : 'btn-light bg-body text-body-secondary hover-bg-light'}`}>
                <CalendarClock size={18} className="me-2" /> Мои бронирования
              </button>
              <button onClick={() => setActiveTab('info')} className={`btn text-start fw-bold p-3 rounded-3 ${activeTab === 'info' ? 'btn-danger text-white' : 'btn-light bg-body text-body-secondary hover-bg-light'}`}>
                <Settings size={18} className="me-2" /> Настройки профиля
              </button>
              
              <button onClick={handleLogout} className="btn text-start fw-bold p-3 rounded-3 mt-3 text-danger hover-bg-light border border-danger border-opacity-25">
                <LogOut size={18} className="me-2" /> Выйти из аккаунта
              </button>
            </div>
          </motion.div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: КОНТЕНТ ВКАЛДКИ */}
        <div className="col-lg-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card bg-body-tertiary border-0 rounded-4 shadow-sm p-4 p-md-5 h-100">
            
            {/* === ВКЛАДКА: ИЗБРАННОЕ === */}
            {activeTab === 'favorites' && (
              <div>
                <h2 className="display-6 fw-black italic text-uppercase tracking-tighter mb-4 text-body-emphasis">Сохраненные места</h2>
                
                {favoriteVenues.length === 0 ? (
                  <div className="text-center py-5">
                    <Heart size={64} className="text-secondary opacity-25 mb-4 mx-auto" />
                    <h3 className="h4 fw-bold text-body-emphasis">Пока тут пусто</h3>
                    <p className="text-body-secondary">Вы еще не добавили ни одного заведения в избранное.</p>
                  </div>
                ) : (
                  <div className="row g-4">
                    {favoriteVenues.map((venue, index) => (
                      <div key={venue.id} className="col-md-6">
                        <VenueCard 
                          venue={venue} 
                          isFavorite={true} 
                          onToggleFavorite={removeFavorite} 
                          index={index} 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ВКЛАДКА: БРОНИ (Заглушка) */}
            {activeTab === 'bookings' && (
              <div className="text-center py-5">
                <CalendarClock size={64} className="text-secondary opacity-25 mb-4 mx-auto" />
                <h3 className="h4 fw-bold text-body-emphasis">Нет активных броней</h3>
                <p className="text-body-secondary">Вы пока не забронировали ни одного столика.</p>
              </div>
            )}

            {/* ВКЛАДКА: ПРОФИЛЬ */}
            {activeTab === 'info' && (
              <div>
                <h2 className="display-6 fw-black italic text-uppercase tracking-tighter mb-4 text-body-emphasis">Личные данные</h2>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Имя</label>
                    <input type="text" className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" value={userData?.name} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
                    <input type="email" className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" value={userData?.email} readOnly />
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </div>

      </div>
      <style>{`
        .fw-black { font-weight: 900; }
        .hover-bg-light:hover { background-color: var(--bs-secondary-bg) !important; }
      `}</style>
    </div>
  );
};
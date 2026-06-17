import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, X, Menu as MenuIcon, User } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('appTheme');
    if (saved && saved !== 'default') return saved;
    return localStorage.getItem('theme') || 'light';
  });
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const navigate = useNavigate();

  // Достаем имя пользователя из памяти браузера (сохранено при логине)
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const customThemes = ['autumn', 'ocean', 'lavender', 'forest', 'cosmic'];
    if (customThemes.includes(theme)) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('appTheme', theme);
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('appTheme', 'default');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !userName) return;
    fetch('http://localhost:8000/api/users/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data?.avatar) setUserAvatar(data.avatar); })
      .catch(() => {});
  }, [userName]);

  const menuItems = [
    { name: 'Главная', path: '/' },
    { name: 'Каталог', path: '/catalog' },
    { name: 'О нас', path: '/about' },
    { name: 'Контакты', path: '/contacts' },
  ];

  return (
    <header className="fixed-top header-glass border-bottom py-2" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(var(--bs-body-bg-rgb), 0.8)' }}>
      <div className="container d-flex align-items-center justify-content-between h-100">
        <Link to="/" className="d-flex align-items-center text-decoration-none gap-2">
          <Utensils className="text-danger" size={32} />
          <span className="fw-bold fs-4 text-body text-uppercase tracking-tighter d-none d-sm-block">МИНСК ГАСТРО</span>
        </Link>

        <nav className="d-none d-md-block">
          <ul className="nav align-items-center">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item ms-4">
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link px-0 py-1 fw-medium transition-colors ${isActive ? 'text-danger border-bottom border-danger' : 'text-body opacity-75'}`
                  }
                  style={{ transition: 'all 0.3s ease' }}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="d-flex align-items-center gap-2">
          
          {/* === УМНАЯ КНОПКА АВТОРИЗАЦИИ ДЛЯ ПК === */}
          {userName ? (
            <Link
              to="/profile"
              className="d-none d-sm-flex align-items-center gap-2 text-decoration-none"
            >
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="rounded-circle" style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
              ) : (
                <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center fw-bold" style={{ width: '36px', height: '36px', fontSize: '14px' }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
          ) : (
            // Пользователь НЕ вошел: Кнопка Войти
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-sm btn-outline-danger rounded-pill fw-bold px-3 d-none d-sm-flex align-items-center gap-2"
            >
              <User size={16} /> Войти
            </button>
          )}

          <div className="d-md-none">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-link text-body p-2">
              {isMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="d-md-none bg-body border-bottom overflow-hidden shadow-sm">
            <ul className="nav flex-column p-4">
              {menuItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink to={item.path} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `nav-link p-3 rounded-3 fw-bold ${isActive ? 'bg-danger text-white' : 'text-body'}`}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
              
              {/* === УМНАЯ КНОПКА АВТОРИЗАЦИИ ДЛЯ МОБИЛОК === */}
              <li className="nav-item mt-3 pt-3 border-top">
                {userName ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-danger w-100 rounded-3 py-2 fw-bold d-flex justify-content-center align-items-center gap-2"
                  >
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="rounded-circle" style={{ width: '24px', height: '24px', objectFit: 'cover' }} />
                    ) : (
                      <span className="bg-white text-danger rounded-circle d-inline-flex justify-content-center align-items-center fw-bold" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    )}
                    Мой профиль
                  </Link>
                ) : (
                  <button 
                    onClick={() => { setIsMenuOpen(false); navigate('/login'); }} 
                    className="btn btn-outline-danger w-100 rounded-3 py-2 fw-bold d-flex justify-content-center align-items-center gap-2"
                  >
                    <User size={18} /> Войти в аккаунт
                  </button>
                )}
              </li>

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
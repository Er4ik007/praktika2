import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, X, Menu as MenuIcon, Moon, Sun, User } from 'lucide-react'; // Добавили User

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);

    // @ts-ignore
    document.startViewTransition(() => {
      document.documentElement.setAttribute('data-bs-theme', nextTheme);
      setTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  };

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
          
          {/* НОВАЯ КНОПКА ВОЙТИ */}
          <button 
            onClick={() => navigate('/login')}
            className="btn btn-sm btn-outline-danger rounded-pill fw-bold px-3 d-none d-sm-flex align-items-center gap-2"
          >
            <User size={16} /> Войти
          </button>

          <button onClick={(e) => toggleTheme(e)} className="btn btn-link text-body p-2" title="Сменить тему">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

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
              {/* Мобильная кнопка войти */}
              <li className="nav-item mt-3 pt-3 border-top">
                <button onClick={() => { setIsMenuOpen(false); navigate('/login'); }} className="btn btn-danger w-100 rounded-3 py-2 fw-bold d-flex justify-content-center align-items-center gap-2">
                  <User size={18} /> Войти в аккаунт
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
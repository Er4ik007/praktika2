import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, X, Menu as MenuIcon, Moon, Sun } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Установка темы при первой загрузке
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // УМНАЯ АНИМАЦИЯ ВОЛНЫ ИЗ ТОЧКИ КЛИКА
  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // Защита: если браузер не поддерживает современное View Transitions API
    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // 1. Получаем координаты клика мыши
    const x = event.clientX;
    const y = event.clientY;

    // 2. Передаем эти координаты в CSS как глобальные переменные
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);

    // 3. Запускаем анимацию перехода
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
          <span className="fw-bold fs-4 text-body text-uppercase tracking-tighter">МИНСК ГАСТРО</span>
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

        <div className="d-flex align-items-center">
          {/* Передаем событие клика (event) в функцию toggleTheme */}
          <button 
            onClick={(e) => toggleTheme(e)} 
            className="btn btn-link text-body p-2 me-md-0 me-2"
            title="Сменить тему"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>

          <div className="d-md-none">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-link text-body p-2">
              {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="d-md-none bg-body border-bottom overflow-hidden shadow-sm"
          >
            <ul className="nav flex-column p-4">
              {menuItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink 
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `nav-link p-3 rounded-3 fw-bold ${isActive ? 'bg-danger text-white' : 'text-body'}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
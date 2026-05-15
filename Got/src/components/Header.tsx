import React,{ useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, X, Menu as MenuIcon } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Главная', path: '/' },
    { name: 'Каталог', path: '/catalog' },
    { name: 'О нас', path: '/about' },
    { name: 'Контакты', path: '/contacts' },
  ];

  return (
    <header className="fixed-top bg-white border-bottom py-2" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <div className="container d-flex align-items-center justify-content-between h-100">
        <Link to="/" className="d-flex align-items-center text-decoration-none gap-2">
          <Utensils className="text-danger" size={32} />
          <span className="fw-bold fs-4 text-dark text-uppercase tracking-tighter">МИНСК ГАСТРО</span>
        </Link>

        <nav className="d-none d-md-block">
          <ul className="nav align-items-center">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item ms-4">
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link px-0 py-1 fw-medium transition-colors ${isActive ? 'text-danger border-bottom border-danger' : 'text-secondary'}`
                  }
                  style={{ transition: 'all 0.3s ease' }}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="d-md-none">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} id="mobile-menu-btn" className="btn btn-link text-dark p-2">
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="d-md-none bg-white border-bottom overflow-hidden shadow-sm"
          >
            <ul className="nav flex-column p-4">
              {menuItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink 
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `nav-link p-3 rounded-3 fw-bold ${isActive ? 'bg-danger text-white' : 'text-secondary'}`
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

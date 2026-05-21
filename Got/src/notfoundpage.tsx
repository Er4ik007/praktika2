import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const NotFoundPage = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '70vh' }}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="display-1 fw-black italic text-dark mb-3"
      >
        404
      </motion.div>
      <h2 className="h2 fw-bold text-secondary mb-4">Страница не найдена</h2>
      <p className="text-muted mb-5 mw-md mx-auto">
        Кажется, вы забрели не туда. Возможно, заведение переехало, или ссылка устарела.
      </p>
      <Link to="/" className="btn btn-primary-custom px-5">
        На главную
      </Link>
      <style>{`
        .fw-black { font-weight: 900; }
        .mw-md { max-width: 400px; }
      `}</style>
    </div>
  );
};
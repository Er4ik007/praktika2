import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

export const RegisterPage = () => {
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); // Показываем сообщение об успехе
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card bg-body-tertiary border-0 rounded-4 shadow-lg p-4 p-sm-5 w-100" style={{ maxWidth: '500px' }}
      >
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
            <CheckCircle className="text-success mb-3" size={60} />
            <h2 className="h4 fw-bold text-body-emphasis mb-3">Заявка принята!</h2>
            <p className="text-body-secondary mb-4">
              Ваша учетная запись отправлена на обработку администратору. Вы получите уведомление на email после проверки.
            </p>
            <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">На главную</Link>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-4">
              <h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">Регистрация</h1>
              <p className="text-body-secondary small">Присоединяйтесь к гастро-комьюнити</p>
            </div>

            <form onSubmit={handleSubmit} className="d-grid gap-3">
              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Ваше имя</label>
                <input required type="text" className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="Алексей" />
              </div>
              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
                <input required type="email" className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="mail@example.com" />
              </div>
              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Пароль</label>
                <input required type="password" className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="Придумайте пароль" />
              </div>
              <button type="submit" className="btn btn-primary-custom w-100 py-3 mt-2">Создать аккаунт</button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <span className="text-body-secondary small">Уже есть аккаунт? </span>
              <Link to="/login" className="text-danger fw-bold small text-decoration-none hover-underline">Войти</Link>
            </div>
          </>
        )}
      </motion.div>
      <style>{`.fw-black { font-weight: 900; } .hover-underline:hover { text-decoration: underline !important; }`}</style>
    </div>
  );
};
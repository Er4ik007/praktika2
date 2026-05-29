import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';

export const LoginPage = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация входа (так как нет бэкенда)
    alert("Тестовый вход выполнен!");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card bg-body-tertiary border-0 rounded-4 shadow-lg p-4 p-sm-5 w-100" style={{ maxWidth: '450px' }}
      >
        <div className="text-center mb-4">
          <Utensils className="text-danger mb-3" size={40} />
          <h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">С возвращением</h1>
          <p className="text-body-secondary small">Войдите, чтобы сохранять любимые места</p>
        </div>

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <div>
            <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
            <input required type="email" className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="mail@example.com" />
          </div>
          <div>
            <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Пароль</label>
            <input required type="password" className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary-custom w-100 py-3 mt-2">Войти</button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <span className="text-body-secondary small">Нет аккаунта? </span>
          <Link to="/register" className="text-danger fw-bold small text-decoration-none hover-underline">Зарегистрироваться</Link>
        </div>
      </motion.div>
      <style>{`.fw-black { font-weight: 900; } .hover-underline:hover { text-decoration: underline !important; }`}</style>
    </div>
  );
};
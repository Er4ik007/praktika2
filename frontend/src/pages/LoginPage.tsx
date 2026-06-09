import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Добавили useNavigate для редиректа
import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { document.title = "Вход — Minsk Gastro Guide"; }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Отправляем запрос на логин
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Неверный email или пароль');
      }

      // МАГИЯ BOM: Сохраняем токен и имя в локальную память браузера!
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userName', data.user_name);

      // Перенаправляем пользователя на главную страницу (позже переделаем на личный кабинет)
      navigate('/');
      // Перезагружаем страницу, чтобы шапка "поняла", что мы вошли
      window.location.reload();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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

        {/* ВЫВОД ОШИБКИ */}
        {error && (
          <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <div>
            <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
            <input 
              required type="email" 
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="mail@example.com" 
            />
          </div>
          <div>
            <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Пароль</label>
            <input 
              required type="password" 
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="••••••••" 
            />
          </div>
          <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2 d-flex justify-content-center align-items-center gap-2">
            {isLoading ? <span className="spinner-border spinner-border-sm"></span> : 'Войти'}
          </button>
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
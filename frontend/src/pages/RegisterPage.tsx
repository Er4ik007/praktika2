import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

export const RegisterPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Состояние формы
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => { document.title = "Регистрация — Minsk Gastro Guide"; }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Отправляем реальный запрос на наш Python сервер
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Если сервер ответил ошибкой (например, email занят), показываем её
        throw new Error(data.detail || 'Ошибка при регистрации');
      }

      // Если всё ок — показываем окно успеха
      setSubmitted(true);
      
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
        className="card bg-body-tertiary border-0 rounded-4 shadow-lg p-4 p-sm-5 w-100" style={{ maxWidth: '500px' }}
      >
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
            <CheckCircle className="text-success mb-3" size={60} />
            <h2 className="h4 fw-bold text-body-emphasis mb-3">Регистрация успешна!</h2>
            <p className="text-body-secondary mb-4">
              Ваш аккаунт успешно создан. Теперь вы можете войти в систему.
            </p>
            <Link to="/login" className="btn btn-primary-custom rounded-pill px-5 py-2">Войти</Link>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-4">
              <h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">Регистрация</h1>
              <p className="text-body-secondary small">Присоединяйтесь к гастро-комьюнити</p>
            </div>

            {/* ВЫВОД ОШИБКИ С СЕРВЕРА */}
            {error && (
              <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-grid gap-3">
              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Ваше имя</label>
                <input 
                  required type="text" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="Алексей" 
                />
              </div>
              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
                <input 
                  required type="email" 
                  pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" title="Email должен содержать доменную зону"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="mail@example.com" 
                />
              </div>
              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Пароль</label>
                <input 
                  required type="password" minLength={6}
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="Минимум 6 символов" 
                />
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2 d-flex justify-content-center align-items-center gap-2">
                {isLoading ? <span className="spinner-border spinner-border-sm"></span> : 'Создать аккаунт'}
              </button>
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
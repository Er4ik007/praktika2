import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Eye, EyeOff, KeyRound, MailCheck } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // СОСТОЯНИЯ ДЛЯ "ЗАБЫЛИ ПАРОЛЬ"
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1-ввод email, 2-ввод кода и нового пароля
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => { document.title = "Вход"; }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Неверный email или пароль');

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userName', data.user_name);
      navigate('/');
      window.location.reload();
    } catch (err: any) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  // 1 ЭТАП ВОССТАНОВЛЕНИЯ: Отправляем email на сервер
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    try {
      const res = await fetch('http://localhost:8000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      if (!res.ok) throw new Error('Ошибка сервера');
      
      // Если всё ок, переводим форму на шаг 2 (ввод кода)
      setResetStep(2);
    } catch (err: any) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  // 2 ЭТАП ВОССТАНОВЛЕНИЯ: Отправляем код и новый пароль
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, code: resetCode, new_password: newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Неверный код');

      // УСПЕХ! Возвращаем на форму логина
      alert("Пароль успешно изменен! Теперь вы можете войти.");
      setIsForgotMode(false);
      setResetStep(1);
      setNewPassword('');
      setConfirmPassword('');
      setResetCode('');
    } catch (err: any) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card bg-body-tertiary border-0 rounded-4 shadow-lg p-4 p-sm-5 w-100" style={{ maxWidth: '450px' }}
      >
        <AnimatePresence mode="wait">
          
          {/* ФОРМА ВОССТАНОВЛЕНИЯ ПАРОЛЯ */}
          {isForgotMode ? (
            <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-4">
                <KeyRound className="text-danger mb-3" size={40} />
                <h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">Сброс пароля</h1>
                <p className="text-body-secondary small">
                  {resetStep === 1 ? "Введите email от вашего аккаунта" : "Введите код из письма и новый пароль"}
                </p>
              </div>

              {error && <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-4">{error}</div>}

              {resetStep === 1 ? (
                // ШАГ 1: Ввод Email
                <form onSubmit={handleForgotSubmit} className="d-grid gap-3">
                  <div>
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
                    <input required type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="mail@example.com" />
                  </div>
                  <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2 d-flex justify-content-center gap-2">
                    {isLoading ? <span className="spinner-border spinner-border-sm"></span> : 'Отправить код'}
                  </button>
                </form>
              ) : (
                // ШАГ 2: Ввод Кода и Нового пароля
                <form onSubmit={handleResetSubmit} className="d-grid gap-3">
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-3 small fw-bold d-flex gap-2 align-items-center mb-2">
                    <MailCheck size={18}/> Код отправлен на {resetEmail}
                  </div>
                  <div>
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Код из письма</label>
                    <input required type="text" maxLength={4} value={resetCode} onChange={e => setResetCode(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-black text-center letter-spacing-lg" placeholder="0000" />
                  </div>
                  <div>
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Новый пароль</label>
                    <input required minLength={6} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Подтвердите пароль</label>
                    <input required minLength={6} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="••••••••" />
                  </div>
                  <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2">
                    {isLoading ? <span className="spinner-border spinner-border-sm"></span> : 'Сохранить пароль'}
                  </button>
                </form>
              )}

              <div className="text-center mt-4 pt-3 border-top">
                <button onClick={() => {setIsForgotMode(false); setResetStep(1); setError(''); setNewPassword(''); setConfirmPassword(''); setResetCode('');}} className="btn btn-link text-body-secondary fw-bold small text-decoration-none hover-underline">
                  Вернуться ко входу
                </button>
              </div>
            </motion.div>
          ) : (
            
            // ОБЫЧНАЯ ФОРМА ЛОГИНА
            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="text-center mb-4">
                <Utensils className="text-danger mb-3" size={40} />
                <h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">С возвращением</h1>
                <p className="text-body-secondary small">Войдите, чтобы сохранять любимые места</p>
              </div>

              {error && <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-4">{error}</div>}

              <form onSubmit={handleLogin} className="d-grid gap-3">
                <div>
                  <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
                  <input required type="email" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="mail@example.com" />
                </div>
                
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-0">Пароль</label>
                    {/* КНОПКА ПЕРЕКЛЮЧЕНИЯ НА ЗАБЫЛИ ПАРОЛЬ */}
                    <button type="button" onClick={() => setIsForgotMode(true)} className="btn btn-link p-0 text-danger small fw-bold text-decoration-none hover-underline" style={{fontSize: '0.75rem'}}>Забыли?</button>
                  </div>
                  <div className="position-relative">
                    <input required minLength={6} type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn border-0 position-absolute top-50 end-0 translate-middle-y px-3 text-secondary hover-text-danger">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
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
          )}
          
        </AnimatePresence>
      </motion.div>
      <style>{`
        .fw-black { font-weight: 900; } 
        .hover-underline:hover { text-decoration: underline !important; }
        .hover-text-danger:hover { color: #ef4444 !important; }
        .letter-spacing-lg { letter-spacing: 0.5em; }
      `}</style>
    </div>
  );
};
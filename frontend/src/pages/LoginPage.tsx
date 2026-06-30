import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Eye, EyeOff, KeyRound, MailCheck } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { API_BASE } from '../config';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useLang();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [is2faMode, setIs2faMode] = useState(false);
  const [twoFaEmail, setTwoFaEmail] = useState('');
  const [twoFaCode, setTwoFaCode] = useState('');
  const [twoFaSuccess, setTwoFaSuccess] = useState('');
  const [twoFaResendCooldown, setTwoFaResendCooldown] = useState(0);

  useEffect(() => { document.title = t('nav.login'); }, [t]);

  useEffect(() => {
    if (twoFaResendCooldown <= 0) return;
    const timer = setTimeout(() => setTwoFaResendCooldown(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [twoFaResendCooldown]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.status === 429) throw new Error('Слишком много попыток. Подождите минуту и попробуйте снова.');
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Неверный email или пароль');

      if (data.requires_2fa) {
        setIs2faMode(true);
        setTwoFaEmail(data.email);
        setTwoFaResendCooldown(60);
        return;
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userName', data.user_name);
      if (data.is_admin) localStorage.setItem('isAdmin', 'true');
      navigate('/');
      window.location.reload();
    } catch (err: any) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  const handle2faVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError(''); setTwoFaSuccess('');
    try {
      const res = await fetch(`${API_BASE}/api/admin/verify-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: twoFaEmail, code: twoFaCode })
      });
      if (res.status === 429) throw new Error('Слишком много попыток. Подождите минуту и попробуйте снова.');
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Неверный код');

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userName', data.user_name);
      if (data.is_admin) localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } catch (err: any) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  const handle2faResend = async () => {
    if (twoFaResendCooldown > 0) return;
    setError(''); setTwoFaSuccess('');
    try {
      const res = await fetch(`${API_BASE}/api/admin/send-2fa-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: twoFaEmail, code: '' })
      });
      if (!res.ok) throw new Error(t('admin.2fa.sendError'));
      setTwoFaResendCooldown(60);
      setTwoFaSuccess(t('admin.2fa.newCodeSent'));
    } catch (err: any) { setError(err.message); }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      if (res.status === 429) throw new Error('Слишком много запросов. Подождите минуту и попробуйте снова.');
      if (!res.ok) throw new Error('Ошибка сервера');
      setResetStep(2);
    } catch (err: any) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, code: resetCode, new_password: newPassword })
      });
      if (res.status === 429) throw new Error('Слишком много запросов. Подождите минуту и попробуйте снова.');
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Неверный код');

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
          {is2faMode ? (
            <motion.div key="2fa" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-4">
                <KeyRound className="text-danger mb-3" size={40} />
                <h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">{t('admin.2fa.title')}</h1>
                <p className="text-body-secondary small">
                  {t('admin.2fa.sentTo')} {twoFaEmail}
                </p>
              </div>

              {error && <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-4">{error}</div>}
              {twoFaSuccess && <div className="alert alert-success small fw-bold text-center border-0 rounded-3 mb-4">{twoFaSuccess}</div>}

              <form onSubmit={handle2faVerify} className="d-grid gap-3">
                <div>
                  <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">{t('common.confirmCode')}</label>
                  <input required type="text" maxLength={4} value={twoFaCode} onChange={e => setTwoFaCode(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-black text-center letter-spacing-lg" placeholder="0000" autoFocus />
                </div>
                <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2 d-flex justify-content-center gap-2">
                  {isLoading ? <span className="spinner-border spinner-border-sm"></span> : t('admin.2fa.verify')}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <button onClick={handle2faResend} disabled={twoFaResendCooldown > 0} className="btn btn-link text-body-secondary fw-bold small text-decoration-none hover-underline" style={{fontSize: '0.75rem'}}>
                  {twoFaResendCooldown > 0 ? `${t('admin.2fa.resendIn')} (${twoFaResendCooldown}с)` : t('admin.2fa.resend')}
                </button>
              </div>
              <div className="text-center mt-2">
                <button onClick={() => { setIs2faMode(false); setTwoFaCode(''); setError(''); setTwoFaSuccess(''); }} className="btn btn-link text-body-secondary fw-bold small text-decoration-none hover-underline" style={{fontSize: '0.75rem'}}>
                  {t('login.forgot.backToLogin')}
                </button>
              </div>
            </motion.div>
          ) : isForgotMode ? (
            <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-4">
                <KeyRound className="text-danger mb-3" size={40} />
                <h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">{t('login.forgot.title')}</h1>
                <p className="text-body-secondary small">
                  {resetStep === 1 ? t('login.forgot.step1') : t('login.forgot.step2')}
                </p>
              </div>

              {error && <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-4">{error}</div>}

              {resetStep === 1 ? (
                <form onSubmit={handleForgotSubmit} className="d-grid gap-3">
                  <div>
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
                    <input required type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="mail@example.com" />
                  </div>
                  <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2 d-flex justify-content-center gap-2">
                    {isLoading ? <span className="spinner-border spinner-border-sm"></span> : t('login.forgot.sendCode')}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetSubmit} className="d-grid gap-3">
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-3 small fw-bold d-flex gap-2 align-items-center mb-2">
                    <MailCheck size={18}/> {t('common.codeSentTo')} {resetEmail}
                  </div>
                  <div>
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">{t('login.forgot.codeFromEmail')}</label>
                    <input required type="text" maxLength={4} value={resetCode} onChange={e => setResetCode(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-black text-center letter-spacing-lg" placeholder="0000" />
                  </div>
                  <div>
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">{t('login.forgot.newPassword')}</label>
                    <input required minLength={6} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">{t('login.forgot.confirmPassword')}</label>
                    <input required minLength={6} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="••••••••" />
                  </div>
                  <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2">
                    {isLoading ? <span className="spinner-border spinner-border-sm"></span> : t('login.forgot.save')}
                  </button>
                </form>
              )}

              <div className="text-center mt-4 pt-3 border-top">
                <button onClick={() => {setIsForgotMode(false); setResetStep(1); setError(''); setNewPassword(''); setConfirmPassword(''); setResetCode('');}} className="btn btn-link text-body-secondary fw-bold small text-decoration-none hover-underline">
                  {t('login.forgot.backToLogin')}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="text-center mb-4">
                <Utensils className="text-danger mb-3" size={40} />
                <h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">{t('login.title')}</h1>
                <p className="text-body-secondary small">{t('login.desc')}</p>
              </div>

              {error && <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-4">{error}</div>}

              <form onSubmit={handleLogin} className="d-grid gap-3">
                <div>
                  <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
                  <input required type="email" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="mail@example.com" />
                </div>

                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-0">{t('login.password')}</label>
                    <button type="button" onClick={() => setIsForgotMode(true)} className="btn btn-link p-0 text-danger small fw-bold text-decoration-none hover-underline" style={{fontSize: '0.75rem'}}>{t('login.forgot')}</button>
                  </div>
                  <div className="position-relative">
                    <input required minLength={6} type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn border-0 position-absolute top-50 end-0 translate-middle-y px-3 text-secondary hover-text-danger">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2 d-flex justify-content-center align-items-center gap-2">
                  {isLoading ? <span className="spinner-border spinner-border-sm"></span> : t('login.submit')}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <span className="text-body-secondary small">{t('login.noAccount')}</span>
                <Link to="/register" className="text-danger fw-bold small text-decoration-none hover-underline">{t('login.register')}</Link>
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

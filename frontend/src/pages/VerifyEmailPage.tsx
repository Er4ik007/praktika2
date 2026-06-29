import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MailCheck, AlertCircle } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { t } = useLang();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg(t('verify.expired'));
      return;
    }

    fetch('https://praktika2-vkkr.onrender.com/api/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || t('verify.error'));
        setStatus('success');
      })
      .catch((err: any) => {
        setStatus('error');
        setErrorMsg(err.message || t('verify.error'));
      });
  }, [token, t]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card bg-body-tertiary border-0 rounded-4 shadow-lg p-4 p-sm-5 w-100 text-center" style={{ maxWidth: '480px' }}>
        {status === 'loading' && (
          <>
            <div className="spinner-border text-danger mb-3" />
            <h2 className="h4 fw-bold text-body-emphasis">{t('verify.loading')}</h2>
          </>
        )}
        {status === 'success' && (
          <>
            <MailCheck className="text-success mb-3" size={60} />
            <h2 className="h4 fw-bold text-body-emphasis mb-3">{t('verify.success')}</h2>
            <p className="text-body-secondary mb-4">{t('verify.successDesc')}</p>
            <Link to="/login" className="btn btn-primary-custom rounded-pill px-5 py-2">{t('register.successGo')}</Link>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="text-danger mb-3" size={60} />
            <h2 className="h4 fw-bold text-body-emphasis mb-3">{t('verify.error')}</h2>
            <p className="text-body-secondary mb-4">{errorMsg}</p>
            <Link to="/register" className="btn btn-primary-custom rounded-pill px-5 py-2">{t('register.login')}</Link>
          </>
        )}
      </motion.div>
    </div>
  );
};

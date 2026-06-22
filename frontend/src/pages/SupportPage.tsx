import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Send, MessageSquare, LifeBuoy } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

export const SupportPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: '', message: '' });
  const { t } = useLang();

  useEffect(() => {
    document.title = t('support.title') || 'Служба поддержки';
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [t, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const token = localStorage.getItem('token');
      await fetch('https://praktika2-vkkr.onrender.com/api/messages/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData)
      });
    } catch {}
  };

  return (
    <div className="container py-5 mt-5">
      <div className="mx-auto" style={{ maxWidth: '700px' }}>
        <div className="text-center mb-5 pb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-4 mb-4" style={{ width: '64px', height: '64px' }}>
            <LifeBuoy size={32} className="text-danger" />
          </div>
          <h1 className="display-4 fw-black italic text-uppercase tracking-tighter mb-3 text-body-emphasis">{t('support.title')}</h1>
          <p className="text-body-secondary fw-medium fs-5 px-md-5">{t('support.desc')}</p>
        </div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-body-tertiary border-0 rounded-4 shadow-lg p-4 p-md-5"
          >
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-md-6">
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2 d-block ms-1">{t('support.form.name')}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="form-control rounded-3 bg-body border border-body-secondary py-3 px-4 shadow-none"
                  placeholder="Алексей"
                />
              </div>
              <div className="col-md-6">
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2 d-block ms-1">{t('support.form.email')}</label>
                <input
                  required
                  type="email"
                  pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                  title="Email должен содержать доменную зону (например: .com, .by, .ru)"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-control rounded-3 bg-body border border-body-secondary py-3 px-4 shadow-none"
                  placeholder="alex@example.com"
                />
              </div>

              <div className="col-12">
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2 d-block ms-1">{t('support.form.category')}</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="form-select rounded-3 bg-body border border-body-secondary py-3 px-4 shadow-none fw-medium"
                >
                  <option value="">{t('support.form.category.general')}</option>
                  <option value="general">{t('support.form.category.general')}</option>
                  <option value="booking">{t('support.form.category.booking')}</option>
                  <option value="venue">{t('support.form.category.venue')}</option>
                  <option value="technical">{t('support.form.category.technical')}</option>
                  <option value="other">{t('support.form.category.other')}</option>
                </select>
              </div>

              <div className="col-12">
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2 d-block ms-1">{t('support.form.message')}</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="form-control rounded-3 bg-body border border-body-secondary py-3 px-4 shadow-none h-25"
                  style={{ minHeight: '150px' }}
                  placeholder={t('support.form.messagePlaceholder')}
                ></textarea>
              </div>

              <div className="col-12 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-3 group"
                >
                  {t('support.form.send')}
                  <Send size={20} className="transition-transform group-hover-send" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success bg-opacity-10 p-5 rounded-4 text-center border border-success border-opacity-25"
          >
            <div className="bg-body rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-sm text-success" style={{ width: '64px', height: '64px' }}>
              <MessageSquare size={32} />
            </div>
            <h2 className="h3 fw-bold text-body-emphasis mb-2">{t('support.form.sent')}</h2>
            <p className="text-success fw-medium opacity-75 mb-4">{t('support.form.sentDesc')}</p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', category: '', message: '' }); }}
              className="btn btn-link text-success fw-bold text-uppercase small tracking-widest text-decoration-none hover-underline px-0"
            >
              {t('support.form.sendAnother')}
            </button>
          </motion.div>
        )}
      </div>
      <style>{`
        .fw-black { font-weight: 900; }
        .group-hover-send { transition: transform 0.3s ease; }
        .btn-primary-custom:hover .group-hover-send { transform: translate(4px, -4px); }
        .hover-underline:hover { text-decoration: underline !important; }
      `}</style>
    </div>
  );
};

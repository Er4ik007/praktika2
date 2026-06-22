import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

const COUNTRY_CODES = [
  { code: '+375', countryCode: 'by', label: 'Беларусь', mask: '(XX) XXX-XX-XX', regex: /^\(\d{2}\) \d{3}-\d{2}-\d{2}$/ },
  { code: '+7',   countryCode: 'ru', label: 'Россия',   mask: '(XXX) XXX-XX-XX', regex: /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/ },
  { code: '+7',   countryCode: 'kz', label: 'Казахстан', mask: '(XXX) XXX-XX-XX', regex: /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/ },
  { code: '+48',  countryCode: 'pl', label: 'Польша',   mask: 'XXX-XXX-XXX',     regex: /^\d{3}-\d{3}-\d{3}$/ },
  { code: '+370', countryCode: 'lt', label: 'Литва',    mask: '(XXX) XX-XXX',    regex: /^\(\d{3}\) \d{2}-\d{3}$/ },
  { code: '+371', countryCode: 'lv', label: 'Латвия',    mask: 'XX-XXX-XXX',      regex: /^\d{2}-\d{3}-\d{3}$/ },
  { code: '+995', countryCode: 'ge', label: 'Грузия',   mask: '(XXX) XX-XX-XX',  regex: /^\(\d{3}\) \d{2}-\d{2}-\d{2}$/ },
  { code: '+971', countryCode: 'ae', label: 'ОАЭ',      mask: '(XX) XXX-XXXX',   regex: /^\(\d{2}\) \d{3}-\d{4}$/ }
];

export const RegisterPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLang();

  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [rawPhone, setRawPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = t('nav.register') || 'Регистрация'; }, [t]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPhoneNumber = (value: string, mask: string) => {
    const numbers = value.replace(/\D/g, '');
    let formatted = '';
    let numberIndex = 0;
    for (let i = 0; i < mask.length; i++) {
      if (numberIndex >= numbers.length) break;
      if (mask[i] === 'X') {
        formatted += numbers[numberIndex];
        numberIndex++;
      } else {
        formatted += mask[i];
      }
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatPhoneNumber(inputValue, selectedCountry.mask);
    setRawPhone(formatted);
    setFormData({
      ...formData,
      phone: formatted.length > 0 ? `${selectedCountry.code} ${formatted}` : ''
    });
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rawPhone.length > 0 && !selectedCountry.regex.test(rawPhone)) {
      setPhoneError('Введите полный номер телефона');
      return;
    }

    setIsLoading(true);
    setError('');

    const finalData = {
      ...formData,
      phone: formData.phone ? formData.phone : null
    };

    try {
      const response = await fetch('https://praktika2-vkkr.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Ошибка при регистрации');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card bg-body-tertiary border-0 rounded-4 shadow-lg p-4 p-sm-5 w-100" style={{ maxWidth: '500px' }}>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
            <CheckCircle className="text-success mb-3" size={60} />
            <h2 className="h4 fw-bold text-body-emphasis mb-3">{t('register.success')}</h2>
            <Link to="/login" className="btn btn-primary-custom rounded-pill px-5 py-2">{t('register.successGo')}</Link>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-4"><h1 className="h3 fw-black text-body-emphasis uppercase tracking-tighter">{t('register.title')}</h1></div>
            {error && <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="d-grid gap-3">
              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">{t('register.name')}</label>
                <input required type="text" maxLength={20} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" placeholder="Алексей" />
              </div>
              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Email</label>
                <input required type="email" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder="mail@example.com" />
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="text-body-secondary small fw-bold text-uppercase tracking-widest">{t('register.phone')}</label>
                  <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{t('register.phoneOptional')}</span>
                </div>
                <div className={`d-flex rounded-3 position-relative bg-body ${phoneError ? 'border border-danger' : 'border-0'}`}>
                  <div ref={dropdownRef} className="position-relative">
                    <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="btn border-0 h-100 d-flex align-items-center gap-2 px-3 text-body" style={{ borderRight: '1px solid var(--bs-border-color)' }}>
                      <img src={`https://flagcdn.com/24x18/${selectedCountry.countryCode}.png`} alt={selectedCountry.label} className="rounded-1 shadow-sm" style={{ width: '24px', height: '18px', objectFit: 'cover' }} />
                      <span className="fw-bold">{selectedCountry.code}</span>
                      <ChevronDown size={14} className={`text-secondary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="position-absolute top-100 start-0 mt-2 bg-body border rounded-3 shadow-lg z-3 custom-scrollbar" style={{ minWidth: '240px', maxHeight: '250px', overflowY: 'auto' }}>
                          <ul className="list-unstyled mb-0 m-0 p-0">
                            {COUNTRY_CODES.map((country) => (
                              <li key={country.label}>
                                <button type="button" className="btn btn-link w-100 text-start text-decoration-none text-body px-3 py-2 d-flex align-items-center gap-3 hover-bg-light"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setRawPhone('');
                                    setFormData({...formData, phone: ''});
                                    setPhoneError('');
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  <img src={`https://flagcdn.com/24x18/${country.countryCode}.png`} alt={country.label} className="rounded-1 shadow-sm" style={{ width: '24px', height: '18px', objectFit: 'cover' }} />
                                  <span className="fw-bold" style={{ minWidth: '60px' }}>{country.code}</span>
                                  <span className="text-body-secondary small ms-auto">{country.label}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <input value={rawPhone} onChange={handlePhoneChange} type="tel" className="form-control bg-transparent text-body border-0 py-3 shadow-none fw-medium flex-grow-1" placeholder={selectedCountry.mask} />
                </div>
                {phoneError && <div className="text-danger small mt-2 fw-bold">{phoneError}</div>}
              </div>

              <div>
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">{t('register.password')}</label>
                <div className="position-relative">
                  <input required minLength={6} maxLength={50} type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none" placeholder={t('common.min6chars')} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn border-0 position-absolute top-50 end-0 translate-middle-y px-3 text-secondary">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary-custom w-100 py-3 mt-2">{t('register.submit')}</button>
            </form>
            <div className="text-center mt-4 pt-3 border-top"><span className="text-body-secondary small">{t('register.hasAccount')}</span><Link to="/login" className="text-danger fw-bold small text-decoration-none hover-underline">{t('register.login')}</Link></div>
          </>
        )}
      </motion.div>
      <style>{`.fw-black { font-weight: 900; } .hover-underline:hover { text-decoration: underline !important; } .hover-text-danger:hover { color: #ef4444 !important; } .rotate-180 { transform: rotate(180deg); } .transition-transform { transition: transform 0.3s ease; } .hover-bg-light:hover { background-color: var(--bs-tertiary-bg); } .z-3 { z-index: 1050; } .custom-scrollbar { overflow-y: auto; } .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--bs-secondary-color); border-radius: 10px; opacity: 0.5; }`}</style>
    </div>
  );
};

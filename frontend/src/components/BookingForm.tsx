import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Star, ChevronRight, ChevronDown } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { API_BASE } from '../config';

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

export const BookingForm = ({ venueName, venueId }: { venueName?: string; venueId?: string }) => {
  const [formState, setFormState] = useState({ name: '', date: '', guests: '2', message: '' });
  const { t } = useLang();

  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [rawPhone, setRawPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.name) setFormState(prev => ({ ...prev, name: data.name }));
          if (data.phone) {
            const matched = COUNTRY_CODES.find(c => data.phone.startsWith(c.code));
            if (matched) {
              setSelectedCountry(matched);
              setRawPhone(data.phone.replace(matched.code, '').trim());
            }
          }
        }
      } catch (err) { console.error(err); }
    };
    fetchUserData();
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
    setRawPhone(formatPhoneNumber(e.target.value, selectedCountry.mask));
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCountry.regex.test(rawPhone)) {
      setPhoneError('Номер введен не полностью или неверно');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setSubmitError('Для бронирования необходимо войти в аккаунт');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    const fullPhone = `${selectedCountry.code} ${rawPhone}`;

    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          venue_id: venueId || 'unknown',
          venue_name: venueName || 'Неизвестное заведение',
          name: formState.name,
          date: formState.date,
          guests: formState.guests,
          phone: fullPhone,
          message: formState.message || null
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Ошибка при бронировании');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', date: '', guests: '2', message: '' });
        setRawPhone('');
      }, 5000);
    } catch (err: any) {
      setSubmitError(err.message || 'Ошибка сети');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-5 bg-body-tertiary rounded-4 px-3 px-md-4" id="booking">
      <div className="mx-auto bg-body rounded-4 shadow-lg overflow-hidden row border" style={{ maxWidth: '900px' }}>
        <div className="col-md-5 bg-danger p-4 p-md-5 text-white d-flex flex-column justify-content-center">
          <h2 className="display-6 fw-bold mb-4">{t('booking.title')}</h2>
          {venueName && <p className="h5 mb-4 text-white text-opacity-75">{t('booking.at')} {venueName}</p>}
          <p className="text-white text-opacity-75 mb-5 fs-5">
            {t('booking.desc')}
          </p>
          <div className="d-grid gap-3">
            <div className="d-flex align-items-center gap-3">
              <MapPin size={24} />
              <span className="fw-medium">{t('booking.allMinsk')}</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Star size={24} />
              <span className="fw-medium">{t('booking.guarantee')}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="col-md-7 p-4 p-md-5">
          {submitted ? (
             <AnimatePresence>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-100 d-flex flex-column justify-content-center align-items-center text-center py-5 text-success">
                 <Send size={40} className="mb-3" />
                 <h3 className="h2 fw-bold text-body-emphasis mb-2">{t('booking.sent')}</h3>
                 <p className="text-body-secondary">{t('booking.sentDesc')} <br/><b>{selectedCountry.code} {rawPhone}</b></p>
               </motion.div>
             </AnimatePresence>
          ) : (
            <div className="d-grid gap-3 gap-md-4">
              <div className="row g-3">
                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">{t('booking.name')}</label>
                  <input required value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} type="text" className="form-control rounded-3 bg-body-tertiary text-body border-0 py-2 py-md-3 shadow-none fw-medium" placeholder="Иван Иванов" />
                </div>

                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">{t('booking.phone')}</label>
                  <div className={`d-flex rounded-3 position-relative bg-body-tertiary ${phoneError ? 'border border-danger' : 'border-0'}`}>
                    <div ref={dropdownRef} className="position-relative flex-shrink-0">
                      <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="btn border-0 h-100 d-flex align-items-center gap-1 gap-md-2 px-2 px-md-3 text-body" style={{ borderRight: '1px solid var(--bs-border-color)' }}>
                        <img src={`https://flagcdn.com/24x18/${selectedCountry.countryCode}.png`} alt={selectedCountry.label} className="rounded-1 shadow-sm" style={{ width: '24px', height: '18px', objectFit: 'cover' }} />
                        <span className="fw-bold small">{selectedCountry.code}</span>
                        <ChevronDown size={14} className={`text-secondary transition-transform d-none d-md-inline ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="position-absolute top-100 start-0 mt-2 bg-body border rounded-3 shadow-lg z-3 custom-scrollbar country-code-dropdown" style={{ minWidth: '240px', maxHeight: '250px', overflowY: 'auto' }}>
                            <ul className="list-unstyled mb-0 m-0 p-0">
                              {COUNTRY_CODES.map((country) => (
                                <li key={country.label}>
                                  <button type="button" className="btn btn-link w-100 text-start text-decoration-none text-body px-3 py-2 d-flex align-items-center gap-3 hover-bg-light" onClick={() => { setSelectedCountry(country); setRawPhone(''); setPhoneError(''); setIsDropdownOpen(false); }}>
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
                    <input required value={rawPhone} onChange={handlePhoneChange} type="tel" className="form-control bg-transparent text-body border-0 py-2 py-md-3 shadow-none fw-medium flex-grow-1" placeholder={selectedCountry.mask} />
                  </div>
                  {phoneError && <div className="text-danger small mt-2 fw-bold">{phoneError}</div>}
                </div>

                <div className="col-sm-6">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">{t('booking.date')}</label>
                  <input required type="date" min={today} value={formState.date} onChange={(e) => setFormState({...formState, date: e.target.value})} className="form-control rounded-3 bg-body-tertiary text-body border-0 py-2 py-md-3 shadow-none fw-medium" />
                </div>
                <div className="col-sm-6">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">{t('booking.guests')}</label>
                  <select value={formState.guests} onChange={(e) => setFormState({...formState, guests: e.target.value})} className="form-select rounded-3 bg-body-tertiary text-body border-0 py-2 py-md-3 shadow-none fw-medium">
                    <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8+</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">{t('booking.wishes')}</label>
                  <textarea value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="form-control rounded-3 bg-body-tertiary text-body border-0 py-2 py-md-3 shadow-none h-25 fw-medium" style={{ minHeight: '80px' }} placeholder={t('booking.wishesPlaceholder')} />
                </div>
              </div>
              {submitError && <div className="text-danger small fw-bold mt-2">{submitError}</div>}
              <button type="submit" disabled={isSubmitting} className="btn btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2 shadow-sm mt-2">
                {isSubmitting ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  <>{t('booking.submit')} <ChevronRight size={18} /></>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
      <style>{`.rotate-180 { transform: rotate(180deg); } .transition-transform { transition: transform 0.3s ease; } .hover-bg-light:hover { background-color: var(--bs-tertiary-bg); } .z-3 { z-index: 1050; } .custom-scrollbar { overflow-y: auto; } .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--bs-secondary-color); border-radius: 10px; opacity: 0.5; }`}</style>
    </section>
  );
};

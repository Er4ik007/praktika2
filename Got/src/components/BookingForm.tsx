import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Star, ChevronRight, ChevronDown } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+375', flag: '🇧🇾', label: 'Беларусь', mask: '(XX) XXX-XX-XX', regex: /^\(\d{2}\) \d{3}-\d{2}-\d{2}$/ },
  { code: '+7',   flag: '🇷🇺', label: 'Россия',   mask: '(XXX) XXX-XX-XX', regex: /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/ },
  { code: '+7',   flag: '🇰🇿', label: 'Казахстан', mask: '(XXX) XXX-XX-XX', regex: /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/ },
  { code: '+48',  flag: '🇵🇱', label: 'Польша',   mask: 'XXX-XXX-XXX',     regex: /^\d{3}-\d{3}-\d{3}$/ },
  { code: '+370', flag: '🇱🇹', label: 'Литва',    mask: '(XXX) XX-XXX',    regex: /^\(\d{3}\) \d{2}-\d{3}$/ },
  { code: '+371', flag: '🇱🇻', label: 'Латвия',    mask: 'XX-XXX-XXX',      regex: /^\d{2}-\d{3}-\d{3}$/ },
  { code: '+995', flag: '🇬🇪', label: 'Грузия',   mask: '(XXX) XX-XX-XX',  regex: /^\(\d{3}\) \d{2}-\d{2}-\d{2}$/ },
  { code: '+971', flag: '🇦🇪', label: 'ОАЭ',      mask: '(XX) XXX-XXXX',   regex: /^\(\d{2}\) \d{3}-\d{4}$/ }
];

export const BookingForm = ({ venueName }: { venueName?: string }) => {
  const [formState, setFormState] = useState({ name: '', date: '', guests: '2', message: '' });
  
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [rawPhone, setRawPhone] = useState(''); 
  const [phoneError, setPhoneError] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [submitted, setSubmitted] = useState(false);

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
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedCountry.regex.test(rawPhone)) {
      setPhoneError('Номер введен не полностью или неверно');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', date: '', guests: '2', message: '' });
      setRawPhone('');
    }, 5000);
  };

  return (
    <section className="py-5 bg-body-tertiary rounded-4 px-3" id="booking">
      <div className="mx-auto bg-body rounded-4 shadow-lg overflow-hidden row border" style={{ maxWidth: '900px' }}>
        <div className="col-md-5 bg-danger p-5 text-white d-flex flex-column justify-content-center">
          <h2 className="display-6 fw-bold mb-4">Бронирование</h2>
          {venueName && <p className="h5 mb-4 text-white text-opacity-75">в {venueName}</p>}
          <p className="text-white text-opacity-75 mb-5 fs-5">
            Забронируйте столик прямо сейчас. Мы свяжемся с вами в течение 10 минут для подтверждения.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="col-md-7 p-5">
          {submitted ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-100 d-flex flex-column justify-content-center align-items-center text-center py-5 text-success">
               <Send size={40} className="mb-3" />
               <h3 className="h2 fw-bold text-body-emphasis mb-2">Заявка отправлена!</h3>
               <p className="text-body-secondary">Ожидайте звонка на номер <br/><b>{selectedCountry.code} {rawPhone}</b></p>
             </motion.div>
          ) : (
            <div className="d-grid gap-4">
              <div className="row g-3">
                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Имя</label>
                  <input required value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} type="text" className="form-control rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none fw-medium" placeholder="Иван Иванов" />
                </div>
                
                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Контактный телефон</label>
                  <div className={`d-flex rounded-3 position-relative bg-body-tertiary ${phoneError ? 'border border-danger' : 'border-0'}`}>
                    
                    <div ref={dropdownRef} className="position-relative">
                      <button 
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="btn border-0 h-100 d-flex align-items-center gap-2 px-3 text-body"
                        style={{ borderRight: '1px solid var(--bs-border-color)' }}
                      >
                        <span className="fs-5">{selectedCountry.flag}</span>
                        <span className="fw-bold">{selectedCountry.code}</span>
                        <ChevronDown size={14} className={`text-secondary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            // УБРАЛ overflow-hidden, добавил кастомный класс скролла
                            className="position-absolute top-100 start-0 mt-2 bg-body border rounded-3 shadow-lg z-3 custom-scrollbar"
                            style={{ minWidth: '240px', maxHeight: '250px', overflowY: 'auto' }}
                          >
                            <ul className="list-unstyled mb-0 m-0 p-0">
                              {COUNTRY_CODES.map((country) => (
                                <li key={country.label}>
                                  <button 
                                    type="button" 
                                    className="btn btn-link w-100 text-start text-decoration-none text-body px-3 py-2 d-flex align-items-center gap-3 hover-bg-light"
                                    onClick={() => {
                                      setSelectedCountry(country);
                                      setRawPhone(''); 
                                      setPhoneError('');
                                      setIsDropdownOpen(false);
                                    }}
                                  >
                                    <span className="fs-5">{country.flag}</span>
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
                    
                    <input 
                      required 
                      value={rawPhone} 
                      onChange={handlePhoneChange} 
                      type="tel" 
                      className="form-control bg-transparent text-body border-0 py-3 shadow-none fw-medium flex-grow-1" 
                      placeholder={selectedCountry.mask} 
                    />
                  </div>
                  {phoneError && <div className="text-danger small mt-2 fw-bold">{phoneError}</div>}
                </div>

                <div className="col-sm-6">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Дата</label>
                  <input required value={formState.date} onChange={(e) => setFormState({...formState, date: e.target.value})} type="date" className="form-control rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none fw-medium" />
                </div>
                <div className="col-sm-6">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Гости</label>
                  <select value={formState.guests} onChange={(e) => setFormState({...formState, guests: e.target.value})} className="form-select rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none fw-medium">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8+</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="small fw-bold text-body-secondary text-uppercase mb-2 d-block">Пожелания</label>
                  <textarea value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="form-control rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none h-25 fw-medium" style={{ minHeight: '80px' }} placeholder="У окна, детский стульчик..." />
                </div>
              </div>
              <button type="submit" className="btn btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2 shadow-sm mt-2">
                Отправить запрос <ChevronRight size={18} />
              </button>
            </div>
          )}
        </form>
      </div>

      <style>{`
        .rotate-180 { transform: rotate(180deg); }
        .transition-transform { transition: transform 0.3s ease; }
        .hover-bg-light:hover { background-color: var(--bs-tertiary-bg); }
        .z-3 { z-index: 1050; } 
        
        /* КРАСИВЫЙ СКРОЛЛБАР */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--bs-secondary-color);
          border-radius: 10px;
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
};
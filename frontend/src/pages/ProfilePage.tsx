import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, LogOut, Settings, Heart, CalendarClock, AlertTriangle, Save, Trash2, ChevronDown, X, Check, Clock, MapPin, Users, Phone, History, Filter, Camera, KeyRound, MailCheck } from 'lucide-react';
import { venues } from '../data'; 
import { VenueCard } from '../components/VenueCard'; 

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

interface Booking {
  id: number;
  venue_id: string;
  venue_name: string;
  name: string;
  date: string;
  guests: string;
  phone: string;
  message: string | null;
  cancel_reason: string | null;
  status: string;
  created_at: string;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{name: string, email: string, phone: string | null, avatar: string | null} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('favorites'); 
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<number | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [bookingSubTab, setBookingSubTab] = useState<'active' | 'history'>('active');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedReasonTemplate, setSelectedReasonTemplate] = useState<string | null>(null);

  const getCurrentTheme = () => {
    const appTheme = localStorage.getItem('appTheme');
    if (appTheme && appTheme !== 'default') return appTheme;
    return localStorage.getItem('theme') || 'light';
  };
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme);

  const applyTheme = (themeId: string) => {
    const customThemes = ['autumn', 'ocean', 'lavender', 'forest', 'cosmic'];
    const doApply = () => {
      if (customThemes.includes(themeId)) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('appTheme', themeId);
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.setAttribute('data-bs-theme', themeId);
        localStorage.setItem('appTheme', 'default');
        localStorage.setItem('theme', themeId);
      }
      setCurrentTheme(themeId);
    };
    // @ts-ignore
    if (document.startViewTransition) {
      // @ts-ignore
      document.startViewTransition(() => doApply());
    } else {
      doApply();
    }
  };

  const CANCEL_REASONS = [
    'Изменились планы',
    'Нашёл(а) другое заведение',
    'Неудобное время',
    'Не могу найти это место',
    'Другое'
  ];

  // Состояния редактирования имени
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');

  // Состояния редактирования телефона (УМНЫЕ)
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [rawPhone, setRawPhone] = useState(''); 
  const [phoneError, setPhoneError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Состояния аватара
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Состояния смены пароля
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordStep, setPasswordStep] = useState<'input' | 'code'>('input');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changeCode, setChangeCode] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setBookingsLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) { console.error(err); }
    finally { setBookingsLoading(false); }
  };

  const handleCancelBooking = async (bookingId: number, reason?: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setCancellingId(bookingId);
    try {
      const res = await fetch(`http://localhost:8000/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: reason || null })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled', cancel_reason: reason || null } : b));
      }
    } catch (err) { console.error(err); }
    finally {
      setCancellingId(null);
      setCancelBookingId(null);
      setShowCancelModal(false);
      setCancelReason('');
      setSelectedReasonTemplate(null);
    }
  };

  const openCancelModal = (bookingId: number) => {
    setCancelBookingId(bookingId);
    setShowCancelModal(true);
    setCancelReason('');
    setSelectedReasonTemplate(null);
  };

  const confirmCancel = () => {
    if (cancelBookingId === null) return;
    const finalReason = selectedReasonTemplate === 'Другое' ? cancelReason : (selectedReasonTemplate || cancelReason || null);
    handleCancelBooking(cancelBookingId, finalReason);
  };

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
    document.title = "Личный кабинет";
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    fetch('http://localhost:8000/api/users/me', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => { if (!res.ok) throw new Error('Auth Error'); return res.json(); })
    .then(data => {
      setUserData(data);
      setEditName(data.name);
      return fetch('http://localhost:8000/api/favorites', { headers: { 'Authorization': `Bearer ${token}` } });
    })
    .then(res => res.json())
    .then(favData => {
      setFavoriteIds(favData);
      return fetchBookings();
    })
    .then(() => {
      setIsLoading(false);
    })
    .catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      navigate('/login');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

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

  // СОХРАНЕНИЕ ИМЕНИ
  const handleSaveName = async () => {
    if (editName.length < 2 || editName.length > 20) {
      setSaveMessage('Имя должно быть от 2 до 20 символов');
      return;
    }
    setIsSaving(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8000/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: editName })
      });
      if (res.ok) {
        const updated = await res.json();
        setUserData(updated);
        localStorage.setItem('userName', updated.name);
        setIsEditingName(false);
        setSaveMessage('Имя успешно изменено!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) { console.error(err); }
    finally { setIsSaving(false); }
  };

  // СОХРАНЕНИЕ ТЕЛЕФОНА (Склеиваем код и номер)
  const handleSavePhone = async () => {
    if (rawPhone.length > 0 && !selectedCountry.regex.test(rawPhone)) {
      setPhoneError('Номер введен не полностью');
      return;
    }
    setIsSaving(true);
    const token = localStorage.getItem('token');
    const finalPhone = rawPhone.length > 0 ? `${selectedCountry.code} ${rawPhone}` : null;

    try {
      const res = await fetch('http://localhost:8000/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ phone: finalPhone })
      });
      if (res.ok) {
        const updated = await res.json();
        setUserData(updated);
        setIsEditingPhone(false);
        setRawPhone('');
        setSaveMessage('Телефон успешно изменен!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) { console.error(err); }
    finally { setIsSaving(false); }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:8000/api/users/me', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      handleLogout();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFavorite = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setFavoriteIds(prev => prev.filter(fid => fid !== id));
    try {
      await fetch('http://localhost:8000/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ venue_id: id })
      });
    } catch (err) { console.error(err); }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setSaveMessage('Допустимые форматы: JPEG, PNG, WebP, GIF');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setSaveMessage('Максимальный размер файла — 2 МБ');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploadingAvatar(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/api/users/avatar', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        const updated = await res.json();
        setUserData(updated);
        setAvatarPreview(null);
        setSaveMessage('Аватар обновлен!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) { console.error(err); }
    finally { setIsUploadingAvatar(false); }
  };

  const handleAvatarDelete = async () => {
    const token = localStorage.getItem('token');
    setIsUploadingAvatar(true);
    try {
      const res = await fetch('http://localhost:8000/api/users/avatar', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const updated = await res.json();
        setUserData(updated);
        setAvatarPreview(null);
        setSaveMessage('Аватар удален');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) { console.error(err); }
    finally { setIsUploadingAvatar(false); }
  };

  const handleSendChangeCode = async () => {
    setIsSendingCode(true);
    setPasswordError('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8000/api/send-change-code', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPasswordStep('code');
        setPasswordSuccess('Код отправлен на вашу почту');
      } else {
        const data = await res.json();
        setPasswordError(data.detail || 'Ошибка отправки кода');
      }
    } catch (err) { setPasswordError('Ошибка сети'); }
    finally { setIsSendingCode(false); }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    if (newPassword !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов');
      return;
    }
    setIsChangingPassword(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8000/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ code: changeCode, new_password: newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordSuccess('Пароль успешно изменен!');
        setPasswordStep('input');
        setNewPassword('');
        setConfirmPassword('');
        setChangeCode('');
        setShowPasswordChange(false);
        setTimeout(() => setPasswordSuccess(''), 3000);
      } else {
        setPasswordError(data.detail || 'Неверный код');
      }
    } catch (err) { setPasswordError('Ошибка сети'); }
    finally { setIsChangingPassword(false); }
  };

  const resetPasswordChange = () => {
    setShowPasswordChange(false);
    setPasswordStep('input');
    setNewPassword('');
    setConfirmPassword('');
    setChangeCode('');
    setPasswordError('');
  };

  const favoriteVenues = venues.filter(v => favoriteIds.includes(v.id));

  if (isLoading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}><div className="spinner-border text-danger"></div></div>;

  return (
    <div className="container py-5 mt-5">
      <div className="row g-5">
        
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="col-lg-4" style={{ position: 'sticky', top: '90px', alignSelf: 'flex-start' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card bg-body-tertiary border-0 rounded-4 shadow-sm p-4">
            <div className="d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
              <div className="position-relative flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                {(userData?.avatar || avatarPreview) ? (
                  <img src={avatarPreview || userData?.avatar || ''} alt="Аватар" className="rounded-circle w-100 h-100" style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center fw-bold fs-4 w-100 h-100">
                    {userData?.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <button onClick={() => fileInputRef.current?.click()} className="btn btn-sm btn-danger rounded-circle position-absolute d-flex align-items-center justify-content-center shadow" style={{ bottom: '-4px', right: '-4px', width: '28px', height: '28px' }} disabled={isUploadingAvatar}>
                  {isUploadingAvatar ? <span className="spinner-border spinner-border-sm" style={{ width: '12px', height: '12px' }}></span> : <Camera size={14} />}
                </button>
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleAvatarUpload} className="d-none" />
              </div>
              <div className="overflow-hidden">
                <h3 className="h5 fw-bold text-body-emphasis mb-1 text-truncate">{userData?.name}</h3>
                <p className="text-body-secondary small mb-0 text-truncate">{userData?.email}</p>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 h-100">
              <button onClick={() => setActiveTab('favorites')} className={`btn text-start fw-bold p-3 rounded-3 ${activeTab === 'favorites' ? 'btn-danger text-white' : 'btn-light bg-body text-body-secondary hover-bg-light'}`}>
                <Heart size={18} className="me-2" /> Мое Избранное
              </button>
              <button onClick={() => setActiveTab('bookings')} className={`btn text-start fw-bold p-3 rounded-3 ${activeTab === 'bookings' ? 'btn-danger text-white' : 'btn-light bg-body text-body-secondary hover-bg-light'}`}>
                <CalendarClock size={18} className="me-2" /> Мои бронирования
              </button>
              <button onClick={() => setActiveTab('info')} className={`btn text-start fw-bold p-3 rounded-3 ${activeTab === 'info' ? 'btn-danger text-white' : 'btn-light bg-body text-body-secondary hover-bg-light'}`}>
                <Settings size={18} className="me-2" /> Настройки профиля
              </button>
              
              <button onClick={handleLogout} className="btn text-start fw-bold p-3 rounded-3 mt-3 text-danger hover-bg-light border border-danger border-opacity-25">
                <LogOut size={18} className="me-2" /> Выйти из аккаунта
              </button>
            </div>
          </motion.div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="col-lg-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card bg-body-tertiary border-0 rounded-4 shadow-sm p-4 p-md-5 h-100">
            
            {/* === ВКЛАДКА: НАСТРОЙКИ ПРОФИЛЯ === */}
            {activeTab === 'info' && (
              <div className="d-grid gap-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <h2 className="display-6 fw-black italic text-uppercase tracking-tighter mb-0 text-body-emphasis">Личные данные</h2>
                  {saveMessage && <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill py-2 px-3 fw-bold">{saveMessage}</span>}
                </div>
                
                <div className="row g-4">
                  <div className="col-12 border-bottom pb-4">
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2 d-block">Email (Логин)</label>
                    <div className="fs-5 fw-bold text-body-secondary ps-2">{userData?.email}</div>
                  </div>
                  
                  {/* ИМЯ */}
                  <div className="col-12 border-bottom pb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-0">Имя</label>
                      {isEditingName ? (
                        <div className="d-flex gap-2">
                          <button type="button" onClick={handleSaveName} disabled={isSaving} className="btn btn-sm btn-success rounded-pill px-3 py-1 fw-bold">Сохранить</button>
                          <button type="button" onClick={() => { setEditName(userData?.name || ''); setIsEditingName(false); }} className="btn btn-sm btn-light rounded-pill px-3 py-1 fw-bold">Отмена</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setIsEditingName(true)} className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-bold">Изменить</button>
                      )}
                    </div>
                    {isEditingName ? (
                      <input required type="text" maxLength={20} className="form-control rounded-3 bg-body border-0 py-3 px-4 shadow-none fw-medium" value={editName} onChange={e => setEditName(e.target.value)} />
                    ) : (
                      <div className="fs-5 fw-bold text-body-emphasis ps-2">{userData?.name}</div>
                    )}
                  </div>

                  {/* ТЕЛЕФОН */}
                  <div className="col-12 border-bottom pb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-0">Телефон</label>
                      {isEditingPhone ? (
                        <div className="d-flex gap-2">
                          <button type="button" onClick={handleSavePhone} disabled={isSaving} className="btn btn-sm btn-success rounded-pill px-3 py-1 fw-bold">Сохранить</button>
                          <button type="button" onClick={() => { setRawPhone(''); setIsEditingPhone(false); setPhoneError(''); }} className="btn btn-sm btn-light rounded-pill px-3 py-1 fw-bold">Отмена</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setIsEditingPhone(true)} className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-bold">Изменить</button>
                      )}
                    </div>
                    {isEditingPhone ? (
                      /* ПРИ РЕДАКТИРОВАНИИ ВЫЕЗЖАЕТ УМНЫЙ СЕЛЕКТОР */
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
                        <input value={rawPhone} onChange={handlePhoneChange} type="tel" className="form-control bg-transparent text-body border-0 py-3 shadow-none fw-medium flex-grow-1" placeholder={selectedCountry.mask} />
                      </div>
                    ) : (
                      <div className="fs-5 fw-bold text-body-emphasis ps-2">{userData?.phone || 'Не указан'}</div>
                    )}
                    {phoneError && <div className="text-danger small mt-2 fw-bold">{phoneError}</div>}
                  </div>
                </div>

                {/* АВАТАР */}
                <div className="border-bottom pb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-0">Аватар</label>
                    {userData?.avatar && (
                      <button onClick={handleAvatarDelete} disabled={isUploadingAvatar} className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-bold">Удалить</button>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <div style={{ width: '80px', height: '80px' }}>
                      {(userData?.avatar || avatarPreview) ? (
                        <img src={avatarPreview || userData?.avatar || ''} alt="Аватар" className="rounded-circle w-100 h-100" style={{ objectFit: 'cover' }} />
                      ) : (
                        <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center fw-bold fs-3 w-100 h-100">
                          {userData?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <button onClick={() => fileInputRef.current?.click()} disabled={isUploadingAvatar} className="btn btn-outline-danger fw-bold px-4 d-flex align-items-center gap-2">
                        {isUploadingAvatar ? <span className="spinner-border spinner-border-sm"></span> : <><Camera size={18} /> Загрузить фото</>}
                      </button>
                      <p className="text-body-secondary small mt-2 mb-0">JPEG, PNG, WebP или GIF. До 2 МБ.</p>
                    </div>
                  </div>
                </div>

                {/* СМЕНА ПАРОЛЯ */}
                <div className="border-bottom pb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-0">Пароль</label>
                    {passwordSuccess && <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill py-2 px-3 fw-bold">{passwordSuccess}</span>}
                  </div>

                  {!showPasswordChange ? (
                    <button onClick={() => setShowPasswordChange(true)} className="btn btn-outline-danger fw-bold px-4 d-flex align-items-center gap-2">
                      <KeyRound size={18} /> Изменить пароль
                    </button>
                  ) : (
                    <div className="bg-body p-4 rounded-3 border">
                      {passwordError && <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-3">{passwordError}</div>}

                      {passwordStep === 'input' ? (
                        <div className="d-grid gap-3">
                          <p className="text-body-secondary small mb-0">На вашу почту будет отправлен код подтверждения.</p>
                          <div>
                            <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Новый пароль</label>
                            <input minLength={6} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-control rounded-3 bg-body-tertiary border-0 py-3 px-4 shadow-none fw-medium" placeholder="Минимум 6 символов" />
                          </div>
                          <div>
                            <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Подтвердите пароль</label>
                            <input minLength={6} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-control rounded-3 bg-body-tertiary border-0 py-3 px-4 shadow-none fw-medium" placeholder="Повторите новый пароль" />
                          </div>
                          <div className="d-flex gap-2">
                            <button onClick={handleSendChangeCode} disabled={isSendingCode || !newPassword || !confirmPassword} className="btn btn-danger fw-bold px-4 d-flex align-items-center gap-2">
                              {isSendingCode ? <span className="spinner-border spinner-border-sm"></span> : <><MailCheck size={16} /> Отправить код</>}
                            </button>
                            <button onClick={resetPasswordChange} className="btn btn-light fw-bold px-4">Отмена</button>
                          </div>
                        </div>
                      ) : (
                        <div className="d-grid gap-3">
                          <div className="bg-success bg-opacity-10 text-success p-3 rounded-3 small fw-bold d-flex gap-2 align-items-center mb-0">
                            <MailCheck size={18}/> Код отправлен на {userData?.email}
                          </div>
                          <div>
                            <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2">Код из письма</label>
                            <input required type="text" maxLength={4} value={changeCode} onChange={e => setChangeCode(e.target.value)} className="form-control rounded-3 bg-body-tertiary border-0 py-3 px-4 shadow-none fw-black text-center letter-spacing-lg" placeholder="0000" />
                          </div>
                          <div className="d-flex gap-2">
                            <button onClick={handleChangePassword} disabled={isChangingPassword || changeCode.length !== 4} className="btn btn-danger fw-bold px-4 d-flex align-items-center gap-2">
                              {isChangingPassword ? <span className="spinner-border spinner-border-sm"></span> : <><Check size={16} /> Подтвердить</>}
                            </button>
                            <button onClick={() => setPasswordStep('input')} className="btn btn-light fw-bold px-4">Назад</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ВЫБОР ТЕМЫ */}
                <div className="border-bottom pb-4">
                  <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-3 d-block">Тема оформления</label>
                  <div className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                    {[
                      { id: 'light', name: 'Классика', colors: ['#ffffff', '#f8f9fa', '#ef4444'] },
                      { id: 'dark', name: 'Тёмная', colors: ['#1a1a2e', '#16213e', '#ef4444'] },
                      { id: 'autumn', name: 'Осенняя', colors: ['#1a1410', '#241c14', '#e07b39'] },
                      { id: 'ocean', name: 'Морская', colors: ['#0f1923', '#162231', '#38bdf8'] },
                      { id: 'lavender', name: 'Лавандовая', colors: ['#18131f', '#201a2a', '#a78bfa'] },
                      { id: 'forest', name: 'Лесная', colors: ['#111a14', '#19251d', '#4ade80'] },
                      { id: 'cosmic', name: 'Космическая', colors: ['#0a0a1a', '#12102a', '#c084fc'] },
                    ].map(t => {
                      const isActive = currentTheme === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => applyTheme(t.id)}
                          className={`btn p-3 rounded-3 text-start border ${isActive ? 'border-danger border-2' : 'border'}`}
                          style={{ backgroundColor: t.colors[1] }}
                        >
                          <div className="d-flex gap-1 mb-2">
                            {t.colors.map((c, i) => (
                              <div key={i} className="rounded-circle" style={{ width: '14px', height: '14px', backgroundColor: c, border: '1px solid rgba(128,128,128,0.2)' }} />
                            ))}
                          </div>
                          <span className="fw-bold small" style={{ color: t.colors[2] }}>{t.name}</span>
                          {isActive && <span className="ms-1" style={{ color: t.colors[2] }}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-top pt-5 mt-4">
                  <h4 className="text-danger fw-bold mb-3 d-flex align-items-center gap-2"><AlertTriangle size={20}/> Опасная зона</h4>
                  <p className="text-body-secondary small mb-4">Удаление аккаунта приведет к безвозвратной потере всех ваших данных, включая бронирования и избранное. Это действие нельзя отменить.</p>
                  
                  {showDeleteConfirm ? (
                    <div className="bg-danger bg-opacity-10 p-4 rounded-3 border border-danger border-opacity-25 animate-fade-in">
                      <p className="fw-bold text-danger mb-3">Вы уверены, что хотите удалить аккаунт?</p>
                      <div className="d-flex gap-3">
                        <button onClick={handleDeleteAccount} className="btn btn-danger fw-bold px-4">Да, удалить навсегда</button>
                        <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-light fw-bold px-4">Отмена</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-outline-danger fw-bold px-4 d-flex align-items-center gap-2">
                      <Trash2 size={18} /> Удалить аккаунт
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* ВКЛАДКА: ИЗБРАННОЕ */}
            {activeTab === 'favorites' && (
              <div>
                <h2 className="display-6 fw-black italic text-uppercase tracking-tighter mb-4 text-body-emphasis">Сохраненные места</h2>
                {favoriteVenues.length === 0 ? (
                  <div className="text-center py-5">
                    <Heart size={64} className="text-secondary opacity-25 mb-4 mx-auto" />
                    <h3 className="h4 fw-bold text-body-emphasis">Пока тут пусто</h3>
                    <p className="text-body-secondary">Вы еще не добавили ни одного заведения в избранное.</p>
                  </div>
                ) : (
                  <div className="row g-4">
                    {favoriteVenues.map((venue, index) => (
                      <div key={venue.id} className="col-md-6">
                        <VenueCard venue={venue} isFavorite={true} onToggleFavorite={removeFavorite} index={index} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ВКЛАДКА: БРОНИ */}
            {activeTab === 'bookings' && (
              <div>
                <h2 className="display-6 fw-black italic text-uppercase tracking-tighter mb-4 text-body-emphasis">Мои бронирования</h2>
                
                <div className="d-flex gap-2 mb-4">
                  <button onClick={() => setBookingSubTab('active')} className={`btn rounded-pill px-4 py-2 small fw-bold ${bookingSubTab === 'active' ? 'bg-danger text-white' : 'bg-body-tertiary text-body-secondary'}`}>
                    <Filter size={14} className="me-1" /> Активные
                  </button>
                  <button onClick={() => setBookingSubTab('history')} className={`btn rounded-pill px-4 py-2 small fw-bold ${bookingSubTab === 'history' ? 'bg-danger text-white' : 'bg-body-tertiary text-body-secondary'}`}>
                    <History size={14} className="me-1" /> История
                  </button>
                </div>

                {bookingsLoading ? (
                  <div className="text-center py-5"><div className="spinner-border text-danger"></div></div>
                ) : (() => {
                  const filtered = bookingSubTab === 'active' 
                    ? bookings.filter(b => b.status === 'active')
                    : bookings;
                  
                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-5">
                        <CalendarClock size={64} className="text-secondary opacity-25 mb-4 mx-auto" />
                        <h3 className="h4 fw-bold text-body-emphasis">
                          {bookingSubTab === 'active' ? 'Нет активных бронирований' : 'История пуста'}
                        </h3>
                        <p className="text-body-secondary">
                          {bookingSubTab === 'active' ? 'Все ваши бронирования отменены или ещё нет броней.' : 'У вас пока нет ни одного бронирования.'}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="d-grid gap-3">
                      {filtered.map((booking) => (
                        <div key={booking.id} className={`card rounded-4 border-0 shadow-sm overflow-hidden ${booking.status === 'cancelled' ? 'opacity-60' : ''}`}>
                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <h5 className="fw-bold text-body-emphasis mb-1">{booking.venue_name}</h5>
                                <span className={`badge rounded-pill fw-bold ${booking.status === 'active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                  {booking.status === 'active' ? 'Активно' : 'Отменено'}
                                </span>
                              </div>
                              {booking.status === 'active' && (
                                <button 
                                  onClick={() => openCancelModal(booking.id)} 
                                  className="btn btn-sm btn-outline-danger fw-bold px-3 d-flex align-items-center gap-1"
                                >
                                  <X size={14} /> Отменить
                                </button>
                              )}
                            </div>
                            <div className="row g-3 small">
                              <div className="col-sm-6 d-flex align-items-center gap-2 text-body-secondary">
                                <Clock size={16} className="text-danger" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="col-sm-6 d-flex align-items-center gap-2 text-body-secondary">
                                <Users size={16} className="text-danger" />
                                <span>{booking.guests} {booking.guests === '1' ? 'гость' : booking.guests === '8+' ? 'гостей' : parseInt(booking.guests) < 5 ? 'гостя' : 'гостей'}</span>
                              </div>
                              <div className="col-sm-6 d-flex align-items-center gap-2 text-body-secondary">
                                <Phone size={16} className="text-danger" />
                                <span>{booking.phone}</span>
                              </div>
                              {booking.message && (
                                <div className="col-12 text-body-secondary fst-italic">
                                  «{booking.message}»
                                </div>
                              )}
                              {booking.cancel_reason && (
                                <div className="col-12">
                                  <span className="text-danger fw-bold">Причина отмены: </span>
                                  <span className="text-body-secondary">{booking.cancel_reason}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* МОДАЛКА ОТМЕНЫ БРОНИРОВАНИЯ */}
            {showCancelModal && (
              <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowCancelModal(false)}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-body" 
                  style={{ maxWidth: '480px', width: '90%' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold text-body-emphasis mb-0">Отмена бронирования</h4>
                    <button onClick={() => setShowCancelModal(false)} className="btn btn-sm btn-light rounded-circle p-2"><X size={16} /></button>
                  </div>
                  
                  <p className="text-body-secondary mb-4">Укажите причину отмены (необязательно):</p>
                  
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {CANCEL_REASONS.map((reason) => (
                      <button
                        key={reason}
                        onClick={() => {
                          setSelectedReasonTemplate(reason);
                          if (reason !== 'Другое') setCancelReason('');
                        }}
                        className={`btn rounded-pill px-3 py-2 small fw-bold ${
                          selectedReasonTemplate === reason 
                            ? 'bg-danger text-white' 
                            : 'bg-body-tertiary text-body-secondary'
                        }`}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>

                  {selectedReasonTemplate === 'Другое' && (
                    <textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="form-control rounded-3 bg-body-tertiary text-body border-0 py-3 shadow-none fw-medium mb-3"
                      style={{ minHeight: '80px' }}
                      placeholder="Напишите свою причину..."
                    />
                  )}

                  <div className="d-flex gap-3 mt-4">
                    <button 
                      onClick={confirmCancel}
                      disabled={cancellingId !== null}
                      className="btn btn-danger fw-bold px-4 flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    >
                      {cancellingId ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <>Да, отменить</>
                      )}
                    </button>
                    <button 
                      onClick={() => setShowCancelModal(false)} 
                      className="btn btn-light fw-bold px-4"
                    >
                      Нет, оставить
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

          </motion.div>
        </div>

      </div>
      <style>{`
        .fw-black { font-weight: 900; }
        .hover-bg-light:hover { background-color: var(--bs-secondary-bg) !important; }
        .rotate-180 { transform: rotate(180deg); }
        .transition-transform { transition: transform 0.3s ease; }
        .z-3 { z-index: 1050; } 
        .custom-scrollbar { overflow-y: auto; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--bs-secondary-color); border-radius: 10px; opacity: 0.5; }
        .letter-spacing-lg { letter-spacing: 0.5em; }
      `}</style>
    </div>
  );
};
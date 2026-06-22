import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MapPin, ChevronLeft, ChevronRight, ChevronDown, CreditCard, Clock, Instagram, Send, X, ExternalLink, ImagePlus, Trash2, LogIn, Check } from 'lucide-react';
import { venues } from '../data';
import { BookingForm } from '../components/BookingForm';
import { useLang } from '../i18n/LanguageContext';

interface Review {
  id: number;
  rating: number;
  text: string;
  photos: string[] | null;
  venue_id: string;
  branch_id: string | null;
  created_at: string;
  user_name: string;
  user_avatar: string | null;
  user_id: number;
}

export const VenueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const venue = venues.find(v => v.id === id);
  const { t, tv } = useLang();

  const [activeBranchId, setActiveBranchId] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewPhotos, setReviewPhotos] = useState<string[]>([]);
  const [reviewFiles, setReviewFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const branchDropdownRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem('token');
  const currentUserId = token ? JSON.parse(atob(token.split('.')[1])).sub : null;

  useEffect(() => {
    if (venue && venue.branches.length > 0) {
      const branchParam = searchParams.get('branch');
      const targetBranch = branchParam
        ? venue.branches.find(b => b.id === branchParam)
        : null;
      setActiveBranchId(targetBranch ? targetBranch.id : venue.branches[0].id);
      document.title = `${venue.name}`;
    }
  }, [venue, searchParams]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/reviews/${id}`)
        .then(res => res.json())
        .then(data => { setReviews(data); setReviewsLoading(false); })
        .catch(() => setReviewsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (activeImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActiveImage(null); }
      if (lightboxPhotos.length > 0) {
        if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev > 0 ? prev - 1 : lightboxPhotos.length - 1));
        if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev < lightboxPhotos.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhotos.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (branchDropdownRef.current && !branchDropdownRef.current.contains(e.target as Node)) {
        setBranchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!venue) return <div className="container py-5 my-5 text-center"><h1 className="display-4 fw-bold">{t('venue.notFound')}</h1></div>;

  const activeBranch = venue.branches.find(b => b.id === activeBranchId) || venue.branches[0];

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (reviewPhotos.length + files.length > 3) {
      setReviewError(t('review.maxPhotos'));
      return;
    }
    files.forEach(file => {
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) return;
      if (file.size > 5 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = () => {
        setReviewPhotos(prev => [...prev, reader.result as string]);
        setReviewFiles(prev => [...prev, file]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeReviewPhoto = (index: number) => {
    setReviewPhotos(prev => prev.filter((_, i) => i !== index));
    setReviewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim() || !token) return;
    setIsSubmitting(true);
    setReviewError('');

    try {
      const res = await fetch('http://localhost:8000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ venue_id: id, branch_id: activeBranch.id, rating: newReviewRating, text: newReviewText })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Ошибка');

      if (reviewFiles.length > 0) {
        const formData = new FormData();
        reviewFiles.forEach(f => formData.append('files', f));
        const photoRes = await fetch(`http://localhost:8000/api/reviews/photos?review_id=${data.id}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
        if (photoRes.ok) {
          const photoData = await photoRes.json();
          data.photos = photoData.photos;
        }
      }

      setReviews([data, ...reviews]);
      setNewReviewText('');
      setNewReviewRating(5);
      setReviewPhotos([]);
      setReviewFiles([]);
      setReviewSuccess(t('review.success'));
      setTimeout(() => setReviewSuccess(''), 3000);
    } catch (err: any) {
      setReviewError(err.message || 'Ошибка');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:8000/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== reviewId));
        setDeleteReviewId(null);
      }
    } catch (err) { console.error(err); }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const mins = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);
      if (mins < 1) return t('review.justNow');
      if (mins < 60) return `${mins} ${t('review.minutesAgo')}`;
      if (hours < 24) return `${hours} ${t('review.hoursAgo')}`;
      if (days < 30) return `${days} ${t('review.daysAgo')}`;
      return date.toLocaleDateString();
    } catch { return dateStr; }
  };

  const openLightbox = (photos: string[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
    setActiveImage(photos[index]);
  };

  const venueType = t(`venue.${venue.type}`);

  const filteredReviews = reviews.filter(r => r.branch_id === activeBranch.id);

  const avgRating = filteredReviews.length > 0
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : null;

  return (
    <div className="pt-5">
      <section className="position-relative w-100" style={{ height: '50vh' }}>
        <img src={venue.image} alt={venue.name} className="w-100 h-100 object-fit-cover" />
        <div className="position-absolute inset-0 bg-black opacity-25" />
      </section>

      <button
        onClick={() => navigate(-1)}
        className="position-fixed m-4 p-3 bg-body border rounded-circle shadow-sm z-2"
        style={{ top: '70px', left: '0' }}
      >
        <ChevronLeft size={24} className="text-body" />
      </button>

      <section className="container mt-n5 position-relative z-1 mb-5">
        <div className="card border-0 rounded-4 p-4 p-md-5 shadow-lg mx-auto bg-body" style={{ maxWidth: '1000px', marginTop: '-120px' }}>

          <div className="row mb-5">
            <div className="col-lg-8">
              <div className="small fw-bold text-danger text-uppercase tracking-widest mb-3">
                {venueType}
              </div>
              <h1 className="display-4 fw-black mb-4 text-body-emphasis tracking-tighter">{tv(`venue.name.${venue.id}`, venue.name)}</h1>

              <div className="d-flex flex-wrap gap-3 mb-4">
                <div className="d-flex align-items-center gap-2 bg-body-tertiary px-3 py-2 rounded-pill">
                  <Star size={18} className="text-warning fill-warning" />
                  <span className="fw-black text-body-emphasis">{avgRating || venue.rating}</span>
                  <span className="text-body-secondary small">({filteredReviews.length})</span>
                </div>
                <div className="d-flex align-items-center gap-2 bg-body-tertiary px-3 py-2 rounded-pill fw-bold">
                  <CreditCard size={18} className="text-body-secondary" />
                  <span className="text-body-emphasis">{'$'.repeat(venue.priceLevel)}</span>
                </div>
              </div>

              {venue.branches.length > 1 && (
                <div className="mb-4" ref={branchDropdownRef} style={{ position: 'relative' }}>
                  <span className="small fw-bold text-body-secondary text-uppercase tracking-widest d-block mb-2">{t('venue.selectAddress')}</span>
                  <button
                    onClick={() => setBranchDropdownOpen(prev => !prev)}
                    className="d-flex align-items-center justify-content-between gap-3 w-100 bg-body-tertiary border-0 rounded-3 px-4 py-3 text-start shadow-sm branch-dropdown-trigger"
                    style={{ transition: 'box-shadow 0.2s ease, background-color 0.2s ease' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-danger bg-opacity-10 p-2 rounded-2 flex-shrink-0">
                        <MapPin size={18} className="text-danger" />
                      </div>
                      <div>
                        <span className="small fw-bold text-body-secondary text-uppercase tracking-widest d-block" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>{t('venue.address')}</span>
                        <span className="fw-bold text-body-emphasis">{tv(`venue.${venue.id}.addr${venue.branches.indexOf(activeBranch)}`, activeBranch.address)}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: branchDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} className="text-body-secondary" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {branchDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="position-absolute start-0 end-0 mt-2 border rounded-4 shadow-lg overflow-hidden branch-dropdown"
                        style={{ zIndex: 50 }}
                      >
                        <div className="py-2">
                          {venue.branches.map((branch, bIdx) => {
                            const isActive = activeBranchId === branch.id;
                            return (
                              <button
                                key={branch.id}
                                onClick={() => { setActiveBranchId(branch.id); setBranchDropdownOpen(false); }}
                                className="d-flex align-items-center gap-3 w-100 border-0 text-start px-4 py-3 branch-dropdown-item"
                                style={{
                                  transition: 'background-color 0.15s ease',
                                  backgroundColor: isActive ? 'var(--bs-danger-bg-subtle, rgba(220,53,69,0.08))' : 'transparent',
                                }}
                              >
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: isActive ? 'var(--bs-danger, #dc3545)' : 'var(--bs-body-tertiary)',
                                    transition: 'background-color 0.2s ease',
                                  }}
                                >
                                  {isActive ? (
                                    <Check size={16} className="text-white" />
                                  ) : (
                                    <MapPin size={14} className="text-body-secondary" />
                                  )}
                                </div>
                                <div className="flex-grow-1 min-width-0">
                                  <span className={`d-block fw-bold small ${isActive ? 'text-danger' : 'text-body-emphasis'}`}>
                                    {tv(`venue.${venue.id}.addr${bIdx}`, branch.address)}
                                  </span>
                                  {branch.workingHours && (
                                    <span className="d-block text-body-secondary" style={{ fontSize: '12px' }}>
                                      {branch.workingHours.split('\n')[0]}
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <a href="#booking" className="btn btn-primary-custom shadow-lg">{t('venue.book')}</a>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeBranchId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="row g-5"
            >
              <div className="col-lg-8">
                <h3 className="h4 fw-bold mb-4 italic text-decoration-underline text-danger underline-offset-8 text-body-emphasis">{t('venue.description')}</h3>
                <p className="text-body-secondary fs-5 lh-lg mb-5">{tv(`venue.${venue.id}.desc`, venue.description)}</p>

                <div className="row g-4 py-4 border-top border-bottom border-light align-items-center">
                  <div className="col-md-7">
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <div className="bg-danger bg-opacity-10 p-3 rounded-4 flex-shrink-0">
                        <Clock size={24} className="text-danger" />
                      </div>
                      <div>
                        <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-1">{t('venue.workHours')}</h4>
                        <p className="text-body-secondary small fw-medium mb-0" style={{ whiteSpace: 'pre-line' }}>{tv(`venue.${venue.id}.wh${venue.branches.indexOf(activeBranch)}`, activeBranch.workingHours)}</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="bg-danger bg-opacity-10 p-3 rounded-4 flex-shrink-0">
                        <MapPin size={24} className="text-danger" />
                      </div>
                      <div className="w-100">
                        <h4 className="fw-bold text-body text-uppercase small tracking-widest mb-1">{t('venue.address')}</h4>
                        <p className="text-body-secondary small fw-medium mb-0">{tv(`venue.${venue.id}.addr${venue.branches.indexOf(activeBranch)}`, activeBranch.address)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 h-100">
                    <a
                      href={`https://yandex.by/maps/157/minsk/search/${encodeURIComponent('Минск ' + activeBranch.address)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="d-block position-relative rounded-4 overflow-hidden shadow-sm border bg-body-tertiary text-decoration-none group-map"
                      style={{ minHeight: '180px', height: '100%' }}
                    >
                      <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" alt="Карта" className="position-absolute w-100 h-100 object-fit-cover opacity-50 transition-transform map-bg" />
                      <div className="position-absolute top-50 start-50 translate-middle text-danger map-pin transition-transform">
                        <MapPin size={40} className="drop-shadow-md" style={{ fill: '#fee2e2' }} />
                      </div>
                      <div className="position-absolute inset-0 bg-dark bg-opacity-50 d-flex flex-column align-items-center justify-content-center opacity-0 transition-opacity map-overlay">
                        <div className="bg-white text-dark fw-bold rounded-pill px-4 py-2 d-flex align-items-center text-center gap-2 shadow-lg">
                          <ExternalLink size={16} /> {t('venue.route')}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="bg-body-tertiary rounded-4 p-4 h-100">
                  <h3 className="fw-black italic text-uppercase h5 mb-4 text-body-emphasis">{t('venue.features')}</h3>
                  <ul className="list-unstyled mb-4">
                    {activeBranch.features.map((item, idx) => (
                      <li key={item} className="d-flex align-items-center gap-3 mb-3 fw-bold text-body-secondary small">
                        <div className="bg-danger rounded-circle" style={{ width: '6px', height: '6px' }} />
                        {tv(`venue.${venue.id}.f${idx}`, item)}
                      </li>
                    ))}
                  </ul>

                  <a href={venue.instagramUrl} target="_blank" rel="noopener noreferrer" className="card p-3 border-0 rounded-4 d-flex flex-row align-items-center justify-content-between text-decoration-none bg-body shadow-sm mb-4">
                    <div className="small fw-bold text-uppercase tracking-widest text-body-secondary">Instagram</div>
                    <Instagram size={18} className="text-danger" />
                  </a>

                  <div className="pt-3 border-top">
                    <h4 className="fw-black italic text-uppercase h6 mb-3 text-body-emphasis">{t('venue.interior')}</h4>
                    <div className="row g-2">
                      {activeBranch.gallery.map((img, idx) => (
                        <div key={idx} className="col-6">
                          <div onClick={() => { setLightboxPhotos(activeBranch.gallery); setLightboxIndex(idx); setActiveImage(img); }} className="ratio ratio-4x3 overflow-hidden rounded-3 border cursor-zoom-in">
                            <img src={img} alt="Интерьер" className="object-fit-cover gallery-thumb" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="booking" className="container pb-5" style={{ maxWidth: '1000px' }}>
        <BookingForm venueName={`${tv(`venue.name.${venue.id}`, venue.name)} (${tv(`venue.${venue.id}.addr${venue.branches.indexOf(activeBranch)}`, activeBranch.address)})`} venueId={venue.id} />
      </section>

      <section className="container pb-5 mb-5" style={{ maxWidth: '1000px' }}>
        <div className="card bg-body-tertiary border-0 rounded-4 p-4 p-md-5">
          <h3 className="display-6 fw-black italic text-uppercase tracking-tighter mb-5 text-body-emphasis">{t('venue.reviews')}</h3>

          {token ? (
            <form onSubmit={handleReviewSubmit} className="mb-5 p-4 bg-body rounded-4 border">
              {reviewError && <div className="alert alert-danger small fw-bold text-center border-0 rounded-3 mb-3">{reviewError}</div>}
              {reviewSuccess && <div className="alert alert-success small fw-bold text-center border-0 rounded-3 mb-3">{reviewSuccess}</div>}

              <div className="mb-3">
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2 d-block">{t('review.yourRating')}</label>
                <div className="d-flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => {
                    const isActive = star <= (hoverRating || newReviewRating);
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="btn p-1 border-0 bg-transparent star-btn"
                      >
                        <Star
                          size={32}
                          strokeWidth={isActive ? 0 : 1.5}
                          fill={isActive ? '#facc15' : 'none'}
                          className={`star-icon ${isActive ? 'star-active' : 'star-inactive'}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-3">
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2 d-block">{t('review.yourReview')}</label>
                <textarea
                  value={newReviewText}
                  onChange={e => setNewReviewText(e.target.value)}
                  className="form-control rounded-3 bg-body-tertiary border-0 py-3 px-4 shadow-none fw-medium"
                  style={{ minHeight: '100px' }}
                  placeholder={t('review.placeholder')}
                  maxLength={1000}
                />
              </div>

              <div className="mb-3">
                <label className="text-body-secondary small fw-bold text-uppercase tracking-widest mb-2 d-block">{t('review.photos')} ({reviewPhotos.length}/3)</label>
                <div className="d-flex gap-2 flex-wrap">
                  {reviewPhotos.map((photo, idx) => (
                    <div key={idx} className="position-relative" style={{ width: '80px', height: '80px' }}>
                      <img src={photo} alt="" className="w-100 h-100 object-fit-cover rounded-3 border" />
                      <button
                        type="button"
                        onClick={() => removeReviewPhoto(idx)}
                        className="btn btn-sm btn-danger rounded-circle position-absolute d-flex align-items-center justify-content-center"
                        style={{ top: '-6px', right: '-6px', width: '22px', height: '22px' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {reviewPhotos.length < 3 && (
                    <label className="d-flex align-items-center justify-content-center rounded-3 border border-dashed cursor-pointer" style={{ width: '80px', height: '80px' }}>
                      <ImagePlus size={24} className="text-body-secondary" />
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={handlePhotoSelect} className="d-none" />
                    </label>
                  )}
                </div>
              </div>

              <button type="submit" disabled={isSubmitting || !newReviewText.trim()} className="btn btn-danger fw-bold px-4 d-flex align-items-center gap-2">
                {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : <><Send size={16} /> {t('review.submit')}</>}
              </button>
            </form>
          ) : (
            <div className="text-center mb-5 p-4 bg-body rounded-4 border">
              <p className="text-body-secondary mb-3">{t('review.loginToLeave')}</p>
              <button onClick={() => navigate('/login')} className="btn btn-danger fw-bold px-4 d-flex align-items-center gap-2 mx-auto">
                <LogIn size={16} /> {t('review.login')}
              </button>
            </div>
          )}

          {reviewsLoading ? (
            <div className="text-center py-4"><div className="spinner-border text-danger"></div></div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-5">
              <Star size={64} className="text-secondary opacity-25 mb-4 mx-auto" />
              <h4 className="fw-bold text-body-emphasis">{t('review.noReviews')}</h4>
              <p className="text-body-secondary">{t('review.beFirst')}</p>
            </div>
          ) : (
            <div className="d-grid gap-3">
              {filteredReviews.map(review => (
                <div key={review.id} className="bg-body rounded-4 p-4 border">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      {review.user_avatar ? (
                        <img src={review.user_avatar} alt="" className="rounded-circle" style={{ width: '44px', height: '44px', objectFit: 'cover' }} />
                      ) : (
                        <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center fw-bold" style={{ width: '44px', height: '44px' }}>
                          {review.user_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="fw-bold text-body-emphasis">{review.user_name}</div>
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex gap-1">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} size={14} fill={s <= review.rating ? '#facc15' : 'none'} strokeWidth={s <= review.rating ? 0 : 1.5} className={s <= review.rating ? 'text-warning' : 'text-body-secondary'} />
                            ))}
                          </div>
                          <span className="text-body-secondary small">{formatDate(review.created_at)}</span>
                        </div>
                        {review.branch_id && venue && (() => {
                          const branchIdx = venue.branches.findIndex(b => b.id === review.branch_id);
                          const branch = branchIdx >= 0 ? venue.branches[branchIdx] : null;
                          return branch ? (
                            <div className="d-flex align-items-center gap-1 mt-1">
                              <MapPin size={12} className="text-danger" />
                              <span className="text-body-secondary small">{tv(`venue.${venue.id}.addr${branchIdx}`, branch.address)}</span>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    {String(currentUserId) === String(review.user_id) && (
                      <div className="position-relative">
                        <button
                          onClick={() => setDeleteReviewId(deleteReviewId === review.id ? null : review.id)}
                          className="btn btn-sm bg-body-tertiary rounded-circle border-0 p-0 d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Trash2 size={14} className="text-body-secondary" />
                        </button>
                        {deleteReviewId === review.id && (
                          <div className="position-absolute end-0 mt-1 bg-body-tertiary border rounded-3 shadow-lg p-3" style={{ zIndex: 100, minWidth: '160px' }}>
                            <p className="small fw-bold text-body-emphasis mb-2">{t('review.confirmDelete')}</p>
                            <div className="d-flex gap-2">
                              <button onClick={() => handleDeleteReview(review.id)} className="btn btn-sm btn-danger fw-bold flex-grow-1">{t('review.delete')}</button>
                              <button onClick={() => setDeleteReviewId(null)} className="btn btn-sm bg-body text-body-secondary fw-bold flex-grow-1 border">{t('review.cancel')}</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-body-secondary mb-3">{review.text}</p>
                  {review.photos && review.photos.length > 0 && (
                    <div className="d-flex gap-2 flex-wrap">
                      {review.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          onClick={() => openLightbox(review.photos!, idx)}
                          className="overflow-hidden rounded-3 cursor-zoom-in"
                          style={{ width: '80px', height: '80px' }}
                        >
                          <img src={photo} alt="" className="w-100 h-100 object-fit-cover gallery-thumb" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activeImage && lightboxPhotos.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setActiveImage(null); setLightboxPhotos([]); }} className="lightbox-overlay">
            <button className="lightbox-close-btn"><X size={32} className="text-white" /></button>
            {lightboxPhotos.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev > 0 ? prev - 1 : lightboxPhotos.length - 1)); setActiveImage(lightboxPhotos[(lightboxIndex > 0 ? lightboxIndex - 1 : lightboxPhotos.length - 1)]); }} className="position-absolute start-0 top-50 translate-middle-y ms-4 btn btn-light rounded-circle p-3" style={{ zIndex: 10001 }}>
                  <ChevronLeft size={24} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); const next = (lightboxIndex < lightboxPhotos.length - 1 ? lightboxIndex + 1 : 0); setLightboxIndex(next); setActiveImage(lightboxPhotos[next]); }} className="position-absolute end-0 top-50 translate-middle-y me-4 btn btn-light rounded-circle p-3" style={{ zIndex: 10001 }}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <motion.img initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} src={activeImage} className="lightbox-image" onClick={(e) => e.stopPropagation()} />
            {lightboxPhotos.length > 1 && (
              <div className="position-absolute bottom-0 mb-4 d-flex gap-2" onClick={(e) => e.stopPropagation()}>
                {lightboxPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setLightboxIndex(idx); setActiveImage(lightboxPhotos[idx]); }}
                    className={`rounded-circle border-0 ${idx === lightboxIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                    style={{ width: '10px', height: '10px' }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .z-1 { z-index: 1; }
        .z-2 { z-index: 2; }
        .fw-black { font-weight: 900; }
        .underline-offset-8 { text-underline-offset: 8px; }
        .cursor-zoom-in { cursor: zoom-in; }
        .gallery-thumb { width: 100%; height: 100%; transition: transform 0.3s ease, filter 0.3s ease; }
        .gallery-thumb:hover { transform: scale(1.08); filter: brightness(0.9); }
        .lightbox-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; cursor: zoom-out; backdrop-filter: blur(5px); }
        .lightbox-image { max-width: 90%; max-height: 85vh; object-fit: contain; border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); cursor: default; }
        .lightbox-close-btn { position: absolute; top: 20px; right: 20px; background: transparent; border: 0; padding: 10px; cursor: pointer; transition: transform 0.2s ease; z-index: 10001; }
        .lightbox-close-btn:hover { transform: scale(1.1); }
        .group-map .map-bg { transition: transform 0.7s ease; filter: grayscale(100%); }
        .group-map:hover .map-bg { transform: scale(1.1); filter: grayscale(0%); }
        .group-map .map-pin { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .group-map:hover .map-pin { transform: translate(-50%, -80%) scale(1.2) !important; }
        .group-map .map-overlay { opacity: 0; transition: opacity 0.3s ease; }
        .group-map:hover .map-overlay { opacity: 1; }
        .drop-shadow-md { filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3)); }
        .hover-danger-light:hover { background-color: #fee2e2 !important; color: #ef4444 !important; }
        .border-dashed { border-style: dashed !important; border-width: 2px !important; }
        .star-btn { transition: transform 0.15s ease; }
        .star-btn:hover { transform: scale(1.2); }
        .star-btn:active { transform: scale(0.9); }
        .star-icon { transition: fill 0.2s ease, stroke 0.2s ease, transform 0.2s ease, filter 0.2s ease; }
        .star-active { filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.6)); }
        .star-inactive { filter: none; }
        .branch-dropdown-trigger:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        [data-bs-theme="dark"] .branch-dropdown-trigger:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
        .branch-dropdown-item:hover { background-color: var(--bs-body-tertiary) !important; }
        .branch-dropdown-item:hover > div:first-child:not([style*="background-color: var(--bs-danger"]) { background-color: var(--bs-danger) !important; }
        .branch-dropdown-item:hover > div:first-child:not([style*="background-color: var(--bs-danger"]) svg { color: white !important; }
      `}</style>
    </div>
  );
};
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Utensils, Coffee, Wine, ChefHat } from 'lucide-react';
import { venues, Venue } from '../data';
import { VenueCard } from '../components/VenueCard';
import { useLang } from '../i18n/LanguageContext';
import { translations, Lang } from '../i18n/translations';
import { API_BASE } from '../config';


export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const navigate = useNavigate();
  const { t } = useLang();

  const [filter, setFilter] = useState<'all' | 'restaurant' | 'coffee' | 'bar' | 'belarusian'>(initialFilter as any);
  const [search, setSearch] = useState('');

  const [favorites, setFavorites] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(4);

  useEffect(() => {
    document.title = t('nav.catalog');

    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/favorites`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setFavorites(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const filterFromUrl = searchParams.get('filter');
    if (filterFromUrl) setFilter(filterFromUrl as any);
  }, [searchParams]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter as any);
    setSearchParams(newFilter === 'all' ? {} : { filter: newFilter });
  };

  const toggleFavorite = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const isNowFavorite = !favorites.includes(id);
    setFavorites(prev => isNowFavorite ? [...prev, id] : prev.filter(fid => fid !== id));

    try {
      const res = await fetch(`${API_BASE}/api/favorites/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ venue_id: id })
      });

      if (!res.ok) {
        setFavorites(prev => !isNowFavorite ? [...prev, id] : prev.filter(fid => fid !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredVenues = useMemo(() => {
    const searchLower = search.toLowerCase();
    return venues.filter(v => {
      const nameKey = `venue.name.${v.id}`;
      const nameEntry = translations[nameKey];
      const allNames = nameEntry
        ? (Object.values(nameEntry) as string[]).map(n => n.toLowerCase())
        : [];
      allNames.push(v.name.toLowerCase());
      const matchSearch = !search || allNames.some(n => n.includes(searchLower));
      const matchPrice = v.priceLevel <= maxPrice;
      if (filter === 'belarusian') return ['lidbeer', 'mesto-pro-edu', 'vasilki'].includes(v.id) && matchSearch && matchPrice;
      const matchType = filter === 'all' || v.type === filter;
      return matchType && matchSearch && matchPrice;
    });
  }, [filter, search, maxPrice]);

  const FILTER_ITEMS = [
    { id: 'all', label: t('catalog.filterAll'), icon: Filter },
    { id: 'belarusian', label: t('catalog.filterBelarusian'), icon: ChefHat },
    { id: 'restaurant', label: t('catalog.filterRestaurant'), icon: Utensils },
    { id: 'coffee', label: t('catalog.filterCoffee'), icon: Coffee },
    { id: 'bar', label: t('catalog.filterBar'), icon: Wine },
  ];

  return (
    <motion.div className="container py-5 mt-5 pt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      <div className="row align-items-end justify-content-between g-4 mb-4 pb-4 border-bottom">
        <div className="col-lg-3"><h1 className="display-5 fw-black tracking-tighter mb-3 text-body-emphasis text-uppercase italic">{t('catalog.title')}</h1></div>
        <div className="col-lg-9">
          <div className="d-flex flex-wrap gap-3 justify-content-lg-end align-items-center">
            <div className="bg-body-tertiary px-4 py-2 rounded-pill d-flex align-items-center gap-3">
              <span className="small fw-bold text-body-secondary text-nowrap">{t('catalog.priceRange')}</span>
              <div className="fw-bold text-danger text-nowrap" style={{ width: '40px' }}>{'$'.repeat(maxPrice)}</div>
              <input type="range" min={1} max={4} step={1} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="price-slider" style={{ '--progress': `${((maxPrice - 1) / 3) * 100}%` } as React.CSSProperties} />
            </div>
            <div className="position-relative">
              <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-body-secondary" size={18} />
              <input type="text" placeholder={t('catalog.search')} value={search} onChange={(e) => setSearch(e.target.value)} className="form-control rounded-pill ps-5 border-0 bg-body-tertiary text-body py-2 px-4 shadow-none" style={{ width: '200px' }} />
            </div>
            <div className="d-inline-flex bg-body-tertiary rounded-pill p-1 flex-wrap">
              {FILTER_ITEMS.map((item) => (
                <button key={item.id} onClick={() => handleFilterChange(item.id)} className={`btn rounded-pill px-3 py-1 d-flex align-items-center gap-2 border-0 small fw-bold transition-all ${filter === item.id ? 'bg-body shadow-sm text-danger' : 'text-body-secondary'}`}>
                  <item.icon size={14} /><span className="d-none d-xl-inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filter === 'belarusian' && (
          <motion.div initial={{ opacity: 0, height: 0, y: -20 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -20 }} className="overflow-hidden mb-5">
            <div className="bg-body-tertiary rounded-4 p-4 p-md-5 border-start border-danger border-5 shadow-sm">
              <div className="d-flex align-items-center gap-3 mb-3">
                <ChefHat className="text-danger" size={32} />
                <h2 className="h2 fw-black text-body-emphasis mb-0 italic uppercase tracking-tighter">{t('catalog.belarusianCuisine')}</h2>
              </div>
              <p className="text-body-secondary fs-5 lh-lg mb-0" style={{ maxWidth: '800px' }}>
                {t('catalog.belarusianDesc')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="row g-4">
        <AnimatePresence mode="popLayout">
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue: Venue, index: number) => (
              <div key={venue.id} className="col-md-6 col-lg-4">
                <VenueCard venue={venue} isFavorite={favorites.includes(venue.id)} onToggleFavorite={toggleFavorite} index={index} />
              </div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-12 text-center py-5 my-5">
              <Search className="text-secondary opacity-25 mb-4" size={64} />
              <p className="text-body-secondary fs-5">{t('catalog.notFound')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        .fw-black { font-weight: 900; }
        .price-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100px;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(to right, #ef4444 0%, #ef4444 var(--progress, 100%), var(--bs-secondary-bg) var(--progress, 100%), var(--bs-secondary-bg) 100%);
          outline: none;
          cursor: pointer;
        }
        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 2.5px solid #ef4444;
          box-shadow: 0 2px 6px rgba(239,68,68,0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .price-slider::-webkit-slider-thumb:hover {
          transform: scale(1.25);
          box-shadow: 0 2px 10px rgba(239,68,68,0.5);
        }
        .price-slider::-webkit-slider-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 1px 6px rgba(239,68,68,0.4);
        }
        .price-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 2.5px solid #ef4444;
          box-shadow: 0 2px 6px rgba(239,68,68,0.35);
          cursor: grab;
        }
        .price-slider::-moz-range-track {
          height: 6px;
          border-radius: 999px;
          background: var(--bs-secondary-bg);
        }
        .price-slider::-moz-range-progress {
          height: 6px;
          border-radius: 999px;
          background: #ef4444;
        }
      `}</style>
    </motion.div>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Search, Filter, Wine ,Utensils, Coffee } from 'lucide-react';
import { venues, Venue } from '../data';
import { VenueCard } from '../components/VenueCard';

export const CatalogPage = () => {
  const [filter, setFilter] = useState<'all' | 'restaurant' | 'coffee' | 'bar'>('all');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(fid => fid !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      const matchType = filter === 'all' || v.type === filter;
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filter, search]);

  return (
    <div className="container py-5 mt-5 pt-5">
      <div className="row align-items-end justify-content-between g-4 mb-5 pb-4 border-bottom">
        <div className="col-lg-6">
          <h1 className="display-4 fw-black tracking-tighter mb-3 text-body-emphasis text-uppercase italic">Каталог</h1>
        </div>

        <div className="col-lg-6">
          <div className="d-flex flex-wrap gap-3 justify-content-lg-end align-items-center">
            <div className="position-relative">
              <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-body-secondary" size={18} />
              {/* bg-body-tertiary для инпута */}
              <input 
                type="text" placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="form-control rounded-pill ps-5 border-0 bg-body-tertiary text-body py-2 px-4 shadow-none"
                style={{ width: '260px' }}
              />
            </div>
            <div className="d-inline-flex bg-body-tertiary rounded-pill p-1">
              {[
                { id: 'all', label: 'Все', icon: Filter },
                { id: 'restaurant', label: 'Рестораны', icon: Utensils },
                { id: 'coffee', label: 'Кофе', icon: Coffee },
                { id: 'bar', label: 'Бары', icon: Wine }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id as any)}
                  className={`btn rounded-pill px-3 py-1 d-flex align-items-center gap-2 border-0 small fw-bold transition-all ${filter === item.id ? 'bg-body shadow-sm text-danger' : 'text-body-secondary'}`}
                >
                  <item.icon size={14} />
                  <span className="d-none d-sm-inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <AnimatePresence mode="popLayout">
          {filteredVenues.map((venue: Venue) => (
            <div key={venue.id} className="col-md-6 col-lg-4">
              <VenueCard venue={venue} isFavorite={favorites.includes(venue.id)} onToggleFavorite={toggleFavorite} />
            </div>
          ))}
        </AnimatePresence>
      </div>
      <style>{`.fw-black { font-weight: 900; }`}</style>
    </div>
  );
};
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Utensils, Coffee, Wine, ChefHat } from 'lucide-react';
import { venues, Venue } from '../data';
import { VenueCard } from '../components/VenueCard';

// Подсказываем TypeScript, что у нас есть глобальная переменная $ от jQuery
declare global {
  interface Window { $: any; }
}
const $ = window.$ || (window as any).jQuery;

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';

  const [filter, setFilter] = useState<'all' | 'restaurant' | 'coffee' | 'bar' | 'belarusian'>(initialFilter as any);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Состояние для цены и ссылка на DOM-элемент для jQuery ===
  const [maxPrice, setMaxPrice] = useState<number>(4);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Инициализация jQuery UI
  useEffect(() => {
    // Ждем, пока jQuery загрузится
    if ($ && sliderRef.current) {
      // Создаем виджет Slider из jQuery UI
      $(sliderRef.current).slider({
        range: "min",
        value: maxPrice,
        min: 1,
        max: 4,
        step: 1,
        // Событие jQuery: когда ползунок двигается, обновляем состояние React!
        slide: function (_event: any, ui: any) {
          setMaxPrice(ui.value);
        }
      });
    }

    // Очистка виджета при уходе со страницы (чтобы не было утечек памяти)
    return () => {
      if ($ && sliderRef.current) {
        try { $(sliderRef.current).slider("destroy"); } catch (e) {}
      }
    };
  }, []); // Пустой массив зависимостей = запускаем 1 раз при загрузке страницы

  // Остальные эффекты
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const filterFromUrl = searchParams.get('filter');
    if (filterFromUrl) setFilter(filterFromUrl as any);
  }, [searchParams]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter as any);
    setSearchParams(newFilter === 'all' ? {} : { filter: newFilter });
  };

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(fid => fid !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  // Обновленная фильтрация: теперь учитывает и jQuery UI Ползунок!
  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
      const matchPrice = v.priceLevel <= maxPrice; // Проверка по цене из ползунка
      
      if (filter === 'belarusian') {
        return ['lidbeer', 'mesto-pro-edu', 'vasilki'].includes(v.id) && matchSearch && matchPrice;
      }
      
      const matchType = filter === 'all' || v.type === filter;
      return matchType && matchSearch && matchPrice;
    });
  }, [filter, search, maxPrice]);

  return (
    <motion.div
      className="container py-5 mt-5 pt-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="row align-items-end justify-content-between g-4 mb-4 pb-4 border-bottom">
        <div className="col-lg-3">
          <h1 className="display-5 fw-black tracking-tighter mb-3 text-body-emphasis text-uppercase italic">Каталог</h1>
        </div>

        <div className="col-lg-9">
          <div className="d-flex flex-wrap gap-3 justify-content-lg-end align-items-center">
            
            {/* === ВНЕШНИЙ ВИД JQUERY UI ВИДЖЕТА === */}
            <div className="bg-body-tertiary px-4 py-2 rounded-pill d-flex align-items-center gap-3">
              <span className="small fw-bold text-body-secondary text-nowrap">Ценовой диапазон:</span>
              <div className="fw-bold text-danger text-nowrap" style={{ width: '40px' }}>
                {/* Отрисовка значков доллара */}
                {'$'.repeat(maxPrice)}
              </div>
              {/* Сюда jQuery UI встроит свой ползунок */}
              <div ref={sliderRef} style={{ width: '100px' }} className="my-1"></div>
            </div>

            <div className="position-relative">
              <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-body-secondary" size={18} />
              <input 
                type="text" placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="form-control rounded-pill ps-5 border-0 bg-body-tertiary text-body py-2 px-4 shadow-none"
                style={{ width: '200px' }}
              />
            </div>
            
            <div className="d-inline-flex bg-body-tertiary rounded-pill p-1 flex-wrap">
              {[
                { id: 'all', label: 'Все', icon: Filter },
                { id: 'belarusian', label: 'Белорусская', icon: ChefHat },
                { id: 'restaurant', label: 'Рестораны', icon: Utensils },
                { id: 'coffee', label: 'Кофе', icon: Coffee },
                { id: 'bar', label: 'Бары', icon: Wine }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFilterChange(item.id)}
                  className={`btn rounded-pill px-3 py-1 d-flex align-items-center gap-2 border-0 small fw-bold transition-all ${filter === item.id ? 'bg-body shadow-sm text-danger' : 'text-body-secondary'}`}
                >
                  <item.icon size={14} />
                  <span className="d-none d-xl-inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filter === 'belarusian' && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="overflow-hidden mb-5"
          >
            <div className="bg-body-tertiary rounded-4 p-4 p-md-5 border-start border-danger border-5 shadow-sm">
              <div className="d-flex align-items-center gap-3 mb-3">
                <ChefHat className="text-danger" size={32} />
                <h2 className="h2 fw-black text-body-emphasis mb-0 italic uppercase tracking-tighter">Белорусская кухня</h2>
              </div>
              <p className="text-body-secondary fs-5 lh-lg mb-0" style={{ maxWidth: '800px' }}>
                Современная национальная гастрономия — это не только классические драники и мачанка, но и переосмысленные локальные продукты. В нашей подборке собраны как заведения с аутентичной народной едой (например, культовые «Васильки»), так и места, где национальные мотивы встречаются с современным европейским подходом к крафту и стритфуду.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="row g-4">
        <AnimatePresence mode="popLayout">
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue: Venue) => (
              <div key={venue.id} className="col-md-6 col-lg-4">
                <VenueCard venue={venue} isFavorite={favorites.includes(venue.id)} onToggleFavorite={toggleFavorite} />
              </div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="col-12 text-center py-5 my-5"
            >
              <Search className="text-secondary opacity-25 mb-4" size={64} />
              <p className="text-body-secondary fs-5">Ничего не найдено по вашему запросу</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Стилизуем стандартный jQuery UI Slider под наш дизайн */}
      <style>{`
        .fw-black { font-weight: 900; }
        .ui-widget-content { background: var(--bs-secondary-bg); border: none; height: 6px; border-radius: 4px; }
        .ui-widget-header { background: #ef4444; border-radius: 4px; }
        .ui-slider .ui-slider-handle { 
          width: 16px; 
          height: 16px; 
          background: #fff; 
          border: 2px solid #ef4444; 
          border-radius: 50%; 
          top: -5px; 
          cursor: pointer;
          outline: none;
        }
        .ui-slider .ui-slider-handle:hover { transform: scale(1.2); }
      `}</style>
    </motion.div>
  );
};
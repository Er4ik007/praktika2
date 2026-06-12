import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, MapPin, Utensils, Coffee, Wine, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Venue } from '../data';

interface VenueCardProps {
  venue: Venue;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  index: number;
}

export const VenueCard = ({ venue, isFavorite, onToggleFavorite }: VenueCardProps) => {
  // 1. Создаем координаты для мыши (от -0.5 до 0.5 относительно центра карточки)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Добавляем "физику пружины", чтобы отлет от курсора был мягким и естественным
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3. Эффект отталкивания (Repel). 
  // Если мышь идет вправо (+0.5), карточка уезжает влево (-15px)
  const translateX = useTransform(springX, [-0.5, 0.5], [5, -5]);
  const translateY = useTransform(springY, [-0.5, 0.5], [5, -5]);

  // 4. Эффект 3D-наклона. Карточка отворачивается от курсора.
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  // 5. Обработчик движения мыши внутри карточки
  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Вычисляем процентное положение курсора от центра
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  // 6. Сброс позиции, когда мышь убирают
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Создаем псевдослучайную задержку для анимации парения, 
  // чтобы карточки летали вверх-вниз вразнобой, а не все одновременно
  const randomDelay = (venue.id.charCodeAt(0) % 5) * 0.4;

  return (
    // Обертка для создания 3D-перспективы и эффекта левитации
    <div 
      className="floating-wrapper" 
      style={{ 
        perspective: '1200px', 
        height: '100%', 
        animationDelay: `${randomDelay}s` 
      }}
    >
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        
        // Вешаем обработчики мыши
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        
        // Применяем вычисленные значения трансформации
        style={{
          x: translateX,
          y: translateY,
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d"
        }}
        className="card border-0 rounded-4 overflow-hidden shadow-sm hover-shadow-lg transition-shadow h-100 bg-body"
      >
        <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
          <Link to={`/venue/${venue.id}`}>
            {/* Картинка тоже чуть-чуть увеличивается при наведении для глубины */}
            <img src={venue.image} alt={venue.name} loading="lazy" className="w-100 h-100 object-fit-cover transition-transform duration-700 card-img-hover" />
          </Link>
          <button onClick={() => onToggleFavorite(venue.id)} className="position-absolute top-0 start-0 m-3 p-2 rounded-circle border-0 bg-body shadow-sm hover-grow transition-transform z-2">
            <Star size={25} className={isFavorite ? 'text-danger fill-danger' : 'text-body-secondary'} style={{ fill: isFavorite ? '#ef4444' : 'none' }} />
          </button>
          <div className="position-absolute top-0 end-0 m-3 bg-body px-2 py-1 rounded-pill d-flex align-items-center gap-1 small fw-bold text-body-emphasis shadow-sm">
            <Star size={14} className="text-warning fill-warning" style={{ fill: '#ffc107' }} />
            {venue.rating}
          </div>
          <div className="position-absolute bottom-0 start-0 m-3 d-flex gap-1">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={`text-white fw-bold fs-5 text-shadow ${i < venue.priceLevel ? 'opacity-100' : 'opacity-50'}`}>$</span>
            ))}
          </div>
        </div>
        
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex align-items-center gap-2 small fw-bold text-danger text-uppercase tracking-widest mb-2">
            {venue.type === 'restaurant' && <Utensils size={14} />}
            {venue.type === 'coffee' && <Coffee size={14} />}
            {venue.type === 'bar' && <Wine size={14} />}
            {venue.type === 'cafe' && <MapPin size={14} />}
            {venue.type === 'restaurant' ? 'Ресторан' : venue.type === 'coffee' ? 'Кофейня' : venue.type === 'bar' ? 'Бар' : 'Кафе'}
          </div>
          <h3 className="h4 fw-bold mb-3 text-body-emphasis text-truncate">{venue.name}</h3>
          <p className="card-text text-body-secondary small mb-4 line-clamp-3">
            {venue.description}
          </p>
          <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-1 text-body-secondary small text-truncate pe-2">
              <MapPin size={14} />
              <span className="text-truncate">{venue.branches[0].address}</span>
            </div>
            <Link to={`/venue/${venue.id}`} className="text-danger fw-bold text-decoration-none small d-flex align-items-center gap-1 transition-transform flex-shrink-0 hover-move-x">
              Подробнее <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </motion.article>

      <style>{`
        /* Анимация бесконечного парения (левитации) */
        @keyframes float-animation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        .floating-wrapper {
          animation: float-animation 6s ease-in-out infinite;
        }

        .hover-shadow-lg:hover { box-shadow: 0 1.5rem 4rem rgba(0,0,0,.15) !important; }
        .card-img-hover:hover { transform: scale(1.15); transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-grow:hover { transform: scale(1.15); }
        .hover-move-x:hover { transform: translateX(4px); }
        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .transition-shadow { transition: box-shadow 0.4s ease; }
        
        .line-clamp-3 { 
          display: -webkit-box; 
          -webkit-line-clamp: 3; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
        }
      `}</style>
    </div>
  );
};
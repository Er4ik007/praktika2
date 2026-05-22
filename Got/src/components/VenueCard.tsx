import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Utensils, Coffee, Wine, ChevronRight } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import { Venue } from '../data';

interface VenueCardProps {
  venue: Venue;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const VenueCard = ({ venue, isFavorite, onToggleFavorite }: VenueCardProps) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="card border-0 rounded-4 overflow-hidden shadow-sm hover-shadow-lg transition-all h-100 bg-body"
    >
      <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
        <Link to={`/venue/${venue.id}`}>
          <img src={venue.image} alt={venue.name} loading="lazy" className="w-100 h-100 object-fit-cover transition-transform duration-700 card-img-hover" />
        </Link>
        <button onClick={() => onToggleFavorite(venue.id)} className="position-absolute top-0 start-0 m-3 p-2 rounded-circle border-0 bg-body shadow-sm hover-grow transition-transform z-2">
          <Star size={25} className={isFavorite ? 'text-danger fill-danger' : 'text-body-secondary'} style={{ fill: isFavorite ? '#ef4444' : 'none' }} />
        </button>
        <div className="position-absolute top-0 end-0 m-3 bg-body px-2 py-1 rounded-pill d-flex align-items-center gap-1 small fw-bold text-body-emphasis shadow-sm">
          <Star size={14} className="text-warning fill-warning" style={{ fill: '#ffc107' }} />
          {venue.rating}
        </div>
      </div>
      
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex align-items-center gap-2 small fw-bold text-danger text-uppercase tracking-widest mb-2">
          {venue.type === 'restaurant' && <Utensils size={14} />}
          {venue.type === 'coffee' && <Coffee size={14} />}
          {venue.type === 'bar' && <Wine size={14} />} {/* Иконка для бара */}
          {venue.type === 'cafe' && <MapPin size={14} />}
          
          {/* Надпись для бара */}
          {venue.type === 'restaurant' ? 'Ресторан' : venue.type === 'coffee' ? 'Кофейня' : venue.type === 'bar' ? 'Бар' : 'Кафе'}
        </div>
        <h3 className="h4 fw-bold mb-3 text-body-emphasis text-truncate">{venue.name}</h3>
        <p className="card-text text-body-secondary small mb-4 line-clamp-3">
          {venue.description}
        </p>
        <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-1 text-body-secondary small text-truncate pe-2">
            <MapPin size={14} />
            <span className="text-truncate">{venue.address}</span>
          </div>
          <Link to={`/venue/${venue.id}`} className="text-danger fw-bold text-decoration-none small d-flex align-items-center gap-1 transition-transform flex-shrink-0 hover-move-x">
            Подробнее <ChevronRight size={14} />
          </Link>
        </div>
      </div>
      <style>{`
        .hover-shadow-lg:hover { box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important; }
        .card-img-hover:hover { transform: scale(1.1); transition: transform 0.7s ease; }
        .hover-grow:hover { transform: scale(1.1); }
        .hover-move-x:hover { transform: translateX(4px); }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </motion.article>
  );
};
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, MapPin, Utensils, Coffee, Wine, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Venue } from '../data';
import { useLang } from '../i18n/LanguageContext';

interface VenueCardProps {
  venue: Venue;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  index: number;
  liveRating?: { avg: string; count: number };
}

export const VenueCard = React.memo(({ venue, isFavorite, onToggleFavorite, liveRating }: VenueCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { t, tv } = useLang();

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const translateX = useTransform(springX, [-0.5, 0.5], [5, -5]);
  const translateY = useTransform(springY, [-0.5, 0.5], [5, -5]);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = React.useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const randomDelay = (venue.id.charCodeAt(0) % 5) * 0.4;

  const typeLabel = t(`venueCard.type.${venue.type === 'restaurant' ? 'restaurant' : venue.type === 'coffee' ? 'coffee' : venue.type === 'bar' ? 'bar' : 'cafe'}`);
  const venueDesc = tv(`venue.${venue.id}.desc`, venue.description);
  const venueAddr = tv(`venue.${venue.id}.addr0`, venue.branches[0].address);

  return (
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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
            <img src={venue.image} alt={venue.name} loading="lazy" className="w-100 h-100 object-fit-cover transition-transform duration-700 card-img-hover" />
          </Link>
          <button onClick={() => onToggleFavorite(venue.id)} className="position-absolute top-0 start-0 m-3 p-2 rounded-circle border-0 bg-body shadow-sm hover-grow transition-transform z-2">
            <Star size={25} className={isFavorite ? 'text-danger fill-danger' : 'text-body-secondary'} style={{ fill: isFavorite ? '#ef4444' : 'none' }} />
          </button>
          <div className="position-absolute top-0 end-0 m-3 bg-body px-2 py-1 rounded-pill d-flex align-items-center gap-1 small fw-bold text-body-emphasis shadow-sm">
            <Star size={14} className="text-warning fill-warning" style={{ fill: '#ffc107' }} />
            {liveRating ? liveRating.avg : '0'}
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
            {typeLabel}
          </div>
          <h3 className="h4 fw-bold mb-3 text-body-emphasis text-truncate">{tv(`venue.name.${venue.id}`, venue.name)}</h3>
          <p className="card-text text-body-secondary small mb-4 line-clamp-3">
            {venueDesc}
          </p>
          <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-1 text-body-secondary small text-truncate pe-2">
              <MapPin size={14} />
              <span className="text-truncate">{venueAddr}</span>
            </div>
            <Link to={`/venue/${venue.id}`} className="text-danger fw-bold text-decoration-none small d-flex align-items-center gap-1 transition-transform flex-shrink-0 hover-move-x">
              {t('venueCard.more')} <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
});

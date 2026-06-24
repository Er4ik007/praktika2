import React, { createContext, useContext, useState, useEffect } from 'react';
import { venues } from '../data';

interface RatingsMap {
  [venueId: string]: { avg: string; count: number };
}

const RatingsContext = createContext<RatingsMap>({});

export const useRatings = () => useContext(RatingsContext);

export const RatingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ratings, setRatings] = useState<RatingsMap>({});

  useEffect(() => {
    const fetchAll = async () => {
      const result: RatingsMap = {};
      await Promise.all(
        venues.map(async (venue) => {
          try {
            const res = await fetch(`https://praktika2-vkkr.onrender.com/api/reviews/${venue.id}`);
            if (res.ok) {
              const reviews = await res.json();
              if (reviews.length > 0) {
                const avg = (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1);
                result[venue.id] = { avg, count: reviews.length };
              }
            }
          } catch {}
        })
      );
      setRatings(result);
    };
    fetchAll();
  }, []);

  return (
    <RatingsContext.Provider value={ratings}>
      {children}
    </RatingsContext.Provider>
  );
};

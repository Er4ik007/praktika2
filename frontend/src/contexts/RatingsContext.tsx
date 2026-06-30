import React, { createContext, useContext, useState, useEffect } from 'react';
import { venues } from '../data';
import { API_BASE } from '../config';

interface BranchRating {
  avg: string;
  count: number;
}

interface VenueRating {
  avg: string;
  count: number;
  branches: { [branchId: string]: BranchRating };
}

interface RatingsMap {
  [venueId: string]: VenueRating;
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
            const res = await fetch(`${API_BASE}/api/reviews/${venue.id}`);
            if (res.ok) {
              const reviews = await res.json();
              if (reviews.length > 0) {
                const avg = (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1);

                const branches: { [branchId: string]: BranchRating } = {};
                for (const r of reviews) {
                  const bid = r.branch_id || 'default';
                  if (!branches[bid]) branches[bid] = { avg: '0', count: 0 };
                  branches[bid].count++;
                }
                for (const bid of Object.keys(branches)) {
                  const branchReviews = reviews.filter((r: any) => (r.branch_id || 'default') === bid);
                  branches[bid].avg = (branchReviews.reduce((s: number, r: any) => s + r.rating, 0) / branchReviews.length).toFixed(1);
                }

                result[venue.id] = { avg, count: reviews.length, branches };
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

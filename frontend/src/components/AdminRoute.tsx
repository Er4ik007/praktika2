import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!token || isAdmin !== 'true') {
      setIsAuthorized(false);
      return;
    }

    fetch('https://praktika2-vkkr.onrender.com/api/users/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data.is_admin) {
          setIsAuthorized(true);
        } else {
          localStorage.removeItem('isAdmin');
          setIsAuthorized(false);
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('isAdmin');
        setIsAuthorized(false);
      });
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-danger"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};

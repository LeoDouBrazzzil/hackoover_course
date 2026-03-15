import { useState, useEffect } from 'react';

interface DecodedToken {
  roles?: string[];
  sub?: string;
  exp?: number;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      const payload = token.split('.')[1];
      const decoded: DecodedToken = JSON.parse(atob(payload));

      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setIsAdmin(decoded.roles?.includes('ROLE_ADMIN') || decoded.roles?.includes('ADMIN') || false);
    } catch (error) {
      console.error('Error decoding token:', error);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, isAdmin, loading };
};

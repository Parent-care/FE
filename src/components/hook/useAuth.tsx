import { useState, useEffect } from 'react';
import { User, AuthResponse } from '../../app/type';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('https://be-production-0885.up.railway.app/api/auth/me', {
          credentials: 'include'
        });
        
        if (res.ok) {
          const data: AuthResponse = await res.json();
          if (data.isLoggedIn && data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
}
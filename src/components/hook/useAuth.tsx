import { useState, useEffect } from 'react';
import { User, AuthResponse } from '../../app/type';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch('https://be-production-0885.up.railway.app/api/auth/me', {
        method: 'GET',
        credentials: 'include', // 🔥 WAJIB! Biar cookie ikut dikirim
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        console.warn(`Auth check gagal: ${res.status}`);
        return;
      }

      const data: AuthResponse = await res.json();

      if (data?.isLoggedIn && data.user) {
        setUser(data.user);
        // Optionally: extract token dari cookie pakai js-cookie atau cookie-parser frontend
      } else {
        console.warn('User tidak login');
      }
    } catch (error) {
      console.error('🔥 Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);


  return { user, loading, token };
}


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await fetch('https://be-production-0885.up.railway.app/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        localStorage.removeItem('token'); // atau localStorage.clear()

        router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
        router.push('/');
      }
    };

    performLogout();
  }, [router]);

  return <div>Logging out...</div>;
}

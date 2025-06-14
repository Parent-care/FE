'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token'); // atau clear semua
    router.push('/');
  }, [router]);

  return <div>Logging out...</div>;
}

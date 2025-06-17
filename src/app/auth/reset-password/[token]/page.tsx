'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password tidak cocok!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://be-production-0885.up.railway.app/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal reset password');

      setSuccess(true);
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Terjadi kesalahan tak dikenal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Reset Password</h1>
        {success ? (
          <div className="text-green-600 text-center font-medium">
            Password berhasil direset! Kamu akan diarahkan ke halaman login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password Baru</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-300 focus:border-orange-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-300 focus:border-orange-300"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-300 to-yellow-200 text-white font-semibold py-2 px-4 rounded-lg shadow hover:opacity-90 transition"
            >
              {loading ? 'Mengubah password...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || 'Login gagal');
      } else {
        alert('Login berhasil!');
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat login');
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || 'Login Google gagal');
      } else {
        alert('Login Google berhasil!');
        window.location.href = '/';
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat login Google');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFBFA3 0%, #FFF6A3 100%)' }}
      >
        {/* ...dekorasi dan logo seperti sebelumnya... */}
        <div className="flex flex-col items-center justify-center w-full p-12 text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="relative">
                <svg className="w-16 h-16 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg className="w-8 h-8 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4V8H18C19.1 8 20 8.9 20 10S19.1 12 18 12H14V16C14 17.1 13.1 18 12 18S10 17.1 10 16V12H6C4.9 12 4 11.1 4 10S4.9 8 6 8H10V4C10 2.9 10.9 2 12 2Z" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">ParentCare</h1>
          <p className="text-white text-lg opacity-90 max-w-md leading-relaxed">
            Discover the power of personalized health insights and seamless tracking with ParentCare
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Log in</h2>
              <p className="text-gray-600">Masuk ke akun ParentCare Anda Bro</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  👁️
                </button>
              </div>
              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-sm font-medium hover:underline" style={{ color: '#FFBFA3' }}>
                  Lupa password?
                </Link>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-300 to-yellow-200 text-white py-3 px-4 rounded-lg shadow">
                Masuk
              </button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or log in with</span>
                </div>
              </div>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.log('❌ Google Login Gagal')}
              />
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Belum punya akun?{' '}
                  <Link href="/auth/register" className="font-medium hover:underline" style={{ color: '#FFBFA3' }}>
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

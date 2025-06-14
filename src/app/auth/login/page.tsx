'use client';

import { useState } from 'react';
import { useRouter } from 'next/router'; // Gunakan useRouter untuk redirect
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google'; // Impor komponen GoogleLogin

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Gunakan router untuk redirect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://be-production-0885.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email, // Menggunakan email sebagai username
          password: formData.password,
        }),
      });

      const result = await res.json();
      console.log('Response Body:', result);

      if (!res.ok) {
        alert(result.message || 'Login gagal');
      } else {
        // Simpan token JWT setelah login berhasil
        localStorage.setItem('jwtToken', result.token); // Simpan token ke localStorage

        alert('Login berhasil!');
        router.push('/'); // Menggunakan router.push untuk redirect ke halaman utama
      }

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat login');
    }
  };

const handleGoogleLogin = (response: any) => {
  // Logika untuk menangani Google login response
  console.log(response);
};

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFBFA3 0%, #FFF6A3 100%)' }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white rotate-45 opacity-20"></div>
        <div className="absolute top-32 left-32 w-3 h-3 bg-white rotate-45 opacity-30"></div>
        <div className="absolute top-40 left-16 w-2 h-2 bg-white rotate-45 opacity-25"></div>
        <div className="absolute bottom-32 right-20 w-5 h-5 bg-white rotate-45 opacity-20"></div>
        <div className="absolute bottom-20 right-32 w-3 h-3 bg-white rotate-45 opacity-30"></div>
        <div className="absolute bottom-48 right-16 w-2 h-2 bg-white rotate-45 opacity-25"></div>
        
        <div className="flex flex-col items-center justify-center w-full p-12 text-center">
          {/* Logo/Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="relative">
                {/* Heart with Cross */}
                <svg className="w-16 h-16 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                {/* Cross overlay */}
                <svg className="w-8 h-8 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4V8H18C19.1 8 20 8.9 20 10S19.1 12 18 12H14V16C14 17.1 13.1 18 12 18S10 17.1 10 16V12H6C4.9 12 4 11.1 4 10S4.9 8 6 8H10V4C10 2.9 10.9 2 12 2Z"/>
                </svg>
              </div>
            </div>
            {/* Hand illustration */}
            <div className="absolute -bottom-4 -right-4">
              <svg className="w-20 h-20 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 5.5V18.5C23 20.43 21.43 22 19.5 22H4.5C2.57 22 1 20.43 1 18.5V5.5C1 3.57 2.57 2 4.5 2H19.5C21.43 2 23 3.57 23 5.5ZM20 5.5C20 5.22 19.78 5 19.5 5H4.5C4.22 5 4 5.22 4 5.5V18.5C4 18.78 4.22 19 4.5 19H19.5C19.78 19 20 18.78 20 18.5V5.5Z"/>
              </svg>
            </div>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-4xl font-bold text-white mb-4">ParentCare</h1>
          
          {/* Tagline */}
          <p className="text-white text-lg opacity-90 max-w-md leading-relaxed">
            Discover the power of personalized health insights and seamless tracking with ParentCare
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Log in</h2>
              <p className="text-gray-600">Masuk ke akun ParentCare Anda Brook</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  Login
                </button>
              </div>
              <GoogleLogin
                onSuccess={handleGoogleLogin} // Gunakan handleGoogleLogin
                onError={() => console.log('Login gagal')}
                useOneTap
                theme="outline"
                text="signin_with"
                shape="rectangular"
              />

              {/* Link to Register */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Belum punya akun?{' '}
                  <Link href="/auth/register" className="text-blue-500 hover:underline">
                    Daftar
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

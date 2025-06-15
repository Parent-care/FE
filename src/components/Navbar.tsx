'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../components/hook/useAuth';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const handleLogout = async () => {
  console.log('Logout clicked');

  try {
    const res = await fetch('https://be-production-0885.up.railway.app/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // penting jika token disimpan di cookie
    });

    if (res.ok) {
      // Hapus token dari localStorage jika kamu menyimpannya di sana
      localStorage.removeItem('token');

      // Redirect manual jika belum pakai useRouter
      window.location.href = '/';
    } else {
      const errorData = await res.json();
      console.error('Logout failed:', errorData.message);
      alert('Logout gagal: ' + errorData.message);
    }
  } catch (err) {
    console.error('Logout error:', err);
    alert('Terjadi kesalahan saat logout.');
  }
};


  return (
    <nav className="bg-gradient-to-r from-[#FFB6B9] to-[#FFE0D7] p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <Image
              src="/parentcarelogo.png"
              alt="ParentCare Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-bold text-orange-600">ParentCare</span>
        </Link>

        {/* Hamburger Menu Button for Mobile */}
        <div className="block md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-orange-600 focus:outline-none"
          >
            <svg
              className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/parent-match" className="text-gray-800 hover:text-orange-500 transition-colors">
            Parent Match
          </Link>
          <Link href="/artikel" className="text-gray-800 hover:text-orange-500 transition-colors">
            Artikel
          </Link>
          <Link href="/forum" className="text-gray-800 hover:text-orange-500 transition-colors">
            Forum
          </Link>
          <Link href="/About" className="text-gray-800 hover:text-orange-500 transition-colors">
            About Us
          </Link>

          {/* Auth Area */}
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            // If user is logged in
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-orange-200 transition-colors"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.nama_lengkap?.charAt(0)}
                </div>
                <span className="text-gray-800 font-medium">{user.nama_lengkap}</span>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="relative mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.nama_lengkap?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.nama_lengkap}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-1">
                    <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profil Saya
                    </Link>

                    <div className="border-t border-gray-100">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link href="/auth/login" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Login
              </Link>
              <Link href="/auth/register" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'absolute' : 'hidden'
        } top-full left-0 right-0 bg-gradient-to-r from-[#FFB6B9] to-[#FFE0D7] p-4 shadow-md mt-2 flex flex-col items-center space-y-4 md:hidden`}
      >
        {/* Navigation Links */}
        <div className="flex flex-col space-y-4">
          <Link href="/parent-match" className="text-gray-800 hover:text-orange-500 transition-colors">
            Parent Match
          </Link>
          <Link href="/artikel" className="text-gray-800 hover:text-orange-500 transition-colors">
            Artikel
          </Link>
          <Link href="/forum" className="text-gray-800 hover:text-orange-500 transition-colors">
            Forum
          </Link>
          <Link href="/About" className="text-gray-800 hover:text-orange-500 transition-colors">
            About Us
          </Link>
        </div>

        {/* Auth Area */}
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-orange-200 transition-colors"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.nama_lengkap?.charAt(0)}
              </div>
              <span className="hidden md:block text-gray-800 font-medium">{user.nama_lengkap}</span>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto"
                style={{
                  maxHeight: '300px', // max-height set to 300px
                  top: '100%', // Dropdown starts from the button
                  left: 'auto', // Automatically adjust based on the screen width
                  right: 0, // Align the dropdown to the right
                }}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.nama_lengkap?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.nama_lengkap}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Options */}
                <div className="py-1">
                  <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profil Saya
                  </Link>

                  <Link href="/settings" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Pengaturan
                  </Link>

                  <Link href="/konsultasi/history" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                    </svg>
                    History Konsultasi
                  </Link>

                  <div className="border-t border-gray-100">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/auth/login" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Login
            </Link>
            <Link href="/auth/register" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

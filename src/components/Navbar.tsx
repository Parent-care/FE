'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../components/hook/useAuth';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    console.log('Logout clicked');

    try {
      const res = await fetch('https://be-production-0885.up.railway.app/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        localStorage.removeItem('token');
        logout();
        window.location.href = '/';
      } else {
        const errorData = await res.json();
        alert('Logout gagal: ' + errorData.message);
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Terjadi kesalahan saat logout.');
    }
  };

  return (
    <nav className="bg-[#FFE0D7] p-4 shadow fixed top-0 left-0 right-0 z-50">
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
          <span className="text-2xl font-bold text-orange-500">ParentCare</span>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden block text-gray-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/parent-match" className="text-gray-800 hover:text-orange-500">Parent Match</Link>
          <Link href="/artikel" className="text-gray-800 hover:text-orange-500">Artikel</Link>
          <Link href="/forum" className="text-gray-800 hover:text-orange-500">Forum</Link>
          <Link href="/About" className="text-gray-800 hover:text-orange-500">About Us</Link>
        </div>

        {/* Auth Area */}
        <div className="hidden md:flex items-center space-x-4">
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
                <svg className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
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
                  <div className="py-1">
                    <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profil Saya
                    </Link>
                    <div className="border-t border-gray-100">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
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
            <>
              <Link href="/auth/login" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-orange-600">Login</Link>
              <Link href="/auth/register" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-gray-600">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-[#FFE0D7] shadow-md mt-4 px-4 pb-4 space-y-2">
          <Link href="/parent-match" className="block text-gray-800 hover:text-orange-500">Parent Match</Link>
          <Link href="/artikel" className="block text-gray-800 hover:text-orange-500">Artikel</Link>
          <Link href="/forum" className="block text-gray-800 hover:text-orange-500">Forum</Link>
          <Link href="/About" className="block text-gray-800 hover:text-orange-500">About Us</Link>

          <hr className="my-2 border-gray-300" />

          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <>
              <p className="text-gray-700 font-semibold">{user.nama_lengkap}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <Link href="/profile" className="block text-sm text-gray-700 hover:text-orange-500 mt-2">Profil Saya</Link>
              <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block text-gray-700 hover:text-orange-500">Login</Link>
              <Link href="/auth/register" className="block text-gray-700 hover:text-orange-500">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

'use client';

import React, { useEffect, useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://be-production-0885.up.railway.app';

const ProfileAvatarUploader = () => {
  const [user, setUser] = useState<{ id: string; avatar: string | null } | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/me`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.isLoggedIn) {
          setUser(data.user);
          // Jika avatar adalah path (bukan URL penuh), tambahkan BASE_URL
          const url = data.user.avatar
            ? `${BASE_URL}${data.user.avatar}`
            : null;
          setAvatarUrl(url);
        }
      } catch (err) {
        console.error('Gagal memuat user:', err);
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/upload-avatar`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Upload gagal');

      const result = await res.json();
      if (result.user && result.user.avatar) {
        setAvatarUrl(`${BASE_URL}${result.user.avatar}`);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
      setStatus('Avatar berhasil diunggah!');
    } catch (err) {
      console.error('Upload error:', err);
      setStatus('Gagal upload avatar');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Foto Profil</h2>

      <div className="flex items-center gap-4 mb-4">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-28 h-28 rounded-full object-cover shadow border-2 border-blue-500"
          />
        ) : avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover shadow"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            Tidak ada avatar
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm"
        />
      </div>

      <p className="text-sm text-gray-500 mb-4">* Maks. 2MB, JPG/PNG</p>

      {previewUrl && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={handleUpload}
        >
          Upload Avatar
        </button>
      )}

      {status && (
        <p className={`mt-4 text-sm ${status.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default ProfileAvatarUploader;

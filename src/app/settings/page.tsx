'use client';

import React from 'react';

const SettingsPage = () => {
  const user = {
    name: 'Bagus Firmansyah',
    email: 'bagus@example.com',
    role: 'Orang Tua',
    joinedAt: '2024-10-01',
  };

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Pengaturan Akun</h1>

      <section className="bg-gray-100 p-6 rounded-xl shadow-md max-w-xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Nama Lengkap</label>
          <input
            type="text"
            defaultValue={user.name}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            defaultValue={user.email}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Role</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="w-full mt-1 px-3 py-2 bg-gray-200 border border-gray-300 rounded-lg cursor-not-allowed"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Simpan Perubahan
        </button>
      </section>
    </main>
  );
};

export default SettingsPage;

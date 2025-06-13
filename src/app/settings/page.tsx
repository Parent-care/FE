'use client';

const SettingsPage = () => {

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Pengaturan Akun</h1>
          <p className="text-gray-600 mt-2">Kelola informasi dan preferensi akun Anda</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-8">
         
            <p className="text-center text-sm mb-4 text-green-600">status</p>

          {/* Forgot Password Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Lupa Kata Sandi?</h2>
            <p className="text-gray-600 mb-6">
              Masukkan email Anda dan kami akan mengirimkan instruksi untuk mereset kata sandi Anda.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                value="email"
                placeholder="Masukkan email"
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
              >
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;

export default function TentangKami() {
  return (
    <main className="bg-gradient-to-r from-[#FFE0D7] to-[#FFB6B9] min-h-screen py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Tentang Kami
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            ParentCare adalah platform konsultasi parenting digital untuk keluarga sehat, tempat di mana orang tua dapat mencari dukungan dan wawasan tentang cara merawat anak dengan cara yang sehat dan bijaksana.
          </p>
          <p className="text-md text-gray-600 italic max-w-3xl mx-auto">
            Kami percaya bahwa setiap keluarga berhak untuk memiliki pengetahuan dan dukungan dalam perjalanan mereka membesarkan anak.
          </p>
        </section>

        {/* Card Section */}
        <section className="grid md:grid-cols-2 gap-12">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Misi Kami
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              ParentCare bertujuan untuk memberikan informasi yang berguna dan dapat dipercaya mengenai parenting yang berdampak positif bagi keluarga. Kami ingin membantu orang tua memahami kebutuhan anak-anak mereka dengan lebih baik.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Visi Kami
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Kami ingin menjadi platform utama dalam memberikan layanan konsultasi parenting yang mudah diakses, dengan fokus pada kesejahteraan keluarga. Dengan pendekatan berbasis bukti, kami menyediakan wawasan yang bermanfaat dan praktis.
            </p>
          </div>
        </section>

        {/* Footer Section */}
        <section className="mt-16 text-center">
          <p className="text-gray-500 text-md">
            &copy; 2025 ParentCare. Semua hak dilindungi.
          </p>
        </section>
      </div>
    </main>
  );
}

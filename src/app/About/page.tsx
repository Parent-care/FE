import Image from 'next/image';

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
        <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-12">
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

        {/* Tim & Bidang Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Tim Kami</h2>
          
          {/* Frontend & Backend Developer */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Tim Frontend & Backend */}
            <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Frontend & Backend Developer</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Revan Fazry Huda</li>
                <li>Moh Syafiq Ade Luwindra</li>
                <li>Syahrani</li>
              </ul>
              {/* Gambar Tim */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex justify-center">
                  <Image
                    src="/images/revan.jpg" // Gambar Revan
                    alt="Revan Fazry Huda"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/syafiq.jpg" // Gambar Syafiq
                    alt="Moh Syafiq Ade Luwindra"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/syahrani.jpg" // Gambar Syahrani
                    alt="Syahrani"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Tim Machine Learning */}
            <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Machine Learning Engineers</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Safiratun Nisa</li>
                <li>Shakira Angelina Ika Putri</li>
                <li>Nabiel Muhammad Imjauzanansyah</li>
              </ul>
              {/* Gambar Tim */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex justify-center">
                  <Image
                    src="/images/safira.jpg" // Gambar Safira
                    alt="Safiratun Nisa"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/shakira.jpg" // Gambar Shakira
                    alt="Shakira Angelina Ika Putri"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/nabiel.jpg" // Gambar Nabiel
                    alt="Nabiel Muhammad Imjauzanansyah"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
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

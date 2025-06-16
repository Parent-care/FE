import Image from 'next/image';

export default function TentangKami() {
  return (
    <main className="bg-gradient-to-r from-[#FFE0D7] to-[#FFB6B9] min-h-screen py-30">
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
          <div className="bg-white rounded-xl shadow-2xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Misi Kami
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              ParentCare bertujuan untuk memberikan informasi yang berguna dan dapat dipercaya mengenai parenting yang berdampak positif bagi keluarga. Kami ingin membantu orang tua memahami kebutuhan anak-anak mereka dengan lebih baik.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-2xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
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
          
          {/* Frontend & Backend Developer Section */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Frontend & Backend Developer</h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Card for each developer */}
            {[ 
              { name: "Revan Fazry Huda", image: "/team/revan.jpg", role: "Frontend & Backend Developer" },
              { name: "Moh Syafiq Ade Luwindra", image: "/team/syafiq.jpg", role: "Frontend & Backend Developer" },
              { name: "Syahrani", image: "/team/syahrani.jpg", role: "Frontend & Backend Developer" }
            ].map((teamMember, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
                <div className="flex justify-center mb-6">
                  <Image
                    src={teamMember.image} // Gambar Anggota Tim
                    alt={teamMember.name}
                    width={150} // Ukuran lebih besar
                    height={150} // Ukuran lebih besar
                    className="rounded-full object-cover border-4 border-[#FFB6B9]" // Border untuk gambar
                  />
                </div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  {teamMember.name}
                </h4>
                <p className="text-center text-gray-600 text-lg">{teamMember.role}</p>
              </div>
            ))}
          </div>

          {/* Machine Learning Engineers Section */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 mt-12">Machine Learning Engineers</h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Card for each ML Engineer */}
            {[ 
              { name: "Safiratun Nisa", image: "/team/safira.jpeg", role: "Machine Learning Engineer" },
              { name: "Shakira Angelina Ika Putri", image: "/team/shakira.jpg", role: "Machine Learning Engineer" },
              { name: "Nabiel Muhammad Imjauzanansyah", image: "/team/nabiel.jpg", role: "Machine Learning Engineer" }
            ].map((teamMember, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
                <div className="flex justify-center mb-6">
                  <Image
                    src={teamMember.image} // Gambar Anggota Tim
                    alt={teamMember.name}
                    width={150} // Ukuran lebih besar
                    height={150} // Ukuran lebih besar
                    className="rounded-full object-cover border-4 border-[#FFB6B9]" // Border untuk gambar
                  />
                </div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  {teamMember.name}
                </h4>
                <p className="text-center text-gray-600 text-lg">{teamMember.role}</p>
              </div>
            ))}
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

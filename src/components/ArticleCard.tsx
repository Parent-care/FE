import Image from 'next/image';

const ArticleCard = ({
  title,
  date,
  content,
  url,
  imageUrl,
}: {
  title: string;
  date: string;
  content: string;
  url: string | undefined;
  imageUrl: string | undefined;
}) => {
  // Cek apakah URL mengarah ke gambar valid
  const isValidImage = (url: string | undefined) =>
    !!url && /\.(jpg|jpeg|png|webp|gif)$/i.test(url);

  const fallbackImage = '/fallback.jpg'; // Letakkan fallback.jpg di folder /public
  const imageSrc = isValidImage(imageUrl) ? imageUrl! : fallbackImage;

  const fullUrl =
    url && (url.startsWith('http') || url.startsWith('https')) ? url : undefined;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 mb-6">
      {/* Gambar artikel atau fallback */}
      <div className="relative w-full h-60 overflow-hidden rounded-t-xl mb-6">
        <Image
          src={imageSrc}
          alt={title}
          unoptimized
          layout="fill"
          objectFit="cover"
          className="transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Judul Artikel */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-500 transition-colors duration-300">
        {fullUrl ? (
          <a href={fullUrl} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        ) : (
          <span>{title}</span>
        )}
      </h3>

      {/* Tanggal Artikel */}
      <p className="text-gray-500 text-sm mb-3">{date}</p>

      {/* Deskripsi Singkat */}
      <p className="text-gray-700 mb-4 text-base">{content}</p>

      {/* Tombol Lihat Selengkapnya */}
      {fullUrl && (
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Baca Selengkapnya &rarr;
        </a>
      )}
    </div>
  );
};

export default ArticleCard;

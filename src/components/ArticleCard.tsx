import Image from 'next/image';

const ArticleCard = ({
  title,
  date,
  content,
  url,
  imageUrl
}: {
  title: string;
  date: string;
  content: string;
  url: string | undefined;
  imageUrl: string | undefined;
}) => {
  // Cek apakah URL mengarah ke gambar valid (bukan undefined atau kosong)
  const isValidImage = (url: string | undefined) =>
    !!url && /\.(jpg|jpeg|png|webp|gif)$/i.test(url);

  const fallbackImage = "/fallback.jpg"; // Simpan di folder /public
  const imageSrc = isValidImage(imageUrl) ? imageUrl! : fallbackImage;

  const fullUrl = url && (url.startsWith("http") || url.startsWith("https")) ? url : undefined;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* Render image hanya kalau imageSrc valid */}
      <Image
        src={imageSrc}
        alt={title}
        width={500}
        height={300}
        className="w-full h-auto object-cover rounded-t-lg mb-4"
      />
      
      <h3 className="text-lg font-semibold text-gray-800">
        {fullUrl ? (
          <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            {title}
          </a>
        ) : (
          <span>{title}</span>
        )}
      </h3>
      
      <p className="text-gray-600 text-sm">{date}</p>
      <p className="text-gray-700 mt-2">{content}</p>
    </div>
  );
};

export default ArticleCard;

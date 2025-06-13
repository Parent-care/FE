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
  const fullUrl = url && (url.startsWith("http") || url.startsWith("https")) ? url : undefined;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* Menambahkan gambar jika ada */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover rounded-t-lg mb-4" // Gambar akan responsif
        />
      )}
      <h3 className="text-lg font-semibold text-gray-800">
        {/* Link ke artikel lengkap */}
        {fullUrl ? (
          <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            {title}
          </a>
        ) : (
          <span>{title}</span> // Jika URL tidak valid, tampilkan judul saja
        )}
      </h3>
      <p className="text-gray-600 text-sm">{date}</p>
      <p className="text-gray-700 mt-2">{content}</p>
    </div>
  );
};

export default ArticleCard;

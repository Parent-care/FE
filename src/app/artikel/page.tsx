'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "../../components/ArticleCard";

// Definisikan tipe untuk artikel
interface Article {
  title: string;
  publishedAt: string;
  description: string;
  url: string;
  image: string; // GNews pakai 'image', bukan 'urlToImage'
}

// Definisikan tipe untuk response API
interface ApiResponse {
  articles: Article[];
}

const Artikel = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://gnews.io/api/v4/search?q=parenting&lang=en&country=us&max=10&apikey=93bbf099c8a496438f454a524f38f7af`
        );

        // Filter artikel yang memiliki URL valid
        const articlesWithUrls = response.data.articles.filter((article) => article.url);

        setArticles(articlesWithUrls);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Gagal mengambil artikel. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Artikel & Tips Parenting
        </h1>
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Artikel & Tips Parenting
      </h1>

      {error && (
        <div className="bg-red-200 p-4 rounded-md mb-8 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Grid Layout untuk artikel */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              date={new Date(article.publishedAt).toLocaleDateString()}
              content={article.description || "No content available."}
              url={article.url} // Kirimkan URL yang valid ke komponen ArticleCard
              imageUrl={article.image || '/fallback-image.jpg'} // Provide fallback image if none exists
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">Tidak ada artikel yang ditemukan.</p>
        )}
      </section>
    </main>
  );
};

export default Artikel;

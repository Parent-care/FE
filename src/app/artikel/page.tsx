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
  urlToImage: string; // Menambahkan urlToImage untuk gambar
}

// Definisikan tipe untuk response API
interface ApiResponse {
  articles: Article[];
}

const Artikel = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://newsapi.org/v2/everything?q=parenting&apiKey=8bcc388eba7b4c009b317cf0c317907a`
        );

        // Debugging: lihat response yang diterima
        console.log("API Response:", response.data);

        // Filter artikel yang memiliki URL valid
        const articlesWithUrls = response.data.articles.filter(article => article.url);

        console.log("Articles with valid URLs:", articlesWithUrls);

        setArticles(articlesWithUrls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
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
        <p className="text-center text-gray-600">Loading...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Artikel & Tips Parenting
      </h1>
      
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
              imageUrl={article.urlToImage} // Kirimkan URL gambar ke komponen ArticleCard
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

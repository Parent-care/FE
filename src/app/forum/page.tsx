'use client';

import { useEffect, useState } from 'react';
import ForumPost from '../../components/ForumPost';
import NewPostForm from '../../components/NewPostForm';
import axios from 'axios';
import { useAuth } from '../../components/hook/useAuth';

interface Answer {
  id: string;
  nama_lengkap: string;
  answer: string;
  created_at: string;
  username: string;
}

interface Post {
  id: string;
  username: string;
  content: string;
  topic?: string;
  created_at: string;
  forum_answers: Answer[];
}

// Ganti dengan domain produksi Railway
const API_BASE_URL = 'https://be-production-0885.up.railway.app';

export default function ForumList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<Post[]>(`${API_BASE_URL}/api/forum`, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (error) {
      console.error('Gagal mengambil data post', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        alert('Anda belum login');
        window.location.href = '/auth/login';
      } else {
        fetchPosts();
      }
    }
  }, [loading, user]);

  const handleAddPost = async (post: { topic: string; content: string }) => {
    const { topic, content } = post;

    if (!user) return alert('User belum login');
    if (!content.trim() || !topic.trim()) {
      return alert('Topic dan konten tidak boleh kosong!');
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${API_BASE_URL}/api/forum`,
        {
          nama_lengkap: user.nama_lengkap,
          topic,
          content,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchPosts();
    } catch (error) {
      console.error('Gagal membuat post', error);
      alert('Gagal membuat post, mungkin token tidak valid');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAnswer = async (postId: string, answer: string) => {
    if (!user) return alert('User belum login');
    if (!answer.trim()) {
      return alert('Jawaban tidak boleh kosong!');
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${API_BASE_URL}/api/forum/${postId}/answer`,
        { answer },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchPosts();
    } catch (error) {
      console.error('Gagal menambahkan jawaban', error);
      alert('Gagal menambahkan jawaban');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-32 space-y-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Forum Diskusi
      </h1>

      <NewPostForm onAddPost={handleAddPost} />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari post..."
          className="border p-4 w-full md:w-1/2 mx-auto rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada post ditemukan.</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <ForumPost
                id={post.id}
                content={post.content}
                topic={post.topic}
                nama_lengkap={post.username}
                answers={post.forum_answers || []}
                onAddAnswer={handleAddAnswer}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

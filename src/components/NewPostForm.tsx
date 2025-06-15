import React, { useState } from "react";

type NewPostFormProps = {
  onAddPost: (post: { topic: string; content: string }) => void;
};

export default function NewPostForm({ onAddPost }: NewPostFormProps) {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic || !content) {
      setError("Topic dan konten tidak boleh kosong!");
      return;
    }
    setError("");
    onAddPost({ topic, content });
    setTopic("");
    setContent("");
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Buat Post Baru</h2>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      <input
        type="text"
        placeholder="Topik"
        className="border p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        value={topic}
        onChange={handleTopicChange}
      />
      <textarea
        placeholder="Isi post"
        className="border p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        value={content}
        onChange={handleContentChange}
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 hover:bg-green-600"
      >
        Kirim Post
      </button>
    </form>
  );
}

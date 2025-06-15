import { useState } from 'react';

interface Answer {
  id: string;
  nama_lengkap: string;
  username: string;
  answer: string;
  created_at: string;
}

interface ForumPostProps {
  id: string;
  content: string;
  topic?: string; // Menambahkan topic
  nama_lengkap: string;
  answers: Answer[];
  onAddAnswer: (postId: string, answer: string) => void;
}

const ForumPost = ({ id, content, topic, nama_lengkap, answers, onAddAnswer }: ForumPostProps) => {
  const [answerText, setAnswerText] = useState('');

  const handleSubmit = () => {
    if (answerText.trim()) {
      onAddAnswer(id, answerText);
      setAnswerText('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-2xl mx-auto">
      {/* Post Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-lg hover:bg-orange-600 cursor-pointer transition duration-200">
          {nama_lengkap?.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-lg">{nama_lengkap}</p>
          {topic && <p className="font-bold text-orange-600 mt-1">{topic}</p>}
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-4 text-gray-700 text-base">{content}</p>

      {/* Add Answer */}
      <div className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="Tulis jawaban..."
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto transition duration-200 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Kirim
        </button>
      </div>

      {/* Answers */}
      {answers.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-800">Jawaban:</p>
          {answers.map((a) => (
            <div key={a.id} className="flex items-start space-x-4 mt-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {a.username?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{a.username}</p>
                <p className="text-gray-600 text-sm mt-1">{a.answer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumPost;

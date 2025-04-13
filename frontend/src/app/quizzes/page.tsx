'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Quiz = {
  id: number;
  title: string;
};

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch('http://localhost:3001/quizzes');
        const data = await res.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Quizzes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <ul className='space-y-2'>
          {quizzes.map((quiz) => (
            <li key={quiz.id} className='bg-white p-4 rounded shadow'>
              <Link
                href={`/quiz/${quiz.id}`}
                className='text-blue-600 hover:underline'
              >
                {quiz.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

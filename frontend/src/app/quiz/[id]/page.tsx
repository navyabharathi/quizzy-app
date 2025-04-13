'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Question = {
  id: number;
  text: string;
  options: string[];
  answer: string;
};

export default function QuizPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:3001/quiz/${id}/questions`);
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error('Failed to fetch quiz questions:', err);
      }
    }

    fetchQuestions();
  }, [id]);

  const handleOptionChange = (questionId: number, selected: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selected }));
  };

  const handleSubmit = () => {
    if (questions.length === 0) {
      alert('No questions loaded.');
      return;
    }

    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correct++;
      }
    });

    setScore(correct);
  };

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-center'>📘 Quiz {id}</h1>

      {questions.length === 0 && (
        <p className='text-center'>Loading questions...</p>
      )}

      {questions.map((q, index) => (
        <div
          key={q.id}
          className='mb-6 border border-gray-300 rounded-xl p-4 shadow-sm bg-white'
        >
          <p className='font-semibold text-lg mb-3'>
            {index + 1}. {q.text}
          </p>
          <div className='space-y-2'>
            {q.options.map((option, i) => (
              <label key={i} className='block cursor-pointer'>
                <input
                  type='radio'
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleOptionChange(q.id, option)}
                  className='mr-2 accent-blue-600'
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      {questions.length > 0 && score === null && (
        <div className='flex justify-center mt-6'>
          <button
            onClick={handleSubmit}
            className='bg-blue-600 text-white text-lg px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md transition-all'
          >
            Submit
          </button>
        </div>
      )}

      {score !== null && (
        <div className='mt-10 p-6 bg-green-100 text-green-800 rounded-2xl shadow-lg text-center animate-fade-in'>
          <h2 className='text-2xl font-bold mb-2'>🎉 Well done!</h2>
          <p className='text-xl mb-4'>
            You scored <span className='font-semibold'>{score}</span> out of{' '}
            <span className='font-semibold'>{questions.length}</span>
          </p>
          <div className='flex justify-center gap-4 mt-4'>
            <button
              onClick={() => window.location.reload()}
              className='bg-white border border-green-600 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50'
            >
              Try Again
            </button>
            <a
              href='/quizzes'
              className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'
            >
              Back to Quizzes
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

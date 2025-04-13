'use client';

import { useEffect, useState } from 'react';

export default function ResultPage() {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const result = localStorage.getItem('quiz-result');
    if (result) {
      const parsed = JSON.parse(result);
      setScore(parsed.score);
    }
  }, []);

  return (
    <div>
      <h1>Your Score</h1>
      {score !== null ? <p>{score}</p> : <p>Loading...</p>}
    </div>
  );
}

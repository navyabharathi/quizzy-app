'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/quizzes');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-8 rounded-xl shadow-lg w-full max-w-sm'
      >
        <h1 className='text-2xl font-semibold mb-6 text-center'>
          Quizzy Login
        </h1>

        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Username
          </label>
          <input
            className='mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter username'
            required
          />
        </div>

        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            type='password'
            className='mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition'
        >
          Login
        </button>
      </form>
    </div>
  );
}

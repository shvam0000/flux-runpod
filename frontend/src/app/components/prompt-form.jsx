'use client';

import { prompts } from '@/utils/constants/prompts';
import { useState } from 'react';

export default function PromptForm({ onSubmit }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      onSubmit(prompt, data.jobId); // <-- new
      setPrompt('');
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleGenerate} className="flex gap-2 text-neutral-100">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Unleash your imagination"
          className="border border-grayscale-500 rounded-md px-4 py-2 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          {loading ? '...' : 'Send'}
        </button>
      </form>
      <div className="mt-lg flex justify-start items-center space-x-md">
        {prompts.map((item, index) => (
          <div
            onClick={() => {
              setPrompt(item.prompt);
            }}
            key={index}
            className="bg-grayscale-700/50 text-neutral-100 w-fit text-caption-md px-md py-s rounded-full cursor-pointer">
            {item.prompt}
          </div>
        ))}
      </div>
    </div>
  );
}

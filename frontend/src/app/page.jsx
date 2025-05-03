'use client';

import { useState } from 'react';
import PromptForm from './components/prompt-form';
import ImageResult from './components/image-result';

export default function Home() {
  const [messages, setMessages] = useState([]);

  const handleNewJob = (prompt, jobId) => {
    setMessages((prev) => [
      ...prev,
      { type: 'user', prompt },
      { type: 'image', jobId },
    ]);
  };

  return (
    <main className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, idx) =>
          msg.type === 'user' ? (
            <div key={idx} className="text-right">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg max-w-md">
                {msg.prompt}
              </div>
            </div>
          ) : (
            <div key={idx} className="text-left">
              <ImageResult jobId={msg.jobId} />
            </div>
          )
        )}
      </div>

      <div className="border-t p-4 sticky bottom-0 bg-white shadow-md">
        <PromptForm onSubmit={handleNewJob} />
      </div>
    </main>
  );
}

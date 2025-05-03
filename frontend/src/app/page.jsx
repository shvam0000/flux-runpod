'use client';

import { useState } from 'react';
import PromptForm from './components/prompt-form';
import ImageResult from './components/image-result';
import Gallery from './components/gallery';

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
    <div className="p-xl text-[#6B3FEC] font-bold text-heading-md text-white bg-gradient-to-br from-neutral-1000 via-[#0C0030] to-[#4F29BC] min-h-screen">
      <div>RunPod Gen</div>
      <div className="text-neutral-100 py-md">
        Let's create a masterpiece together! Just type in a prompt and watch the
        magic happen.
      </div>

      <div className="p-4 sticky bottom-0 bg-white shadow-md">
        <PromptForm onSubmit={handleNewJob} />
      </div>

      <div>
        {messages.map((msg, idx) =>
          msg.type === 'user' ? (
            <div key={idx} className="flex justify-center">
              <div className="text-neutral-100">{msg.prompt}</div>
            </div>
          ) : (
            <div key={idx}>
              <ImageResult jobId={msg.jobId} />
            </div>
          )
        )}
      </div>

      <Gallery />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function ImageResult({ jobId }) {
  const [status, setStatus] = useState('PENDING');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/status/${jobId}`
        );
        const data = await res.json();
        setStatus(data.status);

        if (data.status === 'COMPLETED') {
          setImage(data.output.image);
          clearInterval(interval);
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Polling failed:', err);
        clearInterval(interval);
      }
    }, 30000); // Poll every 30 sec

    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <div className="mt-6 text-center">
      {status === 'COMPLETED' && image && (
        <>
          <h2 className="text-xl font-semibold mb-2">Your Image:</h2>
          <div className="inline-block bg-gray-200 px-4 py-2 rounded-lg max-w-md">
            <img
              src={`data:image/png;base64,${image}`}
              alt="Generated"
              className="rounded max-w-full h-auto"
            />
          </div>
        </>
      )}
      {status !== 'COMPLETED' && (
        <div className="w-[300px] h-[300px] bg-gray-300 animate-pulse rounded-lg mx-auto" />
      )}
    </div>
  );
}

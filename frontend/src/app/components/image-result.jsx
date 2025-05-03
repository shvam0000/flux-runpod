'use client';

import { useEffect, useState } from 'react';

const ImageResult = ({ jobId }) => {
  const [status, setStatus] = useState('PENDING');
  const [image, setImage] = useState(null);

  useEffect(() => {
    setStatus('PENDING');
    setImage(null);

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
    }, 10000); // Poll every 10 sec

    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <div className="my-lg">
      <div className="w-full mx-auto max-w-[500px] flex justify-center">
        {status === 'COMPLETED' && image ? (
          <img
            src={`data:image/png;base64,${image}`}
            alt="Generated"
            className="h-full w-full rounded-xl"
          />
        ) : (
          <div className="w-[500px] h-[500px] bg-[#6B3FEC] animate-pulse rounded-lg" />
        )}
      </div>
    </div>
  );
};

export default ImageResult;

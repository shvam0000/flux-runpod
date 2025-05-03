'use client';

import { useEffect, useState } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/gallery`);
        const data = await res.json();
        setImages(data.images);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      }
    };

    fetchImages();
  }, []);

  if (!images.length) return null;

  return (
    <div className="max-w-screen mx-auto py-2xl px-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-3">
            <img
              src={`data:image/png;base64,${img.image}`}
              alt={img.prompt}
              className="rounded-lg w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

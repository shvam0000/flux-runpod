'use client';

import { useEffect, useState } from 'react';

const PAGE_SIZE = 9;

const Gallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/gallery`);
        const data = await res.json();
        setAllImages(data.images || []);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const displayedImages = allImages.slice(0, page * PAGE_SIZE);
  const hasMore = displayedImages.length < allImages.length;

  return (
    <div className="max-w-screen mx-auto py-2xl px-3xl">
      <div className="text-neutral-100 pb-md text-heading-md">Gallery</div>

      {loading ? (
        <div className="text-neutral-100">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayedImages.map((img, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-3">
                <img
                  src={`data:image/png;base64,${img.image}`}
                  alt={img.prompt}
                  className="rounded-lg w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded cursor-pointer">
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;

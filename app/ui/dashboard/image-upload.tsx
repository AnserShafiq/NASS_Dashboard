'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUpload() {
  const [imageId, setImageId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.id) {
        setImageId(data.id);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
      />
      
      {loading && <p>Uploading...</p>}
      
      {imageId && (
        <div>
          <Image
            src={`/api/images/${imageId}`}
            alt="Uploaded image"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}

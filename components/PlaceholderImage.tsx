import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PlaceholderImageProps {
  alt: string;
  filename: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ alt, filename }) => {
  const [imgError, setImgError] = useState(false);
  
  // Try local samplefiles path first
  const localSrc = `samplefiles/${filename}`;
  
  // Fallback to a placeholder service if local fails
  const fallbackSrc = `https://placehold.co/600x400/f3f4f6/475569?text=${encodeURIComponent(alt)}`;

  return (
    <div className="my-6 rounded-lg border border-primary-100 bg-white shadow-sm overflow-hidden group">
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500">{alt}</span>
        <span className="text-xs font-mono text-gray-400">{filename}</span>
      </div>
      <div className="relative bg-gray-100 min-h-[200px] flex items-center justify-center">
        <img 
          src={imgError ? fallbackSrc : localSrc} 
          alt={alt}
          onError={() => setImgError(true)}
          className="max-w-full h-auto max-h-[600px] object-contain mx-auto"
        />
      </div>
    </div>
  );
};
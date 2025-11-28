import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PlaceholderImageProps {
  alt: string;
  filename: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ alt, filename }) => {
  return (
    <div className="my-6 p-8 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
      <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
      <span className="text-sm font-medium text-gray-600 block">{alt}</span>
      <span className="text-xs text-gray-400 mt-1 font-mono">{filename}</span>
      <div className="mt-4 text-xs text-primary-600 italic">
        (Image content not available in code generation)
      </div>
    </div>
  );
};

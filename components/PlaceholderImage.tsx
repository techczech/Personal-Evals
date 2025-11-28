import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check } from 'lucide-react';

interface PlaceholderImageProps {
  alt: string;
  filename: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ alt, filename }) => {
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Try local samplefiles path first
  const localSrc = `samplefiles/${filename}`;
  
  // Fallback to a placeholder service if local fails
  const fallbackSrc = `https://placehold.co/600x400/f3f4f6/475569?text=${encodeURIComponent(alt)}`;
  
  const currentSrc = imgError ? fallbackSrc : localSrc;

  const handleCopy = async () => {
    try {
      const response = await fetch(currentSrc);
      const blob = await response.blob();
      
      // Ensure we are copying an image, not an error page (HTML)
      if (!blob.type.startsWith('image/')) {
        console.warn('Fetched content is not an image:', blob.type);
        setImgError(true); // Trigger fallback if we somehow got here with a bad response
        return;
      }
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy image: ', err);
    }
  };

  return (
    <div className="my-6 rounded-lg border border-primary-100 bg-white shadow-sm overflow-hidden group">
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500 truncate mr-2" title={alt}>{alt}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400 hidden sm:inline">{filename}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary-700 bg-white border border-primary-300 rounded hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label="Copy image to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="relative bg-gray-100 min-h-[200px] flex items-center justify-center">
        <img 
          src={currentSrc} 
          alt={alt}
          onError={() => setImgError(true)}
          className="max-w-full h-auto max-h-[600px] object-contain mx-auto"
        />
      </div>
    </div>
  );
};
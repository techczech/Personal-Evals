import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  label?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, label = "MARKDOWN" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="my-6 relative group rounded-lg border border-primary-200 bg-white shadow-sm overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-primary-100 border-b border-primary-200">
        <span className="text-xs font-bold text-primary-800 tracking-wider">{label}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary-700 bg-white border border-primary-300 rounded hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-label="Copy to clipboard"
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
      <div className="p-4 overflow-x-auto bg-gray-50">
        <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
          {code}
        </pre>
      </div>
    </div>
  );
};

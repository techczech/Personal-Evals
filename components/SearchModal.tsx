import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, FileCode, FileText, CornerDownLeft } from 'lucide-react';
import { contentData } from '../data';
import { SectionData } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SectionData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small timeout ensures focus works after mount/animation
      const timeout = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timeout);
    } else {
      document.body.style.overflow = '';
      setQuery(''); // Optional: clear query on close
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = contentData.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const categoryMatch = item.category.toLowerCase().includes(lowerQuery);
      const keywordsMatch = item.keywords.toLowerCase().includes(lowerQuery);
      const contentMatch = (item.searchContent || '').toLowerCase().includes(lowerQuery);
      
      return titleMatch || categoryMatch || keywordsMatch || contentMatch;
    });

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const activeItem = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (activeItem) {
        // Simple manual scrollIntoView logic to behave nicely within custom container
        activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        onNavigate(results[selectedIndex].id);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 flex flex-col max-h-[80vh]">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 flex-shrink-0">
          <Search className="text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400 text-gray-900"
            placeholder="Search prompts, code, and keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="hidden sm:flex gap-1">
             <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded border border-gray-200">ESC</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors sm:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto bg-gray-50/50 flex-1" ref={resultsRef}>
          {query.trim() === '' && (
            <div className="py-12 text-center text-gray-500 text-sm">
              Type something to start searching...
            </div>
          )}
          
          {query.trim() !== '' && results.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-sm">
              No matching evals found.
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2 space-y-1">
              {results.map((result, index) => {
                 const isSelected = index === selectedIndex;
                 return (
                  <button
                    key={result.id}
                    onClick={() => onNavigate(result.id)}
                    className={`
                      w-full flex items-start gap-4 p-3 text-left rounded-lg group transition-all duration-200
                      ${isSelected 
                        ? 'bg-primary-50 border-primary-100 shadow-sm ring-1 ring-primary-200' 
                        : 'bg-white border border-transparent hover:border-gray-200 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className={`
                      mt-1 p-2 rounded-md transition-colors
                      ${isSelected ? 'bg-white text-primary-600' : 'bg-gray-100 text-gray-500'}
                    `}>
                      {result.keywords.includes('code') || (result.searchContent && result.searchContent.includes('```')) 
                          ? <FileCode size={18} /> 
                          : <FileText size={18} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold truncate ${isSelected ? 'text-primary-800' : 'text-gray-900'}`}>
                          {result.title}
                        </h3>
                        {isSelected && (
                           <CornerDownLeft size={14} className="text-primary-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                           {result.category}
                         </span>
                      </div>
                      <p className={`text-sm line-clamp-2 font-mono text-xs mt-1 p-1 rounded ${isSelected ? 'text-primary-700 bg-white/50' : 'text-gray-500 bg-gray-50'}`}>
                        {getSnippet(result.searchContent || result.keywords, query)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex justify-between text-xs text-gray-400 flex-shrink-0">
          <div className="flex gap-4">
             <span className="flex items-center gap-1">
               <span className="font-bold bg-gray-200 px-1 rounded text-gray-500">↑</span>
               <span className="font-bold bg-gray-200 px-1 rounded text-gray-500">↓</span>
               <span>to navigate</span>
             </span>
             <span className="flex items-center gap-1">
               <span className="font-bold bg-gray-200 px-1 rounded text-gray-500">↵</span>
               <span>to select</span>
             </span>
          </div>
          <span className="hidden sm:inline">Search includes code & descriptions</span>
        </div>
      </div>
    </div>
  );
};

// Helper to extract relevant snippet around the match
const getSnippet = (text: string, query: string): string => {
    if (!text) return '';
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    
    // If not found in searchContent (matched via title/tags), show start of text
    if (index === -1) return text.substring(0, 120);
    
    // Context window
    const start = Math.max(0, index - 40);
    const end = Math.min(text.length, index + query.length + 60);
    
    let snippet = text.substring(start, end);
    // Add ellipses
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    
    return snippet;
}
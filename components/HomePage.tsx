import React from 'react';
import { ArrowRight, Github, Search } from 'lucide-react';

interface HomePageProps {
  onStart: (id?: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart, onOpenSearch }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
            E
          </div>
          <span className="font-bold text-gray-800 text-lg tracking-tight">EvalPrompts</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/techczech/Personal-Evals" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
            <Github size={20} />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center animate-in fade-in duration-700">
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            <span className="text-primary-500">Prompts</span> to evaluate frontier capabilities of <span className="text-primary-700">Large Language Models</span>.
          </h1>
          
          <p className="text-sm md:text-base font-semibold text-primary-600 tracking-wide mb-8">
            Personal model exploration suite by <a href="https://dominiklukes.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-800 transition-colors">Dominik Lukeš</a>. Updated 10 Nov 2025.
          </p>

          <div className="text-xl text-gray-600 leading-relaxed space-y-4 mb-12 max-w-2xl mx-auto">
            <p>
              I use a selection of these prompts to evaluate a new model on the limits of performance. Feel free to reuse or modify any of these as needed.
            </p>
            <p>
              Some of these prompts are only useful for testing smaller models because the frontier models always perform well.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onStart()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-200 transform hover:-translate-y-0.5"
            >
              Browse Evals
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={onOpenSearch}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 font-bold rounded-lg hover:border-primary-200 hover:text-primary-600 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Search size={20} />
              Search <span className="ml-2 text-xs font-mono text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">/</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500 flex flex-col gap-2">
          <p>
             CC BY license. Created by <a href="https://dominiklukes.net" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 underline transition-colors">Dominik Lukeš</a>.
          </p>
          <p>
            <a href="https://github.com/techczech/Personal-Evals" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 underline transition-colors">
              Fork it or suggest update on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
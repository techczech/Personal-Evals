import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { EvalBrowser } from './components/EvalBrowser';
import { SearchModal } from './components/SearchModal';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'browser'>('home');
  const [initialSectionId, setInitialSectionId] = useState<string | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global search shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for "/" key
      if (e.key === '/' && !isSearchOpen) {
        // Don't trigger if user is typing in an input or textarea
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea') return;

        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Support Cmd+K / Ctrl+K as well
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleStart = (id?: string) => {
    if (id) {
      // Force a state update even if the ID is the same to trigger scrolling in EvalBrowser
      setInitialSectionId(undefined);
      setTimeout(() => setInitialSectionId(id), 0);
    }
    setView('browser');
  };

  const handleBack = () => {
    setView('home');
    setInitialSectionId(undefined); 
  };

  const handleSearchNavigate = (id: string) => {
    setIsSearchOpen(false);
    handleStart(id);
  };

  return (
    <>
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={handleSearchNavigate} 
      />
      
      {view === 'browser' ? (
        <EvalBrowser onBack={handleBack} initialSectionId={initialSectionId} />
      ) : (
        <HomePage onStart={handleStart} onOpenSearch={() => setIsSearchOpen(true)} />
      )}
    </>
  );
};

export default App;
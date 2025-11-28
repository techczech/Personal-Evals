import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { EvalBrowser } from './components/EvalBrowser';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'browser'>('home');

  if (view === 'browser') {
    return <EvalBrowser onBack={() => setView('home')} />;
  }

  return <HomePage onStart={() => setView('browser')} />;
};

export default App;
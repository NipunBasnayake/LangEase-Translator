import React from 'react';
import TranslateCard from './components/TranslateCard';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="container py-5">
      <ThemeToggle />
      <TranslateCard />
    </div>
  );
}

export default App;
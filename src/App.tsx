import React, { useContext } from 'react';

import './styles/globals.css';
import 'react-reflex/styles.css';
import Index from './pages/index';
import { ThemeContext } from './context/ThemeContext';
import { ThemeContextType } from './types/context';

function App() {
  const { isDarkMode } = useContext(ThemeContext) as ThemeContextType;

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} id="theme-container">
      <Index />
    </div>
  );
}

export default App;

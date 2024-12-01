import React from 'react';

import './styles/globals.css';
import 'react-reflex/styles.css';
import Index from './pages/index';

function App() {
  return (
    <div data-theme="light" id="theme-container">
      {/* <div data-theme="dark"> */}
      <Index />
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker using a standard relative path
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Using '/sw.js' ensures it's fetched from the root of the domain
    // If the app is in a subdirectory, adjust accordingly or use a relative path like './sw.js'
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SW registered successfully with scope:', reg.scope))
      .catch(err => console.log('SW registration failed:', err));
  });
}


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Detectar qué vista cargar desde WordPress
const forcedView = rootElement.getAttribute('data-view') as 'landing' | 'app' | null;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App forcedView={forcedView} />
  </React.StrictMode>
);

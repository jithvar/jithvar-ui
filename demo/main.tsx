import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { mockAPI } from './mockAPI';
import './newDemo.css';
import './tailwind-utils.css';

// Override fetch for the demo to use mock API
const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  
  // Use mock API for our demo table
  if (url.includes('mock-api/users')) {
    return mockAPI.createFetchFunction()(url);
  }
  
  // Use original fetch for other requests
  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

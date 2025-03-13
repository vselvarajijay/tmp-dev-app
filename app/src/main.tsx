import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TeamMemberProvider } from './context/TeamMemberContext';
import createCache from '@emotion/cache';

// Create an Emotion cache with the insertion point
const myCache = createCache({
  key: 'mantine',
  prepend: true,
  insertionPoint: document.querySelector('meta[name="emotion-insertion-point"]') as HTMLElement,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TeamMemberProvider>
        <App />
    </TeamMemberProvider>    
  </React.StrictMode>
);

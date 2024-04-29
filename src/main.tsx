import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ProviderApp from './providers/ProviderApp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderApp>
      <App />
    </ProviderApp>
  </React.StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import './i18n'; // Inicializar i18n

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Cogni">
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
);

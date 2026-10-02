import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/tokens.css';
import './styles/global.css';
import App from './App';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages arrive pre-rendered (scripts/prerender.js), so React attaches to that HTML.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);

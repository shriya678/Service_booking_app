// Entry point of the React app.
// 1. Find the <div id="root"></div> we put in index.html.
// 2. Create a React root attached to it.
// 3. Render our top-level <App /> component inside.
// 4. Wrap in <StrictMode> — a dev-only safety net that highlights bad patterns.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css'; // side-effect import: loads Tailwind into the bundle

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

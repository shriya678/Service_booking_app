// Entry point of the React app.
// We wrap <App /> in two providers:
//   <BrowserRouter>  — gives all components access to React Router's APIs
//                      (Routes, Link, useNavigate, etc.)
//   <AuthProvider>   — gives all components access to auth state via useAuth()

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx';
import './styles/index.css';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

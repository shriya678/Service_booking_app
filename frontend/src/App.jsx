// Top-level router. Each <Route> maps a URL to a page component.
//   /           → public landing page
//   /dashboard  → protected home for logged-in users
//   /providers  → public list and detail
//   /my-provider → providers-only edit form
//   /login, /signup → public

import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProvidersPage from './pages/ProvidersPage';
import ProviderDetailPage from './pages/ProviderDetailPage';
import MyProviderPage from './pages/MyProviderPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProviderOnlyRoute from './components/ProviderOnlyRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/providers/:id" element={<ProviderDetailPage />} />

      <Route
        path="/my-provider"
        element={
          <ProviderOnlyRoute>
            <MyProviderPage />
          </ProviderOnlyRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

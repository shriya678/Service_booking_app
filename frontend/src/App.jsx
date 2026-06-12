// Top-level router. Each <Route> maps a URL to a page component.
// Visiting an unknown URL redirects to "/".

import { Routes, Route, Navigate } from 'react-router-dom';
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
      {/* Public auth pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Public provider browsing */}
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/providers/:id" element={<ProviderDetailPage />} />

      {/* Provider-only: edit own profile */}
      <Route
        path="/my-provider"
        element={
          <ProviderOnlyRoute>
            <MyProviderPage />
          </ProviderOnlyRoute>
        }
      />

      {/* Home (logged-in users) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: unknown URL → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

// Route wrapper that requires the logged-in user to have role === 'PROVIDER'.
// Same shape as ProtectedRoute, with one extra check.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProviderOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Checking session…
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'PROVIDER') return <Navigate to="/" replace />;

  return children;
}

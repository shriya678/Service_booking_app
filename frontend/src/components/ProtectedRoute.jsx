// Wraps a route that requires authentication.
//   <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
// While the /me check is in flight: show a spinner (avoids redirect-flicker).

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner } from './ui/Spinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

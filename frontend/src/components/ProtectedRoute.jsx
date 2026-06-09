// Wraps a route that requires authentication.
//   <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//
// While the /me check is in flight: show a placeholder (avoids redirect-flicker).
// If not logged in: redirect to /login.
// If logged in: render children.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Checking session…
      </div>
    );
  }

  if (!user) {
    // `replace` swaps the current history entry instead of pushing a new one,
    // so the back button doesn't take the user back to the protected URL.
    return <Navigate to="/login" replace />;
  }

  return children;
}

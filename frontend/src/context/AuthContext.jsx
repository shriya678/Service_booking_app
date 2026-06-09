// AuthContext — single source of truth for "who's logged in" across the app.
//
// Why context: without it, you'd pass `user` and `setUser` through props
// from <App> down to every component that needs them (LoginPage, HomePage,
// any nav bar, etc.). Context lets descendants read it directly via a hook,
// no matter how deeply nested they are.

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getMe,
  login as apiLogin,
  signup as apiSignup,
  logout as apiLogout,
} from '../api/client';

// Step 1: create the context. The default value (null) is what consumers
// see if they read it OUTSIDE the provider — we'll throw in that case
// (see useAuth() below) because it's almost certainly a bug.
const AuthContext = createContext(null);

// Step 2: the Provider component. Wraps the rest of the app and supplies
// the actual value: { user, loading, login, signup, logout }.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // `loading` is true while we check /me on first mount.
  // We need it so guarded routes don't redirect prematurely while the
  // session check is still in flight.
  const [loading, setLoading] = useState(true);

  // On mount, ask the backend "who am I?" If a session cookie exists,
  // we get back the user; otherwise 401 and we stay logged out.
  useEffect(() => {
    getMe()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(credentials) {
    const data = await apiLogin(credentials);
    setUser(data.user);
  }

  async function signup(data) {
    const result = await apiSignup(data);
    setUser(result.user);
  }

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  const value = { user, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Step 3: a custom hook so consumers write `useAuth()` instead of
// `useContext(AuthContext)`. Also enforces that you're inside the provider.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}

// Top-level component. Renders the page and fetches the user count on mount.

import { useEffect, useState } from 'react';
import { getUserCount } from './api/client';

function App() {
  // useState returns a [value, setter] pair.
  // React tracks each piece of state separately; calling a setter triggers a re-render.
  const [count, setCount] = useState(null);   // null = "not loaded yet"
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect runs AFTER render. The empty dependency array `[]` means
  // "run this exactly once, when the component first mounts" — equivalent to
  // a one-time setup. This is where we kick off the API call.
  useEffect(() => {
    getUserCount()
      .then((data) => setCount(data.count))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // What we return is JSX — looks like HTML but is actually JS.
  // className (not class) because `class` is a reserved JS keyword.
  // {expression} inside JSX evaluates the expression and renders it.
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Service Booking App
        </h1>
        <p className="text-slate-600 mb-6">
          Welcome — backend connection check.
        </p>

        {/* Conditional rendering: && shows the right side only if left is truthy. */}
        {loading && <p className="text-slate-500">Loading…</p>}

        {error && (
          <p className="text-red-600">
            Error: {error}
          </p>
        )}

        {count !== null && (
          <p className="text-lg text-slate-700">
            Users in database:{' '}
            <span className="font-mono font-bold text-blue-600">{count}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

// Logged-in landing page. Shows user info and a logout button.

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserCount } from '../api/client';

export default function HomePage() {
  const { user, logout } = useAuth();
  const [count, setCount] = useState(null);

  useEffect(() => {
    getUserCount()
      .then((data) => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Service Booking App</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-600 text-sm">{user.name}</span>
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm rounded bg-slate-200 hover:bg-slate-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-8">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Welcome, {user.name}!
          </h2>
          <p className="text-slate-600 mb-4">
            You're signed in as {user.email} ({user.role.toLowerCase()}).
          </p>
          {count !== null && (
            <p className="text-slate-700">
              Total users in DB:{' '}
              <span className="font-mono font-bold text-blue-600">{count}</span>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

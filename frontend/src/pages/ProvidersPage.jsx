// Public list of providers.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listProviders } from '../api/client';

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listProviders()
      .then((data) => setProviders(data.providers))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Service Booking App</h1>
        <Link to="/" className="text-sm text-blue-600 hover:underline">Home</Link>
      </header>

      <main className="p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Providers</h2>

        {loading && <p className="text-slate-500">Loading providers…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && providers.length === 0 && (
          <p className="text-slate-500">No providers have signed up yet.</p>
        )}

        {!loading && !error && providers.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((p) => (
              <Link
                key={p.id}
                to={`/providers/${p.id}`}
                className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-slate-800">{p.businessName}</h3>
                <p className="text-sm text-slate-500 mt-1">{p.city}</p>
                <p className="text-sm text-slate-600 mt-2">by {p.user.name}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

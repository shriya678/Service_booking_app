// Public detail page for one provider.
// Reads :id from the URL via useParams.

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProvider } from '../api/client';

export default function ProviderDetailPage() {
  const { id } = useParams();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Note the [id] dependency: if the user navigates from /providers/A
  // to /providers/B without unmounting, `id` changes and the effect re-runs
  // with the new id. Without [id], we'd show stale data.
  useEffect(() => {
    setLoading(true);
    setError(null);
    setProvider(null);
    getProvider(id)
      .then((data) => setProvider(data.provider))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Service Booking App</h1>
        <Link to="/providers" className="text-sm text-blue-600 hover:underline">
          ← All providers
        </Link>
      </header>

      <main className="p-8 max-w-2xl mx-auto">
        {loading && <p className="text-slate-500">Loading…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {provider && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {provider.businessName}
            </h2>
            <p className="text-slate-500 mb-6">by {provider.user.name}</p>

            {provider.description && (
              <p className="text-slate-700 mb-4 whitespace-pre-line">
                {provider.description}
              </p>
            )}

            <div className="border-t border-slate-200 pt-4 text-sm text-slate-600">
              <p><span className="font-semibold">Address:</span> {provider.address}</p>
              <p><span className="font-semibold">City:</span> {provider.city}</p>
              <p><span className="font-semibold">Contact:</span> {provider.user.email}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

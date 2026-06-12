// Create-or-edit form for the logged-in provider's profile.
// On mount, fetch existing profile:
//   - 200 → fill the form, mode = "edit" (submit will PATCH)
//   - 404 → leave blank,  mode = "create" (submit will POST)

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyProvider, createProvider, updateMyProvider } from '../api/client';

export default function MyProviderPage() {
  const [loading, setLoading] = useState(true);
  const [existing, setExisting] = useState(null); // null = create mode

  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [savedMessage, setSavedMessage] = useState(null);

  useEffect(() => {
    getMyProvider()
      .then((data) => {
        setExisting(data.provider);
        // Pre-fill the form with the existing values.
        setBusinessName(data.provider.businessName);
        setDescription(data.provider.description || '');
        setAddress(data.provider.address);
        setCity(data.provider.city);
      })
      .catch((err) => {
        if (err.status === 404) {
          // No profile yet — that's fine, form stays empty (create mode).
          setExisting(null);
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setFieldErrors(null);
    setSavedMessage(null);
    setSubmitting(true);

    const payload = { businessName, description, address, city };

    try {
      const result = existing
        ? await updateMyProvider(payload)
        : await createProvider(payload);
      setExisting(result.provider);
      setSavedMessage(existing ? 'Profile updated.' : 'Profile created.');
    } catch (err) {
      setError(err.message);
      setFieldErrors(err.details || null);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Service Booking App</h1>
        <Link to="/" className="text-sm text-blue-600 hover:underline">Home</Link>
      </header>

      <main className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {existing ? 'Edit your provider profile' : 'Create your provider profile'}
        </h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-600">Business name</span>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="mt-1 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fieldErrors?.businessName && (
              <span className="text-xs text-red-600">{fieldErrors.businessName[0]}</span>
            )}
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fieldErrors?.description && (
              <span className="text-xs text-red-600">{fieldErrors.description[0]}</span>
            )}
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Address</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fieldErrors?.address && (
              <span className="text-xs text-red-600">{fieldErrors.address[0]}</span>
            )}
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">City</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fieldErrors?.city && (
              <span className="text-xs text-red-600">{fieldErrors.city[0]}</span>
            )}
          </label>

          {error && !fieldErrors && (
            <p className="text-red-600 text-sm" role="alert">{error}</p>
          )}
          {savedMessage && (
            <p className="text-green-600 text-sm">{savedMessage}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting
              ? 'Saving…'
              : existing
                ? 'Update profile'
                : 'Create profile'}
          </button>

          {existing && (
            <Link
              to={`/providers/${existing.id}`}
              className="ml-3 text-sm text-blue-600 hover:underline"
            >
              View public page →
            </Link>
          )}
        </form>
      </main>
    </div>
  );
}

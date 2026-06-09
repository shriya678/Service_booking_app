// Signup form. Same shape as LoginPage with an extra `name` field.
// On submit, calls AuthContext.signup() and lands on the home page.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // `error` is the top-level message; `fieldErrors` is the per-field map
  // we get from zod validation (e.g. { password: ["min 8"] }).
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setFieldErrors(null);
    setSubmitting(true);
    try {
      await signup({ name, email, password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
      setFieldErrors(err.details || null);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Sign up</h1>

        <label className="block mb-4">
          <span className="text-sm text-slate-600">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="mt-1 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {fieldErrors?.name && (
            <span className="text-xs text-red-600">{fieldErrors.name[0]}</span>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-sm text-slate-600">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="mt-1 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {fieldErrors?.email && (
            <span className="text-xs text-red-600">{fieldErrors.email[0]}</span>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-sm text-slate-600">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="mt-1 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {fieldErrors?.password && (
            <span className="text-xs text-red-600">{fieldErrors.password[0]}</span>
          )}
        </label>

        {error && !fieldErrors && (
          <p className="text-red-600 text-sm mb-3" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>

        <p className="text-sm text-slate-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

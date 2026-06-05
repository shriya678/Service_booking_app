// Tiny wrapper around fetch that handles base URL + non-2xx responses.
// We'll grow this as the API does — for now, one function.

// import.meta.env.VITE_API_URL is replaced at build time by Vite with whatever
// is in .env. Only env vars prefixed with VITE_ are exposed to the browser.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function getUserCount() {
  const response = await fetch(`${API_URL}/api/users/count`);

  // fetch() does NOT throw on HTTP errors (4xx/5xx) — only on network failure.
  // We have to check response.ok and throw manually so callers can .catch().
  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  return response.json();
}

// Thin wrapper around fetch.
// - Adds base URL from VITE_API_URL.
// - Sends cookies on every request (credentials: 'include').
// - Throws an Error with a useful message on non-2xx responses.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include', // sends the session cookie with every request
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  // 204 No Content has no body to parse.
  if (response.status === 204) return null;

  // Try to parse the body either way — backend returns JSON for errors too.
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = body?.error?.message || `API returned ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.details = body?.error?.details;
    throw err;
  }

  return body;
}

// Public users / health
export function getUserCount() {
  return request('/api/users/count');
}

// Auth
export function signup(data) {
  return request('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) });
}

export function login(data) {
  return request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
}

export function logout() {
  return request('/api/auth/logout', { method: 'POST' });
}

export function getMe() {
  return request('/api/auth/me');
}

// Providers
export function listProviders() {
  return request('/api/providers');
}

export function getProvider(id) {
  return request(`/api/providers/${id}`);
}

export function getMyProvider() {
  return request('/api/providers/me');
}

export function createProvider(data) {
  return request('/api/providers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateMyProvider(data) {
  return request('/api/providers/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// Services
export function createService(data) {
  return request('/api/services', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateService(id, data) {
  return request(`/api/services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteService(id) {
  return request(`/api/services/${id}`, { method: 'DELETE' });
}

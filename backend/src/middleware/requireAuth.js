// Auth gate. Reads the session cookie, verifies the JWT, and attaches
// the user id to req.userId. Routes that need login add this middleware.

import { verifyToken } from '../lib/jwt.js';

function unauthorized(message = 'Not authenticated') {
  const err = new Error(message);
  err.status = 401;
  return err;
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.session;
  if (!token) return next(unauthorized());

  try {
    const payload = verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    next(unauthorized('Invalid or expired session'));
  }
}

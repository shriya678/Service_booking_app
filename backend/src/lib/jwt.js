// JSON Web Token (JWT) helpers.
// We sign a token with a server-only secret. Anyone can read its payload,
// but only someone holding JWT_SECRET can produce a valid signature.
// On every authenticated request, we verify the signature to prove the
// token wasn't forged or tampered with.

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  // Throws on invalid signature / expired / malformed.
  // Callers should catch and treat as "not authenticated".
  return jwt.verify(token, env.JWT_SECRET);
}

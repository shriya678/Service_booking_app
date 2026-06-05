// Password hashing using bcrypt.
// We NEVER store plain-text passwords. We store a one-way hash that's slow
// enough (by design) that brute-forcing it is impractical.

import bcrypt from 'bcrypt';

// Cost factor — higher = slower hash = harder to brute-force.
// 10 takes ~100ms per hash on a modern laptop. Reasonable tradeoff.
const SALT_ROUNDS = 10;

export function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

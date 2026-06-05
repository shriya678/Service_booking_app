// Auth business logic — no req/res in here.
// Services are pure-ish: they read/write DB and throw on errors.
// Routes wrap them and translate to HTTP.

import { prisma } from '../lib/prisma.js';
import { hashPassword, verifyPassword } from '../lib/password.js';

// Public user shape returned to clients. Never include passwordHash.
const PUBLIC_USER_FIELDS = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
};

function httpError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export async function signupUser({ email, password, name }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw httpError('Email already in use', 409);
  }

  const passwordHash = await hashPassword(password);

  return prisma.user.create({
    data: { email, name, passwordHash },
    select: PUBLIC_USER_FIELDS,
  });
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });

  // Generic message for both "no user" and "wrong password" — prevents
  // attackers from probing which emails are registered.
  if (!user) throw httpError('Invalid credentials', 401);

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw httpError('Invalid credentials', 401);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
}

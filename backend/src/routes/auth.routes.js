// Auth routes. Mounted at /api/auth in app.js.
//
// POST /api/auth/signup   — create account + start session
// POST /api/auth/login    — verify password + start session
// POST /api/auth/logout   — clear session cookie
// GET  /api/auth/me       — return current user (requires login)

import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';
import { signupUser, loginUser } from '../services/auth.service.js';
import { signupSchema, loginSchema } from '../validators/auth.schema.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { env } from '../config/env.js';

const router = Router();

const SESSION_COOKIE = 'session';

// httpOnly  → cookie is not readable from JS (immune to XSS theft)
// secure    → only sent over HTTPS in production
// sameSite  → 'lax' allows top-level navigation, blocks most CSRF
// maxAge    → 7 days, matching the JWT lifetime
const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

router.post(
  '/signup',
  validate(signupSchema),
  asyncHandler(async (req, res) => {
    const user = await signupUser(req.body);
    const token = signToken({ sub: user.id });
    res.cookie(SESSION_COOKIE, token, cookieOptions);
    res.status(201).json({ user });
  }),
);

router.post(
  '/login',
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const user = await loginUser(req.body);
    const token = signToken({ sub: user.id });
    res.cookie(SESSION_COOKIE, token, cookieOptions);
    res.json({ user });
  }),
);

router.post('/logout', (req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: '/' });
  res.status(204).end();
});

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }
    res.json({ user });
  }),
);

export default router;

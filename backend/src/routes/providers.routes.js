// Providers routes. Mounted at /api/providers in app.js.
//
// GET    /api/providers     — list all (public)
// GET    /api/providers/me  — get my own profile (auth + role=PROVIDER)
// GET    /api/providers/:id — get one (public)
// POST   /api/providers     — create my profile (auth + role=PROVIDER)
// PATCH  /api/providers/me  — update my profile (auth + role=PROVIDER)
//
// Order matters for GET: /me must come BEFORE /:id, otherwise Express
// matches the wildcard first and tries to look up a provider with id="me".

import { Router } from 'express';
import {
  listProviders,
  getProviderById,
  getProviderByUserId,
  createProviderForUser,
  updateProviderForUser,
} from '../services/provider.service.js';
import {
  createProviderSchema,
  updateProviderSchema,
} from '../validators/provider.schema.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const providers = await listProviders();
    res.json({ providers });
  }),
);

router.get(
  '/me',
  requireAuth,
  requireRole('PROVIDER'),
  asyncHandler(async (req, res) => {
    const provider = await getProviderByUserId(req.userId);
    res.json({ provider });
  }),
);

router.patch(
  '/me',
  requireAuth,
  requireRole('PROVIDER'),
  validate(updateProviderSchema),
  asyncHandler(async (req, res) => {
    const provider = await updateProviderForUser(req.userId, req.body);
    res.json({ provider });
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const provider = await getProviderById(req.params.id);
    res.json({ provider });
  }),
);

router.post(
  '/',
  requireAuth,
  requireRole('PROVIDER'),
  validate(createProviderSchema),
  asyncHandler(async (req, res) => {
    const provider = await createProviderForUser(req.userId, req.body);
    res.status(201).json({ provider });
  }),
);

export default router;

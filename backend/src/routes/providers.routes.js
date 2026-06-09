// Providers routes. Mounted at /api/providers in app.js.
//
// GET    /api/providers     — list all (public)
// GET    /api/providers/:id — get one (public)
// POST   /api/providers     — create my profile (auth + role=PROVIDER)
// PATCH  /api/providers/me  — update my profile (auth + role=PROVIDER)

import { Router } from 'express';
import {
  listProviders,
  getProviderById,
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

// PATCH /me must be registered BEFORE GET /:id only if they shared a method.
// They don't (PATCH vs GET), so order doesn't matter — but listing /me first
// reads better.
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

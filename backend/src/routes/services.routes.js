// Services routes. Mounted at /api/services in app.js.
//
// POST   /api/services      — create a service under my provider
// PATCH  /api/services/:id  — update one I own
// DELETE /api/services/:id  — delete one I own
//
// There's no GET /api/services. Services are nested under their provider —
// callers list mine via GET /api/providers/me and a customer's view via
// GET /api/providers/:id.

import { Router } from 'express';
import {
  createServiceForUser,
  updateServiceForUser,
  deleteServiceForUser,
} from '../services/service.service.js';
import {
  createServiceSchema,
  updateServiceSchema,
} from '../validators/service.schema.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post(
  '/',
  requireAuth,
  requireRole('PROVIDER'),
  validate(createServiceSchema),
  asyncHandler(async (req, res) => {
    const service = await createServiceForUser(req.userId, req.body);
    res.status(201).json({ service });
  }),
);

router.patch(
  '/:id',
  requireAuth,
  requireRole('PROVIDER'),
  validate(updateServiceSchema),
  asyncHandler(async (req, res) => {
    const service = await updateServiceForUser(
      req.userId,
      req.params.id,
      req.body,
    );
    res.json({ service });
  }),
);

router.delete(
  '/:id',
  requireAuth,
  requireRole('PROVIDER'),
  asyncHandler(async (req, res) => {
    await deleteServiceForUser(req.userId, req.params.id);
    res.status(204).end();
  }),
);

export default router;

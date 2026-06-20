// Slot routes. All three routes live in this file even though they use
// different URL prefixes — they share validators, services, and concerns.
//
// GET    /api/services/:serviceId/slots — public list (future slots only)
// POST   /api/services/:serviceId/slots — create one (role=PROVIDER + ownership)
// DELETE /api/slots/:id                 — delete one (role=PROVIDER + ownership)
//
// Mounted at /api in app.js. Express tries other routers (e.g. /api/services)
// first; this router catches what they don't match.

import { Router } from 'express';
import {
  listSlotsForService,
  createSlotForService,
  deleteSlot,
} from '../services/slot.service.js';
import { createSlotSchema } from '../validators/slot.schema.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get(
  '/services/:serviceId/slots',
  asyncHandler(async (req, res) => {
    const slots = await listSlotsForService(req.params.serviceId);
    res.json({ slots });
  }),
);

router.post(
  '/services/:serviceId/slots',
  requireAuth,
  requireRole('PROVIDER'),
  validate(createSlotSchema),
  asyncHandler(async (req, res) => {
    const slot = await createSlotForService(
      req.userId,
      req.params.serviceId,
      req.body,
    );
    res.status(201).json({ slot });
  }),
);

router.delete(
  '/slots/:id',
  requireAuth,
  requireRole('PROVIDER'),
  asyncHandler(async (req, res) => {
    await deleteSlot(req.userId, req.params.id);
    res.status(204).end();
  }),
);

export default router;

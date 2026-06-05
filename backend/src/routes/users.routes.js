// Users routes. For Feature 2, just a count endpoint to prove DB connectivity.
// Mounted at /api/users in app.js.

import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get(
  '/count',
  asyncHandler(async (req, res) => {
    const count = await prisma.user.count();
    res.json({ count });
  }),
);

export default router;

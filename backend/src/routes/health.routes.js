// Health check route — confirms the server is alive.
// Mounted at /api/health in app.js, so GET / here = GET /api/health from outside.

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;

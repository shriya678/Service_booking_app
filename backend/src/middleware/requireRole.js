// Role-based authorization middleware.
// Usage:  router.post('/x', requireAuth, requireRole('PROVIDER'), handler)
//
// Must be placed AFTER requireAuth — it reads req.userId set by requireAuth.
//
// Trade-off: this does one extra DB lookup per protected request. We could
// embed the role in the JWT to skip the lookup, but then stale tokens would
// keep an old role until they expire. Live lookup is safer; we'll optimize
// if it ever shows up in a profile.

import { prisma } from '../lib/prisma.js';

export function requireRole(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { id: true, role: true },
      });

      if (!user) {
        const err = new Error('User not found');
        err.status = 401;
        return next(err);
      }

      if (!allowedRoles.includes(user.role)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
      }

      // Attach for downstream handlers that need the role
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
}

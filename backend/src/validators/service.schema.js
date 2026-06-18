// Zod schemas for the services endpoints.

import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  // Smallest unit (paisa for INR). 10,000,000 paisa = ₹1,00,000 — generous ceiling.
  priceCents: z.number().int().nonnegative().max(10_000_000),
  // 12 hours max. Enough for almost any single appointment.
  durationMinutes: z.number().int().positive().max(720),
});

// PATCH lets the client send any subset, plus toggle the active flag.
export const updateServiceSchema = createServiceSchema
  .partial()
  .extend({
    active: z.boolean().optional(),
  });

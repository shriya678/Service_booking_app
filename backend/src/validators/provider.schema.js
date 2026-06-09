// Zod schemas for the providers endpoints.

import { z } from 'zod';

export const createProviderSchema = z.object({
  businessName: z.string().min(1).max(120),
  description: z.string().max(1000).optional(),
  address: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
});

// PATCH lets the client send any subset of fields.
// .partial() turns every property into an optional one.
export const updateProviderSchema = createProviderSchema.partial();

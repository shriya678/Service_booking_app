// Zod schema for slot creation.
// z.coerce.date() accepts an ISO string from JSON and converts to a Date object
// before the handler runs — saves us from `new Date(req.body.startsAt)` everywhere.

import { z } from 'zod';

export const createSlotSchema = z.object({
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
});

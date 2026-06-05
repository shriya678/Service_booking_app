// Single shared PrismaClient instance for the whole app.
// Creating multiple instances opens multiple DB connection pools — bad.
// Import this everywhere instead of calling `new PrismaClient()` ad hoc.

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

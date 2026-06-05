// Builds the Express app: registers middleware and routes.
// Exported WITHOUT calling .listen() so tests can import it directly
// (supertest will spin it up in-memory later).

import express from 'express';
import healthRoutes from './routes/health.routes.js';
import usersRoutes from './routes/users.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

// Parses JSON request bodies into req.body
app.use(express.json());

// Mount route modules under their URL prefixes
app.use('/api/health', healthRoutes);
app.use('/api/users', usersRoutes);

// Error handler must be LAST — Express runs middleware in order,
// so this only catches errors after routes have had a chance.
app.use(errorHandler);

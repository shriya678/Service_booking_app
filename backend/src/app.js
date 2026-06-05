// Builds the Express app: registers middleware and routes.
// Exported WITHOUT calling .listen() so tests can import it directly
// (supertest will spin it up in-memory later).

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import healthRoutes from './routes/health.routes.js';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { env } from './config/env.js';

export const app = express();

// CORS — allow our frontend dev server (and later, the deployed frontend)
// to call this API from a different origin. Must be registered before routes.
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));

// Parses JSON request bodies into req.body
app.use(express.json());

// Parses cookies from the Cookie header into req.cookies
app.use(cookieParser());

// Mount route modules under their URL prefixes
app.use('/api/health', healthRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// Error handler must be LAST — Express runs middleware in order,
// so this only catches errors after routes have had a chance.
app.use(errorHandler);

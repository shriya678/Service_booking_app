// Entry point. Imports the configured Express app and starts listening.
// Kept tiny on purpose — anything reusable goes in app.js.

import { app } from './app.js';
import { env } from './config/env.js';

app.listen(env.PORT, () => {
  console.log(`[server] listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

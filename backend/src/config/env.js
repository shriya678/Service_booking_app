// Loads variables from .env into process.env, then exports a typed object
// so the rest of the app reads `env.PORT` instead of `process.env.PORT`.
// Single source of truth — easier to validate and refactor later.

import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var: ${name}. Did you copy .env.example to .env?`,
    );
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT) || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: required('DATABASE_URL'),
};

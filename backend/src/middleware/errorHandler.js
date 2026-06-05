// Express error-handling middleware.
// Recognised by Express because it has FOUR arguments (err, req, res, next).
// Anything thrown or passed to next(err) in a route lands here.

export function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const body = {
    error: {
      message: err.message || 'Internal server error',
    },
  };
  // Field-level validation details (set by validate() middleware).
  if (err.details) body.error.details = err.details;

  res.status(status).json(body);
}

// Express error-handling middleware.
// Recognised by Express because it has FOUR arguments (err, req, res, next).
// Anything thrown or passed to next(err) in a route lands here.

export function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal server error',
    },
  });
}

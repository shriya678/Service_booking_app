// Express 4 doesn't catch rejections from async route handlers automatically.
// Without this wrapper, `throw` (or a rejected `await`) inside an async route
// becomes an unhandled promise rejection — our errorHandler never sees it.
//
// Usage:
//   router.get('/x', asyncHandler(async (req, res) => { ... }));

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

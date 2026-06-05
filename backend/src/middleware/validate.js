// Generic validation middleware. Pass a zod schema; it parses req.body.
// If valid, req.body is replaced with the parsed (and possibly coerced) data
// and control passes to the next handler.
// If invalid, hands a 400 error to the errorHandler with field-level details.

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = result.error.flatten().fieldErrors;
      return next(err);
    }
    req.body = result.data;
    next();
  };
}

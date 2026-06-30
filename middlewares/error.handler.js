export function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

export function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
}

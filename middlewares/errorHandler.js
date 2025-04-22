function errorHandler(err, req, res, next) {
  let statusCode = err.status || 500;
  let messageStatus = err.message || "Internal Server Error";

  res.status(statusCode).json({ message: messageStatus });
}

module.exports = errorHandler;

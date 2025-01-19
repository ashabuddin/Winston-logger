const setCorrelationId = (req, res, next) => {
  const key = "x-correlation-id";
  const correlationId = req.headers[key] || Date.now().toString();
  req.headers[key] = correlationId;
  res.set(key, correlationId);
  next();
};
module.exports = setCorrelationId;

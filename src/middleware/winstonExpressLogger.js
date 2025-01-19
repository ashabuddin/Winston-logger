const winstonExpressLogger = require("express-winston");
const logger = require("../utils/logger");
const { level } = require("winston");

const expressWinstonLogger = (level) => {
  return winstonExpressLogger.logger({
    level: level || "http",
    winstonInstance: logger,
    meta: true,
    msg: "HTTP  {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    expressFormat: true,
    colorize: false,
  });
};
const expressWinstonInfoLogger = expressWinstonLogger("error");
const expressWinstonErrorLogger = expressWinstonLogger("error");

module.exports = {
  expressWinstonErrorLogger,
  expressWinstonInfoLogger,
};

require("winston-daily-rotate-file");
const { format, transports } = require("winston");
const { colorize, json, timestamp, combine } = format;
const { ElasticsearchTransport } = require("winston-elasticsearch");

//Elk transports
const elasticsearchTransport = new ElasticsearchTransport({
  level: "http",
  clientOpts: {
    node: "http://localhost:9200",
  },
  indexPrefix: "logs-express",
  indexSuffixPattern: "YYYY-MM-DD",
});

//Console
const consoleTransport = new transports.Console({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
});

//File Transports
const fileTransport = (level, filename) => {
  return new transports.DailyRotateFile({
    level: level || "info",
    format: combine(timestamp(), json()),
    filename: filename || "info-%DATE%.log",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  });
};
const infoFileTransport = fileTransport("info", "logs/info/info-%DATE%.log");
const errorFileTransport = fileTransport(
  "error",
  "logs/error/error-%DATE%.log"
);

module.exports = {
  infoFileTransport,
  errorFileTransport,
  consoleTransport,
  elasticsearchTransport,
};

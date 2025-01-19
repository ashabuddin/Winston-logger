require("winston-daily-rotate-file");
const { createLogger } = require("winston");
// const { colorize, json, timestamp, combine } = format;

const {
  infoFileTransport,
  errorFileTransport,
  consoleTransport,
  elasticsearchTransport,
} = require("./transport");

const logger = createLogger({
  transports: [
    consoleTransport,
    infoFileTransport,
    errorFileTransport,
    elasticsearchTransport,
  ],
});

//Winston Rotate File

// // fired when a log file is created
// fileTransport().on('new', (filename) => {});
// // fired when a log file is rotated
// fileTransport().on('rotate', (oldFilename, newFilename) => {});
// // fired when a log file is archived
// fileTransport().on('archive', (zipFilename) => {});
// // fired when a log file is deleted
// fileTransport().on('logRemoved', (removedFilename) => {});

module.exports = logger;

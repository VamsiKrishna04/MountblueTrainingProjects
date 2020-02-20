// To put configuration for winston

// Import winston methods
// Import format, trnsports
const { createLogger, format, transports } = require('winston');

// Recieve object as parameter
module.exports = createLogger({
  // format.simple To make it more readable
  // Configure format for both loggers to console
  format: format.combine(format.simple(),
    format.timestamp(),
    format.printf((info) => `[${info.timestamp}] ${info.message} ${info.level}`)),
  transports: [
    // Transport for configure the well
    new transports.File({
      // Recieve an object as parameter
      // Max size in bytes => 5mb
      maxsize: 5120000,
      // When already 5 files r there elimiated
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    // Transport to configure our console place
    new transports.Console({
      level: 'debug',
      // Console format changed
    }),
  ],
});

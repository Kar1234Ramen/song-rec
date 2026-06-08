import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "song-backend" },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      level: "error",
      dirname: "logs",
      filename: "error.log",
    }),

    new winston.transports.File({
      level: "info",
      dirname: "logs",
      filename: "combined.log",
    }),

    new winston.transports.Console({
      level: "info",
    }),
  ],
});

export default logger;

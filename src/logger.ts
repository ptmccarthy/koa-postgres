import * as winston from 'winston';
import { existsSync, mkdirSync } from 'fs';

const LOGDIR = 'log';

if (!existsSync(LOGDIR)) {
  mkdirSync(LOGDIR);
}

const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'info',
  transports: [
    new winston.transports.File({ filename: `${LOGDIR}/server.log` }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;

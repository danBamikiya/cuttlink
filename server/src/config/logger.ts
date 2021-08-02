import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'
import { SENTRY_DSN } from './common'
import logLevel from '../utils/logLevel'

const logger = winston.createLogger({
  level: logLevel(),
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize()
  ),
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
    new Sentry({
      sentry: {
        dsn: SENTRY_DSN
      },
      handleExceptions: true
    })
  ]
})

export default logger

import { Router } from 'express'
import winston from 'winston'
import expressWinston from 'express-winston'
import Sentry from 'winston-transport-sentry-node'
import { SENTRY_DSN } from '../config/common'

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  return env === 'development' ? 'debug' : 'warn'
}

const handleLogging = (router: Router) =>
  router.use(
    expressWinston.logger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize({ all: true }),
        winston.format.json(),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      level: level(),
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
  )

export default handleLogging

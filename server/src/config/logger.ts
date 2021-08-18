import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'
import { SENTRY_DSN } from './common'
import { logLevel, logLevels } from '../utils/logLevel'

winston.addColors(logLevels.colors)

const logger = winston.createLogger({
  levels: logLevels.levels,
  level: logLevel(),
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => {
      return (
        Object.keys(info)
          .reverse()
          .reduce((acc, key, i) => {
            if (typeof key === 'string') {
              if (i > 0) acc += ', '
              acc += `"${key}": "${info[key]}"`
            }

            return acc
          }, '{ ') + ' }'
      )
    })
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

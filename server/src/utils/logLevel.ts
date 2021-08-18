/**
 * @desc
 * Only log levels less than or equal to this level.
 */
const logLevel = () => {
  const env = process.env.NODE_ENV || 'development'
  return env === 'development' ? 'debug' : 'warn'
}

/**
 * @desc
 * Levels (and colors) representing log priorities.
 */
const logLevels = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warn: 4,
    notice: 5,
    info: 6,
    debug: 7
  },
  colors: {
    emerg: 'bold red',
    alert: 'bold yellow',
    crit: 'bold red',
    error: 'bold red',
    warn: 'bold red',
    notice: 'yellow',
    info: 'green',
    debug: 'blue'
  }
}

export { logLevel, logLevels }

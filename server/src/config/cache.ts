import redis from 'redis'
import logger from './logger'
import { InitOptions } from '../types'
import { REDIS_BASE_URL as REDIS_URL } from './common'
import { redisError } from '../utils/ErrorHandlers'

// Maximum delay between reconnection attempts after backoff
const maxReconnectDelay = 5000

const createRedisClient = (options: InitOptions = {}) => {
  const { url, name } = options

  // If redis url is not provided, bail out
  if (!url) return

  let pingInterval: NodeJS.Timeout
  function stopPinging() {
    pingInterval && clearInterval(pingInterval)
  }

  // Create the client
  const client = redis.createClient({
    url: url,
    // Any running command that is unfulfilled when a connection is lost should
    // NOT be retried after the connection has been reestablished.
    retry_unfulfilled_commands: false,
    // If we failed to send a new command during a disconnection, do NOT
    // enqueue it to send later after the connection has been [re-]established.
    enable_offline_queue: false,
    // This timeout value will be applied to both the initial connection
    // and any auto-reconnect attempts (if the `retry_strategy` option is
    // provided). If not using the `retry_strategy` option, this value can be
    // set to a very low number. If using the `retry_strategy` option to allow
    // more than one reconnection attempt, this value must be set to a higher
    // number. Defaults to 1 hour if not configured
    connect_timeout: 60 * 60 * 1000, // 60 minutes
    retry_strategy: function ({
      attempt,
      error,
      total_retry_time: totalRetryTime,
      times_connected: timesConnected
    }) {
      let delayPerAttempt = 100

      // If the server appears to unavailable, slow down faster
      if (
        error &&
        (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND')
      ) {
        delayPerAttempt *= 5
      }

      // Reconnect after delay
      return Math.min(attempt * delayPerAttempt, maxReconnectDelay)
    }
  })

  // If a `name` was provided, use it in the infix for logging event messages
  const clientName = name ? `(${name})` : ''

  client.on('connect', () => {
    logger.info({ message: `Redis client ${clientName} connected` })
    // Stop pinging the Redis server, if the timer already exists
    stopPinging()

    // Start pinging the server once per minute to prevent Redis connection
    // from closing when its idle `timeout` configuration value expires
    pingInterval = setInterval(() => {
      client.ping(() => {})
    }, 60 * 1000)
  })

  // Handle connection errors to prevent killing the Nodejs process
  client.on('error', connectError => {
    try {
      // Forcibly close the connection to the Redis server
      // Allow all still running commands to silently fail immediately
      client.end(false)
    } catch (disconnectError) {
      // Swallow any failure
    }

    // Also, stop pinging the Redis server
    stopPinging()
    logger.error({ message: redisError(connectError, clientName) })
  })

  client.on('end', () => {
    // Stop pinging the Redis server
    stopPinging()
    logger.debug({ message: `Redis client ${clientName} connection closed` })
  })

  client.on('ready', () => {
    logger.info({
      message: `Redis client ${clientName} ready to recieve commands`
    })
  })

  client.on('warning', msg => {
    logger.warn({ message: `Redis client ${clientName} warning: ${msg}` })
  })

  client.on(
    'reconnecting',
    ({
      attempt,
      delay,
      error,
      total_retry_time: totalRetryTime,
      times_connected: timesConnected
    }) => {
      logger.alert({
        message: `Redis client ${clientName} reconnecting, attempt ${attempt}, with ${delay} delay, due to ${redisError(
          error
        )}. Elapsed time: ${totalRetryTime}. Successful connections: ${timesConnected}.`
      })
    }
  )

  return client
}

const redisClient = createRedisClient({ url: REDIS_URL, name: 'node-js' })

export { createRedisClient, redisClient }

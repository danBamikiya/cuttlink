import redis from 'redis'
import logger from './logger'
import { REDIS_BASE_URL } from '../config/common'

const { REDIS_URL = REDIS_BASE_URL } = process.env

const redisClient = redis.createClient({
  url: REDIS_URL
})

const init = async () =>
  new Promise((resolve, reject) => {
    redisClient.on('connect', () => {
      logger.info({ message: 'Redis client connected' })
      resolve(redisClient)
      logger.info({ message: 'Redis client resolved' })
    })

    redisClient.on('error', error => reject(error))
  })

export { init, redisClient }

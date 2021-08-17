import express, { Router } from 'express'
import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import helmet from 'helmet'
import { redisClient } from '../config/cache'
import { HTTP429Error } from '../utils/httpErrors'

const isProduction = process.env.NODE_ENV === 'production'
const EXPIRES_IN_AS_SECONDS = 3 * 60

const handleRateLimit = (router: Router) => {
  const limit = rateLimit({
    // 3 mins in `ms` (or practically unlimited outside production)
    windowMs: isProduction ? EXPIRES_IN_AS_SECONDS * 1000 : 1,
    max: 100, // limit each IP to 100 requests per windowMs
    handler: () => {
      throw new HTTP429Error(
        'Too many requests from this IP, please try again after 3 minutes.'
      )
    },
    // the storage to use when persisting rate limit attempts
    store: new RedisStore({
      client: redisClient,
      // 3 mins in `s` (or practically unlimited outside production)
      expiry: isProduction ? EXPIRES_IN_AS_SECONDS : 1,
      prefix: 'rl:',
      // @ts-ignore
      // If Redis is not connected, let the request succeed as failover
      passIfNotConnected: true
    })
  })

  router.use(limit)
}

const handleJSONBodyLimit = (router: Router) =>
  router.use(express.json({ limit: '10kb' })) // limit body to 10kb

const handleHTTPHeaders = (router: Router) => router.use(helmet())

export { handleRateLimit, handleJSONBodyLimit, handleHTTPHeaders }

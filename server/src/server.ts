import http from 'http'
import express from 'express'
import { applyMiddlewares, applyRoutes } from './utils'
import middleware from './middlewares'
import errorHandlers from './middlewares/errorHandlers'
import routes from './services'
import initDependencies from './config'
import logger from './config/logger'

process.on('uncaughtException', e => {
  logger.error({
    message: 'uncaughtException',
    extra: e
  })
  process.exit(1)
})

process.on('unhandledRejection', e => {
  logger.error({
    message: 'unhandledRejection',
    extra: e
  })
  process.exit(1)
})

const router = express()
applyMiddlewares(middleware, router)
applyRoutes(routes, router)
applyMiddlewares(errorHandlers, router)

const { PORT = 3000 } = process.env
const server = http.createServer(router)

async function start() {
  await initDependencies()
  server.listen(PORT, () =>
    logger.info({
      message: `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}...`
    })
  )
}

start()

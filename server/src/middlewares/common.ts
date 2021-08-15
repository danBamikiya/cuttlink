import { Router, json, urlencoded } from 'express'
import compression from 'compression'
import cors from 'cors'

const handleCors = (router: Router) =>
  router.use(
    cors({ credentials: true, methods: [ 'GET', 'POST' ], origin: true })
  )

const handleBodyRequestParsing = (router: Router) => {
  router.use(urlencoded({ extended: true }))
  router.use(json())
}

// compress all responses
export const handleCompression = (router: Router) => {
  router.use(compression())
}

export { handleCors, handleBodyRequestParsing }

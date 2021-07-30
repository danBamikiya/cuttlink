import { Router, json, urlencoded } from 'express'
import cors from 'cors'

const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }))

const handleBodyRequestParsing = (router: Router) => {
  router.use(urlencoded({ extended: true }))
  router.use(json())
}

export { handleCors, handleBodyRequestParsing }

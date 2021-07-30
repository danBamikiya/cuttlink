import { Router } from 'express'
import helmet from 'helmet'

const handleHTTPHeaders = (router: Router) => router.use(helmet())

export default handleHTTPHeaders

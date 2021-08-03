import { join } from 'path'
process.env.NODE_CONFIG_DIR = join(__dirname, '../../src/config/')
// eslint-disable-next-line import/first
import config from 'config'

const PORT: string = config.get('SERVER.PORT')
const HOST: string = config.get('SERVER.HOST')
const BASE_URL: string = config.get('BASE_URL')
const API_URL: string = config.get('SERVER.API_URL')
const SENTRY_DSN: string = config.get('SENTRY_DSN')
const REDIS_BASE_URL: string = config.get('REDIS.BASE_URL')

export { HOST, PORT, BASE_URL, SENTRY_DSN, REDIS_BASE_URL, API_URL }

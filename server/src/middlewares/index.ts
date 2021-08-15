import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from './common'

import {
  handleRateLimit,
  handleJSONBodyLimit,
  handleHTTPHeaders
} from './security'

import handleLogging from './logging'

export default [
  handleCors,
  handleBodyRequestParsing,
  handleJSONBodyLimit,
  handleHTTPHeaders,
  handleLogging,
  handleCompression,
  handleRateLimit
]

import { handleCors, handleBodyRequestParsing } from './common'

import handleHTTPHeaders from './security'

import handleLogging from './logging'

export default [
  handleCors,
  handleBodyRequestParsing,
  handleHTTPHeaders,
  handleLogging
]

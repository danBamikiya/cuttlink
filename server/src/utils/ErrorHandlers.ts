import { Response, NextFunction } from 'express'
import { HTTPClientError, HTTP404Error } from './httpErrors'
import logger from '../config/logger'
import { ErrorWithCode } from '../types'

const notFoundError = () => {
  if (process.env.NODE_ENV === 'production') {
    throw new HTTP404Error('Method Not found.')
  } else {
    throw new HTTP404Error('Invalid Method. Please Check Your Request.')
  }
}

const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    const { message, statusCode } = err
    logger.debug({ message })

    const response = {
      status: statusCode,
      message: message
    }
    res.status(statusCode).send(response)
  } else {
    next(err)
  }
}

const serverError = (err: Error, res: Response, next: NextFunction) => {
  const { stack, message } = err
  logger.error({ message, stack })

  const response = {
    status: 500,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error ☹☹☹'
        : stack
  }

  res.status(500).send(response)
}

const redisError = (error: ErrorWithCode, clientName?: string) => {
  const errorCode = error ? error.code : null
  const errorName = error ? error.constructor.name : 'Server disconnection'
  const errorMsg = error
    ? error.toString()
    : 'unknown (commonly a server idle timeout)'
  const preamble =
    errorName +
    `${clientName ?? ''}` +
    (errorCode ? ` with code "${errorCode}"` : '')
  return preamble + ': ' + errorMsg
}

export { notFoundError, clientError, serverError, redisError }

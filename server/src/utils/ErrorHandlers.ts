import { Response, NextFunction } from 'express'
import { HTTPClientError, HTTP404Error } from './httpErrors'
import logger from '../config/logger'

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
    logger.warn({ message })

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
  logger.error({ message })

  const response = {
    status: 500,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error ☹☹☹'
        : stack
  }

  res.status(500).send(response)
}

export { notFoundError, clientError, serverError }

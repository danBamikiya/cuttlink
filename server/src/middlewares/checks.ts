import { Request, Response, NextFunction } from 'express'
import { HTTP400Error, HTTP413Error } from '../utils/httpErrors'

const checkShortenedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url } = req.params

  if (!url?.trim()) {
    throw new HTTP400Error('Missing URL parameter')
  } else if (/[a-zA-Z]/.test(url) && /\d/.test(url)) {
    next()
  } else {
    throw new HTTP400Error('Invalid URL parameter')
  }
}

const checkShortenerParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url } = req.body

  if (!url) {
    throw new HTTP400Error('Missing URL parameter')
  } else if (url.length >= 500) {
    throw new HTTP413Error('URL parameter too long')
  } else {
    next()
  }
}

export { checkShortenerParams, checkShortenedRoute }

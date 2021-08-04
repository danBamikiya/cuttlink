import { Request, Response, NextFunction } from 'express'
import { HTTP400Error, HTTP413Error } from '../utils/httpErrors'

const checkShortenedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { urlCode } = req.params

  if (!urlCode?.trim()) {
    throw new HTTP400Error('Missing URL parameter')
  } else if (
    (/[a-zA-Z]/.test(urlCode) || /\d/.test(urlCode)) &&
    urlCode.length === 7
  ) {
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

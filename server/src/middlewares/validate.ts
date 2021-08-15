import { Request, Response, NextFunction } from 'express'
import { HTTP400Error } from '../utils/httpErrors'
import validUrl from 'valid-url'

const validate = async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body

  try {
    if (validUrl.isUri(url)) {
      next()
    } else {
      throw new HTTP400Error('Invalid URL parameter')
    }
  } catch (error) {
    next(error)
  }
}

export default validate

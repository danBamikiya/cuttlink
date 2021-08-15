import { Request, Response, NextFunction } from 'express'
import getShortenedURL from './ShortenController'
import {
  checkShortenerParams,
  checkShortenedRoute
} from '../../middlewares/checks'
import validate from '../../middlewares/validate'
import getFromCache from '../../middlewares/caching'
import { HTTP404Error } from '../../utils/httpErrors'
import { BASE_URL } from '../../config/common'

export default [
  {
    path: '/:urlCode',
    method: 'get',
    handler: [
      checkShortenedRoute,
      async ({ params }: Request, res: Response, next: NextFunction) => {
        const { urlCode } = params
        try {
          const result = await getFromCache(urlCode)
          if (result) {
            const response = {
              status: 200,
              message: {
                long_url: result,
                short_url: `${BASE_URL}/${urlCode}`
              }
            }

            res.status(200).send(response)
          } else {
            throw new HTTP404Error('Invalid url')
          }
        } catch (error) {
          next(error)
        }
      }
    ]
  },
  {
    path: '/shortn',
    method: 'post',
    handler: [
      checkShortenerParams,
      validate,
      async ({ body }: Request, res: Response) => {
        const longUrl = body.url
        const result = await getShortenedURL(longUrl as string)

        const response = {
          status: 200,
          message: {
            long_url: longUrl,
            short_url: `${BASE_URL}/${result}`
          }
        }
        res.status(200).send(response)
      }
    ]
  }
]

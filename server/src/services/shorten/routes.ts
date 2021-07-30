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
    path: '/:url',
    method: 'get',
    handler: [
      checkShortenedRoute,
      async ({ params }: Request, res: Response, next: NextFunction) => {
        const { url } = params
        try {
          const result = await getFromCache(url)
          result
            ? res.status(200).send(result)
            : (() => {
                throw new HTTP404Error('Invalid url')
              })()
        } catch (error) {
          next(error)
        }
      }
    ]
  },
  {
    path: '/api/url',
    method: 'post',
    handler: [
      checkShortenerParams,
      validate,
      async ({ body }: Request, res: Response) => {
        const result = await getShortenedURL(body.url as string)
        res.status(200).send(`${BASE_URL}/${result}`)
      }
    ]
  }
]

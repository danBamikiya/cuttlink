import { Request, Response, NextFunction } from 'express'
// import * as yup from 'yup';
import { HTTP400Error } from '../utils/httpErrors'
import validUrl from 'valid-url'

const validate = async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body

  try {
    // await schema.validate({ url });
    if (validUrl.isUri(url)) {
      next()
    } else {
      throw new HTTP400Error('Invalid URL parameter')
    }
  } catch (error) {
    next(error)
  }
}

// const schema = yup.object().shape({
// 	//   name: yup.string().trim().required(),
// 	longUrl: yup.string().trim().url()
// 	// shortUrl: yup.string().trim().url()
// 	//   createdOn: yup.date().default(() => new Date())
// });

export default validate

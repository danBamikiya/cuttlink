import { customAlphabet } from 'nanoid/async'
import { redisClient } from '../../config/cache'

export default async function getShortenedURL(url: string) {
  const nanoid = customAlphabet(
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ',
    7
  )
  const urlCode = await nanoid()
  redisClient.setex(urlCode, 3600, url)
  return urlCode
}

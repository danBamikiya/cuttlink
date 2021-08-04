import { Random } from '../../utils/hash'
import { redisClient } from '../../config/cache'

export default async function getShortenedURL(url: string) {
  const random = new Random()
  const urlCode = random.randomsum()

  redisClient.setex(urlCode, 3600, url)
  return urlCode
}

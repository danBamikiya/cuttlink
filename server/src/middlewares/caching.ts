import { promisify } from 'util'
import { redisClient } from '../config/cache'

const getAsync = promisify(redisClient.get).bind(redisClient)

export default async function getFromCache(key: string) {
  const data = await getAsync(key)
  return data
}

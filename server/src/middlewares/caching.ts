import { promisify } from 'util'
import { redisClient } from '../config/cache'

// @ts-ignore
const getAsync = promisify(redisClient.getex).bind(redisClient)

export default async function getFromCache(key: string) {
  const data = await getAsync(key, 'EX', 3600)
  return data
}

import { MD5 } from '../../utils/hash'
import { redisClient } from '../../config/cache'

/**
 * Takes in an hash e.g 'E19C8AE' then randomly selects an alphabet and lowercases it e.g 'E19C8aE'.
 */
const randomLowerCasedStr = (str: string): string | undefined => {
  // Check if the string contains an alphabet
  if (str.match(/[A-Z]/g)!.length !== 0) {
    let count = 0
    let newStr
    let i = 0
    /**
     * The random count of the alphabet its going to turn to lowercase
     * The random number shouldn't be more than the number of alphabetic characters the string contains
     * E.g The string contains: ["E", "C", "A", "E"], then it selects the random count 2 so 'A' will be converted to 'a'
     */
    const randomCount = Math.floor(Math.random() * str.match(/[A-Z]/g)!.length)

    for (i; i < str.length; i++) {
      // @ts-ignore
      if (isNaN(str[i])) {
        if (count === randomCount) {
          newStr =
            str.substring(0, i) + str[i].toLowerCase() + str.substring(i + 1)
          return newStr
        } else {
          count++
        }
      }
    }
  } else {
    return undefined
  }
}

export default async function getShortenedURL(url: string) {
  const hash = new MD5(url)
  const shortHash = hash.hashsum().substr(0, 7).toUpperCase() //  e.g: 'E19C8AE'
  // Try to randomly lowercase an alphabet from the hash
  const urlCode = randomLowerCasedStr(shortHash) ?? shortHash

  redisClient.setex(urlCode, 3600, url)
  return urlCode
}

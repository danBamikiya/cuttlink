export const getRedirectUrl = (shortUrl: string): string => {
  if (shortUrl.includes('localhost')) {
    const url = new URL(shortUrl)
    url.port = '4200'
    return url.toString()
  }
  return shortUrl
}

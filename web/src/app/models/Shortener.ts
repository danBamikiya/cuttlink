interface ShortenerMsg {
  long_url: string
  short_url: string
}

interface Response {
  status: number
  message: ShortenerMsg
}

interface Url {
  url: string
}

export { Url, Response, ShortenerMsg }

import { BinaryLike, createHash, randomBytes } from 'crypto'

abstract class Hash<T> {
  readonly data: BinaryLike
  readonly name: string

  constructor(name: string, data: T) {
    this.data = data as unknown as BinaryLike
    this.name = name
  }

  public hashsum(): string {
    return createHash(this.name).update(this.data).digest('hex')
  }
}

class MD5<T> extends Hash<T> {
  constructor(data: T) {
    super('md5', data)
  }
}

class SHA1<T> extends Hash<T> {
  constructor(data: T) {
    super('sha1', data)
  }
}

class SHA256<T> extends Hash<T> {
  constructor(data: T) {
    super('sha256', data)
  }
}

class Random {
  private readonly chars: string
  private randomBytes!: Buffer

  constructor() {
    this.chars =
      '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ'
  }

  public randomsum(length = 7): string {
    this.randomBytes = randomBytes(length)
    let random = ''

    for (let i = 0; i < length; i++) {
      random += this.chars.charAt(this.randomBytes[i] % this.chars.length)
    }

    return random
  }
}

export { MD5, SHA1, SHA256, Random }

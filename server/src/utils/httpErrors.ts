abstract class HTTPClientError extends Error {
  readonly statusCode!: number
  readonly name!: string

  constructor(message: object | string) {
    super(message instanceof Object ? JSON.stringify(message) : message)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400

  constructor(message: string | object = 'Bad Request') {
    super(message)
  }
}

class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401

  constructor(message: string | object = 'Unauthorized') {
    super(message)
  }
}

class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403

  constructor(message: string | object = 'Forbidden') {
    super(message)
  }
}

class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404

  constructor(message: string | object = 'Not found') {
    super(message)
  }
}

class HTTP413Error extends HTTPClientError {
  readonly statusCode = 413

  constructor(message: string | object = 'Request Entity Too Large') {
    super(message)
  }
}

export {
  HTTPClientError,
  HTTP400Error,
  HTTP401Error,
  HTTP403Error,
  HTTP404Error,
  HTTP413Error
}

import { Router, Request, Response, NextFunction } from 'express'

interface Wrapper {
  (router: Router): void
}

interface Handler {
  (req: Request, res: Response, next: NextFunction): Promise<void> | void
}

interface Route {
  path: string
  method: string
  handler: Handler | Handler[]
}

interface ErrorWithCode extends Error {
  code?: string
}

type InitOptions = {
  url?: string
  name?: string
}

export { Wrapper, Route, ErrorWithCode, InitOptions }

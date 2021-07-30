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

export { Wrapper, Route }

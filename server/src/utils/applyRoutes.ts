import { Route } from '../types'
import { Router } from 'express'

const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route
    ;(router as any)[method](path, handler)
  }
}

export default applyRoutes

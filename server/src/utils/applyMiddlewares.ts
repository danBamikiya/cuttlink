import { Wrapper } from '../types'
import { Router } from 'express'

const applyMiddlewares = (middlewareWrappers: Wrapper[], router: Router) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router)
  }
}

export default applyMiddlewares

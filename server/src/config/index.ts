import { init as initCache } from './cache'

export default async function initDependencies() {
  await initCache()
}

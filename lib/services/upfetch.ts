import { up } from 'up-fetch'
import { getServerUrl } from '../utils/server-url'

export const upfetch = up(fetch, () => {
  return {
    baseURL: `${getServerUrl()}/api`,
    headers: {
      accept: 'application/json'
    }
  }
})

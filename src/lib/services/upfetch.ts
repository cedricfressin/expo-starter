import { up } from 'up-fetch'

export const upfetch = up(fetch, () => ({
  baseUrl: '/api',
  headers: {
    accept: 'application/json'
  }
}))

import { up } from 'up-fetch'

export const upfetch = up(fetch, () => ({
  baseUrl: '/api',
  headers: {
    accept: 'application/json'
  }
}))

// Add also any of the following:
// - auth token interceptor (Authorization header from secure store)
// - 401 response interceptor for automatic token refresh
// - centralized error handling (toast for 5xx, throw for 4xx)

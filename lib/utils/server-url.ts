declare const window: { location: { origin: string } } | undefined

/**
 * Returns the base URL for the current environment.
 */
export function getServerUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // If we are in production, return the production URL.
  if (process.env.NODE_ENV === 'production') {
    return 'https://{production_url}'
  }

  // If we are in development, return the localhost URL
  return 'http://localhost:8081'
}

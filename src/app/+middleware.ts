// Middleware function that runs on every request.
// https://docs.expo.dev/router/web/middleware/#enable-server-middleware-in-your-app-configuration

import type { ImmutableRequest } from 'expo-server'

export default async function middleware(request: ImmutableRequest) {
  const { host, pathname } = new URL(request.url)

  // If the request is for the app domain or the app path, redirect to the app group
  if (host.includes('{production_url}') || pathname.startsWith('/app')) {
    return Response.redirect(new URL('/(app)', request.url), 302)
  }
}

import { PortalHost } from '@rn-primitives/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { Toaster } from '~/lib/services/toaster'

// Create a query client instance
const queryClient = new QueryClient()

// React Query Devtools are only available on web in development mode
const hasReactQueryDevtools =
  Platform.OS === 'web' && process.env.NODE_ENV === 'development'

// Lazy load the React Query Devtools
const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then(({ ReactQueryDevtools }) => ({
    default: ReactQueryDevtools
  }))
)

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <PortalHost />
      <Toaster position="top-center" />
      {hasReactQueryDevtools && (
        <Suspense>
          <ReactQueryDevtools />
        </Suspense>
      )}
    </QueryClientProvider>
  )
}

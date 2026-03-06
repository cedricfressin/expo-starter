import { PortalHost } from '@rn-primitives/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { lazy, Suspense } from 'react'
import { Platform } from 'react-native'
import { Toaster } from '~/lib/services/toaster'

// Create a query client instance
const queryClient = new QueryClient()

// React Query Devtools: __DEV__ is statically replaced by Metro,
// ensuring the dynamic import is completely eliminated in production builds
const ReactQueryDevtools =
  __DEV__ && Platform.OS === 'web'
    ? lazy(() =>
        import('@tanstack/react-query-devtools').then(
          ({ ReactQueryDevtools }) => ({
            default: ReactQueryDevtools
          })
        )
      )
    : null

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <PortalHost />
      <Toaster position="top-center" />
      {ReactQueryDevtools && (
        <Suspense>
          <ReactQueryDevtools />
        </Suspense>
      )}
    </QueryClientProvider>
  )
}

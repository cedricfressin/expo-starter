import { PortalHost } from '@rn-primitives/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { lazy, Suspense } from 'react'
import { Toaster } from '~/lib/services/toaster'

// Single instance — created once at module scope, never recreated on re-render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1
    }
  }
})

// React Query Devtools: __DEV__ is statically replaced by Metro,
// ensuring the dynamic import is completely eliminated in production builds
const ReactQueryDevtools =
  __DEV__ && process.env.EXPO_OS === 'web'
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

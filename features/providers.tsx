import { ThemeProvider } from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StatusBar } from 'expo-status-bar'
import type { PropsWithChildren } from 'react'
import { Platform } from 'react-native'
import { SafeAreaListener } from 'react-native-safe-area-context'
import { Uniwind, useUniwind } from 'uniwind'
import { Toaster } from '~/lib/services/toaster'
import { navTheme } from '~/lib/theme'

// Create a query client instance
const queryClient = new QueryClient()

// React Query Devtools are only available on web in development mode
const hasReactQueryDevtools =
  Platform.OS === 'web' && process.env.NODE_ENV === 'development'

export function Providers({ children }: PropsWithChildren) {
  const { theme } = useUniwind()

  return (
    <ThemeProvider value={navTheme[theme]}>
      <StatusBar style="auto" />
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets)
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <PortalHost />
          <Toaster position="top-center" />
          {hasReactQueryDevtools && <ReactQueryDevtools />}
        </QueryClientProvider>
      </SafeAreaListener>
    </ThemeProvider>
  )
}

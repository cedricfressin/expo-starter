import { ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import type { PropsWithChildren } from 'react'
import { SafeAreaListener } from 'react-native-safe-area-context'
import { Uniwind, useUniwind } from 'uniwind'
import { navTheme } from '~/lib/theme'

export function RootProviders({ children }: PropsWithChildren) {
  const { theme } = useUniwind()

  return (
    <ThemeProvider value={navTheme[theme]}>
      <StatusBar animated style="auto" />
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets)
        }}
      >
        {children}
      </SafeAreaListener>
    </ThemeProvider>
  )
}

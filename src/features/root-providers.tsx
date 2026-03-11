import { I18nProvider } from '@lingui/react'
import { ThemeProvider } from '@react-navigation/native'
import type { PropsWithChildren } from 'react'
import { SafeAreaListener } from 'react-native-safe-area-context'
import { Uniwind, useUniwind } from 'uniwind'
import { i18n } from '~/lib/services/i18n'
import { navTheme } from '~/lib/theme'

export function RootProviders({ children }: PropsWithChildren) {
  const { theme } = useUniwind()

  return (
    <ThemeProvider value={navTheme[theme as keyof typeof navTheme]}>
      <I18nProvider i18n={i18n}>
        <SafeAreaListener
          onChange={({ insets }) => {
            Uniwind.updateInsets(insets)
          }}
        >
          {children}
        </SafeAreaListener>
      </I18nProvider>
    </ThemeProvider>
  )
}

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'
import '~/global.css'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { RootProviders } from '~/features/root-providers'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontLoaded = true] = useFonts({})

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hide()
    }
  }, [fontLoaded])

  if (Platform.OS !== 'web' && !fontLoaded) {
    return
  }

  return (
    <RootProviders>
      <Stack screenOptions={{ headerShown: false }} />
    </RootProviders>
  )
}

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'
import '~/app/global.css'
import { RootProviders } from '~/features/root-providers'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index'
}

export default function RootLayout() {
  const [fontLoaded = true] = useFonts({})

  if (Platform.OS !== 'web' && !fontLoaded) {
    return
  }

  return (
    <RootProviders>
      <Stack screenOptions={{ headerShown: false }} />
    </RootProviders>
  )
}

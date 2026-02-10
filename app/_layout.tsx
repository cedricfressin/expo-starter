import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import '~/app/global.css'
import { Providers } from '~/features/providers'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index'
}

export default function RootLayout() {
  const [fontLoaded] = useFonts({})

  if (!fontLoaded) {
    return
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  )
}

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import '~/app/global.css'
import { Providers } from '~/features/providers'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

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

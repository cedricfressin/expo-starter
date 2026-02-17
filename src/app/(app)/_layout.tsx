import { Slot } from 'expo-router'
import { AppProviders } from '~/features/app-providers'

export const unstable_settings = {
  // Ensure any route can link back to `/`
  anchor: 'index'
}

export default function AppLayout() {
  return (
    <AppProviders>
      <Slot />
    </AppProviders>
  )
}

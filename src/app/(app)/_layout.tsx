import { Slot } from 'expo-router'
import { AppProviders } from '~/features/app-providers'

export default function AppLayout() {
  return (
    <AppProviders>
      <Slot />
    </AppProviders>
  )
}

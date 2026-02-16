import { Redirect } from 'expo-router'
import { Platform } from 'react-native'

export default function Index() {
  return (
    <Redirect
      href={
        // Redirect to the public website or the app based on the platform
        Platform.OS === 'web' ? '/(public)' : '/(app)'
      }
    />
  )
}

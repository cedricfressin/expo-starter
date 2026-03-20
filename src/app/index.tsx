import { Redirect } from 'expo-router'

export default function Index() {
  return (
    <Redirect
      href={
        // Redirect to the public website or the app based on the platform
        process.env.EXPO_OS === 'web' ? '/(public)' : '/(app)'
      }
    />
  )
}

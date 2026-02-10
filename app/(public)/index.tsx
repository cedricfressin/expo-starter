import Head from 'expo-router/head'
import { Text, View } from 'react-native'

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>{'{app_name}'}</title>
      </Head>
      <View className="flex-1 p-safe">
        <Text role="heading">Landing Page</Text>
      </View>
    </>
  )
}

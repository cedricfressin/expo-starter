import Head from 'expo-router/head'
import { View } from 'react-native'
import { Text } from '~/components/ui/text'

export default function AppIndex() {
  return (
    <>
      <Head>
        <title>{'{app_name}'}</title>
      </Head>
      <View className="flex-1 p-safe">
        <Text variant="h1">App Index</Text>
      </View>
    </>
  )
}

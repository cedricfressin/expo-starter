import Head from 'expo-router/head'
import { Text, View } from 'react-native'

export default function AppIndex() {
  return (
    <>
      <Head>
        <title>{'{app_name}'}</title>
      </Head>
      <View className="flex-1 p-safe">
        <Text className="text-2xl font-bold" role="heading">
          App Index
        </Text>
      </View>
    </>
  )
}

import { Redirect, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export async function generateStaticParams() {
  // Return an array of params to generate static HTML files for.
  // Each entry in the array will be a new page.
  return []
}

export default function Page() {
  const { slug } = useLocalSearchParams()

  if (!slug) {
    return <Redirect href="/" />
  }

  return (
    <View>
      <Text role="heading">Page (slug: "{slug}")</Text>
    </View>
  )
}

import { Redirect, useLocalSearchParams } from 'expo-router'
import Head from 'expo-router/head'
import { View } from 'react-native'
import { Text } from '~/components/ui/text'

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
    <>
      <Head>
        <title>
          {slug} - {'{app_name}'}
        </title>
      </Head>
      <View>
        <Text variant="h1">Page (slug: "{slug}")</Text>
      </View>
    </>
  )
}

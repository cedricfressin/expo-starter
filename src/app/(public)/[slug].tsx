import { Trans, useLingui } from '@lingui/react/macro'
import Constants from 'expo-constants'
import { Redirect, useLocalSearchParams } from 'expo-router'
import Head from 'expo-router/head'
import { View } from 'react-native'
import { Text } from '~/components/ui/text'

const appName = Constants.expoConfig?.name as string

export const unstable_settings = {
  // This component will be rendered at build-time and never re-rendered in production.
  render: 'static'
}

export async function generateStaticParams() {
  // Return an array of params to generate static HTML files for.
  // Each entry in the array will be a new page.
  return []
}

export default function Page() {
  const { t } = useLingui()
  const { slug } = useLocalSearchParams()

  if (!slug) {
    return <Redirect href="/" />
  }

  return (
    <>
      <Head>
        <title>{t`${slug} - ${appName}`}</title>
      </Head>
      <View>
        <Text variant="h1">
          <Trans>Page (slug: "{slug}")</Trans>
        </Text>
      </View>
    </>
  )
}

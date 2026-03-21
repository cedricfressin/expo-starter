import { Trans, useLingui } from '@lingui/react/macro'
import Head from 'expo-router/head'
import { View } from 'react-native'
import { Text } from '~/components/ui/text'

export default function Index() {
  const { t } = useLingui()

  return (
    <>
      <Head>
        <title>{t`App`}</title>
      </Head>
      <View className="flex-1 p-safe">
        <Text variant="h1">
          <Trans>Index</Trans>
        </Text>
      </View>
    </>
  )
}

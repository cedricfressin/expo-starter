import { Trans, useLingui } from '@lingui/react/macro'
import Head from 'expo-router/head'
import { View } from 'react-native'
import { Text } from '~/components/ui/text'

export default function AppIndex() {
  const { t } = useLingui()

  return (
    <>
      <Head>
        <title>{t`App`}</title>
      </Head>
      <View className="flex-1 p-safe">
        <Text variant="h1">
          <Trans>App Index</Trans>
        </Text>
      </View>
    </>
  )
}

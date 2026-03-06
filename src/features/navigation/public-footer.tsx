import { Footer } from '@expo/html-elements'
import { Trans } from '@lingui/react/macro'
import { Text } from 'react-native'

export function PublicFooter() {
  return (
    <Footer>
      <Text role="heading">
        <Trans>Footer</Trans>
      </Text>
    </Footer>
  )
}

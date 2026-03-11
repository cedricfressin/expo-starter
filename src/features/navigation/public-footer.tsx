import { Footer } from '@expo/html-elements'
import { Trans } from '@lingui/react/macro'
import { Text } from '~/components/ui/text'

export function PublicFooter() {
  return (
    <Footer>
      <Text>
        <Trans>Footer</Trans>
      </Text>
    </Footer>
  )
}

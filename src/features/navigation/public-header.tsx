import { Header, Nav } from '@expo/html-elements'
import { Trans } from '@lingui/react/macro'
import { Text } from '~/components/ui/text'

export function PublicHeader() {
  return (
    <Header>
      <Text variant="h1">
        <Trans>Header</Trans>
      </Text>
      <Nav></Nav>
    </Header>
  )
}

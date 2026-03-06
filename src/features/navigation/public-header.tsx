import { Header, Nav } from '@expo/html-elements'
import { Trans } from '@lingui/react/macro'
import { Text } from 'react-native'

export function PublicHeader() {
  return (
    <Header>
      <Text role="heading">
        <Trans>Header</Trans>
      </Text>
      <Nav></Nav>
    </Header>
  )
}

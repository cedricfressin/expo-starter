import { Header, Nav } from '@expo/html-elements'
import { Text } from 'react-native'

export function PublicHeader() {
  return (
    <Header>
      <Text role="heading">Header</Text>
      <Nav></Nav>
    </Header>
  )
}

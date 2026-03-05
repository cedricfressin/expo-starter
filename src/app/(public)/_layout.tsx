import { Main } from '@expo/html-elements'
import { Slot } from 'expo-router'
import { View } from 'react-native'
import { PublicFooter } from '~/features/navigation/public-footer'
import { PublicHeader } from '~/features/navigation/public-header'

export default function PublicLayout() {
  return (
    <View>
      <PublicHeader />
      <Main>
        <Slot />
      </Main>
      <PublicFooter />
    </View>
  )
}

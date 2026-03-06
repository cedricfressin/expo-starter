// Extends Jest matchers with @testing-library/react-native matchers
// In v13+, jest-expo preset automatically configures this via jest-native

import { PropsWithChildren } from 'react'
import 'react-native-gesture-handler/jestSetup'

require('react-native-reanimated').setUpTests()

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock')
)

jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest')
)

jest.mock('expo-router')

jest.mock('react-native-safe-area-context', () => ({
  ...require('react-native-safe-area-context/jest/mock'),
  SafeAreaListener: ({ children }: PropsWithChildren) => children
}))

jest.mock('uniwind', () => ({
  Uniwind: ({ children }: PropsWithChildren) => children,
  useUniwind: () => ({ theme: 'light' }),
  withUniwind: (component: unknown) => component
}))

// Lingui .po catalogs are transformed by Metro at runtime — mock them in Jest
jest.mock('~/locales/en.po', () => ({ messages: {} }))

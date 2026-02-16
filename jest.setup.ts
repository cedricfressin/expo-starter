// Extends Jest matchers with @testing-library/react-native matchers
// In v13+, jest-expo preset automatically configures this via jest-native

import 'react-native-gesture-handler/jestSetup'

require('react-native-reanimated').setUpTests()

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock')
)

jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest')
)

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock')
)

jest.mock('expo-router')

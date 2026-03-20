import { renderHook } from '@testing-library/react-native'
import { BackHandler } from 'react-native'
import { useBackHandler } from '~/lib/hooks/use-back-handler'

// process.env.EXPO_OS is statically replaced by babel-preset-expo at transform time.
// Default jest-expo preset compiles as iOS, so the Android guard early-returns.
// Android-specific behavior is covered by E2E tests.

const mockRemove = jest.fn()

jest.mock('react-native', () => ({
  BackHandler: {
    addEventListener: jest.fn(() => ({ remove: mockRemove }))
  }
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useBackHandler', () => {
  it('does not register listener on non-Android platforms', () => {
    // Arrange
    const handler = () => true

    // Act
    renderHook(() => useBackHandler(handler))

    // Assert — early return on iOS (default jest-expo preset)
    expect(BackHandler.addEventListener).not.toHaveBeenCalled()
  })
})

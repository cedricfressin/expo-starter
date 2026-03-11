import { renderHook } from '@testing-library/react-native'
import { BackHandler } from 'react-native'
import { useBackHandler } from '~/lib/hooks/use-back-handler'

const mockRemove = jest.fn()

jest.mock('react-native', () => ({
  Platform: { OS: 'android' },
  BackHandler: {
    addEventListener: jest.fn(() => ({ remove: mockRemove }))
  }
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useBackHandler', () => {
  it('registers listener on Android', () => {
    // Arrange
    const handler = () => true

    // Act
    renderHook(() => useBackHandler(handler))

    // Assert
    expect(BackHandler.addEventListener).toHaveBeenCalledWith(
      'hardwareBackPress',
      handler
    )
  })

  it('removes listener on unmount', () => {
    // Arrange
    const handler = () => true

    // Act
    const { unmount } = renderHook(() => useBackHandler(handler))
    unmount()

    // Assert
    expect(mockRemove).toHaveBeenCalled()
  })
})

import { renderHook } from '@testing-library/react-native'
import { useWindowDimensions } from 'react-native'
import { useIsMobile } from '~/lib/hooks/use-mobile'

jest.mock('react-native', () => ({
  useWindowDimensions: jest.fn()
}))

const mockUseWindowDimensions = useWindowDimensions as jest.Mock

describe('useIsMobile', () => {
  it('returns true when width is below breakpoint', () => {
    // Arrange
    mockUseWindowDimensions.mockReturnValue({ width: 375 })

    // Act
    const { result } = renderHook(() => useIsMobile())

    // Assert
    expect(result.current).toBe(true)
  })

  it('returns false when width is at breakpoint', () => {
    // Arrange
    mockUseWindowDimensions.mockReturnValue({ width: 768 })

    // Act
    const { result } = renderHook(() => useIsMobile())

    // Assert
    expect(result.current).toBe(false)
  })

  it('returns false when width is above breakpoint', () => {
    // Arrange
    mockUseWindowDimensions.mockReturnValue({ width: 1024 })

    // Act
    const { result } = renderHook(() => useIsMobile())

    // Assert
    expect(result.current).toBe(false)
  })
})

import { useWindowDimensions } from 'react-native'

const MOBILE_BREAKPOINT = 768

/**
 * Hook to check if the screen is mobile.
 *
 * @returns `true` if the screen is mobile, `false` otherwise.
 */
export function useIsMobile() {
  const { width } = useWindowDimensions()
  return width < MOBILE_BREAKPOINT
}

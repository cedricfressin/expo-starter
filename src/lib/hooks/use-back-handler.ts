import { useEffect } from 'react'
import { BackHandler, Platform } from 'react-native'

/**
 * Hook to handle Android hardware back button press.
 *
 * @param handler - Callback invoked on back press. Return `true` to prevent
 *   default behavior, `false` to let the system handle it.
 */
export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handler
    )

    return () => subscription.remove()
  }, [handler])
}

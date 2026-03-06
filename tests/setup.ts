import {
  type RenderOptions,
  render,
  userEvent
} from '@testing-library/react-native'
import type { ReactElement } from 'react'
import { RootProviders } from '~/features/root-providers'

export function setup(
  jsx: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) {
  return {
    user: userEvent.setup(),
    ...render(jsx, { wrapper: RootProviders, ...options })
  }
}

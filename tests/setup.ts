import {
  type RenderOptions,
  render,
  userEvent
} from '@testing-library/react-native'
import type { ReactElement } from 'react'

export function setup(
  jsx: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) {
  return {
    user: userEvent.setup(),
    ...render(jsx, options)
  }
}

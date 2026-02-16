import { screen } from '@testing-library/react-native'
import AppIndex from '~/app/(app)/index'
import { setup } from '~/tests/setup'

describe('AppIndex', () => {
  it('renders the app heading', () => {
    // Act
    setup(<AppIndex />)

    // Assert
    expect(screen.getByRole('heading', { name: 'App Index' })).toBeOnTheScreen()
  })
})

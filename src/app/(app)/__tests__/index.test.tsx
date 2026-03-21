import { screen } from '@testing-library/react-native'
import Index from '~/app/(app)/index'
import { setup } from '~/tests/setup'

describe('Index', () => {
  it('renders the app heading', () => {
    // Act
    setup(<Index />)

    // Assert
    expect(screen.getByRole('heading', { name: 'Index' })).toBeOnTheScreen()
  })
})

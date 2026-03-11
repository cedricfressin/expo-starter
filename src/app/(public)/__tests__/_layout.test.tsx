import { screen } from '@testing-library/react-native'
import PublicLayout from '~/app/(public)/_layout'
import { setup } from '~/tests/setup'

describe('PublicLayout', () => {
  it('renders header and footer', () => {
    // Act
    setup(<PublicLayout />)

    // Assert
    expect(screen.getByRole('heading', { name: 'Header' })).toBeOnTheScreen()
    expect(screen.getByText('Footer')).toBeOnTheScreen()
  })
})

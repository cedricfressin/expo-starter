import { screen } from '@testing-library/react-native'
import LandingPage from '~/app/(public)/index'
import { setup } from '~/tests/setup'

describe('LandingPage', () => {
  it('renders the landing page heading', () => {
    // Act
    setup(<LandingPage />)

    // Assert
    expect(
      screen.getByRole('heading', { name: 'Landing Page' })
    ).toBeOnTheScreen()
  })
})

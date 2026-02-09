import { screen } from '@testing-library/react-native'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { setup } from '~/tests/setup'
import Page from '../[slug]'

const mockUseLocalSearchParams = useLocalSearchParams as jest.Mock

describe('Page [slug]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each(['about', 'contact'])('renders the page with slug %s', slug => {
    // Arrange
    mockUseLocalSearchParams.mockReturnValue({ slug })

    // Act
    setup(<Page />)

    // Assert
    expect(
      screen.getByRole('heading', { name: new RegExp(slug, 'i') })
    ).toBeOnTheScreen()
    expect(Redirect).not.toHaveBeenCalled()
  })

  it.each(['', undefined])('redirects to home when slug is %s', slug => {
    // Arrange
    mockUseLocalSearchParams.mockReturnValue({ slug: slug as string })

    // Act
    setup(<Page />)

    // Assert
    expect(Redirect).toHaveBeenCalledWith({ href: '/' }, undefined)
  })
})

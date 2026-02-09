import { Redirect } from 'expo-router'
import { Platform } from 'react-native'
import { setup } from '~/tests/setup'
import Index from '..'

describe('Index', () => {
  const originalOS = Platform.OS

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  afterEach(() => {
    Platform.OS = originalOS
  })

  it('redirects to app on native', () => {
    // Act
    setup(<Index />)

    // Assert
    expect(Redirect).toHaveBeenCalledWith({ href: '/(app)' }, undefined)
  })

  it('redirects to landing page on web', () => {
    // Arrange
    Platform.OS = 'web'

    // Act
    setup(<Index />)

    // Assert
    expect(Redirect).toHaveBeenCalledWith({ href: '/(public)' }, undefined)
  })
})

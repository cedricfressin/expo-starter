import { Redirect } from 'expo-router'
import { setup } from '~/tests/setup'
import Index from '..'

// process.env.EXPO_OS is statically replaced by babel-preset-expo at transform time.
// Default jest-expo preset compiles as iOS, so only the native branch is testable here.
// Web redirect behavior is covered by E2E tests (.maestro/public/landing.web.yaml).

describe('Index', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to app on native', () => {
    // Act
    setup(<Index />)

    // Assert
    expect(Redirect).toHaveBeenCalledWith({ href: '/(app)' }, undefined)
  })
})

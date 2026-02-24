import { getServerUrl } from '~/lib/utils/server-url'

describe('getServerUrl', () => {
  const originalWindow = global.window
  const originalEnv = process.env.NODE_ENV

  afterEach(() => {
    global.window = originalWindow
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv })
  })

  it('returns window.location.origin when window is defined', () => {
    // Arrange
    // @ts-expect-error -- Mocking window for test
    global.window = { location: { origin: 'https://example.com' } }

    // Act
    const result = getServerUrl()

    // Assert
    expect(result).toBe('https://example.com')
  })

  it('returns production URL when in production without window', () => {
    // Arrange
    // @ts-expect-error -- Removing window for test
    global.window = undefined
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' })

    // Act
    const result = getServerUrl()

    // Assert
    expect(result).toBe('https://{app_production_url}')
  })

  it('returns localhost URL when in development without window', () => {
    // Arrange
    // @ts-expect-error -- Removing window for test
    global.window = undefined
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' })

    // Act
    const result = getServerUrl()

    // Assert
    expect(result).toBe('http://localhost:8081')
  })
})

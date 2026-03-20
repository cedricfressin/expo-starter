import { navTheme } from '~/lib/theme'

describe('navTheme', () => {
  it.each([
    'light',
    'dark'
  ] as const)('provides required React Navigation colors for %s theme', theme => {
    // Assert — all required React Navigation color keys are present
    const { colors } = navTheme[theme]
    expect(colors.background).toBeDefined()
    expect(colors.border).toBeDefined()
    expect(colors.card).toBeDefined()
    expect(colors.notification).toBeDefined()
    expect(colors.primary).toBeDefined()
    expect(colors.text).toBeDefined()
  })

  it('has distinct background colors for light and dark themes', () => {
    // Assert
    expect(navTheme.light.colors.background).not.toBe(
      navTheme.dark.colors.background
    )
  })
})

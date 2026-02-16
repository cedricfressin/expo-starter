import { navTheme } from '~/lib/theme'

describe('navTheme', () => {
  it.each(['light', 'dark'] as const)('matches %s theme snapshot', theme => {
    // Assert
    expect(navTheme[theme]).toMatchSnapshot()
  })
})

import type { LinguiConfig } from '@lingui/conf'

export default {
  locales: ['en'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'locales/{locale}',
      include: ['src']
    }
  ],
  format: 'po'
} satisfies LinguiConfig

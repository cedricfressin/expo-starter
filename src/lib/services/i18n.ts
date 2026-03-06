import { i18n, Locale, Messages } from '@lingui/core'
import { getLocales } from 'expo-localization'
import { messages as en } from '~/locales/en.po'

const catalogs: Record<Locale, Messages> = {
  en
  // Add new locale imports here when adding languages
}

const defaultLocale: Locale = 'en'

// Use device language if supported, otherwise fallback to default
const detectedLanguage = getLocales()[0]?.languageCode ?? defaultLocale
export const locale: Locale =
  detectedLanguage in catalogs ? detectedLanguage : defaultLocale

i18n.loadAndActivate({
  locale,
  messages: catalogs[locale]!
})

export { i18n }

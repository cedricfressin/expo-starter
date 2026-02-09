const { getDefaultConfig } = require('expo/metro-config')
const { withUniwindConfig } = require('uniwind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.unstable_enablePackageExports = true

module.exports = withUniwindConfig(config, {
  // relative path to your global.css file (from previous step)
  cssEntryFile: './app/global.css',
  // (optional) path where we gonna auto-generate typings
  // defaults to project's root
  dtsFile: './lib/types/uniwind-types.d.ts'
})

const { getDefaultConfig } = require('expo/metro-config')
const { withUniwindConfig } = require('uniwind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.unstable_enablePackageExports = true

config.transformer.minifierConfig = {
  compress: {
    // Removes all console logs statements in production.
    drop_console: true,
    dead_code: true,
    unused: true,
    // Run compression twice for better results
    passes: 2
  },
  mangle: {
    toplevel: true
  }
}

module.exports = withUniwindConfig(config, {
  // relative path to your global.css file (from previous step)
  cssEntryFile: './app/global.css',
  // (optional) path where we gonna auto-generate typings
  // defaults to project's root
  dtsFile: './lib/types/uniwind-types.d.ts'
})

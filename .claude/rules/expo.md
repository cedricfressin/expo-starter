---
paths:
  - '**/app/**/*.tsx'
  - '**/app/**/*.ts'
  - '**/app.config.ts'
  - '**/app.json'
---

# Expo Rules

## File Structure

- `app/` — Expo Router file-based routes and layouts (`_layout.tsx`, `index.tsx`, `[param].tsx`)
- `app/(tabs)/` — tab group layout with `NativeTabs`
- `app/(auth)/` — auth-gated route group
- Route groups `(groupName)` for shared layouts without URL segment
- Platform-specific: `.ios.tsx` > `.native.tsx` > `.tsx` resolution order
- Keep platform files minimal — share logic via hooks, diverge on UI only

## Navigation

- **`router`** from `expo-router` directly — never `useRouter()` hook
- `<Link>` for declarative, `<Redirect>` for auth guards, `router.navigate/push/replace` for programmatic
- Every screen should have a shareable URL — design routes as paths first
- Validate dynamic route params (`[id]`, `[slug]`) — never trust raw input
- External URLs → `expo-web-browser` (`openBrowserAsync`) — never `Linking.openURL` for https
- Deep links handled automatically by Expo Router — no manual `Linking.addEventListener`

## SDK 55+ Navigation APIs

- **`NativeTabs`** (`expo-router/unstable-native-tabs`) for all tab layouts — native tab bars on iOS (Liquid Glass) and Android (Material 3)
- `NativeTabs.Trigger.Icon` — `sf` for SF Symbols (iOS), `md` for Material Symbols (Android)
- `NativeTabs.BottomAccessory` — floating panel above tab bar (iOS 26+)
- **`Stack.Toolbar`** — composable native toolbar (iOS only), in **page components only** (never layouts)
- **`SplitView`** (`expo-router/unstable-split-view`) — iPad multi-column, **root layout level only**
- **`Link.Preview`** / **`Link.Menu`** — iOS peek-and-pop + context menus, `useIsPreview()` to skip heavy work

## Liquid Glass (`expo-glass-effect`)

- `GlassView` for iOS 26+ Liquid Glass surfaces — falls back to `View` on Android
- `GlassContainer` to merge multiple glass views into unified effect
- **Always guard** with `isGlassEffectAPIAvailable()` before rendering `GlassView`
- Animate via `glassEffectStyle: { style, animate, animationDuration }` — never `opacity: 0`

## Images

- **`expo-image`** with `placeholder={{ blurhash }}` for all images
- WebP for photos, SVG for icons, @2x/@3x densities, CDN delivery
- `contentFit="cover"` for avatars/backgrounds, `"contain"` for content

## Platform & Device

- `process.env.EXPO_OS` for all platform checks — tree-shakeable, dead code eliminated at build time
- `.ios.tsx` / `.android.tsx` / `.web.tsx` for significant behavior divergence
- `useWindowDimensions()` for responsive (tablet >= 768) — never `Dimensions.get()`
- Android: edge-to-edge mandatory (API 16+), handle system bar insets
- `<Activity mode="hidden">` for tab/toggle state preservation (see react.md)

## Config & Environment

- `app.config.ts` for dynamic config with env vars
- `expo-constants` (`Constants.expoConfig?.extra`) for runtime access
- Config plugins for native configuration — never eject
- `expo-dev-client` for custom dev builds

## Security

- `expo-secure-store` with `requireAuthentication: true` for tokens/keys
- `expo-auth-session` for OAuth — never roll custom OAuth flows
- `expo-crypto` for cryptographic operations
- Individual permission modules (`expo-camera`, `expo-location`) — never `expo-permissions`

## OTA Updates

- `expo-updates` for over-the-air delivery
- Check → fetch → reload pattern: `checkForUpdateAsync()` → `fetchUpdateAsync()` → `reloadAsync()`

## SDK 55 Module Migration

- `expo-audio` replaces `expo-av` for audio (lock-screen, background, playlists)
- `expo-video` replaces `expo-av` for video (PiP, stabilization)
- `expo-blur` — stable Android support (RenderNode API, Android 12+)

## NEVER

- **NEVER** use `useRouter()` — use `router` directly from `expo-router`
- **NEVER** use RN `<Image>` — use `expo-image` with blurhash placeholder
- **NEVER** use `Tabs` from `expo-router` — use `NativeTabs` from `expo-router/unstable-native-tabs`
- **NEVER** place `Stack.Toolbar` in `_layout.tsx` — page components only
- **NEVER** nest `SplitView` — root layout level only
- **NEVER** use `Linking.openURL` for https — use `expo-web-browser`
- **NEVER** use `Linking.addEventListener` — Expo Router handles deep links
- **NEVER** use `expo-av` — removed in SDK 55, use `expo-audio` + `expo-video`
- **NEVER** use `Dimensions.get()` — use `useWindowDimensions()` (reactive)
- **NEVER** use `opacity: 0` on `GlassView` — use `glassEffectStyle: 'none'` with `animate`
- **NEVER** render `GlassView` without `isGlassEffectAPIAvailable()` guard
- **NEVER** skip route param validation on dynamic segments
- **NEVER** use `Platform.OS` or `Platform.select()` — use `process.env.EXPO_OS` (tree-shakeable)
- **NEVER** use `TouchableOpacity` / `TouchableHighlight` — use `Pressable`
- **NEVER** use `expo-linear-gradient` — use `experimental_backgroundImage`
- **NEVER** use `expo-permissions` — use individual module permission APIs

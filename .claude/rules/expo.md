---
paths:
  - "**/*.{ts,tsx}"
  - "app.json"
---

# Expo / React Native

## Principles

- **Mobile-first** design, cross-platform with optimizations, managed workflow
- Performance priorities: Load Time, Jank, Responsiveness

## Navigation (expo-router)

- **`router` directly** (NEVER `useRouter()` hook), `<Link>` declarative, `<Redirect>` conditional
- `router.navigate()`, `router.replace()`, `router.push()` for programmatic
- Layouts via `_layout.tsx`

## Expo 55+

- **NativeTabs**: prefer over `Tabs` for native tab bars, `NativeTabs.Trigger` with `.Icon`/`.Label`/`.Badge`, SF Symbols via `sf` prop, Material Symbols via `md` prop
- **Stack.Toolbar** (iOS): in page components (not layouts), bottom default, `.Button`/`.Spacer`/`.Menu`
- **SplitView** (iPad): root layout only, `SplitView.Column` for sidebar, `.Inspector` for detail

## Lists

- **`FlatList`/`SectionList`** (virtualized), NEVER `.map()` in ScrollView
- `@legendapp/list` for complex items, `getItemLayout` for fixed-height, stable `keyExtractor`

## Images & Animations

- **`expo-image`** with `placeholder={{ blurhash }}` (NEVER RN `<Image>`)
- WebP for photos, SVG for icons, multiple densities (@2x, @3x)
- **`react-native-reanimated`** (UI thread), `react-native-keyboard-controller` for keyboard

## Platform & Device

- `Platform.select()` for platform values, `useWindowDimensions()` for responsive
- **`<Activity mode="hidden">`** instead of ternary/`&&` for heavy components

## Deep Linking & URL Scheme

- **Custom scheme**: `{app_slug}://` for native deep links (configured in `app.json` → `scheme`)
- **Universal Links (iOS)**: `associatedDomains` with `applinks:{domain}` (configured)
- **App Links (Android)**: `intentFilters` with `autoVerify: true` (configured)
- **Web**: routes map 1:1 with URLs — no extra configuration needed
- **Every app screen should have a shareable URL** — design routes as paths first
- **External URLs**: use `expo-web-browser` (`openBrowserAsync`) — NEVER `Linking.openURL` for https
- **Incoming links**: handled automatically by Expo Router — no manual `Linking.addEventListener`
- Universal Links: host `apple-app-site-association` + `assetlinks.json` at `/.well-known/`

## Security & Config

- `expo-constants` for env vars, individual modules for permissions
- `expo-secure-store` with `requireAuthentication`, `expo-auth-session` for OAuth

## Anti-Patterns (NEVER)

- NEVER use `useRouter()` — use `router` directly from `expo-router`
- NEVER use RN `<Image>` — use `expo-image` with `placeholder={{ blurhash }}`
- NEVER use RN `Animated` — use `react-native-reanimated`
- NEVER use `expo-permissions` — use individual module permissions
- NEVER use inline styles or `console.log`
- NEVER use `Tabs` — use `NativeTabs`
- NEVER use `Stack.Toolbar` in layouts — only in page components
- NEVER nest `SplitView` — root layout only
- NEVER handle deep links manually with `Linking.addEventListener` — Expo Router handles it
- NEVER use `Linking.openURL` for https URLs — use `expo-web-browser`
- NEVER skip param validation on dynamic route segments

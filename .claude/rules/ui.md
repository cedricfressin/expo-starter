---
paths:
  - '**/*.tsx'
  - '**/*.ts'
---

# UI Rules

## Design System

- **Uniwind** (Tailwind CSS v4) for all styling — NOT NativeWind
- `cn()` from `~/lib/utils/cn` for class merging
- `cva()` from `class-variance-authority` with `defaultVariants` for component variants
- `process.env.EXPO_OS` ternaries inside `cn()`/`cva()` for platform-specific classes

## Text & Icons

- **ALL** user-facing text via `~/components/ui/text` (`H1`–`H4`, `P`, `Text`, `Muted`, `Small`)
- **Icons (iOS)**: SF Symbols via `expo-image` (`source="sf:symbolName"`) — native weight, scale, animation
- **Icons (Android)**: Material Symbols via XML vector drawables
- **Icons (universal/custom)**: SVG icons (Lucide, custom) via `~/components/ui/icon` with `as` prop
- **NEVER** use `@expo/vector-icons`, FontAwesome, or Ionicons
- **TextClassContext** pattern: parent injects text styling into children via context

## Component Placement

- `src/components/ui/` — React Native Reusables primitives (CLI-added)
- `src/components/custom/` — cross-feature custom components
- `src/features/<name>/` — domain-scoped UI + logic
- Add primitives: `bun x --bun @react-native-reusables/cli@latest add <component>`

## Component Patterns

- Composition over configuration — compound components (Header/Body/Footer), slots, `asChild`
- Touch targets: **min 44x44px** (`h-11 w-11`)
- Semantic color tokens (`bg-background`, `text-foreground`) — NEVER hardcode hex
- Dark mode via Uniwind theme tokens + `useColorScheme`

## Layout

- Safe areas: `contentInsetAdjustmentBehavior="automatic"` on `ScrollView`/`FlatList` — handles insets natively
- **NEVER** wrap in `SafeAreaView` from `react-native` — causes double insets with native navigation
- `useSafeAreaInsets()` only for custom positioning (floating buttons, custom tab bars)
- Border radius: **always** add `borderCurve: 'continuous'` for squircle corners — omit only for capsule shapes
- Shadows: CSS `boxShadow` universally — **NEVER** legacy RN `shadowColor`/`elevation` props
- Keyboard: `KeyboardAvoidingView` (`behavior="padding"` iOS / `"height"` Android), auto on web
- Lists: `FlatList`/`FlashList` for 20+ items — never `ScrollView` + `.map()`

## Component Selection

| Need                          | Component                          |
| ----------------------------- | ---------------------------------- |
| 1 binary option               | **Switch** / **Button**            |
| 2–5 exclusive options         | **Radio Group**                    |
| 5–15 options                  | **Select**                         |
| 15+ options / searchable      | **Combobox**                       |
| Critical / destructive action | **Alert Dialog** with confirmation |
| Informative, temporary        | **Toast**                          |
| Supplementary info            | **Tooltip**                        |

## Feedback

- Toast: 3–5s, top-center (all platforms), max 3 simultaneous
- Alert Dialog: always Cancel + Action, focus safe action by default
- Modal/Dialog: close on Escape + outside click, trap focus
- Sheet: bottom on mobile, side panel on desktop

## Haptics

- `expo-haptics` — guard with `Platform.OS !== "web"`
- Selection: `Haptics.selectionAsync()` | Success/Warning/Error: `Haptics.notificationAsync()` | Impact: `Haptics.impactAsync()`

## Accessibility (WCAG 2.1 AA)

- Contrast: **4.5:1** normal text, **3:1** large text/UI
- `accessibilityRole`/`accessibilityState` (native), `aria-*` (web)
- `focus-visible` indicators, keyboard navigation, focus trapping in modals
- Never convey info by color alone — pair with icons/text
- `alt` text for informative images, `accessible={false}` for decorative

## NEVER

- **NEVER** use raw RN `Text` — use `~/components/ui/text`
- **NEVER** hardcode colors — use semantic tokens
- **NEVER** use "OK" / "Yes" as button labels — use descriptive action text
- **NEVER** use `SafeAreaView` from `react-native` — use `contentInsetAdjustmentBehavior="automatic"`
- **NEVER** use legacy RN shadow props (`shadowColor`, `elevation`) — use CSS `boxShadow`
- **NEVER** use `@expo/vector-icons`, FontAwesome, or Ionicons — use SF Symbols + Material Symbols + SVG
- **NEVER** omit `borderCurve: 'continuous'` on rounded elements (except capsule shapes)

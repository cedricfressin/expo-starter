---
paths:
  - "**/*.{ts,tsx}"
---

# Animations

## Library Choice

- **`react-native-reanimated`** for all animations — runs on UI thread, 60fps
- **NEVER** use RN `Animated` API — deprecated in favor of Reanimated
- **`react-native-gesture-handler`** for gesture-driven animations (swipe, drag, pinch)

## Reanimated Patterns

- **`useAnimatedStyle`** for dynamic style animations driven by shared values
- **`withTiming()`** (default: 300ms) for state transitions (opacity, color, size)
- **`withSpring()`** for natural, physics-based motion (drag release, bounce)
- **`withSequence()`** / **`withDelay()`** for choreographed multi-step animations
- **Shared values**: `useSharedValue()` — NEVER animate React state with `useState`

## Expo Router Transitions

- **Shared transitions**: `sharedTransitionTag` prop on elements across screens
- **Custom transitions**: `animation` in `screenOptions` for Stack/Modal transitions
- Prefer platform-native transitions — only customize when UX requires it

## Guidelines

- **Duration**: 100-300ms for micro-interactions, 300-500ms for page transitions
- **Easing**: `Easing.out(Easing.cubic)` for enter, `Easing.in(Easing.cubic)` for exit
- **Reduced motion**: respect `useReducedMotion()` — skip or simplify animations
- **Layout animations**: `LayoutAnimation` for simple list reorders, Reanimated `Layout` for complex

## Common Patterns

| Pattern         | Implementation                              |
| --------------- | ------------------------------------------- |
| Fade in/out     | `withTiming({ opacity })`                   |
| Scale press     | `withSpring({ transform: [{ scale }] })`    |
| Slide in        | `withTiming({ translateX })` + `Easing.out` |
| Skeleton pulse  | `withRepeat(withTiming(), -1, true)`        |
| Swipe to delete | `GestureDetector` + `useAnimatedStyle`      |

## Anti-Patterns (NEVER)

- NEVER use RN `Animated` — use `react-native-reanimated`
- NEVER animate `useState` values — use `useSharedValue`
- NEVER skip `useReducedMotion()` — respect accessibility preferences
- NEVER exceed 500ms for micro-interactions — keep UI responsive
- NEVER animate layout properties (width/height) when `transform` (scale/translate) works

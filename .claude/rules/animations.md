---
paths:
  - '**/*.tsx'
---

# Animation Rules

## Library

- **`react-native-reanimated`** for ALL animations — UI thread, 60fps
- **`react-native-gesture-handler`** for gesture-driven animations

## Core Patterns

- `useSharedValue()` for all animated values — NEVER animate `useState`
- `useAnimatedStyle()` for dynamic styles driven by shared values
- `withTiming()` (default 300ms) for state transitions — `withSpring()` for physics-based motion
- `withSequence()` / `withDelay()` for choreography — `withRepeat()` for loops
- Worklets: keep pure (no JS API calls), use `runOnJS()` to bridge to JS thread

## Layout Animations

- `entering`/`exiting` props: `FadeIn`, `FadeOut`, `SlideInRight`, `ZoomIn`, etc.
- `Layout` prop for automatic position/size transition animations
- Customize with `.duration()`, `.delay()`, `.springify()`

## Gestures

- `Gesture.Tap()`, `Gesture.Pan()`, `Gesture.Pinch()`, `Gesture.LongPress()`
- Compose: `Gesture.Simultaneous()`, `Gesture.Exclusive()`, `Gesture.Race()`
- Always pair with `useAnimatedStyle` via `GestureDetector`

## Timing Guidelines

| Category          | Duration   | Use Case                          |
| ----------------- | ---------- | --------------------------------- |
| Micro-interaction | 100–300ms  | Button press, toggle, icon change |
| State transition  | 200–400ms  | Loading → success, tab switch     |
| Page transition   | 300–500ms  | Screen push/pop, modal open       |
| Decorative loop   | 800–1500ms | Skeleton pulse, breathing glow    |

## Reduced Motion

- **ALWAYS** check `useReducedMotion()` from Reanimated
- Reduced motion enabled → `duration: 0` or skip decorative animations
- Keep functional animations (layout shifts) but simplify
- Never flash > 3x/sec

## NEVER

- **NEVER** animate `useState` — use `useSharedValue`
- **NEVER** skip `useReducedMotion()` — accessibility is mandatory
- **NEVER** exceed 500ms for micro-interactions
- **NEVER** animate `width`/`height` when `transform` (scale/translate) works
- **NEVER** use `setTimeout`/`setInterval` for animation timing

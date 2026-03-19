---
paths:
  - '**/*.tsx'
---

# React Rules

## Components

- **`function` keyword** for all components — no arrow functions, no `const X = () =>`
- **No nested component definitions** — extract to separate functions or files
- Single responsibility — extract when > ~150 lines
- Use `PropsWithChildren` when children is the only prop
- Destructure props in function signature, always typed
- Use spread (`...props`) and rest operators for prop forwarding
- **ref is a regular prop** (React 19) — never use `forwardRef`

## React Compiler

- React Compiler is **always enabled** — trust auto-memoization
- Keep components pure: no side effects during render
- No dynamic hook calls or refs read during render
- Props and state are immutable — never mutate directly

## React 19 Hooks

- `use()` — read promises and context (replaces `useContext`), can be called conditionally
- `useActionState()` — form actions with loading/error states
- `useFormStatus()` — access form submission state from child components
- `useTransition()` — non-blocking state updates
- `useOptimistic()` — instant UI feedback before server confirmation

## Hook Discipline

- Custom hooks: extract shared logic, always prefix with `use`
- `useReducer` for complex state logic
- `useRef` for DOM refs and instance values — not for mutable state workarounds
- `useId` for accessible server-safe IDs
- `useEffect` is for synchronizing with **external systems** only — never for data fetching or derived state

## State Management

- **Local UI state**: `useState` (toggles, inputs, visibility)
- **Complex local state**: `useReducer`
- **Global UI state**: React Context API — theme, locale, auth
- **Server state**: TanStack Query (see data fetching references)
- **Form state**: TanStack Form (see form references)
- Lift state to nearest common ancestor — no prop drilling > 2 levels

## Rendering & Error Handling

- `<Suspense>` boundaries with skeleton fallbacks for async content
- `<ErrorBoundary>` (react-error-boundary) to catch render errors
- Co-locate Suspense and ErrorBoundary around data-fetching components
- `lazy()` for code splitting heavy components
- Stable unique `key` from data (id, slug) — **never array index**
- Change `key` to force remount when identity changes

## Conditional Rendering (Activity)

- **`<Activity mode="visible" | "hidden">`** to show/hide UI that preserves state (tabs, steps, sidebars, drawers)
- Ternary / `&&` only when the component should **fully unmount and reset**
- `<Activity>` keeps DOM, state, and scroll position — cleans up Effects when hidden

## Event Handling

- `handleX` for definitions, `onX` for props
- No anonymous functions in JSX event handlers when it harms readability

## E2E Testability

- **Always add `accessibilityLabel`** to interactive elements (buttons, inputs, links) — dual value: accessibility + E2E testing
- **Add `testID`** only when `accessibilityLabel` doesn't make sense (decorative images, complex custom components)
- **Never add `testID` just because** — prefer `accessibilityLabel` which has dual value

## NEVER

- **NEVER** use `useMemo`, `useCallback`, or `memo` — React Compiler handles it
- **NEVER** use `forwardRef` — pass ref as a regular prop
- **NEVER** use `useEffect` for data fetching — use TanStack Query
- **NEVER** use `useState` for server data or form state
- **NEVER** use raw `useForm` — always **`useAppForm`** from `~/components/custom/tanstack-form`
- **NEVER** use `@tanstack/zod-form-adapter` — Zod implements Standard Schema natively, pass schemas directly
- **NEVER** define components inside other components
- **NEVER** use ternary/`&&` to toggle UI that should preserve state — use `<Activity mode>`
- **NEVER** use class components
- **NEVER** use Zustand or any external state management library — use React Context API
- **NEVER** store TanStack Query data in `useState` — it duplicates the cache
- **NEVER** use string-only query keys — use array key factories
- **NEVER** forget `invalidateQueries` after mutations — stale cache = stale UI
- **NEVER** use AsyncStorage — use MMKV (synchronous, faster)
- **NEVER** store secrets in MMKV or unencrypted storage — use `expo-secure-store`

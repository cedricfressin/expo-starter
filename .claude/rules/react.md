---
paths:
  - "**/*.{ts,tsx}"
---

# React 19

## Components

- **`function` keyword**, < 150 lines, no nested definitions, single responsibility
- `ref` as regular prop (no `forwardRef`), `PropsWithChildren<T>` for children
- **React Compiler enabled** — NEVER use manual `useMemo`/`useCallback`/`memo`

## Hooks

- `use()` for promises/context, `useActionState()` for forms, `useFormStatus()` for pending
- `useTransition()` for non-blocking updates, `useOptimistic()` for instant feedback
- **Top level only**, correct dependencies, `useReducer` for complex state

## Rendering

- **`<Suspense>`** with skeleton fallbacks, `lazy()` for code splitting
- `<ErrorBoundary>` for render errors, **Server Actions** for mutations
- `key` with **unique IDs** (not indices), children between tags

## Error Handling

- **Root ErrorBoundary**: `export { ErrorBoundary } from 'expo-router'` in `_layout.tsx`
- **Feature-level**: wrap critical sections with custom `<ErrorBoundary>` + fallback UI (explain + retry)
- **Network errors**: toast for transient (5xx), inline for validation (4xx), banner for offline
- NEVER show raw error messages or stack traces to users
- NEVER swallow errors with empty `catch` blocks
- NEVER throw inside render without an ErrorBoundary above

| Error Type      | Handling         | UX                      |
| --------------- | ---------------- | ----------------------- |
| Render crash    | ErrorBoundary    | Fallback + retry        |
| API 4xx         | Inline message   | Field-specific feedback |
| API 5xx         | Toast + retry    | "Something went wrong"  |
| Network offline | Banner           | Persistent indicator    |
| Auth expired    | Protected Routes | Redirect to login       |

## State Management

| Scenario      | Solution                            |
| ------------- | ----------------------------------- |
| Server data   | **TanStack Query**                  |
| Global UI     | **React Context API**               |
| Forms         | **useActionState** + Server Actions |
| Local UI      | useState                            |
| Complex local | useReducer                          |
| Optimistic    | useOptimistic                       |

## Anti-Patterns (NEVER)

- NEVER use `useEffect` for data fetching — use TanStack Query or Server Actions
- NEVER use `useState` for server data — use TanStack Query cache
- NEVER prop drill 3+ levels — use Context or composition
- NEVER define components inside other components — extract to separate functions

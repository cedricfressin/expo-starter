---
paths:
  - '**/*.ts'
  - '**/*.tsx'
---

# Data Fetching & Storage Rules

## TanStack Query v5

- **`useSuspenseQuery`** as default — always pair with `<Suspense>` + `<ErrorBoundary>` boundaries
- `useQuery` only when Suspense is inappropriate (background refetch, optional/conditional data)
- **Custom query hooks** for every entity: `useUser(id)`, `useUsers(filters)` — consumers never build queries inline
- **`queryOptions()`** as primary abstraction — custom hooks are thin wrappers

## Query Keys

- **Array key factories** per entity — hierarchical, from generic to specific
- `as const` for TypeScript inference — never plain strings
- Co-locate key factory with entity's query options in feature directory
- Never share the same key between `useQuery` and `useInfiniteQuery`

## Mutations

- `useMutation` with `onSuccess` → `invalidateQueries` — return the promise to keep mutation in loading state
- Optimistic updates: cancel → snapshot → update → rollback on error → invalidate on settle
- Cache updates from mutation response: `setQueryData` + `invalidateQueries` for lists

## Data Transformations

- Use `select` option — not in `queryFn`, not during render
- Destructure only what you need from query result — rest-destructure disables Proxy tracking

## Error Handling

- `useSuspenseQuery` always throws to Error Boundaries
- `QueryErrorResetBoundary` + `ErrorBoundary` for error recovery with retry
- Skeleton fallbacks — never generic spinners

## Storage Decision Tree

| Data type               | Storage            |
| ----------------------- | ------------------ |
| Auth tokens, secrets    | **SecureStore**    |
| User preferences, flags | **MMKV**           |
| Server/async data       | **TanStack Query** |
| Form state              | **TanStack Form**  |
| Temp session state      | **In-memory**      |

## NEVER

- **NEVER** fetch data in `useEffect` — use TanStack Query
- **NEVER** store query data in `useState` — it duplicates the cache
- **NEVER** use string-only query keys — use array key factories
- **NEVER** forget `invalidateQueries` after mutations
- **NEVER** use `AsyncStorage` — use MMKV (synchronous, faster)
- **NEVER** store secrets in MMKV — use `expo-secure-store`
- **NEVER** use generic spinners — use skeleton placeholders

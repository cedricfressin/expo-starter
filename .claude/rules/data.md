---
paths:
  - '**/*.{ts,tsx}'
---

# Data, Queries & Storage

## TanStack Query v5

- **`useSuspenseQuery`** + `<Suspense>` boundaries (preferred)
- **Custom query hooks** (`useUser`, `useUsers`) for reusability
- **Query key factories**: `userKeys.detail(id)`, `postKeys.byUser(userId)`
- Prefetch in Server Components with `queryClient.prefetchQuery()` + `<HydrationBoundary>`
- Defaults: **`staleTime: 60_000`**, `retry: 1`, `refetchOnWindowFocus: false`
- **Always `invalidateQueries`** after mutations
- Optimistic updates: `onMutate` → cancel → snapshot → update → `onError` rollback
- `maxPages` in `useInfiniteQuery`, batch API requests

## Network Error Handling

- **upfetch** errors: catch in TanStack Query's `onError` or `throwOnError`
- Show **toast** for transient errors (network, 5xx) with retry action
- Show **inline error** for validation errors (4xx) with field-specific messages
- Cap retries with TanStack Query `retry: 1` — NEVER retry indefinitely

## Storage Decision Tree

| Data Type                  | Storage                        | Why                          |
| -------------------------- | ------------------------------ | ---------------------------- |
| Auth tokens, secrets       | **`expo-secure-store`**        | Encrypted, biometric-gated   |
| User preferences, settings | **MMKV** (`react-native-mmkv`) | Synchronous, fast, small KV  |
| Structured offline data    | **TanStack Query `gcTime`**    | Automatic cache persistence  |
| Large files, media         | **`expo-file-system`**         | File-based, cached to disk   |
| Temp session state         | **In-memory** (context/ref)    | Lost on app close, by design |

## expo-secure-store

- Use for: tokens, API keys, biometric-protected data
- `requireAuthentication: true` for sensitive operations
- **Web fallback**: secure `httpOnly` cookies (SecureStore is native-only)
- Max value size: 2KB — NEVER store large payloads

## MMKV (when added)

- Synchronous reads — safe for initial render (no async waterfall)
- Use for: theme preference, onboarding completion, feature flags, locale
- Create typed wrappers: `storage.getString('theme')` → `'light' | 'dark'`

## Offline Strategy

- `gcTime: Infinity` + `staleTime` for critical data that must survive restarts
- **Persister**: `@tanstack/query-async-storage-persister` with MMKV adapter
- Hydrate on app launch, before rendering — show splash until ready
- Detect connectivity: `@react-native-community/netinfo` → `useNetInfo()`
- **Offline banner**: persistent, non-dismissible indicator when offline
- **Queue mutations**: store pending writes, sync when back online

## Cache Invalidation

- Invalidate all caches on **app version update** (major/minor)
- `invalidateQueries()` on re-focus for time-sensitive data
- Clear SecureStore tokens on **sign out** — NEVER leave stale credentials

## Anti-Patterns (NEVER)

- NEVER store query data in `useState` — it duplicates the cache
- NEVER use string-only query keys — use array key factories
- NEVER skip error/loading states — handle all query states
- NEVER forget to `invalidateQueries` after mutations
- NEVER use `AsyncStorage` for new projects — use MMKV (sync, faster)
- NEVER store secrets in MMKV or AsyncStorage — use `expo-secure-store`
- NEVER persist sensitive data without encryption
- NEVER assume cached data is fresh — always show staleness indicators

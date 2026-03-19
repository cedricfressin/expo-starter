---
paths:
  - '**/*.test.{ts,tsx}'
  - '**/test/**'
  - '**/jest*'
---

# Jest — Unit & Integration Tests

## Structure

- **ALWAYS** `setup()` from `~/tests/setup` (wraps render + userEvent) — NEVER bare `render()`
- `userEvent` over `fireEvent`, `renderHook()` + `act()` for hooks
- AAA pattern: `// Arrange`, `// Act`, `// Assert` — always in this order
- Descriptive names: `should...when...`
- Query priority: **`getByRole`** > `getByLabelText` > `getByText` > `getByTestId`

## Test Data

- **Factory pattern** for complex objects: `buildUser(overrides)` returns a full typed object with sensible defaults
- **`fromPartial()`** from `@total-typescript/shoehorn` for one-off partial data — avoids `as` casts that hide type errors
- Reusable test data in **`tests/fixtures/`** — NEVER inline large data objects in tests
- Use factories when the same base object appears in multiple tests; use `fromPartial` for single-use partials

## Async & Data-Fetching Components

- Cover **all four states**: loading, error, success, empty — for any component that fetches data
- Use MSW (`server.use(http.get(...))`) to simulate API responses — success, error, and empty
- `await screen.findByText(...)` for async content — NEVER `waitForTimeout`

## Edge Cases

- Always test: boundary values (0, -1, max), empty arrays, null/undefined inputs, network errors, unexpected data shapes

## Coverage

- **80%+** overall, **90%+** business logic, **95%+** auth/payments
- Excludes: `_layout`, `+html`, `+middleware`, `+not-found`, `lib/services/`

## Mocking

- **External dependencies only** — prefer real implementations
- External APIs: MSW (`server.use(http.get(...))`) — NEVER `jest.mock` for API calls
- Native module mocks in `jest.setup.ts` — **add entry when adding new native module**
- Current mocks: gesture-handler, reanimated, worklets, keyboard-controller, safe-area-context, expo-router

## NEVER

- **NEVER** use bare `render()` — always `setup()` from `~/tests/setup`
- **NEVER** use `fireEvent` — use `userEvent`
- **NEVER** use `waitForTimeout` — use `waitFor` or `findBy*`
- **NEVER** use snapshot tests — test observable behavior
- **NEVER** use `.spec.{ts,tsx}` — always `.test.{ts,tsx}`
- **NEVER** share state between tests — isolate each test completely
- **NEVER** mock internal module logic — only mock external boundaries
- **NEVER** interact with hidden or disabled elements
- **NEVER** use `as` casts for test data — use `fromPartial()` from `@total-typescript/shoehorn`
- **NEVER** skip loading/error/empty states — cover all four async states

---
paths:
  - '**/*.test.{ts,tsx}'
  - 'tests/**'
  - 'jest*'
  - '.maestro/**'
---

# Testing

## Unit & Integration (Jest + RNTL)

- Descriptive names, one concept per test, same quality as production code
- Query priority: **`getByRole`** > `getByLabelText` > `getByText` > `getByTestId`
- **ALWAYS** `setup()` from `~/tests/setup` (wraps render + userEvent) — NEVER bare `render()`
- `userEvent` over `fireEvent`, `renderHook()` + `act()` for hooks
- **AAA pattern**: `// Arrange`, `// Act`, `// Assert` comments
- Coverage: **80%+** overall, **90%+** business logic, **95%+** auth/payments
- Excludes: `_layout`, `+html`, `+middleware`, `+not-found`, `lib/services/`

## Mocking

- **External dependencies only**, prefer real implementations
- Native module mocks in `jest.setup.ts` — **add entry when adding new native module**
- Current mocks: gesture-handler, reanimated, worklets, keyboard-controller, safe-area-context, expo-router
- No shared state between tests, no `console.log`

## E2E Mobile (Maestro)

- Files: `.maestro/<feature>.yaml`, tags: `smoke`, `feature:<name>`, `platform:mobile`
- Selectors: **`accessibilityLabel`** > visible text > `testID`
- `clearState: true` per flow, deep links via `openLink:`
- Reusable flows in `.maestro/common/`, parametrized with `${VARIABLE_NAME}`
- `assertVisible` with timeout — NEVER `waitForTimeout`

## E2E Web (Maestro)

- Files: `.maestro/<feature>.web.yaml`, tags: `platform:web`
- Selectors: **`css:`** prefix for CSS selectors
- Run: `bun e2e --include-tags platform:web`

## Anti-Patterns (NEVER)

- NEVER share state between tests — isolate each test completely
- NEVER use `console.log` in tests — use proper assertions
- NEVER use magic numbers/strings — extract to named constants
- NEVER use `waitForTimeout` — use `assertVisible` with timeout
- NEVER interact with hidden or disabled elements

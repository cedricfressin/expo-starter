---
paths:
  - "**/*.{ts,tsx}"
---

# TypeScript & Code Style

## Types

- **Infer types** — annotate only function params, narrowing, and public API returns
- `type` over `interface`, `unknown` over `any`, `??` over `||`
- `as const` maps over `enum`, `satisfies` for validation without widening
- Discriminated unions for state modeling, method shorthand in types
- Utility types: `Partial`, `Pick`, `Omit`, `Record`

## Naming

- **camelCase** variables, `is`/`has`/`should` booleans, **PascalCase** components/types
- Verbs for actions, nouns for getters, **UPPER_SNAKE** for constants, **kebab-case** folders

## Code

- **Braces** on all conditionals, early returns, `const` default, `for...of` over `.forEach()`
- Destructuring, template literals, optional chaining `?.`, nullish coalescing `??`
- Functions **< 20 lines**, single task. Comments explain "why" not "what"
- **ALWAYS check `~/lib/utils/` and `~/lib/hooks/` before creating new utils/hooks**

## Imports

- **`~/` absolute imports**, named exports (except route pages)
- Order: external > `~/` internal > relative > `import type`
- No barrel files, no `import * as` (except for Expo related dependencies)

## Errors

- **Fail fast** with clear messages, throw `Error` objects, specific error types
- Handle at boundaries (API routes, Server Actions), no empty catch, wrap internals

## i18n & Formatting

- **Default: English-only** — prepare for i18n without implementing prematurely
- When needed: **`expo-localization`** + **`i18next`** with `react-i18next`
- **NEVER hardcode user-facing strings** inline — extract to constants or translation keys
- Detect locale: `expo-localization` `getLocales()[0]`
- **RTL**: use logical Tailwind properties (`ps-`/`pe-`, `ms-`/`me-`, `start`/`end`) — NEVER `left`/`right` for layout
- NEVER concatenate translated strings — use parameterized messages

## Anti-Patterns (NEVER)

- NEVER use `interface` — use `type`
- NEVER use `enum` — use `as const` maps
- NEVER use `any` — use `unknown` and narrow
- NEVER use `var` — use `const` (default) or `let`
- NEVER leave magic numbers or dead code
- NEVER use `await import()` inside functions — use `lazy()` at module level
- NEVER hardcode date/number formats — use `Intl` APIs with locale

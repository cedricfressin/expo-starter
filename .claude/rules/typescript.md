---
paths:
  - '**/*.{ts,tsx}'
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

## i18n

- **`expo-localization`** + **`@lingui`** — `I18nProvider` in `RootProviders`, catalogs in `locales/<locale>.po`
- **JSX text**: `<Trans>` from `@lingui/react/macro` — wraps visible text, Lingui auto-generates IDs
- **String props**: `` t`text` `` from `useLingui()` (`@lingui/react/macro`) — for `<title>`, accessibility labels, etc.
- **With variables**: `<Trans>Hello {name}</Trans>` or `` t`Hello ${name}` `` — JSX expressions / template literals
- **Outside React**: `i18n._('messageId', values)` from `~/lib/services/i18n`
- **Workflow**: write messages in code → catalogs are auto-extracted on pre-commit (`bun i18n`)
- NEVER hardcode user-facing strings — use `<Trans>` or `t` macro
- NEVER set explicit IDs — let Lingui auto-generate them from message content

## Anti-Patterns (NEVER)

- NEVER use `interface` — use `type`
- NEVER use `enum` — use `as const` maps
- NEVER use `any` — use `unknown` and narrow
- NEVER use `var` — use `const` (default) or `let`
- NEVER leave magic numbers or dead code
- NEVER use `await import()` inside functions — use `lazy()` at module level
- NEVER hardcode date/number formats — use `Intl` APIs with locale

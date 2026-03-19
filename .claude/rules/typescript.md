---
paths:
  - '**/*.ts'
  - '**/*.tsx'
---

# TypeScript Rules

## Type System

- **Infer types** — annotate only function params and `unknown` narrowing; let return types be inferred everywhere
- **`type` over `interface`** — more composable, supports unions/intersections
- Use `satisfies` to validate without widening
- Use `as const satisfies` for literal maps
- Use `as const` maps + derived type `(typeof X)[keyof typeof X]` instead of `enum`
- **Discriminated unions** for state modeling — exhaustive `switch` with `satisfies never`
- **Method shorthand** for all object property functions with block bodies: `fetch() {` not `fetch: () => {`
  - Async: `async submit() {` not `submit: async () => {`
  - With params: `handle(a, b) {` not `handle: (a, b) => {`
  - **Exception**: keep arrow for single-expression returns — `run: () => doSomething()`, `get: x => x.value`
- Utility types: `Partial`, `Pick`, `Omit`, `Record`, `NonNullable`
- React types: `ComponentProps<typeof X>`, `RefAttributes<typeof X>`, `PropsWithChildren`
- Type composition with `&` — combine props from multiple sources
- Const type parameters and template literal types for precision
- No redundant defaults — `useState(false)` not `useState<boolean>(false)`
- Use `z.infer<typeof Schema>` to derive types from Zod schemas — never duplicate them manually

## Code Style

- **Semicolons as needed** — enforced by Biome (`asNeeded` policy)
- **No trailing commas** — last item in objects, arrays, params has no comma
- **Avoid unnecessary parentheses** — arrow params `x => x` not `(x) => x` (single param)
- **No inline method bodies** — always expand to block form with braces on separate lines
- **Always use braces** — even single-line `if` blocks
- **`return` for early exits** — never `return null`; in React components, bare `return` renders nothing
- `for...of` over `.forEach()` and indexed `for` loops
- Extract complex conditions into well-named boolean variables
- Keep functions < 20 lines, single responsibility
- TSDoc for all public APIs — Include `@param`, `@returns`, and `@example` when non-obvious.

## Imports & Exports

- **Absolute imports** with `~/` prefix for cross-feature code
- **`import type`** for type-only imports — always on a separate line, never mixed with value imports
- **Import specifically**: `import { useState } from 'react'` — avoid `import * as` except for Expo libs
- **Named exports only** — except Expo Router screens and Next.js App Router pages
- **No barrel files** — no index.ts re-exporting everything

## Naming Conventions

### Files & Directories

- **All files**: `kebab-case` (`user-profile.tsx`, `use-auth.ts`, `format-date.ts`)
- **Test files**: `[name].test.ts(x)` in a `__tests__` directory
- **Directories**: `kebab-case`
- **Index files**: Only for public module API re-exports, never for component logic

### Code Identifiers

- **Variables/functions**: `camelCase`
- **Booleans**: prefix with `is`, `has`, `should`
- **Components**: `PascalCase`
- **Hooks**: `useCamelCase`
- **Types/Interfaces**: `PascalCase` — no `I` or `T` prefix
- **Constants**: `UPPER_SNAKE_CASE` — `camelCase` for configuration objects
- **Event handlers**: `handle` prefix for definitions, `on` prefix for props
- **Generics**: Descriptive names (`TItem` over `T`) when clarity demands it
- **Functions**: verbs for actions (`fetchData`), nouns for getters (`getUserById`)
- **Collections**: plural names for arrays (`users`, `items`)

## Error Handling

- **Fail fast** — validate input early, clear messages
- Throw `Error` objects, not strings — use specific types (`NotFoundError`, `ValidationError`)
- Handle at **boundaries** (API routes, error boundaries) — no scattered try-catch
- No empty catch blocks — handle or rethrow
- Wrap low-level errors — never leak internals to clients

## Hygiene

- Formatting handled by **Biome** + **Ultracite** — never format manually
- `.gitkeep` files exist only to version empty directories — delete them when a real file is added to the folder

## NEVER

- **NEVER** use `any` — use `unknown` + narrowing, or generics
- **NEVER** use `@ts-ignore` or `@ts-expect-error` — fix the type error instead
- **NEVER** use non-null assertions (`!`) — unless structurally guaranteed (e.g., after an `if` check)
- **NEVER** use `enum` — use `as const` maps
- **NEVER** use `interface` — use `type`
- **NEVER** use `var`
- **NEVER** use `||` for defaults — use `??`
- **NEVER** use `import * as React`
- **NEVER** use `console.log` in production — structured logger only
- **NEVER** use magic numbers — extract to named constants
- **NEVER** leave dead code or commented-out blocks
- **NEVER** add backward compatibility logic unless explicitly instructed
- **NEVER** use `.parse()` for user input validation — use `.safeParse()` and handle the error branch

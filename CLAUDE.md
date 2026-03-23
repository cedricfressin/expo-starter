# {app_name}

{app_description}

---

## Architecture Overview

### Technology Stack

- **Expo SDK 55** with React Native 0.83.2 (New Architecture)
- **React 19** with React Compiler enabled
- **Expo Router 6** - File-based routing with typed routes
- **TanStack Query v5** - Server state management
- **TanStack Form** - Form composition API (`~/components/custom/tanstack-form`)
- **React Native Reusables** - shadcn/ui-style components for React Native
- **Uniwind** - Universal Tailwind CSS v4 for React Native + Web
- **TypeScript 5.9** strict mode
- **Lingui** - i18n with compile-time macros and ICU MessageFormat
- **Maestro** - E2E testing for mobile + web

### Project Structure

```
.claude/                     # Claude Code configuration (rules and settings)
.eas/                        # EAS CI/CD workflows
.maestro/                    # E2E tests (Maestro — mobile + web)

assets/                      # Static assets (images, icons, etc.)
locales/                     # i18n catalogs (per locale, managed by Lingui CLI)
public/                      # Static assets served as-is (robots.txt, favicon, etc.)

src/                         # Application source code
├── app/                     # Expo Router pages
│   ├── (app)/               # Main application (iOS, Android, Web)
│   ├── (public)/            # Marketing website (landing pages)
│   ├── _layout.tsx          # Root layout with Providers
│   └── +middleware.ts       # Server middleware (redirects between app and website)
├── features/                # Feature modules (domain logic + UI)
├── lib/
│   ├── hooks/               # Shared React hooks
│   ├── services/            # API clients, storage, toaster, etc.
│   └── utils/               # Pure utility functions
└── components/              # UI components shared across features

tests/                       # Test helpers
```

---

## Code Conventions

Detailed conventions are auto-loaded from `.claude/rules/` based on file paths being edited. Key principles:

- **Universal App**: targets mobile native (iOS/Android) and web — always consider both platforms
- **Platform-specific**: Use `.web.ts` / `.native.ts` suffixes for platform code
- **React Compiler**: Enabled — trust auto-memoization, NEVER use manual `useMemo`/`useCallback`/`memo`
- **Documentation First (CRITICAL)**: Always use Context7 when you need library/API documentation, code generation, setup or configuration steps — without the user having to explicitly ask. NEVER trust trained knowledge alone — it may be outdated.
- **Never remove existing comments** (unless resolved `TODO:`, `FIXME:`, `HACK:` etc)

> See `.claude/rules/` for full conventions (auto-loaded per file path)

---

## Commands

- `bun dev` - Start development server
- `bun run build` - Build the web output ready for production
- `bun serve` - Serve the web build
- `bun typecheck` - Run TypeScript validation
- `bun lint` - Run Ultracite linter with auto-fix
- `bun clean` - Clean artifacts/caches
- `bun run test` - Run all tests suites with coverage report
- `bun run test --findRelatedTests <file>` - Run on changed and related files
- `bun maestro` - Run all E2E tests
- `bun maestro --exclude-tags web` - Mobile E2E tests only
- `bun maestro --include-tags web` - Web E2E tests (Chromium)
- `bun i18n` - Extract translation messages from source code (runs automatically on pre-commit hook)
- `bun knip` - Find unused dependencies
- `bun x snyk test` - Security vulnerability scan
- `bun x expo-optimize` - Optimize all image assets (lossless compression)
- `bun x expo-doctor` - Check environment readiness

### CI/CD (EAS Workflows)

Workflows in `.eas/workflows/` — uses `@expo/fingerprint` to OTA when possible, native build otherwise.

- **Fingerprint** = hash of native dependencies. Same hash → OTA update (seconds). Different hash → full native build (~20min).
- Profiles: `development` (dev client), `preview` (internal), `production` (stores)

### Package Management (CRITICAL)

- ALWAYS `bun` or `bun x` (NEVER npm/yarn/pnpm)
- Expo dependencies: ALWAYS `bun x expo install <package> --fix` to ensure SDK-compatible versions
- React Native Reusables: `bun x --bun @react-native-reusables/cli@latest add <component>`

### NEVER Run

- NEVER `bun build` → use `bun run build` (Expo bundles the app)
- NEVER `bun test` → use `bun run test` (Jest runner)
- NEVER `bun run test --watch` — not compatible with Claude Code
- NEVER `maestro studio` — not compatible with Claude Code

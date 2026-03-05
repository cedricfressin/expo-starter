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
- **Maestro** - E2E testing for mobile + web

### Project Structure

```
.maestro/                    # E2E tests (Maestro — mobile + web)

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

public/                      # Static assets served as-is (robots.txt, favicon, etc.)
```

---

## Code Conventions

- **Universal App**: This codebase targets both mobile native (iOS/Android) and web. Always consider both platforms when writing components.
- **Semantic HTML on Web (ALWAYS)**: Use `@expo/html-elements` (`Section`, `Nav`, `Header`, `Footer`, `Main`, `Article`, `Aside`, etc.) instead of `View` for layout containers — NEVER use bare `View` where a semantic element applies. Renders proper HTML on web while remaining compatible on native.
- **Text & Headings**: Use `~/components/ui/text` (`Text`, `H1`, `H2`, `H3`, `H4`, `Muted`, etc.) for all text and headings — provides proper semantic tags on web and consistent styling across platforms.
- **Imports**: Use `~/` alias for absolute imports (e.g., `import { cn } from '~/lib/utils/cn'`)
- **Styling**: Use `cn()` utility from `~/lib/utils/cn` for Tailwind class merging
- **Platform-specific**: Use `.web.ts` / `.native.ts` suffixes for platform code
- **React Compiler**: Enabled — trust auto-memoization, NEVER use manual `useMemo`/`useCallback`/`memo`

### Component Placement

| Location                 | Purpose                                           |
| ------------------------ | ------------------------------------------------- |
| `src/components/ui/`     | React Native Reusables primitives (added via CLI) |
| `src/components/custom/` | Cross-feature custom components                   |
| `src/features/<name>/`   | Domain-scoped UI + logic                          |

### Providers & Theme

Two layers in `src/features/`, add new providers to the appropriate level:

| Provider        | Layout              | Scope      | Contains                                                 |
| --------------- | ------------------- | ---------- | -------------------------------------------------------- |
| `RootProviders` | `_layout.tsx`       | All routes | Uniwind, ThemeProvider (`navTheme`), StatusBar, SafeArea |
| `AppProviders`  | `(app)/_layout.tsx` | App only   | QueryClient, PortalHost, Toaster, React Query Devtools   |

Theme: `src/lib/theme.ts` exports `navTheme` (light/dark HSL values synced with Tailwind CSS variables).

### API Routes & Server

Server output is enabled (`"output": "server"` + `reactServerFunctions: true`).

- **File convention**: `src/app/api/<name>+api.ts` (e.g., `health+api.ts` → `/api/health`)
- **Export named HTTP methods**: `GET`, `POST`, `PUT`, `PATCH`, `DELETE` — each receives a `Request` and must return a `Response` (Web standard API)
- **Dynamic params**: `src/app/api/users/[id]+api.ts` — access via `request.expirationURL` or parse from `request.url`
- **Server functions**: Use `'use server'` directive for functions callable from client components
- **Middleware**: `src/app/+middleware.ts` runs on every request (uses `expo-server` `ImmutableRequest`)
- **No client code**: API route files are server-only — never import React or client modules
- **Server-only guard**: Add `import "server-only"` at the top of any server-only utility module (API helpers, DB clients, secrets) to cause a build error if accidentally imported from client code

### Testing Patterns

- **Runner**: Jest + React Native Testing Library
- **Render**: Always use `setup()` from `tests/setup.ts` instead of bare `render()` — it wraps render with `userEvent.setup()`
- **Native module mocks**: `jest.setup.ts` mocks gesture-handler, reanimated, worklets, keyboard-controller, safe-area-context, and expo-router. When adding a new native module, add its mock entry to `jest.setup.ts`

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
- `bun e2e` - Run all E2E tests
- `bun e2e --exclude-tags platform:web` - Mobile E2E tests only
- `bun e2e --include-tags platform:web` - Web E2E tests (Chromium)
- `bun knip` - Find unused dependencies
- `bun x snyk test` - Security vulnerability scan
- `bun x expo-optimize` - Optimize all image assets (lossless compression)
- `bun x expo-doctor` - Check environment readiness

### Package Management (CRITICAL)

- ALWAYS `bun` or `bun x` (NEVER npm/yarn/pnpm)
- Expo dependencies: ALWAYS `bun x expo install <package> --fix` to ensure SDK-compatible versions
- React Native Reusables: `bun x --bun @react-native-reusables/cli@latest add <component>`

### NEVER Run

- NEVER `bun build` → use `bun run build` (Expo bundles the app)
- NEVER `bun test` → use `bun run test` (Jest runner)
- NEVER `bun run test --watch` — not compatible with Claude Code
- NEVER `maestro studio` — not compatible with Claude Code

---

## Anti-Patterns (NEVER)

- NEVER create new utils/hooks without checking `~/lib/utils/` and `~/lib/hooks/` first
- NEVER use `sonner` or `sonner-native` directly → use wrapper from `~/lib/services/toaster`
- NEVER use raw `useForm` from `@tanstack/react-form` → use `useAppForm` from `~/components/custom/tanstack-form`
  - **Form-level**: `form.AppForm`, `form.AppField`, `form.SubmitButton`
  - **Field-level**: `field.Field`, `field.Label`, `field.Description`, `field.Message`, `field.Input`, `field.Textarea`, `field.Checkbox`, `field.RadioGroup`, `field.Toggle`

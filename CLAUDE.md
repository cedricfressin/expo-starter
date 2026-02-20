# {app_name}

{app_description}

---

## Architecture Overview

### Technology Stack

- **Expo SDK 55** (preview) with React Native 0.84.0 (New Architecture)
- **React 19** with React Compiler enabled
- **Expo Router 6** - File-based routing with typed routes
- **TanStack Query v5** - Server state management
- **TanStack Form** - Form state management with composition API (`~/components/tanstack-form`)
- **React Native Reusables** - shadcn/ui-style components for React Native
- **Uniwind** - Universal Tailwind CSS v4 for React Native + Web
- **TypeScript 5.9** strict mode
- **Maestro** - E2E testing for mobile + web

### Project Structure

```
.maestro/                    # E2E tests (Maestro — mobile + web)
├── config.yaml              # Global settings
├── subflows/                # Reusable flow fragments
├── public/                  # Marketing pages (mirrors src/app/(public)/)
└── app/                     # App screens (mirrors src/app/(app)/)

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
├── components/              # UI components shared across features
│   ├── ui/                  # React Native Reusables (shadcn-like)
│   └── custom/              # Project-specific components
└── tests/
    └── setup.ts             # Test helper: setup() wraps render + userEvent

public/                      # Static assets served as-is (robots.txt, favicon, etc.)
```

---

## Code Conventions

- **Universal App**: This codebase targets both mobile native (iOS/Android) and web. Always consider both platforms when writing components.
- **Semantic HTML on Web**: Use `@expo/html-elements` (`Section`, `Nav`, `Header`, `Footer`, `Main`, `Article`, `Aside`, etc.) instead of `View` for layout containers — this renders semantic HTML on web while remaining compatible on native.
- **Text & Headings**: Use `~/components/ui/text` (`Text`, `H1`, `H2`, `H3`, `H4`, `Muted`, etc.) for all text and headings — provides proper semantic tags on web and consistent styling across platforms.
- **Imports**: Use `~/` alias for absolute imports (e.g., `import { cn } from '~/lib/utils/cn'`)
- **Styling**: Use `cn()` utility from `~/lib/utils/cn` for Tailwind class merging
- **Platform-specific**: Use `.web.ts` / `.native.ts` suffixes for platform code
- **React Compiler**: Enabled — trust auto-memoization, NEVER use manual `useMemo`/`useCallback`/`memo`

### Component Placement

- **`src/components/ui/`** - React Native Reusables (shadcn-like primitives, added via CLI)
- **`src/components/custom/`** - Cross-feature custom components not available in React Native Reusables
- **`src/features/<name>/`** - Domain-specific UI + logic (components, hooks, types scoped to one feature)

### Testing Patterns

- **Runner**: Jest + React Native Testing Library
- **Render**: Always use `setup()` from `~/tests/setup.ts` instead of bare `render()` — it wraps render with `userEvent.setup()`

---

## Development Settings

### Core Commands

- `bun dev` - Start development server
- `bun run build` - Build the web output ready for production
- `bun serve` - Serve the web build
- `bun typecheck` - Run TypeScript validation
- `bun lint` - Run Ultracite linter with auto-fix
- `bun clean` - Clean artifacts/caches

### Database Commands

- `bun prisma generate` - Generate Prisma client after schema changes
- `bun prisma migrate dev` - Create and apply migrations (development)
- `bun prisma migrate deploy` - Apply pending migrations (production)
- `bun prisma db push` - Push schema to database without migrations (prototyping)
- `bun prisma studio` - Open Prisma Studio to browse data

**NEVER run these commands:**

- NEVER `bun build` - Use `bun run build` instead since we are using Expo to pack the application.

### Testing Commands

- `bun run test` - Run all tests suites with coverage report
- `bun run test --findRelatedTests <file>` - Run on changed and related files

### E2E Testing Commands

- `bun e2e` - Run all E2E tests
- `bun e2e --exclude-tags platform:web` - Run mobile E2E tests (excludes web)
- `bun e2e --include-tags platform:web` - Run web E2E tests (Chromium)

**NEVER run these commands:**

- NEVER `bun test` - Use `bun run test` instead since we are using Jest as test runner
- NEVER `bun run test --watch` - Watch mode is not compatible with Claude Code
- NEVER `maestro studio` - Interactive UI is not compatible with Claude Code

### Development Tools

- `bun x expo-doctor` - Check environment readiness for Expo
- `bun knip` - Find unused dependencies
- `bun x snyk test` - Security vulnerability scan

### Package Management (CRITICAL)

- ALWAYS `bun` or `bun x` (NEVER npm/yarn/pnpm)
- React Native Reusables: `bun x --bun @react-native-reusables/cli@latest add <component>`

---

## Anti-Patterns (NEVER)

- NEVER create new utils/hooks without checking `~/lib/utils/` and `~/lib/hooks/` first
- NEVER use `sonner` or `sonner-native` directly → use wrapper from `~/lib/services/toaster`
- NEVER use raw `useForm` from `@tanstack/react-form` → use `useAppForm` from `~/components/tanstack-form` and exported composed components (`form.AppForm`, `form.AppField`, `field.Label`, `field.Input`, etc.)
- NEVER import `~/lib/services/prisma` from client-side code (components, hooks, screens) → Prisma is server-only (Node.js). Only import from `+api.ts` routes, server functions, or `+middleware.ts`

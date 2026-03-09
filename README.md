# {app_name}

> [!IMPORTANT]
> **First-time setup** — Copy-paste this prompt into Claude Code:
>
> ```
> Use AskUserQuestion to collect these values: App Name (display name), App Description, App Slug (kebab-case), Bundle ID (reverse-domain, e.g. com.company.app), Production URL (domain without https://), iTunes ID (for App Store listing), Apple Team ID (or skip). Then replace the placeholders across the codebase: `{app_name}` in app.json/README.md/CLAUDE.md, `{app_description}` in README.md/CLAUDE.md, `{app_slug}` in app.json/package.json, `{app_bundle_identifier}` in app.json/public/.well-known/*, `{production_url}` in app.json/src/app/+middleware.ts, `{itunes_id}` in src/app/+html.tsx, `{APPLE_TEAM_ID}` in public/.well-known/apple-app-site-association. After replacements, remove this IMPORTANT block from README.md, then run `rm bun.lock && bun install`.
> ```

> [!TIP]
> **Mobile-only mode** — If you don't need web support, copy-paste this prompt into Claude Code:
>
> ```
> Strip all web support from the project. Delete: src/app/(public)/, src/app/__tests__/, src/app/+html.tsx, src/app/+middleware.ts, src/app/index.tsx, src/features/navigation/, src/lib/services/toaster.web.ts, public/, .maestro/public/, .maestro/app/home.web.yaml. Remove deps: react-native-web, react-dom, sonner, @expo/html-elements, expo-server, @tanstack/react-query-devtools. In app.json: remove the "web" field and remove "unstable_useServerMiddleware" from the expo-router plugin. In package.json: remove "build" and "serve" scripts. In .maestro/config.yaml: remove the "public/*" flow entry. In src/features/app-providers.tsx: remove the React Query Devtools lazy import, the hasReactQueryDevtools check, and the conditional <Suspense>/<ReactQueryDevtools> render. In src/app/_layout.tsx: remove the Platform import and the `Platform.OS !== 'web'` font-loading guard. In src/app/(app)/index.tsx: remove the expo-router/head import and the <Head> component. Remove all remaining imports of "expo-router/head" across the codebase. After cleanup, delete .claude/rules/web.md (web-specific Claude rules). Update README.md (remove web references: the "w" shortcut, "build"/"serve" commands, web E2E commands) and update CLAUDE.md (remove web-specific sections: (public) routes, +middleware.ts, +html.tsx, .web.ts/.native.ts suffixes, public/ folder, toaster anti-pattern, web E2E commands/tags). Remove this TIP block from README.md, then run `rm bun.lock && bun install && bun typecheck && bun lint`.
> ```

{app_description}

## Requirements

- **Node.js** 22+ (LTS)
- **Bun** 1.3+
- **Expo CLI** (installed via Bun)
- **iOS Simulator** (macOS only) or **Android Emulator** for mobile development
- **Maestro** - E2E testing (`brew install maestro`)

> Run `bun x expo-doctor` to verify your environment is properly configured.

## Quickstart

```bash
# Install dependencies
bun install

# Create environment file
cp .env.template .env

# Start development server
bun dev
```

Then press:

- `i` to open iOS Simulator
- `a` to open Android Emulator
- `w` to open in web browser

## Available Commands

### Development

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `bun dev`       | Start Expo development server (clears cache) |
| `bun run build` | Build the web output ready for production    |
| `bun serve`     | Serve the web build                          |

### Code Quality

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `bun typecheck` | Run TypeScript validation          |
| `bun lint`      | Run Ultracite linter with auto-fix |
| `bun knip`      | Find unused dependencies           |

### Testing

| Command                                  | Description                    |
| ---------------------------------------- | ------------------------------ |
| `bun run test`                           | Run tests with coverage report |
| `bun run test --findRelatedTests <file>` | Run tests for specific file    |

### E2E Testing (Maestro)

| Command                                | Description                         |
| -------------------------------------- | ----------------------------------- |
| `bun e2e`                              | Run all E2E tests                   |
| `bun e2e --exclude-tags platform:web ` | Run mobile E2E tests (excludes web) |
| `bun e2e --include-tags platform:web`  | Run web E2E tests (Chromium)        |
| `maestro studio`                       | Open Maestro Studio                 |

### Maintenance

| Command               | Description                                                                           |
| --------------------- | ------------------------------------------------------------------------------------- |
| `bun clean`           | Clean artifacts and caches (.expo, coverage, node_modules, etc.)                      |
| `bun i18n`            | Extract translation messages from source code (runs automatically on pre-commit hook) |
| `bun x expo-optimize` | Optimize all image assets (lossless compression)                                      |
| `bun x expo-doctor`   | Check environment readiness for Expo                                                  |
| `bun x snyk test`     | Run security vulnerability scan                                                       |

## Git Flow & CI/CD

Branches: `main` (stable) ← `type/desc` feature branches via PR. Tags `v*` for production releases.
Commits: [Conventional Commits](https://www.conventionalcommits.org/) — `type(scope): message`

| Trigger        | Workflow                | Action                                                |
| -------------- | ----------------------- | ----------------------------------------------------- |
| Pull Request   | `pr-preview.yml`        | OTA preview + GitHub comment                          |
| Push to `main` | `deploy.yml`            | Fingerprint → OTA update or build preview             |
| Tag `v*`       | `deploy.yml`            | Fingerprint → OTA update or build production + submit |
| Manual         | `development-build.yml` | Build dev client (Android/iOS)                        |

All workflows notify via Slack. The CI uses `@expo/fingerprint` to skip native builds when only JS/assets changed (OTA in seconds vs full build in ~20min).

_It requires to add `SLACK_WEBHOOK_URL` and `EAS_USE_CACHE=1` secrets on [expo.dev](https://expo.dev)_

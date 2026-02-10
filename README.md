> [!IMPORTANT]
> **First-time setup** — Copy-paste this prompt into Claude Code:
>
> ```
> Use AskUserQuestion to collect these values: App Name (display name), App Description, App Slug (kebab-case), Bundle ID (reverse-domain, e.g. com.company.app), Production URL (domain without https://), iTunes ID (for App Store listing), Apple Team ID (or skip). Then replace the placeholders across the codebase: `{app_name}` in app.json/README.md/CLAUDE.md, `{app_description}` in README.md/CLAUDE.md, `{app_slug}` in app.json/package.json, `{app_bundle_identifier}` in app.json/public/.well-known/*, `{app_production_url}` in app.json/app/+middleware.ts, `{itunes_id}` in app/+html.tsx, `{APPLE_TEAM_ID}` in public/.well-known/apple-app-site-association. After replacements, remove this IMPORTANT block from README.md, then run `rm bun.lock && bun install`.
> ```

# {app_name}

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

| Command             | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `bun clean`         | Clean artifacts and caches (.expo, coverage, node_modules) |
| `bun x expo-doctor` | Check environment readiness for Expo                       |
| `bun x snyk test`   | Run security vulnerability scan                            |

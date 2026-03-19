---
paths:
  - '**/.maestro/**/*.yaml'
  - '**/.maestro/**/*.yml'
---

# Maestro — E2E Flows

## Structure

- **One journey per flow** — compose small flows with `runFlow`, never monolithic 50-step files
- **Always `clearState: true`** on `launchApp` — each flow starts from a clean slate
- **Always tag flows** in frontmatter: `smoke`/`regression` (priority), `feature:<name>` (area), `mobile`/`web` (platform)
- **Directory mirrors Expo Router** route groups: `.maestro/app/`, `.maestro/public/`, `.maestro/common/`
- **Reusable flows** in `.maestro/common/` — NO frontmatter `appId`, parametrized via `env` variables

## Selectors (mobile)

- **Priority**: `label:` (accessibilityLabel) > `text:` (visible text) > `id:` (testID) — accessibility-first
- `label:` — most robust, tied to accessibility, stable across UI changes
- `text:` — good for buttons, headings, static labels; supports regex (`'.*Welcome.*'`)
- `id:` — last resort for dynamic content, icon-only buttons, decorative images
- `index:` — disambiguation when multiple elements match (0-based)
- Relational: `below:`, `childOf:` for positioning relative to other elements

## Web Flows

- **File naming**: `<feature>.web.yaml` suffix
- **Tags**: Always include `web`
- **No `appId`** — use `openLink:` instead of `launchApp`
- **Selectors**: `css:` for DOM elements (inputs, specific elements), `text:` for visible text (buttons, headings)
- No `label:` selector in web — use `css:` or `text:` instead
- `clearState`, `hideKeyboard`, device commands unavailable in web

## Environment Variables

- `${VARIABLE_NAME}` syntax — pass via `runFlow env:` or CLI `-e` flag
- **No hardcoded secrets** — parametrize credentials via env variables

## Platform Conditions

- `when: { platform: iOS }` / `when: { platform: Android }` for platform-specific steps
- `when: { visible: 'Cookie Banner' }` for conditional UI handling

## NEVER

- **NEVER** use `waitForTimeout` — use `assertVisible` with `timeout`
- **NEVER** hardcode secrets — parametrize via `${VARIABLE}` + `runFlow env:`
- **NEVER** write monolithic flows — compose with `runFlow`
- **NEVER** omit tags — every flow must have priority + feature + platform tags
- **NEVER** use `point:` coordinates unless absolutely unavoidable (breaks across devices)
- **NEVER** use `id:` when `label:` or `text:` would work — accessibility-first

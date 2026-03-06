---
paths:
  - "**/*.{ts,tsx}"
  - "!**/*.{native,ios,android}.{ts,tsx}"
---

# Web Conventions

## Universal Semantic Elements

All UI uses RN primitives via `react-native-web`. Use **`@expo/html-elements`** for semantic structure (proper HTML on web, compatible on native).

- **Layout**: `Header`, `Footer`, `Nav`, `Main`, `Section`, `Article`, `Aside` — NEVER bare `View` where semantic applies
- **Text**: `~/components/ui/text` (H1-H4, Text, P, Muted, Small) — **Links**: `<Link>` from `expo-router` — **Lists**: `UL`, `LI`
- **Buttons**: `<Pressable>` / project `Button` — **Forms**: `nativeID` + `aria-labelledby` pattern
- NEVER raw HTML (`<div>`, `<span>`, `<button>`, `<a>`, `<ul>`) — breaks native compatibility

## `'use dom'` Directive

- Runs React web code in a WebView on native, as-is on web — **transitional only** (migration, web-only libs)
- Top of file, serializable props only (no functions/refs) — replace with native equivalents when available

## Web-Specific Styling

- `Platform.select()` in `cn()` for web-only: **hover**, **focus-visible**, **cursor**, transitions
- `select-text` class for copyable content, **`focus-visible`** for keyboard indicators
- NEVER remove focus outline without a visible replacement

## Routing Architecture

- **`(app)`** — native + web application (authenticated)
- **`(public)`** — marketing website (public, SEO-optimized)
- **Redirects** — Root index: `Platform.OS === 'web'` → `/(public)`, native → `/(app)`
- **`+middleware.ts`**: server-side routing between app/public in production
- **`+html.tsx`** — web-only root HTML (DOCTYPE, head, meta, fonts, favicon)
- **`Head`** from `expo-router/head` for per-page SEO (title, og tags, canonical)
- **Static rendering** — `unstable_settings`: `anchor: 'index'`, **`render: 'static'`** for SSG (landing, docs, blog)

## Responsive Design

- **Mobile-first**: design for mobile, add breakpoints
- Breakpoints: **`sm:`** 768px, **`md:`** 1024px, **`lg:`** 1280px

## Web E2E (Maestro)

- Files: `.maestro/<feature>.web.yaml`, tags: `platform:web`
- Selectors: **`css:`** prefix, fallback to accessibilityLabel
- Run: `bun e2e --include-tags platform:web`

## Anti-Patterns (NEVER)

- NEVER use raw HTML elements (`<div>`, `<button>`, `<a>`, `<ul>`) — use RN primitives + `@expo/html-elements`
- NEVER use `'use dom'` for new features — only for web code migration/transition
- NEVER pass non-serializable props (functions, refs) to `'use dom'` components

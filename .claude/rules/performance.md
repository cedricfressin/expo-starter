---
paths:
  - "**/*.{ts,tsx}"
  - "app.json"
---

# Performance

## Bundle Size

- **`expo-atlas`** (configured via `EXPO_ATLAS=true`) for bundle analysis — check after adding large deps
- Prefer **tree-shakeable** imports: `import { X } from 'lib/X'` over `import { X } from 'lib'`
- **Async routes** enabled (`asyncRoutes: "production"`) — route-based code splitting is automatic
- `lazy()` for heavy components not on the critical path (modals, settings, admin panels)
- Review bundle impact before adding new dependencies > 50KB

## Images & Assets

- **WebP** for photos, **SVG** for icons — run `bun x expo-optimize` before release
- Provide multiple densities: `@1x`, `@2x`, `@3x` — use `expo-image` with `placeholder={{ blurhash }}`
- Lazy-load off-screen images, set explicit `width`/`height` to prevent layout shift

## Rendering

- **React Compiler** handles memoization — NEVER manual `useMemo`/`useCallback`/`memo`
- **`<Activity mode="hidden">`** for heavy components toggled by visibility (not ternary/`&&`)
- **Virtualized lists** (`FlatList`/`SectionList`) — NEVER `.map()` in ScrollView for dynamic data
- `getItemLayout` for fixed-height items, stable `keyExtractor` with unique IDs

## Web Core Vitals

- **LCP** < 2.5s — preload hero images, minimize blocking resources
- **CLS** < 0.1 — explicit dimensions on images/embeds, skeleton placeholders
- **INP** < 200ms — `useTransition()` for non-blocking updates, avoid long tasks
- Static rendering (`render: 'static'`) for marketing pages in `(public)`

## Network

- **TanStack Query** `staleTime: 60_000` — avoid redundant refetches
- Prefetch in layouts for anticipated navigation
- `maxPages` in `useInfiniteQuery` to cap memory usage

## Anti-Patterns (NEVER)

- NEVER import entire libraries when only a few functions are needed
- NEVER use `.map()` to render lists in ScrollView — use FlatList
- NEVER skip image optimization — always run `expo-optimize` before release
- NEVER add dependencies > 50KB without checking bundle impact via expo-atlas

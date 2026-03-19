---
paths:
  - '**/*.web.ts'
  - '**/*.web.tsx'
  - '**/+html.tsx'
  - '**/*.tsx'
  - '**/*.ts'
---

# Web Layer Rules

## Semantic HTML

- **ALWAYS** use `@expo/html-elements` for structural markup: `H1`–`H6`, `P`, `Header`, `Nav`, `Main`, `Footer`, `Section`, `Article`, `Aside`, `UL`, `LI`, `A` (external links), `Strong`, `EM`, `Table`, `HR`, `Code`, `Pre`, `BlockQuote`
- **NEVER** use raw `<div>`, `<span>`, `<p>`, `<h1>` etc. in `.tsx` files — they don't render on native
- **NEVER** use `<Text>` for headings — use `<H1>`–`<H6>` for proper heading hierarchy on web
- In-app navigation → `<Link>` from Expo Router | External links → `<A>` from `@expo/html-elements`

## Platform Splitting

- Web-only code (browser APIs, `navigator.*`, `window.*`, `document.*`) → `.web.ts` / `.web.tsx` files
- **NEVER** import browser globals directly in shared `.ts`/`.tsx` files — Metro will bundle them on native and crash
- Use `Platform.select()` or `Platform.OS === 'web'` only for trivial differences (a className, a prop value)
- For anything more than a one-liner → split into `.web.ts` + `.ts` (or `.native.ts`) files

## Uniwind — Web Variants

- **ALWAYS** prefix web-only CSS properties with `web:`: `web:cursor-pointer`, `web:pointer-events-none`, `web:select-none`, `web:select-text`
- **ALWAYS** prefix `hover:` with `web:` → `web:hover:bg-muted/80` — hover has no native equivalent
- **ALWAYS** pair `web:hover:` with `active:` for universal feedback → `web:hover:bg-muted/80 active:bg-muted/70`
- `web:focus-visible:` for keyboard focus rings — `web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:outline-none`
- Container queries (`@container`, `@md:`) → web only, not supported on native

## Responsive Layout

- Mobile-first: unprefixed = all screens, `sm:` / `md:` / `lg:` / `xl:` / `2xl:` for larger
- Web max-width containers → `web:max-w-5xl web:mx-auto`
- Safe area → `pt-safe pb-safe px-safe`, `mt-safe-or-4`, `h-screen-safe` (Uniwind built-in)

## Web-Only APIs

- **NEVER** use `localStorage`, `window.location`, `navigator.*`, `document.*` in shared code
- Browser APIs → `.web.ts` split with cross-platform alternative in `.ts`
- See reference for full API alternatives table

## SEO

- Use `<Head>` from `expo-router/head` to inject `<title>`, `<meta>` tags per route
- `app/+html.tsx` for root HTML shell customization (server-side only)

## Progressive Enhancement

1. Start with the universal component (works on all platforms)
2. Enhance for web with `web:` prefix classes or `.web.tsx` overrides
3. **NEVER** break native to add a web feature

## NEVER

- **NEVER** use `hover:` without `web:` prefix — it silently no-ops on native and misleads
- **NEVER** use `cursor-pointer`, `pointer-events-*`, `select-none` without `web:` prefix
- **NEVER** use `StyleSheet.create` in server components (RSC)
- **NEVER** mix static and server rendering in the same project

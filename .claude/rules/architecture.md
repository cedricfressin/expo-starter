---
paths:
  - "**/*.{ts,tsx}"
---

# Architecture & Services

## Providers (2 layers)

- **RootProviders** (`src/app/_layout.tsx`) — **ALL routes**: Uniwind, ThemeProvider (`navTheme`), StatusBar, SafeArea
- **AppProviders** (`src/app/(app)/_layout.tsx`) — **app routes only**: QueryClient (module scope, not in component), PortalHost, Toaster, React Query Devtools (lazy, web-only, dev-only)
- Determine scope: all routes → **RootProviders**, app-only → **AppProviders**

## Services

- **Toast** — NEVER import `sonner`/`sonner-native` directly → **always** `~/lib/services/toaster` (platform-split: `.ts` native, `.web.ts` web)
- **HTTP** — **`upfetch`** from `~/lib/services/upfetch`, pre-configured: `/api` baseUrl, JSON headers, request/response serialization
- **Theme** — `~/lib/theme.ts` exports `navTheme` (light/dark HSL), synced with CSS variables in `global.css`

## Authentication & Protected Routes

- **`(public)`** — unauthenticated: landing, login, register, password reset
- **`(app)`** — authenticated: requires valid session, redirects to login if expired
- **Protected Routes**: use Expo Router **`<Protected>`** component in `(app)/_layout.tsx` — redirects unauthenticated users automatically
- **`+middleware.ts`** — server-side auth checks for web (cookie/token validation)
- **Token management**: access token in-memory, refresh token in `expo-secure-store` (native) / `httpOnly` cookie (web)
- **Token refresh**: intercept 401 in `upfetch` middleware, refresh silently, retry — queue concurrent requests during refresh
- **Auth context**: provides `user`, `isAuthenticated`, `isLoading`, `signIn`, `signOut`
- **Session restore**: from SecureStore on app launch before splash hide — NEVER flash login screen
- **API routes**: validate token in every handler — NEVER trust client-only auth

## API Routes

- Convention: `src/app/api/<name>+api.ts` → `/api/<name>`
- Export named HTTP methods: **`GET`**, **`POST`**, **`PUT`**, **`PATCH`**, **`DELETE`**
- Each receives `Request`, returns `Response` (Web standard)
- Dynamic params: `src/app/api/users/[id]+api.ts`

## Server

- **`'use server'`** directive for client-callable functions
- **`import "server-only"`** guard on server-only modules (API helpers, DB, secrets)
- Validate inputs with Zod `safeParse()`, return `{ error: { code, message, details } }`
- NEVER expose stack traces or internals

## Error Reporting & Logging

- **Sentry** (`@sentry/react-native`) for crash/error reporting in production
- Initialize in root layout, configure source maps upload in EAS Build
- **NEVER** `console.log` in production — use `__DEV__` guard or remove
- Log levels: `error` (crashes, API failures), `warn` (degraded UX), `info` (key user actions)

## Security

- NEVER leave write endpoints unprotected — rate limit per-user/IP
- NEVER skip CSRF tokens for mutations, CORS for allowed origins, CSP headers
- NEVER expose secrets or stack traces — HTTPS in production, audit log sensitive ops
- NEVER store tokens in AsyncStorage or plain storage — use `expo-secure-store`
- NEVER expose tokens in URLs, logs, or error messages
- NEVER hardcode auth secrets in client code — use env vars + server-side only
- Invalidate all sessions on password change, rate-limit login attempts per IP

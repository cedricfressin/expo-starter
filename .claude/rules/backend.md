---
paths:
  - '**/app/api/**'
  - '**/app/+html.ts'
  - '**/app/+middleware.ts'
---

# Backend Rules

## Route Structure

- Group by domain resource, not HTTP method
- `index+api.ts` for collections, `[param]+api.ts` for individual resources
- Nest sub-resources: `app/api/posts/[postId]/comments+api.ts`

## Handler Conventions

- **`+api.ts` suffix** — all routes under `app/api/`
- Export named `function` per HTTP verb: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Unexported verbs auto-return `405`
- Standard Web `Request`/`Response` only — no `ExpoRequest`/`ExpoResponse` (removed SDK 55)
- Route params via second argument: `(request: Request, { id }: Record<string, string>)`
- Query params via `new URL(request.url).searchParams` — **not** in route params
- Type request body as `unknown`: `const body: unknown = await request.json()`

## Middleware

- Single file: `app/+middleware.ts` — `export default function middleware(request: ImmutableRequest)`
- Request is **immutable** — read-only `url`, `method`, `headers.get()`, `headers.has()`
- Return `Response` to short-circuit, return nothing to continue
- Matcher via `export const unstable_settings = { matcher: { methods, patterns } }`

## Validation

- **Always** validate body, query params, and path params with Zod
- Shared schemas in `~/schemas/` — single source of truth for client and server
- `422` for body validation errors, `400` for malformed query/path params

## Error Handling

- `StatusError` from `expo-server` for expected failures (404, 403, 409)
- Consistent response shape: `{ data }` for success, `{ errors }` for validation, `{ error }` for domain errors
- `try/catch` only for expected external errors — let unexpected errors propagate
- `runTask`/`deferTask` for async logging — never block the response

## Auth

- Validate tokens server-side on **every** protected request
- Extract user from token — never trust client-sent user IDs
- Use `requireAuth`/`requireRole` helpers that throw `StatusError`

## Security

- Set security headers via middleware or `setResponseHeaders`
- Rate limit sensitive endpoints at infrastructure level
- Use CORS headers only when cross-origin access is explicitly needed

## NEVER

- **NEVER** use `ExpoRequest`/`ExpoResponse` — removed in SDK 55
- **NEVER** expose stack traces or internal errors to clients
- **NEVER** trust client-sent data for authorization decisions
- **NEVER** use dynamic imports inside API routes
- **NEVER** use platform-specific extensions on `+api.ts` files
- **NEVER** mutate the middleware request object — it is immutable

---
paths:
  - '**/prisma/**'
  - '**/*.prisma'
  - '**/*.sql'
---

# Prisma Rules

## Schema

- Models: **PascalCase singular** — fields: **camelCase** — enums: **SCREAMING_SNAKE_CASE**
- **Always** `@@map("snake_case_plural")` on every model and `@map("snake_case")` on every field
- Primary keys: `@id @default(cuid())` — **never** `autoincrement()`
- **Every model** must have `createdAt DateTime @default(now()) @map("created_at")` + `updatedAt DateTime @updatedAt @map("updated_at")`

## Relations

- **Always** explicit join tables for N:N with `@@id([fkA, fkB])`
- **Always** specify `onDelete` — prefer `Cascade` or `Restrict`, never rely on the default
- Self-relations: named `@relation("name")` on both sides

## Indexes

- **Always** `@@index` on every foreign key — PostgreSQL does NOT auto-index FKs
- Composite indexes: most selective column first, sort column last
- Partial indexes / GIN / GiST: raw SQL in migration file (Prisma schema doesn't support them)

## Migrations

- `bun x prisma migrate dev --name verb_noun` (snake*case: `add*`, `create*`, `remove*`)
- One concern per migration
- **Never** `prisma db push` outside of prototyping
- **Never** drop/rename columns directly in production — multi-step rollout

## Seed

- Config: `"prisma": { "seed": "bun prisma/seed.ts" }` in package.json
- **Always** idempotent — use `upsert`

## Generated Client

- Import types from `@prisma/client` — **never** manually duplicate generated types
- Use `Prisma.ModelGetPayload<{ select/include }>` for query-specific types
- Use `Prisma.ModelCreateInput` / `Prisma.ModelUpdateInput` for mutation payloads

## Better-Auth

- **Always** generate auth schema via CLI: `bun x @better-auth/cli@latest generate`
- Run after any Better-Auth config change (plugins, fields)
- **Never** manually create or rename Better-Auth generated models

## Row-Level Security (RLS)

- **Enable RLS** on every table containing user data — defense in depth with app-level checks
- `ALTER TABLE x ENABLE ROW LEVEL SECURITY` + `FORCE ROW LEVEL SECURITY` (owner also respects policies)
- One policy per operation (SELECT, INSERT, UPDATE, DELETE) for granular control
- Set user context per transaction: `set_config('app.current_user_id', userId, true)`
- Migration order: create table → enable RLS → create policies → application code
- **Test policies** — integration tests must verify unauthorized access returns empty results

## Production

- **Always** SSL: `?sslmode=require` in connection string
- Connection pooling (PgBouncer) for serverless/edge
- `connection_limit`: dev (5), production (10–20)

## NEVER

- **NEVER** use implicit many-to-many — always explicit join tables
- **NEVER** skip `@@map` / `@map` — Prisma ↔ PostgreSQL naming must be explicit
- **NEVER** instantiate `PrismaClient` in a request handler — singleton only
- **NEVER** use `$queryRawUnsafe` without validated inputs
- **NEVER** use `findMany()` without `take` on user-facing queries
- **NEVER** nest `$transaction` — Prisma has no savepoints
- **NEVER** mix `select` and `include` at the same level
- **NEVER** skip RLS on tables with user data
- **NEVER** connect without SSL in production

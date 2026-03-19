---
paths:
  - '**/*.tsx'
  - '**/schemas/**'
---

# Forms & Validation Rules

## TanStack Form

- **ALWAYS** `useAppForm` from `~/components/custom/tanstack-form` — NEVER raw `useForm`
- Field components: `field.Field`, `field.Label`, `field.Input`, `field.Message`, `field.Checkbox`, `field.RadioGroup`, `field.Toggle`
- Form components: `form.AppForm` (context), `form.AppField` (field wrapper), `form.SubmitButton`
- `form.Subscribe` for reactive state (`isSubmitting`, `canSubmit`, `isDirty`, `isValid`)

## Zod Schemas

- **Single source of truth** in `~/schemas/` — shared between client (`validators.onChange`) and server (`safeParse`)
- Zod implements **Standard Schema** — pass directly to TanStack Form validators, no adapter needed
- Derive types: `z.infer<typeof schema>` — NEVER duplicate schema types manually
- Compose: `.extend()`, `.pick()`, `.omit()`, `.partial()` for variants

## Validation Strategy

- **Sync validation** → Zod schema in `useAppForm({ validators: { onChange: schema } })`
- **Async validation** (uniqueness checks) → field-level `validators.onChangeAsync` with `onChangeAsyncDebounceMs`
- **Dependent fields** → `onChangeListenTo` to re-validate when another field changes
- **Server errors** → `validators.onSubmitAsync` returning `{ form, fields }` error shape

## Default Values & Reset

- Mount form only after query data loads — NEVER pass `undefined` defaultValues
- `form.reset()` after mutation: **await** `invalidateQueries` first — otherwise reset uses stale data

## Multi-Step Forms

- `<Activity mode="visible" | "hidden">` to preserve step state between steps
- Each step is a `withForm` sub-form — data persists automatically

## Submission

- Submit button **always enabled** — `disabled` only during submission
- `onSubmit({ value })` receives **raw input**, not Zod-transformed output — call `schema.parse(value)` if transforms are used

## NEVER

- **NEVER** use raw `useForm` — always `useAppForm`
- **NEVER** use `@tanstack/zod-form-adapter` — Zod Standard Schema works natively
- **NEVER** pass `undefined` defaultValues — mount form after data loads
- **NEVER** disable submit button for validation — only during submission

---
paths:
  - "**/*form*"
  - "**/*schema*"
  - "**/*validation*"
  - "src/components/custom/tanstack-form*"
---

# Forms & Validation

## General

- **TanStack Form + Zod** for complex forms, `useActionState` + Server Actions for simple
- Validate with Zod on **client (UX) AND server (security)** via `schema.safeParse()`
- `z.infer<typeof schema>` for types, handle all states (loading, success, error)
- Keep submit button **always enabled**, preserve values on error

## Accessibility

- Web: `<label htmlFor>` + `<input id>`. RN: `nativeID` + `aria-labelledby`
- Errors with `role="alert"` + `aria-describedby`, `aria-required="true"` for required
- Proper `inputMode`/`autoComplete` (web) or `keyboardType`/`textContentType` (RN)

## Validation

- NEVER skip server-side validation — validate on client (UX) AND server (security)
- NEVER use blocklists — use allowlists, sanitize (SQL/XSS), fail early with field-specific messages

## Project Form Composition API

- NEVER raw `useForm` → always **`useAppForm`** from `~/components/custom/tanstack-form`
- **Form-level**: `form.AppForm` (context), `form.AppField` (field wrapper), `form.SubmitButton`
- **Field-level** (render prop): `field.Field`, `field.Label`, `field.Description`, `field.Message`, `field.Input`, `field.Textarea`, `field.Checkbox`, `field.RadioGroup`, `field.Toggle`
- Layout: `field.Field` > `field.Label` > input > `field.Message`
- Labels auto-bound via `nativeID` + `aria-labelledby`
- `useFieldInvalid()`: errors show after touch OR first submit attempt
- SubmitButton auto-disables with ActivityIndicator during submission

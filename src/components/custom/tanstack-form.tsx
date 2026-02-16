/**
 * TanStack Form integration with pre-bound React Native Reusable components.
 *
 * Provides a configured form hook that automatically binds field components
 * to form state, with composable layout primitives for flexible form design.
 *
 * @example Basic usage
 * ```tsx
 * import { useAppForm } from '~/components/tanstack-form'
 *
 * function LoginForm() {
 *   const form = useAppForm({
 *     defaultValues: { email: '', password: '' },
 *     async onSubmit({ value }) {
 *       await loginMutation.mutateAsync(value)
 *     },
 *   })
 *
 *   return (
 *     <form.AppForm>
 *       <form.AppField name="email">
 *         {(field) => (
 *           <field.Field>
 *             <field.Label>Email</field.Label>
 *             <field.Input keyboardType="email-address" autoCapitalize="none" />
 *             <field.Message />
 *           </field.Field>
 *         )}
 *       </form.AppField>
 *       <form.AppField name="password">
 *         {(field) => (
 *           <field.Field>
 *             <field.Label>Password</field.Label>
 *             <field.Input secureTextEntry />
 *             <field.Message />
 *           </field.Field>
 *         )}
 *       </form.AppField>
 *       <form.SubmitButton>Sign In</form.SubmitButton>
 *     </form.AppForm>
 *   )
 * }
 * ```
 *
 * @example Checkbox and RadioGroup
 * ```tsx
 * <form.AppField name="newsletter">
 *   {(field) => (
 *     <field.Field className="flex-row items-center gap-2">
 *       <field.Checkbox />
 *       <field.Label>Subscribe to newsletter</field.Label>
 *     </field.Field>
 *   )}
 * </form.AppField>
 *
 * <form.AppField name="theme">
 *   {(field) => (
 *     <field.Field>
 *       <field.Label>Theme</field.Label>
 *       <field.RadioGroup
 *         options={[
 *           { value: 'light', label: 'Light' },
 *           { value: 'dark', label: 'Dark' },
 *         ]}
 *       />
 *       <field.Message />
 *     </field.Field>
 *   )}
 * </form.AppField>
 * ```
 *
 * @see {@link https://tanstack.com/form/latest/docs/framework/react/guides/form-composition}
 */

import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import type { ComponentProps, PropsWithChildren } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, type ButtonProps } from '~/components/ui/button'
import { Checkbox as CheckboxPrimitive } from '~/components/ui/checkbox'
import { Input as InputPrimitive } from '~/components/ui/input'
import { Label as LabelPrimitive } from '~/components/ui/label'
import {
  RadioGroupItem,
  RadioGroup as RadioGroupPrimitive
} from '~/components/ui/radio-group'
import { Text } from '~/components/ui/text'
import { Textarea as TextareaPrimitive } from '~/components/ui/textarea'
import { Toggle as TogglePrimitive } from '~/components/ui/toggle'
import { cn } from '~/lib/utils/cn'

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

// ---------------------------------------------------------------------------
// Shared hooks
// ---------------------------------------------------------------------------

function useFieldInvalid() {
  const field = useFieldContext<unknown>()
  const form = useFormContext()
  const hasErrors = field.state.meta.errors.length > 0

  return (
    (field.state.meta.isTouched && hasErrors) ||
    (form.state.submissionAttempts > 0 && hasErrors)
  )
}

// ---------------------------------------------------------------------------
// Field layout components
// ---------------------------------------------------------------------------

/** Wrapper `View` for a form field. Provides vertical gap layout. */
function Field({ className, ...props }: ComponentProps<typeof View>) {
  return <View className={cn('gap-2', className)} {...props} />
}

/** Label bound to the current field name via `nativeID`. */
function Label(props: ComponentProps<typeof LabelPrimitive>) {
  const field = useFieldContext<unknown>()
  return <LabelPrimitive nativeID={`${field.name}-label`} {...props} />
}

/** Description text below a field (muted style). */
function Description({ className, ...props }: ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

/**
 * Validation error message. Only renders when the field has been touched
 * or the form has been submitted at least once.
 */
function Message({ className, ...props }: ComponentProps<typeof Text>) {
  const field = useFieldContext<unknown>()
  const isInvalid = useFieldInvalid()

  if (!isInvalid) {
    return
  }

  const firstError = field.state.meta.errors.at(0)
  const message =
    typeof firstError === 'string'
      ? firstError
      : (firstError as { message?: string } | undefined)?.message

  if (!message) {
    return
  }

  return (
    <Text className={cn('text-sm text-destructive', className)} {...props}>
      {message}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// Field input components
// ---------------------------------------------------------------------------

/**
 * Single-line text input bound to a TanStack Form field.
 *
 * @example
 * ```tsx
 * <field.Input keyboardType="email-address" autoCapitalize="none" />
 * ```
 */
function Input(
  props: Omit<
    ComponentProps<typeof InputPrimitive>,
    'value' | 'onChangeText' | 'onBlur'
  >
) {
  const field = useFieldContext<string>()
  return (
    <InputPrimitive
      aria-labelledby={`${field.name}-label`}
      onBlur={field.handleBlur}
      onChangeText={field.handleChange}
      value={field.state.value ?? ''}
      {...props}
    />
  )
}

/**
 * Multi-line text input bound to a TanStack Form field.
 *
 * @example
 * ```tsx
 * <field.Textarea numberOfLines={4} />
 * ```
 */
function Textarea(
  props: Omit<
    ComponentProps<typeof TextareaPrimitive>,
    'value' | 'onChangeText' | 'onBlur'
  >
) {
  const field = useFieldContext<string>()
  return (
    <TextareaPrimitive
      aria-labelledby={`${field.name}-label`}
      onBlur={field.handleBlur}
      onChangeText={field.handleChange}
      value={field.state.value ?? ''}
      {...props}
    />
  )
}

/**
 * Boolean checkbox bound to a TanStack Form field.
 *
 * @example
 * ```tsx
 * <field.Field className="flex-row items-center gap-2">
 *   <field.Checkbox />
 *   <field.Label>I accept the terms</field.Label>
 * </field.Field>
 * ```
 */
function Checkbox(
  props: Omit<
    ComponentProps<typeof CheckboxPrimitive>,
    'checked' | 'onCheckedChange'
  >
) {
  const field = useFieldContext<boolean>()
  return (
    <CheckboxPrimitive
      checked={field.state.value ?? false}
      onCheckedChange={field.handleChange}
      {...props}
    />
  )
}

/**
 * Single-choice radio group bound to a TanStack Form field.
 * Renders `RadioGroupItem` + `Label` pairs from the `options` prop.
 *
 * @example
 * ```tsx
 * <field.RadioGroup
 *   options={[
 *     { value: 'light', label: 'Light' },
 *     { value: 'dark', label: 'Dark' },
 *   ]}
 * />
 * ```
 */
function RadioGroup({
  options,
  ...props
}: {
  options: { value: string; label: string }[]
} & Omit<
  ComponentProps<typeof RadioGroupPrimitive>,
  'value' | 'onValueChange'
>) {
  const field = useFieldContext<string>()
  return (
    <RadioGroupPrimitive
      onValueChange={field.handleChange}
      value={field.state.value ?? ''}
      {...props}
    >
      {options.map(option => (
        <View className="flex-row items-center gap-2" key={option.value}>
          <RadioGroupItem
            aria-labelledby={`${field.name}-${option.value}`}
            value={option.value}
          />
          <LabelPrimitive nativeID={`${field.name}-${option.value}`}>
            {option.label}
          </LabelPrimitive>
        </View>
      ))}
    </RadioGroupPrimitive>
  )
}

/**
 * Boolean toggle button bound to a TanStack Form field.
 *
 * @example
 * ```tsx
 * <field.Field className="flex-row items-center gap-2">
 *   <field.Toggle />
 *   <field.Label>Dark mode</field.Label>
 * </field.Field>
 * ```
 */
function Toggle(
  props: Omit<
    ComponentProps<typeof TogglePrimitive>,
    'pressed' | 'onPressedChange'
  >
) {
  const field = useFieldContext<boolean>()
  return (
    <TogglePrimitive
      onPressedChange={field.handleChange}
      pressed={field.state.value ?? false}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Form components
// ---------------------------------------------------------------------------

/**
 * Submit button that auto-disables while the form is validating or submitting.
 *
 * Accepts all `Button` props (variant, size, etc.).
 *
 * @example
 * ```tsx
 * <form.SubmitButton>Save</form.SubmitButton>
 * <form.SubmitButton variant="destructive">Delete</form.SubmitButton>
 * ```
 */
function SubmitButton({
  children,
  ...props
}: PropsWithChildren<Omit<ButtonProps, 'children' | 'onPress' | 'disabled'>>) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={state => ({ isSubmitting: state.isSubmitting })}>
      {({ isSubmitting }) => (
        <Button onPress={form.handleSubmit} {...props}>
          {isSubmitting && <ActivityIndicator size="small" />}
          <Text>{children}</Text>
        </Button>
      )}
    </form.Subscribe>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Pre-configured form hook with bound UI components.
 *
 * Field components available via `field.*` in AppField render prop:
 * - **Layout**: `Field`, `Label`, `Description`, `Message`
 * - **Inputs**: `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Toggle`
 *
 * Form components available via `form.*`:
 * - `AppForm` — Context provider (required at top level)
 * - `AppField` — Field wrapper providing bound components via render prop
 * - `SubmitButton` — Auto-disabling button with loading state
 */
const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Field,
    Label,
    Description,
    Message,
    Input,
    Textarea,
    Checkbox,
    RadioGroup,
    Toggle
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext
})

export { useAppForm, withForm }

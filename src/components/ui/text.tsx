import * as Slot from '@rn-primitives/slot'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  type ComponentProps,
  createContext,
  type RefAttributes,
  useContext
} from 'react'
import { Text as RNText, type Role } from 'react-native'
import { cn } from '~/lib/utils/cn'

const textVariants = cva(
  cn(
    'text-foreground text-base',
    process.env.EXPO_OS === 'web' && 'select-text'
  ),
  {
    variants: {
      variant: {
        default: '',
        h1: cn(
          'text-center text-4xl font-extrabold tracking-tight',
          process.env.EXPO_OS === 'web' && 'scroll-m-20 text-balance'
        ),
        h2: cn(
          'border-border border-b pb-2 text-3xl font-semibold tracking-tight',
          process.env.EXPO_OS === 'web' && 'scroll-m-20 first:mt-0'
        ),
        h3: cn(
          'text-2xl font-semibold tracking-tight',
          process.env.EXPO_OS === 'web' && 'scroll-m-20'
        ),
        h4: cn(
          'text-xl font-semibold tracking-tight',
          process.env.EXPO_OS === 'web' && 'scroll-m-20'
        ),
        p: 'mt-3 leading-7 sm:mt-6',
        blockquote: 'mt-4 border-l-2 pl-3 italic sm:mt-6 sm:pl-6',
        code: cn(
          'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
        ),
        lead: 'text-muted-foreground text-xl',
        large: 'text-lg font-semibold',
        small: 'text-sm font-medium leading-none',
        muted: 'text-muted-foreground text-sm'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

type TextVariantProps = VariantProps<typeof textVariants>

type TextVariant = NonNullable<TextVariantProps['variant']>

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  blockquote:
    process.env.EXPO_OS === 'web' ? ('blockquote' as Role) : undefined,
  code: process.env.EXPO_OS === 'web' ? ('code' as Role) : undefined
}

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: '1',
  h2: '2',
  h3: '3',
  h4: '4'
}

const TextClassContext = createContext<string | undefined>(undefined)

function Text({
  className,
  asChild = false,
  variant = 'default',
  ...props
}: ComponentProps<typeof RNText> &
  TextVariantProps &
  RefAttributes<RNText> & {
    asChild?: boolean
  }) {
  const textClass = useContext(TextClassContext)
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      className={cn(textVariants({ variant }), textClass, className)}
      role={variant ? ROLE[variant] : undefined}
      {...props}
    />
  )
}

export { Text, TextClassContext }

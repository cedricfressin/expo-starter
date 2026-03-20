import * as LabelPrimitive from '@rn-primitives/label'
import { cn } from '~/lib/utils/cn'

function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  ...props
}: LabelPrimitive.TextProps & React.RefAttributes<LabelPrimitive.TextRef>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'flex web:select-none flex-row items-center gap-2',
        process.env.EXPO_OS === 'web' &&
          'cursor-default leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        disabled && 'opacity-50'
      )}
      disabled={disabled}
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <LabelPrimitive.Text
        className={cn(
          'text-foreground text-sm font-medium',
          process.env.EXPO_OS === 'web' && 'leading-none',
          className
        )}
        {...props}
      />
    </LabelPrimitive.Root>
  )
}

export { Label }

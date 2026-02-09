import { cn } from '~/lib/utils/cn'

describe('cn', () => {
  it('merges class names', () => {
    // Arrange
    const classes = ['text-red-500', 'bg-blue-500']

    // Act
    const result = cn(...classes)

    // Assert
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('handles conditional classes', () => {
    // Arrange
    const isActive = true
    const isDisabled = false

    // Act
    const result = cn('base', isActive && 'active', isDisabled && 'disabled')

    // Assert
    expect(result).toBe('base active')
  })

  it('resolves conflicting Tailwind classes', () => {
    // Arrange
    const baseClasses = 'p-4 text-sm'
    const overrideClasses = 'p-2 text-lg'

    // Act
    const result = cn(baseClasses, overrideClasses)

    // Assert
    expect(result).toBe('p-2 text-lg')
  })

  it('handles empty inputs', () => {
    // Arrange & Act
    const result = cn()

    // Assert
    expect(result).toBe('')
  })
})

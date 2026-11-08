import { cn } from '@/lib/utils'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'outline'
  size?: 'sm' | 'md'
  className?: string
  dot?: boolean
}

export function Badge({ children, variant = 'default', size = 'md', className, dot }: BadgeProps) {
  const variants = {
    default: 'bg-zinc-100 dark:bg-dark-elevated text-zinc-700 dark:text-zinc-300',
    accent: 'bg-accent/15 text-zinc-800 dark:text-accent border border-accent/30',
    success: 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800',
    warning: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    error: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800',
    outline: 'bg-transparent border border-light-border dark:border-dark-border text-zinc-600 dark:text-zinc-400',
  }

  const sizes = {
    sm: 'text-2xs px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-0.5 gap-1.5',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-green-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'error' && 'bg-red-500',
            variant === 'info' && 'bg-blue-500',
            variant === 'accent' && 'bg-accent',
            variant === 'purple' && 'bg-purple-500',
            (variant === 'default' || variant === 'outline') && 'bg-zinc-400'
          )}
        />
      )}
      {children}
    </span>
  )
}


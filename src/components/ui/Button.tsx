import { cn } from '@/lib/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'outline' | 'ghost' | 'destructive' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'accent',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-95'

    const variants = {
      accent:
        'bg-accent hover:bg-accent-dark text-zinc-900 shadow-glow-accent hover:shadow-glow-accent-lg rounded-lg',
      outline:
        'border border-light-border dark:border-dark-border bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-dark-elevated rounded-lg',
      ghost:
        'bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-dark-elevated rounded-lg',
      destructive:
        'bg-zuno-error hover:bg-red-600 text-white rounded-lg',
      link: 'bg-transparent text-accent hover:text-accent-dark underline-offset-4 hover:underline p-0 h-auto',
    }

    const sizes = {
      xs: 'h-7 px-2.5 text-xs rounded-md',
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-6 text-base',
      icon: 'h-10 w-10',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], size !== 'icon' ? sizes[size] : sizes.icon, className)}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : leftIcon ? (
          leftIcon
        ) : null}
        {children}
        {!loading && rightIcon ? rightIcon : null}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }


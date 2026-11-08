import { cn } from '@/lib/utils'

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: 'div' | 'article' | 'section' | 'li'
}

export function Card({
  children,
  className,
  hover = false,
  onClick,
  padding = 'md',
  as: Tag = 'div',
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  return (
    <Tag
      onClick={onClick}
      className={cn(
        'zuno-card',
        paddings[padding],
        hover && 'zuno-card-hover cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>{children}</div>
  )
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3 className={cn('text-base font-semibold text-zinc-900 dark:text-zinc-100', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn('text-sm text-zinc-500 dark:text-zinc-400', className)}>{children}</p>
  )
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between pt-4 mt-4 border-t border-light-border dark:border-dark-border',
        className
      )}
    >
      {children}
    </div>
  )
}


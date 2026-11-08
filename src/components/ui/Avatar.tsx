import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'

export interface AvatarProps {
  src?: string | null
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  online?: boolean
}

const sizes = {
  xs: { container: 'h-6 w-6', text: 'text-2xs', indicator: 'h-1.5 w-1.5' },
  sm: { container: 'h-8 w-8', text: 'text-xs', indicator: 'h-2 w-2' },
  md: { container: 'h-10 w-10', text: 'text-sm', indicator: 'h-2.5 w-2.5' },
  lg: { container: 'h-12 w-12', text: 'text-base', indicator: 'h-3 w-3' },
  xl: { container: 'h-16 w-16', text: 'text-xl', indicator: 'h-3.5 w-3.5' },
  '2xl': { container: 'h-24 w-24', text: 'text-3xl', indicator: 'h-4 w-4' },
}

// Deterministic colour from name
function getAvatarColor(name: string): string {
  const colours = [
    'bg-violet-500',
    'bg-blue-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-indigo-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colours[Math.abs(hash) % colours.length]
}

export function Avatar({ src, name = 'User', size = 'md', className, online }: AvatarProps) {
  const s = sizes[size]
  const initials = getInitials(name)
  const bgColor = getAvatarColor(name)

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div
        className={cn(
          s.container,
          'rounded-full overflow-hidden flex items-center justify-center',
          !src && bgColor,
          'ring-2 ring-white dark:ring-dark-bg'
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            sizes={s.container}
          />
        ) : (
          <span className={cn(s.text, 'font-semibold text-white select-none')}>
            {initials}
          </span>
        )}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            s.indicator,
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-dark-bg',
            online ? 'bg-zuno-success' : 'bg-zinc-400'
          )}
        />
      )}
    </div>
  )
}


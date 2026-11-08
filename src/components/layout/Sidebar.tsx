'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import {
  Zap,
  LayoutDashboard,
  Compass,
  User,
  Users,
  MessageSquare,
  Globe2,
  BookOpen,
  Briefcase,
  Rocket,
  FolderOpen,
  Calendar,
  ShoppingBag,
  Bot,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'

const navSections = [
  {
    label: null,
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Discover', href: '/discover', icon: Compass },
      { label: 'Profile', href: '/profile', icon: User },
      { label: 'Connections', href: '/connections', icon: Users },
      { label: 'Messages', href: '/messages', icon: MessageSquare, badge: '3' },
      { label: 'Communities', href: '/communities', icon: Globe2 },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'Learn', href: '/learn', icon: BookOpen },
      { label: 'Careers', href: '/careers', icon: Briefcase },
      { label: 'Startups', href: '/startups', icon: Rocket },
      { label: 'Projects', href: '/projects', icon: FolderOpen },
      { label: 'Events', href: '/events', icon: Calendar },
      { label: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
      { label: 'ZUNO AI', href: '/ai', icon: Bot, accent: true },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Notifications', href: '/notifications', icon: Bell, badge: '5' },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

// Demo logged-in user
const currentUser = {
  name: 'Aisha Okonkwo',
  username: '@aisha_builds',
  role: 'Student · MIT',
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen z-40 flex flex-col',
        'bg-white dark:bg-dark-bg border-r border-light-border dark:border-dark-border',
        'transition-all duration-300 ease-smooth',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 border-b border-light-border dark:border-dark-border flex-shrink-0', collapsed ? 'px-4 justify-center' : 'px-5 gap-2')}>
        <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="h-4 w-4 text-zinc-900 fill-zinc-900" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
            ZUNO
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-2">
        {navSections.map((section, si) => (
          <div key={si} className={si > 0 ? 'mt-5' : ''}>
            {section.label && !collapsed && (
              <div className="px-3 mb-1.5">
                <span className="section-label text-zinc-400 dark:text-zinc-600">
                  {section.label}
                </span>
              </div>
            )}
            {section.label && collapsed && <div className="my-2 mx-3 h-px bg-light-border dark:bg-dark-border" />}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'sidebar-link',
                        isActive && 'active',
                        collapsed && 'justify-center px-0',
                        item.accent && !isActive && 'text-accent/80 hover:text-accent hover:bg-accent/10'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon
                        className={cn(
                          'h-4.5 w-4.5 flex-shrink-0',
                          isActive && 'text-accent',
                          item.accent && !isActive && 'text-accent/70'
                        )}
                        style={{ height: '1.125rem', width: '1.125rem' }}
                      />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="h-5 min-w-5 px-1.5 rounded-full bg-accent text-zinc-900 text-xs font-bold flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {collapsed && item.badge && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Profile + Collapse */}
      <div className="flex-shrink-0 border-t border-light-border dark:border-dark-border">
        {!collapsed && (
          <div className="p-3">
            <Link href="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-colors">
              <Avatar name={currentUser.name} size="sm" online />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {currentUser.name}
                </div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                  {currentUser.role}
                </div>
              </div>
              <TrendingUp className="h-4 w-4 text-zinc-400" />
            </Link>
          </div>
        )}
        <button
          onClick={onToggle}
          className="w-full h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all duration-150"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  )
}


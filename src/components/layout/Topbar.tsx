'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { demoNotifications } from '@/data/demo'
import {
  Search,
  Bell,
  Sun,
  Moon,
  Settings,
  LogOut,
  User,
  ChevronDown,
  X,
  CheckCheck,
} from 'lucide-react'

const currentUser = {
  name: 'Aisha Okonkwo',
  username: '@aisha_builds',
  role: 'Student · MIT',
}

interface TopbarProps {
  sidebarCollapsed: boolean
  pageTitle?: string
}

export function Topbar({ sidebarCollapsed, pageTitle }: TopbarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const unreadCount = demoNotifications.filter((n) => !n.read).length

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 h-16',
        'flex items-center px-5 gap-4',
        'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl',
        'border-b border-light-border dark:border-dark-border',
        'transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      {/* Page title / Search toggle */}
      <div className="flex-1 flex items-center gap-3">
        {!searchOpen ? (
          <>
            {pageTitle && (
              <h1 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 hidden sm:block">
                {pageTitle}
              </h1>
            )}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-dark-elevated text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-dark-hover transition-colors max-w-xs w-full sm:w-72"
            >
              <Search className="h-4 w-4" />
              <span>Search ZUNO...</span>
              <span className="ml-auto text-xs bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded px-1.5 py-0.5 text-zinc-400 hidden sm:block">
                ⌘K
              </span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search people, opportunities, startups, events..."
                className="input-base pl-9 pr-4"
              />
            </div>
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {/* Theme */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all relative"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 glass rounded-xl border border-light-border dark:border-dark-border shadow-modal animate-fade-down overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notifications</span>
                <button className="text-xs text-accent hover:text-accent-dark flex items-center gap-1 transition-colors">
                  <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {demoNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      'flex items-start gap-3 p-4 hover:bg-zinc-50 dark:hover:bg-dark-elevated transition-colors cursor-pointer',
                      !notif.read && 'bg-accent/5 dark:bg-accent/5'
                    )}
                  >
                    <Avatar
                      name={notif.avatar?.name || 'ZUNO'}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {notif.message}
                      </p>
                      <span className="text-xs text-zinc-400 mt-0.5">{notif.time}</span>
                    </div>
                    {!notif.read && (
                      <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-1" />
                    )}
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-light-border dark:border-dark-border">
                <Link href="/notifications" onClick={() => setNotifOpen(false)}>
                  <button className="w-full text-center text-xs text-zinc-500 hover:text-accent dark:text-zinc-400 transition-colors py-1">
                    View all notifications
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all"
          >
            <Avatar name={currentUser.name} size="sm" online />
            <ChevronDown className={cn('h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 hidden sm:block', profileOpen && 'rotate-180')} />
          </button>

          {profileOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 glass rounded-xl border border-light-border dark:border-dark-border shadow-modal animate-fade-down overflow-hidden">
              <div className="p-4 border-b border-light-border dark:border-dark-border">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{currentUser.name}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{currentUser.role}</div>
              </div>
              <div className="p-2">
                {[
                  { label: 'My Profile', href: '/profile', icon: User },
                  { label: 'Settings', href: '/settings', icon: Settings },
                ].map(({ label, href, icon: Icon }) => (
                  <Link key={label} href={href} onClick={() => setProfileOpen(false)}>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-colors cursor-pointer">
                      <Icon className="h-4 w-4" />
                      {label}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-2 border-t border-light-border dark:border-dark-border">
                <Link href="/login">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zuno-error hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


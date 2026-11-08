'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Zap,
  Globe,
  BookOpen,
  Briefcase,
  Rocket,
  Lightbulb,
  ShoppingBag,
  Bot,
} from 'lucide-react'

const navLinks = [
  { label: 'Discover', href: '/discover' },
  {
    label: 'Platform',
    href: '#',
    children: [
      { label: 'ZUNO Learn', href: '/features#learn', icon: BookOpen, description: 'Learning resources & tutorials' },
      { label: 'ZUNO Career', href: '/features#career', icon: Briefcase, description: 'Jobs, internships & scholarships' },
      { label: 'ZUNO Startup', href: '/features#startup', icon: Rocket, description: 'Co-founder & startup discovery' },
      { label: 'ZUNO Innovate', href: '/features#innovate', icon: Lightbulb, description: 'Hackathons & challenges' },
      { label: 'ZUNO Market', href: '/features#market', icon: ShoppingBag, description: 'Freelance & digital products' },
      { label: 'ZUNO AI', href: '/features#ai', icon: Bot, description: 'Your AI learning assistant' },
    ],
  },
  { label: 'Universities', href: '/universities' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
]

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-light-border dark:border-dark-border shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center group-hover:shadow-glow-accent transition-all duration-200">
                  <Zap className="h-4 w-4 text-zinc-900 fill-zinc-900" />
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
                ZUNO
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                      onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all duration-150"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          openDropdown === link.label && 'rotate-180'
                        )}
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-72 glass rounded-xl border border-light-border dark:border-dark-border shadow-modal p-2 animate-fade-down">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-colors duration-150 group"
                          >
                            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                              <child.icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                {child.label}
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                {child.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                      pathname === link.href
                        ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-dark-elevated'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-dark-elevated'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="h-9 w-9 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all duration-150"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              )}

              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="accent" size="sm">
                    Join ZUNO
                  </Button>
                </Link>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden h-9 w-9 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all duration-150"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-light-border dark:border-dark-border animate-fade-down">
            <div className="section-container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.children ? '#' : link.href}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-light-border dark:border-dark-border flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="outline" size="md" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="accent" size="md" className="w-full">
                    Join ZUNO — It&apos;s Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}


'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  ArrowRight,
  Users,
  Globe,
  Star,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

// ─── Branded Left Panel ───────────────────────────────────────────

const avatarSeeds = [
  { initials: 'AO', color: 'bg-zuno-purple' },
  { initials: 'KN', color: 'bg-zuno-cyan' },
  { initials: 'FA', color: 'bg-zuno-pink' },
  { initials: 'MT', color: 'bg-accent text-zinc-900' },
  { initials: 'SR', color: 'bg-zuno-info' },
]

const stats = [
  { label: 'Global Members', value: '142K+', icon: Users },
  { label: 'Countries', value: '89', icon: Globe },
  { label: 'Avg. Rating', value: '4.9★', icon: Star },
]

function BrandPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between h-full min-h-screen bg-zinc-900 p-10 overflow-hidden select-none">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, #C8F135 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-zinc-900/40 to-zinc-900/90" />

      {/* Accent glow blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-10 w-56 h-56 bg-zuno-purple/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-auto">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent shadow-glow-accent">
            <Zap className="w-5 h-5 text-zinc-900" strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-bold text-white tracking-tight">
            ZUNO
          </span>
        </div>

        {/* Hero text */}
        <div className="mt-16 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent tracking-wide uppercase">
              Premium Global Network
            </span>
          </div>
          <h1 className="font-display text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Where talent
            <br />
            meets{' '}
            <span className="text-accent">opportunity.</span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
            Connect with students, professionals, mentors, and founders from
            top universities and companies worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm"
            >
              <Icon className="w-4 h-4 text-accent mb-2" />
              <p className="font-display text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Social proof avatars */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex -space-x-2.5">
            {avatarSeeds.map(({ initials, color }) => (
              <div
                key={initials}
                className={cn(
                  'w-9 h-9 rounded-full border-2 border-zinc-900 flex items-center justify-center text-xs font-bold',
                  color
                )}
              >
                {initials}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-medium text-white">Join 142,000+ members</p>
            <p className="text-xs text-zinc-400">from 89 countries & counting</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-start gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
            ))}
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed italic mb-4">
            &ldquo;ZUNO connected me with my co-founder within two weeks. We
            raised our seed round six months later. This platform is
            genuinely different.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zuno-cyan flex items-center justify-center text-xs font-bold text-white">
              KN
            </div>
            <div>
              <p className="text-sm font-medium text-white">Kenji Nakamura</p>
              <p className="text-xs text-zinc-400">Founder, EduFlow · Tokyo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Validation ───────────────────────────────────────────────────

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ─── Login Form ───────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  function validate() {
    const e: typeof errors = {}
    if (!email.trim()) e.email = 'Email is required.'
    else if (!validateEmail(email)) e.email = 'Enter a valid email address.'
    if (!password) e.password = 'Password is required.'
    else if (password.length < 6) e.password = 'Password must be at least 6 characters.'
    return e
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    setSubmitted(true)
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setLoading(true)
    // Prototype: simulate network delay then redirect
    await new Promise((r) => setTimeout(r, 900))
    router.push('/dashboard')
  }

  async function handleGoogleLogin() {
    setOauthLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    router.push('/dashboard')
  }

  // Live-validate after first submit attempt
  function handleEmailChange(v: string) {
    setEmail(v)
    if (submitted) {
      const e = { ...errors }
      if (!v.trim()) e.email = 'Email is required.'
      else if (!validateEmail(v)) e.email = 'Enter a valid email address.'
      else delete e.email
      setErrors(e)
    }
  }

  function handlePasswordChange(v: string) {
    setPassword(v)
    if (submitted) {
      const e = { ...errors }
      if (!v) e.password = 'Password is required.'
      else if (v.length < 6) e.password = 'Password must be at least 6 characters.'
      else delete e.password
      setErrors(e)
    }
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-bg">
      {/* Left — Brand panel */}
      <div className="lg:w-[52%] xl:w-[55%] flex-shrink-0">
        <BrandPanel />
      </div>

      {/* Right — Form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 bg-white dark:bg-dark-bg min-h-screen">
        {/* Mobile logo (shows only on small screens) */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10 self-start">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent shadow-glow-accent">
            <Zap className="w-4 h-4 text-zinc-900" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold text-zinc-900 dark:text-white">
            ZUNO
          </span>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Welcome back
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Sign in to your ZUNO account to continue.
            </p>
          </div>

          {/* OAuth Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={oauthLoading}
            className="w-full flex items-center justify-center gap-3 h-11 px-4 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-elevated text-zinc-700 dark:text-zinc-200 text-sm font-medium transition-all hover:bg-zinc-50 dark:hover:bg-dark-hover disabled:opacity-60 disabled:cursor-not-allowed mb-6"
          >
            {oauthLoading ? (
              <span className="h-4 w-4 rounded-full border-2 border-zinc-400 border-t-transparent animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
            {!oauthLoading && (
              <span className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500 font-normal hidden sm:inline">
                prototype
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500">or sign in with email</span>
            <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              label="Email address"
              type="email"
              id="login-email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                placeholder="Your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
              />
              <div className="flex justify-end mt-1.5">
                <Link
                  href="#"
                  className="text-xs text-accent hover:text-accent-dark underline-offset-4 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              loading={loading}
              className="w-full mt-2"
              rightIcon={!loading ? <ArrowRight className="w-4 h-4" /> : undefined}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-accent font-medium hover:text-accent-dark underline-offset-4 hover:underline transition-colors"
            >
              Create one free
            </Link>
          </p>

          {/* Supabase note */}
          <div className="flex items-center justify-center gap-1.5 mt-10 text-zinc-400 dark:text-zinc-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-xs">Authentication powered by Supabase</span>
          </div>
        </div>
      </div>
    </div>
  )
}

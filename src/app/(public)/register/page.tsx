'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  User,
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
  ChevronDown,
  Briefcase,
  GraduationCap,
  Building2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────

type Role = 'Student' | 'Professional' | 'Mentor' | 'Founder' | 'Recruiter' | 'University'

// ─── Constants ────────────────────────────────────────────────────

const ROLES: { value: Role; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    value: 'Student',
    label: 'Student',
    icon: <GraduationCap className="w-4 h-4" />,
    desc: 'Enrolled in a university or bootcamp',
  },
  {
    value: 'Professional',
    label: 'Professional',
    icon: <Briefcase className="w-4 h-4" />,
    desc: 'Working in industry',
  },
  {
    value: 'Mentor',
    label: 'Mentor',
    icon: <Users className="w-4 h-4" />,
    desc: 'Guiding the next generation',
  },
  {
    value: 'Founder',
    label: 'Founder',
    icon: <Zap className="w-4 h-4" />,
    desc: 'Building a startup or company',
  },
  {
    value: 'Recruiter',
    label: 'Recruiter',
    icon: <User className="w-4 h-4" />,
    desc: 'Sourcing talent for teams',
  },
  {
    value: 'University',
    label: 'University',
    icon: <Building2 className="w-4 h-4" />,
    desc: 'Institutional or admin account',
  },
]

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

// ─── Password Strength ────────────────────────────────────────────

function getPasswordStrength(pw: string): {
  score: number
  label: string
  color: string
} {
  if (!pw) return { score: 0, label: '', color: '' }
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const map = [
    { score: 1, label: 'Too weak', color: 'bg-zuno-error' },
    { score: 2, label: 'Fair', color: 'bg-zuno-warning' },
    { score: 3, label: 'Good', color: 'bg-zuno-info' },
    { score: 4, label: 'Strong', color: 'bg-zuno-success' },
  ]
  return map[score - 1] ?? { score: 0, label: '', color: '' }
}

// ─── Left Brand Panel ─────────────────────────────────────────────

function BrandPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between h-full min-h-screen bg-zinc-900 p-10 overflow-hidden select-none">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, #C8F135 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-zinc-900/40 to-zinc-900/90" />

      {/* Accent glow blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-10 w-56 h-56 bg-zuno-purple/10 rounded-full blur-3xl" />

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
        <div className="mt-16 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent tracking-wide uppercase">
              Join the ecosystem
            </span>
          </div>
          <h1 className="font-display text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Your network
            <br />
            is your{' '}
            <span className="text-accent">superpower.</span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
            From students to founders — ZUNO is the platform where
            ambitious people from every corner of the world connect,
            collaborate, and grow together.
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

        {/* Social proof */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex -space-x-2.5">
            {avatarSeeds.map(({ initials, color }) => (
              <div
                key={initials}
                className={cn(
                  'w-9 h-9 rounded-full border-2 border-zinc-900 flex items-center justify-center text-xs font-bold text-white',
                  color
                )}
              >
                {initials}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-medium text-white">Join 142,000+ members</p>
            <p className="text-xs text-zinc-400">New members join every minute</p>
          </div>
        </div>

        {/* Perks list */}
        <div className="space-y-3">
          {[
            'Free to join — always',
            'Discover mentors, co-founders & opportunities',
            'Build your verified global profile',
            'Access exclusive university & industry events',
          ].map((perk) => (
            <div key={perk} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-sm text-zinc-300">{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Validation ───────────────────────────────────────────────────

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

type FormErrors = {
  name?: string
  email?: string
  password?: string
  role?: string
  terms?: string
}

// ─── Register Form ────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<Role | ''>('')
  const [roleOpen, setRoleOpen] = useState(false)
  const [orgName, setOrgName] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const strength = getPasswordStrength(password)
  const selectedRole = ROLES.find((r) => r.value === role)

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!name.trim()) e.name = 'Full name is required.'
    else if (name.trim().length < 2) e.name = 'Name must be at least 2 characters.'
    if (!email.trim()) e.email = 'Email is required.'
    else if (!validateEmail(email)) e.email = 'Enter a valid email address.'
    if (!password) e.password = 'Password is required.'
    else if (password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (!role) e.role = 'Please select your role.'
    if (!acceptTerms) e.terms = 'You must accept the terms to continue.'
    return e
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    setSubmitted(true)
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    router.push('/dashboard')
  }

  // Live-validate individual fields after first submit
  function liveValidate(field: keyof FormErrors, value?: string | boolean) {
    if (!submitted) return
    const e = { ...errors }
    switch (field) {
      case 'name': {
        const v = value as string
        if (!v.trim()) e.name = 'Full name is required.'
        else if (v.trim().length < 2) e.name = 'Name must be at least 2 characters.'
        else delete e.name
        break
      }
      case 'email': {
        const v = value as string
        if (!v.trim()) e.email = 'Email is required.'
        else if (!validateEmail(v)) e.email = 'Enter a valid email address.'
        else delete e.email
        break
      }
      case 'password': {
        const v = value as string
        if (!v) e.password = 'Password is required.'
        else if (v.length < 8) e.password = 'Password must be at least 8 characters.'
        else delete e.password
        break
      }
      case 'role':
        if (!value) e.role = 'Please select your role.'
        else delete e.role
        break
      case 'terms':
        if (!value) e.terms = 'You must accept the terms to continue.'
        else delete e.terms
        break
    }
    setErrors(e)
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-bg">
      {/* Left — Brand panel */}
      <div className="lg:w-[48%] xl:w-[45%] flex-shrink-0">
        <BrandPanel />
      </div>

      {/* Right — Form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 bg-white dark:bg-dark-bg min-h-screen overflow-y-auto">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10 self-start">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent shadow-glow-accent">
            <Zap className="w-4 h-4 text-zinc-900" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold text-zinc-900 dark:text-white">
            ZUNO
          </span>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Create your account
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Join the ZUNO global ecosystem — it&apos;s free, forever.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              id="reg-name"
              placeholder="Aisha Okonkwo"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                liveValidate('name', e.target.value)
              }}
              error={errors.name}
              leftIcon={<User className="w-4 h-4" />}
            />

            {/* Email */}
            <Input
              label="Email address"
              type="email"
              id="reg-email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                liveValidate('email', e.target.value)
              }}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            {/* Password */}
            <div className="space-y-1.5">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="reg-password"
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  liveValidate('password', e.target.value)
                }}
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
              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="pt-0.5">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1 flex-1 rounded-full transition-all duration-300',
                          i <= strength.score
                            ? strength.color
                            : 'bg-zinc-200 dark:bg-dark-elevated'
                        )}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Strength:{' '}
                      <span
                        className={cn(
                          'font-medium',
                          strength.score === 4 && 'text-zuno-success',
                          strength.score === 3 && 'text-zuno-info',
                          strength.score === 2 && 'text-zuno-warning',
                          strength.score === 1 && 'text-zuno-error'
                        )}
                      >
                        {strength.label}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Role Selector */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                I am a…
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleOpen(!roleOpen)}
                  className={cn(
                    'input-base w-full flex items-center justify-between gap-2 text-left',
                    errors.role && 'border-zuno-error focus:ring-zuno-error/50 focus:border-zuno-error',
                    !role && 'text-zinc-400 dark:text-zinc-500'
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    {selectedRole ? (
                      <>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {selectedRole.icon}
                        </span>
                        <span className="text-zinc-900 dark:text-zinc-100">
                          {selectedRole.label}
                        </span>
                      </>
                    ) : (
                      'Select your role'
                    )}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 flex-shrink-0 text-zinc-400 transition-transform duration-200',
                      roleOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Dropdown */}
                {roleOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white dark:bg-dark-elevated border border-light-border dark:border-dark-border rounded-xl shadow-modal overflow-hidden">
                    {ROLES.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => {
                          setRole(r.value)
                          setRoleOpen(false)
                          liveValidate('role', r.value)
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                          'hover:bg-zinc-50 dark:hover:bg-dark-hover',
                          role === r.value && 'bg-accent/5 dark:bg-accent/10'
                        )}
                      >
                        <span
                          className={cn(
                            'flex-shrink-0',
                            role === r.value
                              ? 'text-accent'
                              : 'text-zinc-400 dark:text-zinc-500'
                          )}
                        >
                          {r.icon}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={cn(
                              'text-sm font-medium',
                              role === r.value
                                ? 'text-zinc-900 dark:text-white'
                                : 'text-zinc-700 dark:text-zinc-300'
                            )}
                          >
                            {r.label}
                          </p>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                            {r.desc}
                          </p>
                        </div>
                        {role === r.value && (
                          <CheckCircle2 className="w-4 h-4 text-accent ml-auto flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.role && (
                <p className="text-xs text-zuno-error flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.role}
                </p>
              )}
            </div>

            {/* University / Company (optional) */}
            <Input
              label="University or Company"
              type="text"
              id="reg-org"
              placeholder="e.g. MIT, Google — optional"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              hint="Helps others find and connect with you."
              leftIcon={<Building2 className="w-4 h-4" />}
            />

            {/* Accept Terms */}
            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    id="reg-terms"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked)
                      liveValidate('terms', e.target.checked)
                    }}
                    className="sr-only peer"
                  />
                  <div
                    className={cn(
                      'w-4.5 h-4.5 w-5 h-5 rounded border-2 transition-all duration-150 flex items-center justify-center',
                      acceptTerms
                        ? 'bg-accent border-accent'
                        : 'bg-transparent border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-400',
                      errors.terms && 'border-zuno-error'
                    )}
                    aria-hidden="true"
                  >
                    {acceptTerms && (
                      <svg
                        className="w-3 h-3 text-zinc-900"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  I agree to the{' '}
                  <Link
                    href="#"
                    className="text-accent hover:text-accent-dark underline-offset-2 hover:underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="#"
                    className="text-accent hover:text-accent-dark underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-zuno-error flex items-center gap-1 pl-8">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              loading={loading}
              className="w-full mt-2"
              rightIcon={!loading ? <ArrowRight className="w-4 h-4" /> : undefined}
            >
              {loading ? 'Creating account…' : 'Create free account'}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-accent font-medium hover:text-accent-dark underline-offset-4 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>

          {/* Security note */}
          <div className="flex items-center justify-center gap-1.5 mt-10 text-zinc-400 dark:text-zinc-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-xs">Authentication powered by Supabase</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { demoStats, demoCommunities, demoOpportunities, demoEvents, demoUsers } from '@/data/demo'
import { formatNumber } from '@/lib/utils'
import {
  ArrowRight,
  Zap,
  BookOpen,
  Briefcase,
  Rocket,
  Lightbulb,
  ShoppingBag,
  Bot,
  Globe,
  Users,
  Building2,
  Star,
  TrendingUp,
  MapPin,
  Calendar,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

// ─── Feature Cards ────────────────────────────────────────────────
const modules = [
  {
    id: 'discover',
    label: 'ZUNO Discover',
    icon: Globe,
    color: 'from-blue-500/20 to-blue-600/5',
    iconBg: 'bg-blue-500/15 text-blue-500',
    title: 'Your personalised global feed',
    description: 'Discover trending projects, recommended communities, featured opportunities and upcoming events tailored to your interests.',
  },
  {
    id: 'learn',
    label: 'ZUNO Learn',
    icon: BookOpen,
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconBg: 'bg-emerald-500/15 text-emerald-500',
    title: 'Learning resources & skill development',
    description: 'Access tutorials, educational content, learning communities and skill development resources curated for your goals.',
  },
  {
    id: 'career',
    label: 'ZUNO Career',
    icon: Briefcase,
    color: 'from-violet-500/20 to-violet-600/5',
    iconBg: 'bg-violet-500/15 text-violet-500',
    title: 'Jobs, internships & scholarships',
    description: 'Find career opportunities, build professional portfolios and connect with top employers, universities and organisations worldwide.',
  },
  {
    id: 'startup',
    label: 'ZUNO Startup',
    icon: Rocket,
    color: 'from-orange-500/20 to-orange-600/5',
    iconBg: 'bg-orange-500/15 text-orange-500',
    title: 'Co-founder & startup discovery',
    description: 'Find your co-founder, build your team, showcase your startup and connect with investors and mentors.',
  },
  {
    id: 'innovate',
    label: 'ZUNO Innovate',
    icon: Lightbulb,
    color: 'from-yellow-500/20 to-yellow-600/5',
    iconBg: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
    title: 'Hackathons & innovation challenges',
    description: 'Participate in global competitions, research projects and innovation challenges. Showcase your work to the world.',
  },
  {
    id: 'market',
    label: 'ZUNO Market',
    icon: ShoppingBag,
    color: 'from-pink-500/20 to-pink-600/5',
    iconBg: 'bg-pink-500/15 text-pink-500',
    title: 'Freelance services & digital products',
    description: 'Offer your skills, sell digital products, discover student services and grow your creator business globally.',
  },
]

const testimonials = [
  {
    quote: 'ZUNO helped me find my co-founder and land a \$500K seed round. The startup ecosystem here is unreal.',
    name: 'Lena Brandt',
    role: 'Founder, NovaSense',
    university: 'TU Berlin',
  },
  {
    quote: "I found my dream internship at Google through ZUNO Career. The personalised matching is incredibly accurate.",
    name: 'Raj Patel',
    role: 'Software Engineering Intern',
    university: 'IIT Bombay',
  },
  {
    quote: 'The AI learning assistant helped me prepare for my Stanford interview. Got admitted to my top choice!',
    name: 'Yuki Tanaka',
    role: 'Graduate Student',
    university: 'Stanford University',
  },
]

// ─── Stats Banner ──────────────────────────────────────────────────
function StatsBanner() {
  return (
    <div className="border-y border-light-border dark:border-dark-border bg-zinc-50 dark:bg-dark-card">
      <div className="section-container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Students & Professionals', value: formatNumber(demoStats.users), icon: Users },
            { label: 'Partner Universities', value: formatNumber(demoStats.universities), icon: Building2 },
            { label: 'Countries', value: `${demoStats.countries}+`, icon: Globe },
            { label: 'Opportunities Listed', value: formatNumber(demoStats.opportunities), icon: Briefcase },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-50">
                  {value}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 dot-pattern text-zinc-200 dark:text-zinc-800 opacity-60" />
        <div className="absolute top-20 left-1/4 h-96 w-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 h-64 w-64 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Announcement badge */}
            <div className="flex justify-center mb-6">
              <Link href="/discover" className="group">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-dark-card border border-light-border dark:border-dark-border text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-accent/50 transition-all duration-200">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Global Student Hackathon 2027 — \$50K in prizes
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-accent transition-colors" />
                </span>
              </Link>
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 text-balance">
              The Global Ecosystem for{' '}
              <span className="relative">
                <span className="text-accent">Every Builder</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
              ZUNO connects students, universities, professionals, entrepreneurs, creators,
              mentors and organisations in one intelligent global platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link href="/register">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Join ZUNO — It&apos;s Free
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" size="lg">
                  Explore the Platform
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex -space-x-2">
                {demoUsers.slice(0, 4).map((user) => (
                  <Avatar key={user.id} name={user.name} size="sm" />
                ))}
              </div>
              <span>
                Join{' '}
                <strong className="text-zinc-800 dark:text-zinc-200">
                  {formatNumber(demoStats.users)}+
                </strong>{' '}
                people from{' '}
                <strong className="text-zinc-800 dark:text-zinc-200">
                  {demoStats.countries} countries
                </strong>
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
                <span className="ml-1">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Hero visual — Platform preview tiles */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Feed preview */}
            <div className="md:col-span-2 zuno-card p-5 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 bg-accent rounded-md flex items-center justify-center">
                  <Zap className="h-3.5 w-3.5 text-zinc-900 fill-zinc-900" />
                </div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Discover Feed</span>
                <Badge variant="accent" size="sm">Live</Badge>
              </div>
              <div className="space-y-3">
                {demoUsers.slice(0, 2).map((user) => (
                  <div key={user.id} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-dark-elevated">
                    <Avatar name={user.name} size="sm" online={user.online} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">{user.name}</span>
                        {user.verified && <CheckCircle2 className="h-3.5 w-3.5 text-accent flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {user.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats mini */}
            <div className="space-y-4">
              <div className="zuno-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Trending</span>
                </div>
                {demoCommunities.filter(c => c.trending).slice(0,2).map(c => (
                  <div key={c.id} className="flex items-center gap-2 py-1.5">
                    <span className="text-sm">{c.icon}</span>
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">{c.name}</span>
                    <span className="ml-auto text-xs text-zinc-400">{formatNumber(c.members)}</span>
                  </div>
                ))}
              </div>
              <div className="zuno-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-violet-500" />
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Featured</span>
                </div>
                {demoOpportunities.filter(o => o.featured).slice(0,1).map(o => (
                  <div key={o.id}>
                    <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-0.5 truncate">{o.title}</div>
                    <div className="text-xs text-zinc-500">{o.company}</div>
                    <Badge variant="accent" size="sm" className="mt-1.5">{o.tags[0]}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ──────────────────────────────────────── */}
      <StatsBanner />

      {/* ── Platform Modules ──────────────────────────────────── */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="section-label">Platform Modules</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mt-3 mb-4">
              Everything you need.
              <br />
              <span className="text-accent">All in one place.</span>
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Eight interconnected modules designed to accelerate your education, career and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod) => (
              <Link key={mod.id} href={`/features#${mod.id}`} className="group">
                <Card hover className="h-full">
                  <div className={`h-12 w-12 rounded-xl ${mod.iconBg} flex items-center justify-center mb-4`}>
                    <mod.icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2">
                    <span className="section-label">{mod.label}</span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {mod.description}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-accent transition-colors">
                    Explore <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}

            {/* ZUNO AI — special card */}
            <Link href="/features#ai" className="group md:col-span-2 lg:col-span-1">
              <Card hover className="h-full bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-dark-elevated dark:to-dark-bg border-zinc-700 dark:border-dark-border">
                <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-accent" />
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">ZUNO AI</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Your intelligent platform assistant
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  AI-powered learning guidance, career recommendations, project discovery and personalised assistance.
                </p>
                <div className="flex items-center gap-1 mt-4 text-sm font-medium text-accent">
                  Try ZUNO AI <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Opportunities Preview ─────────────────────────────── */}
      <section className="py-20 bg-zinc-50 dark:bg-dark-card border-y border-light-border dark:border-dark-border">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-label">ZUNO Career</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
                Featured Opportunities
              </h2>
            </div>
            <Link href="/register" className="hidden md:flex">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View all {formatNumber(demoStats.opportunities)}+
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoOpportunities.slice(0, 3).map((opp) => (
              <Card key={opp.id} hover className="group">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-dark-elevated flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-zinc-500" />
                  </div>
                  <Badge
                    variant={
                      opp.type === 'job' ? 'info' :
                      opp.type === 'internship' ? 'success' : 'purple'
                    }
                    size="sm"
                  >
                    {opp.type.charAt(0).toUpperCase() + opp.type.slice(1)}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-accent transition-colors line-clamp-2">
                  {opp.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{opp.company}</p>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  {opp.location}
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {opp.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-light-border dark:border-dark-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent">{opp.salary}</span>
                  <span className="text-xs text-zinc-400">{opp.applicants} applicants</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Link href="/register">
              <Button variant="outline" size="md" className="w-full">
                View all opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Events Preview ────────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-label">ZUNO Innovate</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
                Upcoming Events
              </h2>
            </div>
            <Link href="/events" className="hidden md:flex">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                All events
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoEvents.slice(0, 2).map((event) => (
              <Card key={event.id} hover className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-accent/10 flex flex-col items-center justify-center border border-accent/20">
                    <span className="text-xs font-bold text-accent uppercase">
                      {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                    </span>
                    <span className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {formatNumber(event.participants)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                      ))}
                      {event.prize && (
                        <Badge variant="accent" size="sm">
                          <Trophy className="h-2.5 w-2.5" /> {event.prize}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="py-20 bg-zinc-50 dark:bg-dark-card border-y border-light-border dark:border-dark-border">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-label">Community Stories</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              Trusted by builders worldwide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Card key={i}>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-5 italic">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {t.name}
                    </div>
                    <div className="text-xs text-zinc-400">
                      {t.role} · {t.university}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="py-28">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-6">
              <Zap className="h-3 w-3 text-accent" />
              Join {formatNumber(demoStats.users)}+ global members
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Ready to build your{' '}
              <span className="text-accent">future?</span>
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-10">
              Join ZUNO and connect with the world&apos;s most ambitious students, professionals
              and organisations. Free forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Get started for free
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  Learn more about ZUNO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


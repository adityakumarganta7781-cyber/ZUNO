import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  demoUsers,
  demoOpportunities,
  demoEvents,
  demoCommunities,
  demoFeedPosts,
  demoStartups,
  demoNotifications,
} from '@/data/demo'
import { formatNumber, timeAgo } from '@/lib/utils'
import {
  TrendingUp,
  Briefcase,
  Calendar,
  Globe2,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Users,
  Trophy,
  CheckCircle2,
  Rocket,
  Zap,
  Plus,
  Star,
  Building2,
  Bot,
  Bell,
  ChevronRight,
} from 'lucide-react'

const currentUser = demoUsers[0]

// Quick action buttons
const quickActions = [
  { label: 'Post Update', icon: Plus, href: '/discover' },
  { label: 'Find Jobs', icon: Briefcase, href: '/careers' },
  { label: 'Join Event', icon: Calendar, href: '/events' },
  { label: 'Ask AI', icon: Bot, href: '/ai' },
]

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-up">
      {/* ── Greeting Banner ────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 dark:bg-dark-elevated border border-zinc-800 dark:border-dark-border p-6">
        <div className="absolute inset-0 dot-pattern text-white opacity-5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={currentUser.name} size="lg" online />
            <div>
              <p className="text-sm text-zinc-400 mb-0.5">Good afternoon 👋</p>
              <h1 className="font-display text-2xl font-bold text-white">
                {currentUser.name.split(' ')[0]}
              </h1>
              <p className="text-sm text-zinc-400 mt-0.5">{currentUser.role} · {currentUser.university}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm text-white font-medium transition-all duration-150">
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Profile completion */}
        <div className="relative mt-5 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-300">Profile completion</span>
            <span className="text-xs font-bold text-accent">72%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[72%] bg-accent rounded-full transition-all duration-1000" />
          </div>
          <p className="text-xs text-zinc-400 mt-2">Add your skills and projects to increase visibility</p>
        </div>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Connections', value: '342', icon: Users, change: '+12 this week', color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Profile Views', value: '1.2K', icon: TrendingUp, change: '+34% this month', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Applications', value: '8', icon: Briefcase, change: '3 in review', color: 'text-violet-500', bg: 'bg-violet-500/10' },
          { label: 'ZUNO Score', value: '840', icon: Star, change: 'Top 15%', color: 'text-accent', bg: 'bg-accent/10' },
        ].map(({ label, value, icon: Icon, change, color, bg }) => (
          <Card key={label} padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className={`h-9 w-9 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`h-4.5 w-4.5 ${color}`} style={{ height: '1.125rem', width: '1.125rem' }} />
              </div>
            </div>
            <div className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
              {value}
            </div>
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500">{change}</div>
          </Card>
        ))}
      </div>

      {/* ── Main 3-Column Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left: Feed ──────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">Your Feed</h2>
            <Link href="/discover" className="text-sm text-accent hover:text-accent-dark flex items-center gap-1 transition-colors">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {demoFeedPosts.map((post) => (
            <Card key={post.id} padding="md" className="group">
              {/* Author */}
              <div className="flex items-start gap-3 mb-4">
                <Avatar name={post.author.name} size="md" online={post.author.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {post.author.name}
                    </span>
                    {post.author.verified && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    )}
                    {post.type === 'milestone' && (
                      <Badge variant="accent" size="sm">🎉 Milestone</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span>{post.author.role}</span>
                    <span>·</span>
                    <span>{post.author.university}</span>
                    <span>·</span>
                    <span>{timeAgo(post.createdAt)}</span>
                  </div>
                </div>
                <button className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all opacity-0 group-hover:opacity-100">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line mb-4">
                {post.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="default" size="sm">#{tag}</Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 pt-3 border-t border-light-border dark:border-dark-border">
                <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-zinc-100 dark:hover:bg-dark-elevated ${post.liked ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  <Heart className={`h-3.5 w-3.5 ${post.liked ? 'fill-red-500' : ''}`} />
                  {formatNumber(post.likes)}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all">
                  <Share2 className="h-3.5 w-3.5" />
                  {post.shares}
                </button>
              </div>
            </Card>
          ))}

          {/* Load more */}
          <div className="text-center pt-2">
            <Link href="/discover">
              <Button variant="outline" size="sm">Load more posts</Button>
            </Link>
          </div>
        </div>

        {/* ── Right Sidebar ───────────────────────────────────── */}
        <div className="space-y-4">
          {/* Recommended Opportunities */}
          <Card padding="md">
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
              <Link href="/careers" className="text-xs text-accent hover:text-accent-dark transition-colors">
                View all
              </Link>
            </CardHeader>
            <div className="space-y-3">
              {demoOpportunities.slice(0, 3).map((opp) => (
                <div key={opp.id} className="flex items-start gap-3 group cursor-pointer">
                  <div className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-dark-elevated flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-4 w-4 text-zinc-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-accent transition-colors truncate">
                      {opp.title}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">{opp.company}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge
                        variant={opp.type === 'job' ? 'info' : opp.type === 'internship' ? 'success' : 'purple'}
                        size="sm"
                      >
                        {opp.type}
                      </Badge>
                      <span className="text-xs text-accent font-medium">{opp.salary}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/careers">
                <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  Browse all opportunities
                </Button>
              </Link>
            </div>
          </Card>

          {/* Trending Communities */}
          <Card padding="md">
            <CardHeader>
              <CardTitle>Trending Communities</CardTitle>
              <Link href="/communities" className="text-xs text-accent hover:text-accent-dark transition-colors">
                View all
              </Link>
            </CardHeader>
            <div className="space-y-2">
              {demoCommunities.filter(c => c.trending).map((community) => (
                <div key={community.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-dark-elevated transition-colors cursor-pointer group">
                  <span className="text-xl">{community.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-accent transition-colors">
                      {community.name}
                    </div>
                    <div className="text-xs text-zinc-400">{formatNumber(community.members)} members</div>
                  </div>
                  <button className="text-xs text-accent font-semibold hover:text-accent-dark transition-colors opacity-0 group-hover:opacity-100">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Featured Startups */}
          <Card padding="md">
            <CardHeader>
              <CardTitle>Startups Hiring</CardTitle>
              <Link href="/startups" className="text-xs text-accent hover:text-accent-dark transition-colors">
                View all
              </Link>
            </CardHeader>
            <div className="space-y-3">
              {demoStartups.filter(s => s.featured).map((startup) => (
                <div key={startup.id} className="p-3 rounded-lg bg-zinc-50 dark:bg-dark-elevated hover:bg-zinc-100 dark:hover:bg-dark-hover transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors">
                        {startup.name}
                      </span>
                      <div className="text-xs text-zinc-400 mt-0.5">{startup.industry} · {startup.stage}</div>
                    </div>
                    <Badge variant="success" size="sm">{startup.raised}</Badge>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">{startup.tagline}</p>
                  {startup.seeking.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-xs text-zinc-400">Seeking:</span>
                      {startup.seeking.slice(0, 1).map(role => (
                        <Badge key={role} variant="outline" size="sm">{role}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card padding="md">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <Link href="/events" className="text-xs text-accent hover:text-accent-dark transition-colors">
                View all
              </Link>
            </CardHeader>
            <div className="space-y-3">
              {demoEvents.slice(0, 2).map((event) => (
                <div key={event.id} className="flex items-start gap-3 group cursor-pointer">
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-accent/10 border border-accent/20 flex flex-col items-center justify-center">
                    <span className="text-2xs font-bold text-accent uppercase leading-none">
                      {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                    </span>
                    <span className="text-sm font-display font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-accent transition-colors leading-tight">
                      {event.title}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {event.location}
                    </div>
                    {event.prize && (
                      <Badge variant="accent" size="sm" className="mt-1">
                        <Trophy className="h-2.5 w-2.5" /> {event.prize}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ZUNO AI CTA */}
          <div className="relative overflow-hidden rounded-xl bg-zinc-900 dark:bg-dark-elevated border border-zinc-800 dark:border-dark-border p-5">
            <div className="absolute top-0 right-0 h-20 w-20 bg-accent/10 rounded-full blur-xl" />
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">ZUNO AI Assistant</h3>
              <p className="text-xs text-zinc-400 mb-3">
                Get personalised career advice, project recommendations and opportunity discovery.
              </p>
              <Link href="/ai">
                <Button variant="accent" size="sm" className="w-full">
                  <Zap className="h-3.5 w-3.5" /> Ask ZUNO AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


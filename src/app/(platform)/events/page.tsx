'use client'

import { useState } from 'react'
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  Zap,
  Globe,
  Monitor,
  Building2,
  LayoutGrid,
  List,
  Search,
  ChevronRight,
  Flame,
  Sparkles,
  Tag,
  ExternalLink,
  Star,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { demoEvents } from '@/data/demo'
import { cn, formatNumber } from '@/lib/utils'

type EventType = 'all' | 'hackathon' | 'conference' | 'workshop'
type FormatType = 'all' | 'online' | 'in-person' | 'hybrid'
type ViewMode = 'list' | 'grid'

const typeTabs = [
  { id: 'all' as EventType, label: 'All Events' },
  { id: 'hackathon' as EventType, label: 'Hackathons' },
  { id: 'conference' as EventType, label: 'Conferences' },
  { id: 'workshop' as EventType, label: 'Workshops' },
]

const formatTabs = [
  { id: 'all' as FormatType, label: 'All Formats', icon: Zap },
  { id: 'online' as FormatType, label: 'Online', icon: Monitor },
  { id: 'in-person' as FormatType, label: 'In-Person', icon: Building2 },
  { id: 'hybrid' as FormatType, label: 'Hybrid', icon: Globe },
]

function getEventTypeBadge(type: string) {
  if (type === 'hackathon') return <Badge variant="accent" dot>Hackathon</Badge>
  if (type === 'conference') return <Badge variant="info" dot>Conference</Badge>
  if (type === 'workshop') return <Badge variant="purple" dot>Workshop</Badge>
  return <Badge variant="default">{type}</Badge>
}

function getFormatBadge(format: string) {
  if (format === 'online') return <Badge variant="success">🌐 Online</Badge>
  if (format === 'in-person') return <Badge variant="warning">📍 In-Person</Badge>
  return <Badge variant="outline">🔀 Hybrid</Badge>
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getMonthDay(dateStr: string) {
  const d = new Date(dateStr)
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    day: d.getDate(),
  }
}

function daysUntil(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return null
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff <= 7) return `${diff}d away`
  return null
}

// Countdown component (UI only)
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hrs' },
    { value: mins, label: 'Min' },
    { value: 42, label: 'Sec' },
  ]

  return (
    <div className="flex items-center gap-2">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2">
          <div className="text-center">
            <div className="bg-zinc-900/60 dark:bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 min-w-[3rem]">
              <span className="text-2xl font-display font-bold text-white tabular-nums">
                {String(u.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-2xs text-white/60 font-medium mt-1 block">{u.label}</span>
          </div>
          {i < units.length - 1 && (
            <span className="text-xl font-bold text-white/40 pb-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function EventsPage() {
  const [activeType, setActiveType] = useState<EventType>('all')
  const [activeFormat, setActiveFormat] = useState<FormatType>('all')
  const [view, setView] = useState<ViewMode>('grid')
  const [search, setSearch] = useState('')
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set())

  const toggleRegister = (id: string) => {
    setRegisteredIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const heroEvent = demoEvents.find(e => e.featured) ?? demoEvents[0]

  const filtered = demoEvents.filter(e => {
    if (activeType !== 'all' && e.type !== activeType) return false
    if (activeFormat !== 'all' && e.format !== activeFormat) return false
    if (search && !e.title.toLowerCase().includes(search.toLowerCase()) &&
      !e.organizer.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="section-label block mb-2">Discover</span>
          <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Events &amp; Hackathons
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Connect, compete, and collaborate at world-class events
          </p>
        </div>
        <Button variant="accent" size="sm" leftIcon={<Sparkles className="h-4 w-4" />}>
          Submit an Event
        </Button>
      </div>

      {/* Hero Featured Event */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-black dark:via-zinc-900 dark:to-black" />
        <div className="absolute inset-0 bg-grid-dark" />
        {/* Accent glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div className="flex-1 space-y-5">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-zinc-900 text-xs font-bold">
                  <Flame className="h-3.5 w-3.5" />
                  FEATURED EVENT
                </span>
                {getEventTypeBadge(heroEvent.type)}
                {getFormatBadge(heroEvent.format)}
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">
                  {heroEvent.title}
                </h2>
                <p className="text-zinc-400 mt-2 text-sm">
                  Organized by <span className="text-zinc-200 font-medium">{heroEvent.organizer}</span>
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 flex-wrap">
                {heroEvent.prize && (
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-2xs text-zinc-500 font-medium uppercase tracking-wide">Prize Pool</p>
                      <p className="text-sm font-bold text-white">{heroEvent.prize}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xs text-zinc-500 font-medium uppercase tracking-wide">Participants</p>
                    <p className="text-sm font-bold text-white">{formatNumber(heroEvent.participants)}+</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-2xs text-zinc-500 font-medium uppercase tracking-wide">Date</p>
                    <p className="text-sm font-bold text-white">{formatDate(heroEvent.date)}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Register Now
                </Button>
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:border-white/20 border border-white/10">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Countdown */}
            <div className="space-y-3">
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">
                Registration Closes In
              </p>
              <CountdownTimer targetDate={heroEvent.registrationDeadline} />
              <div className="flex flex-wrap gap-1.5">
                {heroEvent.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + View Toggle */}
      <div className="zuno-card p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Type tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {typeTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id)}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150',
                  activeType === tab.id
                    ? 'bg-accent text-zinc-900 shadow-glow-accent'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-dark-elevated rounded-lg self-start sm:self-auto">
            {([
              { mode: 'grid' as ViewMode, Icon: LayoutGrid },
              { mode: 'list' as ViewMode, Icon: List },
            ] as const).map(({ mode, Icon }) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={cn(
                  'p-1.5 rounded-md transition-all',
                  view === mode
                    ? 'bg-white dark:bg-dark-card shadow-sm text-zinc-800 dark:text-zinc-200'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-zinc-100 dark:bg-dark-border" />

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events, organizers..."
              className="input-base pl-9"
            />
          </div>
          {/* Format filters */}
          <div className="flex items-center gap-1">
            {formatTabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFormat(tab.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                    activeFormat === tab.id
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-dark-elevated'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{filtered.length}</span> events found
        </p>
        <span className="text-xs text-zinc-400">Sorted by date</span>
      </div>

      {/* Events Grid/List */}
      {filtered.length > 0 ? (
        <div className={cn(
          'grid gap-4',
          view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        )}>
          {filtered.map(event => (
            <EventCard
              key={event.id}
              event={event}
              view={view}
              registered={registeredIds.has(event.id)}
              onRegister={() => toggleRegister(event.id)}
            />
          ))}
        </div>
      ) : (
        <div className="zuno-card p-12 text-center">
          <Calendar className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">No events found</p>
          <p className="text-sm text-zinc-400 mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}

// ── EventCard ───────────────────────────────────────────────────────

function EventCard({
  event, view, registered, onRegister
}: {
  event: (typeof demoEvents)[0]
  view: ViewMode
  registered: boolean
  onRegister: () => void
}) {
  const { month, day } = getMonthDay(event.date)
  const soon = daysUntil(event.registrationDeadline)

  if (view === 'list') {
    return (
      <div className="zuno-card zuno-card-hover p-5 group cursor-pointer">
        <div className="flex gap-4">
          {/* Date Badge */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-zinc-100 dark:bg-dark-elevated flex flex-col items-center justify-center border border-light-border dark:border-dark-border">
            <span className="text-2xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{month}</span>
            <span className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{day}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {getEventTypeBadge(event.type)}
                  {getFormatBadge(event.format)}
                  {event.featured && <Badge variant="accent" size="sm">Featured</Badge>}
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{event.organizer}</p>
              </div>
              <Button
                variant={registered ? 'outline' : 'accent'}
                size="sm"
                onClick={e => { e.stopPropagation(); onRegister() }}
                className="flex-shrink-0"
              >
                {registered ? '✓ Registered' : 'Register'}
              </Button>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500 dark:text-zinc-400 flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{formatNumber(event.participants)} participants</span>
              {event.prize && <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium"><Trophy className="h-3 w-3" />{event.prize}</span>}
              {soon && <span className="flex items-center gap-1 text-rose-500 font-medium"><Clock className="h-3 w-3" />{soon}</span>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="zuno-card zuno-card-hover group cursor-pointer overflow-hidden flex flex-col">
      {/* Card top color strip */}
      <div className={cn(
        'h-1.5 w-full',
        event.type === 'hackathon' ? 'bg-gradient-to-r from-accent to-accent-dark' :
          event.type === 'conference' ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
            'bg-gradient-to-r from-violet-500 to-violet-400'
      )} />

      <div className="p-5 flex flex-col flex-1 space-y-3">
        {/* Top row: date + type */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-dark-elevated flex flex-col items-center justify-center border border-light-border dark:border-dark-border">
            <span className="text-2xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{month}</span>
            <span className="text-lg font-display font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{day}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getEventTypeBadge(event.type)}
            {getFormatBadge(event.format)}
          </div>
        </div>

        {/* Title + Organizer */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{event.organizer}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{formatNumber(event.participants)}</span>
        </div>

        {/* Prize */}
        {event.prize && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Trophy className="h-3.5 w-3.5" />
            {event.prize} prize pool
          </div>
        )}

        {/* Tags */}
        <div className="flex items-center gap-1 flex-wrap">
          {event.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-2xs px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-dark-elevated text-zinc-500 dark:text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          {soon ? (
            <span className="flex items-center gap-1 text-xs text-rose-500 dark:text-rose-400 font-medium">
              <Clock className="h-3 w-3" />
              Closes {soon}
            </span>
          ) : (
            <span className="text-xs text-zinc-400">{formatDate(event.registrationDeadline)}</span>
          )}
          <Button
            variant={registered ? 'outline' : 'accent'}
            size="xs"
            onClick={e => { e.stopPropagation(); onRegister() }}
            rightIcon={registered ? undefined : <ExternalLink className="h-3 w-3" />}
          >
            {registered ? '✓ Registered' : 'Register'}
          </Button>
        </div>
      </div>
    </div>
  )
}

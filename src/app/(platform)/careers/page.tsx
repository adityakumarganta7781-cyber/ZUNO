'use client'

import { useState } from 'react'
import {
  MapPin,
  Search,
  Heart,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Clock,
  Filter,
  Bell,
  TrendingUp,
  ChevronDown,
  Zap,
  Building2,
  SlidersHorizontal,
  BookmarkCheck,
  ExternalLink,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { demoOpportunities } from '@/data/demo'
import { cn, formatNumber, timeAgo } from '@/lib/utils'

type TabType = 'all' | 'job' | 'internship' | 'scholarship'

const tabConfig = [
  { id: 'all' as TabType, label: 'All Opportunities', icon: Zap },
  { id: 'job' as TabType, label: 'Jobs', icon: Briefcase },
  { id: 'internship' as TabType, label: 'Internships', icon: GraduationCap },
  { id: 'scholarship' as TabType, label: 'Scholarships', icon: Award },
]

const locationOptions = ['Anywhere', 'Remote', 'United States', 'United Kingdom', 'Europe', 'Asia Pacific', 'Africa']
const industryOptions = ['All Industries', 'Technology', 'Design', 'Finance', 'Healthcare', 'Education', 'AI/ML']
const salaryOptions = ['Any Salary', '$0–$50K', '$50K–$100K', '$100K–$150K', '$150K+', 'Fully Funded']

function getTypeBadge(type: 'job' | 'internship' | 'scholarship') {
  if (type === 'job') return <Badge variant="info">Job</Badge>
  if (type === 'internship') return <Badge variant="success">Internship</Badge>
  return <Badge variant="purple">Scholarship</Badge>
}

function getCompanyInitials(company: string) {
  return company.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function getCompanyColor(company: string) {
  const colors = [
    'bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-teal-500',
  ]
  let hash = 0
  for (let i = 0; i < company.length; i++) hash = company.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function daysUntil(dateStr: string) {
  const now = new Date()
  const deadline = new Date(dateStr)
  const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return 'Expired'
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return `${diff}d left`
}

function isUrgent(dateStr: string) {
  const now = new Date()
  const deadline = new Date(dateStr)
  const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff <= 7 && diff >= 0
}

// Profile strength data
const profileStrength = 72
const recentlyViewed = [
  { title: 'Frontend Engineer', company: 'Vercel', type: 'job' as const },
  { title: 'UX Research Intern', company: 'Spotify', type: 'internship' as const },
  { title: 'Rhodes Scholarship', company: 'Rhodes Trust', type: 'scholarship' as const },
]

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('Anywhere')
  const [industry, setIndustry] = useState('All Industries')
  const [salary, setSalary] = useState('Any Salary')
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = demoOpportunities.filter(o => {
    if (activeTab !== 'all' && o.type !== activeTab) return false
    if (search && !o.title.toLowerCase().includes(search.toLowerCase()) &&
      !o.company.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const featured = filtered.filter(o => o.featured)
  const regular = filtered.filter(o => !o.featured)

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="section-label">Opportunities</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Careers &amp; Opportunities
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Discover jobs, internships, and scholarships curated for the ZUNO community
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Bell className="h-4 w-4" />}>
            Job Alerts
          </Button>
          <Button variant="accent" size="sm" leftIcon={<Star className="h-4 w-4" />}>
            Post Opportunity
          </Button>
        </div>
      </div>

      {/* Backend notice */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-accent/8 border border-accent/20">
        <Zap className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Applications connect to Supabase backend</span>
          {' '}— backend integration coming in Stage 7.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Filter bar */}
          <div className="zuno-card p-4 space-y-3">
            {/* Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {tabConfig.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150',
                      activeTab === tab.id
                        ? 'bg-accent text-zinc-900 shadow-glow-accent'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                    {tab.id !== 'all' && (
                      <span className={cn(
                        'text-2xs px-1.5 py-0.5 rounded-full font-semibold',
                        activeTab === tab.id ? 'bg-zinc-900/15' : 'bg-zinc-100 dark:bg-dark-elevated text-zinc-500 dark:text-zinc-400'
                      )}>
                        {demoOpportunities.filter(o => tab.id === 'all' || o.type === tab.id).length}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="h-px bg-zinc-100 dark:bg-dark-border" />

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search jobs, companies, skills..."
                  className="input-base pl-9"
                />
              </div>
              <div className="flex gap-2">
                <SelectDropdown value={location} onChange={setLocation} options={locationOptions} icon={<MapPin className="h-3.5 w-3.5" />} />
                <SelectDropdown value={industry} onChange={setIndustry} options={industryOptions} icon={<Building2 className="h-3.5 w-3.5" />} />
                <SelectDropdown value={salary} onChange={setSalary} options={salaryOptions} icon={<SlidersHorizontal className="h-3.5 w-3.5" />} />
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{filtered.length}</span> opportunities found
            </p>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Filter className="h-3 w-3" />
              <span>Sort: Most Recent</span>
            </div>
          </div>

          {/* Featured Opportunities */}
          {featured.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Featured</span>
              </div>
              <div className="grid gap-3">
                {featured.map(opp => (
                  <OpportunityCard
                    key={opp.id}
                    opp={opp}
                    saved={savedIds.has(opp.id)}
                    onSave={() => toggleSave(opp.id)}
                    featured
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Opportunities */}
          {regular.length > 0 && (
            <div className="space-y-3">
              {featured.length > 0 && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">All Opportunities</span>
                </div>
              )}
              <div className="grid gap-3">
                {regular.map(opp => (
                  <OpportunityCard
                    key={opp.id}
                    opp={opp}
                    saved={savedIds.has(opp.id)}
                    onSave={() => toggleSave(opp.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="zuno-card p-12 text-center">
              <Search className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">No opportunities found</p>
              <p className="text-sm text-zinc-400 mt-1">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0 hidden lg:block space-y-4">
          {/* Profile Strength */}
          <div className="zuno-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Profile Strength</h3>
              <span className="text-xs font-bold text-accent">{profileStrength}%</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-zinc-100 dark:bg-dark-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full transition-all duration-700"
                  style={{ width: `${profileStrength}%` }}
                />
              </div>
              <p className="text-xs text-zinc-400">
                Add your resume to reach <span className="font-semibold text-accent">Expert</span> status
              </p>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Basic Info', done: true },
                { label: 'Skills Added', done: true },
                { label: 'Education', done: true },
                { label: 'Resume Upload', done: false },
                { label: 'Portfolio Link', done: false },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={cn(
                    'h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0',
                    item.done ? 'bg-accent' : 'bg-zinc-100 dark:bg-dark-elevated border border-zinc-200 dark:border-dark-border'
                  )}>
                    {item.done && (
                      <svg className="h-2.5 w-2.5 text-zinc-900" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={cn('text-xs', item.done ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-500')}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Complete Profile
            </Button>
          </div>

          {/* Recently Viewed */}
          <div className="zuno-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Recently Viewed</h3>
            </div>
            <div className="space-y-2">
              {recentlyViewed.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-dark-elevated cursor-pointer transition-colors">
                  <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0', getCompanyColor(item.company))}>
                    <span className="text-2xs font-bold text-white">{getCompanyInitials(item.company)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">{item.title}</p>
                    <p className="text-2xs text-zinc-400">{item.company}</p>
                  </div>
                  {getTypeBadge(item.type)}
                </div>
              ))}
            </div>
          </div>

          {/* Job Alerts CTA */}
          <div className="zuno-card p-5 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 space-y-3">
            <div className="h-10 w-10 bg-accent rounded-xl flex items-center justify-center">
              <Bell className="h-5 w-5 text-zinc-900" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Never Miss an Opportunity</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Get personalized job alerts delivered straight to your inbox.
              </p>
            </div>
            <Button variant="accent" size="sm" className="w-full">
              Set Up Alerts
            </Button>
          </div>

          {/* Trending Tags */}
          <div className="zuno-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Trending Skills</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['AI/ML', 'React', 'Python', 'TypeScript', 'Product', 'Go', 'Rust', 'Figma', 'Data Science'].map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-dark-elevated text-zinc-600 dark:text-zinc-400 hover:bg-accent/15 hover:text-zinc-800 dark:hover:text-accent cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────

function SelectDropdown({
  value, onChange, options, icon
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  icon: React.ReactNode
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
        {icon}
      </div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-base pl-7 pr-7 appearance-none cursor-pointer text-xs"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
    </div>
  )
}

function OpportunityCard({
  opp, saved, onSave, featured = false
}: {
  opp: (typeof demoOpportunities)[0]
  saved: boolean
  onSave: () => void
  featured?: boolean
}) {
  const urgent = isUrgent(opp.deadline)

  return (
    <div className={cn(
      'zuno-card zuno-card-hover p-5 group cursor-pointer',
      featured && 'border-accent/30 bg-gradient-to-r from-accent/[0.03] to-transparent'
    )}>
      <div className="flex gap-4">
        {/* Company Logo */}
        <div className={cn(
          'h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-sm',
          getCompanyColor(opp.company)
        )}>
          {getCompanyInitials(opp.company)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors truncate">
                  {opp.title}
                </h3>
                {featured && <Badge variant="accent" size="sm">Featured</Badge>}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{opp.company}</span>
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onSave() }}
              className={cn(
                'p-1.5 rounded-lg transition-colors flex-shrink-0',
                saved
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/30'
                  : 'text-zinc-300 dark:text-zinc-600 hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20'
              )}
              title={saved ? 'Unsave' : 'Save'}
            >
              <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
            </button>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {opp.location}
            </span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{opp.salary}</span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {formatNumber(opp.applicants)} applicants
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo(opp.postedAt)}
            </span>
          </div>

          {/* Tags + Type + Deadline + Apply */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              {getTypeBadge(opp.type)}
              {opp.tags.map(tag => (
                <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={cn(
                'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                urgent
                  ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  : 'text-zinc-400 dark:text-zinc-500'
              )}>
                {urgent && <Clock className="h-3 w-3" />}
                {daysUntil(opp.deadline)}
              </span>
              <Button variant="accent" size="xs" rightIcon={<ExternalLink className="h-3 w-3" />}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

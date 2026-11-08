import {
  Rocket,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  ArrowRight,
  Plus,
  BookOpen,
  Lightbulb,
  Trophy,
  ExternalLink,
  Sparkles,
  Building2,
  ChevronRight,
  Search,
  Filter,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { demoStartups, demoUsers } from '@/data/demo'
import { formatNumber } from '@/lib/utils'

// ─── Stage badge variant helper ──────────────────────────────────────────────
function getStageBadge(stage: string) {
  if (stage === 'Pre-seed') return 'warning'
  if (stage === 'Seed') return 'info'
  if (stage === 'Series A') return 'success'
  if (stage === 'Series B') return 'purple'
  return 'default'
}

// ─── Additional startup data beyond demoStartups ─────────────────────────────
const extraStartups = [
  {
    id: '4',
    name: 'QuantumPay',
    tagline: 'Next-gen cross-border payments for emerging markets',
    stage: 'Seed',
    industry: 'FinTech',
    location: 'Lagos, Nigeria',
    founder: 'Chidi Obi',
    team: 11,
    seeking: ['Backend Engineer', 'Compliance Lead'],
    raised: '$1.8M',
    tags: ['Payments', 'Africa', 'B2C'],
    featured: false,
  },
  {
    id: '5',
    name: 'SpaceAgri',
    tagline: 'Satellite data intelligence for precision farming',
    stage: 'Pre-seed',
    industry: 'AgriTech',
    location: 'Bangalore, India',
    founder: 'Priya Sharma',
    team: 5,
    seeking: ['ML Engineer', 'Sales Lead', 'Full Stack Engineer'],
    raised: '$350K',
    tags: ['Satellite', 'Agriculture', 'AI'],
    featured: false,
  },
  {
    id: '6',
    name: 'NeuroLeap',
    tagline: 'Brain-computer interfaces for accessibility',
    stage: 'Series A',
    industry: 'BioTech',
    location: 'Boston, MA',
    founder: 'Dr. Leo Vasquez',
    team: 32,
    seeking: ['Neuroscientist', 'Embedded Engineer'],
    raised: '$12M',
    tags: ['BCI', 'Accessibility', 'Hardware'],
    featured: false,
  },
]

const allStartups = [...demoStartups, ...extraStartups]

// ─── Investor data ───────────────────────────────────────────────────────────
const featuredInvestors = [
  { name: 'Sofia Rodriguez', firm: 'Nexus Ventures', focus: 'EdTech · FinTech', deals: 23, user: demoUsers[4] },
  { name: 'James Park', firm: 'Meridian Capital', focus: 'AI · DeepTech', deals: 41, user: demoUsers[1] },
  { name: 'Nadia Okonkwo', firm: 'Verdant Fund', focus: 'CleanTech · AgriTech', deals: 17, user: demoUsers[2] },
]

// ─── Success stories ─────────────────────────────────────────────────────────
const successStories = [
  { company: 'EduFlow', result: 'Raised $2.4M Seed round after connecting with 3 investors on ZUNO', logo: 'E' },
  { company: 'GreenChain', result: 'Found CTO co-founder within 2 weeks via ZUNO Startups Hub', logo: 'G' },
]

// ─── Resources ───────────────────────────────────────────────────────────────
const resources = [
  { icon: BookOpen, label: 'Startup Handbook 2026', tag: 'Free' },
  { icon: Lightbulb, label: 'How to Find Co-founders', tag: 'Guide' },
  { icon: Trophy, label: 'ZUNO Pitch Competition', tag: 'Apply' },
  { icon: TrendingUp, label: 'Fundraising Masterclass', tag: 'Course' },
]

// ─── Filter Tabs (static, no interaction needed for server page) ─────────────
const tabs = ['Browse Startups', 'Find Co-founders', 'My Startup']

export default function StartupsPage() {
  const featured = demoStartups.filter((s) => s.featured)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Rocket className="h-5 w-5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Startup Ecosystem
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100">
            ZUNO Startup
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Discover startups, find co-founders, build your team
          </p>
        </div>
        <Button variant="accent" leftIcon={<Plus className="h-4 w-4" />} size="lg">
          Post Your Startup
        </Button>
      </div>

      {/* ── Featured Banner ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((startup, i) => (
          <div
            key={startup.id}
            className="relative overflow-hidden rounded-2xl border border-light-border dark:border-dark-border bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 group"
          >
            {/* Glow blob */}
            <div
              className={`absolute -top-10 ${i === 0 ? '-right-10' : '-left-10'} h-40 w-40 rounded-full blur-3xl opacity-30 ${i === 0 ? 'bg-accent' : 'bg-blue-500'}`}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <span className="text-accent text-xl font-bold">{startup.name[0]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-white text-lg">{startup.name}</span>
                      <Sparkles className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-zinc-400 text-xs">{startup.industry}</span>
                  </div>
                </div>
                <Badge variant="accent">{startup.stage}</Badge>
              </div>
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{startup.tagline}</p>
              <div className="flex items-center gap-4 text-xs text-zinc-400 mb-5">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {startup.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {startup.team} team
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" /> {startup.raised}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-5">
                {startup.seeking.map((role) => (
                  <Badge key={role} variant="outline" size="sm">
                    {role}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="btn-accent text-sm py-2 px-4 h-9 inline-flex items-center gap-1.5 rounded-lg font-semibold">
                  Connect <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button className="btn-ghost text-zinc-300 text-sm py-2 px-4 h-9 inline-flex items-center gap-1.5 rounded-lg border border-white/10 hover:border-white/20">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Layout ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* ─ Left: Filter + Cards ────────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Filter bar */}
          <div className="zuno-card p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* Tabs */}
              <div className="flex items-center bg-zinc-100 dark:bg-dark-elevated rounded-lg p-1 gap-0.5">
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                      i === 0
                        ? 'bg-white dark:bg-dark-card text-zinc-900 dark:text-zinc-100 shadow-sm'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  className="input-base pl-9 w-full"
                  placeholder="Search startups, industries, roles…"
                  readOnly
                />
              </div>
              <button className="btn-outline inline-flex items-center gap-2 text-sm h-10 px-4 rounded-lg whitespace-nowrap">
                <Filter className="h-4 w-4" /> Filters
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{allStartups.length}</span> startups found
            </p>
            <select className="text-sm bg-transparent text-zinc-500 dark:text-zinc-400 cursor-pointer">
              <option>Sort: Most Active</option>
              <option>Sort: Newest</option>
              <option>Sort: Most Funded</option>
            </select>
          </div>

          {/* Startup Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allStartups.map((startup) => (
              <article
                key={startup.id}
                className="zuno-card zuno-card-hover p-5 flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-dark-elevated dark:to-zinc-800 border border-light-border dark:border-dark-border flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-lg text-zinc-700 dark:text-zinc-200">
                      {startup.name[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-base truncate">
                        {startup.name}
                      </h3>
                      <Badge variant={getStageBadge(startup.stage) as any} size="sm">
                        {startup.stage}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {startup.tagline}
                    </p>
                  </div>
                </div>

                {/* Industry + Location */}
                <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {startup.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {startup.location}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-zinc-50 dark:bg-dark-elevated rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{startup.team}</div>
                    <div className="text-2xs text-zinc-400">Team</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-dark-elevated rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{startup.raised}</div>
                    <div className="text-2xs text-zinc-400">Raised</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-dark-elevated rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{startup.seeking.length}</div>
                    <div className="text-2xs text-zinc-400">Open Roles</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {startup.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Seeking Roles */}
                <div>
                  <p className="text-2xs font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
                    Seeking
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {startup.seeking.map((role) => (
                      <Badge key={role} variant="accent" size="sm">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Founder */}
                <div className="flex items-center gap-2 pt-1 border-t border-light-border dark:border-dark-border">
                  <Avatar name={startup.founder} size="xs" />
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Founded by <span className="text-zinc-700 dark:text-zinc-300 font-medium">{startup.founder}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="accent" size="sm" className="flex-1">
                    Connect
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Learn More
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center pt-2">
            <button className="btn-outline inline-flex items-center gap-2 text-sm px-6 py-2.5 rounded-lg">
              Load More Startups <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ─ Right Sidebar ───────────────────────────────────────────────── */}
        <aside className="space-y-5">
          {/* Startup Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                Startup Resources
              </CardTitle>
            </CardHeader>
            <div className="space-y-1">
              {resources.map(({ icon: Icon, label, tag }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-dark-elevated transition-colors group text-left"
                >
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300 font-medium group-hover:text-zinc-900 dark:group-hover:text-zinc-100 leading-tight">
                    {label}
                  </span>
                  <Badge variant="outline" size="sm">{tag}</Badge>
                </button>
              ))}
            </div>
          </Card>

          {/* Featured Investors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-accent" />
                Featured Investors
              </CardTitle>
              <button className="text-xs text-accent hover:text-accent-dark font-medium">View all</button>
            </CardHeader>
            <div className="space-y-3">
              {featuredInvestors.map((inv) => (
                <div key={inv.name} className="flex items-start gap-3 group cursor-pointer">
                  <Avatar name={inv.name} size="sm" online={inv.user.online} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors leading-tight">
                      {inv.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{inv.firm}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{inv.focus}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{inv.deals}</div>
                    <div className="text-2xs text-zinc-400">deals</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
              <button className="w-full btn-outline text-sm py-2 rounded-lg inline-flex items-center justify-center gap-2">
                <ExternalLink className="h-3.5 w-3.5" /> Browse All Investors
              </button>
            </div>
          </Card>

          {/* Success Stories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-4 w-4 text-accent" />
                Success Stories
              </CardTitle>
            </CardHeader>
            <div className="space-y-4">
              {successStories.map((story) => (
                <div
                  key={story.company}
                  className="rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/5 border border-accent/20 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-7 w-7 rounded-lg bg-accent/15 flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">{story.logo}</span>
                    </div>
                    <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{story.company}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{story.result}</p>
                </div>
              ))}
              <button className="w-full text-sm text-accent hover:text-accent-dark font-medium flex items-center justify-center gap-1 transition-colors">
                Read more stories <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>

          {/* Stats Banner */}
          <div className="rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 p-5 border border-zinc-700">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">ZUNO Startup Network</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Startups', value: formatNumber(2840) },
                { label: 'Co-founders Matched', value: formatNumber(1200) },
                { label: 'Total Raised', value: '$480M+' },
                { label: 'Countries', value: '90+' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-bold text-accent">{value}</div>
                  <div className="text-xs text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

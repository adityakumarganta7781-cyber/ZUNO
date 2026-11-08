import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { demoUsers, demoCommunities, demoFeedPosts } from '@/data/demo'
import { formatNumber, timeAgo } from '@/lib/utils'
import {
  TrendingUp,
  Compass,
  Filter,
  Search,
  Users,
  Globe2,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Flame,
  Star,
} from 'lucide-react'

export default function DiscoverPage() {
  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Compass className="h-6 w-6 text-accent" />
            Discover
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Trending posts, people, and opportunities from your global network
          </p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
          Filters
        </Button>
      </div>

      {/* Feed tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-dark-elevated mb-6 w-fit">
        {['For You', 'Following', 'Trending', 'Communities'].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              i === 0
                ? 'bg-white dark:bg-dark-bg text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {demoFeedPosts.map((post) => (
            <Card key={post.id} padding="md" className="group">
              <div className="flex items-start gap-3 mb-4">
                <Avatar name={post.author.name} size="md" online={post.author.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{post.author.name}</span>
                    {post.author.verified && <CheckCircle2 className="h-3.5 w-3.5 text-accent" />}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {post.author.role} · {post.author.university} · {timeAgo(post.createdAt)}
                  </div>
                </div>
                <button className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all opacity-0 group-hover:opacity-100">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line mb-4">
                {post.content}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="default" size="sm">#{tag}</Badge>
                ))}
              </div>
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
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Trending */}
          <Card padding="md">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-orange-500" />
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Trending Topics</h3>
            </div>
            <div className="space-y-2.5">
              {['AI & Machine Learning', 'Startup Funding 2027', 'Remote Work Tips', 'Web3 Development', 'Climate Tech'].map((topic, i) => (
                <div key={topic} className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <div className="text-xs text-zinc-400">#{i + 1} Trending</div>
                    <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-accent transition-colors">{topic}</div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-zinc-300 dark:text-zinc-600 group-hover:text-accent transition-colors" />
                </div>
              ))}
            </div>
          </Card>

          {/* Who to Follow */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Who to Follow</h3>
              </div>
              <Link href="/connections" className="text-xs text-accent hover:text-accent-dark transition-colors">View all</Link>
            </div>
            <div className="space-y-3">
              {demoUsers.slice(1, 4).map((user) => (
                <div key={user.id} className="flex items-center gap-3 group">
                  <Avatar name={user.name} size="sm" online={user.online} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{user.name}</span>
                      {user.verified && <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">{user.role}</div>
                  </div>
                  <button className="text-xs font-semibold text-accent hover:text-accent-dark transition-colors flex-shrink-0">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Communities */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-emerald-500" />
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Communities</h3>
              </div>
              <Link href="/communities" className="text-xs text-accent hover:text-accent-dark transition-colors">View all</Link>
            </div>
            <div className="space-y-2">
              {demoCommunities.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-dark-elevated transition-colors cursor-pointer group">
                  <span className="text-lg">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-accent transition-colors">{c.name}</div>
                    <div className="text-xs text-zinc-400">{formatNumber(c.members)} members</div>
                  </div>
                  {c.trending && <Badge variant="accent" size="sm" dot>Hot</Badge>}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}


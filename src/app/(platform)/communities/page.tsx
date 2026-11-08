import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { demoCommunities, demoFeedPosts } from '@/data/demo'
import { formatNumber, timeAgo } from '@/lib/utils'
import {
  Globe2,
  Users,
  MessageCircle,
  TrendingUp,
  Search,
  Plus,
  Heart,
  Share2,
  CheckCircle2,
} from 'lucide-react'

export default function CommunitiesPage() {
  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Globe2 className="h-6 w-6 text-accent" />
            Communities
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Connect with people who share your interests and goals
          </p>
        </div>
        <Button variant="accent" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
          Create Community
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Community list */}
        <div className="lg:col-span-1 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input placeholder="Search communities..." className="input-base pl-9" />
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-dark-elevated">
            {['All', 'Joined', 'Trending'].map((tab, i) => (
              <button
                key={tab}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  i === 0
                    ? 'bg-white dark:bg-dark-bg text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {demoCommunities.map((community, i) => (
              <div
                key={community.id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all group ${
                  i === 0
                    ? 'bg-accent/10 border border-accent/20'
                    : 'hover:bg-zinc-50 dark:hover:bg-dark-elevated border border-transparent hover:border-light-border dark:hover:border-dark-border'
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-dark-elevated flex items-center justify-center text-xl flex-shrink-0">
                  {community.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-semibold truncate ${i === 0 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`}>
                      {community.name}
                    </span>
                    {community.trending && <Badge variant="accent" size="sm">Hot</Badge>}
                  </div>
                  <div className="text-xs text-zinc-400">{formatNumber(community.members)} members</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected community header */}
          <Card padding="md">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-dark-elevated flex items-center justify-center text-3xl">
                {demoCommunities[0].icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {demoCommunities[0].name}
                  </h2>
                  <Badge variant="accent" size="sm" dot>Trending</Badge>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                  The largest AI & ML community on ZUNO. Share research, tools, and ideas.
                </p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Users className="h-3.5 w-3.5" /> {formatNumber(demoCommunities[0].members)} members
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <MessageCircle className="h-3.5 w-3.5" /> {formatNumber(demoCommunities[0].posts)} posts
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <TrendingUp className="h-3.5 w-3.5" /> Very active
                  </span>
                </div>
              </div>
              <Button variant="accent" size="sm">Joined ✓</Button>
            </div>
          </Card>

          {/* Posts */}
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
                    {post.author.role} · {timeAgo(post.createdAt)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">{post.content}</p>
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
      </div>
    </div>
  )
}


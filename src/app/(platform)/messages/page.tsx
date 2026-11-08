import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { demoUsers } from '@/data/demo'
import { formatNumber } from '@/lib/utils'
import {
  MessageSquare,
  Search,
  Plus,
  CheckCircle2,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
} from 'lucide-react'

const demoMessages = [
  { id: '1', text: 'Hey! I saw your post about CRDTs — really interesting work. Have you considered using Yjs?', from: 'them', time: '10:30 AM' },
  { id: '2', text: "Thanks! Yes, I looked at Yjs but ended up implementing a custom solution for learning purposes. The merge algorithm was the trickiest part.", from: 'me', time: '10:32 AM' },
  { id: '3', text: "That's impressive. Would love to collaborate on something similar. I'm building a realtime collaboration tool for my startup.", from: 'them', time: '10:35 AM' },
  { id: '4', text: "Absolutely! I'd love to chat more about it. When are you free for a call?", from: 'me', time: '10:36 AM' },
]

export default function MessagesPage() {
  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-5rem)] animate-fade-up">
      <div className="flex h-full rounded-2xl overflow-hidden border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0 border-r border-light-border dark:border-dark-border flex flex-col">
          <div className="p-4 border-b border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between mb-3">
              <h1 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Messages
              </h1>
              <button className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input placeholder="Search messages..." className="input-base pl-9" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {demoUsers.map((user, i) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-dark-elevated ${i === 1 ? 'bg-accent/5 border-l-2 border-accent' : ''}`}
              >
                <Avatar name={user.name} size="md" online={user.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{user.name}</span>
                    <span className="text-xs text-zinc-400 flex-shrink-0 ml-2">
                      {i === 0 ? '10:36 AM' : i === 1 ? 'Yesterday' : `${i + 1}d ago`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 truncate">
                      {i === 1 ? "Absolutely! I'd love to chat..." : `Hi! I wanted to connect about...`}
                    </span>
                    {i === 0 && (
                      <span className="h-4 w-4 rounded-full bg-accent text-zinc-900 text-2xs font-bold flex items-center justify-center flex-shrink-0 ml-1">3</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 p-4 border-b border-light-border dark:border-dark-border">
            <Avatar name={demoUsers[1].name} size="md" online={demoUsers[1].online} />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{demoUsers[1].name}</span>
                {demoUsers[1].verified && <CheckCircle2 className="h-3.5 w-3.5 text-accent" />}
              </div>
              <span className="text-xs text-zuno-success">● Online</span>
            </div>
            <button className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">
            {demoMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-sm ${msg.from === 'me' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'me'
                        ? 'bg-accent text-zinc-900 rounded-br-sm'
                        : 'bg-zinc-100 dark:bg-dark-elevated text-zinc-800 dark:text-zinc-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-xs text-zinc-400 mt-1 block px-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-light-border dark:border-dark-border">
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all flex-shrink-0">
                <Paperclip className="h-4 w-4" />
              </button>
              <div className="flex-1 relative">
                <input
                  placeholder="Write a message..."
                  className="input-base pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
                  <Smile className="h-4 w-4" />
                </button>
              </div>
              <Button variant="accent" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


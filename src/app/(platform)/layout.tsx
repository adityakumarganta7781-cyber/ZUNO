'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { cn } from '@/lib/utils'

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-dark-bg">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Topbar sidebarCollapsed={collapsed} />
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300',
          collapsed ? 'pl-16' : 'pl-64'
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}


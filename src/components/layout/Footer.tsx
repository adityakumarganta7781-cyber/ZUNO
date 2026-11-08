import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Globe } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'Discover', href: '/discover' },
    { label: 'ZUNO Learn', href: '/features#learn' },
    { label: 'ZUNO Career', href: '/features#career' },
    { label: 'ZUNO Startup', href: '/features#startup' },
    { label: 'ZUNO Innovate', href: '/features#innovate' },
    { label: 'ZUNO Market', href: '/features#market' },
    { label: 'ZUNO AI', href: '/features#ai' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  'For Organizations': [
    { label: 'Universities', href: '/universities' },
    { label: 'Recruiters', href: '/recruiters' },
    { label: 'Mentors', href: '/mentors' },
    { label: 'Post Opportunities', href: '/post' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-white dark:bg-dark-bg">
      <div className="section-container py-16">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-zinc-900 fill-zinc-900" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
                ZUNO
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 max-w-xs">
              One global ecosystem for education, careers, networking, entrepreneurship,
              innovation and opportunities.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Globe, href: '#', label: 'Website' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-dark-elevated transition-all duration-150"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-light-border dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} ZUNO Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-zinc-400 dark:text-zinc-500">
            <span>Building the future of global education & careers.</span>
            <span className="text-accent">✦</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


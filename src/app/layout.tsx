import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ZUNO — Discover. Connect. Build. Grow.',
    template: '%s | ZUNO',
  },
  description:
    'ZUNO is a premium global digital ecosystem connecting students, universities, professionals, entrepreneurs, creators, mentors and organizations.',
  keywords: [
    'ZUNO',
    'global ecosystem',
    'students',
    'universities',
    'careers',
    'networking',
    'startups',
    'innovation',
    'education',
    'entrepreneurship',
  ],
  authors: [{ name: 'ZUNO Team' }],
  creator: 'ZUNO',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zuno.app',
    title: 'ZUNO — Discover. Connect. Build. Grow.',
    description:
      'One global ecosystem for education, careers, networking, entrepreneurship, innovation and opportunities.',
    siteName: 'ZUNO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZUNO — Discover. Connect. Build. Grow.',
    description: 'One global ecosystem for education, careers, networking and opportunities.',
    creator: '@zuno_app',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: '',
              style: {
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: '14px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}


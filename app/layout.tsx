import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.handle,
  },
  icons: {
    other: [
      { url: '/icon.png', rel: 'mask-icon' },
      { url: '/icon.png', rel: 'alternate icon' },
    ],
    apple: { url: '/icon.png' },
    shortcut: { url: '/icon.svg' },
    icon: { url: '/icon.svg' },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
};

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { name: "Blog", href: "/blog" },
]

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-6 px-4">
            <header>
              <div className="flex items-center justify-between -mx-2">
                <Link href="/">
                  <p className="text-2xl font-bold font-mono rounded-md py-1 px-2 hover:bg-slate-200 dark:hover:bg-slate-800">
                    {"<font>"}
                  </p>
                </Link>
                <nav className="flex items-center ml-auto text-sm font-medium space-x-1">
                  <ModeToggle />
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-md py-1 px-2 hover:bg-slate-200 dark:hover:bg-slate-800">
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </header>
            <main className="flex min-h-screen w-full my-4">{children}</main>
            <footer className="flex w-full text-center font-mono text-xs text-slate-700 dark:text-slate-200">
              <p className="grow text-left">
                {siteConfig.creator} (<Link className="underline underline-offset-4" target="_blank" href={siteConfig.links.twitter}>{siteConfig.handle}</Link>)
              </p>
              <p>
                <Link className="underline" target="_blank" href={siteConfig.links.github}>Source</Link>
              </p>
            </footer>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

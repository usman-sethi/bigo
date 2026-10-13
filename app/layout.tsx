import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { siteUrl } from '../lib/site-url';
import './globals.css';

const sans = Bricolage_Grotesque({ variable: '--font-bric', subsets: ['latin'] });
const mono = JetBrains_Mono({ variable: '--font-jb', subsets: ['latin'] });

const title = 'Big O by Usman Sethi | Interactive Big O Notation Guide';
const description =
  'Learn Big O notation with Usman Sethi in this interactive guide to algorithm time and space complexity, common growth rates, and how to analyze code.';

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title,
  description,
  authors: [{ name: 'Usman Sethi' }],
  creator: 'Usman Sethi',
  keywords: [
    'Big O by Usman Sethi',
    'Big O notation',
    'time complexity',
    'space complexity',
    'algorithm complexity',
    'data structures and algorithms',
  ],
  robots: { index: true, follow: true },
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: {
    title: 'Big O Notation by Usman Sethi',
    description,
    type: 'website',
    siteName: 'Big O Notation',
    ...(siteUrl ? { url: '/' } : {}),
  },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1f' },
    { media: '(prefers-color-scheme: light)', color: '#f5f6fb' },
  ],
};

// Runs before first paint so the saved theme never flashes.
const init = `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

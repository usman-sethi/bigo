import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Bricolage_Grotesque({ variable: '--font-bric', subsets: ['latin'] });
const mono = JetBrains_Mono({ variable: '--font-jb', subsets: ['latin'] });

const title = 'Big O Notation — Algorithm Complexity Explained';
const description =
  'A five-minute interactive presentation on Big O notation: what n means, how growth rate is measured, the common complexity classes and how to find them. Presented by Usman Sethi.';

const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  authors: [{ name: 'Usman Sethi' }],
  keywords: ['Big O notation', 'time complexity', 'space complexity', 'algorithms', 'data structures'],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: { title, description, type: 'website', siteName: 'Big O Notation', url: '/' },
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

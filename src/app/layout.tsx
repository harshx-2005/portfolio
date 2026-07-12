import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import ThreeBackground from '@/components/ThreeBackground';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono-tech',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Harsh Mahesh Kshirsagar | Premium Developer Portfolio & Full Stack Engineer',
  description: 'Personal portfolio of Harsh Mahesh Kshirsagar, a software developer specializing in the MERN Stack, Django backends, AI Integrations, and Software QA Testing based in Akluj, Maharashtra, India.',
  keywords: ['Harsh Mahesh Kshirsagar', 'Full Stack Developer', 'MERN Developer', 'Django Developer', 'Software Tester', 'QA Engineer', 'AI Projects Builder', 'India React Developer', 'Graphene Interiors Ltd'],
  authors: [{ name: 'Harsh Mahesh Kshirsagar' }],
  creator: 'Harsh Mahesh Kshirsagar',
  publisher: 'Harsh Mahesh Kshirsagar',
  robots: 'index, follow',
  metadataBase: new URL('https://theharshkshirsagar.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://theharshkshirsagar.vercel.app/',
    title: 'Harsh Mahesh Kshirsagar | Premium Developer Portfolio',
    description: 'Building scalable web platforms, AI-powered systems, and modern digital experiences using React, Node, Django, and WebSockets.',
    siteName: 'Harsh Mahesh Kshirsagar Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Harsh Mahesh Kshirsagar Portfolio Card',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsh Mahesh Kshirsagar | Premium Developer Portfolio',
    description: 'Building scalable web platforms, AI-powered systems, and modern digital experiences using React, Node, Django, and WebSockets.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-darkBg text-slate-100 font-sans relative min-h-screen overflow-x-hidden selection:bg-indigo-500/30 selection:text-white antialiased noise-overlay">
        {/* Subtle radial gradients in layout */}
        <div className="absolute top-0 left-0 right-0 h-[100vh] bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none z-0" />
        <ThreeBackground />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

import type {Metadata} from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BellaDerma | Premium Dermatology by Dr. Chitra',
  description: 'Advanced aesthetic and clinical dermatology in a luxurious environment.',
  openGraph: {
    title: 'BellaDerma | Premium Dermatology',
    description: 'Advanced aesthetic and clinical dermatology.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BellaDerma | Premium Dermatology',
    description: 'Advanced aesthetic and clinical dermatology.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth overflow-x-hidden`}>
      <body className="font-sans bg-stone-50 text-stone-900 antialiased selection:bg-stone-200 overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

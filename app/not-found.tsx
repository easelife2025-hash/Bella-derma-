import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-32 px-6">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-stone-400 font-medium tracking-[0.2em] uppercase text-xs mb-4 block">Error 404</span>
          <h1 className="font-serif text-5xl md:text-6xl text-stone-900 tracking-tight mb-6">Page Not Found</h1>
          <p className="text-stone-500 font-light mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/" className="inline-flex items-center gap-3 bg-stone-900 text-stone-50 px-8 py-4 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 transition-colors">
            Return Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

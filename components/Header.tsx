'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-in-out ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-stone-200 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col z-50 relative">
            <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${isMenuOpen ? 'text-stone-400' : 'text-stone-500'}`}>Dr. Chitra&apos;s</span>
            <span className={`font-serif text-xl md:text-2xl tracking-wide transition-colors duration-300 ${isMenuOpen ? 'text-stone-50' : 'text-stone-900'}`}>BellaDerma.</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.15em] uppercase text-stone-600 font-medium">
            <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <Link href="/treatments" className="hover:text-stone-900 transition-colors">Treatments</Link>
            <Link href="/#about" className="hover:text-stone-900 transition-colors">About</Link>
            <Link href="/#reviews" className="hover:text-stone-900 transition-colors">Reviews</Link>
            <Link href="/contact" className="hover:text-stone-900 transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/book" className={`inline-block text-xs uppercase tracking-[0.15em] border px-7 py-3.5 rounded-full font-medium transition-all duration-300 ${
              isScrolled 
                ? 'bg-stone-900 text-stone-50 border-stone-900 hover:bg-stone-800' 
                : 'bg-transparent text-stone-900 border-stone-900 hover:bg-stone-900 hover:text-stone-50'
            }`}>
              Book Appointment
            </Link>
          </div>

          <button 
            className={`md:hidden z-50 relative p-2 -mr-2 transition-colors duration-300 ${isMenuOpen ? 'text-stone-50' : 'text-stone-900'}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-stone-900 flex flex-col justify-between pt-32 pb-12 px-6 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-8 text-4xl font-serif text-stone-50">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-300 transition-colors">Home</Link>
              <Link href="/treatments" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-300 transition-colors">Treatments</Link>
              <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-300 transition-colors">About</Link>
              <Link href="/#reviews" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-300 transition-colors">Reviews</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-300 transition-colors">Contact</Link>
            </nav>
            <div className="flex flex-col gap-6 border-t border-stone-800 pt-8 mt-12">
              <Link href="/book" onClick={() => setIsMenuOpen(false)} className="bg-stone-50 text-center text-stone-900 text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-stone-200 transition-colors w-full font-medium">
                Book Appointment
              </Link>
              <div className="text-stone-400 text-xs tracking-widest uppercase flex flex-col gap-2 mt-4">
                <span>Nerul (E), Navi Mumbai</span>
                <span>+91 8591594849</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-100 pb-32 md:pb-12 border-t border-stone-800">
      {/* Global CTA */}
      <div className="py-24 md:py-32 text-center px-6 border-b border-stone-200 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight text-stone-900">
            Ready to begin your <span className="italic text-stone-500 block mt-2">skin journey?</span>
          </h2>
          <p className="text-stone-500 font-light mb-12 max-w-lg mx-auto text-base md:text-lg">
            Schedule a comprehensive consultation to discuss your skin goals and develop a personalized treatment protocol.
          </p>
          <Link 
            href="/book" 
            className="group bg-stone-900 text-stone-50 px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-xl shadow-stone-900/10 inline-flex items-center gap-3"
          >
            Book Your Appointment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="pt-16 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-3xl text-stone-100 mb-2">Dr. Chitra&apos;s BellaDerma</h3>
            <p className="text-stone-400 font-light text-sm">
              Shop No. 14, Lenyadri Complex,<br/>
              Sector 19A, Nerul (E),<br/>
              Navi Mumbai
            </p>
            <p className="text-amber-300 font-medium text-sm mt-2">
              <a href="tel:+918591594849" className="hover:text-amber-200 transition-colors">+91 8591594849</a>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-16">
            <div className="flex flex-col gap-4">
              <Link href="/treatments" className="text-sm font-light text-stone-400 hover:text-amber-300 transition-colors">Treatments</Link>
              <Link href="/#about" className="text-sm font-light text-stone-400 hover:text-amber-300 transition-colors">About</Link>
              <Link href="/#reviews" className="text-sm font-light text-stone-400 hover:text-amber-300 transition-colors">Reviews</Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/contact" className="text-sm font-light text-stone-400 hover:text-amber-300 transition-colors">Contact</Link>
              <Link href="/book" className="text-sm font-light text-stone-400 hover:text-amber-300 transition-colors">Book Appointment</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-stone-800 text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Dr. Chitra&apos;s BellaDerma. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-amber-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

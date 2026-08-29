'use client';

import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col gap-4">
      <a 
        href="tel:+918591594849"
        className="w-14 h-14 bg-stone-900 text-stone-50 rounded-full flex items-center justify-center shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:shadow-stone-900/20"
        aria-label="Call Clinic"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a 
        href="https://wa.me/918591594849"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:shadow-green-500/20"
        aria-label="WhatsApp Clinic"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}

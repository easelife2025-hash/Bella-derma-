'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What treatments are offered at BellaDerma?",
    answer: "We offer a comprehensive range of clinical and aesthetic dermatology services, including anti-wrinkle injections, dermal fillers, clinical peels, fractional CO2 laser, microneedling, and more."
  },
  {
    question: "Do you provide laser treatments?",
    answer: "Yes, we utilize advanced laser technologies such as Pico Laser and Fractional CO2 Laser for skin resurfacing, rejuvenation, and treating various skin concerns."
  },
  {
    question: "What hair removal options do you offer?",
    answer: "We offer permanent hair reduction using state-of-the-art Diode Laser and Nd:YAG Laser systems, ensuring safe and effective results for various skin types."
  },
  {
    question: "How do you treat acne and acne scars?",
    answer: "We offer customized protocols including clinical peels, acne subcision, and targeted laser treatments to actively manage acne breakouts and significantly reduce scarring."
  },
  {
    question: "What treatments are available for pigmentation?",
    answer: "We provide specialized treatments like IPL Photorejuvenation and Pico Laser to effectively target and fade hyperpigmentation, sun spots, and melasma."
  },
  {
    question: "How does the appointment process work?",
    answer: "You can request an appointment online through our website or call us directly. Our team will contact you promptly to confirm a suitable date and time for your consultation."
  },
  {
    question: "Where is the clinic located?",
    answer: "Dr. Chitra's BellaDerma is located at Shop No. 14, Lenyadri Complex, Sector 19A, Nerul (E), Navi Mumbai."
  },
  {
    question: "What are your opening hours?",
    answer: "We are open Monday to Saturday from 11:00 AM to 8:00 PM. The clinic is closed on Sundays."
  }
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 bg-stone-50 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-stone-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-500 font-light text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about our treatments, clinic, and appointment process.
          </p>
        </div>

        <div className="flex flex-col border-t border-stone-200">
          {faqs.map((faq, index) => {
            const isExpanded = expandedId === index;
            
            return (
              <div key={index} className="border-b border-stone-200 group">
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : index)}
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-serif text-xl md:text-2xl pr-8 transition-colors duration-300 ${isExpanded ? 'text-stone-900' : 'text-stone-900 group-hover:text-stone-500'}`}>
                    {faq.question}
                  </span>
                  <div className="shrink-0 text-stone-400 transition-colors duration-300 group-hover:text-stone-900">
                    {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-6 md:pr-12">
                        <p className="text-stone-500 font-light leading-relaxed text-base md:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

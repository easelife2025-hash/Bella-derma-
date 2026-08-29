'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Minus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Use one of the existing images for the treatments header
import skincareImg from '@/src/assets/images/clinical_skincare_1787904939862.jpg';

const CATEGORIES = [
  "All",
  "Skin & Aesthetic",
  "Laser & Resurfacing",
  "Acne & Scars",
  "Hair Removal"
];

const TREATMENTS = [
  {
    id: 1,
    category: "Skin & Aesthetic",
    name: "Anti-Wrinkle Injections",
    description: "Targeted neuromodulator treatments to relax facial muscles, softening dynamic lines and preventing new wrinkles from forming.",
  },
  {
    id: 2,
    category: "Skin & Aesthetic",
    name: "Dermal Fillers",
    description: "Hyaluronic acid-based treatments to restore volume, enhance facial contours, and provide deep hydration.",
  },
  {
    id: 3,
    category: "Skin & Aesthetic",
    name: "Clinical Peels",
    description: "Medical-grade chemical exfoliation customized to your skin type to improve texture, tone, and overall radiance.",
  },
  {
    id: 4,
    category: "Laser & Resurfacing",
    name: "Fractional CO2 Laser",
    description: "Advanced ablative laser therapy for profound skin resurfacing, targeting deep wrinkles, and severe textural irregularities.",
  },
  {
    id: 5,
    category: "Laser & Resurfacing",
    name: "Pico Laser Treatment",
    description: "Ultra-short pulse laser technology for highly effective pigmentation removal, skin revitalization, and tattoo removal with minimal downtime.",
  },
  {
    id: 6,
    category: "Laser & Resurfacing",
    name: "IPL Photorejuvenation",
    description: "Intense Pulsed Light therapy to treat vascular lesions, sun damage, and hyperpigmentation for a more even complexion.",
  },
  {
    id: 7,
    category: "Acne & Scars",
    name: "Microneedling with PRP",
    description: "Collagen induction therapy combined with Platelet-Rich Plasma to accelerate healing and significantly improve acne scar appearance.",
  },
  {
    id: 8,
    category: "Acne & Scars",
    name: "Acne Subcision",
    description: "A minor surgical procedure used to treat deep, rolling acne scars by releasing the fibrotic strands that tether the scar to underlying tissue.",
  },
  {
    id: 9,
    category: "Hair Removal",
    name: "Diode Laser Hair Removal",
    description: "State-of-the-art laser technology providing safe, effective, and long-lasting hair reduction for all skin types.",
  },
  {
    id: 10,
    category: "Hair Removal",
    name: "Nd:YAG Laser Hair Removal",
    description: "Highly effective laser hair removal specifically optimized for safety and efficacy in darker skin tones.",
  }
];

export default function TreatmentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredTreatments = TREATMENTS.filter(t => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end mb-16">
          <div>
            <span className="text-stone-500 tracking-[0.2em] uppercase text-xs font-medium mb-6 block">Our Expertise</span>
            <h1 className="font-serif text-5xl md:text-7xl text-stone-900 leading-[1.1] tracking-tight">
              Curated Protocols. <br />
              <span className="italic text-stone-500">Refined Results.</span>
            </h1>
          </div>
          <p className="text-stone-500 font-light leading-relaxed max-w-md pb-2">
            Explore our comprehensive range of medical-grade treatments designed to optimize skin health and enhance your natural architecture.
          </p>
        </div>
        
        {/* Header Image */}
        <div className="w-full aspect-[21/9] md:aspect-[24/7] relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/5 mb-8">
          <Image 
            src={skincareImg} 
            alt="Clinical Skincare" 
            fill 
            className="object-cover"
            placeholder="blur"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-1/4 shrink-0">
            <div className="sticky top-32 flex flex-col gap-10">
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  placeholder="Search treatments..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full py-4 pl-12 pr-6 text-sm outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-all font-light placeholder:text-stone-400"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-stone-900 mb-6">Categories</h3>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                        activeCategory === category 
                          ? 'bg-stone-900 text-stone-50 font-medium shadow-md shadow-stone-900/10' 
                          : 'bg-transparent text-stone-500 hover:bg-stone-200 hover:text-stone-900 font-light'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Treatment List */}
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-6 mb-8">
              <h2 className="font-serif text-3xl text-stone-900">
                {activeCategory === "All" ? "All Treatments" : activeCategory}
              </h2>
              <span className="text-xs uppercase tracking-[0.15em] text-stone-400">
                {filteredTreatments.length} {filteredTreatments.length === 1 ? 'Service' : 'Services'}
              </span>
            </div>

            {filteredTreatments.length === 0 ? (
              <div className="py-20 text-center text-stone-500 font-light">
                No treatments found matching your criteria.
              </div>
            ) : (
              <motion.div layout className="flex flex-col border-t border-stone-200">
                <AnimatePresence>
                {filteredTreatments.map((treatment) => {
                  const isExpanded = expandedId === treatment.id;
                  
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      key={treatment.id} 
                      className="border-b border-stone-200 group"
                    >
                      <button 
                        onClick={() => setExpandedId(isExpanded ? null : treatment.id)}
                        className="w-full py-8 md:py-10 flex items-center justify-between text-left focus:outline-none"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                           <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-stone-400 md:w-40 shrink-0">
                            {treatment.category}
                          </span>
                          <span className={`font-serif text-2xl md:text-3xl transition-colors duration-300 ${isExpanded ? 'text-stone-900' : 'text-stone-900 group-hover:text-stone-500'}`}>
                            {treatment.name}
                          </span>
                        </div>
                        <div className="shrink-0 ml-6 text-stone-400 transition-colors duration-300 group-hover:text-stone-900">
                          {isExpanded ? <Minus className="w-5 h-5 md:w-6 md:h-6" /> : <Plus className="w-5 h-5 md:w-6 md:h-6" />}
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
                            <div className="pb-10 md:pl-[13rem] pr-6 md:pr-12">
                              <p className="text-stone-500 font-light leading-relaxed max-w-2xl text-base md:text-lg mb-8">
                                {treatment.description}
                              </p>
                              <Link href="/book" className="group flex items-center gap-3 text-xs uppercase tracking-[0.15em] font-medium text-stone-900 hover:text-stone-500 transition-colors inline-flex">
                                Book Appointment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

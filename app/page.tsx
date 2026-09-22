'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Star, MapPin, Phone, ShieldCheck } from 'lucide-react';

import heroImg from '@/src/assets/images/hero_aesthetic_clinic_1787904893489.jpg';
import injectablesImg from '@/src/assets/images/injectables_treatment_1787904909927.jpg';
import laserImg from '@/src/assets/images/laser_therapeutics_1787904926326.jpg';
import skincareImg from '@/src/assets/images/clinical_skincare_1787904939862.jpg';
import doctorImg from '@/src/assets/images/doctor_chitra_portrait_1787904952320.jpg';
import acneImg from '@/src/assets/images/acne_scar_care_1787906497363.jpg';
import hairRemovalImg from '@/src/assets/images/laser_hair_removal_1787906518312.jpg';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

const FADE_UP: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const STAGGER: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 md:pt-40 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-12">
        <div className="w-full md:w-1/2 flex flex-col z-10">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={STAGGER}
            className="w-full max-w-xl"
          >
            <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-3 md:gap-4 mb-8">
              <span className="text-stone-900 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">Dr. Chitra&apos;s BellaDerma</span>
              <span className="w-6 md:w-8 h-[1px] bg-stone-300"></span>
              <span className="text-stone-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">Nerul, Navi Mumbai</span>
            </motion.div>
            
            <motion.h1 variants={FADE_UP} className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight mb-4 text-stone-900">
              Skin & Aesthetic Care,<br/>
              <span className="text-stone-500 italic block mt-2">Thoughtfully Personalized.</span>
            </motion.h1>

            <motion.div variants={FADE_UP} className="flex items-center gap-2 text-stone-600 text-sm md:text-base font-medium mb-8">
              <ShieldCheck className="w-4 h-4 text-stone-800" />
              <span>Dermatologically proven</span>
            </motion.div>

            <motion.div variants={FADE_UP} className="flex items-center gap-5 mb-12 bg-white/60 w-max px-6 py-3.5 rounded-full border border-stone-200/80 backdrop-blur-md shadow-sm">
              <div className="flex gap-1 text-stone-800">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="w-[1px] h-4 bg-stone-300"></div>
              <div className="text-[10px] md:text-xs tracking-[0.1em] text-stone-600 uppercase font-medium mt-0.5">
                 <span className="text-stone-900 font-bold">4.8 / 5</span> <span className="mx-1">&mdash;</span> 518 Google Reviews
              </div>
            </motion.div>

            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href="/book" className="bg-stone-900 text-stone-50 px-8 py-4 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto text-center shadow-lg shadow-stone-900/10">
                Book Appointment
              </Link>
              <Link href="/treatments" className="bg-transparent text-stone-900 border border-stone-300 px-8 py-4 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:border-stone-900 hover:bg-stone-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto text-center">
                Explore Treatments
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 h-full relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl shadow-stone-900/5"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <Image 
                src={heroImg}
                alt="Premium dermatology clinic interior"
                fill
                className="object-cover"
                placeholder="blur"
                priority
              />
            </motion.div>
            
            {/* Subtle light overlay to ensure it feels warm */}
            <div className="absolute inset-0 bg-stone-900/5 mix-blend-multiply pointer-events-none rounded-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Services/Treatments (Editorial Grid) */}
      <section id="treatments" className="py-16 md:py-32 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium mb-3">Best clinic in Nerul</p>
              <h2 className="font-serif text-5xl md:text-6xl mb-6 tracking-tight text-stone-900">Care for Every Skin Journey</h2>
            </div>
            <Link href="/treatments" className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em] border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-all shrink-0 font-medium">
              View All Services
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Skin & Aesthetic",
                desc: "Medical-grade therapies and injectables for profound cellular renewal and facial balancing.",
                img: skincareImg
              },
              {
                title: "Laser Treatments",
                desc: "Advanced laser modalities to resurface, correct pigmentation, and stimulate collagen.",
                img: laserImg
              },
              {
                title: "Acne & Scar Care",
                desc: "Targeted clinical protocols to clear active acne and smooth textural irregularities.",
                img: acneImg
              },
              {
                title: "Laser Hair Removal",
                desc: "Safe, effective, and lasting hair reduction using state-of-the-art diode technology.",
                img: hairRemovalImg
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[4/3] bg-stone-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image */}
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  placeholder="blur"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Link Overlay */}
                <Link href="/treatments" className="absolute inset-0 z-20" aria-label={"Explore " + item.title} />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <h3 className="font-serif text-3xl md:text-4xl mb-3 text-stone-50">{item.title}</h3>
                  
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="overflow-hidden">
                      <p className="text-stone-300 font-light text-sm md:text-base leading-relaxed mb-8 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] font-medium text-stone-50 mt-2 group-hover:text-stone-300 transition-colors">
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Explore Treatments</span>
                      <span className="absolute inset-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0">Explore Treatments</span>
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Banner linking to Before & After Showcase */}
          <div className="mt-12 p-8 md:p-10 rounded-3xl bg-stone-900 text-stone-50 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800 shadow-xl">
            <div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400 font-medium block mb-2">Clinical Results</span>
              <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-white mb-2">Interactive Before & After Case Studies</h3>
              <p className="text-stone-300 text-sm font-light max-w-xl">
                Slide across verified clinical transformations for acne scar revision, laser pigmentation clearance, and facial contouring.
              </p>
            </div>
            <Link 
              href="/treatments"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-stone-900 text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-100 transition-colors shadow-sm"
            >
              <span>Explore Results Slider</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section (Editorial Layout) */}
      <section id="about" className="py-16 md:py-32 bg-stone-50 border-t border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Image Side */}
            <div className="w-full lg:w-5/12 relative">
              <motion.div 
                className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                 <Image 
                  src={doctorImg} 
                  alt="Dr. Chitra - BellaDerma Clinic" 
                  fill 
                  className="object-cover"
                  placeholder="blur"
                />
              </motion.div>
              {/* Decorative accent */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-stone-200 rounded-full mix-blend-multiply blur-3xl opacity-50 pointer-events-none" />
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-[1px] bg-stone-400"></span>
                  <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-stone-500 font-medium">Nerul, Navi Mumbai</span>
                </div>
                
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight text-stone-900">
                  Meet BellaDerma
                </h2>
                
                <div className="space-y-6 text-stone-600 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                  <p>
                    Led by Dr. Chitra, BellaDerma is a dedicated space where advanced dermatological science meets an intuitive understanding of natural aesthetics. We believe in providing thoughtful, highly personalized care tailored to the unique architecture of your skin.
                  </p>
                  <p>
                    Our approach centers on subtle refinement rather than dramatic alteration. By combining medical-grade therapies with a warm, patient-first philosophy, we aim to enhance your innate features while prioritizing long-term skin health and cellular vitality.
                  </p>
                  <p>
                    Conveniently located in the heart of Nerul, our clinic offers a comprehensive suite of services. From advanced laser protocols and customized clinical skincare to specialized acne scar treatments and precision hair removal, we are equipped to support every stage of your skin journey.
                  </p>
                </div>

                <div className="mt-12 pt-12 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Link href="/book" className="bg-stone-900 text-stone-50 px-8 py-4 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg shadow-stone-900/10 inline-block">
                    Book Appointment
                  </Link>
                  <span className="text-sm font-serif italic text-stone-500">
                    Discover your personalized treatment path.
                  </span>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-32 bg-stone-900 text-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-24">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="flex gap-1 text-stone-50">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                  ))}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-stone-50">
                  4.8
                </h2>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-stone-400 font-medium"
              >
                Based on 518 Google Reviews
              </motion.p>
            </div>
            
            <motion.a 
              href="https://maps.google.com/?q=Dr.+Chitra's+BellaDerma+Nerul"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em] border-b border-stone-500 pb-1 hover:text-stone-300 hover:border-stone-300 transition-all shrink-0 font-medium w-max"
            >
              View Google Reviews
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Carousel */}
          <div className="relative -mx-6 md:-mx-12 px-6 md:px-12">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {[
                { name: "Trupti Poojary", text: "" },
                { name: "Sanjana Tari", text: "" },
                { name: "Dushyant Singh", text: "" }
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 w-[85vw] md:w-[28rem] snap-center bg-stone-800/50 border border-stone-700/50 rounded-2xl p-8 md:p-10 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out"
                >
                  <div>
                    <div className="flex gap-1 text-stone-400 mb-6 md:mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {review.text && (
                      <p className="text-stone-300 font-light text-base md:text-lg leading-relaxed mb-8">
                        &quot;{review.text}&quot;
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center text-stone-300 font-serif text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-200">{review.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-0.5">Google Review</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            {/* Map Area */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 aspect-square md:aspect-[4/3] bg-stone-200 rounded-3xl overflow-hidden relative shadow-2xl shadow-stone-900/5 order-2 lg:order-1"
            >
              <iframe 
                src="https://maps.google.com/maps?q=Shop%20No.%2014,%20Lenyadri%20Complex,%20Sector%2019A,%20Nerul%20East,%20Navi%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80 mix-blend-multiply"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>

            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 flex flex-col order-1 lg:order-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-stone-400"></span>
                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-stone-500 font-medium">Visit Clinic</span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-10 tracking-tight text-stone-900">
                Dr. Chitra&apos;s BellaDerma
              </h2>
              
              <div className="flex flex-col gap-8 text-stone-600 font-light text-base md:text-lg">
                <div>
                  <p className="font-medium text-stone-900 mb-3 uppercase text-xs tracking-[0.15em]">Address</p>
                  <p className="leading-relaxed text-stone-500">
                    Shop No. 14, Lenyadri Complex, Plot No. 47/1 2,<br />
                    Opp. Madhavi CHS,<br />
                    Nerul East, Sector 19A,<br />
                    Nerul (E), Navi Mumbai,<br />
                    Maharashtra 400706
                  </p>
                </div>
                
                <div>
                  <p className="font-medium text-stone-900 mb-3 uppercase text-xs tracking-[0.15em]">Opening Hours</p>
                  <p className="leading-relaxed text-stone-500">
                    Monday – Saturday: 11:00 AM – 8:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-stone-200 flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+918591594849"
                  className="bg-stone-900 text-stone-50 px-8 py-4 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg shadow-stone-900/10 text-center flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  +91 8591594849
                </a>
                <a 
                  href="https://maps.google.com/?q=Shop+No.+14,+Lenyadri+Complex,+Sector+19A,+Nerul+East,+Navi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-stone-900 border border-stone-300 px-8 py-4 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:border-stone-900 hover:bg-stone-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
}

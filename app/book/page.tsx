'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TREATMENTS = [
  "Anti-Wrinkle Injections",
  "Dermal Fillers",
  "Clinical Peels",
  "Fractional CO2 Laser",
  "Pico Laser Treatment",
  "IPL Photorejuvenation",
  "Microneedling with PRP",
  "Acne Subcision",
  "Diode Laser Hair Removal",
  "Nd:YAG Laser Hair Removal",
  "General Consultation / Unsure"
];

export default function BookPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      preferredDate: formData.get('date'),
      preferredTime: formData.get('time'),
      treatment: formData.get('treatment'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit appointment');
      }

      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert('An error occurred while submitting your request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 md:pt-48 md:pb-32 px-6 md:px-12 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="mb-12 md:mb-16 text-center">
            <span className="text-stone-500 tracking-[0.2em] uppercase text-xs font-medium mb-6 block">Take the next step</span>
            <h1 className="font-serif text-5xl md:text-6xl text-stone-900 tracking-tight">
              Book Your Appointment
            </h1>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-stone-900/5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 bg-stone-100 text-stone-900 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-stone-900 mb-4">Request Received</h3>
                  <p className="text-stone-500 font-light leading-relaxed max-w-sm">
                    Thank you. Your appointment request has been received. The clinic will contact you shortly to confirm availability.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-10 text-xs uppercase tracking-[0.15em] border-b border-stone-900 pb-1 hover:text-stone-500 transition-colors font-medium text-stone-900"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        id="name"
                        name="name"
                        placeholder="Jane Doe"
                        className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 outline-none transition-colors font-light placeholder:text-stone-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-2">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        id="phone"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 outline-none transition-colors font-light placeholder:text-stone-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                      <label htmlFor="date" className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-2">Preferred Date</label>
                      <input 
                        required
                        type="date" 
                        id="date"
                        name="date"
                        className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 outline-none transition-colors font-light appearance-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="time" className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-2">Preferred Time</label>
                      <select 
                        required
                        id="time"
                        name="time"
                        defaultValue=""
                        className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 outline-none transition-colors font-light appearance-none"
                      >
                        <option value="" disabled>Select a time</option>
                        <option value="morning">Morning (11:00 AM - 1:00 PM)</option>
                        <option value="afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                        <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="treatment" className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-2">Treatment Interest</label>
                    <select 
                      required
                      id="treatment"
                      name="treatment"
                      defaultValue=""
                      className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 outline-none transition-colors font-light appearance-none"
                    >
                      <option value="" disabled>Select a treatment</option>
                      {TREATMENTS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-2">Additional Details (Optional)</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Tell us a little about your skin goals..."
                      className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 outline-none transition-colors font-light placeholder:text-stone-300 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`mt-4 w-full bg-stone-900 text-stone-50 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0 shadow-xl shadow-stone-900/10'}`}
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Request Appointment'}
                  </button>
                  
                  <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest mt-2">
                    Our team will contact you to confirm availability.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

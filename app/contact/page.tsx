'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await addDoc(collection(db, 'contactEnquiries'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setError('An error occurred while sending your message. Please try again or call us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="w-full lg:w-1/2">
          <span className="text-stone-500 tracking-[0.2em] uppercase text-xs font-medium mb-6 block">Get in Touch</span>
          <h1 className="font-serif text-5xl md:text-7xl text-stone-900 leading-[1.1] tracking-tight mb-8">
            Let&apos;s Discuss Your <br />
            <span className="italic text-stone-500">Skin Goals.</span>
          </h1>
          <p className="text-stone-500 font-light leading-relaxed max-w-md mb-12">
            Send us a message and our team will get back to you as soon as possible to help you with your inquiry.
          </p>

          <div className="flex flex-col gap-8 text-stone-600 font-light text-base md:text-lg mb-12">
            <div>
              <p className="font-medium text-stone-900 mb-2 uppercase text-xs tracking-[0.15em]">Address</p>
              <p className="leading-relaxed text-stone-500">
                Shop No. 14, Lenyadri Complex,<br />
                Nerul East, Sector 19A,<br />
                Navi Mumbai
              </p>
            </div>
            <div>
              <p className="font-medium text-stone-900 mb-2 uppercase text-xs tracking-[0.15em]">Contact</p>
              <p className="leading-relaxed text-stone-500">
                +91 8591594849
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-stone-900/5">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <h2 className="font-serif text-3xl text-stone-900 mb-4">Message Sent</h2>
              <p className="text-stone-500 font-light mb-8 max-w-sm">Thank you for reaching out. Our team will contact you shortly.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="bg-stone-900 text-stone-50 px-8 py-4 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h2 className="font-serif text-3xl text-stone-900 border-b border-stone-200 pb-6 mb-2">Send a Message</h2>
              {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-light">{error}</div>}
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-[0.1em] font-medium text-stone-500 ml-2">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-stone-400 focus:bg-white transition-all font-light"
                  placeholder="Your full name"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-2 flex-grow">
                  <label htmlFor="email" className="text-xs uppercase tracking-[0.1em] font-medium text-stone-500 ml-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-stone-400 focus:bg-white transition-all font-light"
                    placeholder="Your email address"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <label htmlFor="phone" className="text-xs uppercase tracking-[0.1em] font-medium text-stone-500 ml-2">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-stone-400 focus:bg-white transition-all font-light"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-[0.1em] font-medium text-stone-500 ml-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-stone-400 focus:bg-white transition-all font-light resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-stone-900 text-stone-50 px-8 py-5 rounded-xl text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors text-center shadow-lg shadow-stone-900/10"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

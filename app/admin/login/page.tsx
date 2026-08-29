'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait for auth state to propagate
      router.push('/admin');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-stone-900/5 p-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-stone-900" />
        </div>
        <h1 className="font-serif text-3xl text-stone-900 mb-2">Secure Access</h1>
        <p className="text-sm text-stone-500 mb-8 text-center">Sign in to your administrator account to access the clinic dashboard.</p>
        
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 outline-none transition-colors font-light placeholder:text-stone-300 text-center"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:border-stone-900 outline-none transition-colors font-light placeholder:text-stone-300 text-center tracking-widest"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-stone-900 text-stone-50 py-4 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all ${loading ? 'opacity-70' : 'hover:bg-stone-800 shadow-xl shadow-stone-900/10'}`}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

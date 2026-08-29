'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Calendar, MessageSquare, LogOut, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (currentUser && pathname === '/admin/login') {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50"><p className="text-stone-400">Loading...</p></div>;
  }

  if (pathname === '/admin/login' || (!user && pathname !== '/admin/login')) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col shrink-0">
        <div className="p-6 md:p-8 flex items-center gap-3 text-stone-50 border-b border-stone-800">
          <ShieldCheck className="w-6 h-6" />
          <span className="font-serif tracking-wide text-lg">Admin Panel</span>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-stone-800 text-stone-50' : 'hover:bg-stone-800/50 hover:text-stone-100'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Appointments</span>
          </Link>
          <Link 
            href="/admin/enquiries" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/admin/enquiries' ? 'bg-stone-800 text-stone-50' : 'hover:bg-stone-800/50 hover:text-stone-100'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Enquiries</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-stone-400 hover:text-stone-50 hover:bg-stone-800 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

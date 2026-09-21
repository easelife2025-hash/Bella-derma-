'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Trash2, Calendar, Phone, CheckCircle, Clock, XCircle, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

type Appointment = {
  id: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  message: string;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  contacted: 'bg-blue-100 text-blue-800 border-blue-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-stone-200 text-stone-800 border-stone-300',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export default function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(data);
      setLoading(false);
      
      // We use a functional state update to safely access the current selectedAppt without adding it to the dependency array
      setSelectedAppt((currentSelected) => {
        if (currentSelected) {
          const updated = data.find(a => a.id === currentSelected.id);
          return updated ? updated : null;
        }
        return currentSelected;
      });
    }, (error) => {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status: newStatus });
    } catch (e) {
      console.error(e);
      alert('Error updating status. Ensure you are logged in as admin.');
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await deleteDoc(doc(db, 'appointments', id));
      if (selectedAppt?.id === id) setSelectedAppt(null);
    } catch (e) {
      console.error(e);
      alert('Error deleting appointment.');
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = appt.name.toLowerCase().includes(search.toLowerCase()) || appt.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || appt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
      {/* List Column */}
      <div className={`flex-1 flex flex-col ${selectedAppt ? 'hidden md:flex' : 'flex'}`}>
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-stone-900 tracking-tight mb-2">Appointments</h1>
          <p className="text-stone-500 font-light">Manage and track patient booking requests.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-all text-sm"
            />
          </div>
          <div className="relative shrink-0">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-white border border-stone-200 rounded-xl outline-none focus:border-stone-400 transition-all text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex-1 flex flex-col">
          {loading ? (
            <div className="p-8 text-center text-stone-400 text-sm">Loading appointments...</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-8 text-center text-stone-400 text-sm flex flex-col items-center justify-center h-full">
              <Calendar className="w-12 h-12 mb-4 text-stone-200" />
              <p>No appointments found.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 overflow-y-auto">
              {filteredAppointments.map(appt => (
                <button
                  key={appt.id}
                  onClick={() => setSelectedAppt(appt)}
                  className={`w-full text-left p-4 hover:bg-stone-50 transition-colors flex items-center justify-between gap-4 ${selectedAppt?.id === appt.id ? 'bg-stone-50 border-l-4 border-l-stone-800' : 'border-l-4 border-l-transparent'}`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium text-stone-900 truncate">{appt.name}</p>
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${STATUS_COLORS[appt.status]}`}>
                        {appt.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {appt.preferredDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {appt.preferredTime}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Panel */}
      {selectedAppt && (
        <div className="flex-1 md:max-w-md w-full flex flex-col h-full bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xl shadow-stone-900/5">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <h2 className="font-medium text-stone-900">Enquiry Details</h2>
            <button onClick={() => setSelectedAppt(null)} className="md:hidden text-stone-400 hover:text-stone-900">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Patient</p>
              <h3 className="text-2xl font-serif text-stone-900 mb-2">{selectedAppt.name}</h3>
              <a href={`tel:${selectedAppt.phone}`} className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 bg-stone-100 px-3 py-1.5 rounded-lg transition-colors">
                <Phone className="w-3.5 h-3.5" />
                {selectedAppt.phone}
              </a>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Requested Time</p>
                <div className="flex items-center gap-3 text-stone-800 bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <Calendar className="w-5 h-5 text-stone-400" />
                  <div>
                    <p className="font-medium text-sm">{selectedAppt.preferredDate}</p>
                    <p className="text-xs text-stone-500 capitalize">{selectedAppt.preferredTime}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Treatment Interest</p>
                <p className="text-sm font-medium text-stone-800">{selectedAppt.treatment}</p>
              </div>

              {selectedAppt.message && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Message</p>
                  <p className="text-sm text-stone-600 leading-relaxed p-4 bg-stone-50 rounded-xl border border-stone-100 whitespace-pre-wrap">
                    {selectedAppt.message}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Submitted On</p>
                <p className="text-sm text-stone-600">
                  {selectedAppt.createdAt ? format((selectedAppt.createdAt as any).toDate ? (selectedAppt.createdAt as any).toDate() : new Date(selectedAppt.createdAt), 'MMM d, yyyy h:mm a') : ''}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">Update Status</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['pending', 'contacted', 'confirmed', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => updateStatus(selectedAppt.id, status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider border transition-all ${
                    selectedAppt.status === status 
                      ? STATUS_COLORS[status] + ' shadow-sm' 
                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <button 
              onClick={() => deleteAppointment(selectedAppt.id)}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors w-full justify-center p-3 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

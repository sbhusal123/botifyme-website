"use client";

import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  User,
  Loader2,
  Inbox,
  Sparkles,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Inquiry = {
  id: number;
  full_name: string;
  email_phone: string;
  message: string;
  created_at: string;
};

export default function InquiryManager({ token }: { token: string }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/inquiries/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/inquiries/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
        <p className="font-medium">Loading inquiries...</p>
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="p-20 flex flex-col items-center justify-center gap-6 text-slate-400">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
          <Inbox className="w-10 h-10 text-slate-300" />
        </div>
        <p className="text-xl font-bold text-slate-900">No inquiries yet</p>
        <p className="max-w-xs text-center">New submissions from your contact form will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid gap-6">
        <AnimatePresence>
          {inquiries.map((inq) => {
            const isTrial = inq.message.includes('[TRIAL REQUEST]');
            const isDemo = inq.message.includes('[DEMO REQUEST]');
            const cleanMessage = inq.message.replace('[TRIAL REQUEST] ', '').replace('[DEMO REQUEST] ', '');

            return (
              <motion.div 
                key={inq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] p-5 md:p-8 hover:shadow-xl hover:shadow-purple-500/5 transition-all group relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className="mb-4">
                  {isTrial ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider border border-purple-200">
                      <Sparkles className="w-3 h-3" /> Trial Request
                    </span>
                  ) : isDemo ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                      <Bot className="w-3 h-3" /> Demo Request
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                      <Inbox className="w-3 h-3" /> General Inquiry
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-500 shrink-0 shadow-inner">
                        <User className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base md:text-xl text-slate-900 break-words leading-tight">{inq.full_name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-1 text-[10px] md:text-xs text-slate-500">
                          <div className="flex items-center gap-1.5 break-all">
                            <Mail className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-400 shrink-0" />
                            <span>{inq.email_phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-400 shrink-0" />
                            {new Date(inq.created_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDelete(inq.id)}
                      disabled={deletingId === inq.id}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm shrink-0"
                    >
                      {deletingId === inq.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="bg-slate-50/50 rounded-xl md:rounded-2xl p-4 md:p-6 text-slate-700 leading-relaxed border border-slate-100 relative group-hover:bg-white transition-colors">
                    <p className="text-sm md:text-base italic break-words">&quot;{cleanMessage}&quot;</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

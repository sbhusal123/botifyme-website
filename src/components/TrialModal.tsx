"use client";

import React, { useState } from 'react';
import { X, Send, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TrialModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  type?: 'trial' | 'demo';
};

export default function TrialModal({ 
  isOpen, 
  onClose, 
  title = "Start Your 10-Day Trial",
  subtitle = "Get full access to Botifyme automation features.",
  type = "trial"
}: TrialModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      full_name: formData.get('name'),
      email_phone: formData.get('contactInfo'),
      message: `[${type.toUpperCase()} REQUEST] ${formData.get('message')}`,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit request');

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
          {/* Backdrop (clickable area around the modal) */}
          <div 
            className="fixed inset-0" 
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col my-auto"
          >
            {/* Header Area - Glassmorphic */}
            <div className="bg-white p-8 border-b border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 pr-8">
                <button 
                  onClick={onClose}
                  className="absolute top-0 right-0 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2 mb-2 text-purple-600 font-bold text-xs uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  {type === 'trial' ? 'Limited Time Offer' : 'Botifyme Demo'}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
              </div>
            </div>

            {/* Form Area - Scrollable for mobile */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {isSuccess ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Request Sent!</h3>
                  <p className="text-slate-500 mt-2">Our team will activate your trial and contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">Full Name</label>
                    <input 
                      name="name" 
                      required 
                      className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">Phone / Email</label>
                    <input 
                      name="contactInfo" 
                      required 
                      className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                      placeholder="Where should we contact you?"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">Your Business Requirements</label>
                    <textarea 
                      name="message" 
                      rows={3}
                      className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none"
                      placeholder="Tell us about your store..."
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 transition-all mt-4"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{type === 'trial' ? 'Activate Trial' : 'Submit Demo Request'} <Send className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

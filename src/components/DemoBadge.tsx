"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Calendar, Play } from 'lucide-react';
import TrialModal from './TrialModal';

export default function DemoBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/web-dashboard')) return null;

  return (
    <>
      <motion.div 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ delay: 2, type: 'spring' }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] hidden lg:block"
      >
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex items-center bg-slate-900 text-white rounded-r-2xl shadow-2xl overflow-hidden hover:pr-6 transition-all duration-300"
        >
          <div className="w-14 h-14 bg-purple-600 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            <Calendar className="w-6 h-6 relative z-10" />
          </div>
          
          <div className="px-4 py-3 flex flex-col whitespace-nowrap">
            <span className="text-[10px] uppercase tracking-widest font-bold text-purple-400">Limited Slots</span>
            <span className="text-sm font-bold flex items-center gap-2">
              Book a Demo
              <Play className="w-3 h-3 fill-white group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
          
          <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-purple-400 via-cyan-400 to-purple-400"></div>
        </button>
      </motion.div>

      <TrialModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        type="demo"
        title="Book a Live Demo"
        subtitle="See how Botifyme can transform your e-commerce business."
      />
    </>
  );
}

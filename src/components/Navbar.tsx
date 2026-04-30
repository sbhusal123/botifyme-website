"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bot, ChevronRight, Menu, X } from 'lucide-react';
import TrialModal from './TrialModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  const openTrial = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTrialModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2rem] transition-all duration-300">
      <div className="px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-purple-600 to-cyan-500 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Botifyme</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">Features</Link>
          <Link href="#integrations" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">Integrations</Link>
          <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">How it Works</Link>
          <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">Pricing</Link>
          <Link href="#site-contact" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">Contact Us</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full mt-4 left-0 right-0 bg-white border border-slate-200 shadow-2xl rounded-3xl py-4 px-6 flex flex-col gap-4 overflow-hidden">
          <Link href="#features" className="text-slate-600 hover:text-slate-900 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
          <Link href="#integrations" className="text-slate-600 hover:text-slate-900 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Integrations</Link>
          <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>How it Works</Link>
          <Link href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
          <Link href="#site-contact" className="text-slate-600 hover:text-slate-900 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
        </div>
      )}

      <TrialModal isOpen={isTrialModalOpen} onClose={() => setIsTrialModalOpen(false)} />
    </header>
  );
}

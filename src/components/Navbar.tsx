"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bot, ChevronRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">Contact Us</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://ig.me/m/tekkops555" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-purple-600 border border-transparent rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start your 10 days trial <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

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
          <Link href="#contact" className="text-slate-600 hover:text-slate-900 font-medium py-2 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          <a 
            href="https://ig.me/m/tekkops555" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl mt-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start your 10 days trial
          </a>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 md:py-16 text-slate-400 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Branding & Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-purple-600 to-cyan-500 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Botifyme</span>
            </Link>
            <p className="text-sm max-w-xs text-center md:text-left">
              Automate your sales with your own Ecommerce Store across all major social platforms.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-bold mb-2">Quick Links</h4>
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link href="#features" className="hover:text-white transition-colors">Features</Link>
              <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-bold mb-2">Connect With Us</h4>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/tekkops.technologies5555" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white transition-colors duration-300"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/tekkops555/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center text-white transition-colors duration-300"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@opstech555" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-black flex items-center justify-center text-white transition-colors duration-300"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/9779861155894" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center text-white transition-colors duration-300"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs md:text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Botifyme. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

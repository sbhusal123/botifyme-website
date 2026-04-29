"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bot, MessageCircle, Send, ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';

export default function HeroAnimation() {
  const [channel, setChannel] = useState<'whatsapp' | 'messenger'>('whatsapp');
  const [step, setStep] = useState(0);

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Background parallax layers (move opposite to mouse)
  const bgX1 = useTransform(smoothMouseX, [-500, 500], [40, -40]);
  const bgY1 = useTransform(smoothMouseY, [-500, 500], [40, -40]);
  
  const bgX2 = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const bgY2 = useTransform(smoothMouseY, [-500, 500], [-30, 30]);

  // Foreground parallax (moves with mouse)
  const fgX = useTransform(smoothMouseX, [-500, 500], [20, -20]);
  const fgY = useTransform(smoothMouseY, [-500, 500], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate from center of screen
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];

    const runSequence = () => {
      setChannel('whatsapp');
      setStep(0);
      
      timeoutIds.push(setTimeout(() => setStep(1), 1000));
      timeoutIds.push(setTimeout(() => setStep(2), 2500));
      timeoutIds.push(setTimeout(() => setStep(3), 4000));
      
      timeoutIds.push(setTimeout(() => {
        setChannel('messenger');
        setStep(0);
      }, 7000));

      timeoutIds.push(setTimeout(() => setStep(1), 8000));
      timeoutIds.push(setTimeout(() => setStep(2), 9500));
      timeoutIds.push(setTimeout(() => setStep(3), 11000));
    };

    runSequence();
    const interval = setInterval(runSequence, 14000);

    return () => {
      clearInterval(interval);
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  const isWhatsApp = channel === 'whatsapp';
  
  const theme = {
    bg: isWhatsApp ? 'bg-green-500' : 'bg-blue-600',
    lightBg: isWhatsApp ? 'bg-green-50' : 'bg-blue-50',
    text: isWhatsApp ? 'text-green-600' : 'text-blue-600',
    border: isWhatsApp ? 'border-green-200' : 'border-blue-200',
    icon: isWhatsApp ? <MessageCircle className="w-5 h-5 text-white" /> : <FaFacebook className="w-5 h-5 text-white" />,
    title: isWhatsApp ? 'WhatsApp Bot' : 'Messenger Bot',
    userMsg: isWhatsApp ? 'Do you have the black sneakers in size 10?' : 'Hi, where is my order #8292?',
    botMsg: isWhatsApp 
      ? 'Yes! They are in stock for $120. Here is your secure checkout link: pay.store.com/ck123'
      : 'Your order was dispatched via PickNDrop. Track it live here: link.com/track'
  };

  return (
    <div className="relative min-h-[480px] sm:min-h-[550px] lg:aspect-[4/3] w-full flex items-center justify-center p-2 sm:p-4 overflow-visible">
      
      {/* Interactive Parallax Background Glows */}
      <motion.div 
        style={{ x: bgX1, y: bgY1 }}
        className={`absolute inset-0 blur-[100px] opacity-20 rounded-full transition-colors duration-1000 ${theme.bg}`}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        style={{ x: bgX2, y: bgY2 }}
        className="absolute inset-0 blur-[80px] opacity-30 rounded-full bg-purple-500/30 translate-x-10 translate-y-10"
        animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <motion.div 
          style={{ x: bgX1, y: bgY2 }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-0 lg:-left-10 w-12 h-12 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl flex items-center justify-center shadow-xl z-0 hidden sm:flex"
        >
          <ShoppingBag className="w-6 h-6 text-purple-500" />
        </motion.div>

        <motion.div 
          style={{ x: bgX2, y: bgY1 }}
          animate={{ y: [0, 20, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-0 lg:-right-10 w-14 h-14 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl flex items-center justify-center shadow-xl z-0 hidden sm:flex"
        >
          <Tag className="w-7 h-7 text-cyan-500" />
        </motion.div>
      </div>

      {/* Main Chat Phone Container with Parallax */}
      <motion.div 
        style={{ x: fgX, y: fgY }}
        className="relative w-full max-w-sm glass-panel bg-white/95 border border-slate-200 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col h-[450px] sm:h-[500px] z-10"
      >
        
        {/* Chat Header */}
        <div className={`p-3 sm:p-4 flex items-center gap-3 text-white transition-colors duration-500 ${theme.bg}`}>
          <motion.div
            key={channel}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {theme.icon}
          </motion.div>
          <div>
            <motion.h3 
              key={`${channel}-title`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-xs sm:text-sm"
            >
              {theme.title}
            </motion.h3>
            <p className="text-[10px] sm:text-[11px] opacity-90 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span> Online
            </p>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 bg-slate-50 p-3 sm:p-4 overflow-hidden relative flex flex-col justify-end space-y-4">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div 
                key="user-msg"
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="flex gap-2 justify-end"
              >
                <div className={`py-2 px-3 rounded-2xl rounded-tr-sm text-xs sm:text-sm shadow-sm ${theme.lightBg} border ${theme.border} text-slate-800 max-w-[85%]`}>
                  {theme.userMsg}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="typing"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-2 items-end"
              >
                <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0 flex items-center justify-center shadow-inner">
                  <Bot className="w-3 h-3 text-slate-500" />
                </div>
                <div className="bg-white border border-slate-200 py-2 px-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5 h-8 sm:h-9">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div 
                key="bot-msg"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="flex gap-2 items-end"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-900 shrink-0 flex items-center justify-center shadow-lg shadow-slate-900/20">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200 py-2 px-3 rounded-2xl rounded-bl-sm text-xs sm:text-sm shadow-md shadow-slate-200/50 text-slate-700 max-w-[85%] leading-relaxed">
                  {theme.botMsg}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chat Input */}
        <div className="p-2 sm:p-3 bg-white border-t border-slate-200 flex gap-2 items-center">
          <div className="h-8 sm:h-9 flex-1 bg-slate-100 rounded-full border border-slate-200 px-4 flex items-center text-slate-400 text-[10px] sm:text-xs">
            Type a message...
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white shadow-sm transition-colors duration-500 ${theme.bg} cursor-pointer`}
          >
            <Send className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5" />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Notifications (Proof of Automation) */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.5 }}
            style={{ x: bgX1 }}
            className="absolute top-10 sm:top-16 lg:top-24 right-2 sm:-right-4 lg:-right-12 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-2 sm:p-3 z-20 flex items-center gap-2 sm:gap-3"
          >
            <div className="bg-gradient-to-tr from-purple-500 to-cyan-500 p-1.5 sm:p-2 rounded-full shadow-lg">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">Sale Automated!</p>
              <p className="text-[8px] sm:text-[10px] text-slate-500">No human required</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

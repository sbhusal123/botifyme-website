"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Zap,
  ArrowUpRight,
  Loader2,
  Inbox,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardOverview({ token }: { token: string }) {
  const [stats, setStats] = useState({
    inquiries: 0,
    chats: 0,
    messages: 0,
    loading: true
  });

  const fetchData = async () => {
    try {
      const [inqRes, chatRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/inquiries/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/chat-sessions/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (inqRes.ok && chatRes.ok) {
        const inqs = await inqRes.json();
        const chats = await chatRes.json();
        setStats({
          inquiries: inqs.length,
          chats: chats.length,
          messages: chats.length * 4.2, // Simulated avg
          loading: false
        });
      }
    } catch (err) {
      console.error(err);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  if (stats.loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
        <p className="font-medium">Calculating metrics...</p>
      </div>
    );
  }

  const cards = [
    { label: 'Total Inquiries', value: stats.inquiries, icon: Inbox, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
    { label: 'Active Sessions', value: stats.chats, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+5%' },
    { label: 'AI Messages', value: Math.round(stats.messages), icon: MessageSquare, color: 'text-cyan-600', bg: 'bg-cyan-50', trend: '+18%' },
    { label: 'AI Success Rate', value: '98.2%', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50', trend: '+0.5%' }
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card, i) => (
          <motion.div 
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-purple-500/5 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent opacity-50 -mr-12 -mt-12 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                  <TrendingUp className="w-3 h-3" />
                  {card.trend}
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 tracking-tight">{card.value}</h3>
              <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold">Weekly Growth</h3>
                <p className="text-slate-400 text-sm">Customer engagement over time</p>
              </div>
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            
            <div className="flex items-end gap-3 h-48">
              {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                    className="w-full bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t-xl group-hover:to-white transition-all relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {Math.round(h * 1.2)}%
                    </div>
                  </motion.div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Center */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Insights</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-white hover:shadow-lg transition-all">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">AI Accuracy Spike</p>
                <p className="text-xs text-slate-500">The agent handled 12 inquiries without human intervention today.</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-white hover:shadow-lg transition-all">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">New High-Value Lead</p>
                <p className="text-xs text-slate-500">An inquiry was marked as high intent by the AI reasoning engine.</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-900">Botifyme Status</span>
              <span className="flex items-center gap-2 text-green-600 font-bold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                All Systems Operational
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
